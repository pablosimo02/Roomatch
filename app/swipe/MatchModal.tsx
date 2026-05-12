import React from 'react';
import { motion } from 'framer-motion';
import { Heart, X } from 'lucide-react';

interface MatchModalProps {
  onClose: () => void;
}

export default function MatchModal({ onClose }: MatchModalProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-surface border border-white/10 rounded-3xl p-10 flex flex-col items-center gap-4 text-center max-w-sm mx-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
          <Heart className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-3xl font-bold font-clash">¡Es un Match!</h2>
        <p className="text-text-muted">Este piso te ha gustado. Contacta con el propietario ahora.</p>
        <button
          onClick={onClose}
          className="w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-all"
        >
          Enviar mensaje
        </button>
        <button onClick={onClose} className="text-text-muted hover:text-white transition-all flex items-center gap-1">
          <X className="w-4 h-4" /> Seguir explorando
        </button>
      </motion.div>
    </motion.div>
  );
}
