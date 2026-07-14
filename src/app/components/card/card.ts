import { Component, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BudgetCheckbox } from '../checkbox/checkbox'; // Adjust path as needed

@Component({
  selector: 'app-item-card',
  templateUrl: './card.html',
  styleUrls: ['./card.css'],
  standalone: true,
  imports: [MatCardModule, BudgetCheckbox]
})
export class ItemCard {
  offer = input.required<{ title: string; description: string; price: number }>();
  
  // Emits up to parent container to track overall budget state
  selectionChange = output<{ selected: boolean; price: number }>();

  onCheckboxToggle(isSelected: boolean): void {
    this.selectionChange.emit({
      selected: isSelected,
      price: this.offer().price
    });
  }
}