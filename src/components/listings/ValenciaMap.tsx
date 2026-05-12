"use client";
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in Leaflet
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface ValenciaMapProps {
  listings: any[];
  center: [number, number];
  zoom: number;
  onListingClick: (id: string) => void;
}

export default function ValenciaMap({ listings, center, zoom, onListingClick }: ValenciaMapProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ width: '100%', height: '100%' }}
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {listings.map((listing) => (
        <Marker
          key={listing.id}
          position={[listing.lat, listing.lng]}
          eventHandlers={{
            click: () => onListingClick(listing.id),
          }}
        >
          <Popup>
            <div className="text-text-primary font-bold">
              {listing.title} - {listing.price}€
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
