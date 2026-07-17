import { Component, input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SavedQuote } from '../../models/SavedQuote';

@Component({
  selector: 'app-ongoing-card',
  standalone: true,
  imports: [CommonModule],
  providers: [DatePipe], // Allows rendering localized formatting safely
  templateUrl: './ongoing-card.html',
  styleUrl: './ongoing-card.css'
})
export class OngoingCard {
  // Receives the individual quote row layout contract dynamically
  quote = input.required<SavedQuote>();
}