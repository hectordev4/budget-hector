import { Component, input, computed, inject } from '@angular/core';
import { SavedQuote } from '@models/SavedQuote';
import { OngoingQuotesService } from '@services/ongoing-quotes.service';
import { RouterLink } from '@angular/router';
import { GenericCard } from '@shared/components/generic-card/generic-card';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-ongoing-card',
  standalone: true,
  imports: [GenericCard, MatCardModule, MatIconModule, RouterLink],
  templateUrl: './ongoing-card.html',
  styleUrl: './ongoing-card.css'
})
export class OngoingCard {
  private quotesService = inject(OngoingQuotesService);
  
  quote = input.required<SavedQuote>();

  quoteHash = computed(() => this.quotesService.generateQuoteHash(this.quote()));
}