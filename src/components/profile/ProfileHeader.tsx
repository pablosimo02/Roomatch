import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Heart, Award, ShieldCheck, Leaf, Globe } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ProfileHeaderProps {
  user: {
    name: string;
    university: string;
    avatar: string;
    reputation: number;
    ecoScore: number;
    badges: string[];
    bio: string;
  };
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row gap-8 items-start p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
      <div className="relative">
        <div className="w-32 h-32 rounded-full border-4 border-primary p-1 shadow-[0_0_20px_rgba(99,102,241,0.3)]">
          <img src={user.avatar} className="w-full h-full rounded-full object-cover" alt={user.name} />
        </div>
        <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-accent border-2 border-bg-dark flex items-center justify-center">
          <ShieldCheck className="w-3 h-3 text-white" />
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <h1 className="text-4xl font-bold font-clash">{user.name}</h1>
          <div className="flex gap-2">
            {user.badges.map(badge => (
              <span key={badge} className="px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-bold border border-primary/30 uppercase">
                {badge}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 text-text-muted">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-primary" />
            <span className="text-sm">{user.university}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm">Valencia, España</span>
          </div>
        </div>

        <p className="text-text-muted leading-relaxed max-w-2xl">
          {user.bio}
        </p>

        <div className="flex gap-8 mt-4">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold font-clash text-white">{user.reputation}</span>
            <span className="text-[10px] uppercase font-semibold text-text-muted">Reputación</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold font-clash text-accent">{user.ecoScore}</span>
            <span className="text-[10px] uppercase font-semibold text-text-muted">EcoScore</span>
          </div>
        </div>
      </div>
    </div>
  );
}
