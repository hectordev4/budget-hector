export interface EncodedServicePayload {
  t: string;     // Service title/name (e.g., 'Web', 'SEO', 'Ads')
  base: number; // Base price (optional for legacy backward compatibility)
  pages: number;
  langs: number;
}

export interface EncodedQuotePayload {
  n: string;                  // Client name
  e: string;                  // Client email
  p: string;                  // Client phone
  d: string;                  // Generation date string (DD/MM/YYYY)
  t: number;                  // Total price
  s: EncodedServicePayload[]; // Array of compressed services
}