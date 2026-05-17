"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Map as MapIcon, Leaf, Users, AlertCircle , Sparkles} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, AreaChart, Area
} from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ODSCard } from '@/components/badges/ODSBadges';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  icon: any;
  trend: 'up' | 'down';
}

function KPICard({ title, value, change, icon: Icon, trend }: KPICardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col gap-4"
    >
      <div className="flex justify-between items-start">
        <div className="p-3 rounded-2xl bg-primary/20 text-primary">
          <Icon className="w-6 h-6" />
        </div>
        <span className={cn(
          "text-xs font-bold px-2 py-1 rounded-full",
          trend === 'up' ? "bg-emerald-500/20 text-emerald-500" : "bg-red-500/20 text-red-500"
        )}>
          {change}
        </span>
      </div>
      <div>
        <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">{title}</p>
        <h3 className="text-3xl font-bold font-clash">{value}</h3>
      </div>
    </motion.div>
  );
}

export default function DashboardPage() {
  // Real-world simulation data for Valencia
  const priceHistory = [
    { year: '2020', price: 320 },
    { year: '2021', price: 350 },
    { year: '2022', price: 380 },
    { year: '2023', price: 420 },
    { year: '2024', price: 450 },
  ];

  const neighborhoodPrices = [
    { name: 'Ruzafa', price: 480, fill: '#6366F1' },
    { name: 'Beni.', price: 380, fill: '#10B981' },
    { name: 'Carmen', price: 490, fill: '#F59E0B' },
    { name: 'Extram.', price: 350, fill: '#94A3B8' },
    { name: 'Benim.', price: 370, fill: '#6366F1' },
  ];

  const co2Savings = [
    { month: 'Jan', savings: 120 },
    { month: 'Feb', savings: 150 },
    { month: 'Mar', savings: 180 },
    { month: 'Apr', savings: 220 },
    { month: 'May', savings: 260 },
    { month: 'Jun', savings: 300 },
  ];

  return (
    <div className="flex flex-col gap-12 pb-20">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold font-clash">Mercado de Valencia</h1>
        <p className="text-text-muted">Análisis de datos en tiempo real y métricas de sostenibilidad.</p>
      </div>

      {/* Fila 1: KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Precio Medio Hab." value="450€" change="+8.3%" icon={TrendingUp} trend="up" />
        <KPICard title="Barrio Demandado" value="Ruzafa" change="94/100" icon={MapIcon} trend="up" />
        <KPICard title="EcoScore Medio" value="67/100" change="-2.1%" icon={Leaf} trend="down" />
        <KPICard title="Usuarios Activos" value="1,240" change="+12%" icon={Users} trend="up" />
      </div>

      {/* Fila 2: Market Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col gap-6">
          <h3 className="text-xl font-bold font-clash flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" /> Evolución Precios (Valencia)
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="year" stroke="#94A3B8" fontSize={12} />
                <YAxis stroke="#94A3B8" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#13131A', borderColor: '#ffffff20', color: '#F8FAFC' }}
                  itemStyle={{ color: '#6366F1' }}
                />
                <Line type="monotone" dataKey="price" stroke="#6366F1" strokeWidth={3} dot={{ r: 4, fill: '#6366F1' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col gap-6">
          <h3 className="text-xl font-bold font-clash flex items-center gap-2">
            <MapIcon className="w-5 h-5 text-accent" /> Precio Medio por Barrio
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={neighborhoodPrices}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} />
                <YAxis stroke="#94A3B8" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#13131A', borderColor: '#ffffff20', color: '#F8FAFC' }}
                />
                <Bar dataKey="price" radius={[4, 4, 0, 0]}>
                  {neighborhoodPrices.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Fila 3: Sustainability & AI */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col gap-6">
          <h3 className="text-xl font-bold font-clash flex items-center gap-2">
            <Leaf className="w-5 h-5 text-accent" /> Ahorro de CO2 (kg/mes)
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={co2Savings}>
                <defs>
                  <linearGradient id="colorS" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
                <YAxis stroke="#94A3B8" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#13131A', borderColor: '#ffffff20', color: '#F8FAFC' }}
                />
                <Area type="monotone" dataKey="savings" stroke="#10B981" fillOpacity={1} fill="url(#colorS)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-accent/20 border border-white/10 backdrop-blur-xl flex flex-col gap-6">
          <h3 className="text-xl font-bold font-clash flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" /> Insights IA
          </h3>
          <div className="flex flex-col gap-4">
            <div className="p-4 rounded-2xl bg-white/10 border border-white/10 hover:border-primary/50 transition-all">
              <div className="flex items-center gap-2 mb-2 text-accent font-bold text-xs uppercase">
                <TrendingUp className="w-3 h-3" /> Tendencia
              </div>
              <p className="text-sm text-text-primary leading-relaxed">
                La demanda en <span className="text-primary font-bold">Benimaclet</span> ha subido un 12% este mes debido al inicio del curso.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 border border-white/10 hover:border-primary/50 transition-all">
              <div className="flex items-center gap-2 mb-2 text-red-500 font-bold text-xs uppercase">
                <AlertCircle className="w-3 h-3" /> Alerta
              </div>
              <p className="text-sm text-text-primary leading-relaxed">
                Se detecta una subida artificial de precios en <span className="text-primary font-bold">Ruzafa</span>. Ten cuidado con anuncios sospechosos.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ODS Section */}
      <ODSCard />
    </div>
  );
}
