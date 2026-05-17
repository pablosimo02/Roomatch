"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, MapPin, Heart } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import { useFavorites } from '@/hooks/useFavorites';
import { FraudBadge } from '@/components/badges/FraudBadge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ListingCardProps {
  listing: {
    id: string;
    title: string;
    price: number;
    neighborhood: string;
    ecoScore: number;
    distanceUV: number;
    distanceUPV: number;
    distanceUEV?: number;
    distanceUCV?: number;
    distanceCEU?: number;
    images: string[];
    type: string;
    fraudScore?: number;
  };
}

export default function ListingCard({ listing }: ListingCardProps) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorited = isFavorite(listing.id);
  const [imgError, setImgError] = React.useState(false);
  const imageSrc = listing.images && listing.images.length > 0 && !imgError ? listing.images[0] : 'https://picsum.photos/seed/fallback/800/600';

  return (
    <Link href={`/listing/${listing.id}`} className="block">
      <motion.div
        whileHover={{ y: -5 }}
        className="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl hover:border-primary/50 transition-all duration-300 cursor-pointer"
      >
        {/* Image Section */}
        <div className="relative h-56 w-full overflow-hidden bg-gray-800">
          <img
            src={imageSrc}
            alt={listing.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setImgError(true)}
          />

          {/* Heart Button */}
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(listing.id); }}
            className="absolute top-4 left-4 p-2 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-all duration-300 hover:scale-110 z-10"
          >
            <Heart className={`w-5 h-5 transition-colors ${favorited ? 'fill-red-500 text-red-500' : 'text-white'}`} />
          </button>

          {/* Badges Row */}
          <div className="absolute top-4 right-4 flex flex-col gap-1.5 items-end">
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-accent text-white text-xs font-bold shadow-lg">
              <Leaf className="w-3 h-3" />
              <span>{listing.ecoScore ?? 'N/A'}</span>
            </div>
            {listing.fraudScore && <FraudBadge score={listing.fraudScore} />}
          </div>

          {/* Price Tag */}
          <div className="absolute bottom-4 left-4 px-3 py-1 rounded-lg bg-primary text-white font-bold text-lg shadow-lg">
            {listing.price ?? 0}€ <span className="text-xs font-normal opacity-80">/mes</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 flex flex-col gap-3">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg font-clash group-hover:text-primary transition-colors truncate">
              {listing.title ?? 'Sinu título'}
            </h3>
            <span className="text-xs px-2 py-1 rounded-md bg-white/10 text-text-muted border border-white/10">
              {listing.type ?? 'Habitación'}
            </span>
          </div>

          <div className="flex items-center gap-2 text-text-muted text-sm">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{listing.neighborhood ?? 'Valencia'}, Valencia</span>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/10">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-text-muted font-semibold">Dist. UV</span>
              <span className="text-sm font-medium">{listing.distanceUV ?? 0} km</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-text-muted font-semibold">Dist. UPV</span>
              <span className="text-sm font-medium">{listing.distanceUPV ?? 0} km</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-text-muted font-semibold">Dist. UEV</span>
              <span className="text-sm font-medium">{listing.distanceUEV ?? listing.distanceUV ?? 0} km</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-text-muted font-semibold">Dist. UCV</span>
              <span className="text-sm font-medium">{listing.distanceUCV ?? listing.distanceUV ?? 0} km</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-text-muted font-semibold">Dist. CEU</span>
              <span className="text-sm font-medium">{listing.distanceCEU ?? listing.distanceUPV ?? 0} km</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
