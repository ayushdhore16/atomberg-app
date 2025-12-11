"use client";

import React, { useState } from "react";
import { Button } from "./Button";
import { useAppContext } from "@/lib/context";
import { Device } from "@/lib/api";
import { removeMockFan } from "@/lib/mockData";

interface DeleteFanModalProps {
  isOpen: boolean;
  device: Device | null;
  onClose: () => void;
  onFanDeleted: () => void;
}

export function DeleteFanModal({ isOpen, device, onClose, onFanDeleted }: DeleteFanModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { refetchDevices } = useAppContext();

  if (!isOpen || !device) return null;

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      // Remove the fan
      removeMockFan(device.device_id);
      
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 300));
      
      // Refresh devices in context
      await refetchDevices();
      
      // Close modal and trigger callback
      onClose();
      onFanDeleted();
    } catch (err) {
      console.error("Failed to delete fan:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Modal Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 transition-opacity duration-300"
        onClick={onClose}
      >
        {/* Modal Content */}
        <div
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 transform transition-all duration-300 animate-fade-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className="text-2xl">⚠️</span> Delete Fan
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors p-1"
              disabled={isLoading}
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Warning Message */}
          <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 mb-6">
            <p className="text-sm text-red-700 font-semibold">
              ⚠️ <strong>Warning:</strong> This action cannot be undone!
            </p>
          </div>

          {/* Device Info */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-4 mb-6 border border-gray-200">
            <p className="text-xs text-gray-600 font-semibold mb-3">Device to Delete:</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-300">
                <span className="text-2xl">
                  {device.device_type === "ceiling_fan" ? "🎪" : "🪑"}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">
                    {device.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    ID: {device.device_id}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Confirmation Text */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
            <p className="text-xs text-yellow-800 font-medium">
              💡 Are you sure you want to delete <strong>{device.name}</strong>?
              It will be permanently removed from your device list.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1"
            >
              Keep It
            </Button>
            <Button
              variant="primary"
              onClick={handleDelete}
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Deleting...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span>🗑️</span> Delete Fan
                </span>
              )}
            </Button>
          </div>

          {/* Info */}
          <p className="text-xs text-gray-500 text-center mt-4">
            💡 To add it back, use the &quot;➕ Add Fan&quot; button
          </p>
        </div>
      </div>
    </>
  );
}
