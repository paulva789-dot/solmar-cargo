export interface QuoteSeed {
  /** A service id from data.ts (e.g. "ocean"). */
  service?: string;
  from?: string;
  to?: string;
  details?: string;
}

export type OpenQuote = (seed?: QuoteSeed) => void;
