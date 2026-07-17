import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardFilters } from './board-filters';

describe('BoardFilters', () => {
  let component: BoardFilters;
  let fixture: ComponentFixture<BoardFilters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardFilters],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardFilters);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
