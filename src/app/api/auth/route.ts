import { NextResponse } from "next/server";
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

    return NextResponse.json({
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        role: user.role || "student",
      },
    });
  } catch {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
