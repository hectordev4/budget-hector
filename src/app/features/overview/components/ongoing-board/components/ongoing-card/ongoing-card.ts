import { Component, input } from '@angular/core';
import { SavedQuote } from '@models/SavedQuote'; // Or whatever your structural type model is named
import { GenericCard } from '@shared/components/generic-card/generic-card'; // Path up to shared directory
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ongoing-card',
  standalone: true,
  imports: [CommonModule, GenericCard],
  templateUrl: './ongoing-card.html',
  styleUrl: './ongoing-card.css'
})
export class OngoingCard {
  quote = input.required<SavedQuote>();
}