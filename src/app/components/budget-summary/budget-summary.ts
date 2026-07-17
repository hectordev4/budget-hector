import { Component, input } from '@angular/core';

@Component({
  selector: 'app-budget-summary',
  standalone: true,
  templateUrl: './budget-summary.html',
  styleUrl: './budget-summary.css'
})
export class BudgetSummary {
  // Read-only input signal for the total budget
  total = input.required<number>();
}