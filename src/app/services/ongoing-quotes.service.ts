import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SavedQuote } from '../models/SavedQuote';

@Injectable({
  providedIn: 'root'
})
export class OngoingQuotesService {
  private http = inject(HttpClient);
  private jsonUrl = 'data/QuotesData.json'; 

  // Core internal state signal
  private quotesSignal = signal<SavedQuote[]>([]);
  
  // Public read-only signal for your components to bind to reactively
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

  // Appends a new quote instantly in memory
  addQuote(newQuote: Omit<SavedQuote, 'id' | 'date'>): void {
    this.quotesSignal.update(currentQuotes => [
      ...currentQuotes,
      {
        ...newQuote,
        id: currentQuotes.length + 1,
        date: new Date() // Sets timestamp to right now
      }
    ]);
  }
}