"use client";

import { useEffect, useState } from "react";
import config from "@/config";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Premium loading logic: Min 1.8s delay to ensure the animation is seen
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      // Wait for the fade-out animation to finish before removing from DOM
      const removeTimer = setTimeout(() => {
        setLoading(false);
      }, 600); // Matches the 0.6s animation duration in globals.css
      return () => clearTimeout(removeTimer);
    }, 600);

    // Prevent scrolling while loading
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, [loading]);

  if (!loading) return null;

  return (
    <div className={`preloader-bg ${isFadingOut ? "animate-preloader-fade-out" : ""}`}>
      {/* Brand Logo Icon with entrance then exit animation */}
      <div className={`flex flex-col items-center mb-12 ${isFadingOut ? "animate-logo-pop-out" : "animate-logo-pop"}`}>
        <div className="w-22 h-22 bg-linear-to-br from-accent to-primary rounded-full flex items-center justify-center shadow-xl shadow-accent/20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            {/* Heartbeat flow animation */}
            <path
              d="M22 12h-4l-3 9L9 3l-3 9H2"
              className="animate-heartbeat-draw"
            />
          </svg>
        </div>
      </div>

      {/* Progress Line Container (Compact & Bold) */}
      <div className="w-64 max-w-[85vw] h-[6px] bg-slate-100/90 rounded-full overflow-hidden relative shadow-inner">
        {/* Bidirectional Sweeping Segment (Matches Book Now Button) */}
        <div className="absolute top-0 left-0 h-full w-1/2 bg-primary rounded-full animate-progress-sweep shadow-[0_0_15px_rgba(10,58,92,0.25)]">
          {/* Subtle Shimmer for texture */}
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent w-full" />
        </div>
      </div>
    </div>
  );
}
