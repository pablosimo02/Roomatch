import React from 'react';
import { motion } from 'framer-motion';
import { Map, User, MessageSquare, LayoutDashboard, Settings, Heart, Home, BarChart3, MessageCircle, Crown } from 'lucide-react';
import Link from 'next/link';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SidebarItem = ({ href, icon: Icon, label, active = false }: { href: string; icon: any; label: string; active?: boolean }) => (
  <Link
    href={href}
    className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group",
      active
        ? "bg-primary text-white shadow-[0_0_20px_rgba(99,102,241,0.3)]"
        : "text-text-muted hover:bg-white/10 hover:text-text-primary"
    )}
  >
    <Icon className={cn("w-5 h-5 transition-colors", active ? "text-white" : "group-hover:text-primary")} />
    <span className="font-medium">{label}</span>
  </Link>
);

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 p-4 hidden lg:flex flex-col gap-6 backdrop-blur-xl bg-white/5 border-r border-white/10 overflow-y-auto">
      <div className="flex flex-col gap-2">
        <p className="px-4 text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Marketplace</p>
        <SidebarItem href="/explore" icon={Map} label="Marketplace" />
        <SidebarItem href="/swipe" icon={Heart} label="Swipe Pisos" />
        <SidebarItem href="/roommates" icon={User} label="Compañeros" />
        <SidebarItem href="/favorites" icon={Heart} label="Favoritos" />
      </div>

      <div className="flex flex-col gap-2">
        <p className="px-4 text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Analytics</p>
        <SidebarItem href="/dashboard" icon={LayoutDashboard} label="Mercado" />
        <SidebarItem href="/looker-dashboard" icon={BarChart3} label="Dashboard Looker" />
      </div>

      <div className="flex flex-col gap-2">
        <p className="px-4 text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Comunidad</p>
        <SidebarItem href="/chat" icon={MessageSquare} label="Mensajes" />
        <SidebarItem href="/social" icon={MessageCircle} label="Social" />
        <SidebarItem href="/profile" icon={User} label="Mi Perfil" />
      </div>

      <div className="flex flex-col gap-2">
        <p className="px-4 text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Premium</p>
        <SidebarItem href="/premium" icon={Crown} label="Planes" />
        <SidebarItem href="/settings" icon={Settings} label="Configuración" />
      </div>

      <div className="mt-auto p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-white/10">
        <p className="text-sm font-medium text-text-primary mb-1">🚀 Premium</p>
        <p className="text-xs text-text-muted mb-3">Desbloquea likes ilimitados y la IA de matching.</p>
        <button className="w-full py-2 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-lg transition-colors">
          Actualizar
        </button>
      </div>
    </aside>
  );
}
