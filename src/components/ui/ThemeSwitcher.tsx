"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, X, Check } from 'lucide-react';
import { useTheme, THEMES, type ThemeName } from '@/lib/theme-context';

export default function ThemeSwitcher() {
  const { currentTheme, setTheme, colors } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-slate-900/80 text-white shadow-lg backdrop-blur-md transition-all hover:scale-110 hover:border-white/40"
        aria-label="Cambiar tema"
      >
        <Palette className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: 60, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 60, opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative mx-4 mb-6 w-full max-w-md overflow-hidden rounded-3xl border border-white/15 bg-slate-900/95 p-6 shadow-2xl backdrop-blur-xl sm:mb-0"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-clash text-xl font-bold text-white">Personalizar Tema</h3>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-full p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {(Object.keys(THEMES) as ThemeName[]).map((themeKey) => {
                  const theme = THEMES[themeKey];
                  const isActive = currentTheme === themeKey;

                  return (
                    <button
                      key={themeKey}
                      onClick={() => setTheme(themeKey)}
                      className={`group relative flex flex-col items-center gap-2 rounded-2xl border p-4 transition-all ${
                        isActive
                          ? 'border-white/40 bg-white/10'
                          : 'border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10'
                      }`}
                    >
                      <div className="relative flex h-10 w-10 items-center justify-center">
                        <div
                          className="h-8 w-8 rounded-full border-2 border-white/30 shadow-md transition-transform group-hover:scale-110"
                          style={{ background: theme.gradient }}
                        />
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white"
                          >
                            <Check className="h-3 w-3" style={{ color: theme.primary }} />
                          </motion.div>
                        )}
                      </div>
                      <span className="text-xs font-medium text-white/80">{theme.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/50">Vista previa</p>
                <div className="flex items-center gap-3">
                  <div
                    className="h-8 w-8 rounded-lg"
                    style={{ backgroundColor: colors.primary }}
                  />
                  <div
                    className="h-8 w-8 rounded-lg"
                    style={{ backgroundColor: colors.accent }}
                  />
                  <div
                    className="h-8 w-8 rounded-lg"
                    style={{ backgroundColor: colors.accentWarm }}
                  />
                  <div className="ml-auto h-8 flex-1 rounded-lg border border-dashed border-white/20"
                    style={{ background: colors.gradient }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
