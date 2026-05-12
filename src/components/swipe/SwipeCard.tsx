"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { X, Heart, Star, Info } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SwipeCardProps {
  listing: any;
  onSwipe: (direction: 'left' | 'right' | 'up') => void;
}

export default function SwipeCard({ listing, onSwipe }: SwipeCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  const heartOpacity = useTransform(x, [50, 150], [0, 1]);
  const xMarkOpacity = useTransform(x, [-50, -150], [0, 1]);

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x > 150) onSwipe('right');
    else if (info.offset.x < -150) onSwipe('left');
    else if (info.offset.y < -150) onSwipe('up');
  };

  return (
    <motion.div
      style={{ x, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      className="absolute inset-0 w-full h-full max-w-md mx-auto cursor-grab active:cursor-grabbing"
    >
      <div className="relative w-full h-full rounded-3xl overflow-hidden bg-bg-card border border-white/10 shadow-2xl group">
        {/* Image */}
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="w-full h-full object-cover pointer-events-none"
        />

        {/* Overlays */}
        <motion.div
          style={{ opacity: heartOpacity }}
          className="absolute top-10 right-10 w-16 h-16 rounded-full bg-accent flex items-center justify-center border-4 border-white shadow-xl"
        >
          <Heart className="w-8 h-8 text-white fill-current" />
        </motion.div>

        <motion.div
          style={{ opacity: xMarkOpacity }}
          className="absolute top-10 left-10 w-16 h-16 rounded-full bg-red-500 flex items-center justify-center border-4 border-white shadow-xl"
        >
          <X className="w-8 h-8 text-white" />
        </motion.div>

        {/* Bottom Info Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black via-black/60 to-transparent p-6 flex flex-col justify-end">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="text-2xl font-bold font-clash text-white">{listing.title}</h3>
              <div className="flex items-center gap-2 text-accent font-semibold text-lg mb-2">
                <span className="text-white">{listing.price}€/mes</span>
                <span className="text-xs opacity-70">• {listing.neighborhood}</span>
              </div>
              <div className="flex gap-2 mb-4">
                {['WiFi', 'AC', 'Parking'].map(tag => (
                  <span key={tag} className="px-2 py-1 rounded-full bg-white/10 text-[10px] text-white border border-white/20 backdrop-blur-md">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <button className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all backdrop-blur-md">
              <Info className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
