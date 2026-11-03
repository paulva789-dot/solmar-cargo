import { useState } from "react";
import { INCOTERMS } from "../data";
import { useI18n } from "../i18n";
import { Reveal } from "./Sections";

export function Industries() {
  const { t } = useI18n();
  return (
    <section className="section">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">{t.industries.eyebrow}</span>
          <h2>{t.industries.title}</h2>
        </Reveal>
        <div className="inds">
          {t.industries.items.map((i, idx) => (
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

type Filter = "all" | "any" | "sea";

export function Incoterms() {
  const { t } = useI18n();
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<string | null>("FOB");
  const list = INCOTERMS.filter((i) => filter === "all" || (filter === "sea") === i.sea);
  const labels: Record<Filter, string> = { all: t.incoterms.all, any: t.incoterms.any, sea: t.incoterms.sea };

  return (
    <section className="section section--tint">
      <div className="container incoterms">
        <Reveal className="section-head">
          <span className="eyebrow">{t.incoterms.eyebrow}</span>
          <h2>{t.incoterms.title}</h2>
          <p>{t.incoterms.lead}</p>
          <div className="chips" role="group" aria-label={t.incoterms.filterAria}>
            {(["all", "any", "sea"] as const).map((f) => (
              <button key={f} aria-pressed={filter === f} className={filter === f ? "is-on" : ""} onClick={() => setFilter(f)}>
                {labels[f]}
              </button>
            ))}
          </div>
        </Reveal>
        <ul className="terms">
          {list.map((term) => {
            const text = t.incoterms.items[term.code];
            const isOpen = open === term.code;
            return (
              <li key={term.code} className={isOpen ? "is-open" : ""}>
                <button aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : term.code)}>
                  <b>{term.code}</b>
                  <span>{text.name}</span>
                  <em>{term.sea ? t.incoterms.sea : t.incoterms.any}</em>
                </button>
                {isOpen && (
                  <div className="terms__body">
                    <p>{text.summary}</p>
                    <small>
                      {t.incoterms.risk} <b>{text.risk}</b>
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
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section">
      <div className="container faq">
        <Reveal className="section-head">
          <span className="eyebrow">{t.faq.eyebrow}</span>
          <h2>{t.faq.title}</h2>
        </Reveal>
        <div className="acc">
          {t.faq.items.map((f, i) => {
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
