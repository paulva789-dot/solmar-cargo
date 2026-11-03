import { ReactNode, useEffect, useState } from "react";
import { CONTACT, PARTNERS, REGIONS, SERVICES, STATS, WHY_ICONS } from "../data";
import { useCountUp, useInView } from "../hooks";
import { useI18n } from "../i18n";
import type { OpenQuote } from "../types";
import { Icon } from "./Icon";
import { Tracker } from "./Tracker";

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const [ref, seen] = useInView<HTMLDivElement>(0.15);
  return (
    <div ref={ref} className={`reveal ${seen ? "is-in" : ""} ${className}`}>
      {children}
    </div>
  );
}

export function SectionHead({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <Reveal className="section-head">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {lead && <p>{lead}</p>}
    </Reveal>
  );
}

export function Hero({ onQuote }: { onQuote: OpenQuote }) {
  const { t } = useI18n();
  return (
    <section id="home" className="hero">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__sun" />
        <svg className="hero__waves" viewBox="0 0 1440 240" preserveAspectRatio="none">
          <path d="M0 120c240 60 480 60 720 0s480-60 720 0v120H0z" />
          <path d="M0 160c240 50 480 50 720 0s480-50 720 0v80H0z" />
        </svg>
      </div>
      <div className="container hero__grid">
        <div>
          <span className="pill">{t.hero.pill}</span>
          <h1>
            {t.hero.titleA}
            <em>{t.hero.titleEm}</em>
          </h1>
          <p className="hero__lead">{t.hero.lead}</p>
          <div className="hero__actions">
            <button className="btn btn--primary" onClick={() => onQuote()}>
              {t.hero.cta}
            </button>
            <a className="btn btn--outline" href="#services">
              {t.hero.services}
            </a>
          </div>
          <dl className="hero__facts">
            {t.hero.facts.map((f) => (
              <div key={f.l}>
                <dt>{f.v}</dt>
                <dd>{f.l}</dd>
              </div>
            ))}
          </dl>
        </div>
        <Tracker />
      </div>
    </section>
  );
}

function Stat({ value, suffix, label, go, locale }: { value: number; suffix: string; label: string; go: boolean; locale: string }) {
  const n = useCountUp(value, go);
  return (
    <div className="stat">
      <b>
        {n.toLocaleString(locale)}
        {suffix}
      </b>
      <span>{label}</span>
    </div>
  );
}

export function Stats() {
  const { t } = useI18n();
  const [ref, seen] = useInView<HTMLDivElement>(0.3);
  return (
    <section className="stats" aria-label={t.statsAria}>
      <div className="container stats__row" ref={ref}>
        {STATS.map((s, i) => (
          <Stat key={i} {...s} label={t.statLabels[i]} go={seen} locale={t.locale} />
        ))}
      </div>
    </section>
  );
}

export function Services({ onQuote }: { onQuote: OpenQuote }) {
  const { t } = useI18n();
  return (
    <section id="services" className="section">
      <div className="container">
        <SectionHead eyebrow={t.services.eyebrow} title={t.services.title} lead={t.services.lead} />
        <div className="cards">
          {SERVICES.map((s, i) => {
            const item = t.services.items[s.id];
            return (
              <Reveal key={s.id}>
                <article className="card" style={{ transitionDelay: `${i * 40}ms` }}>
                  <span className="card__icon">
                    <Icon name={s.icon} size={26} />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.blurb}</p>
                  <ul>
                    {item.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                  <button className="link" onClick={() => onQuote({ service: s.id })}>
                    {t.services.cta} <span aria-hidden="true">→</span>
                  </button>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function About() {
  const { t } = useI18n();
  return (
    <section id="about" className="section section--tint">
      <div className="container about">
        <Reveal>
          <div className="about__badge" aria-hidden="true">
            <b>15</b>
            <span>{t.about.badge}</span>
          </div>
          <span className="eyebrow">{t.about.eyebrow}</span>
          <h2>{t.about.title}</h2>
          <p className="about__lead">{t.about.lead}</p>
        </Reveal>
        <div className="why">
          {t.about.why.map((w, i) => (
            <Reveal key={w.title}>
              <div className="why__item">
                <span className="why__icon">
                  <Icon name={WHY_ICONS[i]} />
                </span>
                <div>
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Process() {
  const { t } = useI18n();
  return (
    <section className="section">
      <div className="container">
        <SectionHead eyebrow={t.process.eyebrow} title={t.process.title} />
        <ol className="steps">
          {t.process.steps.map((s, i) => (
            <li key={s.title}>
              <Reveal>
                <span className="steps__n">{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Reach() {
  const { t } = useI18n();
  const [active, setActive] = useState<string | null>(null);
  return (
    <section className="section reach">
      <div className="container reach__grid">
        <Reveal>
          <span className="eyebrow eyebrow--light">{t.reach.eyebrow}</span>
          <h2>{t.reach.title}</h2>
          <ul className="reach__list">
            {REGIONS.map((r) => (
              <li
                key={r.id}
                className={active === r.id ? "is-active" : ""}
                onMouseEnter={() => setActive(r.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(r.id)}
                onBlur={() => setActive(null)}
                tabIndex={0}
              >
                {t.reach.regions[r.id]}
              </li>
            ))}
          </ul>
        </Reveal>
        <div className="map" role="img" aria-label={t.reach.mapAria}>
          <div className="map__grid" />
          {REGIONS.map((r) => (
            <span
              key={r.id}
              className={`map__dot ${active === r.id ? "is-active" : ""}`}
              style={{ left: `${r.x}%`, top: `${r.y}%`, width: r.size * 2, height: r.size * 2 }}
            >
              <i />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

const PEOPLE = ["Elena Marsh", "Kofi Mensah", "Hannah Brooks"];

export function Testimonials() {
  const { t } = useI18n();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((v) => (v + 1) % PEOPLE.length), 6000);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section className="section section--tint">
      <div className="container">
        <SectionHead eyebrow={t.testimonials.eyebrow} title={t.testimonials.title} />
        <div
          className="quotes"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          aria-live="polite"
        >
          {t.testimonials.items.map((item, idx) => (
            <figure key={PEOPLE[idx]} className={`quote ${idx === i ? "is-active" : ""}`} aria-hidden={idx !== i}>
              <blockquote>“{item.quote}”</blockquote>
              <figcaption>
                <span className="avatar">{PEOPLE[idx][0]}</span>
                <b>{PEOPLE[idx]}</b>
                <small>{item.place}</small>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="dots" role="tablist" aria-label={t.testimonials.choose}>
          {PEOPLE.map((name, idx) => (
            <button
              key={name}
              role="tab"
              aria-selected={idx === i}
              aria-label={t.testimonials.pick(name)}
              className={idx === i ? "is-active" : ""}
              onClick={() => setI(idx)}
            />
          ))}
        </div>
        <ul className="partners" aria-label={t.testimonials.partners}>
          {PARTNERS.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Contact({ onQuote }: { onQuote: OpenQuote }) {
  const { t } = useI18n();
  const c = t.contact;
  const items: { k: string; v: string; h?: string }[] = [
    { k: c.hq, v: c.hqValue },
    { k: c.phone, v: CONTACT.phone, h: CONTACT.phoneHref },
    { k: c.email, v: CONTACT.email, h: `mailto:${CONTACT.email}` },
    { k: c.hoursLabel, v: t.hours },
  ];
  return (
    <section id="contact" className="section">
      <div className="container">
        <Reveal className="cta">
          <div>
            <h2>{c.ctaTitle}</h2>
            <p>{c.ctaText}</p>
          </div>
          <div className="cta__actions">
            <button className="btn btn--accent" onClick={() => onQuote()}>
              {c.quote}
            </button>
            <a className="btn btn--outline-light" href="#track">
              {c.track}
            </a>
          </div>
        </Reveal>

        <div className="contact">
          {items.map((it) => (
            <div key={it.k} className="contact__item">
              <small>{it.k}</small>
              {it.h ? <a href={it.h}>{it.v}</a> : <span>{it.v}</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useI18n();
  const f = t.footer;
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "ok" | "bad">("idle");

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <p className="footer__brand">SolMar Cargo</p>
          <p className="footer__muted">{f.blurb}</p>
          <div className="certs">
            <span>ISO Certified</span>
            <span>FIATA Member</span>
            <span>IATA Approved</span>
          </div>
        </div>
        <nav aria-label={f.quickLinks}>
          <h4>{f.quickLinks}</h4>
          <a href="#services">{t.nav.services}</a>
          <a href="#about">{f.about}</a>
          <a href="#track">{f.track}</a>
          <a href="#contact">{f.contact}</a>
        </nav>
        <nav aria-label={f.services}>
          <h4>{f.services}</h4>
          {SERVICES.map((s) => (
            <a key={s.id} href="#services">
              {t.services.items[s.id].title}
            </a>
          ))}
        </nav>
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            const ok = /^\S+@\S+\.\S+$/.test(email);
            setState(ok ? "ok" : "bad");
            if (ok) setEmail("");
          }}
        >
          <h4>{f.news}</h4>
          <div className="news">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={f.emailPlaceholder}
              aria-label={f.emailLabel}
            />
            <button className="btn btn--accent btn--sm">{f.subscribe}</button>
          </div>
          {state === "ok" && <p className="footer__ok">{f.subscribed}</p>}
          {state === "bad" && <p className="field-error">{f.badEmail}</p>}
        </form>
      </div>
      <div className="container footer__base">
        <span>{f.rights(new Date().getFullYear())}</span>
        <span>{f.demo}</span>
        <span>
          <a href="#home">{f.privacy}</a> · <a href="#home">{f.terms}</a>
        </span>
      </div>
    </footer>
  );
}
