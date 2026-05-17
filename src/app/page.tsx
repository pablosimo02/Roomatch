"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Map, User, Leaf, ShieldCheck, Sparkles, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { ODSRow } from '@/components/badges/ODSBadges';

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
            <stop stopColor="#6366F1" /><stop offset="1" stopColor="#10B981" />
          </linearGradient>
        </defs>
        <rect x="4" y="4" width="72" height="72" rx="20" fill="url(#g)" />
        <path d="M40 20L24 34V56H34V44H46V56H56V34L40 20Z" fill="white" opacity="0.95" />
        <path d="M40 42C40 42 30 35 30 29C30 25.5 33 23 36 23C37.6 23 39 24 40 25C41 24 42.4 23 44 23C47 23 50 25.5 50 29C50 35 40 42 40 42Z" fill="#6366F1" opacity="0.9" />
        <text x="40" y="64" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="system-ui">R</text>
      </svg>
    </motion.div>
  );
}

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-24 pb-20">
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center gap-8">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/20 blur-[120px]" />
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 max-w-4xl px-4">
          <div className="flex justify-center mb-8">
            <AnimatedLogo />
          </div>
          <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-primary text-sm font-bold mb-6 inline-block backdrop-blur-md">
            Lanzamiento 2026 en Valencia
          </span>
          <h1 className="text-5xl md:text-7xl font-bold font-clash tracking-tight leading-tight mb-6">
            Encuentra tu piso.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Encuentra tu gente.</span>
          </h1>
          <h2 className="text-xl md:text-2xl text-accent font-clash font-semibold mb-8" style={{ textShadow: "0 0 30px rgba(99,102,241,0.3)" }}>
            Tu piso ideal, con quien te entiende
          </h2>
          <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
            La primera plataforma de vivienda universitaria en Valencia que combina matching inteligente, sostenibilidad y seguridad real.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/explore" className="px-8 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-2xl transition-all hover:scale-105 shadow-[0_0_30px_rgba(99,102,241,0.4)]">Busco piso</Link>
            <Link href="/listing/new" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl border border-white/20 transition-all backdrop-blur-md">Tengo un piso</Link>
          </div>
          <div className="mt-12 flex justify-center"><ODSRow /></div>
        </motion.div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: Map, title: "Marketplace Inteligente", desc: "Filtra por barrio, precio y EcoScore. Encuentra la ubicación perfecta cerca de tu universidad." },
          { icon: User, title: "Matching de Compañeros", desc: "Swipea perfiles basados en hábitos de limpieza, horarios y valores." },
          { icon: Leaf, title: "Sostenibilidad Real", desc: "Calculamos el EcoScore de cada vivienda basándonos en transporte, energía y huella de CO2." },
          { icon: ShieldCheck, title: "Anti-Fraude IA", desc: "Nuestra IA analiza cada anuncio para detectar estafas y verificar propietarios." },
          { icon: Sparkles, title: "Asistente IA", desc: "Chatbot experto que te ayuda a elegir el mejor barrio según tu presupuesto." },
          { icon: LayoutDashboard, title: "Data Dashboard", desc: "Analiza la evolución de precios y demanda en tiempo real por cada barrio." },
        ].map((f, i) => (
          <motion.div key={i} whileHover={{ scale: 1.02 }} className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-primary/50 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors"><f.icon className="w-6 h-6 text-primary" /></div>
            <h3 className="text-xl font-bold font-clash mb-3">{f.title}</h3>
            <p className="text-text-muted leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
