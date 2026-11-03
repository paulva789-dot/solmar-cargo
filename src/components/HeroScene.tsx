/** Illustrated hero artwork: a laden container ship at sunset, dock cranes, an island and layered waves. */

const COLORS = ["#ff6b4a", "#ffb84d", "#2fb7b0", "#f4efe4", "#0e8a96", "#e8512f", "#ffd27a", "#7fd6cf", "#ff8f6b"];

interface Box {
  x: number;
  y: number;
  c: string;
}

/** Three tiers of containers stacked on the deck (pseudo-random but stable colours). */
function containers(): Box[] {
  const boxes: Box[] = [];
  const tiers = [
    { y: 190, from: 0, to: 8 },
    { y: 168, from: 1, to: 8 },
    { y: 146, from: 2, to: 6 },
  ];
  tiers.forEach((tier, ti) => {
    for (let i = tier.from; i <= tier.to; i++) {
      boxes.push({ x: 548 + i * 30, y: tier.y, c: COLORS[(i * 3 + ti * 2) % COLORS.length] });
    }
  });
  return boxes;
}

const BOXES = containers();

const WAVE_A =
  "M-200 242C-80 230 40 254 160 242S400 230 520 242 760 254 880 242 1120 230 1240 242 1480 254 1640 242V340H-200Z";
const WAVE_B =
  "M-200 266C-70 254 60 278 190 266S450 254 580 266 840 278 970 266 1230 254 1360 266 1580 278 1640 266V340H-200Z";
const WAVE_C =
  "M-200 296C-90 286 20 306 140 296S380 286 500 296 740 306 860 296 1100 286 1220 296 1460 306 1640 296V340H-200Z";

export function HeroScene() {
  return (
    <svg className="hero__scene" viewBox="0 0 1440 340" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="sm-sun">
          <stop offset="0" stopColor="#fff3c4" />
          <stop offset="0.45" stopColor="#ffb84d" />
          <stop offset="1" stopColor="#ff6b4a" />
        </radialGradient>
        <radialGradient id="sm-glow">
          <stop offset="0" stopColor="#ffb84d" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffb84d" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sm-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0e6c78" />
          <stop offset="1" stopColor="#08343d" />
        </linearGradient>
      </defs>

      {/* Sun and glow */}
      <circle cx="1010" cy="205" r="230" fill="url(#sm-glow)" />
      <circle cx="1010" cy="205" r="92" fill="url(#sm-sun)" />

      {/* Distant islands and a palm */}
      <path d="M0 214C60 190 110 196 170 208L195 214Z" fill="#06303a" opacity="0.9" />
      <path d="M1240 214C1290 186 1360 192 1440 206V214Z" fill="#06303a" opacity="0.9" />
      <g stroke="#04252d" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M1330 202C1334 182 1338 168 1346 156" />
        <path d="M1346 156C1330 150 1318 156 1310 166" />
        <path d="M1346 156C1360 148 1374 152 1382 162" />
        <path d="M1346 156C1344 140 1352 130 1364 126" />
        <path d="M1346 156C1334 142 1326 138 1316 138" />
      </g>

      {/* Birds */}
      <g stroke="#fff" strokeOpacity="0.7" strokeWidth="2" fill="none" strokeLinecap="round">
        <path d="M720 96q8-8 16 0q8-8 16 0" />
        <path d="M770 70q6-6 12 0q6-6 12 0" />
        <path d="M1180 110q6-6 12 0q6-6 12 0" />
      </g>

      {/* Sea */}
      <rect x="0" y="210" width="1440" height="130" fill="url(#sm-sea)" />
      <g stroke="#ffb84d" strokeOpacity="0.5" strokeWidth="3" strokeLinecap="round">
        <line x1="975" y1="222" x2="1045" y2="222" />
        <line x1="990" y1="232" x2="1030" y2="232" />
        <line x1="1000" y1="243" x2="1022" y2="243" />
      </g>

      {/* Dock + gantry cranes */}
      <rect x="0" y="212" width="330" height="14" fill="#04252d" />
      <g stroke="#04252d" strokeWidth="5" fill="none" strokeLinejoin="round">
        <path d="M80 212L92 142H144L156 212" />
        <path d="M70 142H280" />
        <path d="M92 142L118 112 144 142" />
        <path d="M250 142V176" />
        <path d="M205 212L215 150H255L265 212" />
      </g>
      <rect x="244" y="176" width="14" height="10" fill="#ff6b4a" />
      <g fill="#04252d">
        <rect x="20" y="198" width="26" height="14" />
        <rect x="48" y="198" width="26" height="14" />
        <rect x="34" y="184" width="26" height="14" />
      </g>

      {/* Ship */}
      <g className="scene-ship">
        <polygon points="500,212 905,212 890,242 540,242" fill="#0a2a33" />
        <polygon points="538,234 891,234 890,242 540,242" fill="#e8512f" />
        <rect x="506" y="209" width="397" height="3" fill="#f4efe4" opacity="0.85" />
        {BOXES.map((b) => (
          <g key={`${b.x}-${b.y}`}>
            <rect x={b.x} y={b.y} width="28" height="22" fill={b.c} />
            <rect x={b.x} y={b.y} width="28" height="3" fill="#000" opacity="0.15" />
            <path d={`M${b.x + 7} ${b.y + 3}v19M${b.x + 14} ${b.y + 3}v19M${b.x + 21} ${b.y + 3}v19`} stroke="#000" strokeOpacity="0.14" />
          </g>
        ))}
        {/* Bridge tower, funnel and mast */}
        <rect x="822" y="150" width="62" height="62" fill="#f4efe4" />
        <rect x="828" y="160" width="50" height="8" fill="#0e5f6b" />
        <rect x="828" y="176" width="50" height="6" fill="#0e5f6b" opacity="0.7" />
        <rect x="832" y="138" width="42" height="12" fill="#f4efe4" />
        <rect x="860" y="118" width="16" height="22" fill="#ff6b4a" />
        <rect x="860" y="118" width="16" height="4" fill="#0a2a33" />
        <path d="M846 138V104M838 112h16" stroke="#0a2a33" strokeWidth="2" />
      </g>

      {/* Wake */}
      <path d="M905 238C960 244 1010 240 1060 246" stroke="#fff" strokeOpacity="0.35" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Waves, front to back */}
      <path className="wave wave--a" d={WAVE_A} fill="rgba(255,255,255,0.1)" />
      <path className="wave wave--b" d={WAVE_B} fill="rgba(8,52,61,0.55)" />
      <path className="wave wave--sand" d={WAVE_C} />
    </svg>
  );
}
