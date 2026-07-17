// src/app/components/ongoing-board/ongoing-board.component.ts
import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OngoingQuotesService } from '../../services/ongoing-quotes.service';
import { SavedQuote, SortType } from '../../models/SavedQuote';

@Component({
  selector: 'app-ongoing-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ongoing-board.html',
  styleUrl: './ongoing-board.css'
})
export class OngoingBoardComponent {
  private quotesService = inject(OngoingQuotesService);

  searchQuery = signal<string>('');
  sortBy = signal<SortType>('name');
  sortAscending = signal<boolean>(true);

  filteredQuotes = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const currentSort = this.sortBy();
    const isAsc = this.sortAscending();
    
    let items = this.quotesService.quotes().filter(quote => 
      quote.clientName.toLowerCase().includes(query)
    );

    return items.sort((a, b) => {
      let comparison = 0;
      if (currentSort === 'name') {
        comparison = a.clientName.localeCompare(b.clientName);
      } else if (currentSort === 'price') {
        comparison = a.totalPrice - b.totalPrice;
      } else if (currentSort === 'date') {
        comparison = a.date.getTime() - b.date.getTime();
      }
      return isAsc ? comparison : -comparison;
    });
  });

  changeSort(type: SortType): void {
    if (this.sortBy() === type) {
      this.sortAscending.update(val => !val);
    } else {
      this.sortBy.set(type);
      this.sortAscending.set(true);
    }
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }
}