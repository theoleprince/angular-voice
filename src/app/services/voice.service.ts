import { Injectable } from '@angular/core';

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

  constructor() {}

  // Démarre l'enregistrement audio
  async startRecording(): Promise<void> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new (window as any).MediaRecorder(stream); // Utilisation de casting pour éviter les erreurs de types

      this.mediaRecorder.ondataavailable = (event: BlobEvent) => {
        this.audioChunks.push(event.data);
      };

      this.mediaRecorder.onstop = () => {
        // Actions après arrêt, si nécessaire
      };

      this.mediaRecorder.start();

      // Enregistrement en segments de 10 secondes
      this.intervalId = setInterval(() => {
        this.stopAndSendAudio();
      }, 10000); // 10 secondes

    } catch (error) {
      console.error('Erreur lors de la capture audio:', error);
    }
  }

  // Arrête l'enregistrement et nettoie l'intervalle
  stopRecording(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }
  }

  // Arrête temporairement, envoie l'audio, puis redémarre l'enregistrement
  private stopAndSendAudio(): void {
    if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
      this.mediaRecorder.stop();

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        this.audioChunks = []; // Réinitialise les morceaux après envoi

        // Redémarre l'enregistrement après une courte pause
        this.mediaRecorder?.start();
      };
    }
  }
}
