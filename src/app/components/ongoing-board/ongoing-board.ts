import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OngoingQuotesService } from '../../services/ongoing-quotes.service';
import { SortType } from '../../models/SavedQuote';
import { BoardFilters } from '../board-filters/board-filters';
import { OngoingCard } from '../ongoing-card/ongoing-card';

@Component({
  selector: 'app-ongoing-board',
  standalone: true,
  imports: [CommonModule, BoardFilters, OngoingCard], // <-- Must import the filter component here!
  templateUrl: './ongoing-board.html',
  styleUrl: './ongoing-board.css'
})
export class OngoingBoardComponent {
  private quotesService = inject(OngoingQuotesService);

  // Core filter states linked to inputs
  searchQuery = signal<string>('');
  sortBy = signal<SortType>('name');
  sortAscending = signal<boolean>(true);

  // Computes sorted + filtered values dynamically from the service's read-only signal
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

  // Method to change sorting strategy seamlessly
  changeSort(type: SortType): void {
    if (this.sortBy() === type) {
      this.sortAscending.update(val => !val);
    } else {
      this.sortBy.set(type);
      this.sortAscending.set(true);
    }
  }
}