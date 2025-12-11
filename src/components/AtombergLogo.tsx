"use client";

import React, { useState } from "react";

interface AtombergLogoProps {
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onClick?: () => void;
}

export function AtombergLogo({
  size = "md",
  interactive = false,
  onClick,
}: AtombergLogoProps) {
  const [isSpinning, setIsSpinning] = useState(false);

  const sizeMap = {
    sm: "w-12 h-12",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  const handleClick = () => {
    if (interactive) {
      setIsSpinning(true);
      onClick?.();
      setTimeout(() => setIsSpinning(false), 1000);
    }
  };

  return (
    <div
      className={`${sizeMap[size]} cursor-pointer transition-transform duration-300 ${
        isSpinning ? "animate-spin" : ""
      } ${interactive ? "hover:scale-110" : ""}`}
      onClick={handleClick}
      title={interactive ? "Click to spin!" : ""}
    >
      <svg
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Background */}
        <rect width="512" height="512" fill="#FFC107" />

        {/* Fan Blades - Top Blade */}
        <path
          d="M240 80 Q320 60 360 140 Q340 120 280 110 Z"
          fill="#1F2937"
          className={interactive ? "transition-all duration-300" : ""}
        />

        {/* Fan Blades - Left Blade */}
        <path
          d="M80 200 Q60 280 140 340 Q120 300 130 240 Z"
          fill="#1F2937"
          className={interactive ? "transition-all duration-300" : ""}
        />

        {/* Fan Blades - Bottom Blade */}
        <path
          d="M240 380 Q160 400 120 320 Q160 360 220 370 Z"
          fill="#1F2937"
          className={interactive ? "transition-all duration-300" : ""}
        />

        {/* Main Circle - Yellow Ring */}
        <circle cx="256" cy="256" r="120" fill="#FFC107" stroke="#1F2937" strokeWidth="20" />

        {/* Center Circle - Dark */}
        <circle cx="256" cy="256" r="30" fill="#1F2937" />

        {/* Top curved blade */}
        <path
          d="M 200 100 Q 180 140 200 180 Q 240 160 260 120 Q 240 110 200 100 Z"
          fill="#1F2937"
        />

        {/* Right curved blade */}
        <path
          d="M 380 200 Q 400 240 380 280 Q 340 260 320 220 Q 350 200 380 200 Z"
          fill="#1F2937"
        />

        {/* Bottom curved blade */}
        <path
          d="M 310 380 Q 330 340 310 300 Q 270 320 250 360 Q 280 390 310 380 Z"
          fill="#1F2937"
        />

        {/* Left curved blade */}
        <path
          d="M 120 300 Q 100 260 120 220 Q 160 240 180 280 Q 150 300 120 300 Z"
          fill="#1F2937"
        />

        {/* Center Decorative Element */}
        <circle cx="256" cy="256" r="20" fill="#FFC107" />
        <circle cx="256" cy="256" r="10" fill="#1F2937" />
      </svg>
    </div>
  );
}
