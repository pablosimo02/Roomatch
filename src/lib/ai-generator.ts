export async function generateAIListing(data: {
  type: string;
  neighborhood: string;
  price: number;
  amenities: string[];
}) {
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

export function generateAISimulatedResponse(userMessage: string): string {
  const responses = [
    "¡Hola! Sí, la habitación sigue disponible. ¿Te gustaría venir a verla esta semana?",
    "Me parece genial. ¿En qué horario te vendría mejor quedar?",
    "Tengo un perfil muy orientado al estudio, así que busco a alguien tranquilo.",
    "¡Perfecto! Te mando la ubicación exacta por aquí.",
    "Sí, acepto mascotas si son educadas. ¿Tienes algún perro o gato?",
    "El precio incluye gastos de agua e internet, la luz se divide entre nosotros.",
    "Me interesa mucho tu perfil. ¿Cuándo empezamos el trámite?",
    "Hola, estoy fuera de la ciudad ahora mismo, pero puedo hacerte un tour virtual por videollamada.",
    "¡Claro! El barrio es increíble, tienes todo a mano.",
    "Me gustaría saber si eres estudiante de la UV o la UPV."
  ];

  return responses[Math.floor(Math.random() * responses.length)];
}
