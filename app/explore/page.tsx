"use client";
import React, { useState, useMemo } from 'react';
import { Map as MapIcon, Filter, SlidersHorizontal, ChevronRight } from 'lucide-react';
import ListingCard from '@/components/listings/ListingCard';
import { motion, AnimatePresence } from 'framer-motion';

// Mock data to simulate API response while we refine the backend
const MOCK_LISTINGS = [
  {
    id: '1',
    title: 'Habitación Luminosa en Ruzafa',
    price: 450,
    neighborhood: 'Ruzafa',
    ecoScore: 78,
    distanceUV: 2.1,
    distanceUPV: 5.8,
    type: 'room',
    images: ['https://images.unsplash.com/photo-1522708323594-d2f6ca577e8d'],
    lat: 39.4625,
    lng: -0.3773,
  },
  {
    id: '2',
    title: 'Estudio Moderno Benimaclet',
    price: 600,
    neighborhood: 'Benimaclet',
    ecoScore: 85,
    distanceUV: 1.2,
    distanceUPV: 3.5,
    type: 'studio',
    images: ['https://images.unsplash.com/photo-1502672263668-69152ad837f4'],
    lat: 39.4812,
    lng: -0.3574,
  },
  {
    id: '3',
    title: 'Habitación Vintage El Carmen',
    price: 420,
    neighborhood: 'El Carmen',
    ecoScore: 62,
    distanceUV: 0.8,
    distanceUPV: 6.2,
    type: 'room',
    images: ['https://images.unsplash.com/photo-1493809842388-fbd1c94750ad'],
    lat: 39.4742,
    lng: -0.3788,
  },
  {
    id: '4',
    title: 'Ático con Terraza Ruzafa',
    price: 800,
    neighborhood: 'Ruzafa',
    ecoScore: 70,
    distanceUV: 2.5,
    distanceUPV: 6.0,
    type: 'flat',
    images: ['https://images.unsplash.com/photo-1560448204-603bCffB593E'],
    lat: 39.4650,
    lng: -0.3750,
  },
];

export default function ExplorePage() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedListingId, setSelectedListingId] = useState<string | null>(null);

  // Filter States
  const [maxPrice, setMaxPrice] = useState(1200);
  const [neighborhood, setNeighborhood] = useState('Todos los barrios');
  const [minEcoScore, setMinEcoScore] = useState('Cualquiera');
  const [type, setType] = useState<string | null>(null);

  const filteredListings = useMemo(() => {
    return MOCK_LISTINGS.filter(listing => {
      const priceMatch = listing.price <= maxPrice;
      const neighborhoodMatch = neighborhood === 'Todos los barrios' || listing.neighborhood === neighborhood;
      const ecoScoreMatch = minEcoScore === 'Cualquiera' ||
        (minEcoScore === '+60 (Bueno)' && listing.ecoScore >= 60) ||
        (minEcoScore === '+80 (Excelente)' && listing.ecoScore >= 80);
      const typeMatch = !type ||
        (type === 'Habitación' && listing.type === 'room') ||
        (type === 'Piso' && listing.type === 'flat') ||
        (type === 'Estudio' && listing.type === 'studio');

      return priceMatch && neighborhoodMatch && ecoScoreMatch && typeMatch;
    });
  }, [maxPrice, neighborhood, minEcoScore, type]);

  return (
    <div className="flex flex-col gap-8">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold font-clash">Explorar Valencia</h1>
          <p className="text-text-muted">Encuentra el lugar perfecto para tu etapa universitaria.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all text-sm font-medium backdrop-blur-md"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filtros
          </button>
          <button className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
            <MapIcon className="w-4 h-4" />
            Ver Mapa
          </button>
        </div>
      </div>

      {/* Filter Bar (Collapsible) */}
      <AnimatePresence>
        {filterOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-text-muted uppercase">Presupuesto Máx: {maxPrice}€</label>
                <input
                  type="range"
                  className="w-full accent-primary"
                  min="200" max="1200" step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-text-muted uppercase">Barrio</label>
                <select
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
                >
                  <option>Todos los barrios</option>
                  <option>Ruzafa</option>
                  <option>Benimaclet</option>
                  <option>El Carmen</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-text-muted uppercase">EcoScore Mín.</label>
                <select
                  value={minEcoScore}
                  onChange={(e) => setMinEcoScore(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
                >
                  <option>Cualquiera</option>
                  <option>+60 (Bueno)</option>
                  <option>+80 (Excelente)</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-text-muted uppercase">Tipo</label>
                <div className="flex gap-2">
                  {['Habitación', 'Piso', 'Estudio'].map(t => (
                    <button
                      key={t}
                      onClick={() => setType(type === t ? null : t)}
                      className={`px-3 py-1 rounded-full border text-[10px] transition-colors ${
                        type === t
                        ? 'bg-primary border-primary text-white'
                        : 'bg-white/10 border la-room.jpg?w=800&q=80 la-room.jpg?w=800&q=80'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Marketplace Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Listings Grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredListings.length > 0 ? (
            filteredListings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-text-muted">
              No se encontraron viviendas con estos filtros.
            </div>
          )}
        </div>

        {/* Map Placeholder */}
        <div className="lg:w-1/3 h-[600px] rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center text-text-muted text-xl font-bold p-8 text-center">
          Mapa de Valencia - Próximamente
        </div>
      </div>
    </div>
  );
}
