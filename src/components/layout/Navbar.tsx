"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { User, Search, Map, LayoutDashboard, Menu, X, Heart, BarChart3, Crown, MessageCircle } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { RooMatchLogo, RooMatchWordmark } from '@/components/branding/Logo';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const NavItem = ({ href, icon: Icon, label, active = false }: { href: string; icon: React.ComponentType<{ className?: string }>; label: string; active?: boolean }) => (
  <Link
    href={href}
    className={cn(
      "flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200",
      active
        ? "bg-primary/10 text-primary"
        : "text-[#6B7280] hover:bg-gray-100 hover:text-[#1A1A2E]"
    )}
  >
    <Icon className={cn("w-4 h-4", active ? "text-primary" : "")} />
    <span>{label}</span>
  </Link>
);

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
        <div className="group flex items-center gap-2 w-full rounded-full border border-gray-200 bg-gray-50 hover:bg-gray-100 focus-within:bg-white focus-within:border-primary/50 focus-within:shadow-[0_2px_8px_rgba(255,56,92,0.15)] px-4 py-2.5 transition-all duration-300">
          <Search className="w-4 h-4 text-gray-400 group-focus-within:text-primary" />
          <input
            placeholder="Buscar barrio, uni o tipo de piso"
            className="w-full bg-transparent text-sm text-[#1A1A2E] placeholder:text-gray-400 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Link href="/favorites" className="relative p-2 rounded-full hover:bg-gray-100 transition-all">
          <Heart className="w-5 h-5 text-gray-500 hover:text-primary transition-colors" />
        </Link>
        <Link href="/profile" className="w-9 h-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center hover:bg-gray-200 hover:border-primary/30 transition-all">
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
