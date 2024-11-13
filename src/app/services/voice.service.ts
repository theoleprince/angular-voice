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

  constructor() { }

  // Démarre l'enregistrement audio
  async startRecording(): Promise<void> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Vérifiez si le type MIME 'audio/webm' est supporté
      console.log(`Vérifiez si le type MIME 'audio/webm' est supporté`);
      const mimeType = 'audio/webm';
      if (!(window as any).MediaRecorder.isTypeSupported(mimeType)) {
        console.error(`${mimeType} n'est pas supporté`);
        return;
      }
      console.log(`${mimeType}`);
      this.mediaRecorder = new (window as any).MediaRecorder(stream, { mimeType });

      this.mediaRecorder.ondataavailable = (event: BlobEvent) => {
        this.audioChunks.push(event.data);
      };

      this.mediaRecorder.start();

      // Enregistrement en segments de 10 secondes
      this.intervalId = setInterval(() => {
        console.log('theo');
        console.log(this.mediaRecorder);
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

        // Attendre un instant avant de redémarrer pour éviter les conflits
        setTimeout(() => {
          console.log(this.mediaRecorder);
          if (this.mediaRecorder && this.mediaRecorder.state === 'inactive') {
            this.mediaRecorder.start();
          }
        }, 100); // Délai court avant redémarrage
      };
    }
  }

}
