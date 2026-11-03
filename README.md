# SolMar Cargo — Website

A redesigned, fully responsive marketing site for a freight-forwarding company, built with **React 18 + TypeScript + Vite**. No UI framework, no runtime dependencies beyond React.

> **Demo project.** "SolMar Cargo" is a fictional brand. Contact details use reserved fictional values (`.example` domain, `555-01xx` phone), testimonials and partner names are sample text, and tracking data and estimator rates are demonstration values. It is an independent front-end redesign inspired by the structure of typical freight-forwarder sites and is not affiliated with any real company.

## Features

| Area | What it does |
| --- | --- |
| **Shipment tracker** | Reference validation, progress timeline, recent searches, shareable deep links (`?track=REF123456`). Uses demo data — see [Connecting real data](#connecting-real-data). |
| **Rate estimator** | Ocean / air / road indicative price range and transit window between six world regions, with volumetric / revenue-ton logic and road-availability rules. Pre-fills the quote form. |
| **Volumetric weight calculator** | `L × W × H ÷ 6000` per piece vs. actual weight → chargeable weight. |
| **Container guide** | 20' / 40' / 40' HC dimensions and payloads. |
| **Quote request** | Accessible modal form with validation, seeded from the estimator. |
| **Incoterms® 2020 explorer** | All 11 terms, filterable by transport mode. |
| **Industries, FAQ, testimonials, global reach map** | Content sections with scroll-reveal animation. |
| **Multi-language** | English, Spanish and French. Auto-detects the browser language, remembers the choice, updates `<html lang>`, page title and number/date/currency formats. |
| **Dark / light theme** | Follows system preference, persists choice. |
| **Accessibility** | Skip link, ARIA tabs / accordions / progressbar, focus styles, `prefers-reduced-motion` support. |
| **Extras** | Scroll-progress bar, back-to-top, WhatsApp button, newsletter signup validation, JSON-LD structured data. |

## Getting started

```bash
npm install
npm run dev        # local dev server
npm test           # unit tests (estimator logic)
npm run typecheck  # strict TypeScript
npm run build      # production build in dist/
```

Requires Node 18+.

## Project structure

```
src/
  App.tsx                 page composition + theme + quote modal state
  data.ts                 language-independent data (ids, numbers, contact)
  i18n/                   dict.ts (typed shape), en.ts / es.ts / fr.ts, provider + useI18n()
  hooks.ts                useInView, useCountUp, useTheme, useScrollProgress
  types.ts                shared types
  lib/estimate.ts         pure estimator logic (unit-tested)
  components/
    Header.tsx            ticker, nav, theme toggle
    Sections.tsx          hero, stats, services, about, process, reach, testimonials, contact, footer
    Tools.tsx             estimator, volumetric calculator, container guide
    Resources.tsx         industries, Incoterms, FAQ
    Tracker.tsx           shipment tracker
    QuoteModal.tsx        quote request form
    Floating.tsx          progress bar, back-to-top, WhatsApp
  styles.css, extras.css  design tokens and styles (light + dark)
```

## Adding or editing a language

All user-visible text lives in `src/i18n/`. `dict.ts` defines the `Dict` interface; each language file must satisfy it, so TypeScript flags any missing string. To add a language:

1. Copy `en.ts` to `xx.ts` and translate it.
2. Register it in `LANGS` (`dict.ts`), the `Lang` type, `DICTS` and `isLang` (`index.tsx`).
3. Run `npm test` — a test checks every dictionary has the same keys as English with no empty values.

## Connecting real data

Three pieces are intentionally front-end only and need a backend before production use:

1. **Tracking** — replace `buildTimeline()` in `src/components/Tracker.tsx` with a call to your tracking API.
2. **Quote form** — POST the form state in `QuoteModal.tsx` to your API or an email/CRM service.
3. **Newsletter** — wire the footer form in `Sections.tsx` to your mailing provider.

The estimator in `src/lib/estimate.ts` uses **illustrative** rates. Replace `RATES` / `TRANSIT` with your real rate cards, or call a rating service, before presenting figures to customers.

## Deployment

- **CI** (`.github/workflows/ci.yml`) runs type-check, tests and build on every push and PR.
- **GitHub Pages** (`.github/workflows/deploy.yml`) deploys `main` once Pages is set to *GitHub Actions* source in repo settings.
- The build uses a relative base path, so `dist/` also works on any static host (Netlify, Vercel, S3, etc.).

## License

MIT — see [LICENSE](LICENSE).
