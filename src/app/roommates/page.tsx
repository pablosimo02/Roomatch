"use client";
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Star, MapPin, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { MOCK_ROOMMATES } from '@/lib/mock/roommates';

export default function RoommatesPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);

  const currentUser = MOCK_ROOMMATES[currentIndex];
  const remaining = MOCK_ROOMMATES.length - currentIndex;

  const swipe = useCallback((dir: 'left' | 'right') => {
    if (!currentUser) return;
    setDirection(dir);

    setTimeout(() => {
      setDirection(null);
      if (dir === 'right') {
        router.push(`/chat/${currentUser.id}?greeting=¡Hemos hecho match! ¿Quieres que hablemos sobre compartir piso?`);
        return;
      }
      setCurrentIndex(prev => prev + 1);
    }, 300);
  }, [currentUser, router]);

  if (!currentUser || remaining <= 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6">
        <div className="p-8 rounded-full bg-white/5"><Heart className="w-20 h-20 text-primary" /></div>
        <h2 className="text-3xl font-bold font-clash">¡Sin más candidatos!</h2>
        <p className="text-text-muted max-w-md">Has visto a todos los compañeros disponibles.</p>
        <button onClick={() => setCurrentIndex(0)} className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-all">Reiniciar</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-8 max-w-lg mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-clash">Compañeros</h1>
        <p className="text-text-muted">{remaining} candidatos restantes</p>
      </div>

      <div className="relative w-full aspect-[4/5]">
        <AnimatePresence>
          <motion.div
            key={currentUser.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ x: direction === 'right' ? 500 : -500, opacity: 0, rotate: direction === 'right' ? 20 : -20, transition: { duration: 0.3 } }}
            className="absolute inset-0 rounded-3xl overflow-hidden bg-white/5 border border-white/10"
          >
            <img src={currentUser.avatar || 'https://picsum.photos/seed/fallback/800/600'} alt={currentUser.name} className="w-full h-3/5 object-cover" />
            <div className="p-6 flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold">{currentUser.name}</h2>
                  <div className="flex items-center gap-1 text-sm text-text-muted">
                    <MapPin className="w-3 h-3 text-primary" />
                    <span>{currentUser.university}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-accent">
                  <Star className="w-4 h-4 fill-accent" />
                  <span className="font-bold">{currentUser.compatibilityScore}%</span>
                </div>
              </div>
              <p className="text-sm text-text-muted">{currentUser.bio}</p>
              <div className="flex flex-wrap gap-1.5">
                {currentUser.interests?.map(i => (
                  <span key={i} className="px-2 py-0.5 rounded-full bg-white/10 text-xs text-text-muted">{i}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-6">
        <button onClick={() => swipe('left')} className="p-5 rounded-full bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 transition-all">
          <X className="w-8 h-8 text-red-500" />
        </button>
        <button onClick={() => swipe('right')} className="p-5 rounded-full bg-accent/20 border border-accent/30 hover:bg-accent/30 transition-all">
          <Heart className="w-8 h-8 text-accent" />
        </button>
      </div>
    </div>
  );
}
