import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private baseUrl = 'http://localhost:8083/api';

  constructor(private http: HttpClient) {}

  createCheckoutSession(amount: number, currency: string, successUrl: string, cancelUrl: string, productName: string, quantity: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/stripe/create-checkout-session`, { amount, currency, successUrl, cancelUrl, productName, quantity });
  }

  createPayPalPayment(dto): Observable<any> {
    return this.http.post(`${this.baseUrl}/paypal/create-payment`, dto);
  }

  executePayPalPayment(paymentId: string, payerId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/paypal/execute`, { paymentId, payerId });
  }

}
