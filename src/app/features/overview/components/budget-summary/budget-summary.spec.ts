import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BudgetSummary, SelectedService } from './budget-summary';
import { ComponentRef } from '@angular/core';
import { expect, describe, it, beforeEach } from 'vitest';

describe('BudgetSummary', () => {
  let component: BudgetSummary;
  let fixture: ComponentFixture<BudgetSummary>;
  let componentRef: ComponentRef<BudgetSummary>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetSummary]
    }).compileComponents();

    fixture = TestBed.createComponent(BudgetSummary);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    fixture.detectChanges();

    expect(component.total()).toBe(700);
  });

  it('should correctly calculate the total sum of all selected services', () => {
    const mockServices = [
      { title: 'Seo', price: 300 },
      { title: 'Ads', price: 400 },
    ];
    componentRef.setInput('selectedServices', mockServices);

    fixture.detectChanges();

    expect(component.total()).toBe(700);

    const totalElement = fixture.nativeElement.querySelector('.summary-total');
    expect(totalElement.textContent).toContain('700 €');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
