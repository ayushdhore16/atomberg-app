// Context for managing app state
"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { Device } from "@/lib/api";

interface DeviceState {
  is_powered: boolean;
  speed?: number;
  brightness?: number;
  timer?: number | null;
}

interface AppContextType {
  apiKey: string;
  setApiKey: (key: string) => void;
  refreshToken: string;
  setRefreshToken: (token: string) => void;
  accessToken: string;
  setAccessToken: (token: string) => void;
  devices: Device[];
  setDevices: (devices: Device[]) => void;
  deviceStates: Record<string, DeviceState>;
  setDeviceStates: (states: Record<string, DeviceState>) => void;
  updateDeviceState: (deviceId: string, state: Partial<DeviceState>) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  clearError: () => void;
  selectedDevice: Device | null;
  setSelectedDevice: (device: Device | null) => void;
  refetchDevices: () => Promise<void>;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [apiKey, setApiKey] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [devices, setDevices] = useState<Device[]>([]);
  const [deviceStates, setDeviceStates] = useState<Record<string, DeviceState>>({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const updateDeviceState = useCallback(
    (deviceId: string, state: Partial<DeviceState>) => {
      setDeviceStates((prev) => ({
        ...prev,
        [deviceId]: { ...prev[deviceId], ...state },
      }));
    },
    []
  );

  const refetchDevices = useCallback(async () => {
    if (!accessToken) return;
    try {
      const { getMockDevices } = await import("@/lib/mockData");
      const updatedDevices = await getMockDevices(apiKey, accessToken);
      setDevices(updatedDevices);
    } catch (err) {
      console.error("Failed to refetch devices:", err);
    }
  }, [apiKey, accessToken]);

  const logout = useCallback(() => {
    setApiKey("");
    setRefreshToken("");
    setAccessToken("");
    setDevices([]);
    setDeviceStates({});
    setIsAuthenticated(false);
    setSelectedDevice(null);
    setError(null);
  }, []);

  return (
    <AppContext.Provider
      value={{
        apiKey,
        setApiKey,
        refreshToken,
        setRefreshToken,
        accessToken,
        setAccessToken,
        devices,
        setDevices,
        deviceStates,
        setDeviceStates,
        updateDeviceState,
        isAuthenticated,
        setIsAuthenticated,
        isLoading,
        setIsLoading,
        error,
        setError,
        clearError,
        selectedDevice,
        setSelectedDevice,
        refetchDevices,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
}
