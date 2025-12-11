"use client";

import React, { useState } from "react";
import { Button } from "./Button";
import { AtombergLogo } from "./AtombergLogo";
import { useAppContext } from "@/lib/context";
import { Device } from "@/lib/api";
import { FanControl } from "./FanControl";
import { AddFanModal } from "./AddFanModal";
import { DeleteFanModal } from "./DeleteFanModal";

export function Dashboard() {
  const { devices, logout, selectedDevice, setSelectedDevice, deviceStates } =
    useAppContext();
  const [isAddFanModalOpen, setIsAddFanModalOpen] = useState(false);
  const [isDeleteFanModalOpen, setIsDeleteFanModalOpen] = useState(false);
  const [fanToDelete, setFanToDelete] = useState<Device | null>(null);

  // Count how many fans are currently running
  const runningFans = devices.filter((d) => {
    const state = deviceStates[d.device_id];
    return state?.is_powered === true;
  }).length;

  // When user clicks on a device to control it
  if (selectedDevice) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button
                variant="secondary"
                onClick={() => setSelectedDevice(null)}
                className="rounded-full p-2 w-10 h-10 flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </Button>
              <h1 className="text-3xl font-bold text-gray-900">
                Controlling: {selectedDevice.name}
              </h1>
            </div>
            <Button variant="secondary" onClick={logout} size="sm">
              Logout
            </Button>
          </div>

          <FanControl device={selectedDevice} />
        </div>
      </div>
    );
  }

  // Main dashboard view - list of all fans
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8">
      {/* Subtle background effects */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>

      <div className="relative max-w-6xl mx-auto">
        {/* Top section with logo and header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div className="animate-fade-in flex items-center gap-4">
            <AtombergLogo size="sm" interactive={true} />
            <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg
                  className="w-6 h-6 text-white"
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
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Your Smart Fans
              </h1>
            </div>
            <p className="text-gray-600 ml-15 md:ml-0">
              🎚️ Manage and control all your Atomberg smart fans in one place
            </p>
            </div>
          </div>
          <Button variant="secondary" onClick={logout} size="sm" className="mt-2 md:mt-0">
            🚪 Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg p-6 border border-blue-200 hover:shadow-xl transition-shadow duration-300 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">📊 Total Fans</p>
                <p className="text-4xl font-bold text-blue-600 mt-3">
                  {devices.length}
                </p>
                <p className="text-xs text-gray-500 mt-2">Devices in your account</p>
              </div>
              <div className="bg-blue-100 rounded-2xl p-5 shadow-md">
                <svg
                  className="w-10 h-10 text-blue-600"
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
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl shadow-lg p-6 border border-green-200 hover:shadow-xl transition-shadow duration-300 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">🟢 Online Devices</p>
                <p className="text-4xl font-bold text-green-600 mt-3">
                  {devices.filter((d) => d.is_online).length}
                </p>
                <p className="text-xs text-gray-500 mt-2">Ready to control</p>
              </div>
              <div className="bg-green-100 rounded-2xl p-5 shadow-md">
                <svg
                  className="w-10 h-10 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-orange-50 rounded-2xl shadow-lg p-6 border border-orange-200 hover:shadow-xl transition-shadow duration-300 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">⚡ Fans Running</p>
                <p className="text-4xl font-bold text-orange-600 mt-3">
                  {runningFans}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  {runningFans > 0 ? "Currently powered on" : "All fans off"}
                </p>
              </div>
              <div className="bg-orange-100 rounded-2xl p-5 shadow-md animate-bounce">
                <svg
                  className="w-10 h-10 text-orange-600"
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
              </div>
            </div>
          </div>
        </div>

        {/* Section Title */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <span>⚙️</span> Your Devices
            </h2>
            <p className="text-sm text-gray-600 mt-1">Click on any device to control it</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              onClick={() => setIsAddFanModalOpen(true)}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 font-semibold px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
            >
              <span>➕</span> Add Fan
            </Button>
            {devices.length > 0 && (
              <Button
                variant="secondary"
                onClick={() => {
                  if (devices.length > 0) {
                    setFanToDelete(devices[0]);
                    setIsDeleteFanModalOpen(true);
                  }
                }}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
              >
                <span>🗑️</span> Delete Fan
              </Button>
            )}
          </div>
        </div>

        {/* Devices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {devices.map((device: Device) => (
            <div
              key={device.device_id}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:border-blue-300 group"
              onClick={() => setSelectedDevice(device)}
            >
              {/* Device Card Header */}
              <div className={`bg-gradient-to-r ${
                device.is_online
                  ? "from-blue-500 to-blue-600"
                  : "from-gray-400 to-gray-500"
              } px-6 py-5 text-white`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2">{device.name}</h3>
                    <div className="flex items-center gap-2 text-sm bg-white bg-opacity-20 w-fit px-3 py-1 rounded-full font-medium">
                      <span
                        className={`w-2.5 h-2.5 rounded-full animate-pulse ${
                          device.is_online ? "bg-green-300" : "bg-red-300"
                        }`}
                      ></span>
                      <span>{device.is_online ? "🟢 Online" : "🔴 Offline"}</span>
                    </div>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-xl p-3 group-hover:bg-opacity-30 transition-all duration-300">
                    <svg
                      className="w-6 h-6 transform group-hover:scale-110 transition-transform duration-300"
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
                  </div>
                </div>
              </div>

              {/* Device Card Body */}
              <div className="p-6 space-y-4">
                {/* Power Status */}
                <div className={`flex items-center justify-between p-4 rounded-lg border-2 font-semibold ${
                  deviceStates[device.device_id]?.is_powered === true
                    ? "bg-green-50 border-green-300 text-green-700"
                    : "bg-gray-50 border-gray-300 text-gray-700"
                }`}>
                  <span className="flex items-center gap-2">
                    {deviceStates[device.device_id]?.is_powered === true ? (
                      <>🟢 ON</>
                    ) : (
                      <>⚫ OFF</>
                    )}
                  </span>
                  <span className="text-sm">Power Status</span>
                </div>

                {/* Device Type */}
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                  <span className="text-xs text-gray-600 font-semibold">📦 Type</span>
                  <span className="text-sm font-semibold text-gray-900 capitalize">
                    {device.device_type === "ceiling_fan" ? "🎪 Ceiling" : "🪑 Table"}
                  </span>
                </div>

                {/* Device ID */}
                <div>
                  <p className="text-xs text-gray-600 font-semibold mb-2">🆔 Device ID</p>
                  <p className="text-xs font-mono text-gray-700 bg-gray-100 p-3 rounded-lg border border-gray-300 break-all hover:bg-gray-200 transition-colors cursor-pointer">
                    {device.device_id}
                  </p>
                </div>

                {/* Control Button */}
                <Button
                  variant="primary"
                  className="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 font-semibold py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedDevice(device);
                  }}
                  disabled={!device.is_online}
                >
                  {device.is_online ? "⚡ Control Fan" : "🔌 Offline"}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {devices.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white rounded-lg shadow-lg p-12 max-w-md mx-auto border border-gray-200">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No Fans Found
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Add a fan to your Atomberg account to get started
              </p>
              <Button variant="outline" onClick={logout}>
                Try Different Credentials
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Add Fan Modal */}
      <AddFanModal
        isOpen={isAddFanModalOpen}
        onClose={() => setIsAddFanModalOpen(false)}
        onFanAdded={() => {
          // Modal will refetch devices, so just close it
        }}
      />

      {/* Delete Fan Modal */}
      <DeleteFanModal
        isOpen={isDeleteFanModalOpen}
        device={fanToDelete}
        onClose={() => {
          setIsDeleteFanModalOpen(false);
          setFanToDelete(null);
        }}
        onFanDeleted={() => {
          setFanToDelete(null);
        }}
      />
    </div>
  );
}
