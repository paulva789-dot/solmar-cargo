import { useMemo, useState } from "react";
import { CONTAINERS } from "../data";
import { useI18n } from "../i18n";
import { REGION_LIST, canRoad, estimate, isError, usd, volumetricKg, type Mode } from "../lib/estimate";
import type { OpenQuote } from "../types";
import { Reveal } from "./Sections";

type Tab = "estimate" | "volume" | "containers";
const TAB_IDS: Tab[] = ["estimate", "volume", "containers"];

export function Tools({ onQuote }: { onQuote: OpenQuote }) {
  const { t } = useI18n();
  const [tab, setTab] = useState<Tab>("estimate");

  return (
    <section id="tools" className="section section--tint">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">{t.tools.eyebrow}</span>
          <h2>{t.tools.title}</h2>
          <p>{t.tools.lead}</p>
        </Reveal>

        <div className="tools">
          <div className="tabs" role="tablist" aria-label={t.tools.aria}>
            {TAB_IDS.map((id) => (
              <button
                key={id}
                role="tab"
                id={`tab-${id}`}
                aria-selected={tab === id}
                aria-controls={`panel-${id}`}
                className={tab === id ? "is-active" : ""}
                onClick={() => setTab(id)}
              >
                {t.tools.tabs[id]}
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

const num = (s: string) => (s.trim() === "" ? NaN : Number(s.replace(",", ".")));

function RegionSelect({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const { t } = useI18n();
  return (
    <label className="field">
      <span>{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {REGION_LIST.map((r) => (
          <option key={r.id} value={r.id}>
            {t.reach.regions[r.id]}
          </option>
        ))}
      </select>
    </label>
  );
}

function Estimator({ onQuote }: { onQuote: OpenQuote }) {
  const { t } = useI18n();
  const e = t.tools.est;
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

  return (
    <div className="est">
      <div className="est__form">
        <fieldset className="seg">
          <legend>{e.mode}</legend>
          {(["ocean", "air", "road"] as Mode[]).map((m) => (
            <label key={m} className={mode === m ? "is-on" : ""}>
              <input type="radio" name="mode" checked={mode === m} onChange={() => setMode(m)} />
              {e.modes[m]}
            </label>
          ))}
        </fieldset>
        <div className="grid2">
          <RegionSelect label={e.from} value={from} onChange={setFrom} />
          <RegionSelect label={e.to} value={to} onChange={setTo} />
          <label className="field">
            <span>{e.weight}</span>
            <input inputMode="decimal" value={weight} onChange={(ev) => setWeight(ev.target.value)} />
          </label>
          <label className="field">
            <span>{e.volume}</span>
            <input inputMode="decimal" value={volume} onChange={(ev) => setVolume(ev.target.value)} />
          </label>
        </div>
        {mode === "road" && !roadOk && <p className="hint">{e.roadHint}</p>}
      </div>

      <div className="est__out" aria-live="polite">
        {isError(result) ? (
          <p className="est__empty">{e.errors[result.error]}</p>
        ) : (
          <>
            <small>{e.range}</small>
            <b className="est__price">
              {usd(result.low, t.locale)} – {usd(result.high, t.locale)}
            </b>
            <dl className="est__meta">
              <div>
                <dt>{e.transit}</dt>
                <dd>{e.days(result.transitMin, result.transitMax)}</dd>
              </div>
              <div>
                <dt>{e.chargeable}</dt>
                <dd>
                  {result.chargeable.toLocaleString(t.locale)} {result.unit === "t" ? e.revTonnes : e.kg}
                </dd>
              </div>
            </dl>
            <button
              className="btn btn--primary btn--block"
              onClick={() =>
                onQuote({
                  service: mode,
                  from: t.reach.regions[from],
                  to: t.reach.regions[to],
                  details: e.seedDetails(weight, volume || "0", usd(result.low, t.locale), usd(result.high, t.locale)),
                })
              }
            >
              {e.confirm}
            </button>
            <p className="est__disclaimer">{e.disclaimer}</p>
          </>
        )}
      </div>
    </div>
  );
}

function Volumetric() {
  const { t } = useI18n();
  const v = t.tools.vol;
  const [l, setL] = useState("60");
  const [w, setW] = useState("50");
  const [h, setH] = useState("40");
  const [pcs, setPcs] = useState("1");
  const [actual, setActual] = useState("12");

  const vol = volumetricKg(num(l) || 0, num(w) || 0, num(h) || 0, Math.max(1, Math.floor(num(pcs) || 1)));
  const act = num(actual) || 0;
  const charge = Math.max(vol, act);
  const fmt = (n: number) => (Math.round(n * 10) / 10).toLocaleString(t.locale);

  const fields: [string, string, (s: string) => void][] = [
    [v.length, l, setL],
    [v.width, w, setW],
    [v.height, h, setH],
    [v.pieces, pcs, setPcs],
  ];

  return (
    <div className="est">
      <div className="est__form">
        <div className="grid2">
          {fields.map(([label, val, set]) => (
            <label className="field" key={label}>
              <span>{label}</span>
              <input inputMode="decimal" value={val} onChange={(ev) => set(ev.target.value)} />
            </label>
          ))}
        </div>
        <label className="field">
          <span>{v.actual}</span>
          <input inputMode="decimal" value={actual} onChange={(ev) => setActual(ev.target.value)} />
        </label>
      </div>
      <div className="est__out" aria-live="polite">
        <small>{v.result}</small>
        <b className="est__price">{fmt(charge)} kg</b>
        <dl className="est__meta">
          <div>
            <dt>{v.volumetric}</dt>
            <dd>{fmt(vol)} kg</dd>
          </div>
          <div>
            <dt>{v.actualShort}</dt>
            <dd>{fmt(act)} kg</dd>
          </div>
        </dl>
        <p className="est__disclaimer">{v.formula}</p>
      </div>
    </div>
  );
}

function Containers() {
  const { t } = useI18n();
  const c = t.tools.cont;
  return (
    <div className="table-wrap">
      <table className="table">
        <caption className="sr-only">{c.caption}</caption>
        <thead>
          <tr>
            <th scope="col">{c.cols.type}</th>
            <th scope="col">{c.cols.length}</th>
            <th scope="col">{c.cols.width}</th>
            <th scope="col">{c.cols.height}</th>
            <th scope="col">{c.cols.volume}</th>
            <th scope="col">{c.cols.payload}</th>
          </tr>
        </thead>
        <tbody>
          {CONTAINERS.map((row) => (
            <tr key={row.id}>
              <th scope="row">{c.names[row.id]}</th>
              <td>{row.length}</td>
              <td>{row.width}</td>
              <td>{row.height}</td>
              <td>{row.volume}</td>
              <td>{row.payload}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="est__disclaimer">{c.note}</p>
    </div>
  );
}
