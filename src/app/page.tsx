"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Map, User, Leaf, ShieldCheck, Sparkles, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { ODSRow } from '@/components/badges/ODSBadges';

const FEATURES = [
  { icon: Map, emoji: '🏠', title: "Marketplace Inteligente", desc: "Filtra por barrio, precio y EcoScore. Encuentra la ubicación perfecta cerca de tu universidad.", color: '#0EA5E9' },
  { icon: User, emoji: '👥', title: "Matching de Compañeros", desc: "Swipea perfiles basados en hábitos de limpieza, horarios y valores.", color: '#F59E0B' },
  { icon: Leaf, emoji: '🌿', title: "Sostenibilidad Real", desc: "Calculamos el EcoScore de cada vivienda basándonos en transporte, energía y huella de CO2.", color: '#10B981' },
  { icon: ShieldCheck, emoji: '🛡️', title: "Anti-Fraude IA", desc: "Nuestra IA analiza cada anuncio para detectar estafas y verificar propietarios.", color: '#6366F1' },
  { icon: Sparkles, emoji: '🤖', title: "Asistente IA", desc: "Chatbot experto que te ayuda a elegir el mejor barrio según tu presupuesto.", color: '#EC4899' },
  { icon: LayoutDashboard, emoji: '📊', title: "Data Dashboard", desc: "Analiza la evolución de precios y demanda en tiempo real por cada barrio.", color: '#3B82F6' },
];

function AnimatedLogo() {
  return (
    <motion.div
      animate={{ rotateY: 360 }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      style={{ transformStyle: "preserve-3d" }}
      className="inline-block"
    >
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF385C" /><stop offset="1" stopColor="#10B981" />
          </linearGradient>
        </defs>
        <rect x="4" y="4" width="72" height="72" rx="20" fill="url(#g)" />
        <path d="M40 20L24 34V56H34V44H46V56H56V34L40 20Z" fill="white" opacity="0.95" />
        <path d="M40 42C40 42 30 35 30 29C30 25.5 33 23 36 23C37.6 23 39 24 40 25C41 24 42.4 23 44 23C47 23 50 25.5 50 29C50 35 40 42 40 42Z" fill="#FF385C" opacity="0.9" />
        <text x="40" y="64" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="system-ui">R</text>
      </svg>
    </motion.div>
  );
}

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-24 pb-20">
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center gap-8 overflow-hidden rounded-3xl bg-gradient-to-br from-[#EEF2FF] to-[#F0FDF4] -mx-6 -mt-6 px-6 pt-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-[15%] left-[10%] w-24 h-24 rounded-2xl bg-[#FF385C]/10 blur-sm" />
          <motion.div animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-[25%] right-[15%] w-32 h-32 rounded-full bg-[#10B981]/10 blur-sm" />
          <motion.div animate={{ y: [0, -10, 0], scale: [1, 1.1, 1] }} transition={{ duration: 5, repeat: Infinity }} className="absolute bottom-[20%] left-[20%] w-20 h-20 rounded-xl bg-[#0EA5E9]/10 blur-sm" />
          <motion.div animate={{ y: [0, 20, 0], rotate: [0, 8, 0] }} transition={{ duration: 7, repeat: Infinity }} className="absolute bottom-[30%] right-[25%] w-28 h-28 rounded-3xl bg-[#F59E0B]/10 blur-sm" />
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 max-w-4xl px-4">
          <div className="flex justify-center mb-8">
            <AnimatedLogo />
          </div>
          <span className="px-4 py-1.5 rounded-full bg-white border border-gray-200 text-[#FF385C] text-sm font-bold mb-6 inline-block shadow-sm">
            Lanzamiento 2026 en Valencia
          </span>
          <h1 className="text-5xl md:text-7xl font-bold font-clash tracking-tight leading-tight mb-6 text-[#1A1A2E]">
            Encuentra tu piso.<br />
            <span className="gradient-text">Encuentra tu gente.</span>
          </h1>
          <h2 className="text-xl md:text-2xl text-[#6B7280] font-clash font-semibold mb-8">
            Tu piso ideal, con quien te entiende
          </h2>
          <p className="text-lg md:text-xl text-[#6B7280] max-w-2xl mx-auto mb-10 leading-relaxed">
            La primera plataforma de vivienda universitaria en Valencia que combina matching inteligente, sostenibilidad y seguridad real.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/explore" className="px-8 py-4 bg-[#FF385C] hover:bg-[#E31C5F] text-white font-bold rounded-2xl transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(255,56,92,0.3)]">Busco piso</Link>
            <Link href="/listing/new" className="px-8 py-4 bg-white hover:bg-gray-50 text-[#1A1A2E] font-bold rounded-2xl border border-gray-200 transition-all hover:-translate-y-0.5 hover:shadow-lg">Tengo un piso</Link>
          </div>
          <div className="mt-12 flex justify-center"><ODSRow /></div>
        </motion.div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {FEATURES.map((f, i) => (
          <motion.div key={i} whileHover={{ y: -6 }} transition={{ duration: 0.25 }} className="group rounded-2xl bg-white p-8 border border-gray-100 shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition-all">
            <div className="relative mb-6">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all shadow-lg" style={{ backgroundColor: `${f.color}20`, boxShadow: `0 8px 24px ${f.color}25` }}>
                <span className="text-3xl filter drop-shadow-sm">{f.emoji}</span>
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: f.color }}>
                <f.icon className="w-3 h-3 text-white" strokeWidth={2.5} />
              </div>
            </div>
            <h3 className="text-xl font-bold font-clash mb-3 text-[#1A1A2E]" style={{ fontWeight: 800 }}>{f.title}</h3>
            <p className="text-[#6B7280] leading-relaxed text-base">{f.desc}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
