import { fetchPublicPacks } from "@lib/pricing";

// Browser-facing proxy for the Payment API's public packs (used by the pricing
// page's client-side fallback). The token stays on the server. The upstream
// request is cached by fetchPublicPacks, so this route stays dynamic and never
// caches an error.
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const packs = await fetchPublicPacks();
    return Response.json(packs);
  } catch (error) {
    console.error("Pricing fetch error:", error);
    return Response.json(
      { error: "Could not load pricing plans" },
      { status: 502 },
    );
  }
}
