import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LicenseService {
  private apiUrl = 'http://localhost:8993/api/licenses';

  constructor(private http: HttpClient) {}

  generateLicense(data: any) {
    return this.http.post(`${this.apiUrl}/generate`, data);
  }

  validateLicense(data: any) {
    return this.http.post(`${this.apiUrl}/validate`, data);
  }

  decoderLicense(data: any) {
    return this.http.post(`${this.apiUrl}/decrypt`, data);
  }
}
