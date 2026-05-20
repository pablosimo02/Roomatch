"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, MapPin, Heart } from 'lucide-react';
import Link from 'next/link';
import { useFavorites } from '@/hooks/useFavorites';
import { FraudBadge } from '@/components/badges/FraudBadge';

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

  const typeLabel = listing.type === 'room' ? 'Habitación' : listing.type === 'flat' ? 'Piso' : 'Estudio';

  return (
    <Link href={`/listing/${listing.id}`} className="block">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 transition-all duration-300 cursor-pointer shadow-[0_2px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
      >
        <div className="relative h-52 w-full overflow-hidden bg-gray-100">
          <img
            src={imageSrc}
            alt={listing.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={() => setImgError(true)}
          />

          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(listing.id); }}
            className="absolute top-3 right-3 z-10 rounded-full bg-white/90 p-2 shadow-md transition-all duration-200 hover:scale-110 hover:bg-white"
          >
            <Heart className={`w-4 h-4 transition-colors ${favorited ? 'fill-primary text-primary' : 'text-gray-400'}`} />
          </button>

          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <div className="rounded-lg bg-white/95 px-2.5 py-1 text-xs font-bold text-[#1A1A2E] shadow-sm">
              {listing.price}€/mes
            </div>
            <div className="flex items-center gap-1 rounded-lg bg-accent/90 px-2 py-1 text-xs font-semibold text-white shadow-sm">
              <Leaf className="w-3 h-3" />
              {listing.ecoScore}
            </div>
          </div>

          {listing.fraudScore && (
            <div className="absolute bottom-3 right-3">
              <FraudBadge score={listing.fraudScore} />
            </div>
          )}
        </div>

        <div className="p-4 flex flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-[#1A1A2E] text-sm leading-tight line-clamp-1 group-hover:text-primary transition-colors">
              {listing.title}
            </h3>
            <span className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-[#6B7280]">
              {typeLabel}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[#6B7280] text-xs">
            <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>{listing.neighborhood}, Valencia</span>
          </div>

          <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
            <span className="text-[10px] text-[#6B7280]">UV <b className="text-[#1A1A2E]">{listing.distanceUV}km</b></span>
            <span className="text-[10px] text-[#6B7280]">UPV <b className="text-[#1A1A2E]">{listing.distanceUPV}km</b></span>
            {listing.distanceUEV && <span className="text-[10px] text-[#6B7280]">UEV <b className="text-[#1A1A2E]">{listing.distanceUEV}km</b></span>}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
