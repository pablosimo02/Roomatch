import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

interface Listing {
  id: string;
  title: string;
  price: number;
  neighborhood: string;
  images: string[];
}

interface SwipeCardProps {
  listing: Listing;
  onSwipe: (direction: 'left' | 'right' | 'up') => void;
}

export default function SwipeCard({ listing, onSwipe }: SwipeCardProps) {
  return (
    <motion.div
      className="absolute inset-0 rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing shadow-2xl"
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={(_, info) => {
        if (info.offset.x > 100) onSwipe('right');
        else if (info.offset.x < -100) onSwipe('left');
        else if (info.offset.y < -100) onSwipe('up');
      }}
      whileDrag={{ scale: 1.05 }}
    >
      <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h2 className="text-2xl font-bold text-white font-clash">{listing.title}</h2>
        <div className="flex items-center gap-2 mt-1 text-white/80">
          <MapPin className="w-4 h-4" />
          <span>{listing.neighborhood}</span>
        </div>
        <div className="mt-2 text-xl font-bold text-primary">{listing.price}€/mes</div>
      </div>
    </motion.div>
  );
}
