import { Component, ViewChild, ElementRef } from '@angular/core';
import { TranslationService } from '../services/translation.service';
import { VoiceService } from '../services/voice.service';

@Component({
  selector: 'app-voice-translator',
  templateUrl: './voice-translator.component.html',
  styleUrls: ['./voice-translator.component.css']
})
export class VoiceTranslatorComponent {
  @ViewChild('translatedAudio', { static: true }) translatedAudio: ElementRef<HTMLAudioElement>;
  isRecording = false;
  // Variable pour stocker la valeur du champ
  inputValue: string = '';
  constructor(
    private voiceService: VoiceService,
    private translationService: TranslationService
  ) {
    this.voiceService.audio$.subscribe(audioBlob => {
      this.onAudioAvailableTest(audioBlob);
    });
  }

  // tslint:disable-next-line:typedef
  toggleRecording() {
    if (this.isRecording) {
      this.voiceService.stopRecording();
    } else {
      this.voiceService.startRecording();
    }
    this.isRecording = !this.isRecording;
  }

  // tslint:disable-next-line:typedef
  onAudioAvailable(audioBlob: Blob) {
    this.translationService.translateAudio(audioBlob).subscribe(translatedAudioBlob => {
      const audioUrl = URL.createObjectURL(translatedAudioBlob);
      this.translatedAudio.nativeElement.src = audioUrl;
      this.translatedAudio.nativeElement.play();
    });
  }

   // tslint:disable-next-line:typedef
   onAudioAvailableTest(audioBlob: Blob) {
    // Crée un URL pour le Blob audio reçu
    const audioUrl = URL.createObjectURL(audioBlob);

    // Définit la source du lecteur audio sur l'URL générée et joue l'audio
    this.translatedAudio.nativeElement.src = audioUrl;
    this.translatedAudio.nativeElement.play();
  }





  handleKeyDown(event: KeyboardEvent): void {
    // Vérifier si la touche Enter est pressée
    if (event.key === 'Enter') {
      // Si Shift est aussi pressé, on ajoute un retour à la ligne
      if (event.shiftKey) {
        // Permettre à l'utilisateur de passer à la ligne dans le textarea
        return; // Ne pas empêcher l'action par défaut (retour à la ligne)
      } else {
        // Sinon, on envoie la valeur saisie
        this.sendInputValue();
        event.preventDefault(); // Empêche le comportement par défaut (saut de ligne)
      }
    }
  }

  sendInputValue(): void {
    // Logique pour envoyer la valeur saisie
    console.log('Valeur saisie:', this.inputValue);
    // Vous pouvez envoyer cette valeur à un service ou faire une autre action
    this.inputValue = ''; // Réinitialiser si nécessaire
  }
}
