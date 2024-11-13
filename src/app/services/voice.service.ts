import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VoiceService {
  private mediaRecorder: MediaRecorder;
  private audioChunks: Blob[] = [];
  private intervalId: any;

  constructor() {}

  // tslint:disable-next-line:typedef
  async startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.mediaRecorder = new MediaRecorder(stream);
    this.mediaRecorder.ondataavailable = (event) => {
      this.audioChunks.push(event.data);
    };
    this.mediaRecorder.start();

    // Enregistrement en segments de 10 secondes
    this.intervalId = setInterval(() => {
      this.stopAndSendAudio();
    }, 10000); // 10 secondes
  }

  // tslint:disable-next-line:typedef
  stopRecording() {
    clearInterval(this.intervalId);
    this.mediaRecorder.stop();
  }

  // tslint:disable-next-line:typedef
  private stopAndSendAudio() {
    if (this.audioChunks.length) {
      this.mediaRecorder.stop(); // Stop temporaire pour récupérer les données
      const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
      this.audioChunks = []; // Réinitialise les morceaux après envoi

      // Redémarre la capture après l'envoi
      this.mediaRecorder.start();
    }
  }
}
