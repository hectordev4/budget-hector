import { Component, input, computed } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

export interface SelectedService {
  title: string;
  price: number;
}

@Component({
  selector: 'app-budget-summary',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './budget-summary.html',
  styleUrl: './budget-summary.css'
})
export class BudgetSummary {
  selectedServices = input.required<SelectedService[]>();

  total = computed(() => {
    return this.selectedServices().reduce((sum, item) => sum + item.price, 0);
  });
}