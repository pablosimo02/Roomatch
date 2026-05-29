import { RateLimiterMemory } from "rate-limiter-flexible";

const rateLimiters = new Map<string, RateLimiterMemory>();

function getLimiter(key: string, points: number, duration: number): RateLimiterMemory {
  const fullKey = `${key}:${points}:${duration}`;
  if (!rateLimiters.has(fullKey)) {
    rateLimiters.set(
      fullKey,
      new RateLimiterMemory({ points, duration })
    );
  }
  return rateLimiters.get(fullKey)!;
}

export interface RateLimitConfig {
  key: string;
  points: number;
  duration: number;
}

export const RATE_LIMIT_PRESETS: Record<string, RateLimitConfig> = {
  chat: { key: "chat", points: 10, duration: 60 },
  listings: { key: "listings", points: 30, duration: 60 },
  auth: { key: "auth", points: 5, duration: 300 },
  ai: { key: "ai", points: 5, duration: 120 },
  default: { key: "default", points: 60, duration: 60 },
};

export async function checkRateLimit(
  identifier: string,
  preset: RateLimitConfig = RATE_LIMIT_PRESETS.default
): Promise<{ allowed: boolean; retryAfter?: number }> {
  const limiter = getLimiter(preset.key, preset.points, preset.duration);

  try {
    await limiter.consume(identifier);
    return { allowed: true };
  } catch (rejRes) {
    const retryAfterSecs = Math.ceil((rejRes as { msBeforeNext: number }).msBeforeNext / 1000);
    return { allowed: false, retryAfter: retryAfterSecs };
  }
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return "unknown";
}
