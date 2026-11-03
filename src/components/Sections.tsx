import { ReactNode, useEffect, useState } from "react";
import { CONTACT, PARTNERS, REGIONS, SERVICES, STATS, STEPS, TESTIMONIALS, WHY } from "../data";
import { useCountUp, useInView } from "../hooks";
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

function SectionHead({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <Reveal className="section-head">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {lead && <p>{lead}</p>}
    </Reveal>
  );
}

export function Hero({ onQuote }: { onQuote: OpenQuote }) {
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
          <span className="pill">Trusted logistics partner · HQ Arizona</span>
          <h1>
            Moving cargo across <em>every horizon.</em>
          </h1>
          <p className="hero__lead">
            Freight, shipping and supply chain solutions across North America, Europe, Asia and beyond — serving 85+
            countries from our headquarters in Arizona.
          </p>
          <div className="hero__actions">
            <button className="btn btn--primary" onClick={() => onQuote()}>
              Get a Free Quote
            </button>
            <a className="btn btn--outline" href="#services">
              Our Services
            </a>
          </div>
          <dl className="hero__facts">
            <div>
              <dt>98.7%</dt>
              <dd>On-time delivery</dd>
            </div>
            <div>
              <dt>24/7</dt>
              <dd>Live GPS tracking</dd>
            </div>
            <div>
              <dt>200+</dt>
              <dd>Global agents</dd>
            </div>
          </dl>
        </div>
        <Tracker />
      </div>
    </section>
  );
}

function Stat({ value, suffix, label, go }: { value: number; suffix: string; label: string; go: boolean }) {
  const n = useCountUp(value, go);
  return (
    <div className="stat">
      <b>
        {n.toLocaleString()}
        {suffix}
      </b>
      <span>{label}</span>
    </div>
  );
}

export function Stats() {
  const [ref, seen] = useInView<HTMLDivElement>(0.3);
  return (
    <section className="stats" aria-label="Key figures">
      <div className="container stats__row" ref={ref}>
        {STATS.map((s) => (
          <Stat key={s.label} {...s} go={seen} />
        ))}
      </div>
    </section>
  );
}

export function Services({ onQuote }: { onQuote: OpenQuote }) {
  return (
    <section id="services" className="section">
      <div className="container">
        <SectionHead
          eyebrow="What we offer"
          title="Every link in the chain, handled."
          lead="From a single pallet to a full container program, pick one service or let us run the whole thing."
        />
        <div className="cards">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id}>
              <article className="card" style={{ transitionDelay: `${i * 40}ms` }}>
                <span className="card__icon">
                  <Icon name={s.icon} size={26} />
                </span>
                <h3>{s.title}</h3>
                <p>{s.blurb}</p>
                <ul>
                  {s.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <button className="link" onClick={() => onQuote()}>
                  Quote this service <span aria-hidden="true">→</span>
                </button>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="section section--tint">
      <div className="container about">
        <Reveal>
          <div className="about__badge" aria-hidden="true">
            <b>15</b>
            <span>years moving freight</span>
          </div>
          <span className="eyebrow">Why choose us</span>
          <h2>Logistics with people on the other end of the line.</h2>
          <p className="about__lead">
            Headquartered in Arizona, open {CONTACT.hours}. We pair a global agent network with a dedicated account
            manager so nothing gets lost between continents.
          </p>
        </Reveal>
        <div className="why">
          {WHY.map((w) => (
            <Reveal key={w.title}>
              <div className="why__item">
                <span className="why__icon">
                  <Icon name={w.icon} />
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
  return (
    <section className="section">
      <div className="container">
        <SectionHead eyebrow="How it works" title="From quote to doorstep in four steps." />
        <ol className="steps">
          {STEPS.map((s, i) => (
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
  const [active, setActive] = useState<string | null>(null);
  return (
    <section className="section reach">
      <div className="container reach__grid">
        <Reveal>
          <span className="eyebrow eyebrow--light">Global reach</span>
          <h2>85+ countries. 200+ agents. One point of contact.</h2>
          <ul className="reach__list">
            {REGIONS.map((r) => (
              <li
                key={r.name}
                className={active === r.name ? "is-active" : ""}
                onMouseEnter={() => setActive(r.name)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(r.name)}
                onBlur={() => setActive(null)}
                tabIndex={0}
              >
                {r.name}
              </li>
            ))}
          </ul>
        </Reveal>
        <div className="map" role="img" aria-label="Map of our service regions">
          <div className="map__grid" />
          {REGIONS.map((r) => (
            <span
              key={r.name}
              className={`map__dot ${active === r.name ? "is-active" : ""}`}
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

export function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((v) => (v + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section className="section section--tint">
      <div className="container">
        <SectionHead eyebrow="Client stories" title="Shippers who stopped worrying." />
        <div
          className="quotes"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          aria-live="polite"
        >
          {TESTIMONIALS.map((t, idx) => (
            <figure key={t.name} className={`quote ${idx === i ? "is-active" : ""}`} aria-hidden={idx !== i}>
              <blockquote>“{t.quote}”</blockquote>
              <figcaption>
                <span className="avatar">{t.name[0]}</span>
                <b>{t.name}</b>
                <small>{t.place}</small>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="dots" role="tablist" aria-label="Choose testimonial">
          {TESTIMONIALS.map((t, idx) => (
            <button
              key={t.name}
              role="tab"
              aria-selected={idx === i}
              aria-label={`Testimonial from ${t.name}`}
              className={idx === i ? "is-active" : ""}
              onClick={() => setI(idx)}
            />
          ))}
        </div>
        <ul className="partners" aria-label="Partners">
          {PARTNERS.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Contact({ onQuote }: { onQuote: OpenQuote }) {
  return (
    <section id="contact" className="section">
      <div className="container">
        <Reveal className="cta">
          <div>
            <h2>Ready to ship?</h2>
            <p>Get a free quote in one business day, or track a shipment that's already moving.</p>
          </div>
          <div className="cta__actions">
            <button className="btn btn--accent" onClick={() => onQuote()}>
              Get a Free Quote
            </button>
            <a className="btn btn--outline-light" href="#track">
              Track Shipment
            </a>
          </div>
        </Reveal>

        <div className="contact">
          {[
            { k: "Headquarters", v: CONTACT.hq, h: undefined },
            { k: "Phone", v: CONTACT.phone, h: CONTACT.phoneHref },
            { k: "Email", v: CONTACT.email, h: `mailto:${CONTACT.email}` },
            { k: "Office hours", v: CONTACT.hours, h: undefined },
          ].map((c) => (
            <div key={c.k} className="contact__item">
              <small>{c.k}</small>
              {c.h ? <a href={c.h}>{c.v}</a> : <span>{c.v}</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "ok" | "bad">("idle");

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <p className="footer__brand">Global Tropical Cargo</p>
          <p className="footer__muted">Freight forwarding, warehousing and supply chain partner.</p>
          <div className="certs">
            <span>ISO Certified</span>
            <span>FIATA Member</span>
            <span>IATA Approved</span>
          </div>
        </div>
        <nav aria-label="Quick links">
          <h4>Quick links</h4>
          <a href="#services">Services</a>
          <a href="#about">About Us</a>
          <a href="#track">Track Shipment</a>
          <a href="#contact">Contact Us</a>
        </nav>
        <nav aria-label="Services">
          <h4>Services</h4>
          {SERVICES.map((s) => (
            <a key={s.id} href="#services">
              {s.title}
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
          <h4>Logistics news</h4>
          <div className="news">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              aria-label="Email address"
            />
            <button className="btn btn--accent btn--sm">Subscribe</button>
          </div>
          {state === "ok" && <p className="footer__ok">Subscribed — thank you!</p>}
          {state === "bad" && <p className="field-error">Enter a valid email.</p>}
        </form>
      </div>
      <div className="container footer__base">
        <span>© {new Date().getFullYear()} Global Tropical Cargo. Registered in the State of Arizona, USA.</span>
        <span>
          <a href="#home">Privacy Policy</a> · <a href="#home">Terms of Use</a>
        </span>
      </div>
    </footer>
  );
}
