import { FormEvent, useEffect, useState } from "react";

interface TrackEvent {
  label: string;
  place: string;
  done: boolean;
}

interface Timeline {
  events: TrackEvent[];
  eta: string;
  percent: number;
}

const REF_RE = /^[A-Z0-9-]{6,20}$/;
const KEY = "gtc-recent-refs";

/** Deterministic demo timeline derived from the reference number. */
export function buildTimeline(ref: string): Timeline {
  const seed = [...ref].reduce((a, c) => a + c.charCodeAt(0), 0);
  const stage = (seed % 4) + 1;
  const places = ["Phoenix, AZ", "Port of Long Beach, CA", "Pacific Transit", "Destination Hub"];
  const labels = ["Cargo received", "Customs cleared", "In transit", "Out for delivery"];
  const eta = new Date(Date.now() + (5 - stage) * 2 * 86400000).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
  return {
    events: labels.map((label, i) => ({ label, place: places[i], done: i < stage })),
    eta,
    percent: Math.round((stage / 4) * 100),
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
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<Timeline | null>(null);
  const [ref, setRef] = useState("");
  const [recent, setRecent] = useState<string[]>(loadRecent);
  const [copied, setCopied] = useState(false);

  const run = (raw: string) => {
    const v = raw.trim().toUpperCase();
    if (!REF_RE.test(v)) {
      setError("Enter 6–20 letters, numbers or dashes.");
      setResult(null);
      return;
    }
    setError("");
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
    const t = new URLSearchParams(window.location.search).get("track");
    if (t) run(t);
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
      window.prompt("Copy this link", url);
    }
  };

  return (
    <div className="tracker" id="track">
      <form onSubmit={submit} noValidate>
        <label htmlFor="ref" className="tracker__label">
          Track a shipment
        </label>
        <div className="tracker__row">
          <input
            id="ref"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter reference number"
            autoComplete="off"
            aria-invalid={!!error}
            aria-describedby={error ? "ref-err" : undefined}
          />
          <button className="btn btn--accent" type="submit">
            Track Now
          </button>
        </div>
        {error && (
          <p id="ref-err" className="field-error" role="alert">
            {error}
          </p>
        )}
        {recent.length > 0 && !result && (
          <p className="tracker__recent">
            Recent:
            {recent.map((r) => (
              <button type="button" key={r} onClick={() => run(r)}>
                {r}
              </button>
            ))}
          </p>
        )}
      </form>

      {result && (
        <div className="tracker__result" aria-live="polite">
          <div className="tracker__head">
            <strong>{ref}</strong>
            <span>Est. arrival {result.eta}</span>
          </div>
          <div
            className="bar"
            role="progressbar"
            aria-valuenow={result.percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Shipment progress"
          >
            <i style={{ width: `${result.percent}%` }} />
          </div>
          <ol className="timeline">
            {result.events.map((ev) => (
              <li key={ev.label} className={ev.done ? "is-done" : ""}>
                <span className="timeline__dot" />
                <div>
                  <b>{ev.label}</b>
                  <small>{ev.place}</small>
                </div>
              </li>
            ))}
          </ol>
          <div className="tracker__foot">
            <button type="button" className="link" onClick={copy}>
              {copied ? "Link copied ✓" : "Copy share link"}
            </button>
            <span>Demo data — connect a tracking API for live status.</span>
          </div>
        </div>
      )}
    </div>
  );
}
