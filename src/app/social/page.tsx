"use client";
import React from "react";
import { Star, AtSign, User } from "lucide-react";
import { motion } from "framer-motion";
import { DEMO_USERS } from "@/lib/mock/users";
import { MOCK_ROOMMATES } from "@/lib/mock/roommates";

const PASTEL_BORDERS = [
  'border-rose-200 bg-rose-50/50',
  'border-sky-200 bg-sky-50/50',
  'border-emerald-200 bg-emerald-50/50',
  'border-amber-200 bg-amber-50/50',
  'border-violet-200 bg-violet-50/50',
  'border-pink-200 bg-pink-50/50',
  'border-teal-200 bg-teal-50/50',
  'border-orange-200 bg-orange-50/50',
  'border-indigo-200 bg-indigo-50/50',
  'border-lime-200 bg-lime-50/50',
  'border-cyan-200 bg-cyan-50/50',
  'border-fuchsia-200 bg-fuchsia-50/50',
];

const PASTEL_AVATARS = [
  'from-rose-400 to-pink-500',
  'from-sky-400 to-blue-500',
  'from-emerald-400 to-teal-500',
  'from-amber-400 to-orange-500',
  'from-violet-400 to-purple-500',
  'from-pink-400 to-rose-500',
  'from-teal-400 to-cyan-500',
  'from-orange-400 to-amber-500',
  'from-indigo-400 to-blue-500',
  'from-lime-400 to-green-500',
  'from-cyan-400 to-sky-500',
  'from-fuchsia-400 to-pink-500',
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} className={`w-4 h-4 ${i <= rating ? "fill-amber-400 text-amber-400" : "text-gray-200"}`} />
      ))}
    </div>
  );
}

export default function SocialPage() {
  const [followed, setFollowed] = React.useState<string[]>([]);
  const toggleFollow = (id: string) => setFollowed(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);

  const usersWithProfiles = DEMO_USERS.map((u, idx) => {
    const profile = MOCK_ROOMMATES.find(r => r.id === u.id);
    const rating = profile?.compatibilityScore ? Math.round(profile.compatibilityScore / 20) : 3 + (idx % 3);
    return { ...u, profile, rating, borderIdx: idx % PASTEL_BORDERS.length };
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-clash text-[#1A1A2E]">
          Comunidad RooMatch
        </h1>
        <p className="text-[#6B7280] mt-1">{DEMO_USERS.length} estudiantes conectados en Valencia</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {usersWithProfiles.map((user, i) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className={`rounded-2xl backdrop-blur-xl border-2 p-5 transition-all hover:shadow-md ${PASTEL_BORDERS[user.borderIdx]}`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${PASTEL_AVATARS[user.borderIdx]} flex items-center justify-center font-bold text-white shrink-0 shadow-sm`}>
                {user.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold truncate text-[#1A1A2E]">{user.name}</h3>
                  <button
                    onClick={() => toggleFollow(user.id)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all shrink-0 ${
                      followed.includes(user.id) ? "bg-primary text-white" : "bg-gray-100 text-[#6B7280] hover:bg-gray-200"
                    }`}
                  >
                    {followed.includes(user.id) ? "Siguiendo" : "Seguir"}
                  </button>
                </div>
                <div className="text-xs text-[#6B7280]">{user.email}</div>
                <div className="text-xs text-primary mt-0.5 font-medium">{user.role === "student" ? "Estudiante" : "Propietario"}</div>
                <div className="flex items-center gap-2 mt-2">
                  <StarRating rating={user.rating} />
                  <span className="text-xs text-[#6B7280]">{user.rating}/5</span>
                </div>
                {user.profile && (
                  <div className="flex items-center gap-2 mt-2 text-xs text-[#6B7280]">
                    <User className="w-3 h-3" />
                    <span>{user.profile.university}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 mt-1 text-xs text-primary/70">
                  <AtSign className="w-3 h-3" />
                  <span>@{user.name.toLowerCase().replace(/\s+/g, "")}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
