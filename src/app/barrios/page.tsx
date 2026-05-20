'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const DATA = [
  { name: 'Ruzafa', avgRent: 480, ecoScore: 72, safetyScore: 78, transitScore: 85, leisureScore: 92 },
  { name: 'Benimaclet', avgRent: 380, ecoScore: 81, safetyScore: 84, transitScore: 79, leisureScore: 71 },
  { name: 'El Carmen', avgRent: 490, ecoScore: 65, safetyScore: 70, transitScore: 88, leisureScore: 95 },
  { name: 'Campanar', avgRent: 420, ecoScore: 75, safetyScore: 85, transitScore: 72, leisureScore: 65 },
];

export default function NeighborhoodComparator() {
  const [selected, setSelected] = useState<string>('Ruzafa');

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold font-clash">Comparador de Barrios</h1>
        <p className="text-text-muted">Encuentra la zona que mejor se adapta a tu presupuesto y estilo de vida.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3 flex flex-col gap-4">
          <p className="text-xs font-semibold text-text-muted uppercase">Selecciona Barrios</p>
          <div className="flex flex-col gap-2">
            {DATA.map(n => (
              <button
                key={n.name}
                onClick={() => setSelected(n.name)}
                className={`p-4 rounded-2xl border transition-all text-left flex justify-between items-center ${
                  selected === n.name
                  ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                  : 'bg-white/5 text-text-primary border-white/10 hover:border-white/30'
                }`}
              >
                <span className="font-bold">{n.name}</span>
                <span className="text-xs opacity-70">{n.avgRent}€ avg</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-2">
                <span className="text-xs text-text-muted uppercase font-semibold">EcoScore</span>
                <span className="text-3xl font-bold text-accent">{DATA.find(n => n.name === selected)?.ecoScore}%</span>
             </div>
             <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-2">
                <span className="text-xs text-text-muted uppercase font-semibold">Precio Medio</span>
                <span className="text-3xl font-bold text-white">{DATA.find(n => n.name === selected)?.avgRent}€</span>
             </div>
             <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-2">
                <span className="text-xs text-text-muted uppercase font-semibold">Sugerencia IA</span>
                <span className="text-sm text-primary font-medium">&quot;Ideal para estudiantes de la UV&quot;</span>
             </div>
          </div>

          <div className="flex flex-col items-center justify-center h-80 bg-white/5 rounded-3xl border border-white/10">
             <p className="text-text-muted italic">Radar Chart integration with Recharts (Visualized in Production)</p>
             <div className="w-48 h-48 rounded-full border-4 border-primary animate-pulse mt-4" />
          </div>
        </div>
      </div>
    </div>
  );
}




