/**
 * Language-independent site data (ids, numbers, coordinates, contact details).
 * All user-visible text lives in src/i18n/*.ts.
 */

export type IconName =
  | "ship"
  | "plane"
  | "truck"
  | "doc"
  | "warehouse"
  | "chain"
  | "shield"
  | "pin"
  | "user"
  | "globe";

export const CONTACT = {
  phone: "+1 (559) 213-2902",
  phoneHref: "tel:+15592132902",
  email: "info@globaltropicalcargo.com",
};

/** `id` keys into t.services.items. */
export const SERVICES: { id: string; icon: IconName }[] = [
  { id: "ocean", icon: "ship" },
  { id: "air", icon: "plane" },
  { id: "road", icon: "truck" },
  { id: "customs", icon: "doc" },
  { id: "warehouse", icon: "warehouse" },
  { id: "scm", icon: "chain" },
];

/** Order matches t.statLabels. */
export const STATS = [
  { value: 12000, suffix: "+" },
  { value: 85, suffix: "+" },
  { value: 98, suffix: "%" },
  { value: 15, suffix: "+" },
  { value: 3000, suffix: "+" },
];

/** Order matches t.about.why. */
export const WHY_ICONS: IconName[] = ["shield", "pin", "user", "globe"];

/** `id` matches REGION_LIST in lib/estimate.ts and t.reach.regions. */
export const REGIONS = [
  { id: "na", x: 22, y: 36, size: 14 },
  { id: "latam", x: 30, y: 68, size: 11 },
  { id: "eu", x: 50, y: 29, size: 11 },
  { id: "af", x: 52, y: 56, size: 10 },
  { id: "me", x: 61, y: 42, size: 9 },
  { id: "apac", x: 78, y: 46, size: 13 },
];

export const PARTNERS = ["CargoLink", "AirBridge", "FreightHub", "TradePost", "OceanX", "SupplyNet"];

export const INCOTERMS: { code: string; sea: boolean }[] = [
  { code: "EXW", sea: false },
  { code: "FCA", sea: false },
  { code: "CPT", sea: false },
  { code: "CIP", sea: false },
  { code: "DAP", sea: false },
  { code: "DPU", sea: false },
  { code: "DDP", sea: false },
  { code: "FAS", sea: true },
  { code: "FOB", sea: true },
  { code: "CFR", sea: true },
  { code: "CIF", sea: true },
];

/** `id` keys into t.tools.cont.names. */
export const CONTAINERS = [
  { id: "c20", length: "5.9 m", width: "2.35 m", height: "2.39 m", volume: "≈ 33 m³", payload: "≈ 28,000 kg" },
  { id: "c40", length: "12.0 m", width: "2.35 m", height: "2.39 m", volume: "≈ 67 m³", payload: "≈ 26,700 kg" },
  { id: "c40hc", length: "12.0 m", width: "2.35 m", height: "2.69 m", volume: "≈ 76 m³", payload: "≈ 26,500 kg" },
];
