"use client";
import React, { useRef, useEffect, useState } from "react";
import { Maximize2, Minimize2 } from "lucide-react";

export default function LookerDashboardPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        if (containerRef.current) {
          await containerRef.current.requestFullscreen();
        }
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error("Fullscreen error:", err);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-50 bg-bg-dark transition-all duration-[800ms] ease-out ${
        loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
    >
      {/* Header bar */}
      <div
        className={`absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-3 bg-gradient-to-b from-bg-dark/90 to-transparent transition-opacity duration-700 ${
          isFullscreen ? "opacity-0 hover:opacity-100" : "opacity-100"
        }`}
      >
        <div>
          <h1 className="text-xl font-bold font-clash bg-gradient-to-r from-primary via-accent to-accent-warm bg-clip-text text-transparent">
            Dashboard Looker Studio
          </h1>
          <p className="text-xs text-text-muted">
            Datos actualizados automáticamente en tiempo real
          </p>
        </div>
        <button
          onClick={toggleFullscreen}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium hover:bg-white/20 hover:scale-105 transition-all duration-200"
        >
          {isFullscreen ? (
            <>
              <Minimize2 className="w-4 h-4" />
              Salir
            </>
          ) : (
            <>
              <Maximize2 className="w-4 h-4" />
              Pantalla completa
            </>
          )}
        </button>
      </div>

      {/* Full screen iframe */}
      <iframe
        ref={iframeRef}
        className="w-full h-full border-0"
        style={{ width: "100%", height: "100vh", border: 0 }}
        src="https://datastudio.google.com/embed/reporting/e0233868-e714-4020-aaa5-6eead7d376c2/page/HRHyF"
        frameBorder="0"
        allowFullScreen
        sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms allow-downloads"
      />
    </div>
  );
}
