"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { User, Search, Map, LayoutDashboard, Menu, X, Heart, BarChart3, Crown, MessageCircle } from 'lucide-react';
import { RooMatchLogo, RooMatchWordmark } from '@/components/branding/Logo';

const NAV_ITEMS = [
  { href: '/explore', icon: Map, emoji: '🏠', label: 'Explore', color: '#0EA5E9' },
  { href: '/swipe', icon: Map, emoji: '🔍', label: 'Swipe', color: '#FF385C' },
  { href: '/roommates', icon: User, emoji: '👥', label: 'Roommates', color: '#F59E0B' },
  { href: '/dashboard', icon: LayoutDashboard, emoji: '📈', label: 'Insights', color: '#6366F1' },
  { href: '/looker-dashboard', icon: BarChart3, emoji: '📊', label: 'Dashboard Looker', color: '#3B82F6' },
  { href: '/social', icon: MessageCircle, emoji: '💬', label: 'Social', color: '#EC4899' },
  { href: '/premium', icon: Crown, emoji: '👑', label: 'Premium', color: '#8B5CF6' },
];

const NavItem = ({ href, icon: Icon, emoji, label, color, active = false }: { href: string; icon: React.ComponentType<{ className?: string; color?: string }>; emoji: string; label: string; color: string; active?: boolean }) => {
  return (
    <Link
      href={href}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 hover:translate-y-[-1px] hover:shadow-md"
      style={{
        color: 'white',
        backgroundColor: active ? color : color,
        boxShadow: active ? `0 4px 12px ${color}40` : `0 2px 8px ${color}25`,
      }}
    >
      <span className="text-sm">{emoji}</span>
      <span>{label}</span>
    </Link>
  );
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-4 md:px-6 bg-white border-b border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2 group">
          <RooMatchLogo size="sm" />
          <RooMatchWordmark />
        </Link>

        <div className="hidden xl:flex items-center gap-1">
          {NAV_ITEMS.map(item => (
            <NavItem key={item.href} href={item.href} icon={item.icon} emoji={item.emoji} label={item.label} color={item.color} />
          ))}
        </div>
      </div>

      <div className="hidden md:flex items-center min-w-[280px] max-w-[420px] w-full">
        <div className="group flex items-center gap-2 w-full rounded-full border border-gray-200 bg-gray-50 hover:bg-gray-100 focus-within:bg-white focus-within:border-[#FF385C]/50 focus-within:shadow-[0_2px_8px_rgba(255,56,92,0.15)] px-4 py-2.5 transition-all duration-300">
          <Search className="w-4 h-4 text-gray-400 group-focus-within:text-[#FF385C]" />
          <input
            placeholder="Buscar barrio, uni o tipo de piso"
            className="w-full bg-transparent text-sm text-[#1A1A2E] placeholder:text-gray-400 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Link href="/favorites" className="relative p-2 rounded-full hover:bg-gray-100 transition-all">
          <Heart className="w-5 h-5 text-[#EF4444]" />
        </Link>
        <Link href="/profile" className="w-9 h-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center hover:bg-gray-200 hover:border-[#14B8A6]/50 transition-all">
          <User className="w-4 h-4 text-[#14B8A6]" />
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-[#1A1A2E] hover:bg-gray-100 rounded-lg transition-all"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 p-4 bg-white border-b border-gray-100 shadow-lg flex flex-col gap-1 animate-in slide-in-from-top duration-200 max-h-[80vh] overflow-y-auto">
          {NAV_ITEMS.map(item => (
            <NavItem key={item.href} href={item.href} icon={item.icon} emoji={item.emoji} label={item.label} color={item.color} />
          ))}
          <NavItem href="/favorites" icon={Heart} emoji="❤️" label="Favoritos" color="#EF4444" />
          <NavItem href="/profile" icon={User} emoji="👤" label="Perfil" color="#14B8A6" />
        </div>
      )}
    </nav>
  );
}
