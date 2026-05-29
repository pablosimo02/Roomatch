import { NextResponse } from "next/server";
import { ChatMessageSchema, validateAndSanitize } from "@/lib/security/validation";
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
    const validation = validateAndSanitize(ChatMessageSchema, body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const { message: userMessage, receiverId } = validation.data;

    const lowerMsg = userMessage.toLowerCase();
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
      "Me gustaría saber si eres estudiante de la UV o la UPV.",
    ];

    let aiResponse = responses[Math.floor(Math.random() * responses.length)];
    if (lowerMsg.includes("precio")) {
      aiResponse = "Los precios varían mucho. Ruzafa ~480€, Benimaclet ~380€ y El Carmen ~490€. ¿Cuál es tu presupuesto?";
    } else if (lowerMsg.includes("disponible")) {
      aiResponse = "¡Sí! La habitación sigue disponible. ¿Te gustaría venir a verla esta semana?";
    }

    return NextResponse.json({
      success: true,
      data: {
        message: aiResponse,
        senderId: "ai-assistant",
        receiverId: user.uid,
        timestamp: new Date().toISOString(),
      },
    });
  } catch {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
