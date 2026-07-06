import { lastNDays, todayKey } from '../utils/date';

function StatsPanel({ stats }) {
  const today = todayKey();
  const todayCount = stats.byDate[today] || 0;
  const totalCount = Object.values(stats.byDate).reduce((sum, n) => sum + n, 0);
  const totalMinutes = stats.totalFocusMinutes || 0;
  const days = lastNDays(7);
  const maxCount = Math.max(1, ...days.map((d) => stats.byDate[d.key] || 0));

  return (
    <section className="pixel-panel">
      <h2 className="section-title">Günlük Kayıtlar</h2>

      <div className="stats-grid">
        <div className="stat-box">
          <div className="stat-value">{todayCount}</div>
          <div className="stat-label">Bugünkü Ayin</div>
        </div>
        <div className="stat-box">
          <div className="stat-value">{totalCount}</div>
          <div className="stat-label">Toplam Ayin</div>
        </div>
      </div>

      <div className="stat-box" style={{ marginBottom: 16 }}>
        <div className="stat-value">{Math.floor(totalMinutes / 60)}s {totalMinutes % 60}dk</div>
        <div className="stat-label">Toplam Odaklanma Süresi</div>
      </div>

      <div className="week-chart">
        {days.map((day) => {
          const count = stats.byDate[day.key] || 0;
          const heightPct = (count / maxCount) * 100;
          return (
            <div className="week-bar-col" key={day.key}>
              <div
                className={`week-bar ${day.key === today ? 'today' : ''}`}
                style={{ height: `${count === 0 ? 4 : heightPct}%` }}
                title={`${count} ayin`}
              />
              <span className="week-label">{day.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default StatsPanel;
