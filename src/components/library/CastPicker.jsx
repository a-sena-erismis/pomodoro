import { CHARACTERS, CHARACTER_ORDER, MAX_SEATS } from './characters';

function CastPicker({ seatCount, setSeatCount, seatTypes, setSeatType }) {
  return (
    <section className="pixel-panel">
      <h2 className="section-title">Kütüphane Sakinleri</h2>
      <p className="cast-hint">
        Çalışma zamanı başladığında kütüphaneye gelip masada kitap okuyacak kişileri seç.
      </p>

      <div className="cast-count-row">
        {Array.from({ length: MAX_SEATS + 1 }).map((_, n) => (
          <button
            key={n}
            type="button"
            className={`pixel-btn ghost cast-count-btn ${seatCount === n ? 'is-pressed' : ''}`}
            onClick={() => setSeatCount(n)}
          >
            {n}
          </button>
        ))}
      </div>

      {seatCount > 0 && (
        <div className="cast-seats">
          {Array.from({ length: seatCount }).map((_, i) => (
            <label key={i} className="cast-seat">
              <span>Sandalye {i + 1}</span>
              <select value={seatTypes[i] || CHARACTER_ORDER[0]} onChange={(e) => setSeatType(i, e.target.value)}>
                {CHARACTER_ORDER.map((key) => (
                  <option key={key} value={key}>
                    {CHARACTERS[key].label}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>
      )}
    </section>
  );
}

export default CastPicker;
