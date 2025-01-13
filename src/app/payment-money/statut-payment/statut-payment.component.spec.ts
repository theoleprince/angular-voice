import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatutPaymentComponent } from './statut-payment.component';

describe('StatutPaymentComponent', () => {
  let component: StatutPaymentComponent;
  let fixture: ComponentFixture<StatutPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatutPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatutPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
