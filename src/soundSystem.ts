import { Gender } from './types';

class SoundSystem {
  private audioCtx: AudioContext | null = null;
  public isMuted: boolean = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private keepAliveTimer: number | null = null;
  private onSpeakingChangeCallback: ((speaking: boolean) => void) | null = null;
  private lastSpokenText: string = '';
  private lastGender: Gender = 'female';

  constructor() {
    // Audio context will be initialized on first touch/interaction
  }

  public init() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopSpeech();
    }
    return this.isMuted;
  }

  // --- 8-Bit Web Audio SFX ---

  public playTap() {
    if (this.isMuted) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.audioCtx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.15, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.07);
    } catch {
      // AudioContext could be locked
    }
  }

  public playStep() {
    if (this.isMuted) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(140 + Math.random() * 30, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.audioCtx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.06, this.audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.045);
    } catch {}
  }

  public playDash() {
    if (this.isMuted) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(500, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, this.audioCtx.currentTime + 0.16);

      gain.gain.setValueAtTime(0.2, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.16);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.17);
    } catch {}
  }

  public playCorrect() {
    if (this.isMuted) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const osc = this.audioCtx!.createOscillator();
        const gain = this.audioCtx!.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, this.audioCtx!.currentTime + i * 0.09);

        gain.gain.setValueAtTime(0.12, this.audioCtx!.currentTime + i * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.005, this.audioCtx!.currentTime + (i + 1) * 0.09 + 0.05);

        osc.connect(gain);
        gain.connect(this.audioCtx!.destination);
        osc.start(this.audioCtx!.currentTime + i * 0.09);
        osc.stop(this.audioCtx!.currentTime + (i + 1) * 0.09 + 0.08);
      });
    } catch {}
  }

  public playWrong() {
    if (this.isMuted) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, this.audioCtx.currentTime);
      osc.frequency.linearRampToValueAtTime(140, this.audioCtx.currentTime + 0.22);

      gain.gain.setValueAtTime(0.18, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.26);
    } catch {}
  }

  public playLevelUp() {
    if (this.isMuted) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const arpeggio = [440, 554.37, 659.25, 880, 1108.73, 1318.51];
      arpeggio.forEach((freq, idx) => {
        const osc = this.audioCtx!.createOscillator();
        const gain = this.audioCtx!.createGain();
        osc.type = 'triangle';
        const start = this.audioCtx!.currentTime + idx * 0.08;
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.18, start);
        gain.gain.exponentialRampToValueAtTime(0.005, start + 0.22);

        osc.connect(gain);
        gain.connect(this.audioCtx!.destination);
        osc.start(start);
        osc.stop(start + 0.25);
      });
    } catch {}
  }

  // --- Web Speech API (English Voice Synthesis) ---

  public onSpeakingChange(cb: (speaking: boolean) => void) {
    this.onSpeakingChangeCallback = cb;
  }

  public stopSpeech() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (this.keepAliveTimer) {
      window.clearInterval(this.keepAliveTimer);
      this.keepAliveTimer = null;
    }
    if (this.onSpeakingChangeCallback) {
      this.onSpeakingChangeCallback(false);
    }
  }

  public replayLast() {
    if (this.lastSpokenText) {
      this.speak(this.lastSpokenText, this.lastGender);
    }
  }

  public speak(fullText: string, gender: Gender = 'female', onEnd?: () => void) {
    if (this.isMuted || !('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      return;
    }

    this.init();
    this.stopSpeech();
    this.lastSpokenText = fullText;
    this.lastGender = gender;

    // Split text into coherent sentences to avoid Chrome buffer truncation
    const sentences = fullText
      .replace(/([.?!])\s*(?=[A-Z0-9])/g, '$1|')
      .split('|')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    if (sentences.length === 0) {
      if (onEnd) onEnd();
      return;
    }

    // Chrome keep-alive hack to prevent silent timeout after 15 seconds
    this.keepAliveTimer = window.setInterval(() => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      } else {
        if (this.keepAliveTimer) {
          window.clearInterval(this.keepAliveTimer);
          this.keepAliveTimer = null;
        }
      }
    }, 9000);

    if (this.onSpeakingChangeCallback) {
      this.onSpeakingChangeCallback(true);
    }

    const availableVoices = window.speechSynthesis.getVoices();
    let selectedVoice: SpeechSynthesisVoice | null = null;

    const enVoices = availableVoices.filter(v => v.lang.startsWith('en'));

    if (gender === 'female') {
      selectedVoice = enVoices.find(v => /female|zira|samantha|victoria|karen|susan/i.test(v.name)) ||
                      enVoices.find(v => !/male|david|george|mark|daniel/i.test(v.name)) ||
                      enVoices[0] || null;
    } else {
      selectedVoice = enVoices.find(v => /male|david|george|mark|daniel|james/i.test(v.name)) ||
                      enVoices[0] || null;
    }

    let currentIndex = 0;

    const speakNext = () => {
      if (currentIndex >= sentences.length) {
        if (this.keepAliveTimer) {
          window.clearInterval(this.keepAliveTimer);
          this.keepAliveTimer = null;
        }
        if (this.onSpeakingChangeCallback) {
          this.onSpeakingChangeCallback(false);
        }
        if (onEnd) onEnd();
        return;
      }

      const sentence = sentences[currentIndex];
      currentIndex++;

      const utterance = new SpeechSynthesisUtterance(sentence);
      utterance.lang = 'en-US';

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      if (gender === 'female') {
        utterance.pitch = 1.3;
        utterance.rate = 0.95;
      } else {
        utterance.pitch = 0.35; // deep bass male voice
        utterance.rate = 0.85;
      }

      utterance.onend = () => {
        speakNext();
      };

      utterance.onerror = (e) => {
        console.warn('Speech error:', e);
        speakNext();
      };

      this.currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    };

    speakNext();
  }
}

export const soundManager = new SoundSystem();
