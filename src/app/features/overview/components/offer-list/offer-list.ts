import { Component, input, output, signal, inject } from '@angular/core';
import { GenericCard } from '@shared/components/generic-card/generic-card';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { InfoModal } from '@shared/components/info-modal/info-modal';
import { Offer } from '@models/Offer';
import { SelectionDetails } from '@models/SelectionDetails';

export interface OfferListStateChange {
  selected: boolean;
  pages: number;
  languages: number;
}

@Component({
  selector: 'app-offer-list',
  standalone: true,
  imports: [GenericCard, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './offer-list.html',
  styleUrl: './offer-list.css'
})
export class OfferList {
  private dialog = inject(MatDialog);

  offers = input.required<Offer[]>();
  activeSelections = input.required<Record<number, SelectionDetails>>();

  offerStateChange = output<{ offerId: number; state: OfferListStateChange }>();

  pagesState = signal<Record<number, number>>({});
  languagesState = signal<Record<number, number>>({});

  getPages(offerId: number): number {
    return this.pagesState()[offerId] ?? 1;
  }

  getLanguages(offerId: number): number {
    return this.languagesState()[offerId] ?? 1;
  }

  toggleSelection(offer: Offer, isSelected: boolean): void {
    this.emitState(offer.id, isSelected, this.getPages(offer.id), this.getLanguages(offer.id));
  }

  updatePages(offer: Offer, val: number): void {
    const current = this.getPages(offer.id);
    const nextVal = Math.max(1, current + val);
    
    this.pagesState.update(prev => ({ ...prev, [offer.id]: nextVal }));
    this.emitState(offer.id, true, nextVal, this.getLanguages(offer.id));
  }

  updateLanguages(offer: Offer, val: number): void {
    const current = this.getLanguages(offer.id);
    const nextVal = Math.max(1, current + val);

    this.languagesState.update(prev => ({ ...prev, [offer.id]: nextVal }));
    this.emitState(offer.id, true, this.getPages(offer.id), nextVal);
  }

  openHelp(metric: 'languages' | 'pages'): void {
    const configs = {
      languages: {
        title: 'Número de llenguatges',
        description: 'Afegeix els llenguatges que tindrà el teu projecte. El cost de cada llenguatge és de 30€.'
      },
      pages: {
        title: 'Número de pàgines',
        description: 'Afegeix les pàgines que tindrà el teu projecte. El cost de cada pàgina és de 30€.'
      }
    };

    this.dialog.open(InfoModal, {
      data: configs[metric],
      width: '30rem',
      maxWidth: '90vw'
    });
  }

  private emitState(offerId: number, selected: boolean, pages: number, languages: number): void {
    this.offerStateChange.emit({
      offerId,
      state: { selected, pages, languages }
    });
  }
}