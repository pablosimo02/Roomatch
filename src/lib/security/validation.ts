import { z } from "zod";

export const ListingInputSchema = z.object({
  title: z
    .string()
    .min(3, "El título debe tener al menos 3 caracteres")
    .max(120, "El título no puede exceder 120 caracteres")
    .regex(/^[a-zA-Z0-9\sáéíóúñüÁÉÍÓÚÑÜ.,:;\-!?¿¡'"()\/]+$/, "El título contiene caracteres no válidos"),
  price: z
    .number()
    .int("El precio debe ser un número entero")
    .min(50, "El precio mínimo es 50€")
    .max(5000, "El precio máximo es 5000€"),
  neighborhood: z.enum(["Ruzafa", "Benimaclet", "El Carmen", "Campanar", "Patraix", "Algirós"]),
  description: z
    .string()
    .max(2000, "La descripción no puede exceder 2000 caracteres")
    .optional()
    .default(""),
  type: z.enum(["room", "flat", "studio"]).optional().default("room"),
});

export const ChatMessageSchema = z.object({
  message: z
    .string()
    .min(1, "El mensaje no puede estar vacío")
    .max(500, "El mensaje no puede exceder 500 caracteres"),
  receiverId: z.string().min(1, "Se requiere un receptor"),
});

export const SearchQuerySchema = z.object({
  query: z
    .string()
    .max(100, "La búsqueda no puede exceder 100 caracteres")
    .optional()
    .default(""),
  minPrice: z.coerce.number().min(0).max(10000).optional().default(0),
  maxPrice: z.coerce.number().min(0).max(10000).optional().default(1000),
  neighborhood: z.string().optional().default("Todos"),
  type: z.string().optional().default("all"),
});

export const AIRequestSchema = z.object({
  type: z.enum(["listing", "chat"]).default("chat"),
  neighborhood: z.string().max(100).optional(),
  price: z.number().min(0).max(10000).optional(),
  message: z.string().max(500).optional(),
});

export function sanitizeString(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
    .trim();
}

export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
  const sanitized = { ...obj };
  for (const key of Object.keys(sanitized)) {
    if (typeof sanitized[key] === "string") {
      (sanitized[key] as unknown) = sanitizeString(sanitized[key] as string);
    }
  }
  return sanitized;
}

export function validateAndSanitize<T extends z.ZodType>(
  schema: T,
  data: unknown
): { success: true; data: z.infer<T> } | { success: false; error: string } {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  const errorMessage = result.error.issues.map((e) => e.message).join(", ");
  return { success: false, error: errorMessage };
}
