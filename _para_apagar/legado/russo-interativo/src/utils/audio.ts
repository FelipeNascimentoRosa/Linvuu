/**
 * Audio synthesis utility for Russian speech pronunciation
 * Uses Web Speech API with fallback and dual-speed modes
 */

export type PlaybackSpeed = 'normal' | 'slow';

let currentUtterance: SpeechSynthesisUtterance | null = null;
let cachedRussianVoice: SpeechSynthesisVoice | null = null;

export function getRussianVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return null;
  }

  if (cachedRussianVoice) return cachedRussianVoice;

  const voices = window.speechSynthesis.getVoices();
  const ruVoice = voices.find(
    (v) => v.lang.startsWith('ru') || v.name.toLowerCase().includes('russian') || v.lang.includes('RU')
  );

  if (ruVoice) {
    cachedRussianVoice = ruVoice;
  }
  return cachedRussianVoice;
}

// Pre-clean stress marks (combining acute accents) which can confuse some TTS engines
export function cleanRussianForSpeech(text: string): string {
  return text
    .replace(/[\u0300-\u036f]/g, '') // remove combining diacritics
    .replace(/[–—]/g, '-')
    .trim();
}

export function stopSpeech(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    currentUtterance = null;
  }
}

export function playRussianAudio(
  text: string,
  speed: PlaybackSpeed = 'normal',
  onEnd?: () => void,
  onStart?: () => void
): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('SpeechSynthesis is not supported in this browser.');
    return false;
  }

  stopSpeech();

  const cleanText = cleanRussianForSpeech(text);
  const utterance = new SpeechSynthesisUtterance(cleanText);

  utterance.lang = 'ru-RU';
  
  // Rate settings: normal is natural, slow is optimal for learners analyzing phonetics
  utterance.rate = speed === 'slow' ? 0.65 : 0.95;
  utterance.pitch = 1.0;

  const voice = getRussianVoice();
  if (voice) {
    utterance.voice = voice;
  }

  utterance.onstart = () => {
    if (onStart) onStart();
  };

  utterance.onend = () => {
    currentUtterance = null;
    if (onEnd) onEnd();
  };

  utterance.onerror = (e) => {
    // If interrupted by cancel, ignore error
    if (e.error !== 'interrupted' && e.error !== 'canceled') {
      console.warn('SpeechSynthesis error:', e);
    }
    currentUtterance = null;
    if (onEnd) onEnd();
  };

  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
  return true;
}

// Sequential playback of an array of dialogue lines
export class DialogueAudioSequence {
  private lines: { text: string; id: string }[];
  private currentIndex: number = 0;
  private isCancelled: boolean = false;
  private onLineChange?: (lineId: string) => void;
  private onFinished?: () => void;

  constructor(
    lines: { text: string; id: string }[],
    onLineChange?: (lineId: string) => void,
    onFinished?: () => void
  ) {
    this.lines = lines;
    this.onLineChange = onLineChange;
    this.onFinished = onFinished;
  }

  public start(speed: PlaybackSpeed = 'normal'): void {
    this.currentIndex = 0;
    this.isCancelled = false;
    this.playNext(speed);
  }

  private playNext(speed: PlaybackSpeed): void {
    if (this.isCancelled || this.currentIndex >= this.lines.length) {
      if (this.onFinished) this.onFinished();
      return;
    }

    const current = this.lines[this.currentIndex];
    if (this.onLineChange) {
      this.onLineChange(current.id);
    }

    playRussianAudio(
      current.text,
      speed,
      () => {
        if (!this.isCancelled) {
          this.currentIndex++;
          // Small realistic pause between speaker turns
          setTimeout(() => {
            this.playNext(speed);
          }, 450);
        }
      }
    );
  }

  public stop(): void {
    this.isCancelled = true;
    stopSpeech();
    if (this.onFinished) this.onFinished();
  }
}
