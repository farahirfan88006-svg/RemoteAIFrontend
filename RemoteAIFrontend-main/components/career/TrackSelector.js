/**
 * Grid of selectable interview tracks (Frontend, Backend, …). Built on
 * the existing `.card`/`.btn` treatment — a selected track gets the
 * accent border already defined for `.highlighted`-style states
 * elsewhere (see PricingCard), applied here via inline style so this
 * component doesn't need its own stylesheet for one rule.
 */
export default function TrackSelector({ tracks, selectedTrackId, onSelect }) {
  return (
    <div
      style={{
        display: "grid",
        gap: "var(--space-sm)",
        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
      }}
    >
      {tracks.map((track) => {
        const isSelected = track.id === selectedTrackId;
        return (
          <button
            key={track.id}
            type="button"
            className="card"
            onClick={() => onSelect(track.id)}
            aria-pressed={isSelected}
            style={{
              padding: "var(--space-md)",
              cursor: "pointer",
              textAlign: "center",
              fontWeight: 600,
              borderColor: isSelected ? "var(--color-accent)" : undefined,
              boxShadow: isSelected ? "var(--shadow-md)" : undefined,
              color: isSelected ? "var(--color-accent-strong)" : "var(--color-text)",
            }}
          >
            {track.label}
          </button>
        );
      })}
    </div>
  );
}
