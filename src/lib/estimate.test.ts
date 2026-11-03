import { describe, expect, it } from "vitest";
import { canRoad, estimate, isError, volumetricKg } from "./estimate";

describe("volumetricKg", () => {
  it("uses the 6000 cm³/kg divisor", () => {
    expect(volumetricKg(60, 50, 40)).toBe(20);
  });
  it("multiplies by piece count", () => {
    expect(volumetricKg(60, 50, 40, 3)).toBe(60);
  });
});

describe("canRoad", () => {
  it("allows same-region and land-linked pairs in either direction", () => {
    expect(canRoad("na", "na")).toBe(true);
    expect(canRoad("na", "latam")).toBe(true);
    expect(canRoad("latam", "na")).toBe(true);
  });
  it("rejects overseas pairs", () => {
    expect(canRoad("na", "eu")).toBe(false);
  });
});

describe("estimate", () => {
  const base = { from: "na", to: "eu", weightKg: 500, volumeCbm: 1 } as const;

  it("rejects non-positive weight", () => {
    expect(isError(estimate({ ...base, mode: "air", weightKg: 0 }))).toBe(true);
  });

  it("blocks road across an ocean", () => {
    expect(isError(estimate({ ...base, mode: "road" }))).toBe(true);
  });

  it("returns an ordered price range and transit window", () => {
    const r = estimate({ ...base, mode: "air" });
    if (isError(r)) throw new Error(r.error);
    expect(r.low).toBeLessThan(r.high);
    expect(r.transitMin).toBeLessThanOrEqual(r.transitMax);
  });

  it("charges air on volumetric weight when cargo is bulky", () => {
    const r = estimate({ ...base, mode: "air", weightKg: 100, volumeCbm: 3 });
    if (isError(r)) throw new Error(r.error);
    expect(r.chargeable).toBe(501);
  });

  it("is slower but cheaper per kg by sea than by air", () => {
    const air = estimate({ ...base, mode: "air", weightKg: 2000, volumeCbm: 4 });
    const sea = estimate({ ...base, mode: "ocean", weightKg: 2000, volumeCbm: 4 });
    if (isError(air) || isError(sea)) throw new Error("unexpected error");
    expect(sea.high).toBeLessThan(air.high);
    expect(sea.transitMin).toBeGreaterThan(air.transitMin);
  });

  it("applies a minimum charge", () => {
    const r = estimate({ ...base, mode: "air", weightKg: 1, volumeCbm: 0 });
    if (isError(r)) throw new Error(r.error);
    expect(r.low).toBeGreaterThanOrEqual(150);
  });
});
