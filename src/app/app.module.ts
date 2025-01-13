import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { VoiceTranslatorComponent } from './voice-translator/voice-translator.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from "@angular/forms";
import { PaymentComponent } from './payment/payment.component';
import { SuccessComponent } from './success/success.component';
import { CancelComponent } from './cancel/cancel.component';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app-routing.module';
import { PaymentMoneyComponent } from './payment-money/payment-money.component';
import { StatutPaymentComponent } from './payment-money/statut-payment/statut-payment.component';
import { LicenseComponent } from './license/license.component';

@NgModule({
  declarations: [
    AppComponent,
    VoiceTranslatorComponent,
    PaymentComponent,
    SuccessComponent,
    CancelComponent,
    PaymentMoneyComponent,
    StatutPaymentComponent,
    LicenseComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot(AppRoutes, {
          scrollPositionRestoration: 'enabled',
          useHash: true,
          relativeLinkResolution: 'legacy',
        })
    ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],

})
export class AppModule { }
