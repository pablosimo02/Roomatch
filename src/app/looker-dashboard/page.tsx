"use client";
import React from "react";

export default function LookerDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold font-clash bg-gradient-to-r from-primary via-accent to-accent-warm bg-clip-text text-transparent">
            Dashboard Looker Studio
          </h1>
          <p className="text-text-muted mt-1">
            Visualizaciones interactivas del mercado de alquiler en Valencia — datos actualizados automáticamente en tiempo real desde Looker Studio.
          </p>
        </div>
      </div>

      <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden p-2">
        <iframe
          src="https://datastudio.google.com/u/0/reporting/e0233868-e714-4020-aaa5-6eead7d376c2/page/HRHyF"
          width="100%"
          height="900"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen
        />
      </div>
    </div>
  );
}
