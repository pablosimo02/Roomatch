import { NextResponse } from "next/server";
import { AIRequestSchema, ListingInputSchema, validateAndSanitize } from "@/lib/security/validation";
import { verifyFirebaseToken } from "@/lib/security/firebase-admin";

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Token de autenticación requerido" }, { status: 401 });
    }

    const token = authHeader.split("Bearer ")[1];
    const user = await verifyFirebaseToken(token);
    if (!user) {
      return NextResponse.json({ error: "Token inválido o expirado" }, { status: 401 });
    }

    const body = await request.json();
    const validation = validateAndSanitize(AIRequestSchema, body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const { type, neighborhood, price, message } = validation.data;

    if (type === "listing") {
      const listingValidation = validateAndSanitize(ListingInputSchema, {
        title: `Anuncio generado en ${neighborhood || "Valencia"}`,
        price: price || 450,
        neighborhood: neighborhood || "Ruzafa",
      });
      if (!listingValidation.success) {
        return NextResponse.json({ error: listingValidation.error }, { status: 400 });
      }

      const titles = [
        `Increíble vivienda en el corazón de ${neighborhood || "Valencia"}`,
        `Habitación moderna y eco-friendly en ${neighborhood || "Valencia"}`,
        `Oportunidad única: ideal para estudiantes en ${neighborhood || "Valencia"}`,
      ];

      return NextResponse.json({
        success: true,
        data: {
          title: titles[Math.floor(Math.random() * titles.length)],
          description: `Se alquila vivienda espectacular en ${neighborhood || "Valencia"}. Ideal para estudiantes. Precio competitivo de ${price || 450}€/mes.`,
        },
      });
    }

    const chatResponses = [
      "¡Hola! Sí, la habitación sigue disponible. ¿Te gustaría venir a verla esta semana?",
      "Me parece genial. ¿En qué horario te vendría mejor quedar?",
      "Tengo un perfil muy orientado al estudio, así que busco a alguien tranquilo.",
      "¡Perfecto! Te mando la ubicación exacta por aquí.",
      "Sí, acepto mascotas si son educadas. ¿Tienes algún perro o gato?",
      "El precio incluye gastos de agua e internet, la luz se divide entre nosotros.",
    ];

    const lowerMsg = (message || "").toLowerCase();
    let aiResponse = chatResponses[Math.floor(Math.random() * chatResponses.length)];
    if (lowerMsg.includes("precio")) {
      aiResponse = "Los precios varían. Ruzafa ~480€, Benimaclet ~380€. ¿Cuál es tu presupuesto?";
    }

    return NextResponse.json({
      success: true,
      data: {
        response: aiResponse,
        userId: user.uid,
      },
    });
  } catch {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
