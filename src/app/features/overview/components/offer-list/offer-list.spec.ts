import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferList } from './offer-list';

describe('OfferList', () => {
  let component: OfferList;
  let fixture: ComponentFixture<OfferList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfferList],
    }).compileComponents();

    fixture = TestBed.createComponent(OfferList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
