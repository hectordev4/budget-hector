import { Component, input, output, signal, effect } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BudgetCheckbox } from '../checkbox/checkbox';
import { Offer } from '../../models/Offer';

// Define the shape of the emitted output data to support the parent's budget math
export interface CardSelectionState {
  selected: boolean;
  price: number;
  pages: number;
  languages: number;
}

@Component({
  selector: 'app-item-card',
  templateUrl: './card.html',
  styleUrls: ['./card.css'],
  standalone: true,
  imports: [MatCardModule, BudgetCheckbox]
})
export class ItemCard {
  offer = input.required<Offer>();
  
  // Emits the full state (selected status, base price, pages, and languages)
  selectionChange = output<CardSelectionState>();

  // Internal reactive state signals
  isSelected = signal<boolean>(false);
  pages = signal<number>(1);
  languages = signal<number>(1);

  constructor() {
    // Automatically triggers whenever any of these signals change (active selection, pages, or languages)
    effect(() => {
      this.selectionChange.emit({
        selected: this.isSelected(),
        price: this.offer().price,
        pages: this.pages(),
        languages: this.languages()
      });
    });
  }

  onCheckboxToggle(checked: boolean): void {
    this.isSelected.set(checked);
    if (!checked) {
      // Reset counters back to defaults if the item is deselected
      this.pages.set(1);
      this.languages.set(1);
    }
  }

  // Increments or decrements the page count (stops at 1)
  updatePages(delta: number): void {
    const next = this.pages() + delta;
    if (next >= 1) {
      this.pages.set(next);
    }
  }

  // Increments or decrements the language count (stops at 1)
  updateLanguages(delta: number): void {
    const next = this.languages() + delta;
    if (next >= 1) {
      this.languages.set(next);
    }
  }
}