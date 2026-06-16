export default function Section6({ data, onChange }) {
  return (
    <div className="section-card">
      <div className="section-title">Section 6 — Anything Else</div>
      <hr className="section-divider" />

      <div className="field-group">
        <label className="field-label">
          Anything else you want us to know about your role, your schedule, or your facility?
          <span style={{ color: 'var(--d1-gray)', fontWeight: 400 }}> (Optional)</span>
        </label>
        <p className="field-hint" style={{ marginBottom: '12px' }}>
          This is your open space. Say whatever didn't fit above.
        </p>
        <textarea
          className="field-textarea"
          value={data.anythingElse || ''}
          onChange={(e) => onChange('anythingElse', e.target.value)}
          placeholder="Anything at all — we're listening."
          style={{ minHeight: '140px' }}
        />
      </div>
    </div>
  );
}
