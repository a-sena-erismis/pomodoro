const PALETTES = [
  { cover: '#5c1a22', pages: '#e8dcc0', trim: '#c9a227' },
  { cover: '#1f3a52', pages: '#e8dcc0', trim: '#7fa9c4' },
  { cover: '#2f4a2c', pages: '#e8dcc0', trim: '#a9c46a' },
  { cover: '#4a2c52', pages: '#e8dcc0', trim: '#c48ae0' },
];

function Book({ x, y, variant = 0, delay = 0, duration = 16, active = true }) {
  const p = PALETTES[variant % PALETTES.length];

  return (
    <g transform={`translate(${x}, ${y})`}>
      <g
        className={`lib-book-float ${active ? '' : 'is-resting'}`}
        style={{ animationDelay: `${delay}s`, animationDuration: `${duration}s` }}
      >
        <g className="lib-book-spin" style={{ animationDelay: `${delay * 0.6}s` }}>
          <rect x="-1" y="1" width="10" height="2" fill="#100a06" opacity="0.3" />
          <rect x="0" y="0" width="8" height="6" fill={p.cover} />
          <rect x="1" y="1" width="6" height="4" fill={p.pages} />
          <rect x="3.5" y="1" width="1" height="4" fill={p.cover} opacity="0.5" />
          <rect x="0" y="0" width="8" height="1" fill={p.trim} />
          <rect x="0" y="5" width="8" height="1" fill={p.trim} />
        </g>
      </g>
    </g>
  );
}

export default Book;
