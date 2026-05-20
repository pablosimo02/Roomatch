"use client";
import { useEffect } from 'react';
import { useTheme } from '@/lib/theme-context';

export function ThemeApplier() {
  const { colors } = useTheme();

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary', colors.primary);
    root.style.setProperty('--primary-dark', colors.primaryDark);
    root.style.setProperty('--accent', colors.accent);
    root.style.setProperty('--accent-warm', colors.accentWarm);
    root.style.setProperty('--bg-dark', colors.bgDark);
    root.style.setProperty('--bg-card', colors.bgCard);
    root.style.setProperty('--bg-glass', colors.bgGlass);
    root.style.setProperty('--text-primary', colors.textPrimary);
    root.style.setProperty('--text-muted', colors.textMuted);
    root.style.setProperty('--border', colors.border);
    root.style.setProperty('--gradient-brand', colors.gradient);
    root.style.setProperty('--glow-color', colors.glowColor);

    document.body.style.backgroundColor = colors.bgDark;
    document.body.style.color = colors.textPrimary;
  }, [colors]);

  return null;
}
