import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { Dict, Lang, LANGS } from "./dict";
import { en } from "./en";
import { es } from "./es";
import { fr } from "./fr";

export { LANGS };
export type { Dict, Lang };

export const DICTS: Record<Lang, Dict> = { en, es, fr };

const KEY = "sm-lang";

export const isLang = (v: unknown): v is Lang => v === "en" || v === "es" || v === "fr";

/** Saved choice → browser language → English. */
export function detectLang(): Lang {
  try {
    const saved = localStorage.getItem(KEY);
    if (isLang(saved)) return saved;
  } catch {
    /* storage unavailable */
  }
  const prefs = typeof navigator !== "undefined" ? navigator.languages ?? [navigator.language] : [];
  for (const p of prefs) {
    const base = p?.slice(0, 2).toLowerCase();
    if (isLang(base)) return base;
  }
  return "en";
}

interface Ctx {
  lang: Lang;
  t: Dict;
  setLang: (l: Lang) => void;
}

const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = DICTS[lang].meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", DICTS[lang].meta.description);
    try {
      localStorage.setItem(KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const value = useMemo<Ctx>(() => ({ lang, t: DICTS[lang], setLang: setLangState }), [lang]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): Ctx {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}
