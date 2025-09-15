"use client";

import { useState, useEffect } from "react";

/**
 * Hook to detect if the device supports hover interactions
 * Returns true for devices with hover capability (desktop with mouse)
 * Returns false for touch-only devices (mobile, tablets)
 */
export function useHoverSupport() {
  const [supportsHover, setSupportsHover] = useState(false);

  useEffect(() => {
    // Check if the device supports hover using CSS media queries
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    
    setSupportsHover(mediaQuery.matches);

    // Listen for changes (e.g., when connecting/disconnecting a mouse)
    const handleChange = (e: MediaQueryListEvent) => {
      setSupportsHover(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return supportsHover;
}