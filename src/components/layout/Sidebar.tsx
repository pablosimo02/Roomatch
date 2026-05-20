import React from 'react';
import { Map, User, MessageSquare, LayoutDashboard, Settings, Heart, BarChart3, MessageCircle, Crown } from 'lucide-react';
import Link from 'next/link';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SidebarItem = ({ href, icon: Icon, label, active = false }: { href: string; icon: React.ComponentType<{ className?: string }>; label: string; active?: boolean }) => (
  <Link
    href={href}
    className={cn(
      "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 text-sm",
      active
        ? "bg-primary/10 text-primary font-semibold"
        : "text-[#6B7280] hover:bg-gray-100 hover:text-[#1A1A2E]"
    )}
  >
    <Icon className={cn("w-4 h-4", active ? "text-primary" : "")} />
    <span>{label}</span>
  </Link>
);

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-16 bottom-0 hidden w-64 flex-col gap-6 overflow-y-auto border-r border-gray-100 bg-white p-4 lg:flex shadow-[1px_0_3px_rgba(0,0,0,0.04)]">
      <div className="flex flex-col gap-1">
        <p className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Marketplace</p>
        <SidebarItem href="/explore" icon={Map} label="Marketplace" />
        <SidebarItem href="/swipe" icon={Heart} label="Swipe Pisos" />
        <SidebarItem href="/roommates" icon={User} label="Compañeros" />
        <SidebarItem href="/favorites" icon={Heart} label="Favoritos" />
      </div>

      <div className="flex flex-col gap-1">
        <p className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Analytics</p>
        <SidebarItem href="/dashboard" icon={LayoutDashboard} label="Mercado" />
        <SidebarItem href="/looker-dashboard" icon={BarChart3} label="Dashboard Looker" />
      </div>

      <div className="flex flex-col gap-1">
        <p className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Comunidad</p>
        <SidebarItem href="/chat" icon={MessageSquare} label="Mensajes" />
        <SidebarItem href="/social" icon={MessageCircle} label="Social" />
        <SidebarItem href="/profile" icon={User} label="Mi Perfil" />
      </div>

      <div className="flex flex-col gap-1">
        <p className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Premium</p>
        <SidebarItem href="/premium" icon={Crown} label="Planes" />
        <SidebarItem href="/settings" icon={Settings} label="Configuración" />
      </div>

      <div className="mt-auto p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
        <p className="text-sm font-semibold text-[#1A1A2E] mb-1">Premium</p>
        <p className="text-xs text-[#6B7280] mb-3">Desbloquea likes ilimitados y la IA de matching.</p>
        <button className="w-full py-2 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-lg transition-colors">
          Actualizar
        </button>
      </div>
    </aside>
  );
}
