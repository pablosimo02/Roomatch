"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: string;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  getToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("roomatch_user");
    const storedToken = localStorage.getItem("roomatch_token");
    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      } catch {
        localStorage.removeItem("roomatch_user");
        localStorage.removeItem("roomatch_token");
      }
    }
    setLoading(false);
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const response = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Error de autenticación");
    }

    const data = await response.json();
    const authUser: AuthUser = {
      uid: data.user.uid,
      email: data.user.email,
      displayName: data.user.displayName || null,
      role: data.user.role,
    };

    setUser(authUser);
    setToken(data.token);
    localStorage.setItem("roomatch_user", JSON.stringify(authUser));
    localStorage.setItem("roomatch_token", data.token);
  }, []);

  const signUp = useCallback(async (email: string, password: string, name: string) => {
    const response = await fetch("/api/auth", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Error de registro");
    }

    const data = await response.json();
    const authUser: AuthUser = {
      uid: data.user.uid,
      email: data.user.email,
      displayName: name,
      role: data.user.role,
    };

    setUser(authUser);
    setToken(data.token);
    localStorage.setItem("roomatch_user", JSON.stringify(authUser));
    localStorage.setItem("roomatch_token", data.token);
  }, []);

  const signOut = useCallback(async () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("roomatch_user");
    localStorage.removeItem("roomatch_token");
  }, []);

  const getToken = useCallback(async (): Promise<string | null> => {
    return token;
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, loading, signIn, signUp, signOut, getToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
