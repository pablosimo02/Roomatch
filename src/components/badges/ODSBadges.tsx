"use client";
import React from "react";
import { motion } from "framer-motion";

const ODS_DATA = [
  {
    id: 11,
    title: "Ciudades y Comunidades Sostenibles",
    color: "#FD6925",
    icon: "🏙️",
    description: "Hacemos que encontrar vivienda sostenible en Valencia sea fácil y accesible.",
  },
  {
    id: 12,
    title: "Producción y Consumo Responsables",
    color: "#BF8B2E",
    icon: "♻️",
    description: "Promovemos el compartir piso como forma de consumo responsable de recursos.",
  },
  {
    id: 13,
    title: "Acción por el Clima",
    color: "#3F7E44",
    icon: "🌍",
    description: "Cada eco-score impulsa decisiones de vivienda más sostenibles para el planeta.",
  },
];

export function ODSBadge({ id, title, color, icon, size = "md" }: { id: number; title: string; color: string; icon: string; size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: "w-10 h-10 text-xs", md: "w-14 h-14 text-sm", lg: "w-20 h-20 text-lg" };

  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: 5 }}
      className="relative group cursor-pointer"
    >
      <div
        className={`${sizes[size]} rounded-xl flex items-center justify-center font-bold text-white shadow-lg`}
        style={{ backgroundColor: color }}
      >
        {size === "lg" ? icon : id}
      </div>
      <div className="absolute inset-0 rounded-xl bg-white/0 group-hover:bg-white/10 transition-colors" />
      {size !== "sm" && (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-xs text-text-muted bg-bg-card px-2 py-1 rounded-lg border border-white/10 pointer-events-none z-10">
          ODS {id}: {title.split(" ")[0]}
        </div>
      )}
    </motion.div>
  );
}

export function ODSRow({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {ODS_DATA.map(ods => (
        <ODSBadge key={ods.id} {...ods} />
      ))}
    </div>
  );
}

export function ODSCard({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 ${className}`}>
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <span className="text-xl">🎯</span>
        Objetivos de Desarrollo Sostenible
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ODS_DATA.map(ods => (
          <motion.div
            key={ods.id}
            whileHover={{ y: -4 }}
            className="rounded-xl p-4 border border-white/10 hover:border-white/20 transition-colors"
            style={{ background: `linear-gradient(135deg, ${ods.color}20, transparent)` }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg" style={{ backgroundColor: ods.color }}>
                {ods.icon}
              </div>
              <div>
                <span className="text-xs text-text-muted">ODS {ods.id}</span>
                <h4 className="text-sm font-semibold">{ods.title}</h4>
              </div>
            </div>
            <p className="text-xs text-text-muted">{ods.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
