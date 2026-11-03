/**
 * Indicative freight estimator.
 *
 * Rates here are illustrative planning numbers, NOT live carrier prices.
 * The UI always labels results as estimates and routes users to a real quote.
 */

export type Mode = "air" | "ocean" | "road";
export type EstimateError = "weight" | "tooHeavy" | "road";

export interface Region {
  id: string;
  name: string;
  /** Position on the schematic world map (0–100). Used as a distance proxy. */
  x: number;
  y: number;
}

export const REGION_LIST: Region[] = [
  { id: "na", name: "USA & Canada", x: 22, y: 36 },
  { id: "latam", name: "Latin America", x: 30, y: 68 },
  { id: "eu", name: "Europe", x: 50, y: 29 },
  { id: "af", name: "Africa", x: 52, y: 56 },
  { id: "me", name: "Middle East", x: 61, y: 42 },
  { id: "apac", name: "Asia Pacific", x: 78, y: 46 },
];

/** Region pairs that are joined by land and can realistically go by road. */
const LAND_LINKS = new Set(["na-latam", "eu-me", "eu-af", "af-me", "me-apac"]);

export const canRoad = (a: string, b: string): boolean =>
  a === b || LAND_LINKS.has(`${a}-${b}`) || LAND_LINKS.has(`${b}-${a}`);

const byId = (id: string): Region => {
  const r = REGION_LIST.find((x) => x.id === id);
  if (!r) throw new Error(`Unknown region: ${id}`);
  return r;
};

export const distance = (from: string, to: string): number => {
  const a = byId(from);
  const b = byId(to);
  return Math.hypot(a.x - b.x, a.y - b.y);
};

const RATES: Record<Mode, { base: number; perUnit: number; perDist: number; min: number }> = {
  // USD per chargeable kg
  air: { base: 2.1, perUnit: 0, perDist: 0.075, min: 180 },
  // USD per revenue tonne (1 m³ or 1000 kg, whichever is greater)
  ocean: { base: 38, perUnit: 0, perDist: 2.6, min: 140 },
  // USD per kg
  road: { base: 0.22, perUnit: 0, perDist: 0.012, min: 120 },
};

const TRANSIT: Record<Mode, { base: number; perDist: number }> = {
  air: { base: 2, perDist: 0.09 },
  ocean: { base: 9, perDist: 0.85 },
  road: { base: 1, perDist: 0.12 },
};

export interface EstimateInput {
  mode: Mode;
  from: string;
  to: string;
  weightKg: number;
  volumeCbm: number;
}

export interface Estimate {
  low: number;
  high: number;
  transitMin: number;
  transitMax: number;
  chargeable: number;
  unit: "kg" | "t";
}

/** Volumetric weight divisor: 167 kg per m³ for air (IATA 6000 cm³/kg). */
export const AIR_KG_PER_CBM = 167;

export const volumetricKg = (lengthCm: number, widthCm: number, heightCm: number, pieces = 1): number =>
  Math.max(0, (lengthCm * widthCm * heightCm * pieces) / 6000);

export function estimate(input: EstimateInput): Estimate | { error: EstimateError } {
  const { mode, from, to, weightKg, volumeCbm } = input;
  if (!(weightKg > 0) || !(volumeCbm >= 0)) return { error: "weight" };
  if (weightKg > 200000) return { error: "tooHeavy" };
  if (mode === "road" && !canRoad(from, to)) return { error: "road" };

  const d = from === to ? 4 : distance(from, to);
  const r = RATES[mode];
  const t = TRANSIT[mode];

  let chargeable: number;
  let unit: Estimate["unit"];
  let raw: number;

  if (mode === "ocean") {
    chargeable = Math.max(volumeCbm, weightKg / 1000);
    unit = "t";
    raw = chargeable * (r.base + r.perDist * d);
  } else {
    chargeable = mode === "air" ? Math.max(weightKg, volumeCbm * AIR_KG_PER_CBM) : weightKg;
    unit = "kg";
    raw = chargeable * (r.base + r.perDist * d);
  }

  const mid = Math.max(raw, r.min);
  const round = (n: number) => Math.round(n / 5) * 5;
  const transitMin = Math.max(1, Math.round(t.base + t.perDist * d));

  return {
    low: round(mid * 0.88),
    high: round(mid * 1.18),
    transitMin,
    transitMax: Math.round(transitMin * 1.4) + 1,
    chargeable: Math.round(chargeable * 100) / 100,
    unit,
  };
}

export const isError = (r: Estimate | { error: EstimateError }): r is { error: EstimateError } => "error" in r;

export const usd = (n: number, locale = "en-US") =>
  n.toLocaleString(locale, { style: "currency", currency: "USD", maximumFractionDigits: 0 });
