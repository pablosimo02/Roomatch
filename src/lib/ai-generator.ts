import { Sparkles } from 'lucide-react';

export async function generateAIListing(data: {
  type: string;
  neighborhood: string;
  price: number;
  amenities: string[];
}) {
  // Simulated AI generation as requested
  const titles = [
    `Increíble ${data.type} en el corazón de ${data.neighborhood}`,
    `Habitación moderna y eco-friendly en ${data.neighborhood}`,
    `Oportunidad única: ${data.type} ideal para estudiantes en ${data.neighborhood}`,
  ];

  const selectedTitle = titles[Math.floor(Math.random() * titles.length)];

  const description = `Se alquila ${data.type} espectacular en ${data.neighborhood}.
  Ideal para estudiantes que busquen tranquilidad y comodidad.
  Cuenta con ${data.amenities.join(', ')}.
  Ubicación privilegiada con excelente conexión al transporte público.
  Precio competitivo de ${data.price}€/mes. ¡Contacta para más info!`;

  return {
    title: selectedTitle,
    description: description,
  };
}
