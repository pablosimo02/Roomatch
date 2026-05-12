import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Clock, Sparkles, Trash2, Heart } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CompatibilityBarProps {
  score: number;
  breakdown: { [key: string]: number };
}

export default function CompatibilityBar({ score, breakdown }: CompatibilityBarProps) {
  return (
    <div className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium text-text-muted">Compatibilidad Global</span>
        <span className="text-2xl font-bold font-clash text-primary">{score}%</span>
      </div>

      <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden mb-6">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          className="h-full bg-gradient-to-r from-primary to-accent"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {Object.entries(breakdown).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5">
            <span className="text-[10px] uppercase font-semibold text-text-muted">{key}</span>
            <span className="text-xs font-bold">{value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
