import { FormEvent, useEffect, useState } from "react";
import { useI18n } from "../i18n";

interface Timeline {
  /** How many stages are complete (1–4). */
  stage: number;
  etaMs: number;
  percent: number;
}

const REF_RE = /^[A-Z0-9-]{6,20}$/;
const KEY = "sm-recent-refs";
const STAGES = 4;

/** Deterministic demo progress derived from the reference number (language-independent). */
export function buildTimeline(ref: string, now = Date.now()): Timeline {
  const seed = [...ref].reduce((a, c) => a + c.charCodeAt(0), 0);
  const stage = (seed % STAGES) + 1;
  return {
    stage,
    etaMs: now + (STAGES + 1 - stage) * 2 * 86400000,
    percent: Math.round((stage / STAGES) * 100),
  };
}

function loadRecent(): string[] {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(raw) ? raw.filter((x): x is string => typeof x === "string").slice(0, 4) : [];
  } catch {
    return [];
  }
}

export function Tracker() {
  const { t, lang } = useI18n();
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [result, setResult] = useState<Timeline | null>(null);
  const [ref, setRef] = useState("");
  const [recent, setRecent] = useState<string[]>(loadRecent);
  const [copied, setCopied] = useState(false);

  const run = (raw: string) => {
    const v = raw.trim().toUpperCase();
    if (!REF_RE.test(v)) {
      setError(true);
      setResult(null);
      return;
    }
    setError(false);
    setValue(v);
    setRef(v);
    setResult(buildTimeline(v));
    setCopied(false);
    const next = [v, ...recent.filter((r) => r !== v)].slice(0, 4);
    setRecent(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable */
    }
  };

  // Support deep links: ?track=ABC123456
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("track");
    if (q) run(q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    run(value);
  };

  const copy = async () => {
    const url = `${window.location.origin}${window.location.pathname}?track=${encodeURIComponent(ref)}#track`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      window.prompt(t.tracker.copyPrompt, url);
    }
  };

  const eta = result
    ? new Date(result.etaMs).toLocaleDateString(t.locale, { month: "short", day: "numeric" })
    : "";

  return (
    <div className="tracker" id="track">
      <form onSubmit={submit} noValidate>
        <label htmlFor="ref" className="tracker__label">
          {t.tracker.title}
        </label>
        <div className="tracker__row">
          <input
            id="ref"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={t.tracker.placeholder}
            autoComplete="off"
            aria-invalid={error}
            aria-describedby={error ? "ref-err" : undefined}
          />
          <button className="btn btn--accent" type="submit">
            {t.tracker.button}
          </button>
        </div>
        {error && (
          <p id="ref-err" className="field-error" role="alert">
            {t.tracker.errorFormat}
          </p>
        )}
        {recent.length > 0 && !result && (
          <p className="tracker__recent">
            {t.tracker.recent}
            {recent.map((r) => (
              <button type="button" key={r} onClick={() => run(r)}>
                {r}
              </button>
            ))}
          </p>
        )}
      </form>

      {result && (
        <div className="tracker__result" aria-live="polite" lang={lang}>
          <div className="tracker__head">
            <strong>{ref}</strong>
            <span>{t.tracker.eta(eta)}</span>
          </div>
          <div
            className="bar"
            role="progressbar"
            aria-valuenow={result.percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={t.tracker.progress}
          >
            <i style={{ width: `${result.percent}%` }} />
          </div>
          <ol className="timeline">
            {t.tracker.stages.map((s, i) => (
              <li key={s.label} className={i < result.stage ? "is-done" : ""}>
                <span className="timeline__dot" />
                <div>
                  <b>{s.label}</b>
                  <small>{s.place}</small>
                </div>
              </li>
            ))}
          </ol>
          <div className="tracker__foot">
            <button type="button" className="link" onClick={copy}>
              {copied ? t.tracker.copied : t.tracker.share}
            </button>
            <span>{t.tracker.demo}</span>
          </div>
        </div>
      )}
    </div>
  );
}
