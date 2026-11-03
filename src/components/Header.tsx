import { useEffect, useState } from "react";
import { CONTACT, TICKER } from "../data";
import type { Theme } from "../hooks";
import type { OpenQuote } from "../types";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#tools", label: "Tools" },
  { href: "#about", label: "About Us" },
  { href: "#contact", label: "Contact" },
];

export function Header({ onQuote, theme, onTheme }: { onQuote: OpenQuote; theme: Theme; onTheme: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
      <div className="ticker" aria-label="Announcements">
        <div className="ticker__track">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} aria-hidden={i >= TICKER.length}>
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="container header__bar">
        <a href="#home" className="brand" aria-label="Global Tropical Cargo home">
          <span className="brand__mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="32" height="32">
              <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M2 16h28M16 2c6 6 6 22 0 28M16 2c-6 6-6 22 0 28" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </span>
          <span className="brand__text">
            Global Tropical <b>Cargo</b>
          </span>
        </a>

        <nav className={`nav ${open ? "is-open" : ""}`} aria-label="Primary">
          {LINKS.map((l) => (
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
            Track Shipment
          </a>
          <button className="theme" onClick={onTheme} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}>
            {theme === "light" ? "☾" : "☀"}
          </button>
          <button className="btn btn--primary btn--sm" onClick={() => onQuote()}>
            Get a Quote
          </button>
          <button
            className="burger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
