import React from "react";

export function RooMatchLogo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: 32, md: 40, lg: 56 };
  const s = sizes[size];

  return (
    <svg width={s} height={s} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <defs>
        <linearGradient id="g2" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366F1" /><stop offset="1" stopColor="#10B981" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="72" height="72" rx="20" fill="url(#g2)" />
      <path d="M40 20L24 34V56H34V44H46V56H56V34L40 20Z" fill="white" opacity="0.95" />
      <path d="M40 42C40 42 30 35 30 29C30 25.5 33 23 36 23C37.6 23 39 24 40 25C41 24 42.4 23 44 23C47 23 50 25.5 50 29C50 35 40 42 40 42Z" fill="#6366F1" opacity="0.9" />
      <text x="40" y="64" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="system-ui">R</text>
    </svg>
  );
}

export function RooMatchWordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`text-xl font-bold tracking-tight font-clash ${className}`}>
      Roo<span className="text-primary">Match</span>
    </span>
  );
}

export function RooMatchFullLogo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  return (
    <div className="flex items-center gap-2">
      <RooMatchLogo size={size} />
      <RooMatchWordmark />
    </div>
  );
}
