import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp;
let auth: Auth;

export function getFirebaseClient(): { app: FirebaseApp; auth: Auth } {
  if (typeof window === "undefined") {
    throw new Error("Firebase client can only be initialized on the client side");
  }

  if (getApps().length > 0) {
    app = getApps()[0];
    auth = getAuth(app);
    return { app, auth };
  }

  app = initializeApp(firebaseConfig);
  auth = getAuth(app);

  return { app, auth };
}

export async function getClientToken(): Promise<string | null> {
  if (typeof window === "undefined") return null;
  try {
    const { auth: clientAuth } = getFirebaseClient();
    const user = clientAuth.currentUser;
    if (!user) return null;
    return user.getIdToken();
  } catch {
    return null;
  }
}
