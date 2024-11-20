import {Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { SuccessComponent } from './success/success.component';
import { CancelComponent } from './cancel/cancel.component';
import { PaymentComponent } from './payment/payment.component';
import { VoiceTranslatorComponent } from './voice-translator/voice-translator.component';

export const AppRoutes: Routes = [
  { path: '', component: AppComponent,
    children: [
      { path: '', component: VoiceTranslatorComponent},
      { path: 'success', component: SuccessComponent},
      { path: 'cancel', component: CancelComponent},
      { path: 'paiement', component: PaymentComponent}
    ]
  },

];
