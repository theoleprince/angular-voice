import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

interface BlobEvent extends Event {
  readonly data: Blob;
  readonly timecode?: number;
}

@Injectable({
  providedIn: 'root'
})
export class VoiceService {
  private mediaRecorder: any;
  private audioChunks: Blob[] = [];
  private intervalId: any;

  // Subject pour émettre l'audio enregistré
  private audioSubject = new Subject<Blob>();

  // Observable auquel le composant peut s'abonner
  audio$ = this.audioSubject.asObservable();

  constructor() { }

  async startRecording(): Promise<void> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = 'audio/webm';
      if (!(window as any).MediaRecorder.isTypeSupported(mimeType)) {
        console.error(`${mimeType} n'est pas supporté`);
        return;
      }
      this.mediaRecorder = new (window as any).MediaRecorder(stream, { mimeType });

      this.mediaRecorder.ondataavailable = (event: BlobEvent) => {
        this.audioChunks.push(event.data);
      };

      this.mediaRecorder.start();

      // Enregistrement en segments de 10 secondes
      this.intervalId = setInterval(() => {
        this.stopAndSendAudio();
      }, 10000);

    } catch (error) {
      console.error('Erreur lors de la capture audio:', error);
    }
  }

  stopRecording(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }
  }

  private stopAndSendAudio(): void {
    if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
      this.mediaRecorder.stop();

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        this.audioChunks = []; // Réinitialise les morceaux après envoi

        // Émet l’audio enregistré
        this.audioSubject.next(audioBlob);

        // Redémarre l'enregistrement après une courte pause
        setTimeout(() => {
          if (this.mediaRecorder && this.mediaRecorder.state === 'inactive') {
            this.mediaRecorder.start();
          }
        }, 100);
      };
    }
  }
}
