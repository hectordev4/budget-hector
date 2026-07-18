export interface ContractedService {
  name: string;
  details?: string;
}

export interface SavedQuote {
  id: number;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  services: ContractedService[];
  totalPrice: number;
  date: Date;
}