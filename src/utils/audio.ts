/**
 * Princess Kingdom Web Audio API Synthesizer
 * 100% offline, low-latency, toddler-friendly whimsical sound effects.
 */

let audioCtx: AudioContext | null = null;
let isMuted: boolean = false;

export function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setSoundMuted(muted: boolean) {
  isMuted = muted;
  try {
    localStorage.setItem('princess_sound_muted', muted ? 'true' : 'false');
  } catch {
    // Ignore storage errors
  }
}

export function getSoundMuted(): boolean {
  try {
    const saved = localStorage.getItem('princess_sound_muted');
    if (saved !== null) {
      isMuted = saved === 'true';
    }
  } catch {
    // Ignore storage errors
  }
  return isMuted;
}

// Helper: play tone with envelope
function playTone(freq: number, type: OscillatorType, duration: number, gainVal: number = 0.2, delay: number = 0) {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, now);

  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(gainVal, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + duration + 0.05);
}

// Sound effects:
export const playSound = {
  // Gentle tactile button click
  tap() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    playTone(523.25, 'sine', 0.1, 0.15); // C5
  },

  // Magical wand sparkle (ascending glittering arpeggio)
  sparkle() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    const notes = [659.25, 783.99, 987.77, 1174.66, 1318.51, 1567.98]; // E5, G5, B5, D6, E6, G6
    notes.forEach((freq, idx) => {
      playTone(freq, 'sine', 0.25, 0.12, idx * 0.05);
    });
  },

  // Whimsical bubble pop
  pop() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    // Frequency sweep upwards then downwards
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(750, now + 0.04);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.09);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  },

  // Tiara or Jewel chime
  chime() {
    if (isMuted) return;
    const notes = [880, 1174.66, 1760]; // A5, D6, A6
    notes.forEach((f, i) => playTone(f, 'sine', 0.4, 0.1, i * 0.06));
  },

  // Success / Match fanfare
  fanfare() {
    if (isMuted) return;
    // C5, E5, G5, high C6 chord burst
    const chord = [523.25, 659.25, 783.99, 1046.5];
    chord.forEach((f, i) => {
      playTone(f, 'triangle', 0.6, 0.2, i * 0.08);
      playTone(f * 2, 'sine', 0.5, 0.08, i * 0.08);
    });
  },

  // Card Flip
  cardFlip() {
    if (isMuted) return;
    playTone(440, 'triangle', 0.1, 0.15);
  },

  // Coloring brush stroke / splash
  splash() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.12);
  },

  // Sticker placement 'boing'
  boing() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(580, now + 0.08);
    osc.frequency.exponentialRampToValueAtTime(420, now + 0.16);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.2);
  },

  // Musical harp note (freq in Hz)
  harpNote(freq: number) {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Rich harmonic harp sound (sine + triangle)
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, now);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 1.3);
    osc2.stop(now + 1.3);
  },

  // Twirl celebration
  twirl() {
    if (isMuted) return;
    const notes = [523.25, 587.33, 659.25, 698.46, 783.99, 880, 987.77, 1046.5];
    notes.forEach((f, i) => {
      playTone(f, 'sine', 0.3, 0.15, i * 0.06);
    });
  },

  // Soft storybook page turn swoosh
  pageTurn() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.07);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.15);
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.15, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.2);
  },

  // Whimsical fairytale 'Next Page' navigation sound effect (crisp paper flutter swoosh + ascending celestial chimes)
  nextPage() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // 1. Crisp gentle parchment page swoosh
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(180, now);
    osc1.frequency.exponentialRampToValueAtTime(750, now + 0.07);
    osc1.frequency.exponentialRampToValueAtTime(280, now + 0.16);
    gain1.gain.setValueAtTime(0.02, now);
    gain1.gain.linearRampToValueAtTime(0.22, now + 0.04);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.2);

    // 2. Ascending bright starlight chime chords (C6, E6, G6, C7)
    const chimes = [1046.5, 1318.51, 1567.98, 2093.0];
    chimes.forEach((freq, idx) => {
      playTone(freq, 'sine', 0.35, 0.13, 0.05 + idx * 0.055);
    });
  },

  // Frog ribbit
  ribbit() {
    if (isMuted) return;
    const notes = [160, 180, 140];
    notes.forEach((f, i) => {
      playTone(f, 'sawtooth', 0.12, 0.18, i * 0.09);
    });
  },

  // Fairy giggle
  giggle() {
    if (isMuted) return;
    const freqs = [880, 1046.5, 1318.5, 1174.6, 1396.9, 1567.9];
    freqs.forEach((f, i) => {
      playTone(f, 'sine', 0.08, 0.12, i * 0.05);
    });
  },

  // Magical unicorn neigh / sparkle
  neigh() {
    if (isMuted) return;
    const freqs = [523.25, 659.25, 783.99, 1046.5, 1318.5];
    freqs.forEach((f, i) => {
      playTone(f, 'triangle', 0.25, 0.15, i * 0.07);
    });
  },

  // Bird tweet
  tweet() {
    if (isMuted) return;
    playTone(1760, 'sine', 0.08, 0.12, 0);
    playTone(2093, 'sine', 0.12, 0.15, 0.07);
    playTone(2637, 'sine', 0.15, 0.12, 0.16);
  },

  // Jewel snap / crystal ting
  gemSnap() {
    if (isMuted) return;
    playTone(1318.51, 'sine', 0.3, 0.18, 0); // E6
    playTone(2637.02, 'sine', 0.2, 0.08, 0.03); // E7
  },

  // Royal Ball Dance Beat
  danceStep() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Bass thud + bright bell
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(140, now);
    osc1.frequency.exponentialRampToValueAtTime(50, now + 0.12);
    gain1.gain.setValueAtTime(0.3, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.15);

    // Bell chime
    playTone(880, 'sine', 0.2, 0.1, 0.02);
  },

  // Curtsy flourish
  curtsy() {
    if (isMuted) return;
    const notes = [659.25, 523.25, 783.99, 1046.5];
    notes.forEach((f, i) => {
      playTone(f, 'sine', 0.35, 0.15, i * 0.1);
    });
  },

  // Disco lights / burst
  discoBurst() {
    if (isMuted) return;
    const notes = [587.33, 739.99, 880, 1174.66];
    notes.forEach((f, i) => {
      playTone(f, 'triangle', 0.2, 0.2, i * 0.05);
    });
  },

  // Tea party pour & bubble
  teaPour() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    for (let i = 0; i < 6; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450 + Math.random() * 300, now + i * 0.07);
      osc.frequency.exponentialRampToValueAtTime(700 + Math.random() * 200, now + i * 0.07 + 0.08);
      gain.gain.setValueAtTime(0.08, now + i * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.07);
      osc.stop(now + i * 0.07 + 0.09);
    }
  },

  // Munch / yum treat
  munch() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    // Two quick playful bites
    [0, 0.12].forEach((t) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now + t);
      osc.frequency.exponentialRampToValueAtTime(180, now + t + 0.08);
      gain.gain.setValueAtTime(0.2, now + t);
      gain.gain.exponentialRampToValueAtTime(0.001, now + t + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + t);
      osc.stop(now + t + 0.09);
    });
    // Happy giggle chime
    playTone(880, 'sine', 0.25, 0.15, 0.22);
  },

  // Bath / rinse splash
  splashWater() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    // Filtered bubbly trickle
    for (let i = 0; i < 5; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(350 + i * 80, now + i * 0.05);
      osc.frequency.linearRampToValueAtTime(600 + i * 100, now + i * 0.05 + 0.08);
      gain.gain.setValueAtTime(0.12, now + i * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.05);
      osc.stop(now + i * 0.05 + 0.11);
    }
  },

  // Gentle grooming brush stroke
  brushStroke() {
    if (isMuted) return;
    playTone(659.25, 'sine', 0.25, 0.08, 0); // E5
    playTone(987.77, 'sine', 0.3, 0.07, 0.06); // B5
  },

  // Magic wand continuous trace chime
  wandChime(noteIndex: number = 0) {
    if (isMuted) return;
    // Pentatonic scale (C major pentatonic: C, D, E, G, A, C)
    const scale = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50, 1174.66, 1318.51];
    const freq = scale[Math.abs(noteIndex) % scale.length];
    playTone(freq, 'sine', 0.35, 0.12, 0);
  },

  // Fireworks explosion sparkle
  fireworkBurst() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Soft poof
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.2);
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.22);

    // Cascading sparkles
    const sparkleNotes = [1046.5, 1318.5, 1567.98, 2093];
    sparkleNotes.forEach((f, i) => {
      playTone(f, 'sine', 0.4, 0.1, 0.05 + i * 0.06);
    });
  },

  // Shape sorter success chime
  shapeMatch() {
    if (isMuted) return;
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((f, i) => {
      playTone(f, 'triangle', 0.3, 0.18, i * 0.07);
    });
  }
};
