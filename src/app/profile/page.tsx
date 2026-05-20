import React from 'react';
import ProfileHeader from '@/components/profile/ProfileHeader';

const MOCK_USER = {
  name: 'Pablo UV',
  university: 'Universidad de Valencia',
  avatar: 'https://picsum.photos/seed/fallback/800/600',
  reputation: 98,
  ecoScore: 85,
  badges: ['Verificado', 'Eco-Friendly', 'Top Roommate'],
  bio: 'Estudiante de Ingeniería Informática. Apasionado por la sostenibilidad y el código limpio. Busco un ambiente tranquilo para estudiar y compartir la vida en Valencia.',
};

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-12 pb-20">
      <ProfileHeader user={MOCK_USER} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <h3 className="text-xl font-bold font-clash mb-6">Mis Anuncios</h3>
            <div className="flex flex-col gap-4 text-text-muted italic">
              No tienes anuncios activos actualmente.
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <h3 className="text-xl font-bold font-clash mb-6">Reviews Recibidas</h3>
            <div className="flex flex-col gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-sm italic">&quot;Gran compañero, muy respetuoso con la limpieza y los horarios.&quot;</p>
                <span className="text-xs text-primary font-bold mt-2 block">— Sarah E.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="p-8 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 border border-white/10 backdrop-blur-xl">
            <h3 className="text-lg font-bold font-clash mb-4">Impacto Sostenible</h3>
            <p className="text-sm text-text-muted mb-4">Has ahorrado aprox. 120kg de CO2 este año al compartir vivienda.</p>
            <div className="text-3xl font-bold text-accent">Lvl 4 Eco-Warrior</div>
          </div>
        </div>
      </div>
    </div>
  );
}
