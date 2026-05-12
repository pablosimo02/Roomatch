import React from 'react';
import { motion } from 'framer-motion';
import { User, GraduationCap, Sparkles } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface RoommateCardProps {
  user: {
    name: string;
    university: string;
    bio: string;
    interests: string[];
    avatar: string;
    compatibilityScore: number;
    compatibilityBreakdown: { [key: string]: number };
  };
}

export default function RoommateCard({ user }: RoommateCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative w-full h-full max-w-md mx-auto rounded-3xl overflow-hidden bg-bg-card border border-white/10 shadow-2xl"
    >
      <div className="relative h-80 w-full overflow-hidden">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary text-white text-xs font-bold shadow-lg">
          {user.compatibilityScore}% Match
        </div>
      </div>

      <div className="p-6 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-bold font-clash">{user.name}</h3>
            <div className="flex items-center gap-2 text-text-muted text-sm">
              <GraduationCap className="w-4 h-4 text-primary" />
              <span>{user.university}</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
             <Sparkles className="w-5 h-5 text-accent" />
          </div>
        </div>

        <p className="text-text-muted text-sm leading-relaxed line-clamp-2">
          {user.bio}
        </p>

        <div className="flex flex-wrap gap-2">
          {user.interests.map(interest => (
            <span key={interest} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-text-primary">
              {interest}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
