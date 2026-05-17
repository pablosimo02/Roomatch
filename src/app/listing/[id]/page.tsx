"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Leaf, Home, MessageSquare, User, ShieldCheck, Sparkles, ChevronLeft, ChevronRight, Calendar, Droplets, Wifi, Thermometer, Star, CheckCircle, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ListingCard from '@/components/listings/ListingCard';
import { FraudBadge } from '@/components/badges/FraudBadge';
import { useFavorites } from '@/hooks/useFavorites';
import { MOCK_LISTINGS } from '@/lib/mock/listings';

const MOCK_LISTING_DETAILS: Record<string, any> = {
  'l1': {
    id: 'l1', title: 'Habitación Luminosa en Ruzafa', price: 450, neighborhood: 'Ruzafa', ecoScore: 78,
    distanceUV: 2.1, distanceUPV: 5.8, type: 'room',
    images: ['https://images.unsplash.com/photo-1522708323594-d2f6ca577e8d?w=800&q=80', 'https://images.unsplash.com/photo-1502672263668-69152ad837f4?w=800&q=80', 'https://images.unsplash.com/photo-1493809842388-fbd1c94750ad?w=800&q=80'],
    description: 'Increíble habitación en el corazón de Ruzafa. Muy iluminada, con acceso a cocina equipada y salón compartido. Ideal para estudiantes que busquen un ambiente creativo y tranquilo.',
    amenities: ['WiFi Fibra', 'Aire Acondicionado', 'Lavadora', 'Cerca de Metro', 'Balcón'],
    rules: ['No fumadores', 'Sin mascotas', 'Ambiente tranquilo'],
    owner: { id: 'u3', name: 'Maria Landlord', avatar: 'https://images.unsplash.com/photo-1544005313-94dde7a23197?w=800&q=80', rating: 4.8, reviews: 12, verified: true },
    ecoBreakdown: { energy: 80, transport: 70, waste: 85 },
    billsIncluded: false, availableFrom: '2026-09-01', minStay: '6 meses', instantBook: false, fraudScore: 95,
  },
  'l2': {
    id: 'l2', title: 'Ático con Terraza Ruzafa', price: 800, neighborhood: 'Ruzafa', ecoScore: 70,
    distanceUV: 2.5, distanceUPV: 6.0, type: 'flat',
    images: ['https://images.unsplash.com/photo-1560448204-603b3fc03ff9?w=800&q=80', 'https://images.unsplash.com/photo-1502672263668-69152ad837f4?w=800&q=80', 'https://images.unsplash.com/photo-1493809842388-fbd1c94750ad?w=800&q=80'],
    description: 'Espectaculares vistas de la ciudad desde la terraza. Piso completo reformado con acabados de lujo.',
    amenities: ['Terraza', 'Parking', 'WiFi', 'AC'],
    rules: ['Solo estudiantes'],
    owner: { id: 'u3', name: 'Maria Landlord', avatar: 'https://images.unsplash.com/photo-1544005313-94dde7a23197?w=800&q=80', rating: 4.8, reviews: 12, verified: true },
    ecoBreakdown: { energy: 70, transport: 65, waste: 75 },
    billsIncluded: true, availableFrom: '2026-10-01', minStay: '12 meses', instantBook: true, fraudScore: 98,
  },
};

export default function ListingDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [currentImage, setCurrentImage] = useState(0);
  const id = params.id;
  const listing = MOCK_LISTING_DETAILS[id] || MOCK_LISTINGS.find(l => l.id === id) || {
    id, title: 'Habitación en Valencia', price: 400, neighborhood: 'Centro', ecoScore: 65,
    distanceUV: 1.5, distanceUPV: 4.0, type: 'room',
    images: ['https://images.unsplash.com/photo-1522708323594-d2f6ca577e8d?w=800&q=80'],
    description: 'Descripción detallada de la habitación disponible en Valencia.',
    amenities: ['WiFi', 'Cerca de transporte'],
    rules: ['No fumadores'],
    owner: { id: 'u3', name: 'Propietario', avatar: 'https://images.unsplash.com/photo-1544005313-94dde7a23197?w=800&q=80', rating: 5, reviews: 1, verified: false },
    ecoBreakdown: { energy: 60, transport: 70, waste: 70 },
    billsIncluded: false, availableFrom: '2026-09-01', minStay: '6 meses', instantBook: false, fraudScore: 85,
  };

  const favorited = isFavorite(listing.id);
  const similarListings = MOCK_LISTINGS.filter(l => l.id !== listing.id && l.neighborhood === listing.neighborhood).slice(0, 3);

  const nextImage = () => setCurrentImage(prev => (prev + 1) % listing.images.length);
  const prevImage = () => setCurrentImage(prev => (prev - 1 + listing.images.length) % listing.images.length);

  return (
    <div className="flex flex-col gap-12 pb-20 max-w-6xl mx-auto">
      {/* Gallery */}
      <div className="relative rounded-3xl overflow-hidden h-[400px] md:h-[500px]">
        <img src={listing.images[currentImage]} alt={listing.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-colors">
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-colors">
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
        <button onClick={() => toggleFavorite(listing.id)} className="absolute top-4 right-4 p-3 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-all">
          <Heart className={`w-6 h-6 ${favorited ? 'fill-red-500 text-red-500' : 'text-white'}`} />
        </button>
        <div className="absolute bottom-4 left-4 flex gap-2">
          {listing.images.map((_: any, i: number) => (
            <button key={i} onClick={() => setCurrentImage(i)} className={`w-2 h-2 rounded-full transition-all ${i === currentImage ? 'bg-white w-6' : 'bg-white/50'}`} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 px-6">
        {/* Main Info */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl md:text-4xl font-bold font-clash">{listing.title}</h1>
              <div className="text-right">
                <span className="text-3xl font-bold text-primary">{listing.price}€</span>
                <span className="text-text-muted text-sm block">/mes</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{listing.neighborhood}, Valencia</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 border border-accent/30">
                <Leaf className="w-4 h-4 text-accent" />
                <span className="font-bold text-accent">EcoScore {listing.ecoScore}</span>
              </div>
              {listing.fraudScore && <FraudBadge score={listing.fraudScore} />}
              {listing.billsIncluded && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-semibold">
                  <Droplets className="w-3.5 h-3.5" />
                  Gastos incluidos
                </div>
              )}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2"><Home className="w-5 h-5 text-primary" /> Descripción</h2>
            <p className="text-text-muted leading-relaxed">{listing.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="font-bold mb-3 flex items-center gap-2"><Sparkles className="w-5 h-5 text-primary" /> Servicios</h3>
              <div className="flex flex-wrap gap-2">
                {listing.amenities?.map((a: string) => (
                  <span key={a} className="px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs flex items-center gap-1.5">
                    {a.includes('WiFi') && <Wifi className="w-3 h-3" />}
                    {a.includes('Aire') && <Thermometer className="w-3 h-3" />}
                    {a}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="font-bold mb-3 flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-accent" /> Normas</h3>
              <div className="flex flex-col gap-2">
                {listing.rules?.map((r: string) => (
                  <span key={r} className="text-sm text-text-muted flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" /> {r}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="font-bold mb-4 flex items-center gap-2"><Calendar className="w-5 h-5 text-accent-warm" /> Disponibilidad</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 rounded-xl bg-white/5">
                <div className="text-xs text-text-muted mb-1">Disponible desde</div>
                <div className="font-semibold text-sm">{listing.availableFrom}</div>
              </div>
              <div className="text-center p-3 rounded-xl bg-white/5">
                <div className="text-xs text-text-muted mb-1">Estancia mínima</div>
                <div className="font-semibold text-sm">{listing.minStay}</div>
              </div>
              <div className="text-center p-3 rounded-xl bg-white/5">
                <div className="text-xs text-text-muted mb-1">Tipo</div>
                <div className="font-semibold text-sm capitalize">{listing.type === 'room' ? 'Habitación' : listing.type === 'studio' ? 'Estudio' : 'Piso'}</div>
              </div>
              <div className="text-center p-3 rounded-xl bg-white/5">
                <div className="text-xs text-text-muted mb-1">Reserva</div>
                <div className={`font-semibold text-sm ${listing.instantBook ? 'text-accent' : 'text-accent-warm'}`}>
                  {listing.instantBook ? 'Instantánea' : 'Solicitud'}
                </div>
              </div>
            </div>
          </div>

          {/* EcoScore Detail */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="font-bold mb-4 flex items-center gap-2"><Leaf className="w-5 h-5 text-accent" /> EcoScore Detalle</h3>
            <div className="flex flex-col gap-4">
              {Object.entries(listing.ecoBreakdown || {}).map(([key, val]) => (
                <div key={key} className="flex flex-col gap-1">
                  <div className="flex justify-between text-xs uppercase font-semibold text-text-muted">
                    <span>{key}</span><span>{String(val)}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${val}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Similar Listings */}
          {similarListings.length > 0 && (
            <div>
              <h3 className="text-xl font-bold font-clash mb-4">Pisos similares en {listing.neighborhood}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {similarListings.map(l => <ListingCard key={l.id} listing={l} />)}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6">
          <div className="p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-2xl flex flex-col items-center text-center gap-5 sticky top-24">
            <div className="relative">
              <img src={listing.owner?.avatar || 'https://images.unsplash.com/photo-1544005313-94dde7a23197?w=800&q=80'} alt={listing.owner?.name || 'Owner'} className="w-20 h-20 rounded-full object-cover border-4 border-primary" />
              {listing.owner?.verified && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center border-2 border-bg-card">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold font-clash">{listing.owner?.name || 'Propietario'}</h3>
              <div className="flex items-center justify-center gap-1 text-accent">
                <Star className="w-4 h-4 fill-accent" />
                <span className="text-sm font-bold">{listing.owner?.rating || 5}</span>
                <span className="text-text-muted text-xs">({listing.owner?.reviews || 0} reseñas)</span>
              </div>
              {listing.owner?.verified && (
                <div className="mt-1 flex items-center justify-center gap-1 text-xs text-primary">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Identidad verificada
                </div>
              )}
            </div>
            <button
              onClick={() => router.push(`/chat/${listing.owner?.id || 'u3'}`)}
              className="w-full py-3.5 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/30"
            >
              <MessageSquare className="w-5 h-5" />
              Contactar
            </button>
            <button className="w-full py-3.5 bg-accent/20 text-accent border border-accent/30 rounded-xl font-bold hover:bg-accent/30 transition-all">
              {listing.instantBook ? 'Reserva Instantánea' : 'Solicitar Visita'}
            </button>
            <div className="text-xs text-text-muted text-center">
              {listing.instantBook ? 'Reserva directa sin esperar confirmación' : 'El propietario confirmará en 24h'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
