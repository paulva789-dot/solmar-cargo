import { FormEvent, useEffect, useRef, useState } from "react";
import { SERVICES } from "../data";
import type { QuoteSeed } from "../types";

interface Form {
  name: string;
  email: string;
  service: string;
  from: string;
  to: string;
  details: string;
}

const EMPTY: Form = { name: "", email: "", service: SERVICES[0].title, from: "", to: "", details: "" };

export function QuoteModal({ open, seed, onClose }: { open: boolean; seed: QuoteSeed | null; onClose: () => void }) {
  const [form, setForm] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
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
    const errs: typeof errors = {};
    if (form.name.trim().length < 2) errs.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Enter a valid email.";
    if (!form.from.trim()) errs.from = "Where is it shipping from?";
    if (!form.to.trim()) errs.to = "Where is it going?";
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
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="quote-title" onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <div className="modal__card">
        <button className="modal__x" onClick={close} aria-label="Close">
          ×
        </button>
        {sent ? (
          <div className="modal__done">
            <div className="check" aria-hidden="true">✓</div>
            <h3 id="quote-title">Request received</h3>
            <p>
              Thanks {form.name.split(" ")[0]} — a logistics specialist will reply to <b>{form.email}</b> within one
              business day.
            </p>
            <button className="btn btn--primary" onClick={close}>
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate>
            <h3 id="quote-title">Get a free quote</h3>
            <p className="modal__sub">Tell us about your shipment and we'll come back with options.</p>
            <div className="grid2">
              <Field label="Full name" error={errors.name}>
                <input ref={firstRef} value={form.name} onChange={(e) => set("name", e.target.value)} />
              </Field>
              <Field label="Email" error={errors.email}>
                <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
              </Field>
              <Field label="Origin" error={errors.from}>
                <input value={form.from} onChange={(e) => set("from", e.target.value)} />
              </Field>
              <Field label="Destination" error={errors.to}>
                <input value={form.to} onChange={(e) => set("to", e.target.value)} />
              </Field>
            </div>
            <Field label="Service">
              <select value={form.service} onChange={(e) => set("service", e.target.value)}>
                {SERVICES.map((s) => (
                  <option key={s.id}>{s.title}</option>
                ))}
              </select>
            </Field>
            <Field label="Cargo details (optional)">
              <textarea rows={3} value={form.details} onChange={(e) => set("details", e.target.value)} />
            </Field>
            <button className="btn btn--primary btn--block" type="submit">
              Request quote
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className={`field ${error ? "has-error" : ""}`}>
      <span>{label}</span>
      {children}
      {error && <em className="field-error">{error}</em>}
    </label>
  );
}
