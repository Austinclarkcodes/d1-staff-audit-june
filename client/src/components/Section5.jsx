import { SECTION5_QUESTIONS } from '../constants.js';

function RadioQuestion({ question, options, value, onChange, error }) {
  return (
    <div className="field-group" style={{ marginBottom: '28px' }}>
      <label className="field-label" style={{ fontSize: '14px', marginBottom: '12px', lineHeight: '1.5' }}>
        {question} <span className="required">*</span>
      </label>
      <div className="radio-group">
        {options.map((opt, i) => (
          <label key={opt} className={`radio-btn ${value === opt ? 'selected' : ''}`}>
            <input type="radio" value={opt} checked={value === opt} onChange={() => onChange(opt)} />
            <span>{opt}</span>
          </label>
        ))}
      </div>
      {error && <div className="field-error mt-8">{error}</div>}
    </div>
  );
}

export default function Section5({ data, onChange, errors }) {
  return (
    <div className="section-card">
      <div className="section-title">Section 5 — Training &amp; Onboarding</div>
      <div className="section-subtitle">Be honest. This helps us invest in YOU.</div>
      <hr className="section-divider" />

      <div style={{ background: 'var(--d1-black)', color: 'white', padding: '14px 18px', borderRadius: '4px', marginBottom: '28px', fontSize: '13px', lineHeight: '1.6' }}>
        There are no wrong answers here. Your honesty helps D1 leadership understand exactly where to invest, what systems are missing, and how to support you better.
      </div>

      {SECTION5_QUESTIONS.map((q) => (
        <RadioQuestion
          key={q.key}
          question={q.question}
          options={q.options}
          value={data[q.key] || ''}
          onChange={(val) => onChange(q.key, val)}
          error={errors[q.key]}
        />
      ))}

      <div className="field-group">
        <label className="field-label">What's one thing D1 could do to help you perform better?</label>
        <textarea
          className="field-textarea"
          value={data.performanceSuggestion || ''}
          onChange={(e) => onChange('performanceSuggestion', e.target.value)}
          placeholder="Training, tools, support, communication, scheduling — anything is fair game."
          style={{ minHeight: '100px' }}
        />
      </div>
    </div>
  );
}
