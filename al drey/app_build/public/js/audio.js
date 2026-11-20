/**
 * audio.js - Web Audio API Synthesizer for Glamour Runway 3D
 * Generates dynamic sound effects without any external audio file dependencies.
 */

class SoundFX {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.beatInterval = null;
    this.isBeating = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.muted && this.isBeating) {
      this.stopRunwayBeat();
    }
    return !this.muted;
  }

  playClick() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  playSelect() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.12);
  }

  playColorChange() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(660, this.ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }

  playCameraFlash() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    // Camera mechanical shutter click + electrical pop
    const t = this.ctx.currentTime;
    
    // Noise burst for mechanical click
    const bufferSize = this.ctx.sampleRate * 0.08;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1200, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.35, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.08);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(t);

    // Followed by high flash strobe chirp
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1400, t + 0.03);
    osc.frequency.exponentialRampToValueAtTime(3200, t + 0.15);

    oscGain.gain.setValueAtTime(0.1, t + 0.03);
    oscGain.gain.exponentialRampToValueAtTime(0.01, t + 0.18);

    osc.connect(oscGain);
    oscGain.connect(this.ctx.destination);

    osc.start(t + 0.03);
    osc.stop(t + 0.18);
  }

  startRunwayBeat() {
    if (this.muted || this.isBeating) return;
    this.init();
    if (!this.ctx) return;

    this.isBeating = true;
    let step = 0;
    const bpm = 125;
    const intervalMs = (60 / bpm / 2) * 1000; // eighth notes

    this.beatInterval = setInterval(() => {
      if (!this.isBeating || this.muted) return;
      const t = this.ctx.currentTime;

      // Kick on 1 and 3
      if (step % 4 === 0) {
        const kick = this.ctx.createOscillator();
        const kickGain = this.ctx.createGain();
        kick.frequency.setValueAtTime(130, t);
        kick.frequency.exponentialRampToValueAtTime(45, t + 0.12);
        kickGain.gain.setValueAtTime(0.4, t);
        kickGain.gain.exponentialRampToValueAtTime(0.01, t + 0.15);
        kick.connect(kickGain);
        kickGain.connect(this.ctx.destination);
        kick.start(t);
        kick.stop(t + 0.15);
      }

      // Snare/Clap on 2 and 4
      if (step % 4 === 2) {
        const bufferSize = this.ctx.sampleRate * 0.07;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        const clap = this.ctx.createBufferSource();
        clap.buffer = buffer;
        const clapGain = this.ctx.createGain();
        clapGain.gain.setValueAtTime(0.18, t);
        clapGain.gain.exponentialRampToValueAtTime(0.01, t + 0.07);
        clap.connect(clapGain);
        clapGain.connect(this.ctx.destination);
        clap.start(t);
      }

      // Hi-hat on every off-beat
      if (step % 2 === 1) {
        const bufferSize = this.ctx.sampleRate * 0.03;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        const hat = this.ctx.createBufferSource();
        hat.buffer = buffer;
        const hatGain = this.ctx.createGain();
        hatGain.gain.setValueAtTime(0.06, t);
        hatGain.gain.exponentialRampToValueAtTime(0.01, t + 0.03);
        hat.connect(hatGain);
        hatGain.connect(this.ctx.destination);
        hat.start(t);
      }

      // Melodic bass pulse
      if (step % 8 === 0 || step % 8 === 3 || step % 8 === 6) {
        const bass = this.ctx.createOscillator();
        const bassGain = this.ctx.createGain();
        const notes = [110, 130.81, 146.83, 164.81];
        bass.type = 'sawtooth';
        bass.frequency.setValueAtTime(notes[(step / 2) % notes.length], t);
        bassGain.gain.setValueAtTime(0.07, t);
        bassGain.gain.exponentialRampToValueAtTime(0.01, t + 0.18);
        bass.connect(bassGain);
        bassGain.connect(this.ctx.destination);
        bass.start(t);
        bass.stop(t + 0.18);
      }

      step++;
    }, intervalMs);
  }

  stopRunwayBeat() {
    this.isBeating = false;
    if (this.beatInterval) {
      clearInterval(this.beatInterval);
      this.beatInterval = null;
    }
  }

  playVictory() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t + idx * 0.12);

      gain.gain.setValueAtTime(0, t + idx * 0.12);
      gain.gain.linearRampToValueAtTime(0.2, t + idx * 0.12 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.01, t + idx * 0.12 + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t + idx * 0.12);
      osc.stop(t + idx * 0.12 + 0.5);
    });
  }
}

// Global Sound Instance
window.SoundFXInstance = new SoundFX();
