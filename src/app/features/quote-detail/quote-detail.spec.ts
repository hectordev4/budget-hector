import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteDetail } from './quote-detail';

describe('QuoteDetail', () => {
  let component: QuoteDetail;
  let fixture: ComponentFixture<QuoteDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(QuoteDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
