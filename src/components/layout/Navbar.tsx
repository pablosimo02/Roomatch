"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { User, Search, Map, LayoutDashboard, Menu, X, Heart, BarChart3, Crown, MessageCircle } from 'lucide-react';
import { RooMatchLogo, RooMatchWordmark } from '@/components/branding/Logo';

const NAV_COLORS: Record<string, { color: string; bg: string; hoverBg: string }> = {
  '/explore': { color: '#0EA5E9', bg: '#0EA5E915', hoverBg: '#0EA5E925' },
  '/swipe': { color: '#FF385C', bg: '#FF385C15', hoverBg: '#FF385C25' },
  '/roommates': { color: '#F59E0B', bg: '#F59E0B15', hoverBg: '#F59E0B25' },
  '/dashboard': { color: '#6366F1', bg: '#6366F115', hoverBg: '#6366F125' },
  '/looker-dashboard': { color: '#3B82F6', bg: '#3B82F615', hoverBg: '#3B82F625' },
  '/social': { color: '#EC4899', bg: '#EC489915', hoverBg: '#EC489925' },
  '/premium': { color: '#8B5CF6', bg: '#8B5CF615', hoverBg: '#8B5CF625' },
  '/chat': { color: '#10B981', bg: '#10B98115', hoverBg: '#10B98125' },
  '/favorites': { color: '#EF4444', bg: '#EF444415', hoverBg: '#EF444425' },
  '/profile': { color: '#14B8A6', bg: '#14B8A615', hoverBg: '#14B8A625' },
};

const NavItem = ({ href, icon: Icon, label, active = false }: { href: string; icon: React.ComponentType<{ className?: string; color?: string }>; label: string; active?: boolean }) => {
  const c = NAV_COLORS[href] || { color: '#6B7280', bg: '#F3F4F6', hoverBg: '#E5E7EB' };
  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:translate-y-[-1px]"
      style={{
        color: active ? c.color : '#6B7280',
        backgroundColor: active ? c.bg : 'transparent',
      }}
    >
      <Icon className="w-4 h-4" color={active ? c.color : undefined} />
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
          <NavItem href="/explore" icon={Map} label="Explore" />
          <NavItem href="/swipe" icon={Map} label="Swipe" />
          <NavItem href="/roommates" icon={User} label="Roommates" />
          <NavItem href="/dashboard" icon={LayoutDashboard} label="Insights" />
          <NavItem href="/looker-dashboard" icon={BarChart3} label="Dashboard Looker" />
          <NavItem href="/social" icon={MessageCircle} label="Social" />
          <NavItem href="/premium" icon={Crown} label="Premium" />
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
          <Heart className="w-5 h-5 text-gray-500 hover:text-[#EF4444] transition-colors" />
        </Link>
        <Link href="/profile" className="w-9 h-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center hover:bg-gray-200 hover:border-[#14B8A6]/50 transition-all">
          <User className="w-4 h-4 text-[#1A1A2E]" />
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
          <NavItem href="/explore" icon={Map} label="Explore" />
          <NavItem href="/swipe" icon={Map} label="Swipe" />
          <NavItem href="/roommates" icon={User} label="Roommates" />
          <NavItem href="/dashboard" icon={LayoutDashboard} label="Insights" />
          <NavItem href="/looker-dashboard" icon={BarChart3} label="Dashboard Looker" />
          <NavItem href="/favorites" icon={Heart} label="Favoritos" />
          <NavItem href="/social" icon={MessageCircle} label="Social" />
          <NavItem href="/premium" icon={Crown} label="Premium" />
          <NavItem href="/profile" icon={User} label="Perfil" />
        </div>
      )}
    </nav>
  );
}
