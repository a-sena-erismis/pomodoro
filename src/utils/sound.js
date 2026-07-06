let ctx;

function getContext() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return ctx;
}

function tone(startTime, freq, duration, gainValue) {
  const audioCtx = getContext();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'square';
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(gainValue, startTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(startTime);
  osc.stop(startTime + duration);
}

export function playBell() {
  const audioCtx = getContext();
  const now = audioCtx.currentTime;
  tone(now, 660, 0.18, 0.2);
  tone(now + 0.2, 880, 0.18, 0.2);
  tone(now + 0.4, 990, 0.35, 0.2);
}

export function playClick() {
  const audioCtx = getContext();
  const now = audioCtx.currentTime;
  tone(now, 220, 0.05, 0.12);
}
