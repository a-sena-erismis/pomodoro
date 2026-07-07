import { CHARACTERS } from './characters';

// Local grid is 16 wide x 24 tall, anchored at the feet (bottom-center).
function CharacterSprite({ type = 'hood', pose = 'seated', walking = false }) {
  const c = CHARACTERS[type] || CHARACTERS.hood;
  const showHair = type !== 'shadow';

  return (
    <g className={`lib-sprite lib-sprite--${pose} ${walking ? 'is-walking' : ''}`}>
      {/* hood peak */}
      <rect x="6" y="0" width="4" height="2" fill={c.cloak} />
      {/* hood / head */}
      <rect x="5" y="2" width="6" height="4" fill={c.cloak} />
      <rect x="6" y="3" width="4" height="3" fill={c.skin} />
      {showHair && <rect x="5" y="3" width="1" height="2" fill={c.hair} />}
      {showHair && <rect x="10" y="3" width="1" height="2" fill={c.hair} />}
      <rect x="7" y="4" width="1" height="1" fill="#100a06" />
      <rect x="9" y="4" width="1" height="1" fill="#100a06" />

      {pose === 'seated' ? (
        <>
          {/* shoulders + torso */}
          <rect x="3" y="6" width="10" height="4" fill={c.cloak} />
          <rect x="4" y="10" width="8" height="6" fill={c.cloak} />
          <rect x="4" y="10" width="1" height="6" fill={c.cloakDark} />
          <rect x="11" y="10" width="1" height="6" fill={c.cloakDark} />
          {/* book held at chest */}
          <rect x="5" y="12" width="6" height="3" fill="#e8dcc0" />
          <rect x="5" y="13" width="6" height="1" fill="#100a06" opacity="0.35" />
          <rect x="4" y="12" width="1" height="2" fill={c.skin} />
          <rect x="11" y="12" width="1" height="2" fill={c.skin} />
          {/* seated lower cloak */}
          <rect x="5" y="16" width="6" height="5" fill={c.cloak} />
        </>
      ) : (
        <>
          <rect x="3" y="6" width="10" height="3" fill={c.cloak} />
          <rect x="4" y="9" width="8" height="6" fill={c.cloak} />
          <rect x="4" y="9" width="1" height="6" fill={c.cloakDark} />
          <rect x="11" y="9" width="1" height="6" fill={c.cloakDark} />
          <rect x="2" y="10" width="2" height="4" fill={c.skin} />
          <rect x="12" y="10" width="2" height="4" fill={c.skin} />

          <g className="lib-legs lib-legs--a">
            <rect x="5" y="15" width="2" height="8" fill={c.cloakDark} />
            <rect x="9" y="15" width="2" height="8" fill={c.cloak} />
          </g>
          <g className="lib-legs lib-legs--b">
            <rect x="4" y="15" width="2" height="8" fill={c.cloak} />
            <rect x="10" y="15" width="2" height="8" fill={c.cloakDark} />
          </g>
        </>
      )}
    </g>
  );
}

export default CharacterSprite;
