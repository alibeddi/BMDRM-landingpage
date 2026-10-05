// Public packs from the BMDRM API (GET /api/packs/public).
// Server-only: the API may require an internal token (ADMIN_TOKEN), which must
// never reach the browser. Used by the pricing page and /api/pricing.

export const PACKS_REVALIDATE = 300; // seconds

// PRICING_API_URL is the API host (e.g. https://mainapi.bmdrm.com); the public
// packs path is added to it. If it still points at the legacy admin list
// (…/api/Packs), that list is used as a fallback when the public one refuses us.
const PUBLIC_PACKS_PATH = "/api/packs/public";

// Storage and bandwidth are value objects on the API side; accept a plain
// number, a numeric string, or an object wrapping the number.
const toNumber = (value) => {
  if (value == null) return null;
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (typeof value === "string") {
    const parsed = parseFloat(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  if (typeof value === "object") {
    for (const key of ["value", "Value", "inGb", "gb", "amount"]) {
      if (key in value) return toNumber(value[key]);
    }
    const first = Object.values(value).find((v) => typeof v === "number");
    return first ?? null;
  }
  return null;
};

// .NET TimeSpan ("365.00:00:00", "12:00:00") → days
const toDays = (timespan) => {
  const match = /^(?:(\d+)\.)?(\d{1,2}):(\d{2})/.exec(timespan || "");
  if (!match) return null;
  return Number(match[1] || 0) + Number(match[2]) / 24;
};

export const normalizePack = (pack) => {
  const amount = toNumber(pack.amount) ?? 0;
  return {
    id: pack.id,
    name: pack.name || "Plan",
    amount,
    storage: toNumber(pack.storageInGb),
    bandwidth: toNumber(pack.bandwidthInGb),
    extraStorage: toNumber(pack.extraStoragePricePerGb),
    extraBandwidth: toNumber(pack.extraBandwidthPricePerGb),
    days: toDays(pack.expiresAfter),
    // the legacy list has no isTrial flag; its trial is the free pack
    isTrial: pack.isTrial ?? amount === 0,
  };
};

const requestPacks = async (url, token) => {
  const headers = { Accept: "application/json" };
  if (token) headers["Admin-Token"] = token;

  const response = await fetch(url, {
    headers,
    next: { revalidate: PACKS_REVALIDATE },
  });
  if (!response.ok) {
    const error = new Error(`Pricing API responded with ${response.status}`);
    error.status = response.status;
    throw error;
  }

  const data = JSON.parse(await response.text());
  if (!Array.isArray(data)) throw new Error("Unexpected pricing API response");
  return data;
};

export async function fetchPublicPacks() {
  const base = process.env.PRICING_API_URL;
  const token = process.env.ADMIN_TOKEN; // optional; sent when set
  if (!base) throw new Error("Missing PRICING_API_URL in environment");

  let data;
  try {
    data = await requestPacks(new URL(PUBLIC_PACKS_PATH, base), token);
  } catch (error) {
    const legacyList = new URL(base).pathname.replace(/\/$/, "") !== "";
    if (!legacyList || ![401, 403, 404].includes(error.status)) throw error;
    console.warn(
      `${PUBLIC_PACKS_PATH} responded with ${error.status}; falling back to PRICING_API_URL`,
    );
    data = await requestPacks(base, token);
  }

  return (
    data
      // the public endpoint only returns public packs; never list private ones
      .filter((pack) => String(pack.visibility ?? "public").toLowerCase() !== "private")
      .map(normalizePack)
      .sort((a, b) => a.amount - b.amount)
  );
}
