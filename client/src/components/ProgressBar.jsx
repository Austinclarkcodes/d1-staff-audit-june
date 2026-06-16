export default function ProgressBar({ current, total, sections }) {
  const pct = Math.round(((current) / total) * 100);
  return (
    <div className="progress-wrap">
      <div className="progress-label">Section {current + 1} of {total} — {sections[current]}</div>
      <div className="progress-bar-track">
        <div className="progress-bar-fill" style={{ width: `${Math.max(4, pct)}%` }} />
      </div>
      <div className="progress-steps">
        {sections.map((s, i) => (
          <span
            key={i}
            className={`progress-step ${i < current ? 'done' : i === current ? 'active' : 'upcoming'}`}
          >
            {i < current ? '✓ ' : ''}{s}
          </span>
        ))}
      </div>
    </div>
  );
}
