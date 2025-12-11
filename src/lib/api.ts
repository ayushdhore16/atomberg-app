// API configuration and utility functions for Atomberg API
import {
  MOCK_MODE,
  getMockAccessToken,
  getMockDevices,
  getMockDeviceState,
  sendMockCommand,
} from "./mockData";

const API_BASE_URL = "https://api.atomberg-iot.com";

interface AtombergCredentials {
  apiKey: string;
  refreshToken: string;
}

interface AccessTokenResponse {
  access_token: string;
  expires_in: number;
}

interface Device {
  device_id: string;
  name: string;
  device_type: string;
  is_online: boolean;
}

interface DeviceListResponse {
  devices: Device[];
}

interface DeviceState {
  device_id: string;
  state: Record<string, string | number | null | boolean>;
}

interface CommandPayload {
  command: string;
  value?: string | number | null;
}

// Get access token using refresh token
export async function getAccessToken(
  apiKey: string,
  refreshToken: string
): Promise<string> {
  // Use mock data in development
  if (MOCK_MODE) {
    return getMockAccessToken(apiKey, refreshToken);
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/get-access-token`, {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        Authorization: `Bearer ${refreshToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        error.message || `Failed to get access token: ${response.statusText}`
      );
    }

    const data: AccessTokenResponse = await response.json();
    return data.access_token;
  } catch (error) {
    throw new Error(
      `Error getting access token: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

// Get list of devices
export async function getDevices(
  apiKey: string,
  accessToken: string
): Promise<Device[]> {
  // Use mock data in development
  if (MOCK_MODE) {
    return getMockDevices(apiKey, accessToken);
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/get-devices`, {
      method: "GET",
      headers: {
        "x-api-key": apiKey,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        error.message || `Failed to get devices: ${response.statusText}`
      );
    }

    const data: DeviceListResponse = await response.json();
    return data.devices || [];
  } catch (error) {
    throw new Error(
      `Error fetching devices: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

// Get device state
export async function getDeviceState(
  apiKey: string,
  accessToken: string,
  deviceId: string
): Promise<DeviceState> {
  // Use mock data in development
  if (MOCK_MODE) {
    return getMockDeviceState(apiKey, accessToken, deviceId);
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/get-device-state?device_id=${deviceId}`,
      {
        method: "GET",
        headers: {
          "x-api-key": apiKey,
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        error.message || `Failed to get device state: ${response.statusText}`
      );
    }

    const data: DeviceState = await response.json();
    return data;
  } catch (error) {
    throw new Error(
      `Error fetching device state: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

// Send command to device
export async function sendCommand(
  apiKey: string,
  accessToken: string,
  deviceId: string,
  command: string,
  value?: string | number | null
): Promise<Record<string, unknown>> {
  // Use mock data in development
  if (MOCK_MODE) {
    return sendMockCommand(apiKey, accessToken, deviceId, command, value);
  }

  try {
    const payload: CommandPayload = {
      command,
    };

    if (value !== undefined) {
      payload.value = value;
    }

    const response = await fetch(`${API_BASE_URL}/api/send-command`, {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        device_id: deviceId,
        ...payload,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        error.message || `Failed to send command: ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(
      `Error sending command: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

export type { AtombergCredentials, Device, DeviceState };
