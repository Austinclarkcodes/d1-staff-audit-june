import { memo, useCallback } from 'react';
import { ACTIVITIES, generateTimeSlots, DAYS } from '../constants.js';

const ActivityCell = memo(function ActivityCell({ day, slot, value, onChange }) {
  const handleChange = useCallback(
    (e) => onChange(day, slot, e.target.value),
    [day, slot, onChange]
  );
  const hasVal = value && value !== '—';
  return (
    <td className={hasVal ? 'has-value' : ''}>
      <select className="cell-select" value={value || '—'} onChange={handleChange}>
        {ACTIVITIES.map((a) => (
          <option key={a} value={a}>{a}</option>
        ))}
      </select>
    </td>
  );
});

export default function TimeGrid({ daysWorked, arrivalTime, departureTime, schedule, onCellChange }) {
  const activeDays = DAYS.filter((d) => daysWorked.includes(d));
  const slots = generateTimeSlots(arrivalTime, departureTime);

  if (!activeDays.length || !slots.length) {
    return (
      <div style={{ padding: '20px', color: 'var(--d1-gray)', fontSize: '14px', background: '#f8f8f8', borderRadius: '4px', textAlign: 'center' }}>
        Select your work days, arrival time, and departure time in Section 2 to generate the schedule grid.
      </div>
    );
  }

  return (
    <div className="grid-scroll-wrap">
      <table className="time-grid">
        <thead>
          <tr>
            <th className="time-col">Time</th>
            {activeDays.map((d) => <th key={d}>{d}</th>)}
          </tr>
        </thead>
        <tbody>
          {slots.map((slot) => (
            <tr key={slot}>
              <td className="time-label">{slot}</td>
              {activeDays.map((day) => (
                <ActivityCell
                  key={day}
                  day={day}
                  slot={slot}
                  value={schedule?.[day]?.[slot] || '—'}
                  onChange={onCellChange}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
