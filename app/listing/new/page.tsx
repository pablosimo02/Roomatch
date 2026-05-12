"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Home, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NewListingPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    neighborhood: 'Ruzafa',
  });

  const handlePublish = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);

    setTimeout(() => {
      router.push('/explore');
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 text-center p-6">
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center animate-bounce">
          <CheckCircle2 className="w-10 h-10 text-emerald-500" />
        </div>
        <h1 className="text-4xl font-bold font-clash">¡Anuncio Publicado!</h1>
        <p className="text-text-muted max-w-md">Tu vivienda ahora es visible para miles de estudiantes en Valencia. Hemos optimizado tu anuncio con IA.</p>
        <button onClick={() => router.push('/explore')} className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-all">
          Ver mi anuncio
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold font-clash">Publicar Anuncio</h1>
        <p className="text-text-muted">Sube tu habitación o piso y encuentra al compañero ideal.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col gap-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Home className="w-5 h-5 text-primary" /> Detalles de la Vivienda
          </h2>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-text-muted uppercase">Título del anuncio</label>
              <input
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 outline-none focus:border-primary transition-all"
                placeholder="Ej: Habitación luminosa en Ruzafa"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-text-muted uppercase">Precio (€/mes)</label>
              <input
                type="number"
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 outline-none focus:border-primary transition-all"
                placeholder="450"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-text-muted uppercase">Barrio</label>
              <select
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 outline-none focus:border-primary transition-all"
                value={formData.neighborhood}
                onChange={(e) => setFormData({...formData, neighborhood: e.target.value})}
              >
                <option>Ruzafa</option>
                <option>Benimaclet</option>
                <option>El Carmen</option>
                <option>Campanar</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-accent/20 border border-white/10 backdrop-blur-xl flex flex-col gap-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" /> Asistencia de IA
          </h2>
          <p className="text-sm text-text-muted">Nuestra IA analizará tu descripción para optimizar la visibilidad y detectar posibles errores.</p>
          <button className="p-4 rounded-2xl bg-primary text-white font-bold hover:bg-primary-dark transition-all flex items-center justify-center gap-2">
            <Plus className="w-5 h-5" /> Generar descripción con IA
          </button>
          <div className="p-4 rounded-2 la bg-white/10 border border-white/10 text-xs text-text-muted italic">
            Tip: Los anuncios con fotos reales y EcoScore detallado reciben un 40% más de visitas.
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-all">Cancelar</button>
        <button
          onClick={handlePublish}
          disabled={isSubmitting}
          className="px-6 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
        >
          {isSubmitting ? 'Publicando...' : 'Publicar Anuncio'}
        </button>
      </div>
    </div>
  );
}
