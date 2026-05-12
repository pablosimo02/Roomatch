"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Star } from 'lucide-react';
import SwipeCard from './SwipeCard';
import MatchModal from './MatchModal';

const MOCK_SWIPE_LISTINGS = [
  {
    id: '1',
    title: 'Habitación Luminosa en Ruzafa',
    price: 450,
    neighborhood: 'Ruzafa',
    images: ['https://images.unsplash.com/photo-1522708323594-d2f6ca577e8d'],
  },
  {
    id: '2',
    title: 'Estudio Moderno Benimaclet',
    price: 600,
    neighborhood: 'Benimaclet',
    images: ['https://images.unsplash.com/photo-1502672263668-69152ad837f4'],
  },
  {
    id: '3',
    title: 'Habitación Vintage El Carmen',
    price: 420,
    neighborhood: 'El Carmen',
    images: ['https://images.unsplash.com/photo-1493809842388-fbd1c94750ad'],
  },
];

export default function SwipePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastDirection, setLastDirection] = useState<string | null>(null);
  const [isMatch, setIsMatch] = useState(false);

  const handleSwipe = (direction: 'left' | 'right' | 'up') => {
    setLastDirection(direction);

    // Simulate a match if swiped right
    if (direction === 'right' && Math.random() > 0.5) {
      setIsMatch(true);
    }

    setCurrentIndex(prev => prev + 1);
  };

  if (currentIndex >= MOCK_SWIPE_LISTINGS.length) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center text-center gap-4">
        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center animate-bounce">
          <Heart className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-3xl font-bold font-clash">¡No hay más pisos!</h2>
        <p className="text-text-muted max-w-xs">Hemos agotado las opciones por ahora. Vuelve más tarde para descubrir nuevas joyas.</p>
        <button
          onClick={() => setCurrentIndex(0)}
          className="px-6 py-2 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-all"
        >
          Reiniciar búsqueda
        </button>
      </div>
    );
  }

  return (
    <div className="relative h-[85vh] flex flex-col items-center justify-center">
      <div className="relative w-full max-w-md h-[600px]">
        <AnimatePresence>
          {MOCK_SWIPE_LISTINGS.slice(currentIndex).map((listing, index) => (
            <SwipeCard
              key={listing.id}
              listing={listing}
              onSwipe={handleSwipe}
            />
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-12 flex items-center gap-6">
        <button
          onClick={() => handleSwipe('left')}
          className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-red-500 hover:bg-red-500/20 transition-all"
        >
          <X className="w-6 h-6" />
        </button>
        <button
          onClick={() => handleSwipe('up')}
          className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-accent hover:bg-accent/20 transition-all"
        >
          <Star className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleSwipe('right')}
          className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-emerald-500 hover:bg-emerald-500/20 transition-all"
        >
          <Heart className="w-6 h-6" />
        </button>
      </div>

      {isMatch && <MatchModal onClose={() => setIsMatch(false)} />}
    </div>
  );
}
