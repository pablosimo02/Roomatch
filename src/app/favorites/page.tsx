"use client";
import React from "react";
import { Heart, Home } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { MOCK_LISTINGS } from "@/lib/mock/listings";
import ListingCard from "@/components/listings/ListingCard";

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const favoriteListings = MOCK_LISTINGS.filter(l => favorites.includes(l.id));

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-2xl bg-red-500/20">
          <Heart className="w-8 h-8 text-red-500 fill-red-500" />
        </div>
        <div>
          <h1 className="text-4xl font-bold font-clash">Mis Favoritos</h1>
          <p className="text-text-muted mt-1">{favoriteListings.length} pisos guardados</p>
        </div>
      </div>

      {favoriteListings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="p-6 rounded-full bg-white/5 mb-6">
            <Home className="w-16 h-16 text-text-muted" />
          </div>
          <h2 className="text-2xl font-bold font-clash mb-2">No tienes favoritos aún</h2>
          <p className="text-text-muted max-w-md">Explora pisos y pulsa el corazón para guardarlos aquí.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {favoriteListings.map(listing => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}
