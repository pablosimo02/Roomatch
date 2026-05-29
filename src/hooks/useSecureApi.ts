"use client";

import { useCallback } from "react";
import { useAuth } from "@/lib/auth-context";

interface ApiOptions {
  method?: string;
  body?: unknown;
  requiresAuth?: boolean;
}

export function useSecureApi() {
  const { getToken } = useAuth();

  const request = useCallback(
    async (endpoint: string, options: ApiOptions = {}) => {
      const { method = "GET", body, requiresAuth = true } = options;

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (requiresAuth) {
        const token = await getToken();
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }
      }

      const response = await fetch(endpoint, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: "Error desconocido" }));
        throw new Error(error.error || `HTTP ${response.status}`);
      }

      return response.json();
    },
    [getToken]
  );

  return { request };
}
