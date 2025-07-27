        // --- WebSocket and Globals ---
        const socket = new WebSocket('ws://localhost:8080');
        const statusIndicator = document.getElementById('statusIndicator');
        const statusText = document.getElementById('statusText');
        const log = document.getElementById('log');
        //const allControls = document.querySelectorAll('button, input, textarea');
        const clearLogButton = document.getElementById('clearLogButton');
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.tab-content');
        const connectCanButton = document.getElementById('connectCanButton'); // New button
        const canDeviceNameElement = document.getElementById('canDeviceName'); // For device name	
		
        // --- Display Tab Specific Elements ---
        const displayElements = {
            totalMileageValue: document.getElementById('displayTotalMileageValue'),
            totalMileageInput: document.getElementById('displayTotalMileageInput'),
            singleMileageValue: document.getElementById('displaySingleMileageValue'),
            singleMileageInput: document.getElementById('displaySingleMileageInput'),
            maxSpeedValue: document.getElementById('displayMaxSpeedValue'),
            averageSpeedValue: document.getElementById('displayAverageSpeedValue'),
            serviceMileageValue: document.getElementById('displayServiceMileageValue'),
            clearServiceButton: document.getElementById('displayClearServiceButton'),
            setTimeButton: document.getElementById('displaySetTimeButton'),
            assistLevelsValue: document.getElementById('displayAssistLevelsValue'),
            modeValue: document.getElementById('displayModeValue'),
            boostValue: document.getElementById('displayBoostValue'),
            currentAssistValue: document.getElementById('displayCurrentAssistValue'),
            lightValue: document.getElementById('displayLightValue'),
            buttonValue: document.getElementById('displayButtonValue'),
            errorTableBody: document.getElementById('displayErrorTableBody'),
			displayShutdownTimeValue: document.getElementById('displayShutdownTimeValue'),
            syncButton: document.getElementById('displaySyncButton'),
            saveButton: document.getElementById('displaySaveButton'),
        };
        const sensorElements = {
            syncButton: document.getElementById('sensorSyncButton'),
            realtimePlaceholder: document.getElementById('sensorRealtimePlaceholder'),
			sensorTorqueValue: document.getElementById('sensorTorqueValue'),
			sensorCadenceValue: document.getElementById('sensorCadenceValue'),
        };
        const batteryElements = {
             syncButton: document.getElementById('batterySyncButton'),
             cellVoltageTableBody: document.getElementById('batteryCellVoltageTableBody'),
             fullCapacityValue: document.getElementById('batteryFullCapacityValue'),
             capacityLeftValue: document.getElementById('batteryCapacityLeftValue'),
             rsocValue: document.getElementById('batteryRsocValue'),
             asocValue: document.getElementById('batteryAsocValue'),
             sohValue: document.getElementById('batterySohValue'),
             voltageValue: document.getElementById('batteryVoltageValue'),
             currentValue: document.getElementById('batteryCurrentValue'),
             tempValue: document.getElementById('batteryTempValue'),
             cellsPlaceholder: document.getElementById('batteryCellsPlaceholder'),
             capacityPlaceholder: document.getElementById('batteryCapacityPlaceholder'),
             statePlaceholder: document.getElementById('batteryStatePlaceholder'),
        };
		const gearsElements = {
          syncButton: document.getElementById('gearsSyncButton'),
          saveButton: document.getElementById('gearsSaveButton'),
		  controllerStartupAngleValueEl: document.getElementById('controllerStartupAngleValue'),
		  controllerStartupAngleInputEl: document.getElementById('controllerStartupAngleInput'),
		  startupAnglePlaceholderEl: document.getElementById('startupAnglePlaceholder'),
          assistLevelTableBody: document.getElementById('assistLevelTableBody'),
          torqueProfileTableBody: document.getElementById('torqueProfileTableBody'),
          assistLevelPlaceholder: document.getElementById('assistLevelPlaceholder'),
          torqueProfilePlaceholder: document.getElementById('torqueProfilePlaceholder'),
		};

        const debugElements = {
             canIdInput: document.getElementById('canIdInput'),
             canDataInput: document.getElementById('canDataInput'),
             sendCustomFrameButton: document.getElementById('sendCustomFrame'),
			 logArea: document.getElementById('log'),
             clearLogButton: document.getElementById('clearLogButton'),
			 rawParamSelect: document.getElementById('rawParamSelect'),
			 rawParamSyncButton: document.getElementById('rawParamSyncButton'),
			 rawParamSaveButton: document.getElementById('rawParamSaveButton'),
			 hexEditorTableBody: document.getElementById('hexEditorTableBody'),
			 hexEditorPlaceholder: document.getElementById('hexEditorPlaceholder'),
        };
		
 const controllerElements = {
             syncButton: document.getElementById('controllerSyncButton'),
             saveButton: document.getElementById('controllerSaveButton'),
             // Realtime 0
             rt0RemainCapValue: document.getElementById('ctrlRt0RemainCapValue'),
             rt0RemainDistValue: document.getElementById('ctrlRt0RemainDistValue'),
             rt0SingleTripValue: document.getElementById('ctrlRt0SingleTripValue'),
             rt0CadenceValue: document.getElementById('ctrlRt0CadenceValue'),
             rt0TorqueValue: document.getElementById('ctrlRt0TorqueValue'),
             // Realtime 1
             rt1VoltageValue: document.getElementById('ctrlRt1VoltageValue'),
             rt1TempValue: document.getElementById('ctrlRt1TempValue'),
             rt1MotorTempValue: document.getElementById('ctrlRt1MotorTempValue'),
             rt1CurrentValue: document.getElementById('ctrlRt1CurrentValue'),
             rt1SpeedValue: document.getElementById('ctrlRt1SpeedValue'),
             rtPlaceholder: document.getElementById('ctrlRtPlaceholder'),
             // Electric P1
             p1SysVoltageSelect: document.getElementById('ctrlP1SysVoltageSelect'),
             p1SysVoltageRawValue: document.getElementById('ctrlP1SysVoltageRawValue'),
             p1CurrentLimitValue: document.getElementById('ctrlP1CurrentLimitValue'),
             p1CurrentLimitInput: document.getElementById('ctrlP1CurrentLimitInput'),
			 p1MaxCurrentLowChargeValue: document.getElementById('ctrlP1MaxCurrentLowChargeValue'),
             p1MaxCurrentLowChargeInput: document.getElementById('ctrlP1MaxCurrentLowChargeInput'),			 
             p1OverVoltageValue: document.getElementById('ctrlP1OverVoltageValue'),
             p1OverVoltageInput: document.getElementById('ctrlP1OverVoltageInput'),
             p1UnderVoltageLoadValue: document.getElementById('ctrlP1UnderVoltageLoadValue'),
             p1UnderVoltageLoadInput: document.getElementById('ctrlP1UnderVoltageLoadInput'),
             p1UnderVoltageIdleValue: document.getElementById('ctrlP1UnderVoltageIdleValue'),
             p1UnderVoltageIdleInput: document.getElementById('ctrlP1UnderVoltageIdleInput'),
             electricPlaceholder: document.getElementById('ctrlElectricPlaceholder'),
             // Battery P1
             p1BattCapacityValue: document.getElementById('ctrlP1BattCapacityValue'),
             p1BattCapacityInput: document.getElementById('ctrlP1BattCapacityInput'),
             p1LimpModeSocValue: document.getElementById('ctrlP1LimpModeSocValue'),
             p1LimpModeSocInput: document.getElementById('ctrlP1LimpModeSocInput'),			 
             p1FullRangeValue: document.getElementById('ctrlP1FullRangeValue'),
             p1FullRangeInput: document.getElementById('ctrlP1FullRangeInput'),
             batteryPlaceholder: document.getElementById('ctrlBatteryPlaceholder'),
			 
             // Mechanical P1
             p1GearRatioValue: document.getElementById('ctrlP1GearRatioValue'),
             p1CoasterBrakeValue: document.getElementById('ctrlP1CoasterBrakeValue'),
             p1MaxRpmValue: document.getElementById('ctrlP1MaxRpmValue'),
             p1CadenceSignalsValue: document.getElementById('ctrlP1CadenceSignalsValue'),
             p1MotorTypeValue: document.getElementById('ctrlP1MotorTypeValue'),
             p1SpeedMagnetsValue: document.getElementById('ctrlP1SpeedMagnetsValue'),
             p1SpeedMagnetsInput: document.getElementById('ctrlP1SpeedMagnetsInput'),
             p1TempSensorValue: document.getElementById('ctrlP1TempSensorValue'),
             p1LampsOnValue: document.getElementById('ctrlP1LampsOnValue'),
             p1LampsOnInput: document.getElementById('ctrlP1LampsOnInput'),
             mechPlaceholder: document.getElementById('ctrlMechPlaceholder'),
             // Driving P1
             p1StartCurrentValue: document.getElementById('ctrlP1StartCurrentValue'),
             p1StartCurrentInput: document.getElementById('ctrlP1StartCurrentInput'),
             p1CurrentLoadTimeValue: document.getElementById('ctrlP1CurrentLoadTimeValue'),
             p1CurrentLoadTimeInput: document.getElementById('ctrlP1CurrentLoadTimeInput'),
             p1CurrentShedTimeValue: document.getElementById('ctrlP1CurrentShedTimeValue'),
             p1CurrentShedTimeInput: document.getElementById('ctrlP1CurrentShedTimeInput'),
             p1PedalTypeValue: document.getElementById('ctrlP1PedalTypeValue'),
             p1PedalTypeInput: document.getElementById('ctrlP1PedalTypeInput'),
             drivingPlaceholder: document.getElementById('ctrlDrivingPlaceholder'),
             // Throttle P1
             p1ThrottleStartValue: document.getElementById('ctrlP1ThrottleStartValue'),
             p1ThrottleStartInput: document.getElementById('ctrlP1ThrottleStartInput'),
             p1ThrottleEndValue: document.getElementById('ctrlP1ThrottleEndValue'),
             p1ThrottleEndInput: document.getElementById('ctrlP1ThrottleEndInput'),
             throttlePlaceholder: document.getElementById('ctrlThrottlePlaceholder'),
             // Speed Params (P3)
             p3SpeedLimitValue: document.getElementById('ctrlP3SpeedLimitValue'),
             p3SpeedLimitInput: document.getElementById('ctrlP3SpeedLimitInput'),
             p3WheelDiameterValue: document.getElementById('ctrlP3WheelDiameterValue'),
             p3WheelDiameterInput: document.getElementById('ctrlP3WheelDiameterInput'),
             p3CircumferenceValue: document.getElementById('ctrlP3CircumferenceValue'),
             p3CircumferenceInput: document.getElementById('ctrlP3CircumferenceInput'),
			 p1WalkAssistSpeedValue: document.getElementById('ctrlP1WalkAssistSpeedValue'),
             p1WalkAssistSpeedInput: document.getElementById('ctrlP1WalkAssistSpeedInput'),
             speedPlaceholder: document.getElementById('ctrlSpeedPlaceholder'),
             // Calibration
             calibratePositionButton: document.getElementById('ctrlCalibratePositionButton'),
          };
		 //Selectors for Info Tab
 const infoElements = {
            syncButton: document.getElementById('infoSyncButton'),
            saveButton: document.getElementById('infoSaveButton'), // Added Save Button
            // Controller Info
            ctrlHwVersionValue: document.getElementById('infoCtrlHwVersionValue'),
            ctrlSwVersionValue: document.getElementById('infoCtrlSwVersionValue'),
            ctrlModelNumberValue: document.getElementById('infoCtrlModelNumberValue'),
            ctrlSnValue: document.getElementById('infoCtrlSnValue'),
            ctrlMfgValue: document.getElementById('infoCtrlMfgValue'),
            ctrlMfgInput: document.getElementById('infoCtrlMfgInput'), // Added Input
            ctrlPlaceholder: document.getElementById('infoCtrlPlaceholder'),
            // Display Info
            displayHwVersionValue: document.getElementById('infoDisplayHwVersionValue'),
            displaySwVersionValue: document.getElementById('infoDisplaySwVersionValue'),
            displayModelNumberValue: document.getElementById('infoDisplayModelNumberValue'),
            displayBootloaderVersionValue: document.getElementById('infoDisplayBootloaderVersionValue'),
            displaySnValue: document.getElementById('infoDisplaySnValue'),
            displayMfgValue: document.getElementById('infoDisplayMfgValue'),
            displayMfgInput: document.getElementById('infoDisplayMfgInput'), // Added Input
            displayCnValue: document.getElementById('infoDisplayCnValue'),
            displayCnInput: document.getElementById('infoDisplayCnInput'), // Added Input
            displayPlaceholder: document.getElementById('infoDisplayPlaceholder'),
            // Sensor Info
            sensorHwVersionValue: document.getElementById('infoSensorHwVersionValue'),
            sensorSwVersionValue: document.getElementById('infoSensorSwVersionValue'),
            sensorModelNumberValue: document.getElementById('infoSensorModelNumberValue'),
            sensorSnValue: document.getElementById('infoSensorSnValue'),
            sensorPlaceholder: document.getElementById('infoSensorPlaceholder'),
            // Battery Info
            batteryHwVersionValue: document.getElementById('infoBatteryHwVersionValue'),
            batterySwVersionValue: document.getElementById('infoBatterySwVersionValue'),
            batteryModelNumberValue: document.getElementById('infoBatteryModelNumberValue'),
            batterySnValue: document.getElementById('infoBatterySnValue'),
            batteryPlaceholder: document.getElementById('infoBatteryPlaceholder'),
        };

        // --- Global state for CAN connection ---
        let isCanDeviceFound = false;
        let isCanConnected = false;
        let currentCanDeviceName = null;
		
        // --- Data Storage (Add Controller Specific) ---
		let lastControllerP0 = null
		let lastControllerP1 = null;
        let lastControllerP2 = null;
		let lastStartupAngle = null; // Store the last read angle
		
		let currentRawParamType = null; // e.g., 'controller_params_1'
		let rawParamData = {};
		
        let displayData1 = null, displayData2 = null, displayRealtime = null, displayErrors = null;
        let displayOtherInfo = { hwVersion: null, swVersion: null, modelNumber: null, bootloaderVersion: null, serialNumber: null, manufacturer: null, customerNumber: null };
        let sensorRealtime = null;
        let sensorOtherInfo = { hwVersion: null, swVersion: null, modelNumber: null, serialNumber: null };
        let batteryCapacity = null, batteryState = null, batteryCells = {}, batteryOtherInfo = { hwVersion: null, swVersion: null, modelNumber: null, serialNumber: null };
        // Controller specific stores
        let controllerRealtime0 = null, controllerRealtime1 = null; 
		let controllerParams0 = null; controllerParams1 = null, controllerParams2 = null, controllerSpeedParams = null;
        let controllerOtherInfo = { hwVersion: null, swVersion: null, modelNumber: null, serialNumber: null, manufacturer: null };
		let displayShutdownTime = null; // <-- Add storage for shutdown time
		
		const START_PULSE_MIN = 1;
		const START_PULSE_MAX = 48 // Based on original input constraints
		
		// --- Chart instances (initialize to null) ---
		let pasChart = null;
		let startRampChart = null;

		// --- Constants for Charting (adjust as needed) ---
		const MAX_HUMAN_POWER_X_AXIS = 300; 
		const MAX_MOTOR_POWER_Y_AXIS_DEFAULT_SCALE = 550; 
		const MAX_TIME_X_AXIS_START_RAMP = 3000;
		const EFFICIENCY_FACTOR = 0.78; 

		const PAS_LEVEL_COLORS = ['#808080', '#FF0000', '#FFA500', '#FFFF00', '#008000', '#0000FF', '#4B0082', '#EE82EE', '#A52A2A']; // Grey, Red, Orange, Yellow, Green, Blue, 
		
        const wheelDiameterTable = [
            // Copied from BafangCanConstants.ts - verify codes if necessary
            { text: '6″', minimalCircumference: 400, maximalCircumference: 880, code: [0x60, 0x00] },
            { text: '7″', minimalCircumference: 520, maximalCircumference: 880, code: [0x70, 0x00] },
            { text: '8″', minimalCircumference: 520, maximalCircumference: 880, code: [0x80, 0x00] },
            { text: '10″', minimalCircumference: 520, maximalCircumference: 880, code: [0xa0, 0x00] },
            { text: '12″', minimalCircumference: 910, maximalCircumference: 1300, code: [0xc0, 0x00] },
            { text: '14″', minimalCircumference: 910, maximalCircumference: 1300, code: [0xe0, 0x00] },
            { text: '16″', minimalCircumference: 1208, maximalCircumference: 1600, code: [0x00, 0x01] },
            { text: '17″', minimalCircumference: 1208, maximalCircumference: 1600, code: [0x10, 0x01] },
            { text: '18″', minimalCircumference: 1208, maximalCircumference: 1600, code: [0x10, 0x01] }, // Note: Same code as 17" in original
            { text: '20″', minimalCircumference: 1290, maximalCircumference: 1880, code: [0x40, 0x01] },
            { text: '22″', minimalCircumference: 1290, maximalCircumference: 1880, code: [0x60, 0x01] },
            { text: '23″', minimalCircumference: 1290, maximalCircumference: 1880, code: [0x70, 0x01] },
            { text: '24″', minimalCircumference: 1290, maximalCircumference: 2200, code: [0x80, 0x01] },
            { text: '25″', minimalCircumference: 1880, maximalCircumference: 2200, code: [0x90, 0x01] },
            { text: '26″', minimalCircumference: 1880, maximalCircumference: 2510, code: [0xa0, 0x01] },
            { text: '27″', minimalCircumference: 1880, maximalCircumference: 2510, code: [0xb0, 0x01] },
            { text: '27.5″', minimalCircumference: 1880, maximalCircumference: 2510, code: [0xb5, 0x01] },
            { text: '28″', minimalCircumference: 1880, maximalCircumference: 2510, code: [0xc0, 0x01] },
            { text: '29″', minimalCircumference: 1880, maximalCircumference: 2510, code: [0xd0, 0x01] },
            { text: '32″', minimalCircumference: 2200, maximalCircumference: 2652, code: [0x00, 0x02] },
            { text: '400 mm', minimalCircumference: 1208, maximalCircumference: 1600, code: [0x00, 0x19] },
            { text: '450 mm', minimalCircumference: 1208, maximalCircumference: 1600, code: [0x10, 0x2c] },
            { text: '600 mm', minimalCircumference: 1600, maximalCircumference: 2200, code: [0x80, 0x25] },
            { text: '650 mm', minimalCircumference: 1600, maximalCircumference: 2200, code: [0xa0, 0x28] },
            { text: '700 mm', minimalCircumference: 1880, maximalCircumference: 2510, code: [0xc0, 0x2b] },
        ];
        // --- End Wheel Data ---

		const rawParamFieldMappings = {
			controller_params_0: {
				byteLength: 64,
				fields: [
					{ index: 0, length: 1, name: 'par0_value_offset_0' },
					// Acceleration Levels (9 levels, 1 byte each)
					...Array.from({ length: 9 }, (_, i) => ({ index: 1 + i, length: 1, name: `acceleration_levels[${i}].acceleration_level` })),
					...Array.from({ length: 9 }, (_, i) => ({index: 10 + (i * 2),length: 2, name: `assist_ratio_levels[${i}].assist_ratio`})),
					{ index: 28, length: 2, name: 'assist_ratio_upper_limit' }, 
					{ index: 30, length: 32, name: 'unknown_bytes' }, // Representing the block
					{ index: 63, length: 1, name: 'checksum' }
				]
			},
			controller_params_1: {
				byteLength: 64, // Expected length of P1
				fields: [
					{ index: 0, length: 1, name: 'system_voltage' },
					{ index: 1, length: 1, name: 'current_limit' },
					{ index: 2, length: 1, name: 'overvoltage' },
					{ index: 3, length: 1, name: 'undervoltage' },
					{ index: 4, length: 1, name: 'undervoltage_under_load' },
					{ index: 5, length: 1, name: 'battery_recovery_voltage' },
					{ index: 6, length: 1, name: 'par1_value_offset_6' },
					{ index: 7, length: 2, name: 'battery_capacity (LE)' }, // Little Endian
					{ index: 9, length: 1, name: 'max_current_on_low_charge' },
					{ index: 10, length: 1, name: 'limp_mode_soc_limit' },
					{ index: 11, length: 1, name: 'limp_mode_soc_limit stage 2 ' },
					{ index: 12, length: 1, name: 'full capacity mileage display' },
					{ index: 13, length: 1, name: 'pedal_sensor_type' },
					{ index: 14, length: 1, name: 'coaster_brake (0/1)' },
					{ index: 15, length: 1, name: 'pedal_sensor_signals_per_rotation' },
					{ index: 16, length: 1, name: 'speed_sensor_channel_number' },
					{ index: 17, length: 1, name: 'check teeth for heel torque' },
					{ index: 18, length: 1, name: 'motor_type' },
					{ index: 19, length: 1, name: 'motor_pole_pair_number' },
					{ index: 20, length: 1, name: 'speedmeter_magnets_number' },
					{ index: 21, length: 1, name: 'temperature_sensor_type' },
					{ index: 22, length: 2, name: 'deaceleration_ratio (x100, LE)' },
					{ index: 24, length: 2, name: 'motor_max_rotor_rpm (LE)' },
					{ index: 26, length: 2, name: 'D-axis  inductance uH (LE)' },
					{ index: 28, length: 2, name: 'Q-axis  inductance uH(LE)' },
					{ index: 30, length: 2, name: 'Phase resistance mΩ (LE)' },
					{ index: 32, length: 2, name: 'Reverse potential coefficient 0.001V/RPM (LE)' },
					{ index: 34, length: 1, name: 'throttle_start_voltage (x10)' },
					{ index: 35, length: 1, name: 'throttle_max_voltage (x10)' },
					{ index: 36, length: 1, name: 'speed_limit_enabled' },
					{ index: 37, length: 1, name: 'start_current (%)' },
					// Assist Levels (9 levels, current_limit then speed_limit)
					...Array.from({ length: 9 }, (_, i) => ({ index: 40 + i, length: 1, name: `assist_levels[${i}].current_limit` })),
					...Array.from({ length: 9 }, (_, i) => ({ index: 49 + i, length: 1, name: `assist_levels[${i}].speed_limit` })),
					{ index: 58, length: 1, name: 'displayless_mode (0/1)' },
					{ index: 59, length: 1, name: 'lamps_always_on (0/1)' },
					{ index: 60, length: 2, name: 'walk_assist_speed (x100 Km/H, LE)' },
					// Index 62 is often reserved/unused
					{ index: 63, length: 1, name: 'checksum' }
				]
			},
			controller_params_2: {
				byteLength: 64,
				fields: [
					// Torque Profiles (6 profiles, various params)
					// Example for profile 0:
					{ index: 0, length: 1, name: 'torque_profiles[0].start_torque_value' },
					{ index: 6, length: 1, name: 'torque_profiles[0].max_torque_value' },
					...Array.from({ length: 6 }, (_, i) => ({ index: 0 + i, length: 1, name: `TP[${i}].StartTorque` })),
					...Array.from({ length: 6 }, (_, i) => ({ index: 6 + i, length: 1, name: `TP[${i}].MaxTorque` })),
					...Array.from({ length: 6 }, (_, i) => ({ index: 12 + i, length: 1, name: `TP[${i}].ReturnTorque` })),
					...Array.from({ length: 6 }, (_, i) => ({ index: 18 + i, length: 1, name: `TP[${i}].MaxCurrent` })), // Max Current
					...Array.from({ length: 6 }, (_, i) => ({ index: 24 + i, length: 1, name: `TP[${i}].MinCurrent` })), // Min Current
					{ index: 30, length: 6, name: 'unknown_bytes' }, // Representing the block
					...Array.from({ length: 6 }, (_, i) => ({ index: 36 + i, length: 1, name: `TP[${i}].StartPulse` })),
					...Array.from({ length: 6 }, (_, i) => ({ index: 42 + i, length: 1, name: `TP[${i}].DecayTime (x5ms)` })),
					...Array.from({ length: 6 }, (_, i) => ({ index: 48 + i, length: 1, name: `TP[${i}].StopDelay (x2ms)` })),
					{ index: 54, length: 1, name: 'acceleration_level' },
					{ index: 55, length: 1, name: 'motor overheating temperature?' },
				    { index: 56, length: 1, name: 'temperature?' },						
					// Indices 55-62 are likely unused or unknown for P2
					{ index: 63, length: 1, name: 'checksum' }
				]
			},
			controller_speed_params: {
				byteLength: 6, // Speed params are shorter
				fields: [
					{ index: 0, length: 2, name: 'speed_limit (x100 Km/H, LE)' },
					{ index: 2, length: 1, name: 'wheel_diameter_code[0]' },
					{ index: 3, length: 1, name: 'wheel_diameter_code[1]' },
					{ index: 4, length: 2, name: 'circumference (mm, LE)' }
					// No checksum defined for this short packet in most parsers
				]
			},
			controller_params_6017: { // Matches the value in the <option>
				byteLength: 64, // As per 05106017 data [0x40] -> 64 bytes total
				fields: [
					{ index: 0, length: 48, name: 'unknown_bytes_0_47' },
					{ index: 48, length: 1, name: 'Current loading initial value', unit: 'ms' },
					{ index: 49, length: 1, name: 'Current loading and cadence K1', unit: 'ms' },
					{ index: 50, length: 1, name: 'Current loading and cadence K2', unit: 'ms' },
					{ index: 51, length: 1, name: 'Current loading and cadence k3', unit: 'ms' },
					{ index: 52, length: 1, name: 'Current loading and cadence K4', unit: 'ms', },
					{ index: 53, length: 1, name: 'Constant torque start value', unit: 'mV', notes: 'Cmd 6017, Byte 53' },
					{ index: 54, length: 2, name: 'Torque start and cadence K5 (LE)', unit: 'mV' },
					{ index: 56, length: 2, name: 'Minimum torque constant (LE)', unit: 'mV', },
					{ index: 58, length: 2, name: 'Minimum torque and cadence K6 (LE)', },
					{ index: 60, length: 2, name: 'Magnification of the couple (LE)', },
					{ index: 62, length: 1, name: 'unknown_byte_62', },
					{ index: 63, length: 1, name: 'checksum', }
				]
			},
			controller_params_6018: { // Matches the value in the <option>
				byteLength: 64, // As per 05106018 data [0x40] -> 64 bytes total
				fields: [
					{ index: 0, length: 2, name: 'Speed/Current Limit 1 Total Battery Capacity (LE)', unit: '0.1Ah', },
					{ index: 2, length: 2, name: 'Speed/Current Limit 2 Total Battery Capacity (LE)', unit: '0.1Ah', },
					{ index: 4, length: 2, name: 'Speed Limit 1 (LE)', unit: '0.1Km/h', },
					{ index: 6, length: 2, name: 'Current Limit 1 (LE)', unit: '0.1A', },
					{ index: 8, length: 2, name: 'Speed Limit 2 (LE)', unit: '0.1Km/h', },
					{ index: 10, length: 2, name: 'Current Limit 2 (LE)', unit: '0.1A', },
					// Bytes 12-62 are padding (FFs) according to multi-frame description for 0x6018
					{ index: 12, length: 51, name: 'padding_bytes_12_62', },
					{ index: 63, length: 1, name: 'checksum', }
				]
			}
		};

		function calculateStartPulse(angle, signalsPerRotation) {
		    if (angle === null || angle === undefined || signalsPerRotation === null || signalsPerRotation === undefined || signalsPerRotation <= 0 || angle < 0) {
		        console.warn(`Cannot calculate Start Pulse: Invalid input (Angle: ${angle}, Signals: ${signalsPerRotation})`);
		        return START_PULSE_MIN; // Return minimum valid value as default/fallback
		    }
		
		    // Calculate pulses per degree
		    const pulsesPerDegree = signalsPerRotation / 360.0;
		
		    // Calculate required pulses for the angle
		    let calculatedPulses = Math.round(angle * pulsesPerDegree);
		
		    // Clamp the result within the valid range (1-24)
		    calculatedPulses = Math.max(START_PULSE_MIN, Math.min(START_PULSE_MAX, calculatedPulses));
		
		    return calculatedPulses;
		}
		
		// --- Assist Level Mapping ---
		const assistLevelMap = {
        // Map: [Total Levels]: { Code: DisplayValue }
		3: { 0: 0, 12: 1, 2: 2, 3: 3, 6: 'walk' },
        5: { 0: 0, 11: 1, 13: 2, 21: 3, 23: 4, 3: 5, 6: 'walk' },
        9: { 0: 0, 1: 1, 11: 2, 12: 3, 13: 4, 2: 5, 21: 6, 22: 7, 23: 8, 3: 9, 6: 'walk' }
		};

		function decodeCurrentAssistLevel(currentAssistLevelCode, totalAssistLevels) {
			if (currentAssistLevelCode === null || currentAssistLevelCode === undefined ||
				totalAssistLevels === null || totalAssistLevels === undefined) {
				return na; // Not Available if inputs are missing
			}

			// Normalize totalAssistLevels if needed (as per original parser logic)
			let effectiveTotalLevels = totalAssistLevels;
			if (!assistLevelMap[effectiveTotalLevels]) {
				 // Fallback to 5 levels if the exact total isn't mapped (except 3,  9)
				 if (effectiveTotalLevels !== 3 && effectiveTotalLevels !== 9) {
					effectiveTotalLevels = 5;
				 }
			}


			const levelMapping = assistLevelMap[effectiveTotalLevels];
			if (levelMapping && levelMapping[currentAssistLevelCode] !== undefined) {
				return levelMapping[currentAssistLevelCode];
			}

			console.warn(`Unknown assist level code ${currentAssistLevelCode} for total levels ${totalAssistLevels}`);
			return `Code ${currentAssistLevelCode}`; // Fallback for unknown codes
		}

        // --- Utility Functions ---
        function enableAppControls(enable) {
            tabButtons.forEach(button => button.disabled = !enable);
            // Disable all inputs/buttons *within* tab contents if not connected
            tabContents.forEach(tabContent => {
                tabContent.querySelectorAll('button, input, select, textarea').forEach(ctrl => {
                    // Don't disable the main connect button or debug tab's custom send if it's managed separately
                    if (ctrl.id !== 'connectCanButton' && !(ctrl.closest('#tab-debug') && (ctrl.id === 'sendCustomFrame' || ctrl.id === 'canIdInput' || ctrl.id === 'canDataInput'))) {
                         ctrl.disabled = !enable;
                    }
                });
            });

             // Enable debug tab's custom send controls regardless of main connection for raw testing
             if (debugElements.sendCustomFrameButton) debugElements.sendCustomFrameButton.disabled = false;
             if (debugElements.canIdInput) debugElements.canIdInput.disabled = false;
             if (debugElements.canDataInput) debugElements.canDataInput.disabled = false;
        }


        // Centralized function to update CAN interface status display
  function updateCanInterfaceDisplay(statusType, deviceName = null) {

            if (!statusIndicator || !statusText || !connectCanButton || !canDeviceNameElement) {
                 console.error("One or more essential UI status elements are missing!");
                 addLog("ERROR", "UI Error: Status elements missing.");
                 return;
            }

            isCanDeviceFound = false;
            isCanConnected = false;

            statusIndicator.classList.remove('connected', 'found');
            statusIndicator.style.backgroundColor = '';

            // --- Trim statusType just in case there's hidden whitespace ---
            const trimmedStatusType = typeof statusType === 'string' ? statusType.trim() : statusType;
            console.log(`Trimmed Status Type for Switch: '${trimmedStatusType}'`);


            switch (trimmedStatusType) { // Use the trimmed version

                case 'NOT_FOUND': // Was 'DEVICE_NOT_FOUND'
                    currentCanDeviceName = null;
                    statusText.textContent = 'Disconnected';
                    statusIndicator.style.backgroundColor = '#dc3545'; // Red
                    connectCanButton.textContent = 'Connect';
                    connectCanButton.disabled = true;
                    canDeviceNameElement.textContent = 'No compatible device detected.';
                    enableAppControls(false);
                    break;
                case 'FOUND': // Was 'DEVICE_FOUND'
                    isCanDeviceFound = true;
                    currentCanDeviceName = deviceName;
                    statusText.textContent = `Disconnected`;
                    statusIndicator.classList.add('found'); // Orange
                    connectCanButton.textContent = 'Connect';
                    connectCanButton.disabled = false;
                    canDeviceNameElement.textContent = `Device: ${deviceName}`;
                    enableAppControls(false);
                    break;
                case 'CONNECTED': // Keep as is
                    isCanDeviceFound = true;
                    isCanConnected = true;
                    currentCanDeviceName = deviceName;
                    statusText.textContent = `Connected`;
                    statusIndicator.classList.add('connected'); // Green
                    connectCanButton.textContent = 'Disconnect';
                    connectCanButton.disabled = false;
                    canDeviceNameElement.textContent = `Device: ${deviceName}`;
                    enableAppControls(true);
                    break;
                case 'DISCONNECTED': // Was 'DISCONNECTED_DEVICE_STILL_PRESENT'
                    isCanDeviceFound = true; // Assume found until proven otherwise by next check
                    currentCanDeviceName = deviceName; // Keep last known name for now
                    statusText.textContent = `Disconnected`;
                    statusIndicator.classList.add('found'); // Orange
                    connectCanButton.textContent = 'Connect';
                    connectCanButton.disabled = false; // Enable connect if device might be there
                    canDeviceNameElement.textContent = `Device: ${deviceName}`;
                    enableAppControls(false);
                    break;
                case 'CONNECTING': // Keep as is
                    currentCanDeviceName = deviceName;
                    statusText.textContent = `Connecting...`;
                    statusIndicator.style.backgroundColor = '#ffc107'; // Yellow/Orange
                    connectCanButton.textContent = 'Connecting...';
                    connectCanButton.disabled = true;
                    canDeviceNameElement.textContent = deviceName ? `Device: ${deviceName}` : 'Attempting connection...';
                    enableAppControls(false);
                    break;
                case 'DISCONNECTING': // Keep as is
                    statusText.textContent = `Disconnecting`;
                    statusIndicator.style.backgroundColor = '#ffc107'; // Yellow/Orange
                    connectCanButton.textContent = 'Disconnecting...';
                    connectCanButton.disabled = true;
                    enableAppControls(false);
                    break;
                case 'ERROR': // Added explicit ERROR case
                     // Device status is uncertain after error, default to not found
                     currentCanDeviceName = null;
                     statusText.textContent = `Error: ${deviceName || 'Unknown CAN Error'}`; // Use deviceName field for error message here
                     statusIndicator.style.backgroundColor = '#dc3545'; // Red
                     connectCanButton.textContent = 'Connect';
                     connectCanButton.disabled = true;
                     canDeviceNameElement.textContent = 'Check connection or logs.';
                     enableAppControls(false);
                     break;
                // --- END CHANGES ---
                default:
                    currentCanDeviceName = null;
                    statusText.textContent = 'Status Unknown';
                    statusIndicator.style.backgroundColor = '#6c757d'; // Grey
                    connectCanButton.textContent = 'Connect';
                    connectCanButton.disabled = true;
                    canDeviceNameElement.textContent = '';
                    enableAppControls(false);
            }
        }

        function enableControls(enable) { allControls.forEach(ctrl => ctrl.disabled = !enable); }
		
		function updateStatus(connected, message = '') {
			console.log(`updateStatus called: connected=${connected}, message="${message}"`); // <-- ADD THIS
			statusIndicator.classList.toggle('connected', connected);
			statusText.textContent = connected ? `Connected ${message}` : `Disconnected ${message}`;
			enableControls(connected);
		}
		
		function addLog(prefix, data, details = null) { // Added 'details' parameter
            const entry = document.createElement('div'); entry.classList.add('log-entry');
            const timeSpan = document.createElement('span'); timeSpan.classList.add('log-time'); timeSpan.textContent = `[${new Date().toLocaleTimeString()}]`;
            const prefixSpan = document.createElement('span'); prefixSpan.classList.add('log-prefix'); prefixSpan.classList.add(prefix.toLowerCase().replace(/[^a-z0-9]/g, '_')); prefixSpan.textContent = `${prefix}:`;
            const dataSpan = document.createElement('span'); dataSpan.classList.add('log-data');

            // Standard data formatting
            if ((prefix.toLowerCase().includes('rx') || prefix.toLowerCase().includes('info')) && typeof data === 'object' && data !== null) { const pre = document.createElement('pre'); try { pre.textContent = JSON.stringify(data, null, 2); } catch (e) { pre.textContent = "[Unstringifiable Object]"; } dataSpan.appendChild(pre); }
            else if (typeof data === 'object' && data !== null) { try { dataSpan.textContent = JSON.stringify(data); } catch (e) { dataSpan.textContent = "[Unstringifiable Object]"; } }
            else { dataSpan.textContent = String(data); }

            entry.appendChild(timeSpan);
            entry.appendChild(prefixSpan);
            entry.appendChild(dataSpan);

            // --- Add Details (e.g., CAN ID) ---
            if (details) {
                const detailsSpan = document.createElement('span');
                detailsSpan.style.marginLeft = '10px';
                detailsSpan.style.color = '#adb5bd'; // Lighter grey for details
                detailsSpan.style.fontSize = '11px';
                detailsSpan.textContent = `(${details})`;
                entry.appendChild(detailsSpan);
            }
            // --- End Add Details ---

            log.appendChild(entry);
            log.scrollTop = log.scrollHeight;
        }

      // Helper function for safe updates
	  
        const safeSetText = (element, value, formatter = getNullableString) => {
            if (element) {
                // Format the value *before* setting textContent
                element.textContent = formatter(value);
            } else console.warn("UI Update failed: Text element is null for value:", value);
        };

        // Helper for simple inputs (pre-fills if empty)
        const safeSetInput = (inputElement, dataObject, dataKey) => {
            if (inputElement && dataObject && inputElement.value === "") {
                // *** Check if the specific key exists and is not null/undefined ***
                const dataValue = dataObject[dataKey];
                if (dataValue !== null && dataValue !== undefined) {
                    inputElement.value = dataValue;
                } else {
                    inputElement.value = ""; // Keep it empty if data is null/undefined
                }
            } else if (!inputElement) {
                 console.warn("UI Update failed: Input element is null for key:", dataKey);
            }
        };

         // Helper for formatted inputs (pre-fills if empty)
        const safeSetFormattedInput = (inputElement, dataObject, dataKey, formatter) => {
             if (inputElement && dataObject && inputElement.value === "") {
                  // *** Check if the specific key exists and is not null/undefined ***
                 const dataValue = dataObject[dataKey];
                 if (dataValue !== null && dataValue !== undefined) {
                      // Apply formatter only if value is valid
                      try {
                          inputElement.value = formatter(dataValue) ?? ""; // Use formatter, default to "" if formatter returns null/undefined
                      } catch (e) {
                          console.error(`Error formatting input for ${dataKey}:`, e);
                          inputElement.value = ""; // Set empty on format error
                      }
                 } else {
                     inputElement.value = ""; // Keep it empty if data is null/undefined
                 }
             } else if (!inputElement) {
                  console.warn("UI Update failed: Formatted input element is null for key:", dataKey);
             }
         };

         // Helper for boolean selects (pre-fills if empty)
        const safeSetSelectBoolean = (selectElement, dataObject, dataKey, trueValue = "true", falseValue = "false") => {
             if (selectElement && dataObject && selectElement.value === "") {
                 // *** Check if the specific key exists and is not null/undefined ***
                  const dataValue = dataObject[dataKey];
                 if (dataValue !== null && dataValue !== undefined) {
                    selectElement.value = dataValue ? trueValue : falseValue;
                 } else {
                     selectElement.value = ""; // Set to default/empty option
                 }
             } else if (!selectElement) {
                  console.warn("UI Update failed: Boolean select element is null for key:", dataKey);
             }
         };

         // Helper for direct value selects (pre-fills if empty)
        const safeSetSelectDirect = (selectElement, dataObject, dataKey) => {
             if (selectElement && dataObject && selectElement.value === "") {
                  // *** Check if the specific key exists and is not null/undefined ***
                  const dataValue = dataObject[dataKey];
                 if (dataValue !== null && dataValue !== undefined) {
                      selectElement.value = dataValue;
                 } else {
                      selectElement.value = ""; // Set to default/empty option
                 }
             } else if (!selectElement) {
                  console.warn("UI Update failed: Direct select element is null for key:", dataKey);
             }
         };

		const uiToInternalAssistMap = {
			3: { 1: 2, 2: 4, 3: 8 },
			5: { 1: 1, 2: 3, 3: 5, 4: 7, 5: 8 },
			9: { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8 }
		}; 
		
        function switchTab(targetTabId) {tabButtons.forEach(button => { button.classList.toggle('active', button.getAttribute('data-tab') === targetTabId); }); tabContents.forEach(content => { content.classList.toggle('active', content.id === `tab-${targetTabId}`); }); }
        function getNullableNumber(value, precision = -1) { return (value === null || value === undefined || isNaN(value)) ? na : (precision >= 0 ? value.toFixed(precision) : value); }
        function getNullableString(value) { return (value === null || value === undefined) ? na : value; }
        function getNullableBoolean(value, trueText = 'Yes', falseText = 'No') { return (value === null || value === undefined) ? na : (value ? trueText : falseText); }
		const na = "N/A"; // Placeholder for Not AvailableF

		// --- Get references to new placeholder and container elements ---
		const pasCurvesPlaceholder = document.getElementById('pasCurvesPlaceholder');
		const pasCurvesContainer = document.getElementById('pasCurvesContainer');
		const startRampPlaceholder = document.getElementById('startRampPlaceholder');
		const startRampContainer = document.getElementById('startRampContainer');
			
		function updateDisplayUI() {
    // Records
		safeSetText(displayElements.totalMileageValue, displayData1?.total_mileage);
		safeSetInput(displayElements.totalMileageInput, displayData1, 'total_mileage', Math.round); // Use safeSetInput

		safeSetText(displayElements.singleMileageValue, displayData1?.single_mileage, (val) => getNullableNumber(val, 1));
		safeSetFormattedInput(displayElements.singleMileageInput, displayData1, 'single_mileage', (val) => val?.toFixed(1)); // Use safeSetFormattedInput

		safeSetText(displayElements.maxSpeedValue, displayData1?.max_speed, (val) => getNullableNumber(val, 1));
		safeSetText(displayElements.averageSpeedValue, displayData2?.average_speed, (val) => getNullableNumber(val, 1));
		safeSetText(displayElements.serviceMileageValue, displayData2?.service_mileage, (val) => getNullableNumber(val, 1));

		// Realtime State
		safeSetText(displayElements.assistLevelsValue, displayRealtime?.assist_levels);
		safeSetText(displayElements.modeValue, displayRealtime?.ride_mode);
		safeSetText(displayElements.boostValue, displayRealtime?.boost, (val) => getNullableBoolean(val, 'ON', 'OFF'));

		const decodedAssist = decodeCurrentAssistLevel(
			displayRealtime?.current_assist_level_code, // Use the raw code stored
			displayRealtime?.assist_levels
		);
		safeSetText(displayElements.currentAssistValue, decodedAssist);

		safeSetText(displayElements.lightValue, displayRealtime?.light, (val) => getNullableBoolean(val, 'ON', 'OFF'));
		safeSetText(displayElements.buttonValue, displayRealtime?.button, (val) => getNullableBoolean(val, 'Pressed', 'Not Pressed'));

		// Shutdown Time
		const shutdownVal = displayShutdownTime;
		safeSetText(displayElements.displayShutdownTimeValue, shutdownVal, (val) =>
		 (val === 255) ? "OFF" : (val === null || val === undefined ? na : `${val} min`)
		);

		// Error Codes Table
		const errorBody = displayElements.errorTableBody;
		errorBody.innerHTML = ''; // Clear previous errors
		if (Array.isArray(displayErrors) && displayErrors.length > 0) {
			const errorDescriptions = { 
			04:	"Throttle not in correct position",
			07:	 "Over voltage protection",
			08:	"Hall sensor error",
			09:	"Motor phase winding fault",
			10:	"Motor overtemperature",
			11:	"Motor temperature sensor fault",
			12:	"Motor overcurrent",
			13:	"Battery temperature sensor fault",
			14:	"Controller overtemperature",
			15:	"Controller temperature sensor fault",			
			21: "Speed sensor error",
			25: "Torque signal fault",
			26:	"Torque sensor speed signal fault",
			27:	"Controller overcurrent",
			30:	"Communication failed",	
			33:	"Brake detection circuit fault",
			35:	"15V detection circuit error",	
			36:	"Keypad detection circuit error",
			37:	"WDT circuit fault Controller",
			};
			const errorRecommendations = { 
			04: "Check and adjust throttle position, inspect wiring, replace throttle if needed", 
			07:	"Check battery and charger compatibility, inspect battery, discharge if overcharged",
			08:	"Check hall sensor connections, inspect for damage, replace if necessary",
			09:	"Check motor connections, inspect for damage, test with a different controller",
			10:	"Allow motor to cool down, reduce load, ensure proper ventilation",
			11:	"Check sensor connection, inspect for damage, replace if necessary",
			12:	"Reduce load, check wiring, inspect motor and controller",
			13:	"Check sensor connection, inspect for damage, replace if necessary",
			14:	"Allow controller to cool down, reduce load, ensure proper ventilation",
			15:	"Check sensor connection, inspect for damage, replace if necessary",
			21:	"Check sensor connection, inspect for damage, realign magnets",
			25: "Check sensor connection, inspect for damage, replace if necessary",
			26:	"Check sensor connection, inspect for damage, replace if necessary",
			27:	"Reduce load, check wiring, inspect motor and controller",
			30:	"Check connections, update firmware, replace faulty components",
			33:	"Check sensor connection, inspect wiring, replace sensor if needed",
			35:	"Check power supply and connections, replace damaged components",
			36:	"Check keypad connection, inspect wiring, replace keypad if needed",
			37:	"Consult a professional for diagnosis and repair",
			};
			displayErrors.forEach(code => {
				const row = errorBody.insertRow();
				row.insertCell(0).textContent = code;
				row.insertCell(1).textContent = errorDescriptions[code] || "Unknown Description";
				row.insertCell(2).textContent = errorRecommendations[code] || "-";
			});
		} else if (displayErrors === null) {
			 errorBody.innerHTML = '<tr><td colspan="3">Data not yet received.</td></tr>';
		}
		 else {
			 errorBody.innerHTML = '<tr><td colspan="3">No errors reported.</td></tr>';
		}
}
		
		function updateSensorUI() {
			 // Update only realtime data using corrected selectors
			 safeSetText(sensorElements.sensorTorqueValue, sensorRealtime?.torque);
			 safeSetText(sensorElements.sensorCadenceValue, sensorRealtime?.cadence);

			 // Toggle placeholder based on realtime data only
			 if (sensorElements.realtimePlaceholder) {
				sensorElements.realtimePlaceholder.style.display = sensorRealtime ? 'none' : 'block';
			 }

			 // REMOVED Info update logic - handled by updateInfoUI
		}

		function updateBatteryUI() {
			 // Capacity
			 safeSetText(batteryElements.fullCapacityValue, batteryCapacity?.full_capacity);
			 safeSetText(batteryElements.capacityLeftValue, batteryCapacity?.capacity_left);
			 safeSetText(batteryElements.rsocValue, batteryCapacity?.rsoc);
			 safeSetText(batteryElements.asocValue, batteryCapacity?.asoc);
			 safeSetText(batteryElements.sohValue, batteryCapacity?.soh);
			 if (batteryElements.capacityPlaceholder) batteryElements.capacityPlaceholder.style.display = batteryCapacity ? 'none' : 'block';

			 // State
			 safeSetText(batteryElements.voltageValue, batteryState?.voltage, (val) => getNullableNumber(val, 2));
			 safeSetText(batteryElements.currentValue, batteryState?.current, (val) => getNullableNumber(val, 2));
			 safeSetText(batteryElements.tempValue, batteryState?.temperature);
			 if (batteryElements.statePlaceholder) batteryElements.statePlaceholder.style.display = batteryState ? 'none' : 'block';

			 // Cell Voltages
			 const cellBody = batteryElements.cellVoltageTableBody;
			 if (cellBody) { // Check if element exists
				 cellBody.innerHTML = ''; // Clear previous
				 const cellIndices = Object.keys(batteryCells).map(Number).sort((a, b) => a - b);
				 if (cellIndices.length > 0) {
					 if(batteryElements.cellsPlaceholder) batteryElements.cellsPlaceholder.style.display = 'none';
					 let row = null;
					 cellIndices.forEach((index, i) => {
						 if (i % 4 === 0) { // Start new row every 4 cells
							 row = cellBody.insertRow();
						 }
						 if (row) {
							 const cell = row.insertCell();
							 cell.innerHTML = `<span class="label">Cell ${index + 1}:</span> <span class="value">${batteryCells[index]?.toFixed(3) ?? na} V</span>`;
						 }
					 });
					 // Pad the last row if needed
					 if(row && cellIndices.length % 4 !== 0) {
						 for (let i = cellIndices.length % 4; i < 4; i++) {
							 row.insertCell().textContent = ''; // Empty cell for padding
						 }
					 }
				 } else {
					 if(batteryElements.cellsPlaceholder) batteryElements.cellsPlaceholder.style.display = 'block';
					 cellBody.innerHTML = ''; // Ensure it's empty
				 }
			 } else {
				console.warn("Battery UI Update: Cell voltage table body not found.");
			 }

			 // REMOVED Info update logic - handled by updateInfoUI
		}
			
		function updateControllerUI() {
	
			// Realtime 0
			safeSetText(controllerElements.rt0RemainCapValue, controllerRealtime0?.remaining_capacity);
			safeSetText(controllerElements.rt0RemainDistValue, controllerRealtime0?.remaining_distance, (val) => getNullableNumber(val, 2));
			safeSetText(controllerElements.rt0SingleTripValue, controllerRealtime0?.single_trip, (val) => getNullableNumber(val, 2));
			safeSetText(controllerElements.rt0CadenceValue, controllerRealtime0?.cadence);
			safeSetText(controllerElements.rt0TorqueValue, controllerRealtime0?.torque);
			// Realtime 1
			safeSetText(controllerElements.rt1VoltageValue, controllerRealtime1?.voltage, (val) => getNullableNumber(val, 2));
			safeSetText(controllerElements.rt1TempValue, controllerRealtime1?.temperature);
			safeSetText(controllerElements.rt1MotorTempValue, controllerRealtime1?.motor_temperature);
			safeSetText(controllerElements.rt1CurrentValue, controllerRealtime1?.current, (val) => getNullableNumber(val, 2));
			safeSetText(controllerElements.rt1SpeedValue, controllerRealtime1?.speed, (val) => getNullableNumber(val, 2));
			if (controllerElements.rtPlaceholder) controllerElements.rtPlaceholder.style.display = (controllerRealtime0 || controllerRealtime1) ? 'none' : 'block';

			// Electric P1
            if (controllerParams1) {
                // System Voltage - Dropdown and Raw Value
                const rawVoltage = controllerParams1.system_voltage;
                safeSetText(controllerElements.p1SysVoltageRawValue, rawVoltage, (val) => `(Raw: ${getNullableNumber(val, 0)}V)`);

                if (controllerElements.p1SysVoltageSelect) {
                    let matched = false;
                    const options = controllerElements.p1SysVoltageSelect.options;
                    for (let i = 0; i < options.length; i++) {
                        if (parseInt(options[i].value) === rawVoltage) {
                            controllerElements.p1SysVoltageSelect.value = options[i].value;
                            matched = true;
                            break;
                        }
                    }
				}
                } else {
                // Clear or set to N/A if controllerParams1 is null
                if (controllerElements.p1SysVoltageSelect) controllerElements.p1SysVoltageSelect.value = "";
                safeSetText(controllerElements.p1SysVoltageRawValue, null, () => "(Raw: N/A)");
				}
			safeSetText(controllerElements.p1CurrentLimitValue, controllerParams1?.current_limit);
			safeSetInput(controllerElements.p1CurrentLimitInput, controllerParams1, 'current_limit');
			safeSetText(controllerElements.p1MaxCurrentLowChargeValue, controllerParams1?.max_current_on_low_charge);
			safeSetInput(controllerElements.p1MaxCurrentLowChargeInput, controllerParams1, 'max_current_on_low_charge');
			safeSetText(controllerElements.p1OverVoltageValue, controllerParams1?.overvoltage);
			safeSetInput(controllerElements.p1OverVoltageInput, controllerParams1, 'overvoltage');
			safeSetText(controllerElements.p1UnderVoltageLoadValue, controllerParams1?.undervoltage_under_load);
			safeSetInput(controllerElements.p1UnderVoltageLoadInput, controllerParams1, 'undervoltage_under_load');
			safeSetText(controllerElements.p1UnderVoltageIdleValue, controllerParams1?.undervoltage);
			safeSetInput(controllerElements.p1UnderVoltageIdleInput, controllerParams1, 'undervoltage');
			if (controllerElements.electricPlaceholder) controllerElements.electricPlaceholder.style.display = controllerParams1 ? 'none' : 'block';

			// Battery P1
			safeSetText(controllerElements.p1BattCapacityValue, controllerParams1?.battery_capacity);
			safeSetInput(controllerElements.p1BattCapacityInput, controllerParams1, 'battery_capacity');
			safeSetText(controllerElements.p1LimpModeSocValue, controllerParams1?.limp_mode_soc_limit);
			safeSetInput(controllerElements.p1LimpModeSocInput, controllerParams1, 'limp_mode_soc_limit');
			safeSetText(controllerElements.p1FullRangeValue, controllerParams1?.full_capacity_range);
			safeSetInput(controllerElements.p1FullRangeInput, controllerParams1, 'full_capacity_range');
			if (controllerElements.batteryPlaceholder) controllerElements.batteryPlaceholder.style.display = controllerParams1 ? 'none' : 'block';

			// Mechanical P1
			safeSetText(controllerElements.p1GearRatioValue, controllerParams1?.deceleration_ratio, (val) => getNullableNumber(val, 2));
			safeSetText(controllerElements.p1CoasterBrakeValue, controllerParams1?.coaster_brake, getNullableBoolean);
			safeSetText(controllerElements.p1MaxRpmValue, controllerParams1?.motor_max_rotor_rpm);
			safeSetText(controllerElements.p1CadenceSignalsValue, controllerParams1?.pedal_sensor_signals_per_rotation);
			safeSetText(controllerElements.p1MotorTypeValue, controllerParams1?.motor_type); // Display number for now
			safeSetText(controllerElements.p1TempSensorValue, controllerParams1?.temperature_sensor_type); // Display number
			safeSetText(controllerElements.p1SpeedMagnetsValue, controllerParams1?.speedmeter_magnets_number);
			safeSetInput(controllerElements.p1SpeedMagnetsInput, controllerParams1, 'speedmeter_magnets_number');
			safeSetText(controllerElements.p1LampsOnValue, controllerParams1?.lamps_always_on, getNullableBoolean);
			safeSetSelectBoolean(controllerElements.p1LampsOnInput, controllerParams1, 'lamps_always_on');
			if (controllerElements.mechPlaceholder) controllerElements.mechPlaceholder.style.display = controllerParams1 ? 'none' : 'block';

			// Driving P1
			safeSetText(controllerElements.p1StartCurrentValue, controllerParams1?.start_current);
			safeSetInput(controllerElements.p1StartCurrentInput, controllerParams1, 'start_current');
			safeSetText(controllerElements.p1CurrentLoadTimeValue, controllerParams1?.current_loading_time, (val) => getNullableNumber(val, 1));
			safeSetFormattedInput(controllerElements.p1CurrentLoadTimeInput, controllerParams1, 'current_loading_time', (val) => val?.toFixed(1));
			safeSetText(controllerElements.p1CurrentShedTimeValue, controllerParams1?.current_shedding_time, (val) => getNullableNumber(val, 1));
			safeSetFormattedInput(controllerElements.p1CurrentShedTimeInput, controllerParams1, 'current_shedding_time', (val) => val?.toFixed(1));
			// TODO: Add lookup for Pedal Sensor Type Text
			safeSetText(controllerElements.p1PedalTypeValue, controllerParams1?.pedal_sensor_type); // Display number
			safeSetSelectDirect(controllerElements.p1PedalTypeInput, controllerParams1, 'pedal_sensor_type');
			if (controllerElements.drivingPlaceholder) controllerElements.drivingPlaceholder.style.display = controllerParams1 ? 'none' : 'block';

			// Throttle P1
			safeSetText(controllerElements.p1ThrottleStartValue, controllerParams1?.throttle_start_voltage, (val) => getNullableNumber(val, 1));
			safeSetFormattedInput(controllerElements.p1ThrottleStartInput, controllerParams1, 'throttle_start_voltage', (val) => val?.toFixed(1));
			safeSetText(controllerElements.p1ThrottleEndValue, controllerParams1?.throttle_max_voltage, (val) => getNullableNumber(val, 1));
			safeSetFormattedInput(controllerElements.p1ThrottleEndInput, controllerParams1, 'throttle_max_voltage', (val) => val?.toFixed(1));
			if (controllerElements.throttlePlaceholder) controllerElements.throttlePlaceholder.style.display = controllerParams1 ? 'none' : 'block';

			// Speed Params (P3 + P1 Walk Assist)
			safeSetText(controllerElements.p3SpeedLimitValue, controllerSpeedParams?.speed_limit, (val) => getNullableNumber(val, 2));
			safeSetFormattedInput(controllerElements.p3SpeedLimitInput, controllerSpeedParams, 'speed_limit', (val) => val?.toFixed(2));
			safeSetText(controllerElements.p3WheelDiameterValue, controllerSpeedParams?.wheel_diameter?.text);
			safeSetSelectDirect(controllerElements.p3WheelDiameterInput, controllerSpeedParams?.wheel_diameter, 'text'); // Use text property for value

			safeSetText(controllerElements.p3CircumferenceValue, controllerSpeedParams?.circumference);
			safeSetInput(controllerElements.p3CircumferenceInput, controllerSpeedParams, 'circumference');

			safeSetText(controllerElements.p1WalkAssistSpeedValue, controllerParams1?.walk_assist_speed, (val) => getNullableNumber(val, 2)); // P1 walk assist
			safeSetFormattedInput(controllerElements.p1WalkAssistSpeedInput, controllerParams1, 'walk_assist_speed', (val) => val?.toFixed(1)); // Input allows 1 decimal

			// Show placeholder if EITHER P1 (for walk assist) OR SpeedParams (for rest) is missing
			if (controllerElements.speedPlaceholder) controllerElements.speedPlaceholder.style.display = (controllerParams1 && controllerSpeedParams) ? 'none' : 'block';

		}

        function populateWheelSelect() {
             const select = controllerElements.p3WheelDiameterInput;
             if (!select) {
                 console.error("Wheel diameter select element not found!");
                 return;
             }
             select.innerHTML = '<option value="">-- Select --</option>'; // Clear existing, add default
             wheelDiameterTable.forEach(wheel => {
                 const option = document.createElement('option');
                 option.value = wheel.text; // Use text as the value for the select dropdown
                 option.textContent = wheel.text;
                 // Store the code and circumference limits in data attributes
                 option.dataset.code0 = wheel.code[0];
                 option.dataset.code1 = wheel.code[1];
                 option.dataset.minCirc = wheel.minimalCircumference;
                 option.dataset.maxCirc = wheel.maximalCircumference;
                 select.appendChild(option);
             });

             // Add event listener to update circumference input constraints when wheel size changes
             select.addEventListener('change', () => {
                 const selectedOption = select.options[select.selectedIndex];
                 const circInput = controllerElements.p3CircumferenceInput;
                 if (selectedOption && selectedOption.dataset.minCirc && selectedOption.dataset.maxCirc) {
                     circInput.min = selectedOption.dataset.minCirc;
                     circInput.max = selectedOption.dataset.maxCirc;
                     // Optional: Clear circumference input or suggest a default if needed
                     // circInput.value = '';
                     // circInput.placeholder = `Enter value (${selectedOption.dataset.minCirc}-${selectedOption.dataset.maxCirc} mm)`;
                 } else {
                     // Reset constraints if "-- Select --" is chosen
                     circInput.min = "400"; // Or your default overall min
                     circInput.max = "3000"; // Or your default overall max
                     // circInput.placeholder = "Enter new value (mm)";
                 }
             });
        }

		// --- Gears Tab UI Update Function ---
		function updateGearsUI() {
			// --- Startup Angle ---
			safeSetText(gearsElements.controllerStartupAngleValueEl, lastStartupAngle);
			safeSetInput(gearsElements.controllerStartupAngleInputEl, { lastStartupAngle }, 'lastStartupAngle');
			if (gearsElements.startupAnglePlaceholderEl) {
				gearsElements.startupAnglePlaceholderEl.style.display = (lastStartupAngle !== null && lastStartupAngle !== undefined) ? 'none' : 'block';
			}

			// --- Assist Levels Table ---
			const assistBody = gearsElements.assistLevelTableBody;
			if (!assistBody) {
				console.error("Gears UI Update failed: assistLevelTableBody element not found!");
				if (gearsElements.assistLevelPlaceholder) gearsElements.assistLevelPlaceholder.style.display = 'block';
				return;
			}
			assistBody.innerHTML = ''; // Clear previous rows

			const totalDisplayLevels = displayRealtime?.assist_levels;
			let currentLevelMapping = null;

			if (totalDisplayLevels && uiToInternalAssistMap[totalDisplayLevels]) {
				currentLevelMapping = uiToInternalAssistMap[totalDisplayLevels];
			}

			if (!currentLevelMapping) {
				console.warn(`Gears UI Update: No valid mapping for totalDisplayLevels: ${totalDisplayLevels}. Or displayRealtime not available. currentLevelMapping is null.`);
				if (gearsElements.assistLevelPlaceholder) gearsElements.assistLevelPlaceholder.style.display = 'block';
				// Hide torque placeholder too if assist levels can't be shown, as they are related
				if (gearsElements.torqueProfilePlaceholder) gearsElements.torqueProfilePlaceholder.style.display = 'block';
				return;
			}

			const p0 = lastControllerP0;
			const p1 = lastControllerP1;

			if (!p0 || !p1 || !p0.acceleration_levels || !p1.assist_levels || !p0.assist_ratio_levels || typeof p0.assist_ratio_upper_limit !== 'number' ) {
				console.warn("Gears UI Update: Missing P0 or P1 data, or their internal assist_levels/acceleration_levels arrays.");
				if (gearsElements.assistLevelPlaceholder) gearsElements.assistLevelPlaceholder.style.display = 'block';
				// Hide torque placeholder too
				if (gearsElements.torqueProfilePlaceholder) gearsElements.torqueProfilePlaceholder.style.display = 'block';
				return;
			}

			if (gearsElements.assistLevelPlaceholder) gearsElements.assistLevelPlaceholder.style.display = 'none';

			for (let displayedLevel = 1; displayedLevel <= totalDisplayLevels; displayedLevel++) {
				const internalIndex = currentLevelMapping[displayedLevel];

				if (internalIndex === undefined) {
					console.warn(`No internal Bafang index found for displayed level ${displayedLevel} with ${totalDisplayLevels} total levels.`);
					continue;
				}
				if (internalIndex < 0 || internalIndex >= 9) { // Bafang P0/P1 usually have 9 slots (0-8)
					console.warn(`Internal Bafang index ${internalIndex} is out of bounds for displayed level ${displayedLevel}.`);
					continue;
				}

				const row = assistBody.insertRow();
				row.insertCell(0).textContent = displayedLevel;

				const cellCurrent = row.insertCell();
				const inputCurrent = document.createElement('input');
				inputCurrent.type = 'number';
				inputCurrent.min = 0; inputCurrent.max = 100; inputCurrent.step = 1;
				inputCurrent.value = (p1.assist_levels[internalIndex] && typeof p1.assist_levels[internalIndex].current_limit === 'number')
									   ? p1.assist_levels[internalIndex].current_limit : '';
				inputCurrent.placeholder = '0-100';
				inputCurrent.dataset.internalType = 'p1';
				inputCurrent.dataset.internalIndex = internalIndex.toString();
				inputCurrent.dataset.param = 'current_limit';
				inputCurrent.addEventListener('change', handleAssistInputChange);
				cellCurrent.appendChild(inputCurrent);
				cellCurrent.append(' %');

				const cellSpeed = row.insertCell();
				const inputSpeed = document.createElement('input');
				inputSpeed.type = 'number';
				inputSpeed.min = 0; inputSpeed.max = 100; inputSpeed.step = 1;
				inputSpeed.value = (p1.assist_levels[internalIndex] && typeof p1.assist_levels[internalIndex].speed_limit === 'number')
									 ? p1.assist_levels[internalIndex].speed_limit : '';
				inputSpeed.placeholder = '0-100';
				inputSpeed.dataset.internalType = 'p1';
				inputSpeed.dataset.internalIndex = internalIndex.toString();
				inputSpeed.dataset.param = 'speed_limit';
				inputSpeed.addEventListener('change', handleAssistInputChange);
				cellSpeed.appendChild(inputSpeed);
				cellSpeed.append(' %');
				
				const assistRatioMaxValue = p0.assist_ratio_upper_limit;
				const cellinputassistRatio = row.insertCell(); 
				const inputRatio = document.createElement('input'); 

				// Corrected lines:
				inputRatio.type = 'number';
				inputRatio.min = 1;
				inputRatio.max = assistRatioMaxValue;
				inputRatio.step = 1;
				inputRatio.value = (p0.assist_ratio_levels[internalIndex] && typeof p0.assist_ratio_levels[internalIndex].assist_ratio_level === 'number')
									   ? p0.assist_ratio_levels[internalIndex].assist_ratio_level : '';
				inputRatio.placeholder = `1-${assistRatioMaxValue}`; // Use dynamic max
				inputRatio.dataset.internalType = 'p0';
				inputRatio.dataset.internalIndex = internalIndex.toString();
				inputRatio.dataset.param = 'assist_ratio_level'; // Ensure this matches what handleAssistInputChange expects for P0
				inputRatio.addEventListener('change', handleAssistInputChange);
				// End of corrected lines

				cellinputassistRatio.appendChild(inputRatio);
				cellinputassistRatio.append(''); // Appends an empty string, likely for spacing or unit later
				

				const cellAccel = row.insertCell();
				const inputAccel = document.createElement('input');
				inputAccel.type = 'number';
				inputAccel.min = 1; inputAccel.max = 8; inputAccel.step = 1;
				inputAccel.value = (p0.acceleration_levels[internalIndex] && typeof p0.acceleration_levels[internalIndex].acceleration_level === 'number')
									   ? p0.acceleration_levels[internalIndex].acceleration_level : '';
				inputAccel.placeholder = '1-8';
				inputAccel.dataset.internalType = 'p0';
				inputAccel.dataset.internalIndex = internalIndex.toString();
				inputAccel.dataset.param = 'acceleration_level';
				inputAccel.addEventListener('change', handleAssistInputChange);
				cellAccel.appendChild(inputAccel);
				cellAccel.append('');
			}

			// --- Torque Profiles Table (from P2) ---
			const torqueBody = gearsElements.torqueProfileTableBody;
			if (!torqueBody) {
				console.error("Gears UI Update failed: torqueProfileTableBody element not found!");
				if (gearsElements.torqueProfilePlaceholder) gearsElements.torqueProfilePlaceholder.style.display = 'block';
				return;
			}
			torqueBody.innerHTML = '';

			const p2 = lastControllerP2;
			const angle = lastStartupAngle;
			const signals = lastControllerP1?.pedal_sensor_signals_per_rotation; // Use P1 for signals

			if (!p2 || !Array.isArray(p2.torque_profiles) || p2.torque_profiles.length < 6) {
				console.warn("Gears UI Update: P2 data or torque_profiles missing/invalid for torque table.");
				if (gearsElements.torqueProfilePlaceholder) gearsElements.torqueProfilePlaceholder.style.display = 'block';
				return;
			}

			if (gearsElements.torqueProfilePlaceholder) gearsElements.torqueProfilePlaceholder.style.display = 'none';

			for (let i = 0; i < 6; i++) { // Bafang P2 has 6 torque profiles (0-5)
				const profileData = p2.torque_profiles[i];
				const row = torqueBody.insertRow();
				row.insertCell(0).textContent = i*3 +' to ' + (i*3+3) + ' mph'; // Display profile 0-5

				const createInputCell = (paramName, value, min, max, step = 1, unit = '', isReadOnly = false, title = '') => {
					const cell = row.insertCell();
					const input = document.createElement('input');
					input.type = 'number';
					input.min = min; input.max = max; input.step = step;
					input.value = (typeof value === 'number') ? value : '';
					input.placeholder = `${min}-${max}`;
					input.dataset.profileIndex = i.toString();
					input.dataset.param = paramName;
					if (isReadOnly) {
						input.readOnly = true;
						input.disabled = true; // Visually indicate it's not editable
						if (title) input.title = title;
					} else {
						input.addEventListener('change', handleTorqueInputChange);
					}
					cell.appendChild(input);
					if (unit) cell.append(` ${unit}`);
					return cell;
				};

				createInputCell('start_torque_value', profileData?.start_torque_value, 0, 255, 1, '');
				createInputCell('max_torque_value', profileData?.max_torque_value, 0, 255, 1, '');
				createInputCell('return_torque_value', profileData?.return_torque_value, 0, 255, 1, '');
				createInputCell('min_current', profileData?.min_current, 0, 100, 1, '');
				createInputCell('max_current', profileData?.max_current, 0, 100, 1, '');

				let startPulseValue = '';
				let startPulseReadOnly = false;
				let startPulseTitle = '';
				if (i === 0) { // First profile (Level 0) for Start Pulse calculation
					startPulseValue = calculateStartPulse(angle, signals); // Use calculated value
					startPulseReadOnly = true;
					startPulseTitle = "Calculated from Startup Angle & Cadence Signals (P1)";
				} else {
					startPulseValue = (profileData && typeof profileData.start_pulse === 'number') ? profileData.start_pulse : '';
				}
				createInputCell('start_pulse', startPulseValue, START_PULSE_MIN, START_PULSE_MAX, 1, '', startPulseReadOnly, startPulseTitle);

				createInputCell('current_decay_time', profileData?.current_decay_time, 5, 1275, 5, '');
                createInputCell('torque_decay_time', profileData?.torque_decay_time, 5, 1275, 5, '');
				createInputCell('stop_delay', profileData?.stop_delay, 2, 510, 2, '');
			}
			updatePasCurvesChart();
			updateStartRampChart();
		}

		function updateInfoUI() {
            // Controller Info
            infoElements.ctrlHwVersionValue.textContent = getNullableString(controllerOtherInfo.hwVersion);
            infoElements.ctrlSwVersionValue.textContent = getNullableString(controllerOtherInfo.swVersion);
            infoElements.ctrlModelNumberValue.textContent = getNullableString(controllerOtherInfo.modelNumber); // Ensure this line exists
            infoElements.ctrlSnValue.textContent = getNullableString(controllerOtherInfo.serialNumber);
            infoElements.ctrlMfgValue.textContent = getNullableString(controllerOtherInfo.manufacturer); // Ensure this line exists
            if (controllerOtherInfo.manufacturer !== null && infoElements.ctrlMfgInput.value === "") infoElements.ctrlMfgInput.value = controllerOtherInfo.manufacturer;
            infoElements.ctrlPlaceholder.style.display = (controllerOtherInfo.hwVersion || controllerOtherInfo.swVersion || controllerOtherInfo.modelNumber || controllerOtherInfo.serialNumber || controllerOtherInfo.manufacturer) ? 'none' : 'block'; // Added checks

            // Display Info
            infoElements.displayHwVersionValue.textContent = getNullableString(displayOtherInfo.hwVersion);
            infoElements.displaySwVersionValue.textContent = getNullableString(displayOtherInfo.swVersion);
            infoElements.displayModelNumberValue.textContent = getNullableString(displayOtherInfo.modelNumber); // Ensure this line exists
            infoElements.displayBootloaderVersionValue.textContent = getNullableString(displayOtherInfo.bootloaderVersion); // Ensure this line exists
            infoElements.displaySnValue.textContent = getNullableString(displayOtherInfo.serialNumber);
            infoElements.displayMfgValue.textContent = getNullableString(displayOtherInfo.manufacturer); // Ensure this line exists
            if (displayOtherInfo.manufacturer !== null && infoElements.displayMfgInput.value === "") infoElements.displayMfgInput.value = displayOtherInfo.manufacturer;
            infoElements.displayCnValue.textContent = getNullableString(displayOtherInfo.customerNumber); // Ensure this line exists
             if (displayOtherInfo.customerNumber !== null && infoElements.displayCnInput.value === "") infoElements.displayCnInput.value = displayOtherInfo.customerNumber;
            infoElements.displayPlaceholder.style.display = (displayOtherInfo.hwVersion || displayOtherInfo.swVersion || displayOtherInfo.modelNumber || displayOtherInfo.bootloaderVersion || displayOtherInfo.serialNumber || displayOtherInfo.manufacturer || displayOtherInfo.customerNumber) ? 'none' : 'block'; // Added checks

            // Sensor Info
            infoElements.sensorHwVersionValue.textContent = getNullableString(sensorOtherInfo.hwVersion);
            infoElements.sensorSwVersionValue.textContent = getNullableString(sensorOtherInfo.swVersion);
            infoElements.sensorModelNumberValue.textContent = getNullableString(sensorOtherInfo.modelNumber); // Ensure this line exists
            infoElements.sensorSnValue.textContent = getNullableString(sensorOtherInfo.serialNumber);
            infoElements.sensorPlaceholder.style.display = (sensorOtherInfo.hwVersion || sensorOtherInfo.swVersion || sensorOtherInfo.modelNumber || sensorOtherInfo.serialNumber) ? 'none' : 'block'; // Added checks

            // Battery Info
            infoElements.batteryHwVersionValue.textContent = getNullableString(batteryOtherInfo.hwVersion);
            infoElements.batterySwVersionValue.textContent = getNullableString(batteryOtherInfo.swVersion);
            infoElements.batteryModelNumberValue.textContent = getNullableString(batteryOtherInfo.modelNumber); // Ensure this line exists
            infoElements.batterySnValue.textContent = getNullableString(batteryOtherInfo.serialNumber);
            infoElements.batteryPlaceholder.style.display = (batteryOtherInfo.hwVersion || batteryOtherInfo.swVersion || batteryOtherInfo.modelNumber || batteryOtherInfo.serialNumber) ? 'none' : 'block'; // Added checks
        }

		function updatePasCurvesChart() {
			const ctx = document.getElementById('pasCurvesChart')?.getContext('2d');
			if (!ctx) {
				console.error("PAS Curves chart canvas not found!");
				if (pasCurvesContainer) pasCurvesContainer.style.display = 'none';
				if (pasCurvesPlaceholder) pasCurvesPlaceholder.style.display = 'flex'; // Use flex for centering
				return;
			}

			if (!lastControllerP0 || !lastControllerP0.assist_ratio_levels ||
				!lastControllerP1 || !lastControllerP1.assist_levels ||
				typeof lastControllerP1.system_voltage !== 'number' ||
				typeof lastControllerP1.current_limit !== 'number' ||
				!displayRealtime || typeof displayRealtime.assist_levels !== 'number') {
				console.warn("PAS Curves: Missing necessary P0, P1, or displayRealtime data for chart generation.");
				if (pasChart) { pasChart.destroy(); pasChart = null; }
				if (pasCurvesContainer) pasCurvesContainer.style.display = 'none';
				if (pasCurvesPlaceholder) pasCurvesPlaceholder.style.display = 'flex';
				return;
			}

			// Data is available, show container, hide placeholder
			if (pasCurvesContainer) pasCurvesContainer.style.display = 'block';
			if (pasCurvesPlaceholder) pasCurvesPlaceholder.style.display = 'none';


			const totalDisplayLevels = displayRealtime.assist_levels;
			const assistRatiosP0 = lastControllerP0.assist_ratio_levels;         // Array from P0
			const assistCurrentLimitsP1 = lastControllerP1.assist_levels;      // Array from P1
			const systemVoltageP1 = lastControllerP1.system_voltage;
			const controllerCurrentLimitP1 = lastControllerP1.current_limit;     // Overall controller current limit

			const datasets = [];
			let overallMaxMotorPower = 0;
			const internalLevelMapping = uiToInternalAssistMap[totalDisplayLevels] || uiToInternalAssistMap[5];

			for (let displayedLevel = 1; displayedLevel <= totalDisplayLevels; displayedLevel++) {
				const internalIndex = internalLevelMapping[displayedLevel];
				if (internalIndex === undefined || internalIndex < 0 ||
					internalIndex >= assistRatiosP0.length || internalIndex >= assistCurrentLimitsP1.length) {
					continue;
				}

				const assistRatioPercent = assistRatiosP0[internalIndex]?.assist_ratio_level; // This is the "Assistance %" value
				const currentLimitPercentForLevel = assistCurrentLimitsP1[internalIndex]?.current_limit; // This is "Max. Power %"

				if (typeof assistRatioPercent !== 'number' || typeof currentLimitPercentForLevel !== 'number') continue;

				const maxPowerForLevel = EFFICIENCY_FACTOR * systemVoltageP1 * controllerCurrentLimitP1 * (currentLimitPercentForLevel / 100.0);
				overallMaxMotorPower = Math.max(overallMaxMotorPower, maxPowerForLevel);

				const dataPoints = [];
				for (let humanPower = 0; humanPower <= MAX_HUMAN_POWER_X_AXIS; humanPower += 10) {
					let motorOutput = humanPower * (assistRatioPercent / 100.0);
					motorOutput = Math.min(maxPowerForLevel, motorOutput);
					dataPoints.push({ x: humanPower, y: motorOutput });
				}

				datasets.push({
					label: `Level ${displayedLevel}`,
					data: dataPoints,
					borderColor: PAS_LEVEL_COLORS[displayedLevel - 1] || '#CCCCCC',
					borderWidth: 2,
					fill: false,
					tension: 0.1
				});
			}

			const yAxisMax = (overallMaxMotorPower > 0) ? Math.ceil((overallMaxMotorPower + 50)/50)*50 : MAX_MOTOR_POWER_Y_AXIS_DEFAULT_SCALE;


			if (pasChart) {
				pasChart.data.datasets = datasets;
				pasChart.options.scales.y.max = yAxisMax;
				pasChart.update();
			} else {
				pasChart = new Chart(ctx, {
					type: 'line',
					data: { datasets: datasets },
					options: {
						responsive: true, maintainAspectRatio: false,
						scales: {
							x: { type: 'linear', position: 'bottom', title: { display: true, text: 'Human power (w)' }, min: 0, max: MAX_HUMAN_POWER_X_AXIS },
							y: { title: { display: true, text: 'Motor output power (w)' }, min: 0, max: yAxisMax }
						},
						plugins: { legend: { position: 'top' } }
					}
				});
			}
		}

		function updateStartRampChart() {
			const ctx = document.getElementById('startRampChart')?.getContext('2d');
			if (!ctx) {
				console.error("Start Ramp chart canvas not found!");
				if (startRampContainer) startRampContainer.style.display = 'none';
				if (startRampPlaceholder) startRampPlaceholder.style.display = 'flex';
				return;
			}

			if (!lastControllerP0 || !lastControllerP0.acceleration_levels ||
				!lastControllerP1 || !lastControllerP1.assist_levels ||
				typeof lastControllerP1.system_voltage !== 'number' ||
				typeof lastControllerP1.current_limit !== 'number' ||
				!displayRealtime || typeof displayRealtime.assist_levels !== 'number') {
				console.warn("Start Ramp: Missing P0, P1, or displayRealtime data for chart.");
				if (startRampChart) { startRampChart.destroy(); startRampChart = null; }
				if (startRampContainer) startRampContainer.style.display = 'none';
				if (startRampPlaceholder) startRampPlaceholder.style.display = 'flex';
				return;
			}

			// Data is available, show container, hide placeholder
			if (startRampContainer) startRampContainer.style.display = 'block';
			if (startRampPlaceholder) startRampPlaceholder.style.display = 'none';

			const totalDisplayLevels = displayRealtime.assist_levels;
			const accelerationSettingsP0 = lastControllerP0.acceleration_levels; // Array from P0
			const assistCurrentLimitsP1 = lastControllerP1.assist_levels;      // Array from P1
			const systemVoltageP1 = lastControllerP1.system_voltage;
			const controllerCurrentLimitP1 = lastControllerP1.current_limit;

			const datasets = [];
			let overallMaxMotorPower = 0;
			const internalLevelMapping = uiToInternalAssistMap[totalDisplayLevels] || uiToInternalAssistMap[5];

			for (let displayedLevel = 1; displayedLevel <= totalDisplayLevels; displayedLevel++) {
				const internalIndex = internalLevelMapping[displayedLevel];
				if (internalIndex === undefined || internalIndex < 0 ||
					internalIndex >= accelerationSettingsP0.length || internalIndex >= assistCurrentLimitsP1.length) {
					continue;
				}

				const accelValue = accelerationSettingsP0[internalIndex]?.acceleration_level; // Value 1-8
				const currentLimitPercentForLevel = assistCurrentLimitsP1[internalIndex]?.current_limit;

				if (typeof accelValue !== 'number' || typeof currentLimitPercentForLevel !== 'number') continue;

				const maxPowerForLevel = EFFICIENCY_FACTOR * systemVoltageP1 * controllerCurrentLimitP1 * (currentLimitPercentForLevel / 100.0);
				overallMaxMotorPower = Math.max(overallMaxMotorPower, maxPowerForLevel);

				// Time_To_Reach_Max_Power = 2500.0 - (AccelerationSetting * 281.25)
				// Higher accelValue (1-8) should mean *slower* ramp according to typical Bafang UI (e.g. "Acceleration: 2" on screen)
				// The C# formula implies: higher accelValue -> smaller denominator -> steeper slope -> FASTER ramp.
				// Let's verify the C# interpretation: if accelValue is 8 (most aggressive), denominator is 2500 - 8*281.25 = 2500 - 2250 = 250.
				// If accelValue is 1 (least aggressive), denominator is 2500 - 1*281.25 = 2218.75.
				// So, yes, in the C# formula, higher accelValue (1-8) means FASTER ramp.
				const timeToReachFullPower = Math.max(50, 2500.0 - (accelValue * 281.25)); // Ensure non-zero, min 50ms

				const dataPoints = [];
				for (let timeMs = 0; timeMs <= MAX_TIME_X_AXIS_START_RAMP; timeMs += 100) { // Or 250ms steps like C#
					let motorOutput = (timeMs * maxPowerForLevel) / timeToReachFullPower;
					motorOutput = Math.min(maxPowerForLevel, motorOutput);
					dataPoints.push({ x: timeMs, y: motorOutput });
				}

				datasets.push({
					label: `Level ${displayedLevel}`,
					data: dataPoints,
					borderColor: PAS_LEVEL_COLORS[displayedLevel - 1] || '#CCCCCC',
					borderWidth: 2,
					fill: false,
					tension: 0.1
				});
			}

			const yAxisMax = (overallMaxMotorPower > 0) ? Math.ceil((overallMaxMotorPower + 50)/50)*50 : MAX_MOTOR_POWER_Y_AXIS_DEFAULT_SCALE;

			if (startRampChart) {
				startRampChart.data.datasets = datasets;
				startRampChart.options.scales.y.max = yAxisMax;
				startRampChart.update();
			} else {
				startRampChart = new Chart(ctx, {
					type: 'line',
					data: { datasets: datasets },
					options: {
						responsive: true, maintainAspectRatio: false,
						scales: {
							x: { type: 'linear', position: 'bottom', title: { display: true, text: 'Time (ms)' }, min: 0, max: MAX_TIME_X_AXIS_START_RAMP },
							y: { title: { display: true, text: 'Motor output power (w)' }, min: 0, max: yAxisMax }
						},
						plugins: { legend: { position: 'top' } }
					}
				});
			}
		}

		function handleAssistInputChange(event) {
			const input = event.target;
			if (!input) {
				console.error("handleAssistInputChange triggered with null input element!");
				return;
			}
			const internalType = input.dataset.internalType; // 'p0' or 'p1'
			const internalIndex = parseInt(input.dataset.internalIndex, 10); // Bafang's internal index (0-8)
			const param = input.dataset.param; // e.g., 'current_limit', 'speed_limit', 'acceleration_level', 'assist_ratio_level'
			let value = parseInt(input.value, 10); // Or parseFloat if needed

            // Validate basic inputs
			if (isNaN(internalIndex) || !param || isNaN(value)) {
				console.warn("Could not update assist level - invalid input data", input?.dataset, input.value);
				return;
			}

			let targetObject = null;
			let targetArrayName = '';
            let targetParamName = param; // By default, the param name in the object is the same as dataset.param

			if (internalType === 'p0') {
                if (!lastControllerP0) {
                    console.warn(`Could not update P0 - lastControllerP0 data not available.`);
                    return;
                }
                targetObject = lastControllerP0;
                if (param === 'acceleration_level') {
                    targetArrayName = 'acceleration_levels';
                } else if (param === 'assist_ratio_level') {
                    targetArrayName = 'assist_ratio_levels';
                    // The object key in parser is 'assist_ratio_level', matching dataset.param
                } else {
                    console.warn(`Unknown parameter '${param}' for P0 internal type.`);
                    return;
                }
			} else if (internalType === 'p1') {
                if (!lastControllerP1) {
                    console.warn(`Could not update P1 - lastControllerP1 data not available.`);
                    return;
                }
				targetObject = lastControllerP1;
                if (param === 'current_limit' || param === 'speed_limit') {
				    targetArrayName = 'assist_levels';
                } else {
                    console.warn(`Unknown parameter '${param}' for P1 internal type.`);
                    return;
                }
			} else {
				console.warn(`Could not update assist level - unknown internalType: ${internalType}.`);
				return;
			}

            // Ensure target array and specific index exist
			if (targetObject && targetObject[targetArrayName] && targetObject[targetArrayName][internalIndex]) {
                // Ensure the object at the index exists
                if (typeof targetObject[targetArrayName][internalIndex] !== 'object') {
                    targetObject[targetArrayName][internalIndex] = {}; // Initialize if not an object
                }
				targetObject[targetArrayName][internalIndex][targetParamName] = value;
				console.log(`Updated ${internalType.toUpperCase()} Internal Assist Index ${internalIndex}, Param ${targetParamName} to ${value}`);
			} else {
				console.warn(`Could not update assist level - data structure missing for ${internalType.toUpperCase()} internalIndex ${internalIndex} or array ${targetArrayName}.`, targetObject);
			}
		}
		
		function handleTorqueInputChange(event) {
        const input = event.target;
         // *** ADD CHECK: Ensure input element exists ***
        if (!input) {
            console.error("handleTorqueInputChange triggered with null input element!");
            return;
        }
        const profileIndex = parseInt(input.dataset.profileIndex, 10);
        const param = input.dataset.param;
        const value = parseInt(input.value, 10);

        // *** ADD CHECK: Prevent changes to calculated start_pulse[0] ***
        if (param === 'start_pulse' && profileIndex === 0) {
            console.log("Ignoring change attempt on calculated Start Pulse[0]");
            return; // Do nothing
        }

        // *** ADD CHECK: Ensure lastControllerP2 and relevant structures exist ***
        if (lastControllerP2 && lastControllerP2.torque_profiles && !isNaN(profileIndex) && param && !isNaN(value)) {
             if (!lastControllerP2.torque_profiles[profileIndex]) {
                // Create if missing (shouldn't normally happen if P2 is valid)
                lastControllerP2.torque_profiles[profileIndex] = {}; // Or appropriate defaults
                 console.warn(`Created missing torque_profiles entry for index ${profileIndex}`);
            }
            lastControllerP2.torque_profiles[profileIndex][param] = value;
            console.log(`Updated P2 Torque Profile ${profileIndex} ${param} to ${value}`);
        } else {
            console.warn("Could not update torque profile - data missing or invalid input", input?.dataset, input?.value);
        }
    }

		function populateHexEditor() {
			const tableBody = debugElements.hexEditorTableBody;
			const placeholder = debugElements.hexEditorPlaceholder;
			const hexEditorContainer = document.querySelector('.hex-editor-container'); // Assuming this class exists on the parent of the table

			if (!tableBody || !placeholder || !hexEditorContainer) {
				console.error("Hex editor elements not found!");
				return;
			}

			// --- BEGIN PRESERVE FOCUS/VALUE ---
			let activeInputIndex = null;
			let activeInputValue = null;
			let activeInputSelectionStart = null;
			let activeInputSelectionEnd = null;

			if (document.activeElement && document.activeElement.matches('#hexEditorTableBody input[data-index]')) {
				activeInputIndex = document.activeElement.dataset.index;
				activeInputValue = document.activeElement.value;
				activeInputSelectionStart = document.activeElement.selectionStart;
				activeInputSelectionEnd = document.activeElement.selectionEnd;
			}
			// --- END PRESERVE FOCUS/VALUE ---

			tableBody.innerHTML = ''; // This wipes existing inputs

			if (!currentRawParamType || !rawParamData[currentRawParamType]) {
				placeholder.textContent = currentRawParamType ? `Data for ${currentRawParamType} not yet received.` : 'Select a parameter block to view/edit.';
				placeholder.style.display = 'block';
				if (hexEditorContainer) hexEditorContainer.style.display = 'none'; // Hide container if no data
				return;
			}

			placeholder.style.display = 'none';
			if (hexEditorContainer) hexEditorContainer.style.display = 'block'; // Show container
			const bytes = rawParamData[currentRawParamType];
			const mappingInfo = rawParamFieldMappings[currentRawParamType];
			const numBytes = mappingInfo ? mappingInfo.byteLength : bytes.length;
			const numRows = 8; // Fixed 8 rows for 64 bytes
			const numCols = 8; // Fixed 8 columns

			for (let i = 0; i < numRows; i++) {
				const row = tableBody.insertRow();
				for (let j = 0; j < numCols; j++) {
					const cell = row.insertCell();
					const byteIndex = i * numCols + j;

					if (byteIndex < numBytes) {
						const input = document.createElement('input');
						input.type = 'text';
						input.maxLength = 2;
						// If this is the input we are restoring and its index matches, use the preserved value.
						// Otherwise, use the value from the (potentially updated) rawParamData.
						if (activeInputIndex === byteIndex.toString()) {
							input.value = activeInputValue;
						} else {
							input.value = bytes[byteIndex]?.toString(16).toUpperCase().padStart(2, '0') || '00';
						}
						input.dataset.index = byteIndex;
						input.addEventListener('change', handleHexInputChange);
						input.addEventListener('input', (e) => {
							e.target.value = e.target.value.toUpperCase().replace(/[^0-9A-F]/g, '');
						});

						let tooltipTextContent = `Byte Index: ${byteIndex}`;
						let fieldClass = 'hex-byte-single';

						if (mappingInfo && mappingInfo.fields) {
							for (const field of mappingInfo.fields) {
								if (byteIndex >= field.index && byteIndex < field.index + field.length) {
									tooltipTextContent += `\nField: ${field.name}`;
									if (field.length > 1) {
										if (byteIndex === field.index) fieldClass = 'hex-byte-highlight-start';
										else if (byteIndex === field.index + field.length - 1) fieldClass = 'hex-byte-highlight-end';
										else fieldClass = 'hex-byte-highlight-middle';
									}
									break;
								}
							}
						}
						cell.classList.add(fieldClass);

						const tooltipSpan = document.createElement('span');
						tooltipSpan.classList.add('tooltiptext');
						tooltipSpan.textContent = tooltipTextContent;
						cell.appendChild(tooltipSpan); // Append tooltip first for stacking context if needed
						cell.appendChild(input);       // Then append input


						// Tooltip positioning logic (from your provided code)
						cell.addEventListener('mouseenter', () => {
							const tooltip = cell.querySelector('.tooltiptext');
							if (!tooltip) return;
							tooltip.style.position = 'absolute';
							tooltip.style.visibility = 'hidden';
							tooltip.style.display = 'block';
							const cellRect = cell.getBoundingClientRect();
							const containerRect = hexEditorContainer.getBoundingClientRect();
							const tooltipWidth = tooltip.offsetWidth;
							let idealLeft = (cell.offsetWidth / 2) - (tooltipWidth / 2);
							const cellLeftInContainer = cellRect.left - containerRect.left + hexEditorContainer.scrollLeft;
							let potentialTooltipLeftInContainer = cellLeftInContainer + idealLeft;
							if (potentialTooltipLeftInContainer < hexEditorContainer.scrollLeft + 5) {
								idealLeft = (hexEditorContainer.scrollLeft + 5) - cellLeftInContainer;
							} else if (potentialTooltipLeftInContainer + tooltipWidth > hexEditorContainer.scrollLeft + hexEditorContainer.clientWidth - 5) {
								idealLeft = (hexEditorContainer.scrollLeft + hexEditorContainer.clientWidth - tooltipWidth - 5) - cellLeftInContainer;
							}
							tooltip.style.left = `${idealLeft}px`;
							tooltip.style.display = '';
							tooltip.style.visibility = '';
						});

					} else {
						cell.textContent = '--'; // For bytes beyond the actual data length (e.g. for speed_params)
					}
				}
			}


		if (activeInputIndex !== null) {
			const inputToRestore = tableBody.querySelector(`input[data-index='${activeInputIndex}']`);
			if (inputToRestore) {
				// inputToRestore.value = activeInputValue; // Value is already set during creation if index matched
				inputToRestore.focus();
				// Restore cursor position
				try { // setSelectionRange can fail if input is not visible or of certain types
					inputToRestore.setSelectionRange(activeInputSelectionStart, activeInputSelectionEnd);
				} catch (e) {
					console.warn("Could not restore selection range:", e);
				}
			}
		}
	
}

		function handleHexInputChange(event) {
			const input = event.target;
			const byteIndex = parseInt(input.dataset.index, 10);
			let newValue = parseInt(input.value, 16);

			if (isNaN(newValue) || newValue < 0 || newValue > 255) {
				// Restore old value or show error
				const oldValue = rawParamData[currentRawParamType]?.[byteIndex];
				input.value = oldValue?.toString(16).toUpperCase().padStart(2, '0') || '00';
				addLog('ERROR', `Invalid hex value entered for byte ${byteIndex}. Must be 00-FF.`);
				return;
			}

			if (rawParamData[currentRawParamType] && byteIndex < rawParamData[currentRawParamType].length) {
				rawParamData[currentRawParamType][byteIndex] = newValue;
				addLog('DEBUG', `Raw param ${currentRawParamType} byte ${byteIndex} changed to 0x${newValue.toString(16).toUpperCase()}`);

				// Auto-update checksum for P0, P1, P2 if the mapping exists
				const mapping = rawParamFieldMappings[currentRawParamType];
				if (mapping && mapping.byteLength === 64 && byteIndex !== 63) { // Assuming checksum is always byte 63 for 64-byte blocks
					const checksumByteIndex = 63;
					let sum = 0;
					for (let k = 0; k < checksumByteIndex; k++) {
						sum += rawParamData[currentRawParamType][k];
					}
					const newChecksum = sum & 0xFF;
					rawParamData[currentRawParamType][checksumByteIndex] = newChecksum;

					// Update the checksum input field in the UI
					const checksumInput = debugElements.hexEditorTableBody.querySelector(`input[data-index='${checksumByteIndex}']`);
					if (checksumInput) {
						checksumInput.value = newChecksum.toString(16).toUpperCase().padStart(2, '0');
					}
					addLog('DEBUG', `Auto-updated checksum for ${currentRawParamType} to 0x${newChecksum.toString(16).toUpperCase()}`);
				}

			}
		}		
        
        // --- WebSocket Event Handlers ---
        socket.onopen = () => {
            addLog('STATUS', 'WebSocket connection opened.');
            // Request initial CAN device status when WebSocket connects
            socket.send('GET_CAN_INTERFACE_STATUS');
        };
        // socket.onclose and socket.onerror remain largely the same, but ensure UI reflects WebSocket disconnect
        socket.onclose = () => {
            updateCanInterfaceDisplay('DEVICE_NOT_FOUND'); // This sets indicator to red, button disabled.
            statusText.textContent = 'Disconnected (WebSocket Closed)'; // More specific message
            canDeviceNameElement.textContent = 'Connection to server lost.';
            addLog('STATUS', 'WebSocket connection closed.');
        };
        socket.onerror = (error) => {
            console.error("WebSocket Error:", error);
            updateCanInterfaceDisplay('DEVICE_NOT_FOUND');
            statusText.textContent = `Disconnected (WebSocket Error: ${error.message || 'Unknown'})`;
            canDeviceNameElement.textContent = 'Error connecting to server.';
            addLog('ERROR', `WebSocket error: ${error.message || 'Unknown error'}`);
			
        };


        socket.onmessage = (event) => {
			//console.log("RAW WS MESSAGE:", event.data);
            const message = event.data;
			let needsDisplayUpdate = false;
            let needsSensorUpdate = false;
            let needsBatteryUpdate = false;
            let needsControllerUpdate = false;
            let needsGearsUpdate = false;
            let needsInfoUpdate = false;
			let needsHexEditorUpdate = false;
			let needsPasChartUpdate = false;
            let needsStartRampChartUpdate = false;

		if (message.startsWith('CAN_DEVICE_STATUS:')) {
                const parts = message.substring('CAN_DEVICE_STATUS:'.length).split(':');
                const statusType = parts[0];
                const deviceName = parts.length > 1 ? parts[1] : currentCanDeviceName;

                // Update the global state variables based on the received status
                isCanConnected = (statusType === 'CONNECTED');
                isCanDeviceFound = (statusType === 'FOUND' || statusType === 'CONNECTED' || statusType === 'DISCONNECTED_DEVICE_STILL_PRESENT' || statusType === 'CONNECTING' || statusType === 'DISCONNECTING');
                if (deviceName && (isCanDeviceFound || isCanConnected)) {
                    currentCanDeviceName = deviceName;
                } else if (statusType === 'NOT_FOUND') {
                    currentCanDeviceName = null;
                }
                // Then call the UI update function
                updateCanInterfaceDisplay(statusType, currentCanDeviceName); // Pass currentCanDeviceName
            }
            else if (message.startsWith('CAN_STATUS:')) {
                const statusMsg = message.substring('CAN_STATUS:'.length).trim();
                addLog('STATUS', `CAN Bus Info: ${statusMsg}`);
                // Avoid directly changing UI from this generic message if CAN_DEVICE_STATUS is handling it.
                // Only act if it's a critical error not covered by CAN_DEVICE_STATUS.
                if (statusMsg.toLowerCase().includes('error connecting') || statusMsg.toLowerCase().includes('connection lost')) {
                      if (!isCanConnected) { // Only if not already showing a connected state
                        updateCanInterfaceDisplay('DEVICE_NOT_FOUND');
                        statusText.textContent = `Disconnected (CAN Error: ${statusMsg})`;
                    }
                }
            }
			
            if (message.startsWith('CAN_STATUS:')) { const statusMsg = message.substring('CAN_STATUS:'.length).trim(); const isConnected = statusMsg.toLowerCase().includes('connected') || statusMsg.toLowerCase().includes('started'); updateStatus(isConnected, `(${statusMsg})`); addLog('STATUS', statusMsg); }
            else if (message.startsWith('CAN_ERROR:')) { const errorMsg = message.substring('CAN_ERROR:'.length).trim(); addLog('ERROR', errorMsg); }
            else if (message.startsWith('BAFANG_DATA:')) {
                const jsonString = message.substring('BAFANG_DATA:'.length);
                try {
                    const parsedEvent = JSON.parse(jsonString);
					
					
					//skip some messages so log is not overflooded
					const typesToSkipInUILog = [
							'display_realtime',
							'controller_realtime_0',
							'controller_realtime_1',
							'display_data_1',
							'display_data_2',
							'display_data_lightsensor',
							'display_autoshutdown_time',
							'controller_current_assist_level',
							'controller_calories',
							'controller_speed_params'
						];

				if (!typesToSkipInUILog.includes(parsedEvent.type)) {
						addLog(`RX (${parsedEvent.type || 'unknown'})`, parsedEvent.data || parsedEvent);
					}					
        
				// Update local data stores based on type
                    switch (parsedEvent.type) {
                        // Display Data
                        case 'display_data_1': displayData1 = parsedEvent.data; needsDisplayUpdate = true; break;
                        case 'display_data_2': displayData2 = parsedEvent.data; needsDisplayUpdate = true; break;
                        case 'display_realtime': displayRealtime = parsedEvent.data; needsDisplayUpdate = true; break;
                        case 'display_errors': displayErrors = parsedEvent.data?.error_codes ?? []; needsDisplayUpdate = true; break;
						case 'display_autoshutdown_time': displayShutdownTime = parsedEvent.data?.display_auto_shutdown_time; needsDisplayUpdate = true; break;
                        // Controller Data
						case 'controller_realtime_0': controllerRealtime0 = parsedEvent.data; needsControllerUpdate = true; break;
                        case 'controller_realtime_1': controllerRealtime1 = parsedEvent.data; needsControllerUpdate = true; break;
                        case 'controller_params_0':
                             controllerParams0 = parsedEvent.data;
                             lastControllerP0 = JSON.parse(JSON.stringify(parsedEvent.data || {})); // Deep copy
                            if (parsedEvent.data && parsedEvent.data._rawBytes && Array.isArray(parsedEvent.data._rawBytes)) {
							rawParamData[parsedEvent.type] = [...parsedEvent.data._rawBytes];
							needsHexEditorUpdate = true;
							} else if (parsedEvent.data && parsedEvent.data.raw_data && Array.isArray(parsedEvent.data.raw_data)) {
							rawParamData[parsedEvent.type] = [...parsedEvent.data.raw_data];
							needsHexEditorUpdate = true;
							}
							 needsControllerUpdate = true; // Might affect parts of controller tab? Unlikely now.
                             needsGearsUpdate = true;      // Definitely affects assist tab
							 needsPasChartUpdate = true; // Assist ratios are here
							 needsStartRampChartUpdate = true; // Acceleration levels are here							 
                             break;						
						case 'controller_params_1':
                            controllerParams1 = parsedEvent.data;
                            lastControllerP1 = JSON.parse(JSON.stringify(parsedEvent.data || {})); // Deep copy for gears tab editing
                            // *** Recalculate Start Pulse if P1 changes ***
                            if (lastStartupAngle !== null && lastControllerP1?.pedal_sensor_signals_per_rotation !== undefined && lastControllerP2?.torque_profiles?.[0]) {
                                try {
                                    const calculatedPulse = calculateStartPulse(lastStartupAngle, lastControllerP1.pedal_sensor_signals_per_rotation);
                                     if (lastControllerP2.torque_profiles[0].start_pulse !== calculatedPulse) {
                                        console.log(`Recalculating Start Pulse[0] due to P1 change: ${calculatedPulse}`);
                                        lastControllerP2.torque_profiles[0].start_pulse = calculatedPulse;
                                        needsGearsUpdate = true; // Ensure UI refresh if value changed
                                    }
                                } catch (e) {
                                    console.error("Error recalculating start pulse after P1 update:", e);
                                }
                            } else {
                                // console.log("Skipping start pulse recalc after P1: Missing angle, signals, or P2[0].");
                            }
                            if (parsedEvent.data && parsedEvent.data._rawBytes && Array.isArray(parsedEvent.data._rawBytes)) {
							rawParamData[parsedEvent.type] = [...parsedEvent.data._rawBytes];
							needsHexEditorUpdate = true;
							} else if (parsedEvent.data && parsedEvent.data.raw_data && Array.isArray(parsedEvent.data.raw_data)) {
							rawParamData[parsedEvent.type] = [...parsedEvent.data.raw_data];
							needsHexEditorUpdate = true;
							}
							// Ensure flags are set even if calculation doesn't run/change value							
                            needsControllerUpdate = true;
                            needsGearsUpdate = true;
							needsPasChartUpdate = true; // P1 values (voltage, current limits) 
							needsStartRampChartUpdate = true; // P1 values used in Start Ramp calc						
                            break;
                        case 'controller_params_2':
                            controllerParams2 = parsedEvent.data;
                            lastControllerP2 = JSON.parse(JSON.stringify(parsedEvent.data || {})); // Deep copy for gears tab editing
                            //needsControllerUpdate = true;
							if (parsedEvent.data && parsedEvent.data._rawBytes && Array.isArray(parsedEvent.data._rawBytes)) {
							rawParamData[parsedEvent.type] = [...parsedEvent.data._rawBytes];
							needsHexEditorUpdate = true;
							} else if (parsedEvent.data && parsedEvent.data.raw_data && Array.isArray(parsedEvent.data.raw_data)) {
							rawParamData[parsedEvent.type] = [...parsedEvent.data.raw_data];
							needsHexEditorUpdate = true;
							}
                            needsGearsUpdate = true;
                            break;
                        case 'controller_params_6017': 
                            if (parsedEvent.data && parsedEvent.data._rawBytes && Array.isArray(parsedEvent.data._rawBytes)) {
                                rawParamData[parsedEvent.type] = [...parsedEvent.data._rawBytes];
                                addLog('INFO', `Received Controller Custom Block (0x6017) - ${parsedEvent.data._rawBytes.length} bytes.`);
                                if (currentRawParamType === 'controller_params_6017') { // Check if this block is currently selected
                                     needsHexEditorUpdate = true;
                                }
                            } else {
                                addLog('WARN', `Received ${parsedEvent.type} but no _rawBytes found.`);
                            }
                            break;
                        case 'controller_params_6018': 
							if (parsedEvent.data && parsedEvent.data._rawBytes && Array.isArray(parsedEvent.data._rawBytes)) {
                                rawParamData[parsedEvent.type] = [...parsedEvent.data._rawBytes];
                                addLog('INFO', `Received Controller Custom Block (0x6018) - ${parsedEvent.data._rawBytes.length} bytes.`);
                                if (currentRawParamType === 'controller_params_6018') { // Check if this block is currently selected
                                     needsHexEditorUpdate = true;
                                }
                            } else {
                                addLog('WARN', `Received ${parsedEvent.type} but no _rawBytes found.`);
                            }
                        case 'controller_speed_params':
                            const speedData = parsedEvent.data;
                            if (speedData && Array.isArray(speedData.wheel_diameter_code)) {
                                // --- Perform Wheel Diameter Lookup ---
                                const code0 = speedData.wheel_diameter_code[0];
                                const code1 = speedData.wheel_diameter_code[1];
                                const foundWheel = wheelDiameterTable.find(wheel => wheel.code[0] === code0 && wheel.code[1] === code1);

                                // Store the combined object (including the looked-up wheel info)
                                controllerSpeedParams = {
                                    speed_limit: speedData.speed_limit,
                                    circumference: speedData.circumference,
                                    // Store the full wheel object if found, otherwise keep the code
                                    wheel_diameter: foundWheel ? foundWheel : { text: `Code ${code0.toString(16)}/${code1.toString(16)}`, code: [code0, code1] }
                                };
                                // --- End Lookup ---
                            } else {
                                // Handle case where data is invalid or missing code
                                controllerSpeedParams = parsedEvent.data; // Store raw parsed data
                            }
							if (parsedEvent.data && parsedEvent.data._rawBytes && Array.isArray(parsedEvent.data._rawBytes)) {
							rawParamData[parsedEvent.type] = [...parsedEvent.data._rawBytes];
							needsHexEditorUpdate = true;
							} else if (parsedEvent.data && parsedEvent.data.raw_data && Array.isArray(parsedEvent.data.raw_data)) {
							rawParamData[parsedEvent.type] = [...parsedEvent.data.raw_data];
							needsHexEditorUpdate = true;
							}
                            needsControllerUpdate = true;
                            break;
						case 'controller_startup_angle':
                            lastStartupAngle = parsedEvent.data?.startup_angle; // Extract angle value
                            // *** Recalculate Start Pulse if angle changes ***
                            if (lastStartupAngle !== null && lastControllerP1?.pedal_sensor_signals_per_rotation !== undefined && lastControllerP2?.torque_profiles?.[0]) {
                                try {
                                    const calculatedPulse = calculateStartPulse(lastStartupAngle, lastControllerP1.pedal_sensor_signals_per_rotation);
                                     if (lastControllerP2.torque_profiles[0].start_pulse !== calculatedPulse) {
                                        console.log(`Recalculating Start Pulse[0] due to Angle change: ${calculatedPulse}`);
                                        lastControllerP2.torque_profiles[0].start_pulse = calculatedPulse;
                                        needsGearsUpdate = true; // Ensure UI refresh if value changed
                                    }
                                } catch (e) {
                                     console.error("Error recalculating start pulse after angle update:", e);
                                }
                            } else {
                                 // console.log("Skipping start pulse recalc after angle: Missing signals or P2[0].");
                            }
                            needsGearsUpdate = true; 
							 break; 
						// --- INFO CASES (Ensure these set needsInfoUpdate) ---
                        case 'controller_hw_version': controllerOtherInfo.hwVersion = parsedEvent.data?.hardware_version; needsInfoUpdate = true; break;
                        case 'controller_sw_version': controllerOtherInfo.swVersion = parsedEvent.data?.software_version; needsInfoUpdate = true; break;
                        case 'controller_sn': controllerOtherInfo.serialNumber = parsedEvent.data?.serial_number; needsInfoUpdate = true; break;
                        case 'controller_mn': controllerOtherInfo.modelNumber = parsedEvent.data?.model_number; needsInfoUpdate = true; break; // Added MN case
                        case 'controller_mfg': controllerOtherInfo.manufacturer = parsedEvent.data?.manufacturer; needsInfoUpdate = true; break; // Added MFG case
						

                        case 'display_hw_version': displayOtherInfo.hwVersion = parsedEvent.data?.hardware_version; needsInfoUpdate = true; break;
                        case 'display_sw_version': displayOtherInfo.swVersion = parsedEvent.data?.software_version; needsInfoUpdate = true; break;
                        case 'display_sn': displayOtherInfo.serialNumber = parsedEvent.data?.serial_number; needsInfoUpdate = true; break;
                        case 'display_mn': displayOtherInfo.modelNumber = parsedEvent.data?.model_number; needsInfoUpdate = true; break; // Added MN case
                        case 'display_cn': displayOtherInfo.customerNumber = parsedEvent.data?.customer_number; needsInfoUpdate = true; break; // Added CN case
                        case 'display_mfg': displayOtherInfo.manufacturer = parsedEvent.data?.manufacturer; needsInfoUpdate = true; break; // Added MFG case
                        case 'display_bootloader_version': displayOtherInfo.bootloaderVersion = parsedEvent.data?.bootloader_version; needsInfoUpdate = true; break; // 

                      // Sensor Data (Keep existing cases, ensure needsSensorUpdate is set)
                        case 'sensor_realtime': sensorRealtime = parsedEvent.data; needsSensorUpdate = true; break;
						case 'sensor_realtime': sensorRealtime = parsedEvent.data; needsSensorUpdate = true; break;
						
                         // Battery Data
                        case 'battery_capacity': batteryCapacity = parsedEvent.data; needsBatteryUpdate = true; break;
                        case 'battery_state': batteryState = parsedEvent.data; needsBatteryUpdate = true; break;
                        case 'battery_cells_raw':
                            // Update batteryCells object based on raw data and subcode
                            const cellData = parsedEvent.data?.raw_cell_data;
                            const subCode = parsedEvent.data?.subcode;
                            if (Array.isArray(cellData) && subCode >= 2 && subCode <= 5) {
                                const baseIndex = (subCode - 2) * 4;
                                for (let i = 0; i < cellData.length / 2; i++) {
                                    const voltage = ((cellData[i * 2 + 1] << 8) + cellData[i * 2]) / 1000;
                                    batteryCells[baseIndex + i] = voltage;
                                }
                                needsBatteryUpdate = true;
                            }
                            break;
                        case 'battery_hw_version': batteryOtherInfo.hwVersion = parsedEvent.data?.hardware_version; needsBatteryUpdate = true; break;
                        case 'battery_sw_version': batteryOtherInfo.swVersion = parsedEvent.data?.software_version; needsBatteryUpdate = true; break;
                        case 'battery_mn': batteryOtherInfo.modelNumber = parsedEvent.data?.model_number; needsBatteryUpdate = true; break;
                        case 'battery_sn': batteryOtherInfo.serialNumber = parsedEvent.data?.serial_number; needsBatteryUpdate = true; break;
                    }
                    // Call UI update functions if needed
                    if (needsDisplayUpdate) updateDisplayUI();
                    if (needsSensorUpdate) updateSensorUI();
                    if (needsBatteryUpdate) updateBatteryUI();
					if (needsControllerUpdate) updateControllerUI();
					if (needsGearsUpdate) updateGearsUI();
                    if (needsInfoUpdate) updateInfoUI(); 				
					if (needsHexEditorUpdate) populateHexEditor(); 
			        if (needsPasChartUpdate) updatePasCurvesChart();
					if (needsStartRampChartUpdate) updateStartRampChart();
					
                } catch (e) { 
				    console.error("Error processing BAFANG_DATA:", e); // Log the full error object
					// Corrected addLog call - removed parsedEvent reference
					addLog('ERROR', `Failed processing received data: ${e.message}. Raw: ${jsonString}`);

				}
            }
            else if (message.startsWith('Sent Raw:')) { addLog('TX (Raw)', message.substring('Sent Raw:'.length).trim()); }
            else if (message.startsWith('INFO:')) { addLog('INFO', message.substring('INFO:'.length).trim()); }
            else if (message.startsWith('ACK:')) { addLog('ACK', message.substring('ACK:'.length).trim()); }
            else if (message.startsWith('NACK:')) { addLog('NACK', message.substring('NACK:'.length).trim()); }
            else { addLog('INFO', message); }
        };

        // --- Tab Switching ---
        tabButtons.forEach(button => button.addEventListener('click', () => switchTab(button.getAttribute('data-tab'))));

        // --- General Button Listeners ---

       // --- Connect/Disconnect Button Listener ---
        connectCanButton.addEventListener('click', () => {
            if (isCanConnected) { // If currently connected, the button means "Disconnect"
                socket.send('DISCONNECT_CAN');
                updateCanInterfaceDisplay('DISCONNECTING', currentCanDeviceName); // Optimistic UI update
            } else if (isCanDeviceFound) { // If device found but not connected, button means "Connect"
                socket.send('CONNECT_CAN');
                updateCanInterfaceDisplay('CONNECTING', currentCanDeviceName); // Optimistic UI update
            } else {
                // Should not happen if button is disabled correctly, but as a fallback:
                addLog('INFO', 'Attempted to connect but no CAN device found.');
                socket.send('GET_CAN_INTERFACE_STATUS'); // Re-check device status
            }
        });
		
        clearLogButton.onclick = () => { log.innerHTML = ''; addLog('INFO', 'Log cleared.'); };
		
        document.querySelectorAll('.read-controls button').forEach(button => {
            button.onclick = () => {
                const command = button.getAttribute('data-command');
                if (command && socket.readyState === WebSocket.OPEN) { socket.send(command); addLog('REQ', `${button.textContent} initiated`); }
                else if (!command) { addLog('ERROR', 'Button missing data-command.'); }
                else { addLog('ERROR', 'WebSocket not open.'); }
            };
        });
        
		document.getElementById('sendCustomFrame').onclick = () => { const id = canIdInput.value.trim(); const data = canDataInput.value.trim().replace(/\s/g, ''); if (!id) { alert('CAN ID required.'); return; } if (!/^[0-9a-fA-F]+$/.test(id)) { alert('CAN ID must be hex.'); return; } if (data && !/^[0-9a-fA-F]*$/.test(data)) { alert('Data must be hex.'); return; } if (data.length % 2 !== 0) { alert('Data hex must have even length.'); return; } if (data.length > 16) { alert('Data length max 8 bytes.'); return; } const command = `${id}#${data}`; socket.send(command); };

		if (debugElements.rawParamSelect) {
			debugElements.rawParamSelect.addEventListener('change', (event) => {
				currentRawParamType = event.target.value;
				addLog('DEBUG', `Raw parameter type selected: ${currentRawParamType || 'None'}`);
				populateHexEditor(); // Populate or show placeholder
			});
		}

		if (debugElements.rawParamSyncButton) {
			debugElements.rawParamSyncButton.onclick = () => {
				if (!currentRawParamType) {
					alert('Please select a parameter block from the dropdown first.');
					return;
				}
				addLog('REQ', `Syncing raw parameter: ${currentRawParamType}`);
				let readCommand = '';
				switch (currentRawParamType) {
					case 'controller_params_0': readCommand = 'READ:2:96:16'; break; // 0x60, 0x10
					case 'controller_params_1': readCommand = 'READ:2:96:17'; break; // 0x60, 0x11
					case 'controller_params_2': readCommand = 'READ:2:96:18'; break; // 0x60, 0x12
					case 'controller_params_6017': readCommand = 'READ:2:96:23'; break; // 0x60, 0x17
					case 'controller_params_6018': readCommand = 'READ:2:96:24'; break; // 0x60, 0x18
					case 'controller_speed_params': readCommand = 'READ:2:50:3'; break; // 0x32, 0x03
					default:
						addLog('ERROR', `Unknown raw parameter type for sync: ${currentRawParamType}`);
						return;
				}
				if (socket.readyState === WebSocket.OPEN) {
					socket.send(readCommand);
				} else {
					addLog('ERROR', 'WebSocket not open for raw param sync.');
				}
			};
		}

		if (debugElements.rawParamSaveButton) {
			debugElements.rawParamSaveButton.onclick = () => {
				if (!currentRawParamType || !rawParamData[currentRawParamType]) {
					alert('Please select a parameter block and ensure data is loaded before saving.');
					return;
				}

				// Make a copy of the bytes to send so we don't modify the UI's underlying data directly here
				let bytesToSend = [...rawParamData[currentRawParamType]]; // Shallow copy

				if (!bytesToSend || !Array.isArray(bytesToSend)) {
					addLog('ERROR', `No byte data available to save for ${currentRawParamType}`);
					return;
				}

				const mapping = rawParamFieldMappings[currentRawParamType];
				if (mapping && mapping.byteLength === 64) { // Apply only for 64-byte P0, P1, P2
					const checksumByteIndex = 63;
					if (bytesToSend.length === 64) { // Ensure we have 64 bytes
						let sum = 0;
						for (let k = 0; k < checksumByteIndex; k++) { // Sum bytes 0 through 62
							sum += bytesToSend[k];
						}
						const calculatedChecksum = sum & 0xFF;
						bytesToSend[checksumByteIndex] = calculatedChecksum; // Update the checksum in our copy
						addLog('DEBUG', `Calculated and set checksum for ${currentRawParamType} to 0x${calculatedChecksum.toString(16).toUpperCase()} before sending.`);

						// Optionally, update the UI input for checksum if it differs from what was calculated during live edit
						const checksumInputInUI = debugElements.hexEditorTableBody.querySelector(`input[data-index='${checksumByteIndex}']`);
						if (checksumInputInUI && parseInt(checksumInputInUI.value, 16) !== calculatedChecksum) {
							checksumInputInUI.value = calculatedChecksum.toString(16).toUpperCase().padStart(2, '0');
							 addLog('INFO', `Checksum UI field updated to 0x${calculatedChecksum.toString(16).toUpperCase()} to match calculation.`);
						}

					} else {
						addLog('ERROR', `Cannot calculate checksum for ${currentRawParamType}: Expected 64 bytes, got ${bytesToSend.length}.`);
						alert(`Data length error for ${currentRawParamType}. Cannot calculate checksum.`);
						return;
					}
				}
	

				if (!confirm(`Are you sure you want to write the (potentially checksum-updated) raw bytes for ${currentRawParamType} to the controller? This can be risky.`)) {
					return;
				}
				addLog('SAVE_REQ', `Saving raw parameter: ${currentRawParamType}`);


				let commandToSend = '';
				switch (currentRawParamType) {
					case 'controller_params_0':
						commandToSend = `WRITE_LONG_P0_RAW:${JSON.stringify(bytesToSend)}`;
						break;
					case 'controller_params_1':
						commandToSend = `WRITE_LONG_P1_RAW:${JSON.stringify(bytesToSend)}`;
						break;
					case 'controller_params_2':
						commandToSend = `WRITE_LONG_P2_RAW:${JSON.stringify(bytesToSend)}`;
						break;
					case 'controller_speed_params':
						// Speed params are short, send as hex directly via WRITE_SHORT
						// Checksum is not typically part of the CAN frame data for these short Bafang commands
						const dataHex = bytesToSend.map(b => b.toString(16).padStart(2, '0')).join('');
						commandToSend = `WRITE_SHORT:2:50:3:${dataHex}`; // Target:Ctrl, Cmd:0x32, Sub:0x03
						break;
					default:
						addLog('ERROR', `Unknown raw parameter type for save: ${currentRawParamType}`);
						alert(`Cannot save unknown raw parameter type: ${currentRawParamType}`);
						return;
				}

				if (socket.readyState === WebSocket.OPEN) {
					try {
						socket.send(commandToSend);
						// Log the first few bytes to confirm checksum inclusion if it's a long param
						const logDataPreview = bytesToSend.slice(0, 5).map(b => '0x'+b.toString(16)).join(',') +
											   (bytesToSend.length > 5 ? `... (checksum: 0x${bytesToSend[63]?.toString(16)})` : '');
						addLog('INFO', `Raw data command for ${currentRawParamType} sent to server. Data preview: [${logDataPreview}]`);
					} catch (e) {
						addLog('ERROR', `Failed to send raw data command for ${currentRawParamType}: ${e.message}`);
					}
				} else {
					addLog('ERROR', 'WebSocket not open for raw param save.');
				}
			};
		}
		
        controllerElements.syncButton.onclick = () => {
            addLog('REQ', 'Syncing all Controller data...');
            //socket.send('READ:2:50:0'); // Realtime 0
            //socket.send('READ:2:50:1'); // Realtime 1
            socket.send('READ:2:96:17'); // Parameter 1
            //socket.send('READ:2:96:18'); // Parameter 2
            socket.send('READ:2:50:3'); // Speed Params
        };

        controllerElements.saveButton.onclick = () => {
            if (!confirm("Are you sure you want to write changes to the Controller?")) return;
            addLog('SAVE_REQ', 'Saving Controller Changes...');
            let changesMade = false;
            let p1ToSend = null; // Object to hold changes for P1
            let p2ToSend = null; // Object to hold changes for P2
            let speedToSend = null; // Object to hold changes for Speed Params

               // System Voltage from Dropdown
            const selectedVoltageStr = controllerElements.p1SysVoltageSelect.value;
                if (selectedVoltageStr !== "") {
                    const selectedVoltage = parseInt(selectedVoltageStr, 10);
                    if (!isNaN(selectedVoltage) && selectedVoltage !== controllerParams1.system_voltage) {
                        p1ToSend.system_voltage = selectedVoltage;
                        p1Changed = true;
                        addLog('DEBUG', `System Voltage will be changed to: ${selectedVoltage}V`);
                    } else if (isNaN(selectedVoltage)) {
                        addLog('ERROR', `Invalid value selected for System Voltage: ${selectedVoltageStr}`);
                    }
            }
				
            // --- Collect P1 Changes ---
            if (controllerParams1) { // Only save if we have baseline data
                p1ToSend = { assist_levels: controllerParams1.assist_levels }; // Always include assist levels from original read
                let p1Changed = false;
				
                // System Voltage from Dropdown
            const selectedVoltageStr = controllerElements.p1SysVoltageSelect.value;
            if (selectedVoltageStr !== "") {
                    const selectedVoltage = parseInt(selectedVoltageStr, 10);
                    if (!isNaN(selectedVoltage) && selectedVoltage !== controllerParams1.system_voltage) {
                        p1ToSend.system_voltage = selectedVoltage;
                        p1Changed = true;
                        addLog('DEBUG', `System Voltage will be changed to: ${selectedVoltage}V`);
                    } else if (isNaN(selectedVoltage)) {
                        addLog('ERROR', `Invalid value selected for System Voltage: ${selectedVoltageStr}`);
                    }
            } 
                    // I
                // Compare each input field with stored controllerParams1 and add to p1ToSend if different
                const checkP1 = (key, inputElement, parserFunc = parseFloat, precision = -1) => {
                    const inputValue = inputElement.value;
                    if (inputValue !== "") {
                        const parsedValue = parserFunc(inputValue);
                        const originalValue = controllerParams1[key];
                        let originalComparable = (precision >= 0 && typeof originalValue === 'number') ? parseFloat(originalValue.toFixed(precision)) : originalValue;
                        let inputComparable = (precision >= 0 && typeof parsedValue === 'number') ? parseFloat(parsedValue.toFixed(precision)) : parsedValue;

                         // Handle boolean select
                        if (inputElement.tagName === 'SELECT' && typeof originalComparable === 'boolean') {
                            inputComparable = (inputValue === "true");
                        }

                        if (inputComparable !== originalComparable && !isNaN(parsedValue)) { // Check for NaN too
                            p1ToSend[key] = parsedValue;
                            p1Changed = true;
                        } else if (isNaN(parsedValue)) {
                             addLog('ERROR', `Invalid number format for ${key}: ${inputValue}`);
                        }
                    }
                };
                checkP1('current_limit', controllerElements.p1CurrentLimitInput, parseInt);
				checkP1('max_current_on_low_charge', controllerElements.p1MaxCurrentLowChargeInput, parseInt);
                checkP1('overvoltage', controllerElements.p1OverVoltageInput, parseInt);
                checkP1('undervoltage_under_load', controllerElements.p1UnderVoltageLoadInput, parseInt);
                checkP1('undervoltage', controllerElements.p1UnderVoltageIdleInput, parseInt);
                checkP1('battery_capacity', controllerElements.p1BattCapacityInput, parseInt);
				checkP1('limp_mode_soc_limit', controllerElements.p1LimpModeSocInput, parseInt);
                checkP1('full_capacity_range', controllerElements.p1FullRangeInput, parseInt);
                checkP1('speedmeter_magnets_number', controllerElements.p1SpeedMagnetsInput, parseInt);
                checkP1('lamps_always_on', controllerElements.p1LampsOnInput, val => val === "true"); // Boolean parser
                checkP1('start_current', controllerElements.p1StartCurrentInput, parseInt);
                checkP1('current_loading_time', controllerElements.p1CurrentLoadTimeInput, parseFloat, 1);
                checkP1('current_shedding_time', controllerElements.p1CurrentShedTimeInput, parseFloat, 1);
                checkP1('pedal_sensor_type', controllerElements.p1PedalTypeInput, parseInt);
                checkP1('throttle_start_voltage', controllerElements.p1ThrottleStartInput, parseFloat, 1);
                checkP1('throttle_max_voltage', controllerElements.p1ThrottleEndInput, parseFloat, 1); // Corrected key
				checkP1('walk_assist_speed', controllerElements.p1WalkAssistSpeedInput, parseFloat, 1); // Check with 1 decimal place

                if (p1Changed) {
					 // If system_voltage wasn't set from dropdown but other P1 params changed,
                    // ensure the original system_voltage is included so it's not accidentally zeroed out
                    // by the serializer if it expects the field.
                    if (p1ToSend.system_voltage === undefined && controllerParams1.system_voltage !== undefined) {
                        p1ToSend.system_voltage = controllerParams1.system_voltage;
                    }
                    socket.send(`WRITE_LONG_P1:${JSON.stringify(p1ToSend)}`);
                    addLog('SAVE_REQ', 'Controller Parameter 1');
                    changesMade = true;
                }
            } else {
                 addLog('INFO', 'Cannot save P1 - read data first.');
            }

              // --- Collect Speed Param Changes ---
			if (controllerSpeedParams) { // Ensure controllerSpeedParams has been read first
                speedToSend = {}; // Object to hold changes for Speed Params
                let speedChanged = false;

                // Speed Limit
                const speedLimitInputVal = controllerElements.p3SpeedLimitInput.value;
                if (speedLimitInputVal !== "") {
                    const parsedSpeedLimit = parseFloat(speedLimitInputVal);
                    if (!isNaN(parsedSpeedLimit) && parsedSpeedLimit.toFixed(2) !== controllerSpeedParams.speed_limit?.toFixed(2)) {
                        speedToSend.speed_limit = parsedSpeedLimit;
                        speedChanged = true;
                    } else if (isNaN(parsedSpeedLimit)) { addLog('ERROR', `Invalid number format for speed_limit: ${speedLimitInputVal}`); }
                }

                // Wheel Diameter
                const selectedWheelText = controllerElements.p3WheelDiameterInput.value;
                if (selectedWheelText !== "" && selectedWheelText !== controllerSpeedParams.wheel_diameter?.text) {
                    const selectedOption = controllerElements.p3WheelDiameterInput.options[controllerElements.p3WheelDiameterInput.selectedIndex];
                    if (selectedOption && selectedOption.dataset.code0 && selectedOption.dataset.code1) {
                        speedToSend.wheel_diameter = { // Send the whole wheel object as expected by server
                            text: selectedWheelText,
                            code: [parseInt(selectedOption.dataset.code0), parseInt(selectedOption.dataset.code1)]
                            // You might also want to include min/max circumference from dataset if server uses it
                        };
                        speedChanged = true;
                    } else { addLog('ERROR', 'Selected wheel diameter option is missing code data.'); }
                }

                // Circumference 
                const circumferenceInputVal = controllerElements.p3CircumferenceInput.value;
                if (circumferenceInputVal !== "") {
                    const parsedCircumference = parseInt(circumferenceInputVal, 10);
                    if (!isNaN(parsedCircumference) && parsedCircumference !== controllerSpeedParams.circumference) {
                        speedToSend.circumference = parsedCircumference; // MAKE SURE THIS IS ADDED
                        speedChanged = true;
                    } else if (isNaN(parsedCircumference)) { addLog('ERROR', `Invalid number format for circumference: ${circumferenceInputVal}`); }
                }


                if (speedChanged) {
                    // Ensure wheel_diameter and circumference are present if any part of speed settings changed
                    // If only speed_limit changed, we still need to send the current wheel/circumference
                    if (!speedToSend.wheel_diameter && controllerSpeedParams.wheel_diameter) {
                        speedToSend.wheel_diameter = controllerSpeedParams.wheel_diameter;
                    }
                    if (!speedToSend.circumference && typeof controllerSpeedParams.circumference === 'number') {
                        speedToSend.circumference = controllerSpeedParams.circumference;
                    }

                    // Check if essential parts are there before sending
                    if (speedToSend.wheel_diameter && typeof speedToSend.circumference === 'number' && typeof speedToSend.speed_limit === 'number') {
                        socket.send(`WRITE_LONG_SPEED:${JSON.stringify(speedToSend)}`);
                        addLog('SAVE_REQ', 'Controller Speed Params (via WRITE_LONG_SPEED)');
                        changesMade = true;
                    } else {
                        addLog('ERROR', 'Cannot save speed params: Missing speed limit, wheel diameter, or circumference.');
                        if (!speedToSend.wheel_diameter) console.error("Debug: speedToSend.wheel_diameter is missing");
                        if (typeof speedToSend.circumference !== 'number') console.error("Debug: speedToSend.circumference is missing or not a number");
                        if (typeof speedToSend.speed_limit !== 'number') console.error("Debug: speedToSend.speed_limit is missing or not a number");

                    }
                }
            } else {
                 addLog('INFO', 'Cannot save Speed Params - read data first (controllerSpeedParams is null).');
            }

            if (!changesMade) {
                addLog('INFO', 'No controller changes detected to save.');
            }
        };

        controllerElements.calibratePositionButton.onclick = () => {
             if (confirm("WARNING: Motor will spin!\n\nEnsure chain is removed and bike is secure.\n\nProceed with Position Sensor Calibration?")) {
                 // Target: 2 (Controller), Cmd: 98 (0x62), SubCmd: 0 (0x00)
                 // Data: 5 zero bytes [00, 00, 00, 00, 00]
                 socket.send("WRITE_SHORT:2:98:0:0000000000");
                 addLog('SAVE_REQ', 'Calibrate Position Sensor');
             }
        };
		
        displayElements.syncButton.onclick = () => {
            addLog('REQ', 'Syncing all Display data...');
            //Send read requests for all display parameters
            socket.send('READ:3:96:7'); // Errors
            //socket.send('READ:3:99:0'); // Realtime
            socket.send('READ:3:99:1'); // Data1
            socket.send('READ:3:99:2'); // Data2
			//socket.send('READ:3:99:3'); // Auto Shutdown Time

        };

        displayElements.saveButton.onclick = () => {
            if (!confirm("Are you sure you want to write changes to the Display?")) return;
            addLog('SAVE_REQ', 'Saving Display Changes...');
            let changesMade = false;

            // --- Mileage ---
            const newTotalStr = displayElements.totalMileageInput.value;
            const newSingleStr = displayElements.singleMileageInput.value;
            if (newTotalStr !== "") {
                 const newTotal = parseInt(newTotalStr, 10);
                 if (!isNaN(newTotal) && newTotal !== Math.round(displayData1?.total_mileage)) {
                     socket.send(`WRITE_DISP_TOTAL_MILEAGE:${newTotal}`);
                     addLog('SAVE_REQ', `Display Total Mileage: ${newTotal}`);
                     changesMade = true;
                 } else if (isNaN(newTotal)) { addLog('ERROR', 'Invalid Total Mileage input.');}
            }
             if (newSingleStr !== "") {
                  const newSingle = parseFloat(newSingleStr);
                  if (!isNaN(newSingle) && newSingle.toFixed(1) !== displayData1?.single_mileage?.toFixed(1)) {
                      socket.send(`WRITE_DISP_SINGLE_MILEAGE:${newSingle}`);
                      addLog('SAVE_REQ', `Display Single Mileage: ${newSingle}`);
                      changesMade = true;
                  } else if (isNaN(newSingle)) { addLog('ERROR', 'Invalid Single Mileage input.');}
             }
			 
            if (!changesMade) {
                addLog('INFO', 'No display changes detected to save.');
            }
        };

        displayElements.clearServiceButton.onclick = () => {
        const threshold = prompt("Enter new service interval (km):", "5000");
        if (threshold === null) { // User cancelled
            return;
        }
        const thresholdKm = parseInt(threshold, 10);
        if (isNaN(thresholdKm) || thresholdKm < 0) {
            alert("Invalid threshold. Please enter a non-negative number.");
            return;
        }
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(`SET_AND_CLEAN_SERVICE_MILEAGE:${thresholdKm}`);
            logToConsole(`UI: Sent SET_AND_CLEAN_SERVICE_MILEAGE:${thresholdKm}`);
        } else {
            logToConsole("UI Error: WebSocket not connected.");
        }
        };

        displayElements.setTimeButton.onclick = () => {
             if (confirm("Are you sure you want to set the display clock to the current time?")) {
                 const now = new Date(); const h = now.getHours(); const m = now.getMinutes(); const s = now.getSeconds();
                 socket.send(`WRITE_DISP_TIME:${h},${m},${s}`);
                 addLog('SAVE_REQ', 'Display Time (Now)');
             }
        };

        // --- Sensor Tab Specific Button Listeners ---
        sensorElements.syncButton.onclick = () => {
            addLog('REQ', 'Syncing all Sensor data...');
            socket.send('READ:1:49:0'); // Realtime
		    };

        // --- Battery Tab Specific Button Listeners ---
        batteryElements.syncButton.onclick = () => {
             addLog('REQ', 'Syncing all Battery data...');
             socket.send('READ:4:52:0'); // Capacity
             socket.send('READ:4:52:1'); // State
             // Send requests for all cell groups
             socket.send('READ:4:100:2'); // Cells 0-3
             socket.send('READ:4:100:3'); // Cells 4-7
             socket.send('READ:4:100:4'); // Cells 8-11
             socket.send('READ:4:100:5'); // Cells 12-15
        };
		
	   // --- Gears Tab Specific Button Listeners ---
		gearsElements.syncButton.onclick = () => {
          addLog('REQ', 'Syncing Gears data ...');
		  socket.send('READ:2:96:16'); // Request Controller P0
          socket.send('READ:2:96:17'); // Request Controller P1
          socket.send('READ:2:96:18'); // Request Controller P2
		  socket.send('READ_STARTUP_ANGLE'); //startup angle
		};

      gearsElements.saveButton.onclick = async () => { 
		  
		    const angleStr = gearsElements.controllerStartupAngleInputEl?.value;
            const angleValue = (angleStr !== undefined && angleStr !== "") ? parseInt(angleStr, 10) : null;
            let angleIsValid = (angleValue !== null && !isNaN(angleValue) && angleValue >= 0 && angleValue <= 360);
            if (angleStr !== "" && !angleIsValid) {
                 addLog('ERROR', `Invalid Startup Angle value entered: ${angleStr}. Must be 0-360.`);
                 alert(`Invalid Startup Angle value entered: ${angleStr}. Must be between 0 and 360.`);
                 return; // Stop save if angle is entered but invalid
             }

            if (!lastControllerP1 || !lastControllerP2 || !lastControllerP0) { // Check P0 as well
                 let missing = [];
                 if (!lastControllerP0) missing.push("P0 (Acceleration)");
                 if (!lastControllerP1) missing.push("P1 (Assist Limits)");
                 if (!lastControllerP2) missing.push("P2 (Torque)");
                  addLog('ERROR', `Cannot save Assist Settings - read required Controller data first: ${missing.join(', ')}`);
                  return; // Stop if essential data is missing
             }
               
            if (!confirm("Are you sure you want to write Assist Level AND Torque Profile changes to the Controller?")) return;
            addLog('SAVE_REQ', 'Saving Gears & Assist Changes...');
            let changesMade = false; // Track if anything was actually sent
			
		    // Send P0 (acceleration  Levels) - Use the locally modified object
            if (lastControllerP0) { // Check again just in case, though covered above
                // We send the whole P1 block because the user might have edited values via the table inputs
                socket.send(`WRITE_LONG_P0:${JSON.stringify(lastControllerP0)}`);
                addLog('SAVE_REQ', 'Controller Parameter 0 (Acceleration Levels)');
                changesMade = true;
				await new Promise(resolve => setTimeout(resolve, 500)); // Wait
            }

            // Send P1 (Assist Levels) - Use the locally modified object
            if (lastControllerP1) { // Check again just in case, though covered above
                // We send the whole P1 block because the user might have edited values via the table inputs
                socket.send(`WRITE_LONG_P1:${JSON.stringify(lastControllerP1)}`);
                addLog('SAVE_REQ', 'Controller Parameter 1 (Assist Levels)');
                changesMade = true;
				await new Promise(resolve => setTimeout(resolve, 500)); // Wait
            }
            // else { // Already handled by the check at the top }

            // Send P2 (Torque Profiles) - Use the locally modified object
            if (lastControllerP2) { // Check again just in case
                // We send the whole P2 block
                socket.send(`WRITE_LONG_P2:${JSON.stringify(lastControllerP2)}`);
                addLog('SAVE_REQ', 'Controller Parameter 2 (Torque Profiles)');
                changesMade = true;
				await new Promise(resolve => setTimeout(resolve, 500)); // Wait
            }
			
          if (angleIsValid && angleValue !== lastStartupAngle) { // Only send if valid AND changed
                socket.send(`WRITE_STARTUP_ANGLE:${angleValue}`);
                addLog('SAVE_REQ', `Startup Angle: ${angleValue}`);
                changesMade = true;
            } else if (angleIsValid && angleValue === lastStartupAngle) {
                 // Don't log error, just note no change needed
                 // addLog('INFO', 'Startup Angle not changed, skipping save.');
            }

            if (!changesMade) {
                // This condition might not be reachable if the initial checks pass
                // but kept for consistency.
                addLog('INFO', 'No P0, P1 or P2 data available to save.');
            }
        };
		
	      // --- Info Tab Button Listeners ---
        infoElements.syncButton.onclick = () => {
             addLog('REQ', 'Syncing all Device Info...');
             // Send all info read commands (same as before)
             // Controller
             socket.send('READ:2:96:0'); socket.send('READ:2:96:1'); socket.send('READ:2:96:3');
             socket.send('READ:2:96:2'); socket.send('READ:2:96:5');
             // Display
             socket.send('READ:3:96:0'); socket.send('READ:3:96:1'); socket.send('READ:3:96:3');
             socket.send('READ:3:96:8'); socket.send('READ:3:96:5'); socket.send('READ:3:96:4');
             socket.send('READ:3:96:2');
             // Sensor
             socket.send('READ:1:96:0'); socket.send('READ:1:96:1'); socket.send('READ:1:96:3');
             socket.send('READ:1:96:2');
             // Battery
             socket.send('READ:4:96:0'); socket.send('READ:4:96:1'); socket.send('READ:4:96:3');
             socket.send('READ:4:96:2');
        };

        infoElements.saveButton.onclick = () => {
            if (!confirm("Are you sure you want to save changes to device information?")) return;
            addLog('SAVE_REQ', 'Saving Device Info Changes...');
            let changesMade = false;

            // Controller Manufacturer
            const newCtrlMfg = infoElements.ctrlMfgInput.value;
            if (newCtrlMfg !== "" && newCtrlMfg !== controllerOtherInfo.manufacturer) {
                // Target: 2 (Controller), Cmd: 96 (0x60), SubCmd: 5 (0x05)
                socket.send(`WRITE_LONG_STRING:2:96:5:${newCtrlMfg}`);
                addLog('SAVE_REQ', `Controller Manufacturer: ${newCtrlMfg}`);
                changesMade = true;
            }

            // Display Manufacturer
            const newDisplayMfg = infoElements.displayMfgInput.value;
            if (newDisplayMfg !== "" && newDisplayMfg !== displayOtherInfo.manufacturer) {
                // Target: 3 (Display), Cmd: 96 (0x60), SubCmd: 5 (0x05)
                socket.send(`WRITE_LONG_STRING:3:96:5:${newDisplayMfg}`);
                addLog('SAVE_REQ', `Display Manufacturer: ${newDisplayMfg}`);
                changesMade = true;
            }

            // Display Customer Number
            const newDisplayCn = infoElements.displayCnInput.value;
            if (newDisplayCn !== "" && newDisplayCn !== displayOtherInfo.customerNumber) {
                // Target: 3 (Display), Cmd: 96 (0x60), SubCmd: 4 (0x04)
                socket.send(`WRITE_LONG_STRING:3:96:4:${newDisplayCn}`);
                addLog('SAVE_REQ', `Display Customer Number: ${newDisplayCn}`);
                changesMade = true;
            }

            // Add Serial Number writes here if implemented/desired

            if (!changesMade) {
                addLog('INFO', 'No device info changes detected to save.');
            }
        };
		
        // --- Initial State ---
		populateWheelSelect(); // Populate dropdown on load
        //updateStatus(false);
        switchTab('controller'); // Start on Controller tab
		populateHexEditor();
        updateCanInterfaceDisplay('DEVICE_NOT_FOUND'); // Set initial UI state to "Disconnected, No Device"
        statusText.textContent = "Connecting to server..."; // Initial text before WebSocket open	
		updatePasCurvesChart(); // Initial call to draw empty or placeholder chart
		updateStartRampChart(); // Initial call