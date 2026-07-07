function TimerSettings({ timer }) {
  return (
    <section className="pixel-panel">
      <h2 className="section-title">Ayarlar</h2>
      <div className="settings-grid">
        {Object.entries(timer.modes).map(([key, config]) => (
          <label key={key} className="settings-field">
            {config.label} (dk)
            <input
              type="number"
              min="1"
              max="180"
              value={timer.durations[key] / 60}
              onChange={(e) => timer.updateDuration(key, Number(e.target.value) || 1)}
            />
          </label>
        ))}
      </div>
    </section>
  );
}

export default TimerSettings;
