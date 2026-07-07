import { useEffect, useState } from 'react';
import CharacterSprite from './CharacterSprite';

function LibraryCharacter({ type, seat, door, phase, index = 0 }) {
  const [atSeat, setAtSeat] = useState(phase !== 'entering');

  useEffect(() => {
    if (phase === 'entering') {
      const raf = requestAnimationFrame(() => setAtSeat(true));
      return () => cancelAnimationFrame(raf);
    }
    if (phase === 'leaving') setAtSeat(false);
    if (phase === 'seated') setAtSeat(true);
    return undefined;
  }, [phase]);

  const x = atSeat ? seat.x : door.x;
  const y = atSeat ? seat.y : door.y;
  const walking = phase !== 'seated';

  const rawDir = phase === 'leaving' ? Math.sign(door.x - seat.x) : Math.sign(seat.x - door.x);
  const scaleX = rawDir === 0 ? 1 : rawDir;

  return (
    <g
      className="lib-character"
      style={{
        transform: `translate(${x}px, ${y}px) scale(${scaleX}, 1)`,
        transitionDelay: `${index * 220}ms`,
      }}
    >
      <g className={walking ? 'lib-walk-bob' : ''}>
        <g transform="translate(-8, -24)">
          <CharacterSprite type={type} pose={walking ? 'walk' : 'seated'} walking={walking} />
        </g>
      </g>
    </g>
  );
}

export default LibraryCharacter;
