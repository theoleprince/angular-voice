import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMoneyComponent } from './payment-money.component';

describe('PaymentMoneyComponent', () => {
  let component: PaymentMoneyComponent;
  let fixture: ComponentFixture<PaymentMoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentMoneyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
