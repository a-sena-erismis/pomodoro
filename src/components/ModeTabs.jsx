function ModeTabs({ modes, activeMode, onSelect }) {
  return (
    <div className="mode-tabs">
      {Object.entries(modes).map(([key, config]) => (
        <button
          key={key}
          type="button"
          className={`mode-tab ${activeMode === key ? 'active' : ''}`}
          onClick={() => onSelect(key)}
        >
          {config.label}
        </button>
      ))}
    </div>
  );
}

export default ModeTabs;
