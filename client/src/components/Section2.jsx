import { DAYS, HOURS_OPTIONS, generateArrivalTimes, generateDepartureTimes } from '../constants.js';

const ARRIVAL_TIMES = generateArrivalTimes();
const DEPARTURE_TIMES = generateDepartureTimes();

export default function Section2({ data, onChange, errors }) {
  const toggleDay = (day) => {
    const current = data.daysWorked || [];
    const updated = current.includes(day) ? current.filter((d) => d !== day) : [...current, day];
    onChange('daysWorked', updated);
  };

  return (
    <div className="section-card">
      <div className="section-title">Section 2 — Your Work Week</div>
      <hr className="section-divider" />

      <div className="field-group">
        <label className="field-label">Days Worked <span className="required">*</span></label>
        <div className="checkbox-group">
          {DAYS.map((day) => (
            <label key={day} className="checkbox-item" style={{ border: `1.5px solid ${(data.daysWorked || []).includes(day) ? 'var(--d1-red)' : 'var(--d1-border)'}`, borderRadius: '4px', padding: '8px 14px', background: (data.daysWorked || []).includes(day) ? '#fff5f6' : 'white' }}>
              <input type="checkbox" checked={(data.daysWorked || []).includes(day)} onChange={() => toggleDay(day)} />
              <span style={{ fontWeight: '600' }}>{day}</span>
            </label>
          ))}
        </div>
        {errors.daysWorked && <div className="field-error">{errors.daysWorked}</div>}
      </div>

      <div className="field-row">
        <div className="field-group">
          <label className="field-label">Typical Arrival Time <span className="required">*</span></label>
          <select className={`field-select ${errors.arrivalTime ? 'error' : ''}`} value={data.arrivalTime} onChange={(e) => onChange('arrivalTime', e.target.value)}>
            <option value="">Select time...</option>
            {ARRIVAL_TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          {errors.arrivalTime && <div className="field-error">{errors.arrivalTime}</div>}
        </div>
        <div className="field-group">
          <label className="field-label">Typical Departure Time <span className="required">*</span></label>
          <select className={`field-select ${errors.departureTime ? 'error' : ''}`} value={data.departureTime} onChange={(e) => onChange('departureTime', e.target.value)}>
            <option value="">Select time...</option>
            {DEPARTURE_TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          {errors.departureTime && <div className="field-error">{errors.departureTime}</div>}
        </div>
      </div>

      <div className="field-group">
        <label className="field-label">Approximate Hours Per Week <span className="required">*</span></label>
        <div className="checkbox-group">
          {HOURS_OPTIONS.map((opt) => (
            <label key={opt} className="checkbox-item" style={{ border: `1.5px solid ${data.hoursPerWeek === opt ? 'var(--d1-red)' : 'var(--d1-border)'}`, borderRadius: '4px', padding: '8px 14px', background: data.hoursPerWeek === opt ? '#fff5f6' : 'white' }}>
              <input type="radio" name="hoursPerWeek" value={opt} checked={data.hoursPerWeek === opt} onChange={(e) => onChange('hoursPerWeek', e.target.value)} />
              <span style={{ fontWeight: '600' }}>{opt}</span>
            </label>
          ))}
        </div>
        {errors.hoursPerWeek && <div className="field-error">{errors.hoursPerWeek}</div>}
      </div>
    </div>
  );
}
