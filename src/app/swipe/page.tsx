"use client";
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, MapPin, Leaf } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { MOCK_LISTINGS } from '@/lib/mock/listings';

export default function SwipePage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [matches, setMatches] = useState<string[]>([]);

  const currentListing = MOCK_LISTINGS[currentIndex];
  const remaining = MOCK_LISTINGS.length - currentIndex;

  const swipe = useCallback((dir: 'left' | 'right') => {
    if (!currentListing) return;
    setDirection(dir);

    setTimeout(() => {
      if (dir === 'right') {
        const ownerId = currentListing.ownerId || 'u3';
        setMatches(prev => [...prev, currentListing.id]);
        router.push(`/chat/${ownerId}?greeting=Hola! Me interesa tu anuncio de ${currentListing.title}. ¿Está disponible todavía?`);
        return;
      }
      setDirection(null);
      setCurrentIndex(prev => prev + 1);
    }, 300);
  }, [currentListing, router]);

  if (!currentListing || remaining <= 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6">
        <div className="p-8 rounded-full bg-white/5">
          <Heart className="w-20 h-20 text-primary" />
        </div>
        <h2 className="text-3xl font-bold font-clash">¡No hay más pisos!</h2>
        <p className="text-text-muted max-w-md">Has visto todos los pisos disponibles. Vuelve pronto para ver nuevos anuncios.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-8 max-w-lg mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-clash">Swipe Pisos</h1>
        <p className="text-text-muted">{remaining} pisos restantes</p>
      </div>

      <div className="relative w-full aspect-[3/4]">
        <AnimatePresence>
          <motion.div
            key={currentListing.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{
              x: direction === 'right' ? 500 : -500,
              opacity: 0,
              rotate: direction === 'right' ? 20 : -20,
              transition: { duration: 0.3 }
            }}
            className="absolute inset-0 rounded-3xl overflow-hidden bg-white/5 border border-white/10 cursor-grab active:cursor-grabbing"
          >
            <img src={currentListing.images[0] || 'https://picsum.photos/seed/fallback/800/600'} alt={currentListing.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-2xl font-bold">{currentListing.title}</h2>
                <span className="text-2xl font-bold text-primary">{currentListing.price}€</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-muted">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{currentListing.neighborhood}</span>
              </div>
              <div className="flex items-center gap-2 mt-2 text-xs">
                <span className="px-2 py-1 rounded-full bg-accent/20 text-accent font-semibold flex items-center gap-1">
                  <Leaf className="w-3 h-3" /> Eco {currentListing.ecoScore}
                </span>
                <span className="px-2 py-1 rounded-full bg-white/10 text-text-muted capitalize">{currentListing.type}</span>
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
