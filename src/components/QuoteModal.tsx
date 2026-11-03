import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";
import { SERVICES } from "../data";
import { useI18n } from "../i18n";
import type { QuoteSeed } from "../types";

interface Form {
  name: string;
  email: string;
  service: string;
  from: string;
  to: string;
  details: string;
}

type Errors = Partial<Record<"name" | "email" | "from" | "to", string>>;

const EMPTY: Form = { name: "", email: "", service: SERVICES[0].id, from: "", to: "", details: "" };

export function QuoteModal({ open, seed, onClose }: { open: boolean; seed: QuoteSeed | null; onClose: () => void }) {
  const { t } = useI18n();
  const q = t.quote;
  const [form, setForm] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setForm({ ...EMPTY, ...seed });
  }, [open, seed]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    firstRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const errs: Errors = {};
    if (form.name.trim().length < 2) errs.name = q.errName;
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = q.errEmail;
    if (!form.from.trim()) errs.from = q.errFrom;
    if (!form.to.trim()) errs.to = q.errTo;
    setErrors(errs);
    if (Object.keys(errs).length === 0) setSent(true);
  };

  const close = () => {
    setSent(false);
    setForm(EMPTY);
    setErrors({});
    onClose();
  };

  return (
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-title"
      onMouseDown={(e) => e.target === e.currentTarget && close()}
    >
      <div className="modal__card">
        <button className="modal__x" onClick={close} aria-label={q.close}>
          ×
        </button>
        {sent ? (
          <div className="modal__done">
            <div className="check" aria-hidden="true">
              ✓
            </div>
            <h3 id="quote-title">{q.doneTitle}</h3>
            <p>{q.done(form.name.trim().split(" ")[0], form.email)}</p>
            <button className="btn btn--primary" onClick={close}>
              {q.ok}
            </button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate>
            <h3 id="quote-title">{q.title}</h3>
            <p className="modal__sub">{q.sub}</p>
            <div className="grid2">
              <Field label={q.name} error={errors.name}>
                <input ref={firstRef} value={form.name} onChange={(e) => set("name", e.target.value)} />
              </Field>
              <Field label={q.email} error={errors.email}>
                <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
              </Field>
              <Field label={q.origin} error={errors.from}>
                <input value={form.from} onChange={(e) => set("from", e.target.value)} />
              </Field>
              <Field label={q.destination} error={errors.to}>
                <input value={form.to} onChange={(e) => set("to", e.target.value)} />
              </Field>
            </div>
            <Field label={q.service}>
              <select value={form.service} onChange={(e) => set("service", e.target.value)}>
                {SERVICES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {t.services.items[s.id].title}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={q.details}>
              <textarea rows={3} value={form.details} onChange={(e) => set("details", e.target.value)} />
            </Field>
            <button className="btn btn--primary btn--block" type="submit">
              {q.submit}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className={`field ${error ? "has-error" : ""}`}>
      <span>{label}</span>
      {children}
      {error && <em className="field-error">{error}</em>}
    </label>
  );
}
