import { NextResponse } from "next/server";
import { SearchQuerySchema, validateAndSanitize } from "@/lib/security/validation";
import { MOCK_LISTINGS } from "@/lib/mock/listings";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const params = {
      query: searchParams.get("query") || undefined,
      minPrice: searchParams.get("minPrice") || undefined,
      maxPrice: searchParams.get("maxPrice") || undefined,
      neighborhood: searchParams.get("neighborhood") || undefined,
      type: searchParams.get("type") || undefined,
    };

    const validation = validateAndSanitize(SearchQuerySchema, params);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const { query, minPrice, maxPrice, neighborhood, type } = validation.data;

    const results = MOCK_LISTINGS.filter((listing) => {
      if (listing.price < minPrice || listing.price > maxPrice) return false;
      if (neighborhood !== "Todos" && listing.neighborhood !== neighborhood) return false;
      if (type !== "all" && listing.type !== type) return false;
      if (query && !`${listing.title} ${listing.neighborhood}`.toLowerCase().includes(query.toLowerCase()))
        return false;
      return true;
    });

    return NextResponse.json({
      success: true,
      data: results,
      total: results.length,
    });
  } catch {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
