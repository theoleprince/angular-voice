import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { OrangeMoneyService } from 'src/app/services/orange-money.service';

@Component({
  selector: 'app-statut-payment',
  templateUrl: './statut-payment.component.html',
  styleUrls: ['./statut-payment.component.css']
})
export class StatutPaymentComponent implements OnInit, OnDestroy {
  statusMessage: string = 'Statut du paiement en attente...';
  paymentData: any = null;
  timerSubscription: Subscription | null = null;
  loading: boolean = true;

  payToken: string = ''; // Remplacez par un ID dynamique si nécessaire

  constructor(
    private orangeMoneyService: OrangeMoneyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.payToken = params.get('payToken');
    this.timerSubscription = interval(5000).subscribe(() => {
      this.checkStatus();
    });
  });
  }

  checkStatus(): void {
    this.orangeMoneyService.getStatutPayment(this.payToken).subscribe(
      (response) => {
        this.paymentData = response.data;
        this.statusMessage = `Statut : ${response.data.status}`;
        this.loading = false;

        // Arrêter le timer si le statut est finalisé
        if (['COMPLETED', 'EXPIRED', 'FAILED'].includes(response.data.status)) {
          this.timerSubscription?.unsubscribe();
        }
      },
      (error) => {
        console.error('Erreur lors de la vérification du statut', error);
        this.statusMessage = 'Erreur lors de la vérification du statut.';
        this.loading = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.timerSubscription?.unsubscribe();
  }
}
