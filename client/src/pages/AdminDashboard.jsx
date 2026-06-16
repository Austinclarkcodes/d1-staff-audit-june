import { useState, useEffect } from 'react';
import { FACILITIES, ROLES, SECTION5_QUESTIONS, PROFICIENCY_COLORS, PROFICIENCY_BG } from '../constants.js';

function proficiencyBadge(question, value) {
  if (!value) return null;
  const q = SECTION5_QUESTIONS.find((q) => q.key === question);
  if (!q) return null;
  const idx = q.options.indexOf(value);
  if (idx === -1) return null;
  const colors = PROFICIENCY_COLORS;
  const bgs = PROFICIENCY_BG;
  const labels = ['Needs Attention', 'Developing', 'On Track', 'Strong'];
  return (
    <span className="badge" style={{ background: bgs[idx], color: colors[idx], border: `1px solid ${colors[idx]}`, marginRight: '4px', marginBottom: '4px', display: 'inline-block' }}>
      {labels[idx]}
    </span>
  );
}

function ScheduleView({ schedule }) {
  if (!schedule || !Object.keys(schedule).length) return <p style={{ color: 'var(--d1-gray)', fontSize: '13px' }}>No schedule data entered.</p>;
  return (
    <div>
      {Object.entries(schedule).map(([day, slots]) => {
        const entries = Object.entries(slots).filter(([, v]) => v && v !== '—');
        if (!entries.length) return null;
        return (
          <div key={day} className="schedule-day">
            <h4>{day}</h4>
            {entries.map(([time, activity]) => (
              <div key={time} className="schedule-entry">
                <span className="time">{time}</span>
                <span>{activity}</span>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

function SubmissionDetail({ submission, onClose }) {
  const fd = submission.form_data || {};
  return (
    <div className="detail-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="detail-modal">
        <div className="detail-modal-header">
          <h2>{fd.fullName || 'Submission'}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="detail-modal-body">
          <div className="detail-section">
            <h3>Section 1 — Info</h3>
            {[['Location', fd.facility], ['Role', fd.role], ['Employment', fd.employmentType], ['Time in Role', fd.timeInRole], ['Email', fd.email || '—'], ['Submitted', new Date(submission.submitted_at).toLocaleString()]].map(([k, v]) => (
              <div key={k} className="detail-row"><span className="detail-key">{k}</span><span className="detail-val">{v}</span></div>
            ))}
          </div>

          <div className="detail-section">
            <h3>Section 2 — Work Week</h3>
            {[['Days Worked', (fd.daysWorked || []).join(', ')], ['Arrival', fd.arrivalTime], ['Departure', fd.departureTime], ['Hours/Week', fd.hoursPerWeek]].map(([k, v]) => (
              <div key={k} className="detail-row"><span className="detail-key">{k}</span><span className="detail-val">{v || '—'}</span></div>
            ))}
          </div>

          <div className="detail-section">
            <h3>Section 3 — Weekly Schedule</h3>
            <ScheduleView schedule={fd.schedule} />
            {fd.scheduleNotes && (
              <div style={{ marginTop: '12px', padding: '10px 14px', background: '#f8f8f8', borderRadius: '4px', fontSize: '13px', color: '#555', lineHeight: '1.6' }}>
                <strong>Additional notes:</strong> {fd.scheduleNotes}
              </div>
            )}
          </div>

          <div className="detail-section">
            <h3>Section 4 — Responsibilities</h3>
            <div className="detail-row"><span className="detail-key">Main Responsibilities</span><span className="detail-val" style={{ fontSize: '13px', lineHeight: '1.8' }}>{(fd.mainResponsibilities || []).join(' · ') || '—'}</span></div>
            {fd.unknownTimeSpend && <div style={{ marginTop: '12px', padding: '12px 14px', background: '#f8f8f8', borderRadius: '4px', fontSize: '13px', lineHeight: '1.6' }}><strong>Unknown time:</strong> {fd.unknownTimeSpend}</div>}
            {fd.slowdowns && <div style={{ marginTop: '8px', padding: '12px 14px', background: '#f8f8f8', borderRadius: '4px', fontSize: '13px', lineHeight: '1.6' }}><strong>Slowdowns:</strong> {fd.slowdowns}</div>}
          </div>

          <div className="detail-section">
            <h3>Section 5 — Training &amp; Onboarding</h3>
            {SECTION5_QUESTIONS.map((q) => {
              const val = fd[q.key];
              const idx = val ? q.options.indexOf(val) : -1;
              return (
                <div key={q.key} style={{ marginBottom: '14px', padding: '12px 14px', background: idx >= 0 ? PROFICIENCY_BG[idx] : '#f8f8f8', borderRadius: '4px', borderLeft: `3px solid ${idx >= 0 ? PROFICIENCY_COLORS[idx] : '#eee'}` }}>
                  <div style={{ fontSize: '12px', color: 'var(--d1-gray)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: 'var(--font-header)' }}>{q.question}</div>
                  <div style={{ fontSize: '14px', color: 'var(--d1-black)', fontWeight: '500' }}>{val || '—'}</div>
                </div>
              );
            })}
            {fd.performanceSuggestion && <div style={{ padding: '12px 14px', background: '#f8f8f8', borderRadius: '4px', fontSize: '13px', lineHeight: '1.6' }}><strong>Performance suggestion:</strong> {fd.performanceSuggestion}</div>}
          </div>

          {fd.anythingElse && (
            <div className="detail-section">
              <h3>Section 6 — Open Field</h3>
              <p style={{ fontSize: '14px', lineHeight: '1.7', color: '#333' }}>{fd.anythingElse}</p>
            </div>
          )}

          {submission.staff_entries?.length > 0 && (
            <div className="detail-section">
              <h3>Section 7 — Staff ({submission.staff_entries.length} member{submission.staff_entries.length !== 1 ? 's' : ''})</h3>
              {submission.staff_entries.map((entry, i) => {
                const sd = entry.staff_data || {};
                return (
                  <div key={i} className="staff-card">
                    <h4>{sd.name || `Staff Member ${i + 1}`} {sd.role ? `— ${sd.role}` : ''}</h4>
                    {[['Days', (sd.daysWorked || []).join(', ')], ['Hours', sd.approximateHours], ['Knows Responsibilities', sd.knowsResponsibilities], ['Hitting Targets', sd.hittingTargets]].map(([k, v]) => (
                      v ? <div key={k} className="detail-row" style={{ fontSize: '13px' }}><span className="detail-key" style={{ minWidth: '160px' }}>{k}</span><span className="detail-val">{v}</span></div> : null
                    ))}
                    {sd.dayToDay && <div style={{ marginTop: '10px', padding: '10px 12px', background: '#f8f8f8', borderRadius: '4px', fontSize: '13px', lineHeight: '1.6' }}><strong>Day to day:</strong> {sd.dayToDay}</div>}
                    {sd.notes && <div style={{ marginTop: '8px', padding: '10px 12px', background: '#f8f8f8', borderRadius: '4px', fontSize: '13px', lineHeight: '1.6' }}><strong>Notes:</strong> {sd.notes}</div>}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  // TODO: Add password protection before public deployment
  const [submissions, setSubmissions] = useState([]);
  const [stats, setStats] = useState({ total: 0, gmCount: 0, staffCount: 0, locations: 0 });
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [filters, setFilters] = useState({ location: '', formType: '', role: '' });

  useEffect(() => {
    Promise.all([
      fetch('/api/submissions').then((r) => r.json()),
      fetch('/api/submissions/stats').then((r) => r.json())
    ]).then(([subs, st]) => {
      setSubmissions(subs);
      setStats(st);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.location) params.set('location', filters.location);
    if (filters.formType) params.set('formType', filters.formType);
    if (filters.role) params.set('role', filters.role);
    fetch(`/api/submissions?${params}`).then((r) => r.json()).then(setSubmissions).catch(console.error);
  }, [filters]);

  const handleRowClick = async (id) => {
    try {
      const res = await fetch(`/api/submissions/${id}`);
      const data = await res.json();
      setSelected(data);
    } catch { alert('Failed to load submission details'); }
  };

  const handleExport = () => { window.location.href = '/api/submissions/export/csv'; };

  const setFilter = (key, val) => setFilters((f) => ({ ...f, [key]: val }));

  return (
    <div className="page-wrap">
      <div className="admin-header">
        <div>
          <h1>D1 TRAINING — AUDIT DASHBOARD</h1>
          <div style={{ color: '#888B8D', fontSize: '11px', letterSpacing: '1px', marginTop: '4px' }}>Internal Use Only · {/* TODO: Add auth */}No Authentication Yet</div>
        </div>
        <button className="btn btn-primary" onClick={handleExport} style={{ fontSize: '12px', padding: '10px 20px' }}>Export CSV</button>
      </div>

      <div className="admin-page">
        <div className="stats-grid">
          {[
            { num: stats.total, label: 'Total Submissions' },
            { num: stats.gmCount, label: 'GM Submissions' },
            { num: stats.staffCount, label: 'Staff Submissions' },
            { num: `${stats.locations}/8`, label: 'Locations Covered' },
          ].map((s) => (
            <div key={s.label} className="stat-card">
              <div className="stat-num">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="filter-bar">
          <div className="field-group">
            <label>Location</label>
            <select className="field-select" value={filters.location} onChange={(e) => setFilter('location', e.target.value)} style={{ fontSize: '13px' }}>
              <option value="">All Locations</option>
              {FACILITIES.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          <div className="field-group">
            <label>Form Type</label>
            <select className="field-select" value={filters.formType} onChange={(e) => setFilter('formType', e.target.value)} style={{ fontSize: '13px' }}>
              <option value="">All Types</option>
              <option value="gm">GM Submission</option>
              <option value="staff">Staff Submission</option>
            </select>
          </div>
          <div className="field-group">
            <label>Role</label>
            <select className="field-select" value={filters.role} onChange={(e) => setFilter('role', e.target.value)} style={{ fontSize: '13px' }}>
              <option value="">All Roles</option>
              {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div className="field-group" style={{ flex: 'none' }}>
            <label>&nbsp;</label>
            <button className="btn btn-secondary" style={{ padding: '9px 18px', fontSize: '12px' }} onClick={() => setFilters({ location: '', formType: '', role: '' })}>Clear</button>
          </div>
        </div>

        {loading ? (
          <div className="loading-wrap"><div className="spinner" /></div>
        ) : submissions.length === 0 ? (
          <div className="empty-state">
            <h3>No Submissions Yet</h3>
            <p>Submissions will appear here once staff complete the audit forms.</p>
          </div>
        ) : (
          <div className="submissions-table-wrap">
            <table className="submissions-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Role</th>
                  <th>Type</th>
                  <th>Submitted</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((s) => (
                  <tr key={s.id} onClick={() => handleRowClick(s.id)}>
                    <td style={{ color: 'var(--d1-gray)', fontSize: '12px' }}>{s.id}</td>
                    <td style={{ fontWeight: '600' }}>{s.submitter_name}</td>
                    <td style={{ fontSize: '13px' }}>{s.location}</td>
                    <td style={{ fontSize: '13px' }}>{s.role}</td>
                    <td><span className={`badge ${s.form_type === 'gm' ? 'badge-gm' : 'badge-staff'}`}>{s.form_type === 'gm' ? 'GM' : 'STAFF'}</span></td>
                    <td style={{ fontSize: '12px', color: 'var(--d1-gray)' }}>{new Date(s.submitted_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selected && <SubmissionDetail submission={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
