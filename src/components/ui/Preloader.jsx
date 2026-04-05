"use client";

import { useEffect, useState } from "react";
import config from "@/config";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const handleFinishLoading = () => {
      // Small buffer to allow the final paint to settle
      const timer = setTimeout(() => {
        setIsFadingOut(true);
        const removeTimer = setTimeout(() => {
          setLoading(false);
        }, 300); // Optimized fade-out duration
        return () => clearTimeout(removeTimer);
      }, 100); 
      return () => clearTimeout(timer);
    };

    // Prevent scrolling while preloader is active
    document.body.style.overflow = "hidden";
    
    // Check if document is already loaded (SSR/Hydration case)
    if (document.readyState === "complete") {
      handleFinishLoading();
    } else {
      window.addEventListener("load", handleFinishLoading);
      
      const safetyTimer = setTimeout(handleFinishLoading, 2000);
      
      return () => {
        window.removeEventListener("load", handleFinishLoading);
        clearTimeout(safetyTimer);
        document.body.style.overflow = "unset";
      };
    }
  }, []);

  if (!loading) return null;

  return (
    <div className={`preloader-bg ${isFadingOut ? "animate-preloader-fade-out" : ""} transition-opacity will-change-[opacity]`}>
      {/* Brand Logo Icon with entrance then exit animation */}
      <div className={`flex flex-col items-center mb-12 will-change-transform ${isFadingOut ? "animate-logo-pop-out" : "animate-logo-pop"}`}>
        <div className="w-22 h-22 bg-primary rounded-full flex items-center justify-center shadow-lg">
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
        <div className="absolute top-0 left-0 h-full w-1/2 bg-primary rounded-full animate-progress-sweep will-change-transform">
        </div>
      </div>
    </div>
  );
}
