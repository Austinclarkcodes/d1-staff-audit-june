export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--d1-black)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
      <div style={{ fontFamily: 'var(--font-header)', fontSize: '28px', fontWeight: 900, color: 'white', letterSpacing: '3px', marginBottom: '4px' }}>
        D1 <span style={{ color: 'var(--d1-red)' }}>TRAINING</span>
      </div>
      <div style={{ color: 'var(--d1-gray)', fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>Staff Time &amp; Energy Audit</div>
      <div style={{ width: '40px', height: '3px', background: 'var(--d1-red)', marginBottom: '40px' }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', width: '100%', maxWidth: '380px', marginBottom: '48px' }}>
        <a
          href="/staff"
          style={{ display: 'block', background: 'var(--d1-red)', color: 'white', textAlign: 'center', textDecoration: 'none', padding: '18px 24px', fontFamily: 'var(--font-header)', fontSize: '15px', letterSpacing: '2px', borderRadius: '3px' }}
        >
          STAFF FORM →
        </a>
        <a
          href="/gm"
          style={{ display: 'block', background: 'transparent', color: 'white', textAlign: 'center', textDecoration: 'none', padding: '17px 24px', fontFamily: 'var(--font-header)', fontSize: '15px', letterSpacing: '2px', borderRadius: '3px', border: '1.5px solid rgba(255,255,255,0.3)' }}
        >
          GM FORM →
        </a>
      </div>

      <div style={{ background: '#1a1f2a', borderRadius: '6px', padding: '20px 24px', maxWidth: '380px', width: '100%', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ fontFamily: 'var(--font-header)', fontSize: '11px', letterSpacing: '1.5px', color: 'var(--d1-gray)', marginBottom: '10px' }}>ADMIN DASHBOARD</div>
        <p style={{ color: '#999', fontSize: '13px', lineHeight: '1.7', margin: '0 0 14px' }}>
          Access the admin dashboard at <a href="/admin" style={{ color: 'var(--d1-red)', textDecoration: 'none' }}>/admin</a>.
        </p>
        <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '4px', padding: '12px 14px', fontSize: '13px', lineHeight: '1.9' }}>
          <div style={{ color: '#888' }}>Username: <span style={{ color: 'white', fontFamily: 'monospace' }}>firstnamelastname</span></div>
          <div style={{ color: '#888' }}>Password: <span style={{ color: 'white', fontFamily: 'monospace' }}>firstnamelastname</span></div>
          <div style={{ marginTop: '6px', color: '#555', fontSize: '11px' }}>All lowercase, no spaces — e.g., <span style={{ color: '#777', fontFamily: 'monospace' }}>austinclark</span></div>
        </div>
      </div>
    </div>
  );
}
