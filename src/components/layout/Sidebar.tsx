import React from 'react';
import { Map, User, MessageSquare, LayoutDashboard, Settings, Heart, BarChart3, MessageCircle, Crown } from 'lucide-react';
import Link from 'next/link';

const SIDEBAR_ITEMS = [
  { section: 'Marketplace', items: [
    { href: '/explore', icon: Map, emoji: '🏠', label: 'Marketplace', color: '#0EA5E9' },
    { href: '/swipe', icon: Heart, emoji: '🔍', label: 'Swipe Pisos', color: '#FF385C' },
    { href: '/roommates', icon: User, emoji: '👥', label: 'Compañeros', color: '#F59E0B' },
    { href: '/favorites', icon: Heart, emoji: '❤️', label: 'Favoritos', color: '#EF4444' },
  ]},
  { section: 'Analytics', items: [
    { href: '/dashboard', icon: LayoutDashboard, emoji: '📈', label: 'Mercado', color: '#6366F1' },
    { href: '/looker-dashboard', icon: BarChart3, emoji: '📊', label: 'Dashboard Looker', color: '#3B82F6' },
  ]},
  { section: 'Comunidad', items: [
    { href: '/chat', icon: MessageSquare, emoji: '💬', label: 'Mensajes', color: '#10B981' },
    { href: '/social', icon: MessageCircle, emoji: '🌐', label: 'Social', color: '#EC4899' },
    { href: '/profile', icon: User, emoji: '👤', label: 'Mi Perfil', color: '#14B8A6' },
  ]},
  { section: 'Premium', items: [
    { href: '/premium', icon: Crown, emoji: '👑', label: 'Planes', color: '#8B5CF6' },
    { href: '/settings', icon: Settings, emoji: '⚙️', label: 'Configuración', color: '#6B7280' },
  ]},
];

const SidebarItem = ({ href, icon: Icon, emoji, label, color, active = false }: { href: string; icon: React.ComponentType<{ className?: string; color?: string }>; emoji: string; label: string; color: string; active?: boolean }) => {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-200 text-sm font-bold hover:translate-y-[-1px] hover:shadow-md"
      style={{
        color: 'white',
        backgroundColor: active ? color : color,
        boxShadow: active ? `0 4px 12px ${color}40` : `0 2px 8px ${color}25`,
      }}
    >
      <span className="text-base">{emoji}</span>
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
            <SidebarItem key={item.href} href={item.href} icon={item.icon} emoji={item.emoji} label={item.label} color={item.color} />
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
