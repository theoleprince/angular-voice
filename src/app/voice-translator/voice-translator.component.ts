import { Component, ViewChild, ElementRef } from '@angular/core';
import { TranslationService } from '../services/translation.service';
import { VoiceService } from '../services/voice.service';

@Component({
  selector: 'app-voice-translator',
  templateUrl: './voice-translator.component.html',
  styleUrls: ['./voice-translator.component.css']
})
export class VoiceTranslatorComponent {
  @ViewChild('translatedAudioSender', { static: true }) translatedAudioSender: ElementRef<HTMLAudioElement>;
  @ViewChild('translatedAudioReceiver', { static: true }) translatedAudioReceiver: ElementRef<HTMLAudioElement>;

  isRecording = false;
  timer: any;
  timerSeconds = 0;
  timerMinutes = 0;
  inputValue: string = '';

  constructor(
    private voiceService: VoiceService,
    private translationService: TranslationService
  ) {
    this.voiceService.audio$.subscribe(audioBlob => {
      this.onAudioAvailableForSender(audioBlob);
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

  stopTimer() {
    clearInterval(this.timer);
  }

  onAudioAvailableForSender(audioBlob: Blob) {
    const audioUrl = URL.createObjectURL(audioBlob);
    this.translatedAudioSender.nativeElement.src = audioUrl;
    this.translatedAudioSender.nativeElement.play();
  }

  onAudioAvailableForReceiver(audioBlob: Blob) {
    const audioUrl = URL.createObjectURL(audioBlob);
    this.translatedAudioReceiver.nativeElement.src = audioUrl;
    this.translatedAudioReceiver.nativeElement.play();
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
