import './LibraryScene.css';
import Book from './Book';
import LibraryCharacter from './LibraryCharacter';

const SPINE_COLORS = [
  '#5c1a22',
  '#1f3a52',
  '#2f4a2c',
  '#4a2c52',
  '#7a2530',
  '#6b4a2e',
  '#3f6f8a',
  '#8a6b2e',
];

const DOOR = { x: 160, y: 116 };

const BOOKS = [
  { x: 56, y: 30, variant: 0, delay: 0, duration: 18 },
  { x: 236, y: 24, variant: 1, delay: 3, duration: 16 },
  { x: 150, y: 46, variant: 2, delay: 6.5, duration: 20 },
  { x: 268, y: 58, variant: 3, delay: 1.5, duration: 17 },
];

function getSeatPositions(count) {
  if (count <= 1) return [{ x: 161, y: 152 }];
  if (count === 2)
    return [
      { x: 140, y: 150 },
      { x: 182, y: 150 },
    ];
  return [
    { x: 122, y: 153 },
    { x: 160, y: 148 },
    { x: 200, y: 153 },
  ];
}

function ShelfRow({ y, xStart, xEnd, seed }) {
  const rects = [];
  let x = xStart;
  let i = 0;
  while (x < xEnd - 1) {
    const w = Math.min(4 + ((seed + i * 3) % 5), xEnd - x);
    const color = SPINE_COLORS[(seed + i * 2) % SPINE_COLORS.length];
    rects.push(<rect key={i} x={x} y={y} width={w} height="8" fill={color} />);
    x += w + 1;
    i += 1;
  }
  return <>{rects}</>;
}

function Bookshelf({ xStart, xEnd }) {
  const rows = [];
  for (let r = 0; r < 7; r += 1) {
    const y = 16 + r * 11;
    rows.push(<ShelfRow key={r} y={y} xStart={xStart} xEnd={xEnd} seed={r * 5 + xStart} />);
    rows.push(<rect key={`plank-${r}`} x={xStart} y={y + 8} width={xEnd - xStart} height="2" fill="#160e08" />);
  }
  return (
    <g>
      <rect x={xStart} y="14" width={xEnd - xStart} height="94" fill="#0e0906" />
      {rows}
      <rect x={xStart} y="14" width="3" height="94" fill="#241608" />
      <rect x={xEnd - 3} y="14" width="3" height="94" fill="#241608" />
    </g>
  );
}

function LibraryScene({ phase, cast, lighting }) {
  const seats = getSeatPositions(cast.length);

  return (
    <div className="lib-scene" data-lighting={lighting} aria-hidden="true">
      <svg
        className="lib-scene-svg"
        viewBox="0 0 320 180"
        preserveAspectRatio="xMidYMid slice"
        shapeRendering="crispEdges"
      >
        <defs>
          <radialGradient id="lampGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffdd8a" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#ff9d3c" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ff9d3c" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="deskGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e8c168" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#e8c168" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* base wall */}
        <rect x="0" y="0" width="320" height="180" fill="#0b0705" />

        {/* bookshelves */}
        <Bookshelf xStart={0} xEnd={118} />
        <Bookshelf xStart={202} xEnd={320} />

        {/* central alcove + door */}
        <rect x="118" y="10" width="84" height="98" fill="#150d07" />
        <rect x="118" y="10" width="84" height="6" fill="#2a1c0f" />
        <rect x="130" y="20" width="60" height="88" fill="#0e0906" />

        <circle cx="160" cy="30" r="46" fill="url(#lampGlow)" className="lib-lamp-glow" />

        {/* chandelier */}
        <g className="lib-chandelier">
          <rect x="158" y="0" width="4" height="14" fill="#2a1c0f" />
          <rect x="140" y="14" width="40" height="3" fill="#2a1c0f" />
          <rect x="146" y="17" width="2" height="6" fill="#3a2a1c" />
          <rect x="145" y="23" width="4" height="4" fill="#ff9d3c" className="lib-flame" />
          <rect x="172" y="17" width="2" height="6" fill="#3a2a1c" />
          <rect x="171" y="23" width="4" height="4" fill="#ff9d3c" className="lib-flame lib-flame--b" />
          <rect x="159" y="17" width="2" height="8" fill="#3a2a1c" />
          <rect x="158" y="25" width="4" height="4" fill="#ffdd8a" className="lib-flame lib-flame--c" />
        </g>

        {/* door */}
        <g className="lib-door" data-open={phase === 'entering' || phase === 'leaving'}>
          <rect x="142" y="70" width="36" height="48" fill="#a68a52" className="lib-door-glow" />
          <g className="lib-door-leaf">
            <rect x="145" y="72" width="30" height="44" fill="#4a3120" />
            <rect x="145" y="72" width="30" height="2" fill="#5c3d24" />
            <rect x="145" y="93" width="30" height="2" fill="#2a1c0f" />
            <rect x="148" y="76" width="10" height="15" fill="none" stroke="#2a1c0f" strokeWidth="1" />
            <rect x="162" y="76" width="10" height="15" fill="none" stroke="#2a1c0f" strokeWidth="1" />
            <rect x="148" y="97" width="10" height="15" fill="none" stroke="#2a1c0f" strokeWidth="1" />
            <rect x="162" y="97" width="10" height="15" fill="none" stroke="#2a1c0f" strokeWidth="1" />
            <rect x="168" y="93" width="2" height="2" fill="#c9a227" />
          </g>
          <rect x="145" y="72" width="30" height="44" fill="none" stroke="#c9a227" strokeWidth="1" />
        </g>

        {/* floor */}
        <rect x="0" y="118" width="320" height="62" fill="#1a1108" />
        {Array.from({ length: 16 }).map((_, i) => (
          <rect key={i} x={i * 20} y="118" width="1" height="62" fill="#120c06" opacity="0.6" />
        ))}
        <rect x="0" y="118" width="320" height="2" fill="#0c0805" />

        {/* rug / desk light pool */}
        <ellipse cx="161" cy="150" rx="70" ry="22" fill="url(#deskGlow)" className="lib-desk-glow" />

        {/* chairs (drawn behind characters) */}
        {seats.map((s, i) => (
          <g key={i} transform={`translate(${s.x}, ${s.y})`}>
            <rect x="-9" y="-16" width="4" height="16" fill="#4a3120" />
            <rect x="5" y="-16" width="4" height="16" fill="#4a3120" />
            <rect x="-10" y="-2" width="20" height="3" fill="#5c3d24" />
          </g>
        ))}

        {/* desk */}
        <g transform="translate(161, 140)">
          <rect x="-38" y="-6" width="76" height="7" fill="#6b4a2e" />
          <rect x="-38" y="-6" width="76" height="2" fill="#8a5f3a" />
          <rect x="-34" y="1" width="4" height="16" fill="#4a3120" />
          <rect x="30" y="1" width="4" height="16" fill="#4a3120" />
          {/* candle */}
          <rect x="-28" y="-11" width="3" height="5" fill="#e8dcc0" />
          <rect x="-27" y="-14" width="1" height="3" fill="#ff9d3c" className="lib-flame lib-flame--d" />
        </g>

        {/* characters */}
        {phase !== 'empty' &&
          cast.map((type, i) => (
            <LibraryCharacter key={i} type={type} seat={seats[i]} door={DOOR} phase={phase} index={i} />
          ))}

        {/* flying books */}
        {BOOKS.map((b, i) => (
          <Book key={i} {...b} />
        ))}

        {/* vignette / mood overlays */}
        <rect x="0" y="0" width="320" height="180" className="lib-overlay-work" />
        <rect x="0" y="0" width="320" height="180" className="lib-overlay-break" />
      </svg>
    </div>
  );
}

export default LibraryScene;
