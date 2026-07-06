function PixelCandle({ className = '' }) {
  return (
    <svg
      className={`candle ${className}`}
      viewBox="0 0 12 18"
      shapeRendering="crispEdges"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="5" y="0" width="2" height="2" fill="#ffdd8a" />
      <rect x="4" y="2" width="4" height="2" fill="#ff9d3c" />
      <rect x="3" y="4" width="6" height="2" fill="#e8562a" />
      <rect x="5" y="6" width="2" height="2" fill="#3a2a1c" />
      <rect x="4" y="8" width="4" height="8" fill="#e8dcc0" />
      <rect x="4" y="8" width="1" height="8" fill="#fff6df" />
      <rect x="7" y="8" width="1" height="8" fill="#a8987a" />
      <rect x="3" y="16" width="6" height="2" fill="#c9a227" />
    </svg>
  );
}

export default PixelCandle;
