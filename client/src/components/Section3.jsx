import { useCallback } from 'react';
import TimeGrid from './TimeGrid.jsx';
import { ACTIVITIES } from '../constants.js';

export default function Section3({ data, onChange }) {
  const handleCellChange = useCallback(
    (day, slot, activity) => {
      const updated = {
        ...data.schedule,
        [day]: { ...(data.schedule?.[day] || {}), [slot]: activity }
      };
      onChange('schedule', updated);
    },
    [data.schedule, onChange]
  );

  return (
    <div className="section-card">
      <div className="section-title">Section 3 — Weekly Time Audit</div>
      <hr className="section-divider" />

      <div className="callout-red">
        <p>
          <strong>DON'T FORGET:</strong> Include staff meetings, your 1-on-1s with your manager, lunch breaks, and any recurring team huddles. These matter.
        </p>
      </div>

      <p style={{ fontSize: '13px', color: 'var(--d1-gray)', marginBottom: '16px', lineHeight: '1.6' }}>
        Fill in what you typically do during each 15-minute block. You don't need to fill every cell — just the ones that reflect your typical week.
      </p>

      <div style={{ background: '#f8f8f8', border: '1px solid var(--d1-border)', borderRadius: '6px', padding: '14px 16px', marginBottom: '20px' }}>
        <div style={{ fontFamily: 'var(--font-header)', fontSize: '11px', letterSpacing: '1px', color: 'var(--d1-gray)', marginBottom: '10px' }}>AVAILABLE ACTIVITIES — select from these in the grid below</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {ACTIVITIES.filter(a => a !== '—').map(a => (
            <span key={a} style={{ background: 'white', border: '1px solid var(--d1-border)', borderRadius: '3px', padding: '4px 10px', fontSize: '12px', color: '#444', lineHeight: '1' }}>{a}</span>
          ))}
        </div>
      </div>

      <TimeGrid
        daysWorked={data.daysWorked || []}
        arrivalTime={data.arrivalTime}
        departureTime={data.departureTime}
        schedule={data.schedule || {}}
        onCellChange={handleCellChange}
      />

      <div className="field-group mt-24">
        <label className="field-label">Anything the grid didn't capture? Add it here.</label>
        <textarea
          className="field-textarea"
          value={data.scheduleNotes || ''}
          onChange={(e) => onChange('scheduleNotes', e.target.value)}
          placeholder="e.g. 'Every other Friday I handle payroll for about 2 hours' or 'I typically respond to member texts throughout the day...'"
          style={{ minHeight: '100px' }}
        />
      </div>
    </div>
  );
}
