import { Component, input } from '@angular/core';

@Component({
  selector: 'app-budget-summary',
  standalone: true,
  templateUrl: './budget-summary.html',
  styleUrl: './budget-summary.css'
})
export class BudgetSummary {
  total = input.required<number>();
}