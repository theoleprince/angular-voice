import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  constructor(private httpClient: HttpClient) {}

  translateAudio(audioBlob: Blob): Observable<Blob> {
    const formData = new FormData();
    formData.append('file', audioBlob, 'audio.webm');

    return this.httpClient.post<Blob>('/api/translate-audio', formData, {
      responseType: 'blob' as 'json'
    });
  }
}
