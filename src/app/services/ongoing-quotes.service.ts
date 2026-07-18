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
    const formattedDate = quote.date instanceof Date 
      ? quote.date.toLocaleDateString() 
      : new Date(quote.date).toLocaleDateString();

    const dataPayload = {
      n: quote.clientName,
      e: quote.clientEmail,
      p: quote.clientPhone,
      d: formattedDate,
      s: quote.services.map(s => ({ t: s.name, de: s.details })),
      t: quote.totalPrice
    };

    const jsonStr = JSON.stringify(dataPayload);

    return btoa(encodeURIComponent(jsonStr));
  }
}