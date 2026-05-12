"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Leaf, Home, BedDouble, MessageSquare, User, ShieldCheck, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ListingParams {
  params: {
    id: string;
  };
}

// Mock data for a single listing detail view
const MOCK_LISTING_DETAILS: Record<string, any> = {
  '1': {
    id: '1',
    title: 'Habitación Luminosa en Ruzafa',
    price: 450,
    neighborhood: 'Ruzafa',
    ecoScore: 78,
    distanceUV: 2.1,
    distanceUPV: 5.8,
    type: 'room',
    images: [
      'https://images.unsplash.com/photo-1522708323594-d2f6ca577e8d?w=800&q=80',
      'https://images.unsplash.com/photo-1502672263668-69152ad837f4?w=800&q=80',
      'https://images.unsplash.com/photo-1493809842388-fbd1c94750ad?w=800&q=80'
    ],
    description: 'Increíble habitación en el corazón de Ruzafa. Muy iluminada, con acceso a cocina equipada y salón compartido. Ideal para estudiantes que busquen un ambiente creativo y tranquilo.',
    amenities: ['WiFi Fibra', 'Aire Acondicionado', 'Lavadora', 'Cerca de Metro', 'Balcón'],
    rules: ['No fumadores', 'Sin mascotas', 'Ambiente tranquilo'],
    owner: {
      id: 'u3',
      name: 'Maria Landlord',
      avatar: 'https://images.unsplash.com/photo-1544005313-94dde7a23197?w=800&q=80',
      rating: 4.8,
      reviews: 12,
    },
    ecoBreakdown: {
      energy: 80,
      transport: 70,
      waste: 85,
    }
  }
};

export default function ListingDetailPage({ params }: ListingParams) {
  const router = useRouter();
  const id = params.id;
  const listing = MOCK_LISTING_DETAILS[id] || {
    id,
    title: 'Habitación en Valencia',
    price: 400,
    neighborhood: 'Centro',
    ecoScore: 65,
    distanceUV: 1.5,
    distanceUPV: 4.0,
    type: 'room',
    images: ['https://images.unsplash.com/photo-1522708323594-d2f6ca577e8d?w=800&q=80'],
    description: 'Descripción detallada de la habitación disponible en Valencia.',
    amenities: ['WiFi', 'Cerca de transporte'],
    rules: ['No fumadores'],
    owner: { id: 'u3', name: 'Propietario', avatar: 'https://images.unsplash.com/photo-1544005313-94dde7a23197?w=800&q=80', rating: 5, reviews: 1 },
    ecoBreakdown: { energy: 60, transport: 70, waste: 70 }
  };

  return (
    <div className="flex flex-col gap-12 pb-20 max-w-6xl mx-auto p-6">
      {/* Gallery Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[500px]">
        <div className="md:col-span-2 h-full relative rounded-3xl overflow-hidden group">
          <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
        <div className="md:col-span-2 grid grid-cols-2 gap-4 h-full">
          {listing.images.slice(1).map((img: string, i: number) => (
            <div key={i} className="relative rounded-3xl overflow-hidden group">
              <img src={img} alt={listing.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
          ))}
          <div className="relative rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-text-muted text-sm cursor-pointer hover:bg-white/10 transition-all">
            + {listing.images.length - 2} fotos
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Info */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <h1 className="text-4xl font-bold font-clash">{listing.title}</h1>
              <div className="text-right">
                <span className="text-3xl font-bold text-primary">{listing.price}€</span>
                <span className="text-text-muted text-sm block"> / mes</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-text-muted">
              <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{listing.neighborhood}, Valencia</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                <Leaf className="w-4 h-4 text-accent" />
                <span className="font-bold text-accent">EcoScore {listing.ecoScore}</span>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col gap-6">
            <h2 className="text-xl font-bold font-clash flex items-center gap-2">
              <Home className="w-5 h-5 text-primary" /> Descripción
            </h2>
            <p className="text-text-primary leading-relaxed opacity-80">
              {listing.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col gap-4">
              <h3 className="font-bold flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" /> Servicios
              </h3>
              <div className="flex flex-wrap gap-2">
                {listing.amenities.map((a: string) => (
                  <span key={a} className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs text-text-primary">{a}</span>
                ))}
              </div>
            </div>
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col gap-4">
              <h3 className="font-bold flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-accent" /> Normas
              </h3>
              <div className="flex flex-col gap-2">
                {listing.rules.map((r: string) => (
                  <span key={r} className="text-sm text-text-muted flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-accent" /> {r}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar / Owner */}
        <div className="flex flex-col gap-6">
          <div className="p-8 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-2xl flex flex-col items-center text-center gap-6 shadow-2xl">
            <div className="relative">
              <img src={listing.owner.avatar} alt={listing.owner.name} className="w-24 h-24 rounded-full object-cover border-4 border-primary p-1" />
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-500 border-4 border-bg-card rounded-full" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-clash">{listing.owner.name}</h3>
              <div className="flex items-center justify-center gap-1 text-accent font-bold">
                <span className="text-sm">⭐ {listing.owner.rating}</span>
                <span className="text-text-muted text-xs font-normal">({listing.owner.reviews} reviews)</span>
              </div>
            </div>
            <button
              onClick={() => router.push(`/chat/${listing.owner.id}`)}
              className="w-full py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary-dark transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/30"
            >
              <MessageSquare className="w-5 h-5" />
              Contactar propietario
            </button>
          </div>

          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col gap-6">
            <h3 className="font-bold flex items-center gap-2">
              <Leaf className="w-5 h-5 text-accent" /> EcoScore Detail
            </h3>
            <div className="flex flex-col gap-4">
              {Object.entries(listing.ecoBreakdown).map(([key, val]) => (
                <div key={key} className="flex flex-col gap-2">
                  <div className="flex justify-between text-xs uppercase font-semibold text-text-muted">
                    <span>{key}</span>
                    <span>{String(val)}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-accent transition-all" style={{ width: `${val}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
