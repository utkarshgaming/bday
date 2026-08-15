/**
 * 🌸 ULTRA-BESPOKE 3D BIRTHDAY ODYSSEY FOR REET
 * Pure Web Audio API Synthesizer (Zero External Dependencies)
 */

class BirthdayAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.isBgmPlaying = false;
    this.bgmTimer = null;
    this.bgmChordIndex = 0;
    this.heartbeatTimer = null;

    // Background Audio Track (Valetines.mp3)
    this.bgmAudio = new Audio('assets/Valetines.mp3');
    this.bgmAudio.loop = true;
    this.bgmAudio.volume = 0.6;
    this.bgmAudio.preload = 'auto';

    // Master Gain
    this.masterGain = null;
    this.sfxGain = null;

    // Pentatonic scale for chimes (C5, D5, E5, G5, A5, C6, D6, E6)
    this.chimeScale = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50, 1174.66, 1318.51];
    
    // Guitar strings (E2, A2, D3, G3, B3, E4)
    this.guitarFrequencies = [82.41, 110.00, 146.83, 196.00, 246.94, 329.63];
  }

  init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    this.ctx = new AudioContextClass();
    
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.8, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    this.bgmGain = this.ctx.createGain();
    this.bgmGain.gain.setValueAtTime(0.28, this.ctx.currentTime);
    this.bgmGain.connect(this.masterGain);

    this.sfxGain = this.ctx.createGain();
    this.sfxGain.gain.setValueAtTime(0.65, this.ctx.currentTime);
    this.sfxGain.connect(this.masterGain);
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * Warm Kalimba / Marimba Chime
   */
  playChime(noteIndex = null) {
    this.init();
    this.resume();
    if (!this.ctx || this.isMuted) return;

    const freq = (noteIndex !== null && this.chimeScale[noteIndex]) 
      ? this.chimeScale[noteIndex] 
      : this.chimeScale[Math.floor(Math.random() * this.chimeScale.length)];

    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const oscHarmonic = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    oscHarmonic.type = 'triangle';
    oscHarmonic.frequency.setValueAtTime(freq * 2.02, now); // subtle bell shimmer

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

    osc.connect(gain);
    oscHarmonic.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    oscHarmonic.start(now);
    osc.stop(now + 1.25);
    oscHarmonic.stop(now + 1.25);
  }

  /**
   * Shimmering Harp Glissando Sweep
   */
  playHarpGlissando() {
    this.init();
    this.resume();
    if (!this.ctx || this.isMuted) return;

    const notes = [
      261.63, 329.63, 392.00, 493.88, 523.25, 659.25, 783.99, 987.77, 1046.50, 1318.51
    ];

    notes.forEach((freq, idx) => {
      setTimeout(() => {
        if (!this.ctx || this.isMuted) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now);
        osc.stop(now + 1.45);
      }, idx * 60);
    });
  }

  /**
   * Acoustic 60 BPM Heartbeat Synth Pulse
   */
  playHeartbeat() {
    this.init();
    this.resume();
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime;

    // "Lub" (first thud)
    this._createThud(now, 55, 0.45, 0.16);
    // "Dub" (second thud)
    this._createThud(now + 0.24, 48, 0.38, 0.2);
  }

  _createThud(time, startFreq, gainVal, duration) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(startFreq, time);
    osc.frequency.exponentialRampToValueAtTime(32, time + duration);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(140, time);

    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(gainVal, time + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(time);
    osc.stop(time + duration + 0.05);
  }

  startHeartbeatLoop() {
    this.stopHeartbeatLoop();
    this.playHeartbeat();
    this.heartbeatTimer = setInterval(() => {
      this.playHeartbeat();
    }, 1000); // 60 BPM
  }

  stopHeartbeatLoop() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }

  /**
   * Guitar String Pluck
   */
  playGuitarPluck(stringIndex = 0) {
    this.init();
    this.resume();
    if (!this.ctx || this.isMuted) return;

    const freq = this.guitarFrequencies[stringIndex % this.guitarFrequencies.length];
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1600, now);
    filter.frequency.exponentialRampToValueAtTime(250, now + 1.6);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 1.85);
  }

  /**
   * Cute Stamp Pop Sound
   */
  playStampSound() {
    this.init();
    this.resume();
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(420, now);
    osc.frequency.exponentialRampToValueAtTime(860, now + 0.12);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.2);
  }

  /**
   * Ambient Atmosphere Music Player (Valetines.mp3)
   */
  startAmbientMusic() {
    this.init();
    this.resume();
    this.isBgmPlaying = true;

    if (this.bgmAudio) {
      this.bgmAudio.muted = this.isMuted;
      const playPromise = this.bgmAudio.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.log("Ambient music ready on user interaction", err);
        });
      }
    }
  }

  stopAmbientMusic() {
    this.isBgmPlaying = false;
    if (this.bgmAudio) {
      this.bgmAudio.pause();
    }
  }

  pauseAmbientMusic() {
    if (this.bgmAudio) {
      this.bgmAudio.pause();
    }
  }

  resumeAmbientMusic() {
    if (this.bgmAudio && !this.isMuted && this.isBgmPlaying) {
      const playPromise = this.bgmAudio.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.log("Audio resume on interaction", err);
        });
      }
    }
  }

  toggleSound() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      if (this.bgmAudio) {
        this.bgmAudio.pause();
      }
      if (this.masterGain && this.ctx) {
        this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
      }
    } else {
      if (this.bgmAudio && this.isBgmPlaying) {
        this.bgmAudio.muted = false;
        this.bgmAudio.play().catch(e => console.log(e));
      }
      if (this.masterGain && this.ctx) {
        this.masterGain.gain.setValueAtTime(0.8, this.ctx.currentTime);
      }
    }
    return !this.isMuted;
  }
}

// Singleton Instance
window.birthdayAudio = new BirthdayAudioEngine();
