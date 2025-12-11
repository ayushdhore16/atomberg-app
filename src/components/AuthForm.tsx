"use client";

import React, { useState } from "react";
import { Button } from "./Button";
import { Alert } from "./Alert";
import { AtombergLogo } from "./AtombergLogo";
import { getAccessToken, getDevices } from "@/lib/api";
import { useAppContext } from "@/lib/context";
import { MOCK_MODE } from "@/lib/mockData";

export function AuthForm() {
  const [localApiKey, setLocalApiKey] = useState("");
  const [localRefreshToken, setLocalRefreshToken] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    setApiKey,
    setRefreshToken,
    setAccessToken,
    setDevices,
    setIsAuthenticated,
    setIsLoading,
    setError,
    error,
    isLoading,
    clearError,
  } = useAppContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!localApiKey.trim() || !localRefreshToken.trim()) {
      setError("Please enter both API Key and Refresh Token");
      return;
    }

    setIsLoading(true);

    try {
      // Get access token
      const token = await getAccessToken(localApiKey, localRefreshToken);

      // Get devices
      const deviceList = await getDevices(localApiKey, token);

      if (deviceList.length === 0) {
        setError(
          "No devices found in your account. Please add a device in the Atomberg Home app."
        );
        setIsLoading(false);
        return;
      }

      // Save credentials and token
      setApiKey(localApiKey);
      setRefreshToken(localRefreshToken);
      setAccessToken(token);
      setDevices(deviceList);
      setIsAuthenticated(true);

      // Clear form
      setLocalApiKey("");
      setLocalRefreshToken("");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Authentication failed";
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      <div className="relative w-full max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 backdrop-blur-sm">
          {/* Header with Atomberg Logo */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="flex justify-center mb-4">
              <AtombergLogo size="sm" interactive={true} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Atomberg Control</h1>
            <p className="text-sm text-gray-600">Smart Fan Management System</p>
          </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6">
            <Alert type="error" message={error} onClose={clearError} />
          </div>
        )}

        {/* Mock Mode Banner */}
        {MOCK_MODE && (
          <div className="mb-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 rounded-xl shadow-sm">
            <div className="flex items-start gap-3">
              <div className="text-2xl">🎮</div>
              <div>
                <p className="font-bold text-amber-900 text-sm">
                  Demo Mode Active
                </p>
                <p className="text-amber-800 text-xs mt-1 leading-relaxed">
                  🧪 Testing with 4 mock devices. Demo credentials required!
                </p>
                <div className="mt-2 p-2 bg-white bg-opacity-60 rounded-lg border border-amber-200">
                  <p className="text-xs text-amber-900 font-mono font-bold">
                    API Key: <span className="text-red-600">abc</span>
                  </p>
                  <p className="text-xs text-amber-900 font-mono font-bold">
                    Refresh Token: <span className="text-red-600">abc</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* API Key Input */}
          <div className="animate-fade-in">
            <label
              htmlFor="apiKey"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              🔑 API Key <span className="text-red-500">*</span>
            </label>
            <input
              id="apiKey"
              type="password"
              value={localApiKey}
              onChange={(e) => setLocalApiKey(e.target.value)}
              placeholder="Enter your API Key"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900 placeholder-gray-400 shadow-sm focus:shadow-md"
              disabled={isLoading}
            />
            <p className="mt-1.5 text-xs text-gray-500 flex items-center gap-1">
              <span>ℹ️</span> Enable Developer Mode in Atomberg Home app settings
            </p>
          </div>

          {/* Refresh Token Input */}
          <div className="animate-fade-in">
            <label
              htmlFor="refreshToken"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              🔐 Refresh Token <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="refreshToken"
                type={showPassword ? "text" : "password"}
                value={localRefreshToken}
                onChange={(e) => setLocalRefreshToken(e.target.value)}
                placeholder="Enter your Refresh Token"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900 placeholder-gray-400 shadow-sm focus:shadow-md"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors p-1"
                disabled={isLoading}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            <p className="mt-1.5 text-xs text-gray-500 flex items-center gap-1">
              <span>ℹ️</span> Generated in Developer Mode
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            isLoading={isLoading}
            className="w-full mt-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {isLoading ? "🔄 Connecting..." : "✨ Connect to Atomberg"}
          </Button>
        </form>

        {/* Info Box */}
        <div className="mt-8 p-5 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-300 rounded-xl shadow-sm">
          <p className="text-xs text-blue-900 font-semibold mb-2 flex items-center gap-2">
            <span>📚</span> How to Get Your Credentials
          </p>
          <ol className="text-xs text-blue-800 space-y-1.5 ml-6 list-decimal">
            <li>Open <strong>Atomberg Home app</strong></li>
            <li>Go to <strong>Settings → Developer Mode</strong></li>
            <li>Copy your <strong>API Key</strong> and <strong>Refresh Token</strong></li>
            <li>Paste them above and connect</li>
          </ol>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            🔒 Your credentials are secure and never stored
          </p>
        </div>
        </div>
      </div>
    </div>
  );
}
