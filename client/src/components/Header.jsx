export default function Header({ formType }) {
  const label = formType === 'gm' ? 'GM Submission' : formType === 'staff' ? 'Staff Submission' : 'Admin Dashboard';
  return (
    <header className="site-header">
      <div>
        <div className="site-header-logo">D1 <span>TRAINING</span></div>
        <div className="site-header-sub">Staff Time &amp; Energy Audit</div>
      </div>
      {formType && (
        <div style={{ color: '#888B8D', fontSize: '12px', fontFamily: 'var(--font-header)', letterSpacing: '1px' }}>
          {label}
        </div>
      )}
    </header>
  );
}
