// Builds the executables into dist/ as <name>-<version>-<platform>-<arch>, taking the
// name and version from package.json, and puts a .zip of each next to it, so users can
// download whichever they prefer. Extra arguments go to pkg as they are; --targets
// limits the build, e.g.
//   npm run build -- --targets node18-win-x64
const { execFileSync, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const root = path.join(__dirname, '..');
const pkgJson = require('../package.json');
const { name, version } = pkgJson;

// Each target is built on its own so it carries only the usb binding for its own
// platform (node-gyp-build looks for prebuilds/<platform>-<arch>); the bindings for
// the other nine platforms and libusb's C sources would only make it bigger.
const PREBUILD_DIRS = {
    'win-x64': 'win32-x64',
    'win-arm64': 'win32-arm64',
    'linux-x64': 'linux-x64',
    'linux-arm64': 'linux-arm64',
    'macos-x64': 'darwin-x64+arm64',
    'macos-arm64': 'darwin-x64+arm64',
};
// ui/main.js is the old single-file UI; the page loads ui/js/ instead.
const UI_ASSETS = ['ui/**/*', '!ui/main.js'];

const extraArgs = process.argv.slice(2);
const targetsArg = extraArgs.indexOf('--targets');
const targets = targetsArg >= 0 ? extraArgs[targetsArg + 1].split(',') : pkgJson.pkg.targets;
const passThrough = targetsArg >= 0 ? extraArgs.filter((_, i) => i !== targetsArg && i !== targetsArg + 1) : extraArgs;

function runPkg(args) {
    // pkg is a .cmd script on Windows, which Node only starts through the shell, so
    // there it gets one command line with every argument quoted.
    if (process.platform === 'win32')
        execSync(['pkg', ...args].map((a) => `"${a}"`).join(' '), { cwd: root, stdio: 'inherit' });
    else
        execFileSync('pkg', args, { cwd: root, stdio: 'inherit' });
}

// --- zip -------------------------------------------------------------------------
// A one-file zip written with zlib, so the build needs neither a zip tool nor a
// package. The entry is marked as a Unix file so the Linux and macOS executables keep
// their executable bit when unpacked.

const CRC_TABLE = Array.from({ length: 256 }, (_, n) => {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
    return c >>> 0;
});
function crc32(buf) {
    if (zlib.crc32) return zlib.crc32(buf);
    let c = 0xFFFFFFFF;
    for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
    return (c ^ 0xFFFFFFFF) >>> 0;
}

function zipOneFile(file, zipPath, executable) {
    const data = fs.readFileSync(file);
    const packed = zlib.deflateRawSync(data, { level: 9 });
    const entryName = Buffer.from(path.basename(file));
    const crc = crc32(data);
    const d = fs.statSync(file).mtime;
    const dosTime = (d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1);
    const dosDate = ((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate();
    const mode = executable ? 0o100755 : 0o100644;

    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034B50, 0);
    local.writeUInt16LE(20, 4);              // version needed: deflate
    local.writeUInt16LE(0x0800, 6);          // UTF-8 name
    local.writeUInt16LE(8, 8);               // method: deflate
    local.writeUInt16LE(dosTime, 10);
    local.writeUInt16LE(dosDate, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(packed.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(entryName.length, 26);

    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014B50, 0);
    central.writeUInt16LE((3 << 8) | 20, 4); // made by: Unix, so the mode below is read
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(0x0800, 8);
    central.writeUInt16LE(8, 10);
    central.writeUInt16LE(dosTime, 12);
    central.writeUInt16LE(dosDate, 14);
    central.writeUInt32LE(crc, 16);
    central.writeUInt32LE(packed.length, 20);
    central.writeUInt32LE(data.length, 24);
    central.writeUInt16LE(entryName.length, 28);
    central.writeUInt32LE((mode << 16) >>> 0, 38);
    central.writeUInt32LE(0, 42);            // local header offset

    const centralOffset = local.length + entryName.length + packed.length;
    const end = Buffer.alloc(22);
    end.writeUInt32LE(0x06054B50, 0);
    end.writeUInt16LE(1, 8);
    end.writeUInt16LE(1, 10);
    end.writeUInt32LE(central.length + entryName.length, 12);
    end.writeUInt32LE(centralOffset, 16);

    fs.writeFileSync(zipPath, Buffer.concat([local, entryName, packed, central, entryName, end]));
    return { size: data.length, packed: packed.length };
}

// --- build -----------------------------------------------------------------------

const mb = (n) => `${(n / 1048576).toFixed(1)} MB`;
const configPath = path.join(root, '.pkg-build.tmp.json');
const summary = [];
try {
    for (const target of targets) {
        const platformArch = target.split('-').slice(1).join('-'); // node18-win-x64 -> win-x64
        const prebuild = PREBUILD_DIRS[platformArch];
        if (!prebuild) throw new Error(`No usb prebuild known for target ${target}`);

        fs.writeFileSync(configPath, JSON.stringify({
            name, version, bin: pkgJson.bin,
            pkg: { assets: [...UI_ASSETS, `node_modules/usb/prebuilds/${prebuild}/*`] },
        }, null, 2));

        const base = path.join(root, 'dist', `${name}-${version}-${platformArch}`);
        const exe = platformArch.startsWith('win') ? `${base}.exe` : base;
        console.log(`\n=== ${target} -> ${path.relative(root, exe)}`);
        runPkg([pkgJson.bin, '--config', configPath, '--no-bytecode', '--public-packages', '*', '--public',
            '--compress', 'Brotli', '--targets', target, '--output', exe, ...passThrough]);

        const zip = zipOneFile(exe, `${base}.zip`, !platformArch.startsWith('win'));
        summary.push(`${path.basename(exe).padEnd(45)} ${mb(zip.size).padStart(8)}   zip ${mb(zip.packed).padStart(8)}`);
    }
} finally {
    fs.rmSync(configPath, { force: true });
}
console.log(`\n${summary.join('\n')}`);
