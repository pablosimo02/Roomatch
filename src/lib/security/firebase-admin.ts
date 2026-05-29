import { initializeApp, cert, getApps, type App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getAppCheck } from "firebase-admin/app-check";

let app: App;

function getFirebaseAdmin(): App {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Missing Firebase Admin credentials. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY in .env.local"
    );
  }

  app = initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  });

  return app;
}

export async function verifyFirebaseToken(
  token: string
): Promise<{ uid: string; email?: string; role?: string } | null> {
  try {
    const admin = getFirebaseAdmin();
    const decodedToken = await getAuth(admin).verifyIdToken(token);
    return {
      uid: decodedToken.uid,
      email: decodedToken.email,
      role: (decodedToken as Record<string, unknown>).role as string | undefined,
    };
  } catch {
    return null;
  }
}

export async function verifyAppCheckToken(
  appCheckToken: string
): Promise<{ uid: string; verified: boolean } | null> {
  try {
    const admin = getFirebaseAdmin();
    const appCheck = await getAppCheck(admin).verifyToken(appCheckToken);
    return { uid: appCheck.token?.app || "unknown", verified: true };
  } catch {
    return null;
  }
}

export { getFirebaseAdmin };
