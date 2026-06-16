import { FACILITIES, ROLES, TIME_IN_ROLE } from '../constants.js';

export default function Section1({ data, onChange, errors }) {
  const f = (field) => (e) => onChange(field, e.target.value);
  return (
    <div className="section-card">
      <div className="section-title">Section 1 — Your Info</div>
      <hr className="section-divider" />

      <div className="field-row">
        <div className="field-group">
          <label className="field-label">Full Name <span className="required">*</span></label>
          <input className={`field-input ${errors.fullName ? 'error' : ''}`} type="text" value={data.fullName} onChange={f('fullName')} placeholder="First and Last Name" />
          {errors.fullName && <div className="field-error">{errors.fullName}</div>}
        </div>
        <div className="field-group">
          <label className="field-label">Email Address</label>
          <input className="field-input" type="email" value={data.email} onChange={f('email')} placeholder="you@example.com" />
          <div className="field-hint">Optional — used to send you a confirmation copy</div>
        </div>
      </div>

      <div className="field-row">
        <div className="field-group">
          <label className="field-label">Facility / Location <span className="required">*</span></label>
          <select className={`field-select ${errors.facility ? 'error' : ''}`} value={data.facility} onChange={f('facility')}>
            <option value="">Select your location...</option>
            {FACILITIES.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
          {errors.facility && <div className="field-error">{errors.facility}</div>}
        </div>
        <div className="field-group">
          <label className="field-label">Your Role <span className="required">*</span></label>
          <select className={`field-select ${errors.role ? 'error' : ''}`} value={data.role} onChange={f('role')}>
            <option value="">Select your role...</option>
            {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
          {errors.role && <div className="field-error">{errors.role}</div>}
        </div>
      </div>

      <div className="field-row">
        <div className="field-group">
          <label className="field-label">Employment Type <span className="required">*</span></label>
          <div className="checkbox-group" style={{ marginTop: '4px' }}>
            {['Full-time', 'Part-time'].map((opt) => (
              <label key={opt} className="checkbox-item">
                <input type="radio" name="employmentType" value={opt} checked={data.employmentType === opt} onChange={f('employmentType')} />
                <span>{opt}</span>
              </label>
            ))}
          </div>
          {errors.employmentType && <div className="field-error">{errors.employmentType}</div>}
        </div>
        <div className="field-group">
          <label className="field-label">How long have you been in this role? <span className="required">*</span></label>
          <select className={`field-select ${errors.timeInRole ? 'error' : ''}`} value={data.timeInRole} onChange={f('timeInRole')}>
            <option value="">Select...</option>
            {TIME_IN_ROLE.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          {errors.timeInRole && <div className="field-error">{errors.timeInRole}</div>}
        </div>
      </div>
    </div>
  );
}
