import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { OfferList, OfferListStateChange } from './components/offer-list/offer-list';
import { BudgetSummary, SelectedService } from './components/budget-summary/budget-summary';
import { UserForm } from './components/user-form/user-form';
import { OngoingBoard } from './components/ongoing-board/ongoing-board';
import { Offer } from '@models/Offer';
import { SelectionDetails } from '@models/SelectionDetails';
import { UserFormData } from '@models/UserFormData';
import { ContractedService } from '@models/SavedQuote';
import { OffersService } from '@services/offers.service';
import { OngoingQuotesService } from '@services/ongoing-quotes.service';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [OfferList, BudgetSummary, UserForm, OngoingBoard],
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

  selectedServices = computed<SelectedService[]>(() => {
    const selections = this.activeSelections();
    
    return this.offers()
      .filter(offer => !!selections[offer.id])
      .map(offer => {
        const details = selections[offer.id];
        let calculatedPrice = offer.price;

        if (offer.hasOptions && details) {
          calculatedPrice += (details.pages + details.languages) * 30;
        }

        return {
          title: offer.title,
          price: calculatedPrice
        };
      });
  });

  totalBudget = computed(() => {
    return this.selectedServices().reduce((sum, item) => sum + item.price, 0);
  });

  handleOfferStateChange(payload: { offerId: number; state: OfferListStateChange }): void {
    this.activeSelections.update(current => {
      const updated = { ...current };
      if (payload.state.selected) {
        updated[payload.offerId] = { 
          pages: payload.state.pages, 
          languages: payload.state.languages 
        };
      } else {
        delete updated[payload.offerId];
      }
      return updated;
    });
  }

  onUserFormSubmit(formData: UserFormData): void {
    const selections = this.activeSelections();
    
    const contractedServices: ContractedService[] = this.offers()
      .filter(offer => !!selections[offer.id])
      .map(offer => {
        const details = selections[offer.id];
        
        const service: ContractedService = { 
          name: offer.title,
          basePrice: offer.price 
        };
        
        if (offer.hasOptions && details) {
          service.details = `${details.pages} pàgines, ${details.languages} llenguatges`;
          service.pages = details.pages;
          service.languages = details.languages;
        }
        
        return service;
      });

    if (contractedServices.length === 0) {
      alert('Si us plau, selecciona almenys un servei abans de demanar un pressupost.');
      return;
    }

    this.ongoingQuotesService.addQuote({
      clientName: formData.name,
      clientEmail: formData.email,
      clientPhone: formData.phone,
      services: contractedServices,
      totalPrice: this.totalBudget()
    });

    this.activeSelections.set({});
  }
}