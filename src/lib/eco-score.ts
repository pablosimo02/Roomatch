import React from 'react';
import { Leaf, Zap, Car, Building } from 'lucide-react';

export function calculateEcoScore(data: {
  energyRating: string; // "A" | "B" | "C" | "D" | "E"
  distanceToMetro: number; // meters
  hasBikeParking: boolean;
  isShared: boolean;
  buildingYear: number;
}) {
  let score = 0;

  // Energy Rating (35%)
  const energyWeights: Record<string, number> = { 'A': 100, 'B': 85, 'C': 70, 'D': 50, 'E': 30 };
  score += (energyWeights[data.energyRating] || 30) * 0.35;

  // Transport (35%)
  const transportScore = data.distanceToMetro < 500 ? 100 : data.distanceToMetro < 1000 ? 70 : 40;
  score += transportScore * 0.35;

  // Shared (20%)
  score += (data.isShared ? 100 : 40) * 0.20;

  // Building (10%)
  const buildingScore = data.buildingYear > 2010 ? 100 : data.buildingYear > 1990 ? 60 : 30;
  score += buildingScore * 0.10;

  const finalScore = Math.round(score);

  return {
    total: finalScore,
    breakdown: {
      energy: energyWeights[data.energyRating] || 30,
      transport: transportScore,
      shared: data.isShared ? 100 : 40,
      building: buildingScore,
    },
    co2Monthly: Math.round(500 - (finalScore * 4)), // Simulated CO2 reduction
    savingsVsSolo: Math.round(finalScore * 2.5),
  };
}
