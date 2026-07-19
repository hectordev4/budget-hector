import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SavedQuote } from '../models/SavedQuote';

@Injectable({
  providedIn: 'root'
})
export class OngoingQuotesService {
  private http = inject(HttpClient);
  private jsonUrl = 'data/QuotesData.json'; 

  private quotesSignal = signal<SavedQuote[]>([]);
  quotes = this.quotesSignal.asReadonly();

  constructor() {
    this.loadInitialQuotes();
  }

  private loadInitialQuotes(): void {
    this.http.get<SavedQuote[]>(this.jsonUrl).subscribe({
      next: (data) => {
        const parsedData = data.map(quote => ({
          ...quote,
          date: new Date(quote.date)
        }));
        this.quotesSignal.set(parsedData);
      },
      error: (err) => console.error('Failed to load initial quotes dataset', err)
    });
  }

  addQuote(newQuote: Omit<SavedQuote, 'id' | 'date'>): void {
    this.quotesSignal.update(currentQuotes => [
      ...currentQuotes,
      {
        ...newQuote,
        id: currentQuotes.length + 1,
        date: new Date()
      }
    ]);
  }

  
  generateQuoteHash(quote: SavedQuote): string {
  // Ensure we get a clean, predictable DD/MM/YYYY string format
    const targetDate = quote.date instanceof Date ? quote.date : new Date(quote.date);
    
    const day = String(targetDate.getDate()).padStart(2, '0');
    const month = String(targetDate.getMonth() + 1).padStart(2, '0');
    const year = targetDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    const dataPayload = {
      n: quote.clientName,
      e: quote.clientEmail,
      p: quote.clientPhone,
      d: formattedDate,
      t: quote.totalPrice,
      s: quote.services.map(s => ({
        t: s.name,
        base: s.basePrice,
        pages: s.pages || 0,
        langs: s.languages || 0
      }))
    };

    return btoa(encodeURIComponent(JSON.stringify(dataPayload)));
  }
}