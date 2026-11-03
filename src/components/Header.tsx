import { useEffect, useState } from "react";
import { CONTACT } from "../data";
import type { Theme } from "../hooks";
import { isLang, LANGS, useI18n } from "../i18n";
import type { OpenQuote } from "../types";

export function Header({ onQuote, theme, onTheme }: { onQuote: OpenQuote; theme: Theme; onTheme: () => void }) {
  const { t, lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const links = [
    { href: "#home", label: t.nav.home },
    { href: "#services", label: t.nav.services },
    { href: "#tools", label: t.nav.tools },
    { href: "#about", label: t.nav.about },
    { href: "#contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container header__bar">
        <a href="#home" className="brand" aria-label={t.brandAria}>
          <span className="brand__mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="32" height="32">
              <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M2 16h28M16 2c6 6 6 22 0 28M16 2c-6 6-6 22 0 28" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </span>
          <span className="brand__text">
            SolMar <b>Cargo</b>
          </span>
        </a>

        <nav className={`nav ${open ? "is-open" : ""}`} aria-label={t.primaryNav}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a className="nav__phone" href={CONTACT.phoneHref}>
            {CONTACT.phone}
          </a>
        </nav>

        <div className="header__cta">
          <a href="#track" className="btn btn--ghost btn--sm">
            {t.nav.track}
          </a>
          <select
            className="lang"
            value={lang}
            aria-label={t.language}
            onChange={(e) => isLang(e.target.value) && setLang(e.target.value)}
          >
            {LANGS.map((l) => (
              <option key={l.code} value={l.code} title={l.native}>
                {l.label}
              </option>
            ))}
          </select>
          <button className="theme" onClick={onTheme} aria-label={theme === "light" ? t.themeToDark : t.themeToLight}>
            {theme === "light" ? "☾" : "☀"}
          </button>
          <button className="btn btn--primary btn--sm" onClick={() => onQuote()}>
            {t.nav.quote}
          </button>
          <button
            className="burger"
            aria-label={open ? t.menuClose : t.menuOpen}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
      <div className="ticker" aria-label={t.announcements}>
        <div className="ticker__track">
          {[...t.ticker, ...t.ticker].map((s, i) => (
            <span key={i} aria-hidden={i >= t.ticker.length}>
              {s}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
