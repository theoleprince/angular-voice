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
  timer: any; // Référence au minuteur
  timerSeconds = 0; // Secondes écoulées
  timerMinutes = 0; // Minutes écoulées
  inputValue: string = '';

  constructor(
    private voiceService: VoiceService,
    private translationService: TranslationService
  ) {
    this.voiceService.audio$.subscribe(audioBlob => {
      this.onAudioAvailableTest(audioBlob);
    });
  }

  toggleRecording() {
    if (this.isRecording) {
      this.stopTimer();
      this.voiceService.stopRecording();
    } else {
      this.startTimer();
      this.voiceService.startRecording();
    }
    this.isRecording = !this.isRecording;
  }

  // Méthode pour démarrer le minuteur
  startTimer() {
    this.timerSeconds = 0;
    this.timerMinutes = 0;
    this.timer = setInterval(() => {
      this.timerSeconds++;
      if (this.timerSeconds >= 60) {
        this.timerMinutes++;
        this.timerSeconds = 0;
      }
    }, 1000);
  }

  // Méthode pour arrêter le minuteur
  stopTimer() {
    clearInterval(this.timer);
  }

  onAudioAvailable(audioBlob: Blob) {
    this.translationService.translateAudio(audioBlob).subscribe(translatedAudioBlob => {
      const audioUrl = URL.createObjectURL(translatedAudioBlob);
      this.translatedAudio.nativeElement.src = audioUrl;
      this.translatedAudio.nativeElement.play();
    });
  }

  onAudioAvailableTest(audioBlob: Blob) {
    const audioUrl = URL.createObjectURL(audioBlob);
    this.translatedAudio.nativeElement.src = audioUrl;
    this.translatedAudio.nativeElement.play();
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      if (event.shiftKey) {
        return;
      } else {
        this.sendInputValue();
        event.preventDefault();
      }
    }
  }

  sendInputValue(): void {
    console.log('Valeur saisie:', this.inputValue);
    this.inputValue = '';
  }
}
