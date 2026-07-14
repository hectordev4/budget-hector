import { Component, signal, computed } from '@angular/core';
import { ItemCard } from '../../components/card/card';
import { Offer } from '../../models/Offer';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [ItemCard],
  templateUrl: './overview.html',
  styleUrls: ['./overview.css']
})
export class Overview {
  
  // 1. Define your initial budget/course options
  offers = signal<Offer[]>([
    {
      id: 1,
      title: 'Seo',
      description: 'Programació d\'una web responsive completa',
      price: 300
    },
    {
      id: 2,
      title: 'Ads',
      description: 'Programació d\'una web responsive completa',
      price: 400
    },
    {
      id: 3,
      title: 'Web',
      description: 'Programació d\'una web responsive completa',
      price: 500
    }
  ]);

  // 2. Track selected offer IDs in a Signal Set
  selectedOfferIds = signal<Set<number>>(new Set());

  // 3. Computed Signal: Automatically calculates the total sum whenever selectedOfferIds changes
  totalBudget = computed(() => {
    const selectedIds = this.selectedOfferIds();
    return this.offers()
      .filter(offer => selectedIds.has(offer.id))
      .reduce((sum, offer) => sum + offer.price, 0);
  });

  // 4. Update the selection Set when a card component reports a checkbox change
  onCardSelectionChange(offerId: number, event: { selected: boolean; price: number }): void {
    this.selectedOfferIds.update(currentSet => {
      const newSet = new Set(currentSet);
      if (event.selected) {
        newSet.add(offerId);
      } else {
        newSet.delete(offerId);
      }
      return newSet;
    });
  }
}