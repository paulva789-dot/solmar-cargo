import { describe, expect, it } from "vitest";
import { INCOTERMS, REGIONS, SERVICES, CONTAINERS, STATS, WHY_ICONS } from "../data";
import { REGION_LIST } from "../lib/estimate";
import { DICTS } from "./index";

const langs = Object.entries(DICTS);

/** Collect every string leaf (and function result shape) under an object with its path. */
function leaves(obj: unknown, path = ""): [string, unknown][] {
  if (typeof obj === "string" || typeof obj === "function") return [[path, obj]];
  if (Array.isArray(obj)) return obj.flatMap((v, i) => leaves(v, `${path}[${i}]`));
  if (obj && typeof obj === "object") return Object.entries(obj).flatMap(([k, v]) => leaves(v, path ? `${path}.${k}` : k));
  return [];
}

const enPaths = leaves(DICTS.en).map(([p]) => p);

describe.each(langs)("dictionary: %s", (_code, dict) => {
  it("has exactly the same keys as English", () => {
    expect(leaves(dict).map(([p]) => p)).toEqual(enPaths);
  });

  it("has no empty strings", () => {
    for (const [path, v] of leaves(dict)) {
      if (typeof v === "string") expect(v.trim(), path).not.toBe("");
    }
  });

  it("covers every data-driven id", () => {
    SERVICES.forEach((s) => expect(dict.services.items[s.id], s.id).toBeDefined());
    INCOTERMS.forEach((i) => expect(dict.incoterms.items[i.code], i.code).toBeDefined());
    CONTAINERS.forEach((c) => expect(dict.tools.cont.names[c.id], c.id).toBeDefined());
    REGION_LIST.forEach((r) => expect(dict.reach.regions[r.id], r.id).toBeDefined());
    REGIONS.forEach((r) => expect(dict.reach.regions[r.id], r.id).toBeDefined());
    expect(dict.statLabels).toHaveLength(STATS.length);
    expect(dict.about.why).toHaveLength(WHY_ICONS.length);
    expect(dict.tracker.stages).toHaveLength(4);
    expect(dict.testimonials.items).toHaveLength(3);
  });

  it("formats interpolated strings", () => {
    expect(dict.tools.est.days(3, 5)).toContain("3");
    expect(dict.quote.done("Ana", "a@b.co")).toContain("a@b.co");
    expect(dict.footer.rights(2026)).toContain("2026");
  });
});
