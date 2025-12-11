// Mock data for development and testing without real devices
import { Device, DeviceState } from "./api";

// Enable mock mode by setting this to true
// You can also use: NEXT_PUBLIC_MOCK_MODE environment variable
export const MOCK_MODE = process.env.NEXT_PUBLIC_MOCK_MODE === "true" || true;

// Mock devices simulating real Atomberg fans - using a mutable array
export const MOCK_DEVICES: Device[] = [
  {
    device_id: "DEV001",
    name: "Bedroom Fan",
    device_type: "ceiling_fan",
    is_online: true,
  },
  {
    device_id: "DEV002",
    name: "Living Room Fan",
    device_type: "ceiling_fan",
    is_online: true,
  },
  {
    device_id: "DEV003",
    name: "Kitchen Fan",
    device_type: "ceiling_fan",
    is_online: true,
  },
  {
    device_id: "DEV004",
    name: "Hall Fan",
    device_type: "table_fan",
    is_online: true,
  },
];

// Mock device states - stores current state of each device
// All fans start in the OFF state
const mockDeviceStates: Record<string, { is_powered: boolean; speed: number; brightness: number; timer: number | null }> = {
  DEV001: {
    is_powered: false,
    speed: 0,
    brightness: 0,
    timer: null,
  },
  DEV002: {
    is_powered: false,
    speed: 0,
    brightness: 0,
    timer: null,
  },
  DEV003: {
    is_powered: false,
    speed: 0,
    brightness: 0,
    timer: null,
  },
  DEV004: {
    is_powered: false,
    speed: 0,
    brightness: 0,
    timer: null,
  },
};

// Simulate network delay
export async function simulateDelay(ms: number = 500): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Mock API functions
export async function getMockAccessToken(
  apiKey: string,
  refreshToken: string
): Promise<string> {
  await simulateDelay(300);

  // DEMO MODE: Only accept "abc" for both credentials
  // All other credentials are rejected
  if (apiKey !== "abc" || refreshToken !== "abc") {
    throw new Error("Invalid credentials. Demo mode requires: API Key: abc, Refresh Token: abc");
  }

  return `mock_access_token_${Date.now()}`;
}

export async function getMockDevices(
  apiKey: string,
  accessToken: string
): Promise<Device[]> {
  await simulateDelay(400);

  // Simulate expired token
  if (!accessToken.startsWith("mock_")) {
    throw new Error("Invalid access token");
  }

  return MOCK_DEVICES;
}

export async function getMockDeviceState(
  apiKey: string,
  accessToken: string,
  deviceId: string
): Promise<DeviceState> {
  await simulateDelay(250);

  const state = mockDeviceStates[deviceId];
  if (!state) {
    throw new Error(`Device ${deviceId} not found`);
  }

  return {
    device_id: deviceId,
    state,
  };
}

export async function sendMockCommand(
  apiKey: string,
  accessToken: string,
  deviceId: string,
  command: string,
  value?: string | number | null
): Promise<{ success: boolean; message: string }> {
  await simulateDelay(400);

  const deviceState = mockDeviceStates[deviceId];
  if (!deviceState) {
    throw new Error(`Device ${deviceId} not found`);
  }

  // Simulate device offline
  const device = MOCK_DEVICES.find((d) => d.device_id === deviceId);
  if (device && !device.is_online) {
    throw new Error("Device is offline");
  }

  // Process command
  switch (command) {
    case "power":
    case "is_powered":
      // Accept multiple formats for true: 1, "on", "true", true (when called from API)
      // Accept multiple formats for false: 0, "off", "false", false (when called from API)
      deviceState.is_powered = value === 1 || value === "on" || value === "true";
      return {
        success: true,
        message: `Fan turned ${deviceState.is_powered ? "on" : "off"}`,
      };

    case "speed":
      if (typeof value !== "number" || value < 1 || value > 5) {
        throw new Error("Speed must be between 1 and 5");
      }
      deviceState.speed = value;
      return {
        success: true,
        message: `Speed set to ${value}`,
      };

    case "brightness":
      if (typeof value !== "number" || value < 0 || value > 100) {
        throw new Error("Brightness must be between 0 and 100");
      }
      deviceState.brightness = value;
      return {
        success: true,
        message: `Brightness set to ${value}%`,
      };

    case "timer":
      if (typeof value === "number" || value === null) {
        deviceState.timer = value;
      }
      return {
        success: true,
        message: `Timer set to ${value} minutes`,
      };

    default:
      throw new Error(`Unknown command: ${command}`);
  }
}

// Get current mock device state (for testing)
export function getMockDeviceCurrentState(deviceId: string): { is_powered: boolean; speed: number; brightness: number; timer: number | null } | undefined {
  return mockDeviceStates[deviceId];
}

// Reset all device states to initial values (all OFF)
export function resetMockDeviceStates(): void {
  mockDeviceStates["DEV001"] = {
    is_powered: false,
    speed: 0,
    brightness: 0,
    timer: null,
  };
  mockDeviceStates["DEV002"] = {
    is_powered: false,
    speed: 0,
    brightness: 0,
    timer: null,
  };
  mockDeviceStates["DEV003"] = {
    is_powered: false,
    speed: 0,
    brightness: 0,
    timer: null,
  };
  mockDeviceStates["DEV004"] = {
    is_powered: false,
    speed: 0,
    brightness: 0,
    timer: null,
  };
}

// Add a new fan device
export function addMockFan(name: string, deviceType: "ceiling_fan" | "table_fan" = "ceiling_fan"): Device {
  const newDeviceId = `DEV${String(MOCK_DEVICES.length + 1).padStart(3, "0")}`;
  const newDevice: Device = {
    device_id: newDeviceId,
    name,
    device_type: deviceType,
    is_online: true,
  };
  
  MOCK_DEVICES.push(newDevice);
  
  // Initialize state for new device
  mockDeviceStates[newDeviceId] = {
    is_powered: false,
    speed: 0,
    brightness: 0,
    timer: null,
  };
  
  return newDevice;
}

// Remove a fan device
export function removeMockFan(deviceId: string): boolean {
  const index = MOCK_DEVICES.findIndex((d) => d.device_id === deviceId);
  if (index > -1) {
    MOCK_DEVICES.splice(index, 1);
    delete mockDeviceStates[deviceId];
    return true;
  }
  return false;
}

// Get all mock devices
export function getAllMockDevices(): Device[] {
  return MOCK_DEVICES;
}
