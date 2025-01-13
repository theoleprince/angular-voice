import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrangeMoneyService {
  private apiUrl = 'http://localhost:8993/api/payment';

  constructor(private http: HttpClient) {}

  initPayment(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/pay`, data);
  }

  getStatutPayment(payToken: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/statut/${payToken}`);
  }
}
