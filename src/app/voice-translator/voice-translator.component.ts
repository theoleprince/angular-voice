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

  constructor(
    private voiceService: VoiceService,
    private translationService: TranslationService
  ) {}

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
}
