"use client";
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, MapPin, Leaf, MessageSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { MOCK_LISTINGS } from '@/lib/mock/listings';

const NEIGHBORHOOD_GRADIENTS: Record<string, string> = {
  'Ruzafa': 'from-rose-500/80 to-orange-400/80',
  'Benimaclet': 'from-emerald-500/80 to-teal-400/80',
  'El Carmen': 'from-violet-500/80 to-purple-400/80',
  'Campanar': 'from-sky-500/80 to-blue-400/80',
  'Patraix': 'from-amber-500/80 to-yellow-400/80',
  'Algirós': 'from-indigo-500/80 to-blue-400/80',
};

export default function SwipePage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [matches, setMatches] = useState<string[]>([]);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [matchedListing, setMatchedListing] = useState<typeof MOCK_LISTINGS[0] | null>(null);

  const currentListing = MOCK_LISTINGS[currentIndex];
  const remaining = MOCK_LISTINGS.length - currentIndex;

  const swipe = useCallback((dir: 'left' | 'right') => {
    if (!currentListing) return;
    setDirection(dir);

    setTimeout(() => {
      if (dir === 'right') {
        const ownerId = currentListing.ownerId || 'u3';
        setMatches(prev => [...prev, currentListing.id]);
        setMatchedListing(currentListing);
        setShowMatchModal(true);
        return;
      }
      setDirection(null);
      setCurrentIndex(prev => prev + 1);
    }, 300);
  }, [currentListing]);

  const handleChatRedirect = () => {
    if (matchedListing) {
      const ownerId = matchedListing.ownerId || 'u3';
      router.push(`/chat/${ownerId}?greeting=Hola! Me interesa tu anuncio de ${matchedListing.title}. ¿Está disponible todavía?`);
    }
  };

  if (!currentListing || remaining <= 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6">
        <div className="p-8 rounded-full bg-white shadow-lg">
          <Heart className="w-20 h-20 text-primary" />
        </div>
        <h2 className="text-3xl font-bold font-clash text-[#1A1A2E]">¡No hay más pisos!</h2>
        <p className="text-[#6B7280] max-w-md">Has visto todos los pisos disponibles. Vuelve pronto para ver nuevos anuncios.</p>
      </div>
    );
  }

  const gradient = NEIGHBORHOOD_GRADIENTS[currentListing.neighborhood] || 'from-primary/80 to-secondary/80';

  return (
    <div className="flex flex-col items-center gap-8 max-w-lg mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-clash text-[#1A1A2E]">Swipe Pisos</h1>
        <p className="text-[#6B7280]">{remaining} pisos restantes</p>
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
            className="absolute inset-0 rounded-3xl overflow-hidden bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1)] cursor-grab active:cursor-grabbing"
          >
            <img src={currentListing.images[0] || 'https://picsum.photos/seed/fallback/800/600'} alt={currentListing.title} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/fallback/800/600'; }} />
            <div className={`absolute inset-0 bg-gradient-to-t ${gradient} via-transparent to-transparent opacity-60`} />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-2xl font-bold text-white">{currentListing.title}</h2>
                <span className="text-2xl font-bold text-white">{currentListing.price}€</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/80">
                <MapPin className="w-4 h-4" />
                <span>{currentListing.neighborhood}</span>
              </div>
              <div className="flex items-center gap-2 mt-2 text-xs">
                <span className="px-2 py-1 rounded-full bg-white/20 text-white font-semibold flex items-center gap-1 backdrop-blur-sm">
                  <Leaf className="w-3 h-3" /> Eco {currentListing.ecoScore}
                </span>
                <span className="px-2 py-1 rounded-full bg-white/20 text-white capitalize backdrop-blur-sm">{currentListing.type}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-6">
        <button onClick={() => swipe('left')} className="p-5 rounded-full bg-red-50 border border-red-200 hover:bg-red-100 transition-all shadow-sm">
          <X className="w-8 h-8 text-red-500" />
        </button>
        <button onClick={() => swipe('right')} className="p-5 rounded-full bg-green-50 border border-green-200 hover:bg-green-100 transition-all shadow-sm">
          <Heart className="w-8 h-8 text-green-500" />
        </button>
      </div>

      <AnimatePresence>
        {showMatchModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setShowMatchModal(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 50 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative mx-4 w-full max-w-md overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-secondary p-8 text-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.6, repeat: 1, repeatDelay: 0.2 }}
                className="mb-6 flex justify-center"
              >
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                  <Heart className="h-12 w-12 fill-white text-white" />
                </div>
              </motion.div>

              <h2 className="mb-2 font-clash text-3xl font-bold text-white">¡Match!</h2>
              <p className="mb-6 text-white/80">
                Te interesa <span className="font-semibold text-white">{matchedListing?.title}</span>
              </p>

              {matchedListing && (
                <div className="mb-6 overflow-hidden rounded-2xl">
                  <img
                    src={matchedListing.images[0]}
                    alt={matchedListing.title}
                    className="h-40 w-full object-cover"
                  />
                  <div className="flex items-center justify-between bg-black/30 p-3">
                    <span className="text-sm text-white/90">{matchedListing.neighborhood}</span>
                    <span className="font-bold text-white">{matchedListing.price}€/mes</span>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-3">
                <button
                  onClick={handleChatRedirect}
                  className="flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-primary transition-all hover:bg-white/90 hover:shadow-lg"
                >
                  <MessageSquare className="h-5 w-5" />
                  Abrir Chat
                </button>
                <button
                  onClick={() => {
                    setShowMatchModal(false);
                    setDirection(null);
                    setCurrentIndex(prev => prev + 1);
                  }}
                  className="rounded-xl border border-white/30 px-6 py-3 font-semibold text-white transition-all hover:bg-white/10"
                >
                  Seguir viendo pisos
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
