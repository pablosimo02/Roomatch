"use client";
import React from 'react';
import { ThemeProvider } from '@/lib/theme-context';
import { AuthProvider } from '@/lib/auth-context';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';
import { ThemeApplier } from '@/components/ui/ThemeApplier';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ThemeApplier />
        {children}
        <ThemeSwitcher />
      </ThemeProvider>
    </AuthProvider>
  );
}
