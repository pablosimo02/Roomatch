"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { User, Map, MessageSquare, LayoutDashboard, Settings, Menu, X } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const NavItem = ({ href, icon: Icon, label, active = false }: { href: string; icon: any; label: string; active?: boolean }) => (
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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 backdrop-blur-xl bg-white/5 border-b border-white/10 text-text-primary">
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.4)] group-hover:scale-110 transition-transform">
            <span className="text-white font-bold text-xl">R</span>
          </div>
          <span className="text-xl font-bold tracking-tight font-clash">RooMatch</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          <NavItem href="/explore" icon={Map} label="Explore" />
          <NavItem href="/swipe" icon={Map} label="Swipe" />
          <NavItem href="/roommates" icon={User} label="Roommates" />
          <NavItem href="/dashboard" icon={LayoutDashboard} label="Insights" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Link href="/profile" className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all">
          <User className="w-5 h-5 text-text-primary" />
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-text-primary hover:bg-white/10 rounded-lg transition-all"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 p-4 bg-bg-card border-b border-white/10 backdrop-blur-2xl flex flex-col gap-2 animate-in slide-in-from-top duration-200">
          <NavItem href="/explore" icon={Map} label="Explore" />
          <NavItem href="/swipe" icon={Map} label="Swipe" />
          <NavItem href="/roommates" icon={User} label="Roommates" />
          <NavItem href="/dashboard" icon={LayoutDashboard} label="Insights" />
          <NavItem href="/profile" icon={User} label="Perfil" />
        </div>
      )}
    </nav>
  );
}
