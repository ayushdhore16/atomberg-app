"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Alert } from "./Alert";
import { sendCommand, getDeviceState } from "@/lib/api";
import { useAppContext } from "@/lib/context";
import { Device } from "@/lib/api";

interface FanControlProps {
  device: Device;
}

interface FanState {
  [key: string]: string | number | null | undefined | boolean;
}

export function FanControl({ device }: FanControlProps) {
  const [state, setState] = useState<FanState>({});
  const [isLoadingState, setIsLoadingState] = useState(true);
  const [isLoadingCommand, setIsLoadingCommand] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { apiKey, accessToken, updateDeviceState } = useAppContext();

  // Fetch device state
  const fetchState = useCallback(async () => {
    try {
      const deviceState = await getDeviceState(apiKey, accessToken, device.device_id);
      setState(deviceState.state || {});
      updateDeviceState(device.device_id, deviceState.state || {});
      setError(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch device state";
      setError(errorMessage);
    }
  }, [apiKey, accessToken, device.device_id, updateDeviceState]);

  useEffect(() => {
    const loadState = async () => {
      try {
        setIsLoadingState(true);
        await fetchState();
      } finally {
        setIsLoadingState(false);
      }
    };

    loadState();

    // Auto-refresh every 3 seconds
    const interval = setInterval(() => {
      fetchState();
    }, 3000);

    return () => clearInterval(interval);
  }, [fetchState]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchState();
    setIsRefreshing(false);
  };

  const handleCommand = async (command: string, value?: string | number | null) => {
    try {
      setIsLoadingCommand(true);
      setError(null);
      setSuccess(null);

      // Log the command for debugging
      console.log(`📡 Sending command: ${command} = ${value} to ${device.device_id}`);

      await sendCommand(apiKey, accessToken, device.device_id, command, value);

      // Update local state optimistically
      if (value !== undefined) {
        setState((prev) => {
          const newState = {
            ...prev,
            [command]: value,
          };
          console.log(`✅ State updated for ${command}:`, newState[command]);
          return newState;
        });
        updateDeviceState(device.device_id, { [command]: value });
      }

      setSuccess(`${command === "is_powered" ? "Power" : command} updated successfully!`);

      // Fetch updated state
      const deviceState = await getDeviceState(
        apiKey,
        accessToken,
        device.device_id
      );
      console.log(`📊 Device state fetched:`, deviceState.state);
      setState(deviceState.state || {});
      updateDeviceState(device.device_id, deviceState.state || {});
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to send command";
      console.error(`❌ Error: ${errorMessage}`);
      setError(errorMessage);
    } finally {
      setIsLoadingCommand(false);
    }
  };

  if (isLoadingState) {
    return (
      <div className="bg-white rounded-lg p-6 border border-gray-200 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="space-y-3">
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 text-white">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
            />
              </svg>
              <h3 className="text-xl font-bold">{device.name}</h3>
            </div>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing || isLoadingCommand}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-2 transition-all duration-200 disabled:opacity-50"
              title="Refresh device state"
            >
              <svg
                className={`w-5 h-5 ${isRefreshing ? "animate-spin" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span
              className={`w-2 h-2 rounded-full animate-pulse ${
                device.is_online ? "bg-green-300" : "bg-red-300"
              }`}
            ></span>
            <span>{device.is_online ? "Online" : "Offline"}</span>
          </div>
        </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Alerts */}
        {error && (
          <Alert
            type="error"
            message={error}
            onClose={() => setError(null)}
          />
        )}
        {success && (
          <Alert
            type="success"
            message={success}
            onClose={() => setSuccess(null)}
          />
        )}

        {/* Power Toggle - Large Dynamic Button */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border-2 border-blue-200 text-center">
          <p className="text-sm font-semibold text-gray-600 mb-4">Power Status</p>
          <button
            onClick={() => handleCommand("is_powered", state.is_powered ? 0 : 1)}
            disabled={!device.is_online || isLoadingCommand}
            className={`w-full py-6 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
              state.is_powered
                ? "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
                : "bg-gradient-to-r from-gray-400 to-gray-500 text-white hover:from-gray-500 hover:to-gray-600"
            }`}
          >
            <svg
              className={`w-6 h-6 transition-transform duration-300 ${
                state.is_powered ? "animate-bounce" : ""
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              {state.is_powered ? (
                <path d="M10.5 1.5H9.5V.5h1v1zM14.5 3.5l.707-.707.707.707-.707.707-.707-.707zM5.5 3.5L4.793 2.793 5.5 2.086l.707.707-.707.707zM15 10h1v1h-1v-1zM4 10h1v1H4v-1zM13.657 13.657l.707-.707.707.707-.707.707-.707-.707zM6.343 13.657l-.707-.707-.707.707.707.707.707-.707zM13 16.5v1h-1v-1h1zM9 17.5h2v1H9v-1z" />
              ) : (
                <path d="M4 10a1 1 0 011-1h10a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM8 2a1 1 0 011-1h2a1 1 0 011 1v2H8V2z" />
              )}
            </svg>
            <span>{isLoadingCommand ? "Processing..." : state.is_powered ? "🟢 ON" : "🔴 OFF"}</span>
          </button>
          <p className="text-xs text-gray-500 mt-3">
            {device.is_online ? (
              <>Click to toggle power • Device is <span className="text-green-600 font-semibold">online</span></>
            ) : (
              <>⚠️ Device is <span className="text-red-600 font-semibold">offline</span> - Cannot control</>
            )}
          </p>
        </div>

        {/* Device Status */}
        <div className="bg-white rounded-xl p-5 border-2 border-gray-200 shadow-sm">
          <p className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
            <span>📊</span> Current Status
          </p>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(state).map(([key, value]) => (
              <div key={key} className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                <p className="text-xs text-gray-600 font-semibold mb-1 capitalize">
                  {key === "is_powered" ? "⚡ Power" : key === "speed" ? "🌀 Speed" : key === "brightness" ? "💡 Brightness" : key === "timer" ? "⏱️ Timer" : key.replace(/_/g, " ")}
                </p>
                <p className="text-sm font-bold text-gray-900">
                  {key === "is_powered" ? (value ? "🟢 ON" : "🔴 OFF") : key === "speed" ? `Level ${value}` : key === "brightness" ? `${value}%` : key === "timer" ? (value ? `${value}m` : "Off") : value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Comprehensive Control Panel */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span>🎮</span> Device Controls
            </h2>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing || isLoadingCommand}
              className="text-xs px-3 py-1.5 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 disabled:opacity-50 font-semibold transition-all"
              title="Refresh device state"
            >
              {isRefreshing ? "Refreshing..." : "Refresh"}
            </button>
          </div>

          {/* Power Control Card */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-700 mb-1">⚡ Power</p>
                <p className="text-xs text-gray-600">Toggle power on/off</p>
                <p className="text-xs mt-2 font-mono text-gray-500">
                  Current: <span className={state.is_powered ? "text-green-600 font-bold" : "text-red-600 font-bold"}>{state.is_powered ? "ON" : "OFF"}</span>
                </p>
              </div>
              <button
                onClick={() => {
                  const newValue = state.is_powered ? 0 : 1;
                  console.log(`🔌 Toggle button clicked - Current: ${state.is_powered}, Sending: ${newValue}`);
                  handleCommand("is_powered", newValue);
                }}
                disabled={!device.is_online || isLoadingCommand}
                className={`relative inline-flex h-10 w-16 items-center rounded-full transition-all duration-300 font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed ${
                  state.is_powered
                    ? "bg-green-600 shadow-lg shadow-green-200"
                    : "bg-gray-400 shadow-lg shadow-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-8 w-8 transform rounded-full bg-white transition-transform duration-300 ${
                    state.is_powered ? "translate-x-8" : "translate-x-1"
                  }`}
                />
                <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                  {state.is_powered ? "ON" : "OFF"}
                </span>
              </button>
            </div>
          </div>

          {/* Speed Control Card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-300">
            <p className="text-sm font-bold text-gray-700 mb-4">🌀 Speed Level</p>
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((speed) => (
                <button
                  key={speed}
                  onClick={() => handleCommand("speed", speed)}
                  disabled={!device.is_online || isLoadingCommand}
                  className={`py-3 rounded-xl font-bold text-sm transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                    state.speed === speed
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105"
                      : "bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-500 hover:shadow-md"
                  }`}
                >
                  {speed}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-600 mt-3 text-center">Current: Level {typeof state.speed === "number" ? state.speed : 0}</p>
          </div>

          {/* Brightness Control Card */}
          {state.brightness !== undefined && (
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border-2 border-yellow-300">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-bold text-gray-700">💡 Brightness</p>
                <span className="text-lg font-bold text-orange-600">{typeof state.brightness === "number" ? state.brightness : 0}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={typeof state.brightness === "number" ? state.brightness : 0}
                onChange={(e) => handleCommand("brightness", parseInt(e.target.value))}
                disabled={!device.is_online || isLoadingCommand}
                className="w-full h-3 bg-gradient-to-r from-gray-300 to-yellow-400 rounded-lg appearance-none cursor-pointer accent-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <div className="flex justify-between mt-2 text-xs text-gray-600">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t-2 border-gray-200">
            <button
              onClick={() => handleCommand("timer", 30)}
              disabled={!device.is_online || isLoadingCommand}
              className="py-3 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-sm hover:from-orange-600 hover:to-red-600 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-md hover:shadow-lg"
            >
              <span>⏱️ Sleep 30m</span>
            </button>
            <button
              onClick={() => handleCommand("is_powered", 0)}
              disabled={!device.is_online || isLoadingCommand || !state.is_powered}
              className="py-3 px-4 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold text-sm hover:from-red-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-md hover:shadow-lg"
            >
              <span>⚡ Turn Off</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
