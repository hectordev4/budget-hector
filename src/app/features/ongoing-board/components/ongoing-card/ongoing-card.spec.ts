import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingCard } from './ongoing-card';

describe('OngoingCard', () => {
  let component: OngoingCard;
  let fixture: ComponentFixture<OngoingCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OngoingCard],
    }).compileComponents();

    fixture = TestBed.createComponent(OngoingCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
