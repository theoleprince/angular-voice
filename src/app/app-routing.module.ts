import {Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { SuccessComponent } from './success/success.component';
import { CancelComponent } from './cancel/cancel.component';
import { PaymentComponent } from './payment/payment.component';
import { VoiceTranslatorComponent } from './voice-translator/voice-translator.component';
import { PaymentMoneyComponent } from './payment-money/payment-money.component';
import { StatutPaymentComponent } from './payment-money/statut-payment/statut-payment.component';
import { LicenseComponent } from './license/license.component';

export const AppRoutes: Routes = [
  { path: '', component: AppComponent,
    children: [
      { path: '', component: VoiceTranslatorComponent},
      { path: 'success', component: SuccessComponent},
      { path: 'cancel', component: CancelComponent},
      { path: 'paiement', component: PaymentComponent},
      { path: 'paiement-money', component: PaymentMoneyComponent},
      { path: 'paiement-money/:payToken', component: StatutPaymentComponent},
      { path: 'license', component: LicenseComponent},
    ]
  },

];
