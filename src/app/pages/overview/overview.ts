import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { ItemCard, CardSelectionState } from '@features/card/card';
import { BudgetSummary } from '@features/budget-summary/budget-summary';
import { UserForm } from '@features/user-form/user-form';
import { OngoingBoard } from '@features/ongoing-board/ongoing-board';
import { Offer } from '@models/Offer';
import { SelectionDetails } from '@models/SelectionDetails';
import { UserFormData } from '@models/UserFormData';
import { ContractedService } from '@models/SavedQuote';
import { OffersService } from '@services/offers.service';
import { OngoingQuotesService } from '@services/ongoing-quotes.service';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [ItemCard, BudgetSummary, UserForm, OngoingBoard],
  templateUrl: './overview.html',
  styleUrl: './overview.css',
})
export class Overview implements OnInit {
  private offersService = inject(OffersService);
  private ongoingQuotesService = inject(OngoingQuotesService);

  offers = signal<Offer[]>([]);
  activeSelections = signal<Record<number, SelectionDetails>>({});

  ngOnInit(): void {
    this.offersService.getOffers().subscribe({
      next: (data) => this.offers.set(data),
      error: (err) => console.error('Failed to load offers', err)
    });
  }


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

  // Intercepts the form submission, maps data models, and updates state
  onUserFormSubmit(formData: UserFormData): void {
    const selections = this.activeSelections();
    
    // 1. Map active selections to the ContractedService format required by our ongoing list
    const contractedServices: ContractedService[] = this.offers()
      .filter(offer => !!selections[offer.id])
      .map(offer => {
        const details = selections[offer.id];
        const service: ContractedService = { name: offer.title }; // assuming offer has a name property
        
        // If web service has customizable deep options, generate details string dynamically
        if (offer.hasOptions && details) {
          service.details = `${details.pages} pàgines, ${details.languages} llenguatges`;
        }
        return service;
      });

    // Guard to ensure they aren't submitting an empty request
    if (contractedServices.length === 0) {
      alert('Si us plau, selecciona almenys un servei abans de demanar un pressupost.');
      return;
    }

    // 2. Push unified data structure straight to our storage service
    this.ongoingQuotesService.addQuote({
      clientName: formData.name,
      clientEmail: formData.email,
      clientPhone: formData.phone,
      services: contractedServices,
      totalPrice: this.totalBudget()
    });

    // 3. Reset local selection state back to empty
    this.activeSelections.set({});
  }
}