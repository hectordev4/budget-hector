export interface EncodedServicePayload {
  t: string;
  base: number;
  pages: number;
  langs: number;
}

export interface EncodedQuotePayload {
  n: string;
  e: string;
  p: string;
  d: string;
  t: number;
  s: EncodedServicePayload[];
}