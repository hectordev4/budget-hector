import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SortType } from '../../ongoing-board.types';

@Component({
  selector: 'app-board-filters',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './board-filters.html',
  styleUrl: './board-filters.css'
})
export class BoardFilters {
  // Read-only configuration values coming from the parent state
  currentSortBy = input.required<SortType>();
  isSortAscending = input.required<boolean>();

  // Event emitters to notify parent when user interacts with filters
  searchChange = output<string>();
  sortChange = output<SortType>();

  onSearchInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchChange.emit(inputElement.value);
  }

  onSortClick(type: SortType): void {
    this.sortChange.emit(type);
  }
}