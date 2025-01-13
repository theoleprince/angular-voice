import { Component, OnInit } from '@angular/core';
import { OrangeMoneyService } from '../services/orange-money.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-money',
  templateUrl: './payment-money.component.html',
  styleUrls: ['./payment-money.component.css']
})
export class PaymentMoneyComponent{
  paymentData = {
    notifUrl: 'http://localhost:4500/success',
    subscriberMsisdn: '',
    amount: '',
    orderId: '',
    description: ''
  };
  statusMessage: any;

  constructor(
    private orangeMoneyService: OrangeMoneyService,
    private router: Router
  ) {}

  makePayment() {
    this.orangeMoneyService.initPayment(this.paymentData).subscribe(
      (response) => {
        console.log('Payment initialized:', response);
        if (response && response.data.status === 'FAILED') {
          this.statusMessage = response.data.inittxnmessage;
        } else {
          this.router.navigate([`paiement-money/${response.data?.payToken}`])
        }

      },
      (error) => {
        console.error('Error initializing payment:', error);
      }
    );
  }
}
