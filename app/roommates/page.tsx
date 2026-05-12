"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Star } from 'lucide-react';
import RoommateCard from '@/components/matching/RoommateCard';
import CompatibilityBar from '@/components/matching/CompatibilityBar';
import MatchModal from '@/components/swipe/MatchModal';

const MOCK_ROOMMATES = [
  {
    id: 'u1',
    name: 'Pablo UV',
    university: 'Universidad de Valencia',
    bio: 'Buscando compañero tranquilo, me encanta programar y la sostenibilidad.',
    interests: ['TypeScript', 'Eco-living', 'Gaming'],
    avatar: 'https://images.unsplash.com/photo-1539571696312-3a504420d4b2',
    compatibilityScore: 92,
    compatibilityBreakdown: {
      budget: 95,
      schedule: 88,
      cleanliness: 90,
      studyHabits: 98,
      lifestyle: 85,
      interests: 90,
      ecoValues: 95,
    },
  },
  {
    id: 'u2',
    name: 'Sarah Erasmus',
    university: 'UPV',
    bio: 'Llego de Alemania para estudiar un año. Busco gente abierta y sociable.',
    interests: ['Art', 'Veganism', 'Hiking'],
    avatar: 'https://images.unsplash.com/photo-1494790108377-697920257a9a',
    compatibilityScore: 74,
    compatibilityBreakdown: {
      budget: 70,
      schedule: 60,
      cleanliness: 80,
      studyHabits: 70,
      lifestyle: 90,
      interests: 75,
      ecoValues: 85,
    },
  },
];

export default function RoommatesPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMatch, setIsMatch] = useState(false);

  const handleSwipe = (direction: string) => {
    if (direction === 'right' && Math.random() > 0.5) {
      setIsMatch(true);
    }
    setCurrentIndex(prev => prev + 1);
  };

  if (currentIndex >= MOCK_ROOMMATES.length) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center text-center gap-4">
        <h2 className="text-3xl font-bold font-clash">¡Sin más candidatos!</h2>
        <p className="text-text-muted max-w-xs">Has visto a todos los compañeros compatibles en Valencia por ahora.</p>
        <button
          onClick={() => setCurrentIndex(0)}
          className="px-6 py-2 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-all"
        >
          Reiniciar
        </button>
      </div>
    );
  }

  const user = MOCK_ROOMMATES[currentIndex];

  return (
    <div className="relative h-[85vh] flex flex-col items-center justify-center gap-8">
      <div className="relative w-full max-w-2xl flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full md:w-1/2 relative h-[500px]">
          <RoommateCard user={user} />
        </div>

        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <CompatibilityBar
            score={user.compatibilityScore}
            breakdown={user.compatibilityBreakdown}
          />

          <div className="flex justify-center gap-6 mt-4">
            <button
              onClick={() => handleSwipe('left')}
              className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-red-500 hover:bg-red-500/20 transition-all"
            >
              <X className="w-6 h-6" />
            </button>
            <button
              onClick={() => handleSwipe('right')}
              className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-emerald-500 hover:bg-emerald-500/20 transition-all"
            >
              <Heart className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {isMatch && <MatchModal onClose={() => setIsMatch(false)} />}
    </div>
  );
}
