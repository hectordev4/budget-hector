import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetSummary } from './budget-summary';

describe('BudgetSummary', () => {
  let component: BudgetSummary;
  let fixture: ComponentFixture<BudgetSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetSummary],
    }).compileComponents();

    fixture = TestBed.createComponent(BudgetSummary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
