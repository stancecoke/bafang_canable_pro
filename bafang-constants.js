// bafang-constants.js
"use strict";

const CanOperation = Object.freeze({
    WRITE_CMD: 0x00,
    READ_CMD: 0x01,
    NORMAL_ACK: 0x02,
    ERROR_ACK: 0x03,
    MULTIFRAME_START: 0x04,
    MULTIFRAME: 0x05,
    MULTIFRAME_END: 0x06,
    MULTIFRAME_WARNING: 0x07,
});

const DeviceNetworkId = Object.freeze({
    TORQUE_SENSOR: 0x01,
    DRIVE_UNIT: 0x02,
    DISPLAY: 0x03,
    BATTERY: 0x04,
    BESST: 0x05, // Represents the Tool/PC Interface
    BROADCAST: 0x1f,
});

// Add WheelDiameterTable if needed by serializers (e.g., for SpeedParameters)
// const WheelDiameterTable = [ ... ]; // From BafangCanConstants.ts

module.exports = {
    CanOperation,
    DeviceNetworkId,
    // WheelDiameterTable // Uncomment if needed
};