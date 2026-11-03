import type { IconName } from "../data";

const PATHS: Record<IconName, JSX.Element> = {
  ship: (
    <>
      <path d="M3 17l1.5 3h15L21 17" />
      <path d="M5 17V11h14v6" />
      <path d="M12 11V5h3" />
      <path d="M8 11V8h4" />
    </>
  ),
  plane: <path d="M10.5 13.5L3 11l1-2 8 .5L17 4l2 .5-2.5 6 4 1.5v2l-5-.5-3 5-2 .5 1-5.5z" />,
  truck: (
    <>
      <path d="M2 6h11v10H2zM13 9h4l3 3v4h-7" />
      <circle cx="7" cy="17.5" r="1.8" />
      <circle cx="17" cy="17.5" r="1.8" />
    </>
  ),
  doc: (
    <>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v4h4M9 12h6M9 16h6" />
    </>
  ),
  warehouse: (
    <>
      <path d="M3 10l9-6 9 6v10H3z" />
      <path d="M8 20v-6h8v6M8 17h8" />
    </>
  ),
  chain: (
    <>
      <circle cx="5" cy="12" r="2.5" />
      <circle cx="19" cy="6" r="2.5" />
      <circle cx="19" cy="18" r="2.5" />
      <path d="M7.3 11l9.4-4M7.3 13l9.4 4" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
      <path d="M8.5 12l2.5 2.5 4.5-5" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.2 7-11.5A7 7 0 005 9.5C5 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1-4 4-6 8-6s7 2 8 6" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
    </>
  ),
};

export function Icon({ name, size = 24 }: { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
