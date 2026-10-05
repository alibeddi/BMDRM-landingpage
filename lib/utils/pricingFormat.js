// Formatting for pricing packs, shared by the server render and the client
// (identical output on both sides keeps hydration clean).

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const usdRate = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

const integer = new Intl.NumberFormat("en-US");

export const formatPrice = (amount) => usd.format(amount ?? 0);

export const formatGb = (gb) =>
  gb == null ? "—" : `${integer.format(Math.round(gb))} GB`;

export const formatRate = (price) => (price ? `${usdRate.format(price)}/GB` : null);

export const formatDuration = (days) => {
  if (days == null) return "—";
  if (days >= 365) {
    const years = Math.round(days / 365);
    return `${years} year${years > 1 ? "s" : ""}`;
  }
  if (days >= 30) {
    const months = Math.round(days / 30);
    return `${months} month${months > 1 ? "s" : ""}`;
  }
  const count = Math.max(1, Math.round(days));
  return `${count} day${count > 1 ? "s" : ""}`;
};

// used by the count-up animation: same output as the static text at the end
export const COUNT_FORMATS = {
  price: (value, end) => formatPrice(value >= end ? end : Math.round(value)),
  gb: (value) => formatGb(value),
};
