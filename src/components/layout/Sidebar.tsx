import React from 'react';
import { Map, User, MessageSquare, LayoutDashboard, Settings, Heart, BarChart3, MessageCircle, Crown } from 'lucide-react';
import Link from 'next/link';

const SIDEBAR_ITEMS = [
  { section: 'Marketplace', items: [
    { href: '/explore', icon: Map, label: 'Marketplace', color: '#0EA5E9' },
    { href: '/swipe', icon: Heart, label: 'Swipe Pisos', color: '#FF385C' },
    { href: '/roommates', icon: User, label: 'Compañeros', color: '#F59E0B' },
    { href: '/favorites', icon: Heart, label: 'Favoritos', color: '#EF4444' },
  ]},
  { section: 'Analytics', items: [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Mercado', color: '#6366F1' },
    { href: '/looker-dashboard', icon: BarChart3, label: 'Dashboard Looker', color: '#3B82F6' },
  ]},
  { section: 'Comunidad', items: [
    { href: '/chat', icon: MessageSquare, label: 'Mensajes', color: '#10B981' },
    { href: '/social', icon: MessageCircle, label: 'Social', color: '#EC4899' },
    { href: '/profile', icon: User, label: 'Mi Perfil', color: '#14B8A6' },
  ]},
  { section: 'Premium', items: [
    { href: '/premium', icon: Crown, label: 'Planes', color: '#8B5CF6' },
    { href: '/settings', icon: Settings, label: 'Configuración', color: '#6B7280' },
  ]},
];

const SidebarItem = ({ href, icon: Icon, label, color, active = false }: { href: string; icon: React.ComponentType<{ className?: string; color?: string }>; label: string; color: string; active?: boolean }) => {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 text-sm hover:translate-y-[-1px]"
      style={{
        color: color,
        backgroundColor: active ? `${color}18` : 'transparent',
        fontWeight: active ? 600 : 400,
      }}
    >
      <Icon className="w-4 h-4" color={color} />
      <span>{label}</span>
    </Link>
  );
};

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-16 bottom-0 hidden w-64 flex-col gap-6 overflow-y-auto border-r border-gray-100 bg-white p-4 lg:flex shadow-[1px_0_3px_rgba(0,0,0,0.04)]">
      {SIDEBAR_ITEMS.map(section => (
        <div key={section.section} className="flex flex-col gap-1">
          <p className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{section.section}</p>
          {section.items.map(item => (
            <SidebarItem key={item.href} href={item.href} icon={item.icon} label={item.label} color={item.color} />
          ))}
        </div>
      ))}

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
