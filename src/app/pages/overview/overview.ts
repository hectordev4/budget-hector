import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { ItemCard, CardSelectionState } from '../../components/card/card';
import { Offer } from '../../models/Offer';
import { SelectionDetails } from '../../models/SelectionDetails';
import { OffersService } from '../../services/offers.service';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [ItemCard],
  templateUrl: './overview.html',
  styleUrls: ['./overview.css']
})
export class Overview implements OnInit {
  private offersService = inject(OffersService);

  // Initialize with an empty array
  offers = signal<Offer[]>([]);
  activeSelections = signal<Record<number, SelectionDetails>>({});

  ngOnInit(): void {
    this.offersService.getOffers().subscribe({
      next: (data) => this.offers.set(data),
      error: (err) => console.error('Failed to load offers', err)
    });
  }

  // Calculated state and selection handlers remain completely unchanged!
  totalBudget = computed(() => {
    const selections = this.activeSelections();
    return this.offers().reduce((sum, offer) => {
      if (!selections[offer.id]) return sum;
      let offerTotal = offer.price;
      if (offer.hasOptions) {
        const details = selections[offer.id];
        offerTotal += (details.pages + details.languages) * 30;
      }
      return sum + offerTotal;
    }, 0);
  });

  onCardSelectionChange(offerId: number, event: CardSelectionState): void {
    this.activeSelections.update(current => {
      const updated = { ...current };
      if (event.selected) {
        updated[offerId] = { pages: event.pages, languages: event.languages };
      } else {
        delete updated[offerId];
      }
      return updated;
    });
  }
}