import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const RATE_LIMIT_STORE = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMITS: Record<string, { max: number; windowMs: number }> = {
  "/api/chat": { max: 10, windowMs: 60_000 },
  "/api/listings": { max: 30, windowMs: 60_000 },
  "/api/ai": { max: 5, windowMs: 120_000 },
  "/api/auth": { max: 5, windowMs: 300_000 },
  default: { max: 60, windowMs: 60_000 },
};

function getRateLimitConfig(pathname: string) {
  for (const [path, config] of Object.entries(RATE_LIMITS)) {
    if (pathname.startsWith(path) && path !== "default") {
      return config;
    }
  }
  return RATE_LIMITS.default;
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return "127.0.0.1";
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/")) {
    const ip = getClientIp(request);
    const config = getRateLimitConfig(pathname);
    const key = `${ip}:${pathname}`;
    const now = Date.now();
    const entry = RATE_LIMIT_STORE.get(key);

    if (entry && now < entry.resetTime) {
      if (entry.count >= config.max) {
        const retryAfter = Math.ceil((entry.resetTime - now) / 1000);
        return new NextResponse(
          JSON.stringify({ error: "Too many requests", retryAfter }),
          {
            status: 429,
            headers: {
              "Content-Type": "application/json",
              "Retry-After": String(retryAfter),
              "X-RateLimit-Limit": String(config.max),
              "X-RateLimit-Remaining": "0",
              "X-RateLimit-Reset": String(Math.ceil(entry.resetTime / 1000)),
            },
          }
        );
      }
      entry.count += 1;
    } else {
      RATE_LIMIT_STORE.set(key, { count: 1, resetTime: now + config.windowMs });
    }

    const response = NextResponse.next();
    const currentEntry = RATE_LIMIT_STORE.get(key);
    if (currentEntry) {
      const remaining = Math.max(0, config.max - currentEntry.count);
      response.headers.set("X-RateLimit-Limit", String(config.max));
      response.headers.set("X-RateLimit-Remaining", String(remaining));
      response.headers.set("X-RateLimit-Reset", String(Math.ceil(currentEntry.resetTime / 1000)));
    }

    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-XSS-Protection", "1; mode=block");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

    return response;
  }

  const response = NextResponse.next();
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' https://images.unsplash.com https://picsum.photos https://*.tile.openstreetmap.org https://unpkg.com data:; font-src 'self'; connect-src 'self' https://*.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com; frame-src https://lookerstudio.google.com https://datastudio.google.com; object-src 'none';"
  );

  return response;
}

export const config = {
  matcher: ["/api/:path*", "/((?!_next/static|_next/image|favicon.ico).*)"],
};
