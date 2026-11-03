export interface QuoteSeed {
  service?: string;
  from?: string;
  to?: string;
  details?: string;
}

export type OpenQuote = (seed?: QuoteSeed) => void;
