"use client";
import React, { useRef, useEffect, useState } from "react";
import { Maximize2, Minimize2, Database, Globe, TrendingUp, Users } from "lucide-react";
import { motion } from "framer-motion";

type KPICardProps = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  color: string;
};

function KPICard({ icon: Icon, label, value, color }: KPICardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-1 rounded-xl bg-white border border-gray-100 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
    >
      <div className="flex items-center gap-2 mb-1">
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
        <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">{label}</span>
      </div>
      <span className="text-2xl font-bold font-clash text-[#1A1A2E]">{value}</span>
    </motion.div>
  );
}

export default function LookerDashboardPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  const lookerUrl = "https://lookerstudio.google.com/embed/reporting/e0233868-e714-4020-aaa5-6eead7d376c2/page/HRHyF?rm=minimal";

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
      className={`min-h-screen bg-[#F7F8FC] transition-all duration-[800ms] ease-out ${
        loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
    >
      <div className="p-6 md:p-8 lg:p-12 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold font-clash text-[#1A1A2E]">
              Dashboard Looker Studio
            </h1>
            <p className="text-sm text-[#6B7280] mt-1">
              Datos actualizados automáticamente en tiempo real
            </p>
          </div>
          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-[#6B7280] text-sm font-medium hover:border-primary hover:text-primary transition-all"
          >
            {isFullscreen ? (
              <><Minimize2 className="w-4 h-4" /> Salir</>
            ) : (
              <><Maximize2 className="w-4 h-4" /> Pantalla completa</>
            )}
          </button>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <KPICard icon={TrendingUp} label="Precio Medio" value="450€" color="bg-primary" />
          <KPICard icon={Users} label="Usuarios Activos" value="1,240" color="bg-info" />
          <KPICard icon={Database} label="Listings" value="36" color="bg-accent" />
          <KPICard icon={Globe} label="Barrios" value="6" color="bg-accent-warm" />
        </div>

        {/* Embedded Looker Iframe */}
        <div className="rounded-2xl bg-white border border-gray-100 shadow-[0_2px_16px_rgba(0,0,0,0.08)] overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[#1A1A2E]">Visualización de datos</h3>
            <span className="text-xs text-[#6B7280]">Fuente: Looker Studio</span>
          </div>
          <div className="relative" style={{ minHeight: "70vh" }}>
            {!iframeLoaded && !iframeError ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50 text-sm text-[#6B7280]">
                Cargando visualizaciones...
              </div>
            ) : null}
            {iframeError ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gray-50 p-6 text-center">
                <p className="text-sm text-[#6B7280]">No se pudo cargar el dashboard embebido.</p>
                <a
                  href={lookerUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white hover:opacity-90"
                >
                  Abrir dashboard en nueva pestaña
                </a>
              </div>
            ) : null}
            <iframe
              ref={iframeRef}
              className="w-full border-0"
              style={{ width: "100%", height: "70vh", border: 0 }}
              src={lookerUrl}
              frameBorder="0"
              allowFullScreen
              onLoad={() => setIframeLoaded(true)}
              onError={() => {
                setIframeError(true);
                setIframeLoaded(false);
              }}
            />
          </div>
          <div className="px-5 py-3 border-t border-gray-100 bg-gray-50">
            <p className="text-xs text-[#6B7280]">
              Leyenda: Los gráficos muestran la evolución de precios, demanda por barrio, distribución de EcoScore y métricas de sostenibilidad del mercado de alquiler universitario en Valencia.
            </p>
          </div>
        </div>

        {/* Fuentes de datos */}
        <div className="mt-8 rounded-2xl bg-white border border-gray-100 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
          <h3 className="text-lg font-bold font-clash text-[#1A1A2E] mb-4">Fuentes de datos</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <div className="p-2 rounded-lg bg-blue-100"><Database className="w-5 h-5 text-blue-600" /></div>
              <div>
                <p className="text-sm font-semibold text-[#1A1A2E]">INE</p>
                <p className="text-xs text-[#6B7280]">Instituto Nacional de Estadística - Datos de vivienda</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <div className="p-2 rounded-lg bg-purple-100"><Globe className="w-5 h-5 text-purple-600" /></div>
              <div>
                <p className="text-sm font-semibold text-[#1A1A2E]">Kaggle</p>
                <p className="text-xs text-[#6B7280]">Datasets abiertos de precios de alquiler</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <div className="p-2 rounded-lg bg-green-100"><TrendingUp className="w-5 h-5 text-green-600" /></div>
              <div>
                <p className="text-sm font-semibold text-[#1A1A2E]">Open Data Valencia</p>
                <p className="text-xs text-[#6B7280]">Datos abiertos del Ayuntamiento de Valencia</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
