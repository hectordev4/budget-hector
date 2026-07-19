import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OngoingQuotesService } from '@services/ongoing-quotes.service';
import { SortType } from './ongoing-board.types';
import { BoardFilters } from './components/board-filters/board-filters';
import { OngoingCard } from './components/ongoing-card/ongoing-card';

@Component({
  selector: 'app-ongoing-board',
  standalone: true,
  imports: [CommonModule, BoardFilters, OngoingCard],
  templateUrl: './ongoing-board.html',
  styleUrl: './ongoing-board.css'
})
export class OngoingBoard {
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
}