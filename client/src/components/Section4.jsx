import { ACTIVITIES } from '../constants.js';

const RESPONSIBILITY_OPTIONS = ACTIVITIES.filter((a) => a !== '—');

export default function Section4({ data, onChange, errors }) {
  const toggleResp = (item) => {
    const current = data.mainResponsibilities || [];
    const updated = current.includes(item) ? current.filter((r) => r !== item) : [...current, item];
    onChange('mainResponsibilities', updated);
  };

  return (
    <div className="section-card">
      <div className="section-title">Section 4 — Responsibilities</div>
      <hr className="section-divider" />

      <div className="field-group">
        <label className="field-label">My main responsibilities are: <span className="required">*</span></label>
        <p className="field-hint" style={{ marginBottom: '12px' }}>Select all that apply.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '8px' }}>
          {RESPONSIBILITY_OPTIONS.map((item) => {
            const checked = (data.mainResponsibilities || []).includes(item);
            return (
              <label key={item} className="checkbox-item" style={{ border: `1.5px solid ${checked ? 'var(--d1-red)' : 'var(--d1-border)'}`, borderRadius: '4px', padding: '9px 12px', background: checked ? '#fff5f6' : 'white', alignItems: 'flex-start' }}>
                <input type="checkbox" checked={checked} onChange={() => toggleResp(item)} style={{ marginTop: '2px' }} />
                <span style={{ fontSize: '13px', lineHeight: '1.4' }}>{item}</span>
              </label>
            );
          })}
        </div>
        {errors.mainResponsibilities && <div className="field-error">{errors.mainResponsibilities}</div>}
      </div>

      <div className="field-group mt-24">
        <label className="field-label">What takes up most of your time that leadership probably doesn't know about? <span className="required">*</span></label>
        <textarea
          className={`field-textarea ${errors.unknownTimeSpend ? 'error' : ''}`}
          value={data.unknownTimeSpend || ''}
          onChange={(e) => onChange('unknownTimeSpend', e.target.value)}
          placeholder="Be specific. This is important context for us."
          style={{ minHeight: '100px' }}
        />
        {errors.unknownTimeSpend && <div className="field-error">{errors.unknownTimeSpend}</div>}
      </div>

      <div className="field-group">
        <label className="field-label">What's one thing that slows you down or isn't working? <span style={{ color: 'var(--d1-gray)', fontWeight: 400 }}>(Optional)</span></label>
        <textarea
          className="field-textarea"
          value={data.slowdowns || ''}
          onChange={(e) => onChange('slowdowns', e.target.value)}
          placeholder="A process, a tool, a gap in support — whatever it is, say it."
          style={{ minHeight: '80px' }}
        />
      </div>
    </div>
  );
}
