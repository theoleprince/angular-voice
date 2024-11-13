import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceTranslatorComponent } from './voice-translator.component';

describe('VoiceTranslatorComponent', () => {
  let component: VoiceTranslatorComponent;
  let fixture: ComponentFixture<VoiceTranslatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoiceTranslatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoiceTranslatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
