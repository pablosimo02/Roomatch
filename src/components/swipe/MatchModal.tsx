import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle } from 'lucide-react';

export default function MatchModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-2xl bg-black/80"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        className="relative max-w-sm w-full p-8 rounded-3xl bg-bg-card border border-primary/30 text-center shadow-[0_0_50px_rgba(99,102,241,0.3)]"
      >
        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
          <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center animate-bounce shadow-xl">
            <Heart className="w-10 h-10 text-white fill-current" />
          </div>
        </div>

        <h2 className="text-4xl font-bold font-clash mb-2">¡MATCH!</h2>
        <p className="text-text-muted mb-8">Has encontrado un lugar que encaja perfectamente contigo.</p>

        <div className="flex flex-col gap-3">
          <button className="w-full py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
            <MessageCircle className="w-5 h-5" />
            Chatear ahora
          </button>
          <button
            onClick={onClose}
            className="w-full py-3 text-text-muted hover:text-white transition-colors text-sm font-medium"
          >
            Quizás más tarde
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
