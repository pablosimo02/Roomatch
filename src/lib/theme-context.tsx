"use client";
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

export type ThemeName = 'ocean' | 'forest' | 'sunset' | 'violet' | 'rose' | 'midnight';

export interface ThemeColors {
  name: ThemeName;
  label: string;
  primary: string;
  primaryDark: string;
  accent: string;
  accentWarm: string;
  bgDark: string;
  bgCard: string;
  bgGlass: string;
  textPrimary: string;
  textMuted: string;
  border: string;
  gradient: string;
  glowColor: string;
}

export const THEMES: Record<ThemeName, ThemeColors> = {
  ocean: {
    name: 'ocean',
    label: 'Océano',
    primary: '#0ea5e9',
    primaryDark: '#0369a1',
    accent: '#f97316',
    accentWarm: '#f59e0b',
    bgDark: '#070b14',
    bgCard: '#111b2f',
    bgGlass: 'rgba(255, 255, 255, 0.1)',
    textPrimary: '#f8fbff',
    textMuted: '#a3b2cd',
    border: 'rgba(148, 163, 184, 0.24)',
    gradient: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 50%, #f97316 100%)',
    glowColor: 'rgba(14, 165, 233, 0.25)',
  },
  forest: {
    name: 'forest',
    label: 'Bosque',
    primary: '#22c55e',
    primaryDark: '#15803d',
    accent: '#0ea5e9',
    accentWarm: '#f59e0b',
    bgDark: '#0a0f0c',
    bgCard: '#121f18',
    bgGlass: 'rgba(255, 255, 255, 0.08)',
    textPrimary: '#f0fdf4',
    textMuted: '#9ca3af',
    border: 'rgba(148, 163, 184, 0.2)',
    gradient: 'linear-gradient(135deg, #22c55e 0%, #0ea5e9 50%, #f59e0b 100%)',
    glowColor: 'rgba(34, 197, 94, 0.25)',
  },
  sunset: {
    name: 'sunset',
    label: 'Atardecer',
    primary: '#f97316',
    primaryDark: '#c2410c',
    accent: '#eab308',
    accentWarm: '#f59e0b',
    bgDark: '#0f0a07',
    bgCard: '#1f1510',
    bgGlass: 'rgba(255, 255, 255, 0.08)',
    textPrimary: '#fff7ed',
    textMuted: '#b8a99a',
    border: 'rgba(148, 163, 184, 0.2)',
    gradient: 'linear-gradient(135deg, #f97316 0%, #ef4444 50%, #eab308 100%)',
    glowColor: 'rgba(249, 115, 22, 0.25)',
  },
  violet: {
    name: 'violet',
    label: 'Violeta',
    primary: '#8b5cf6',
    primaryDark: '#6d28d9',
    accent: '#ec4899',
    accentWarm: '#f59e0b',
    bgDark: '#0c0a14',
    bgCard: '#16122a',
    bgGlass: 'rgba(255, 255, 255, 0.08)',
    textPrimary: '#faf5ff',
    textMuted: '#a78bfa',
    border: 'rgba(148, 163, 184, 0.2)',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #f59e0b 100%)',
    glowColor: 'rgba(139, 92, 246, 0.25)',
  },
  rose: {
    name: 'rose',
    label: 'Rosa',
    primary: '#f43f5e',
    primaryDark: '#be123c',
    accent: '#8b5cf6',
    accentWarm: '#f59e0b',
    bgDark: '#0f0a0e',
    bgCard: '#1f1218',
    bgGlass: 'rgba(255, 255, 255, 0.08)',
    textPrimary: '#fff1f2',
    textMuted: '#c4a0b0',
    border: 'rgba(148, 163, 184, 0.2)',
    gradient: 'linear-gradient(135deg, #f43f5e 0%, #8b5cf6 50%, #f59e0b 100%)',
    glowColor: 'rgba(244, 63, 94, 0.25)',
  },
  midnight: {
    name: 'midnight',
    label: 'Medianoche',
    primary: '#6366f1',
    primaryDark: '#4f46e5',
    accent: '#10b981',
    accentWarm: '#f59e0b',
    bgDark: '#0a0a0f',
    bgCard: '#13131a',
    bgGlass: 'rgba(255, 255, 255, 0.05)',
    textPrimary: '#f8fafc',
    textMuted: '#94a3b8',
    border: 'rgba(255, 255, 255, 0.08)',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #10b981 50%, #f59e0b 100%)',
    glowColor: 'rgba(99, 102, 241, 0.25)',
  },
};

interface ThemeContextType {
  currentTheme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: 'ocean',
  setTheme: () => {},
  colors: THEMES.ocean,
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>('ocean');

  useEffect(() => {
    const saved = localStorage.getItem('roomatch-theme') as ThemeName | null;
    if (saved && THEMES[saved]) {
      setCurrentTheme(saved);
    }
  }, []);

  const setTheme = useCallback((theme: ThemeName) => {
    setCurrentTheme(theme);
    localStorage.setItem('roomatch-theme', theme);
  }, []);

  const colors = THEMES[currentTheme];

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}
