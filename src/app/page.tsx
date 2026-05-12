"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Map, User, Leaf, ShieldCheck, Sparkles, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-24 pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center gap-8">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/20 blur-[120px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-4xl px-4"
        >
          <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-primary text-sm font-bold mb-6 inline-block backdrop-blur-md">
            🚀 Lanzamiento 2026 en Valencia
          </span>
          <h1 className="text-6xl md:text-8xl font-bold font-clash tracking-tight leading-tight mb-6">
            Encuentra tu piso.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Encuentra tu gente.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
            La primera plataforma de vivienda universitaria en Valencia que combina matching inteligente,
            sostenibilidad y seguridad real. No busques solo una habitación, encuentra tu comunidad.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/explore"
              className="px-8 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-2xl transition-all hover:scale-105 shadow-[0_0_30px_rgba(99,102,241,0.4)]"
            >
              Busco piso
            </Link>
            <Link
              href="/listing/new"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl border border-white/20 transition-all backdrop-blur-md"
            >
              Tengo un piso
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard
          icon={Map}
          title="Marketplace Inteligente"
          description="Filtra por barrio, precio y EcoScore. Encuentra la ubicación perfecta cerca de la UV o UPV."
        />
        <FeatureCard
          icon={User}
          title="Matching de Compañeros"
          description="No más sorpresas. Swipea perfiles basados en hábitos de limpieza, horarios y valores."
        />
        <FeatureCard
          icon={Leaf}
          title="Sostenibilidad Real"
          description="Calculamos el EcoScore de cada vivienda basándonos en transporte, energía y huella de CO2."
        />
        <FeatureCard
          icon={ShieldCheck}
          title="Anti-Fraude IA"
          description="Nuestra IA analiza cada anuncio para detectar estafas y verificar propietarios reales."
        />
        <FeatureCard
          icon={Sparkles}
          title="Asistente IA"
          description="Chatbot experto en Valencia que te ayuda a elegir el mejor barrio según tu presupuesto."
        />
        <FeatureCard
          icon={LayoutDashboard}
          title="Data Dashboard"
          description="Analiza la evolución de precios y la demanda en tiempo real por cada barrio de la ciudad."
        />
      </section>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-primary/50 transition-all group"
    >
      <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-xl font-bold font-clash mb-3">{title}</h3>
      <p className="text-text-muted leading-relaxed">{description}</p>
    </motion.div>
  );
}
