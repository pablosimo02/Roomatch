import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, MapPin } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';

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
    images: string[];
    type: string;
  };
}

export default function ListingCard({ listing }: ListingCardProps) {
  const imageSrc = listing.images && listing.images.length > 0 ? listing.images[0] : 'https://images.unsplash.com/photo-1522708323594-d2f6ca577e8d';

  return (
    <Link href={`/listing/${listing.id}`} className="block">
      <motion.div
        whileHover={{ y: -5 }}
        className="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl hover:border-primary/50 transition-all duration-300 cursor-pointer"
      >
        {/* Image Section */}
        <div className="relative h-56 w-full overflow-hidden">
          <img
            src={imageSrc}
            alt={listing.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* EcoScore Badge */}
          <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full bg-accent text-white text-xs font-bold shadow-lg">
            <Leaf className="w-3 h-3" />
            <span>{listing.ecoScore ?? 'N/A'}</span>
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

          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-white/10">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-text-muted font-semibold">Dist. UV</span>
              <span className="text-sm font-medium">{listing.distanceUV ?? 0} km</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-text-muted font-semibold">Dist. UPV</span>
              <span className="text-sm font-medium">{listing.distanceUPV ?? 0} km</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
