import { ROLES, DAYS } from '../constants.js';

const KNOWS_RESP_OPTIONS = ['Definitely yes', 'I think so', 'Not sure', 'Honestly, no'];
const HITTING_TARGETS_OPTIONS = ['Yes consistently', 'Sometimes', 'Rarely', "I'm not tracking this"];

function StaffMemberCard({ member, index, onChange, onRemove }) {
  const update = (field, value) => onChange(index, field, value);

  const toggleDay = (day) => {
    const current = member.daysWorked || [];
    update('daysWorked', current.includes(day) ? current.filter((d) => d !== day) : [...current, day]);
  };

  return (
    <div className="staff-member-card">
      <div className="member-num">Staff Member {index + 1}</div>
      <button className="btn-remove" type="button" onClick={() => onRemove(index)} title="Remove">×</button>

      <div className="field-row">
        <div className="field-group">
          <label className="field-label">Name</label>
          <input className="field-input" type="text" value={member.name || ''} onChange={(e) => update('name', e.target.value)} placeholder="Full name" />
        </div>
        <div className="field-group">
          <label className="field-label">Role</label>
          <select className="field-select" value={member.role || ''} onChange={(e) => update('role', e.target.value)}>
            <option value="">Select role...</option>
            {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
      </div>

      <div className="field-row">
        <div className="field-group">
          <label className="field-label">Days Worked</label>
          <div className="checkbox-group">
            {DAYS.map((day) => (
              <label key={day} className="checkbox-item" style={{ border: `1.5px solid ${(member.daysWorked || []).includes(day) ? 'var(--d1-red)' : 'var(--d1-border)'}`, borderRadius: '4px', padding: '6px 12px', background: (member.daysWorked || []).includes(day) ? '#fff5f6' : 'white' }}>
                <input type="checkbox" checked={(member.daysWorked || []).includes(day)} onChange={() => toggleDay(day)} />
                <span style={{ fontWeight: '600', fontSize: '13px' }}>{day}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="field-group">
          <label className="field-label">Approximate Hours</label>
          <input className="field-input" type="text" value={member.approximateHours || ''} onChange={(e) => update('approximateHours', e.target.value)} placeholder="e.g. 8am–5pm" />
        </div>
      </div>

      <div className="field-group">
        <label className="field-label">What does this person do day to day?</label>
        <textarea className="field-textarea" value={member.dayToDay || ''} onChange={(e) => update('dayToDay', e.target.value)} placeholder="Describe their typical day as you understand it..." style={{ minHeight: '80px' }} />
      </div>

      <div className="field-row">
        <div className="field-group">
          <label className="field-label">Does this person know what they're supposed to be doing?</label>
          <div className="radio-group">
            {KNOWS_RESP_OPTIONS.map((opt) => (
              <label key={opt} className={`radio-btn ${member.knowsResponsibilities === opt ? 'selected' : ''}`} style={{ padding: '8px 12px' }}>
                <input type="radio" checked={member.knowsResponsibilities === opt} onChange={() => update('knowsResponsibilities', opt)} />
                <span style={{ fontSize: '13px' }}>{opt}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="field-group">
          <label className="field-label">Are they hitting their targets?</label>
          <div className="radio-group">
            {HITTING_TARGETS_OPTIONS.map((opt) => (
              <label key={opt} className={`radio-btn ${member.hittingTargets === opt ? 'selected' : ''}`} style={{ padding: '8px 12px' }}>
                <input type="radio" checked={member.hittingTargets === opt} onChange={() => update('hittingTargets', opt)} />
                <span style={{ fontSize: '13px' }}>{opt}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="field-group">
        <label className="field-label">Notes on this person <span style={{ color: 'var(--d1-gray)', fontWeight: 400 }}>(Optional)</span></label>
        <textarea className="field-textarea" value={member.notes || ''} onChange={(e) => update('notes', e.target.value)} placeholder="Anything else relevant — strengths, gaps, concerns..." style={{ minHeight: '60px' }} />
      </div>
    </div>
  );
}

const BLANK_MEMBER = { name: '', role: '', daysWorked: [], approximateHours: '', dayToDay: '', knowsResponsibilities: '', hittingTargets: '', notes: '' };

export default function Section7({ data, onChange }) {
  const members = data.staffMembers || [];

  const handleChange = (index, field, value) => {
    const updated = members.map((m, i) => i === index ? { ...m, [field]: value } : m);
    onChange('staffMembers', updated);
  };

  const addMember = () => {
    if (members.length < 8) onChange('staffMembers', [...members, { ...BLANK_MEMBER }]);
  };

  const removeMember = (index) => {
    onChange('staffMembers', members.filter((_, i) => i !== index));
  };

  return (
    <div className="section-card">
      <div className="section-title">Section 7 — Your Staff</div>
      <div className="section-subtitle">
        Now tell us about your team. If you don't know the answer, say so — that's important information too.
      </div>
      <hr className="section-divider" />

      <div style={{ background: '#f8f8f8', border: '1px solid var(--d1-border)', borderRadius: '4px', padding: '16px 18px', marginBottom: '24px', fontSize: '13px', lineHeight: '1.7', color: '#555' }}>
        We're asking you to fill this out for your staff because <strong>if the GM doesn't know what their team is doing, that's something we need to fix together.</strong> Do your best — honest, incomplete answers are better than polished guesses.
      </div>

      {members.length === 0 && (
        <p style={{ color: 'var(--d1-gray)', fontSize: '14px', marginBottom: '16px' }}>No staff members added yet. Click below to add your team.</p>
      )}

      {members.map((member, i) => (
        <StaffMemberCard key={i} member={member} index={i} onChange={handleChange} onRemove={removeMember} />
      ))}

      {members.length < 8 && (
        <button type="button" className="btn-add" onClick={addMember}>
          + Add Staff Member {members.length + 1}
        </button>
      )}
    </div>
  );
}
