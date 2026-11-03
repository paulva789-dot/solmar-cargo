import type { EstimateError } from "../lib/estimate";

export type Lang = "en" | "es" | "fr";

export const LANGS: { code: Lang; label: string; native: string }[] = [
  { code: "en", label: "EN", native: "English" },
  { code: "es", label: "ES", native: "Español" },
  { code: "fr", label: "FR", native: "Français" },
];

interface Titled {
  title: string;
  text: string;
}

/** Every user-visible string on the site. Each language file must satisfy this shape. */
export interface Dict {
  /** BCP-47 tag used for number/date formatting and <html lang>. */
  locale: string;
  meta: { title: string; description: string };
  skip: string;
  language: string;
  themeToDark: string;
  themeToLight: string;
  menuOpen: string;
  menuClose: string;
  primaryNav: string;
  announcements: string;
  brandAria: string;
  nav: { home: string; services: string; tools: string; about: string; contact: string; track: string; quote: string };
  ticker: string[];
  hours: string;

  hero: {
    pill: string;
    titleA: string;
    titleEm: string;
    lead: string;
    cta: string;
    services: string;
    facts: { v: string; l: string }[];
  };

  tracker: {
    title: string;
    placeholder: string;
    button: string;
    errorFormat: string;
    recent: string;
    eta: (date: string) => string;
    progress: string;
    share: string;
    copied: string;
    copyPrompt: string;
    demo: string;
    stages: { label: string; place: string }[];
  };

  statsAria: string;
  statLabels: string[];

  services: {
    eyebrow: string;
    title: string;
    lead: string;
    cta: string;
    items: Record<string, { title: string; blurb: string; points: string[] }>;
  };

  tools: {
    eyebrow: string;
    title: string;
    lead: string;
    aria: string;
    tabs: { estimate: string; volume: string; containers: string };
    est: {
      mode: string;
      modes: { ocean: string; air: string; road: string };
      from: string;
      to: string;
      weight: string;
      volume: string;
      roadHint: string;
      range: string;
      transit: string;
      days: (a: number, b: number) => string;
      chargeable: string;
      revTonnes: string;
      kg: string;
      confirm: string;
      disclaimer: string;
      errors: Record<EstimateError, string>;
      seedDetails: (weight: string, volume: string, low: string, high: string) => string;
    };
    vol: {
      length: string;
      width: string;
      height: string;
      pieces: string;
      actual: string;
      result: string;
      volumetric: string;
      actualShort: string;
      formula: string;
    };
    cont: {
      caption: string;
      cols: { type: string; length: string; width: string; height: string; volume: string; payload: string };
      names: Record<string, string>;
      note: string;
    };
  };

  about: { eyebrow: string; title: string; lead: string; badge: string; why: Titled[] };
  process: { eyebrow: string; title: string; steps: Titled[] };
  industries: { eyebrow: string; title: string; items: { name: string; note: string }[] };

  reach: { eyebrow: string; title: string; mapAria: string; regions: Record<string, string> };

  incoterms: {
    eyebrow: string;
    title: string;
    lead: string;
    filterAria: string;
    all: string;
    any: string;
    sea: string;
    risk: string;
    items: Record<string, { name: string; risk: string; summary: string }>;
  };

  testimonials: {
    eyebrow: string;
    title: string;
    choose: string;
    partners: string;
    items: { quote: string; place: string }[];
    pick: (name: string) => string;
  };

  faq: { eyebrow: string; title: string; items: { q: string; a: string }[] };

  contact: {
    ctaTitle: string;
    ctaText: string;
    quote: string;
    track: string;
    hq: string;
    hqValue: string;
    phone: string;
    email: string;
    hoursLabel: string;
  };

  footer: {
    blurb: string;
    quickLinks: string;
    services: string;
    news: string;
    emailPlaceholder: string;
    emailLabel: string;
    subscribe: string;
    subscribed: string;
    badEmail: string;
    rights: (year: number) => string;
    demo: string;
    privacy: string;
    terms: string;
    about: string;
    contact: string;
    track: string;
  };

  quote: {
    title: string;
    sub: string;
    name: string;
    email: string;
    origin: string;
    destination: string;
    service: string;
    details: string;
    submit: string;
    close: string;
    doneTitle: string;
    done: (first: string, email: string) => string;
    ok: string;
    errName: string;
    errEmail: string;
    errFrom: string;
    errTo: string;
  };

  floating: { top: string; whatsapp: string };
}
