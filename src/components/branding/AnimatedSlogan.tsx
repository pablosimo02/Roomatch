"use client";
import React from "react";
import { motion } from "framer-motion";

export function AnimatedSlogan() {
  const slogan = "Tu piso ideal, con quien te entiende";

  return (
    <div className="relative perspective-[1000px]">
      <motion.div
        initial={{ rotateX: 90, opacity: 0, y: 40 }}
        animate={{ rotateX: 0, opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative"
        style={{ transformStyle: "preserve-3d" }}
      >
        <h2
          className="text-2xl md:text-3xl lg:text-4xl font-clash font-bold text-center leading-tight"
          style={{
            textShadow: "0 0 40px rgba(99,102,241,0.3), 0 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          {slogan.split(" ").map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20, rotateX: -45 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.8 + i * 0.08, duration: 0.6 }}
              className="inline-block mr-2 md:mr-3"
            >
              <span className="bg-gradient-to-r from-primary via-accent to-accent-warm bg-clip-text text-transparent">
                {word}
              </span>
            </motion.span>
          ))}
        </h2>
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/40"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
