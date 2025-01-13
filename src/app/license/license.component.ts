import { Component } from '@angular/core';
import { LicenseService } from '../services/license.service';

@Component({
  selector: 'app-license',
  template: `
    <div>
      <h2>Générer une licence</h2>
      <form (ngSubmit)="generateLicense()">
        <input [(ngModel)]="clientName" name="clientName" placeholder="Nom du client" required />
        <input [(ngModel)]="product" name="product" placeholder="Produit" required />
        <input [(ngModel)]="nbrUser" name="nbrUser" placeholder="nbrUser" required />
        <input [(ngModel)]="expiryDate" name="expiryDate" type="datetime-local" required />
        <button type="submit">Générer</button>
      </form>

      <div *ngIf="license">
        <h3>Licence générée :</h3>
        <pre>{{ license | json }}</pre>
      </div>

      <h2>Valider une licence</h2>
      <form (ngSubmit)="validateLicense()">
        <input [(ngModel)]="licenseKey" name="licenseKey" placeholder="Clé de licence" required />
        <button type="submit">Valider</button>
      </form>

      <div *ngIf="dataValide">
        <h3>Résultat de validation :</h3>
        <p>{{ dataValide?.activated ? 'Licence valide' : 'Licence invalide' }}</p>
      </div>


      <h2>decoder une licence</h2>
      <form (ngSubmit)="decoderLicense()">
        <input [(ngModel)]="licenseKey" name="licenseKey" placeholder="Clé de licence" required />
        <button type="submit">Decoder</button>
      </form>

      <div *ngIf="dataDecodage">
        <h3>Licence générée :</h3>
        <pre>{{ dataDecodage | json }}</pre>
      </div>
    </div>
  `,
})
export class LicenseComponent {
  clientName = '';
  product = '';
  expiryDate = '';
  licenseKey = '';
  nbrUser = 1;
  license: any;
  isValid = false;
  dataValide: any;
  dataDecodage: any;

  constructor(private licenseService: LicenseService) {}

  generateLicense() {
    const data = { clientName: this.clientName, product: this.product, expiryDate: this.expiryDate, nbrUser: this.nbrUser,  activated: false};
    this.licenseService.generateLicense(data).subscribe((result) => {
      this.license = result;
    });
  }

  validateLicense() {
    const data = { licenseKey: this.licenseKey};
    this.licenseService.validateLicense(data).subscribe((result: any) => {
      this.dataValide = result;
    });
  }

  decoderLicense() {
    const data = { licenseKey: this.licenseKey };
    this.licenseService.decoderLicense(data).subscribe((result: any) => {
      this.dataDecodage = result;
    });
  }
}
