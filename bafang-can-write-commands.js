// bafang-can-write-commands.js
"use strict";

// Import necessary constants (like DeviceNetworkId) if they are used
const { DeviceNetworkId } = require('./bafang-constants');

const CanWriteCommandsList = Object.freeze({
    SerialNumber: { // Write Serial Number
        canCommandCode: 0x60, // 96
        canCommandSubCode: 0x03,
        applicableDevices: [DeviceNetworkId.DISPLAY, DeviceNetworkId.DRIVE_UNIT, DeviceNetworkId.TORQUE_SENSOR],
    },
    CustomerNumber: { // Write Customer Number
        canCommandCode: 0x60, // 96
        canCommandSubCode: 0x04,
        applicableDevices: [DeviceNetworkId.DISPLAY, DeviceNetworkId.DRIVE_UNIT, DeviceNetworkId.TORQUE_SENSOR],
    },
    Manufacturer: { // Write Manufacturer
        canCommandCode: 0x60, // 96
        canCommandSubCode: 0x05,
        applicableDevices: [DeviceNetworkId.DISPLAY, DeviceNetworkId.DRIVE_UNIT, DeviceNetworkId.TORQUE_SENSOR],
    },
    Parameter0: { // Write Controller Parameter Block 0
        canCommandCode: 0x60, // 96
        canCommandSubCode: 0x10, // 
        applicableDevices: [DeviceNetworkId.DRIVE_UNIT],
    },
    Parameter1: { // Write Controller Parameter Block 1
        canCommandCode: 0x60, // 96
        canCommandSubCode: 0x11, // 17
        applicableDevices: [DeviceNetworkId.DRIVE_UNIT],
    },
    Parameter2: { // Write Controller Parameter Block 2 (Torque Profiles)
        canCommandCode: 0x60, // 96
        canCommandSubCode: 0x12, // 18
        applicableDevices: [DeviceNetworkId.DRIVE_UNIT],
    },
    DisplayTotalMileage: { // Write Display Total Mileage
        canCommandCode: 0x62, // 98
        canCommandSubCode: 0x01,
        applicableDevices: [DeviceNetworkId.DISPLAY],
    },
    DisplayTime: { // Write Display Time
        canCommandCode: 0x62, // 98
        canCommandSubCode: 0x02,
        applicableDevices: [DeviceNetworkId.DISPLAY],
    },
    DisplaySingleMileage: { // Write Display Single Trip Mileage
        canCommandCode: 0x62, // 98
        canCommandSubCode: 0x03,
        applicableDevices: [DeviceNetworkId.DISPLAY],
    },
    CleanServiceMileage: { // Command to Clear Service Mileage on Display
        canCommandCode: 0x63, // 99
        canCommandSubCode: 0x02,
        applicableDevices: [DeviceNetworkId.DISPLAY],
    },
    MotorSpeedParameters: { // Write Speed Limit, Wheel Diameter Code, Circumference
        canCommandCode: 0x32, // 50
        canCommandSubCode: 0x03,
        applicableDevices: [DeviceNetworkId.DRIVE_UNIT],
    },
    CalibratePositionSensor: { // Command to Calibrate Position Sensor on Controller
        canCommandCode: 0x62, // 98
        canCommandSubCode: 0x00,
        applicableDevices: [DeviceNetworkId.DRIVE_UNIT],
    },
	SetServiceThreshold: { 
        canCommandCode: 0x63,
        canCommandSubCode: 0x0B,
        applicableDevices: [DeviceNetworkId.DISPLAY],
    },
    // Add other relevant write commands if identified
});

module.exports = { CanWriteCommandsList };