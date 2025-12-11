import { Device, DeviceState } from "./api";

// For development, we're using mock data instead of hitting real API
// This lets us test everything locally without needing actual devices
export const MOCK_MODE = process.env.NEXT_PUBLIC_MOCK_MODE === "true" || true;

// Some sample fans to start with
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

// Keep track of each fan's current state (power, speed, etc)
// Everyone starts with power off
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

// Mimic actual network delay so it feels more real
export async function simulateDelay(ms: number = 500): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Mock API functions
export async function getMockAccessToken(
  apiKey: string,
  refreshToken: string
): Promise<string> {
  await simulateDelay(300);

  // For testing, just use abc/abc
  // In production this would validate against your actual backend
  if (apiKey !== "abc" || refreshToken !== "abc") {
    throw new Error("Invalid credentials. Use api key: abc, refresh token: abc");
  }

  return `mock_access_token_${Date.now()}`;
}

export async function getMockDevices(
  apiKey: string,
  accessToken: string
): Promise<Device[]> {
  await simulateDelay(400);

  // Check if token looks valid
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
      // Toggle power on/off based on the value
      deviceState.is_powered = value === 1 || value === "on" || value === "true";
      return {
        success: true,
        message: `Fan turned ${deviceState.is_powered ? "on" : "off"}`,
      };

    case "speed":
      // Speed goes from 1 to 5
      if (typeof value !== "number" || value < 1 || value > 5) {
        throw new Error("Speed must be between 1 and 5");
      }
      deviceState.speed = value;
      return {
        success: true,
        message: `Speed set to ${value}`,
      };

    case "brightness":
      // Brightness from 0 to 100%
      if (typeof value !== "number" || value < 0 || value > 100) {
        throw new Error("Brightness must be between 0 and 100");
      }
      deviceState.brightness = value;
      return {
        success: true,
        message: `Brightness set to ${value}%`,
      };
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
