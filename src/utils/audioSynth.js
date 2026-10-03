// Gentle Ambient Audio Synthesizer for Father-Daughter Memory Experience
// Creates a soothing, emotional soundscape using Web Audio API

class AmbientAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.masterGain = null;
    this.timer = null;
    this.notes = [261.63, 329.63, 392.00, 440.00, 523.25, 659.25]; // C4, E4, G4, A4, C5, E5 (Soft warm C major)
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.15, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
  }

  start() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isPlaying = true;
    this.scheduleNotes();
  }

  scheduleNotes() {
    if (!this.isPlaying || !this.ctx) return;

    // Play a gentle warm piano-like note
    const noteIndex = Math.floor(Math.random() * this.notes.length);
    const freq = this.notes[noteIndex];
    this.playTone(freq, 2.5);

    // Schedule next note randomly between 1.2s and 2.8s
    const nextInterval = 1200 + Math.random() * 1600;
    this.timer = setTimeout(() => {
      this.scheduleNotes();
    }, nextInterval);
  }

  playTone(freq, duration) {
    if (!this.ctx || !this.masterGain) return;

    try {
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      osc.type = 'triangle'; // Soft acoustic tone
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Attack & Release curve
      const now = this.ctx.currentTime;
      noteGain.gain.setValueAtTime(0, now);
      noteGain.gain.linearRampToValueAtTime(0.1, now + 0.3); // Attack
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration); // Release

      osc.connect(noteGain);
      noteGain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + duration + 0.1);
    } catch (e) {
      // Ignore audio context glitches
    }
  }

  stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.5);
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }
}

export const audioEngine = new AmbientAudioEngine();
