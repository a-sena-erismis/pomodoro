import ModeTabs from './ModeTabs';

const SEGMENT_COUNT = 20;

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function PixelTimer({ timer, activeTaskLabel, onOpenPanel }) {
  const filledSegments = Math.round(timer.progress * SEGMENT_COUNT);
  const mod = timer.completedFocusSessions % 4;
  const sessionsFilled = mod === 0 && timer.completedFocusSessions > 0 ? 4 : mod;

  return (
    <section className="pixel-panel timer-panel">
      <ModeTabs modes={timer.modes} activeMode={timer.mode} onSelect={timer.switchMode} />

      {activeTaskLabel && timer.mode === 'focus' && (
        <div className="session-count">📖 {activeTaskLabel}</div>
      )}

      <div className="timer-display">{formatTime(timer.secondsLeft)}</div>

      <div className="progress-track">
        {Array.from({ length: SEGMENT_COUNT }).map((_, i) => (
          <div key={i} className={`progress-seg ${i < filledSegments ? 'filled' : ''}`} />
        ))}
      </div>

      <div className="timer-controls">
        <button type="button" className="pixel-btn" onClick={timer.toggleRunning}>
          {timer.isRunning ? 'Duraklat' : 'Başlat'}
        </button>
        <button type="button" className="pixel-btn ghost" onClick={timer.reset}>
          Sıfırla
        </button>
      </div>

      <div className="session-count">Tamamlanan Ayin: {timer.completedFocusSessions}</div>
      <div className="session-dots">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={`session-dot ${i < sessionsFilled ? 'filled' : ''}`} />
        ))}
      </div>

      <div className="panel-toggle-row">
        <button type="button" className="pixel-btn ghost" onClick={() => onOpenPanel('tasks')}>
          📖 Görevler
        </button>
        <button type="button" className="pixel-btn ghost" onClick={() => onOpenPanel('cast')}>
          🎭 Sakinler
        </button>
        <button type="button" className="pixel-btn ghost" onClick={() => onOpenPanel('stats')}>
          📊 Kayıtlar
        </button>
        <button type="button" className="pixel-btn ghost" onClick={() => onOpenPanel('settings')}>
          ⚙ Ayarlar
        </button>
      </div>
    </section>
  );
}

export default PixelTimer;
