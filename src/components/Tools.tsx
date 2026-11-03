import { useMemo, useState } from "react";
import { CONTAINERS } from "../data";
import { REGION_LIST, canRoad, estimate, isError, usd, volumetricKg, type Mode } from "../lib/estimate";
import type { OpenQuote } from "../types";
import { Reveal } from "./Sections";

type Tab = "estimate" | "volume" | "containers";

const TABS: { id: Tab; label: string }[] = [
  { id: "estimate", label: "Rate estimator" },
  { id: "volume", label: "Volumetric weight" },
  { id: "containers", label: "Container guide" },
];

export function Tools({ onQuote }: { onQuote: OpenQuote }) {
  const [tab, setTab] = useState<Tab>("estimate");

  return (
    <section id="tools" className="section section--tint">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Freight tools</span>
          <h2>Plan before you book.</h2>
          <p>Quick, transparent calculators so you walk into the quote conversation already informed.</p>
        </Reveal>

        <div className="tools">
          <div className="tabs" role="tablist" aria-label="Freight tools">
            {TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={tab === t.id}
                aria-controls={`panel-${t.id}`}
                className={tab === t.id ? "is-active" : ""}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="tools__panel" role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
            {tab === "estimate" && <Estimator onQuote={onQuote} />}
            {tab === "volume" && <Volumetric />}
            {tab === "containers" && <Containers />}
          </div>
        </div>
      </div>
    </section>
  );
}

const num = (s: string) => (s.trim() === "" ? NaN : Number(s));

function Estimator({ onQuote }: { onQuote: OpenQuote }) {
  const [mode, setMode] = useState<Mode>("ocean");
  const [from, setFrom] = useState("apac");
  const [to, setTo] = useState("na");
  const [weight, setWeight] = useState("1200");
  const [volume, setVolume] = useState("3");

  const result = useMemo(
    () => estimate({ mode, from, to, weightKg: num(weight), volumeCbm: num(volume) || 0 }),
    [mode, from, to, weight, volume]
  );
  const roadOk = canRoad(from, to);
  const regionName = (id: string) => REGION_LIST.find((r) => r.id === id)?.name ?? id;

  return (
    <div className="est">
      <div className="est__form">
        <fieldset className="seg">
          <legend>Mode</legend>
          {(["ocean", "air", "road"] as Mode[]).map((m) => (
            <label key={m} className={mode === m ? "is-on" : ""}>
              <input type="radio" name="mode" checked={mode === m} onChange={() => setMode(m)} />
              {m === "ocean" ? "Ocean" : m === "air" ? "Air" : "Road"}
            </label>
          ))}
        </fieldset>
        <div className="grid2">
          <label className="field">
            <span>From</span>
            <select value={from} onChange={(e) => setFrom(e.target.value)}>
              {REGION_LIST.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>To</span>
            <select value={to} onChange={(e) => setTo(e.target.value)}>
              {REGION_LIST.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Weight (kg)</span>
            <input inputMode="decimal" value={weight} onChange={(e) => setWeight(e.target.value)} />
          </label>
          <label className="field">
            <span>Volume (m³)</span>
            <input inputMode="decimal" value={volume} onChange={(e) => setVolume(e.target.value)} />
          </label>
        </div>
        {mode === "road" && !roadOk && (
          <p className="hint">Road isn't available between those regions — try air or ocean.</p>
        )}
      </div>

      <div className="est__out" aria-live="polite">
        {isError(result) ? (
          <p className="est__empty">{result.error}</p>
        ) : (
          <>
            <small>Indicative range</small>
            <b className="est__price">
              {usd(result.low)} – {usd(result.high)}
            </b>
            <dl className="est__meta">
              <div>
                <dt>Transit</dt>
                <dd>
                  {result.transitMin}–{result.transitMax} days
                </dd>
              </div>
              <div>
                <dt>Chargeable</dt>
                <dd>
                  {result.chargeable.toLocaleString()} {result.unit === "t" ? "rev. tonnes" : "kg"}
                </dd>
              </div>
            </dl>
            <button
              className="btn btn--primary btn--block"
              onClick={() =>
                onQuote({
                  service: mode === "ocean" ? "Ocean Freight" : mode === "air" ? "Air Freight" : "Road Transport",
                  from: regionName(from),
                  to: regionName(to),
                  details: `Approx. ${weight} kg / ${volume || 0} m³. Estimator range ${usd(result.low)}–${usd(result.high)}.`,
                })
              }
            >
              Get a confirmed quote
            </button>
            <p className="est__disclaimer">
              Estimate only. Excludes duties, taxes, insurance and surcharges. Final pricing depends on carrier, date and cargo.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function Volumetric() {
  const [l, setL] = useState("60");
  const [w, setW] = useState("50");
  const [h, setH] = useState("40");
  const [pcs, setPcs] = useState("1");
  const [actual, setActual] = useState("12");

  const vol = volumetricKg(num(l) || 0, num(w) || 0, num(h) || 0, Math.max(1, Math.floor(num(pcs) || 1)));
  const act = num(actual) || 0;
  const charge = Math.max(vol, act);

  return (
    <div className="est">
      <div className="est__form">
        <div className="grid2">
          {[
            ["Length (cm)", l, setL],
            ["Width (cm)", w, setW],
            ["Height (cm)", h, setH],
            ["Pieces", pcs, setPcs],
          ].map(([label, val, set]) => (
            <label className="field" key={label as string}>
              <span>{label as string}</span>
              <input
                inputMode="decimal"
                value={val as string}
                onChange={(e) => (set as (v: string) => void)(e.target.value)}
              />
            </label>
          ))}
        </div>
        <label className="field">
          <span>Actual total weight (kg)</span>
          <input inputMode="decimal" value={actual} onChange={(e) => setActual(e.target.value)} />
        </label>
      </div>
      <div className="est__out" aria-live="polite">
        <small>Chargeable weight (air)</small>
        <b className="est__price">{Math.round(charge * 10) / 10} kg</b>
        <dl className="est__meta">
          <div>
            <dt>Volumetric</dt>
            <dd>{Math.round(vol * 10) / 10} kg</dd>
          </div>
          <div>
            <dt>Actual</dt>
            <dd>{act} kg</dd>
          </div>
        </dl>
        <p className="est__disclaimer">
          Formula: L × W × H ÷ 6000 per piece. Airlines bill the greater of volumetric and actual weight.
        </p>
      </div>
    </div>
  );
}

function Containers() {
  return (
    <div className="table-wrap">
      <table className="table">
        <caption className="sr-only">Typical shipping container dimensions and capacity</caption>
        <thead>
          <tr>
            <th scope="col">Type</th>
            <th scope="col">Length</th>
            <th scope="col">Width</th>
            <th scope="col">Height</th>
            <th scope="col">Volume</th>
            <th scope="col">Max payload</th>
          </tr>
        </thead>
        <tbody>
          {CONTAINERS.map((c) => (
            <tr key={c.type}>
              <th scope="row">{c.type}</th>
              <td>{c.length}</td>
              <td>{c.width}</td>
              <td>{c.height}</td>
              <td>{c.volume}</td>
              <td>{c.payload}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="est__disclaimer">Internal dimensions are typical values and vary slightly by manufacturer and line.</p>
    </div>
  );
}
