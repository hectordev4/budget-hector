import { Component, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BudgetCheckbox } from '../checkbox/checkbox';
import { Offer } from '../../models/Offer';

@Component({
  selector: 'app-item-card',
  templateUrl: './card.html',
  styleUrls: ['./card.css'],
  standalone: true,
  imports: [MatCardModule, BudgetCheckbox]
})
export class ItemCard {
  offer = input.required<Offer>();
  
  selectionChange = output<{ selected: boolean; price: number }>();

  onCheckboxToggle(isSelected: boolean): void {
    this.selectionChange.emit({
      selected: isSelected,
      price: this.offer().price
    });
  }
}