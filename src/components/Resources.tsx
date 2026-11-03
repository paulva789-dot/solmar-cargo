import { useState } from "react";
import { FAQ, INCOTERMS, INDUSTRIES } from "../data";
import { Reveal } from "./Sections";

export function Industries() {
  return (
    <section className="section">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Industries</span>
          <h2>Built around how your cargo behaves.</h2>
        </Reveal>
        <div className="inds">
          {INDUSTRIES.map((i, idx) => (
            <Reveal key={i.name}>
              <div className="ind">
                <span className="ind__n">{String(idx + 1).padStart(2, "0")}</span>
                <h3>{i.name}</h3>
                <p>{i.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Incoterms() {
  const [filter, setFilter] = useState<"All" | "Any mode" | "Sea only">("All");
  const [open, setOpen] = useState<string | null>("FOB");
  const list = INCOTERMS.filter((i) => filter === "All" || i.modes === filter);

  return (
    <section className="section section--tint">
      <div className="container incoterms">
        <Reveal className="section-head">
          <span className="eyebrow">Trade terms</span>
          <h2>Incoterms® 2020, in plain English.</h2>
          <p>Know exactly where cost and risk move from seller to buyer before you sign a contract.</p>
          <div className="chips" role="group" aria-label="Filter by transport mode">
            {(["All", "Any mode", "Sea only"] as const).map((f) => (
              <button key={f} aria-pressed={filter === f} className={filter === f ? "is-on" : ""} onClick={() => setFilter(f)}>
                {f}
              </button>
            ))}
          </div>
        </Reveal>
        <ul className="terms">
          {list.map((t) => {
            const isOpen = open === t.code;
            return (
              <li key={t.code} className={isOpen ? "is-open" : ""}>
                <button aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : t.code)}>
                  <b>{t.code}</b>
                  <span>{t.name}</span>
                  <em>{t.modes}</em>
                </button>
                {isOpen && (
                  <div className="terms__body">
                    <p>{t.summary}</p>
                    <small>
                      Risk transfers: <b>{t.risk}</b>
                    </small>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section">
      <div className="container faq">
        <Reveal className="section-head">
          <span className="eyebrow">FAQ</span>
          <h2>Questions shippers ask us most.</h2>
        </Reveal>
        <div className="acc">
          {FAQ.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className={`acc__item ${isOpen ? "is-open" : ""}`}>
                <h3>
                  <button aria-expanded={isOpen} aria-controls={`faq-${i}`} id={`faq-h-${i}`} onClick={() => setOpen(isOpen ? null : i)}>
                    {f.q}
                    <span aria-hidden="true">+</span>
                  </button>
                </h3>
                <div id={`faq-${i}`} role="region" aria-labelledby={`faq-h-${i}`} hidden={!isOpen}>
                  <p>{f.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
