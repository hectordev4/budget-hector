import { Component, signal, computed } from '@angular/core';
import { ItemCard, CardSelectionState } from '../../components/card/card';
import { Offer } from '../../models/Offer';
import { SelectionDetails } from '../../models/SelectionDetails';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [ItemCard],
  templateUrl: './overview.html',
  styleUrls: ['./overview.css']
})


export class Overview {
  
  offers = signal<Offer[]>([
    {
      id: 1,
      title: 'Seo',
      description: 'Programació d\'una web responsive completa',
      price: 300,
      hasOptions: false,
    },
    {
      id: 2,
      title: 'Ads',
      description: 'Programació d\'una web responsive completa',
      price: 400,
      hasOptions: false,
    },
    {
      id: 3,
      title: 'Web',
      description: 'Programació d\'una web responsive completa',
      price: 500,
      hasOptions: true,
    }
  ]);

  // Track active selections as a dictionary of key-value pairs (ID -> { pages, languages })
  activeSelections = signal<Record<number, SelectionDetails>>({});

  // Computed Signal: Re-calculates total budget instantly when activeSelections changes
  totalBudget = computed(() => {
    const selections = this.activeSelections();
    
    return this.offers().reduce((sum, offer) => {
      // If this offer is not currently selected, skip it
      if (!selections[offer.id]) {
        return sum;
      }

      // Add the base price of the offer
      let offerTotal = offer.price;

      // If the offer supports customizable options, add the page and language costs
      if (offer.hasOptions) {
        const details = selections[offer.id];
        // Based on mockup logic: 30€ per page and 30€ per language
        const extraCost = (details.pages + details.languages) * 30;
        offerTotal += extraCost;
      }

      return sum + offerTotal;
    }, 0);
  });

  // Handles state changes emitted by child ItemCards
  onCardSelectionChange(offerId: number, event: CardSelectionState): void {
    this.activeSelections.update(currentSelections => {
      const updated = { ...currentSelections };

      if (event.selected) {
        // Add or update the selection with the latest page and language count
        updated[offerId] = {
          pages: event.pages,
          languages: event.languages
        };
      } else {
        // If unchecked, completely remove it from the budget calculations
        delete updated[offerId];
      }

      return updated;
    });
  }
}