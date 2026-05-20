"use client";
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Star, MapPin, MessageSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { MOCK_ROOMMATES } from '@/lib/mock/roommates';

export default function RoommatesPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [matchedUser, setMatchedUser] = useState<typeof MOCK_ROOMMATES[0] | null>(null);

  const currentUser = MOCK_ROOMMATES[currentIndex];
  const remaining = MOCK_ROOMMATES.length - currentIndex;

  const swipe = useCallback((dir: 'left' | 'right') => {
    if (!currentUser) return;
    setDirection(dir);

    setTimeout(() => {
      setDirection(null);
      if (dir === 'right') {
        setMatchedUser(currentUser);
        setShowMatchModal(true);
        return;
      }
      setCurrentIndex(prev => prev + 1);
    }, 300);
  }, [currentUser]);

  const handleChatRedirect = () => {
    if (matchedUser) {
      router.push(`/chat/${matchedUser.id}?greeting=¡Hemos hecho match! ¿Quieres que hablemos sobre compartir piso?`);
    }
  };

  if (!currentUser || remaining <= 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6">
        <div className="p-8 rounded-full bg-white shadow-lg"><Heart className="w-20 h-20 text-primary" /></div>
        <h2 className="text-3xl font-bold font-clash text-[#1A1A2E]">¡Sin más candidatos!</h2>
        <p className="text-[#6B7280] max-w-md">Has visto a todos los compañeros disponibles.</p>
        <button onClick={() => setCurrentIndex(0)} className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-all">Reiniciar</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-8 max-w-lg mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-clash text-[#1A1A2E]">Compañeros</h1>
        <p className="text-[#6B7280]">{remaining} candidatos restantes</p>
      </div>

      <div className="relative w-full aspect-[4/5]">
        <AnimatePresence>
          <motion.div
            key={currentUser.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ x: direction === 'right' ? 500 : -500, opacity: 0, rotate: direction === 'right' ? 20 : -20, transition: { duration: 0.3 } }}
            className="absolute inset-0 rounded-3xl overflow-hidden bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1)]"
          >
            <img src={currentUser.avatar || 'https://picsum.photos/seed/fallback/800/600'} alt={currentUser.name} className="w-full h-3/5 object-cover" />
            <div className="p-6 flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-[#1A1A2E]">{currentUser.name}</h2>
                  <div className="flex items-center gap-1 text-sm text-[#6B7280]">
                    <MapPin className="w-3 h-3 text-primary" />
                    <span>{currentUser.university}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-accent bg-accent/10 rounded-full px-2 py-1">
                  <Star className="w-4 h-4 fill-accent" />
                  <span className="font-bold text-sm">{currentUser.compatibilityScore}%</span>
                </div>
              </div>
              <p className="text-sm text-[#6B7280]">{currentUser.bio}</p>
              <div className="flex flex-wrap gap-1.5">
                {currentUser.interests?.map(i => (
                  <span key={i} className="px-2.5 py-1 rounded-full bg-gray-100 text-xs text-[#6B7280]">{i}</span>
                ))}
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
              className="relative mx-4 w-full max-w-md overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-accent p-8 text-center shadow-2xl"
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
                Has hecho match con <span className="font-semibold text-white">{matchedUser?.name}</span>
              </p>

              {matchedUser && (
                <div className="mb-6 flex items-center gap-4 rounded-2xl bg-black/20 p-4">
                  <img
                    src={matchedUser.avatar}
                    alt={matchedUser.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <p className="font-semibold text-white">{matchedUser.name}</p>
                    <p className="text-sm text-white/70">{matchedUser.university}</p>
                    <p className="text-sm text-white/90">{matchedUser.compatibilityScore}% compatible</p>
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
                    setCurrentIndex(prev => prev + 1);
                  }}
                  className="rounded-xl border border-white/30 px-6 py-3 font-semibold text-white transition-all hover:bg-white/10"
                >
                  Seguir buscando
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
