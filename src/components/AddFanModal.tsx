"use client";

import React, { useState } from "react";
import { Button } from "./Button";
import { useAppContext } from "@/lib/context";
import { addMockFan } from "@/lib/mockData";

interface AddFanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFanAdded: () => void;
}

export function AddFanModal({ isOpen, onClose, onFanAdded }: AddFanModalProps) {
  const [fanName, setFanName] = useState("");
  const [fanType, setFanType] = useState<"ceiling_fan" | "table_fan">("ceiling_fan");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { refetchDevices } = useAppContext();

  const handleAddFan = async () => {
    if (!fanName.trim()) {
      setError("Please enter a fan name");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Add the new fan
      addMockFan(fanName, fanType);
      
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 300));
      
      // Refresh devices in context
      await refetchDevices();
      
      // Reset form
      setFanName("");
      setFanType("ceiling_fan");
      
      // Close modal and trigger callback
      onClose();
      onFanAdded();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add fan");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && fanName.trim()) {
      handleAddFan();
    }
  };

  if (!isOpen) return null;

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
              <span className="text-2xl">➕</span> Add New Fan
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors p-1"
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

          {/* Form */}
          <div className="space-y-4 mb-6">
            {/* Fan Name Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Fan Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={fanName}
                onChange={(e) => {
                  setFanName(e.target.value);
                  setError("");
                }}
                onKeyPress={handleKeyPress}
                placeholder="e.g., Master Bedroom, Study Room..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors font-medium text-gray-900 placeholder-gray-500"
                disabled={isLoading}
              />
              <p className="text-xs text-gray-500 mt-1">Enter a descriptive name for your fan</p>
            </div>

            {/* Fan Type Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Fan Type <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setFanType("ceiling_fan")}
                  className={`p-3 rounded-lg border-2 transition-all font-semibold text-center ${
                    fanType === "ceiling_fan"
                      ? "border-blue-500 bg-blue-50 text-blue-700 shadow-md"
                      : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                  }`}
                  disabled={isLoading}
                >
                  <span className="text-xl">🎪</span>
                  <p className="text-sm">Ceiling Fan</p>
                </button>
                <button
                  onClick={() => setFanType("table_fan")}
                  className={`p-3 rounded-lg border-2 transition-all font-semibold text-center ${
                    fanType === "table_fan"
                      ? "border-blue-500 bg-blue-50 text-blue-700 shadow-md"
                      : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                  }`}
                  disabled={isLoading}
                >
                  <span className="text-xl">🪑</span>
                  <p className="text-sm">Table Fan</p>
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-300 rounded-lg p-3 text-sm text-red-700 font-semibold">
                ⚠️ {error}
              </div>
            )}
          </div>

          {/* Preview */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-6 border border-blue-200">
            <p className="text-xs text-gray-600 font-semibold mb-2">Preview:</p>
            <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-blue-100">
              <span className="text-2xl">{fanType === "ceiling_fan" ? "🎪" : "🪑"}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">
                  {fanName || "Your fan name..."}
                </p>
                <p className="text-xs text-gray-500">
                  {fanType === "ceiling_fan" ? "Ceiling Fan" : "Table Fan"}
                </p>
              </div>
              <span className="text-2xl">✨</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleAddFan}
              disabled={isLoading || !fanName.trim()}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Adding...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span>➕</span> Add Fan
                </span>
              )}
            </Button>
          </div>

          {/* Info */}
          <p className="text-xs text-gray-500 text-center mt-4">
            💡 New fans start in OFF state with all features ready to use
          </p>
        </div>
      </div>
    </>
  );
}
