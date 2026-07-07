import './LibraryScene.css';
import LibraryCharacter from './LibraryCharacter';

const DOOR = { x: 160, y: 2 };

function getSeatPositions(count) {
  if (count <= 1) return [{ x: 161, y: 78 }];
  if (count === 2)
    return [
      { x: 138, y: 76 },
      { x: 184, y: 76 },
    ];
  return [
    { x: 118, y: 80 },
    { x: 160, y: 74 },
    { x: 202, y: 80 },
  ];
}

function LibraryStage({ phase, cast, lighting }) {
  const seats = getSeatPositions(cast.length);

  return (
    <div className="lib-stage" data-lighting={lighting}>
      <svg
        className="lib-stage-svg"
        viewBox="0 0 320 100"
        preserveAspectRatio="xMidYMax meet"
        shapeRendering="crispEdges"
      >
        <defs>
          <radialGradient id="stageDeskGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e8c168" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#e8c168" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect x="0" y="0" width="320" height="100" fill="#160e08" />
        {Array.from({ length: 16 }).map((_, i) => (
          <rect key={i} x={i * 20} y="0" width="1" height="100" fill="#120c06" opacity="0.5" />
        ))}

        <ellipse cx="161" cy="78" rx="72" ry="20" fill="url(#stageDeskGlow)" className="lib-desk-glow" />

        {seats.map((s, i) => (
          <g key={i} transform={`translate(${s.x}, ${s.y})`}>
            <rect x="-9" y="-16" width="4" height="16" fill="#4a3120" />
            <rect x="5" y="-16" width="4" height="16" fill="#4a3120" />
            <rect x="-10" y="-2" width="20" height="3" fill="#5c3d24" />
          </g>
        ))}

        <g transform="translate(161, 66)">
          <rect x="-38" y="-6" width="76" height="7" fill="#6b4a2e" />
          <rect x="-38" y="-6" width="76" height="2" fill="#8a5f3a" />
          <rect x="-34" y="1" width="4" height="16" fill="#4a3120" />
          <rect x="30" y="1" width="4" height="16" fill="#4a3120" />
          <rect x="-28" y="-11" width="3" height="5" fill="#e8dcc0" />
          <rect x="-27" y="-14" width="1" height="3" fill="#ff9d3c" className="lib-flame lib-flame--d" />
        </g>

        {phase !== 'empty' &&
          cast.map((type, i) => (
            <LibraryCharacter key={i} type={type} seat={seats[i]} door={DOOR} phase={phase} index={i} />
          ))}
      </svg>
    </div>
  );
}

export default LibraryStage;
