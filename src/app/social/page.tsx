"use client";
import React from "react";
import { Star, AtSign, ThumbsUp, User } from "lucide-react";
import { motion } from "framer-motion";
import { DEMO_USERS } from "@/lib/mock/users";
import { MOCK_ROOMMATES } from "@/lib/mock/roommates";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} className={`w-4 h-4 ${i <= rating ? "fill-amber-400 text-amber-400" : "text-white/20"}`} />
      ))}
    </div>
  );
}

export default function SocialPage() {
  const [followed, setFollowed] = React.useState<string[]>([]);
  const toggleFollow = (id: string) => setFollowed(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);

  const usersWithProfiles = DEMO_USERS.map(u => {
    const profile = MOCK_ROOMMATES.find(r => r.id === u.id);
    const rating = profile?.compatibilityScore ? Math.round(profile.compatibilityScore / 20) : 3 + Math.floor(Math.random() * 3);
    return { ...u, profile, rating };
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold font-clash bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Comunidad RooMatch
        </h1>
        <p className="text-text-muted mt-1">{DEMO_USERS.length} estudiantes conectados en Valencia</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {usersWithProfiles.map((user, i) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-5 hover:border-primary/30 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-white shrink-0">
                {user.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold truncate">{user.name}</h3>
                  <button
                    onClick={() => toggleFollow(user.id)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all shrink-0 ${
                      followed.includes(user.id) ? "bg-primary text-white" : "bg-white/10 text-text-muted hover:bg-white/20"
                    }`}
                  >
                    {followed.includes(user.id) ? "Siguiendo" : "Seguir"}
                  </button>
                </div>
                <div className="text-xs text-text-muted">{user.email.replace("@example.com", "@uv.es")}</div>
                <div className="text-xs text-primary mt-0.5">{user.role === "student" ? "Estudiante" : "Propietario"}</div>
                <div className="flex items-center gap-2 mt-2">
                  <StarRating rating={user.rating} />
                  <span className="text-xs text-text-muted">{user.rating}/5</span>
                </div>
                {user.profile && (
                  <div className="flex items-center gap-2 mt-2 text-xs text-text-muted">
                    <User className="w-3 h-3" />
                    <span>{user.profile.university}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 mt-1 text-xs text-pink-400">
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
