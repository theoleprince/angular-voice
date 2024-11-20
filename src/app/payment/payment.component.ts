import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { loadScript, PayPalScriptOptions } from '@paypal/paypal-js';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  stripe: any;
  paypalClientId = 'AXavmSy8xVLFKQzgPgwouxRdnn50B603lp1D-u5sILXhs5o57a5PwJnsBJUi8r40SydXe7lzNDR16avf';

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    loadStripe('pk_test_51PgA67A5qPiYbzafhyeROtlSr6dlOzprbge27zoIJc2YKZi2JGbxltn1csIe8C5ahUHrCkrxILH3Llr7VZuQb6ld003XHeDA80').then((stripe) => {
      this.stripe = stripe;
    });

    // const paypalOptions: PayPalScriptOptions = {
    //   'client-id': this.paypalClientId,
    //   currency: 'EUR', // Devise
    // };

    // loadScript(paypalOptions)
    // .then((paypal) => {
    //   console.log('PayPal SDK Loaded', paypal);
    // })
    // .catch((error) => {
    //   console.error('Erreur lors du chargement du SDK PayPal', error);
    // });
  }

  // handleStripePayment(): void {
  //   const amount = 5000;
  //   const currency = 'eur';

  //   this.paymentService.createPaymentIntent(amount, currency).subscribe((response) => {
  //     const clientSecret = response.clientSecret;

  //     this.stripe
  //       .confirmCardPayment(clientSecret, {
  //         payment_method: {
  //           card: this.stripe.elements().create('card'),
  //         },
  //       })
  //       .then((result: any) => {
  //         if (result.error) {
  //           console.error('Erreur de paiement Stripe : ', result.error.message);
  //         } else {
  //           console.log('Paiement Stripe réussi : ', result.paymentIntent);
  //         }
  //       });
  //   });
  // }

  handleStripePayment(): void {
    const amount = 5000;  // Montant en centimes (par exemple 50,00 € = 5000 centimes)
    const currency = 'eur';
    const productName = 'paiement';
    const quantity = 1;
    const successUrl = 'http://localhost:4900/success'; // URL de succès (modifiez selon votre besoin)
    const cancelUrl = 'http://localhost:4900/cancel';   // URL d'annulation (modifiez selon votre besoin)

    this.paymentService.createCheckoutSession(amount, currency, successUrl, cancelUrl, productName, quantity).subscribe((response) => {
      const sessionId = response.id;

      this.stripe
        .redirectToCheckout({ sessionId: sessionId })
        .then((result: any) => {
          if (result.error) {
            console.error('Erreur Stripe : ', result.error.message);
          }
        });
    });
  }

  handlePayPalPayment(): void {
    const dto = {
      amount: 50,  // Montant en centimes (par exemple 50,00 €: 5000 centimes)
      currency: 'EUR',
      productName: 'paiement',
      description: 'Achat d\'un produit',
      quantity: 1,
      successUrl: 'http://localhost:4900/success', // URL de succès (modifiez selon votre besoin)
      cancelUrl: 'http://localhost:4900/cancel',
    }

    this.paymentService.createPayPalPayment(dto).subscribe((response) => {
      console.log('response', response)
      const approvalLink = response.link;
      window.location.href = approvalLink;
    }, error => {

    });
  }
}
