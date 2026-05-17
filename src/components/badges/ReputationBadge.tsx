"use client";
import React from "react";
import { motion } from "framer-motion";
import { Star, Shield, Award, TrendingUp, CheckCircle, MessageSquare } from "lucide-react";

const REPUTATION_TIERS = [
  { name: "Nuevo", icon: Star, color: "#94A3B8", minReviews: 0, description: "Acaba de unirse" },
  { name: "Verificado", icon: CheckCircle, color: "#6366F1", minReviews: 3, description: "Identidad verificada" },
  { name: "Confiable", icon: Shield, color: "#10B981", minReviews: 10, description: "Múltiples reseñas positivas" },
  { name: "Top Rated", icon: Award, color: "#F59E0B", minReviews: 25, description: "Usuario destacado" },
  { name: "Leyenda", icon: TrendingUp, color: "#EC4899", minReviews: 50, description: "Miembro élite de la comunidad" },
];

export function ReputationBadge({ tier }: { tier: typeof REPUTATION_TIERS[0] }) {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{ backgroundColor: `${tier.color}20`, color: tier.color, border: `1px solid ${tier.color}40` }}
    >
      <tier.icon className="w-3.5 h-3.5" />
      <span>{tier.name}</span>
    </motion.div>
  );
}

export function ReputationCard({ reviews = 0, verified = false }: { reviews?: number; verified?: boolean }) {
  const tier = [...REPUTATION_TIERS].reverse().find(t => reviews >= t.minReviews) || REPUTATION_TIERS[0];

  return (
    <div className="rounded-xl bg-white/5 border border-white/10 p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${tier.color}20` }}>
          <tier.icon className="w-5 h-5" style={{ color: tier.color }} />
        </div>
        <div>
          <div className="font-semibold text-sm">{tier.name}</div>
          <div className="text-xs text-text-muted">{tier.description}</div>
        </div>
      </div>
      <div className="flex items-center gap-4 text-xs text-text-muted">
        <span className="flex items-center gap-1">
          <MessageSquare className="w-3 h-3" />
          {reviews} reseñas
        </span>
        {verified && (
          <span className="flex items-center gap-1 text-accent">
            <CheckCircle className="w-3 h-3" />
            Verificado
          </span>
        )}
      </div>
    </div>
  );
}

export default ReputationCard;
