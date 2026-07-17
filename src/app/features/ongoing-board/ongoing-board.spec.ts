import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingBoard } from './ongoing-board';

describe('OngoingBoard', () => {
  let component: OngoingBoard;
  let fixture: ComponentFixture<OngoingBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OngoingBoard],
    }).compileComponents();

    fixture = TestBed.createComponent(OngoingBoard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
