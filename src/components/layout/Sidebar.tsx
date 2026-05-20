import React from 'react';
import { Map, User, MessageSquare, LayoutDashboard, Settings, Heart, BarChart3, MessageCircle, Crown } from 'lucide-react';
import Link from 'next/link';

const SIDEBAR_COLORS: Record<string, { color: string; bg: string }> = {
  '/explore': { color: '#0EA5E9', bg: '#0EA5E915' },
  '/swipe': { color: '#FF385C', bg: '#FF385C15' },
  '/roommates': { color: '#F59E0B', bg: '#F59E0B15' },
  '/dashboard': { color: '#6366F1', bg: '#6366F115' },
  '/looker-dashboard': { color: '#3B82F6', bg: '#3B82F615' },
  '/social': { color: '#EC4899', bg: '#EC489915' },
  '/premium': { color: '#8B5CF6', bg: '#8B5CF615' },
  '/chat': { color: '#10B981', bg: '#10B98115' },
  '/favorites': { color: '#EF4444', bg: '#EF444415' },
  '/profile': { color: '#14B8A6', bg: '#14B8A615' },
};

const SidebarItem = ({ href, icon: Icon, label, active = false }: { href: string; icon: React.ComponentType<{ className?: string; color?: string }>; label: string; active?: boolean }) => {
  const c = SIDEBAR_COLORS[href] || { color: '#6B7280', bg: 'transparent' };
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 text-sm hover:translate-y-[-1px]"
      style={{
        color: active ? c.color : '#6B7280',
        backgroundColor: active ? c.bg : 'transparent',
        fontWeight: active ? 600 : 400,
      }}
    >
      <Icon className="w-4 h-4" color={active ? c.color : undefined} />
      <span>{label}</span>
    </Link>
  );
};

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

      <div className="mt-auto p-4 rounded-2xl bg-gradient-to-br from-[#FF385C]/10 to-[#0EA5E9]/10 border border-[#FF385C]/20">
        <p className="text-sm font-semibold text-[#1A1A2E] mb-1">Premium</p>
        <p className="text-xs text-[#6B7280] mb-3">Desbloquea likes ilimitados y la IA de matching.</p>
        <button className="w-full py-2 bg-[#FF385C] hover:bg-[#E31C5F] text-white text-xs font-bold rounded-lg transition-colors">
          Actualizar
        </button>
      </div>
    </aside>
  );
}
