"use client";
import React from "react";
import { motion } from "framer-motion";
import { Check, Crown, Star, Zap, Heart, Shield } from "lucide-react";

const TIERS = [
  {
    name: "Básico", price: "Gratis", period: "",
    icon: Star, color: "#94A3B8",
    features: ["Ver listings", "5 likes al día", "Filtros básicos", "Chat con landlords"],
    cta: "Empezar Gratis", popular: false,
  },
  {
    name: "Premium", price: "9.99", period: "/mes",
    icon: Crown, color: "#6366F1",
    features: ["Likes ilimitados", "Matching IA", "Filtros premium", "Detector de fraude", "Soporte prioritario"],
    cta: "Ir Premium", popular: true,
  },
  {
    name: "Enterprise", price: "29.99", period: "/mes",
    icon: Zap, color: "#F59E0B",
    features: ["Dashboard analytics", "API access", "Listings destacados", "Contratos digitales", "Account manager"],
    cta: "Contactar", popular: false,
  },
];

export default function PremiumPage() {
  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold font-clash bg-gradient-to-r from-primary via-accent to-accent-warm bg-clip-text text-transparent">
          Planes Premium
        </h1>
        <p className="text-text-muted mt-4 text-lg">Desbloquea todo el potencial de RooMatch.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {TIERS.map((tier, i) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }}
            className={`relative rounded-3xl p-8 flex flex-col ${tier.popular ? "bg-gradient-to-b from-primary/20 to-primary/5 border-2 border-primary shadow-[0_0_40px_rgba(99,102,241,0.2)]" : "bg-white/5 border border-white/10"}`}
          >
            {tier.popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-white text-xs font-bold">Más Popular</div>}
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl" style={{ backgroundColor: `${tier.color}20` }}><tier.icon className="w-6 h-6" style={{ color: tier.color }} /></div>
              <h3 className="text-xl font-bold font-clash">{tier.name}</h3>
            </div>
            <div className="mb-6"><span className="text-4xl font-bold font-clash">€{tier.price}</span><span className="text-text-muted">{tier.period}</span></div>
            <ul className="space-y-3 mb-8 flex-1">
              {tier.features.map(f => <li key={f} className="flex items-start gap-2 text-sm"><Check className="w-4 h-4 text-accent mt-0.5 shrink-0" /><span className="text-text-muted">{f}</span></li>)}
            </ul>
            <button className={`w-full py-3 rounded-xl font-semibold transition-all ${tier.popular ? "bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/25" : "bg-white/10 hover:bg-white/20 text-text-primary border border-white/10"}`}>{tier.cta}</button>
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto rounded-2xl bg-white/5 border border-white/10 p-8">
        <h3 className="text-xl font-bold font-clash mb-6 text-center">¿Por qué RooMatch Premium?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center"><div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-3"><Heart className="w-7 h-7 text-primary" /></div><h4 className="font-semibold mb-1">3x Más Matches</h4><p className="text-sm text-text-muted">Algoritmo IA encuentra compañeros 3x más rápido.</p></div>
          <div className="text-center"><div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-3"><Shield className="w-7 h-7 text-accent" /></div><h4 className="font-semibold mb-1">100% Verificado</h4><p className="text-sm text-text-muted">Listings verificados con identidad real.</p></div>
          <div className="text-center"><div className="w-14 h-14 rounded-2xl bg-accent-warm/20 flex items-center justify-center mx-auto mb-3"><Zap className="w-7 h-7 text-accent-warm" /></div><h4 className="font-semibold mb-1">Booking Instantáneo</h4><p className="text-sm text-text-muted">Reserva tu piso en segundos.</p></div>
        </div>
      </div>
    </div>
  );
}
