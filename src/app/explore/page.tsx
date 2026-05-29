"use client";
import React, { useState, useMemo, useCallback } from 'react';
import { Search, Sparkles, SlidersHorizontal, Home, ShieldCheck, Droplets } from 'lucide-react';
import ListingCard from '@/components/listings/ListingCard';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_LISTINGS } from '@/lib/mock/listings';
import { z } from 'zod';

const SearchFilterSchema = z.object({
  query: z.string().max(100).optional().default(""),
  minPrice: z.number().min(0).max(10000).optional().default(0),
  maxPrice: z.number().min(0).max(10000).optional().default(1000),
  neighborhood: z.string().optional().default("Todos"),
  type: z.string().optional().default("all"),
});

function sanitizeSearchQuery(input: string): string {
  return input.replace(/[<>"'`;]/g, "").trim().slice(0, 100);
}

function validatePriceRange(value: number, min: number, max: number): number {
  const num = Number(value);
  if (isNaN(num) || num < min) return min;
  if (num > max) return max;
  return Math.floor(num);
}

const NEIGHBORHOODS = ['Todos', 'Ruzafa', 'Benimaclet', 'El Carmen', 'Campanar', 'Patraix', 'Algirós'];
const TYPES = [
  { label: 'Todos', value: 'all' },
  { label: 'Habitacion', value: 'room' },
  { label: 'Estudio', value: 'studio' },
  { label: 'Piso', value: 'flat' },
];

export default function ExplorePage() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [minPrice, setMinPrice] = useState(0);
  const [neighborhood, setNeighborhood] = useState('Todos');
  const [type, setType] = useState('all');
  const [billsIncluded, setBillsIncluded] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [minEcoScore, setMinEcoScore] = useState(0);
  const [sortBy, setSortBy] = useState('price-asc');
  const [query, setQuery] = useState('');

  const handleQueryChange = useCallback((value: string) => {
    setQuery(sanitizeSearchQuery(value));
  }, []);

  const handleMinPriceChange = useCallback((value: string) => {
    setMinPrice(validatePriceRange(Number(value), 0, 10000));
  }, []);

  const handleMaxPriceChange = useCallback((value: string) => {
    setMaxPrice(validatePriceRange(Number(value), 0, 10000));
  }, []);

  const handleEcoScoreChange = useCallback((value: string) => {
    setMinEcoScore(validatePriceRange(Number(value), 0, 100));
  }, []);

  const filteredListings = useMemo(() => {
    const params = { query, minPrice, maxPrice, neighborhood, type };
    const validation = SearchFilterSchema.safeParse(params);
    if (!validation.success) return [];

    const { query: q, minPrice: minP, maxPrice: maxP, neighborhood: nb, type: tp } = validation.data;

    const results = MOCK_LISTINGS.filter(listing => {
      if (listing.price < minP || listing.price > maxP) return false;
      if (nb !== 'Todos' && listing.neighborhood !== nb) return false;
      if (tp !== 'all' && listing.type !== tp) return false;
      if (q && !`${listing.title} ${listing.neighborhood}`.toLowerCase().includes(q.toLowerCase())) return false;
      if (listing.ecoScore < minEcoScore) return false;
      if (verifiedOnly && listing.fraudScore < 90) return false;
      return true;
    });

    switch (sortBy) {
      case 'price-asc': results.sort((a, b) => a.price - b.price); break;
      case 'price-desc': results.sort((a, b) => b.price - a.price); break;
      case 'eco': results.sort((a, b) => b.ecoScore - a.ecoScore); break;
      case 'fraud': results.sort((a, b) => b.fraudScore - a.fraudScore); break;
    }

    return results;
  }, [maxPrice, minPrice, neighborhood, type, verifiedOnly, minEcoScore, sortBy, query]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold font-clash text-[#1A1A2E]">Explorar Valencia</h1>
            <p className="text-[#6B7280]">{filteredListings.length} de {MOCK_LISTINGS.length} pisos disponibles</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setFilterOpen(!filterOpen)} className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-[#6B7280] transition-all hover:border-primary/50 hover:text-primary">
              <SlidersHorizontal className="w-4 h-4" /> Filtros
            </button>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="rounded-full border border-gray-200 bg-white px-3 py-2 text-sm text-[#6B7280] focus:outline-none focus:border-primary">
              <option value="price-asc">Precio: menor a mayor</option>
              <option value="price-desc">Precio: mayor a menor</option>
              <option value="eco">Eco Score</option>
              <option value="fraud">Verificados primero</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-3">
          <div className="group flex flex-1 items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 transition-all focus-within:border-primary/50 focus-within:shadow-[0_2px_12px_rgba(255,56,92,0.1)]">
            <Search className="w-4 h-4 text-gray-400 group-focus-within:text-primary" />
            <input
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder="Buscar por titulo o barrio"
              maxLength={100}
              className="w-full bg-transparent text-sm text-[#1A1A2E] focus:outline-none placeholder:text-gray-400"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {['Todos', 'Estudiantes', 'Cerca UV', 'Con terraza'].map((pill, i) => (
              <motion.button
                key={pill}
                whileHover={{ y: -1 }}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${i === 0 ? 'border-primary/50 bg-primary/10 text-primary' : 'border-gray-200 bg-white text-[#6B7280] hover:border-gray-300 hover:text-[#1A1A2E]'}`}
              >
                {i === 1 && <Sparkles className="mr-1 inline w-3 h-3" />}
                {pill}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {filterOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="rounded-2xl bg-white border border-gray-100 p-6 shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="flex flex-col gap-3">
                  <label className="text-xs font-semibold text-[#6B7280] uppercase">Rango de Precio</label>
                  <div className="flex items-center gap-2">
                    <input type="number" value={minPrice} onChange={e => handleMinPriceChange(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-[#1A1A2E] focus:outline-none focus:border-primary" placeholder="Min" min="0" max="10000" />
                    <span className="text-[#6B7280]">-</span>
                    <input type="number" value={maxPrice} onChange={e => handleMaxPriceChange(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-[#1A1A2E] focus:outline-none focus:border-primary" placeholder="Max" min="0" max="10000" />
                  </div>
                  <input type="range" min="0" max="1200" step="50" value={maxPrice} onChange={e => handleMaxPriceChange(e.target.value)} className="w-full accent-primary" />
                  <span className="text-xs text-[#6B7280]">Max: {maxPrice}EUR/mes</span>
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-xs font-semibold text-[#6B7280] uppercase">Barrio</label>
                  <select value={neighborhood} onChange={e => setNeighborhood(e.target.value)} className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-[#1A1A2E] focus:outline-none focus:border-primary">
                    {NEIGHBORHOODS.map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-xs font-semibold text-[#6B7280] uppercase">Tipo</label>
                  <div className="flex flex-wrap gap-2">
                    {TYPES.map(t => (
                      <button key={t.value} onClick={() => setType(t.value)} className={`px-3 py-1.5 rounded-full border text-xs transition-colors ${type === t.value ? 'bg-primary border-primary text-white' : 'bg-gray-50 border-gray-200 text-[#6B7280] hover:border-gray-300'}`}>{t.label}</button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-xs font-semibold text-[#6B7280] uppercase">Opciones</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={verifiedOnly} onChange={e => setVerifiedOnly(e.target.checked)} className="accent-primary" /><ShieldCheck className="w-4 h-4 text-accent" /><span className="text-sm text-[#1A1A2E]">Solo verificados</span></label>
                    <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={billsIncluded} onChange={e => setBillsIncluded(e.target.checked)} className="accent-primary" /><Droplets className="w-4 h-4 text-secondary" /><span className="text-sm text-[#1A1A2E]">Gastos incluidos</span></label>
                    <label className="flex items-center gap-2 cursor-pointer"><span className="text-sm text-[#6B7280]">EcoScore min:</span><input type="number" value={minEcoScore} onChange={e => handleEcoScoreChange(e.target.value)} className="w-16 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-sm text-[#1A1A2E] focus:outline-none focus:border-primary" min="0" max="100" /></label>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {filteredListings.length === 0 ? (
        <div className="col-span-full py-24 text-center">
          <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2 text-[#1A1A2E]">No se encontraron pisos con estos filtros</h3>
          <p className="text-[#6B7280]">Prueba ajustando los filtros de busqueda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredListings.map(listing => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}
