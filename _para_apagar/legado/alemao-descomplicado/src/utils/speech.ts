export interface SpeechState {
  isPlaying: boolean;
  currentText: string;
  lang: 'de-DE' | 'pt-BR';
  rate: number;
}

type SpeechListener = (state: SpeechState) => void;

class SpeechEngine {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private listeners: Set<SpeechListener> = new Set();
  private state: SpeechState = {
    isPlaying: false,
    currentText: '',
    lang: 'de-DE',
    rate: 1.0,
  };

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public subscribe(listener: SpeechListener): () => void {
    this.listeners.add(listener);
    listener(this.state);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l({ ...this.state }));
  }

  public setRate(rate: number) {
    this.state.rate = rate;
    this.notify();
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
    }
    this.state.isPlaying = false;
    this.state.currentText = '';
    this.notify();
  }

  public speak(text: string, lang: 'de-DE' | 'pt-BR' = 'de-DE', rate?: number) {
    if (!this.synth) {
      console.warn('Speech synthesis is not supported on this browser.');
      return;
    }

    this.stop();

    // Clean text for speech if it contains special delimiters
    const cleanText = text.replace(/•/g, ',').replace(/[—–]/g, ' ');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = lang;
    utterance.rate = rate ?? this.state.rate;

    // Pick best available voice for language
    const voices = this.synth.getVoices();
    const matchedVoice = voices.find((v) => v.lang.startsWith(lang.substring(0, 2)));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onstart = () => {
      this.state.isPlaying = true;
      this.state.currentText = text;
      this.state.lang = lang;
      this.notify();
    };

    utterance.onend = () => {
      this.state.isPlaying = false;
      this.state.currentText = '';
      this.notify();
    };

    utterance.onerror = () => {
      this.state.isPlaying = false;
      this.state.currentText = '';
      this.notify();
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public speakAsync(text: string, lang: 'de-DE' | 'pt-BR' = 'de-DE', rate?: number): Promise<void> {
    return new Promise((resolve) => {
      if (!this.synth) {
        console.warn('Speech synthesis is not supported on this browser.');
        resolve();
        return;
      }

      this.stop();

      const cleanText = text.replace(/•/g, ',').replace(/[—–]/g, ' ');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = lang;
      utterance.rate = rate ?? this.state.rate;

      const voices = this.synth.getVoices();
      const matchedVoice = voices.find((v) => v.lang.startsWith(lang.substring(0, 2)));
      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }

      utterance.onstart = () => {
        this.state.isPlaying = true;
        this.state.currentText = text;
        this.state.lang = lang;
        this.notify();
      };

      utterance.onend = () => {
        this.state.isPlaying = false;
        this.state.currentText = '';
        this.notify();
        resolve();
      };

      utterance.onerror = () => {
        this.state.isPlaying = false;
        this.state.currentText = '';
        this.notify();
        resolve();
      };

      this.currentUtterance = utterance;
      this.synth.speak(utterance);
    });
  }

  public spellLetters(letters: string, lang: 'de-DE' | 'pt-BR' = 'de-DE') {
    // Splits characters with slight pause for spelling exercises
    const spelled = letters.split(/[-,\s]/).filter(Boolean).join('. ');
    this.speak(spelled, lang, 0.85);
  }

  public getState(): SpeechState {
    return { ...this.state };
  }
}

export const speechEngine = new SpeechEngine();
