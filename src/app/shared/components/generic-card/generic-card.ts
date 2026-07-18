import { Component, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-generic-card',
  standalone: true,
  imports: [MatCardModule, MatCheckboxModule],
  templateUrl: './generic-card.html',
  styleUrl: './generic-card.css'
})
export class GenericCard {
  title = input.required<string>();
  description = input.required<string>();
  price = input.required<number>();
  isSelected = input<boolean>(false);

  selectionChange = output<boolean>();

  toggleSelection(): void {
    this.selectionChange.emit(!this.isSelected());
  }
}