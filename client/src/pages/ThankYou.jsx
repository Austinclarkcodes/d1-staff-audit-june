import { useNavigate } from 'react-router-dom';

export default function ThankYou() {
  const navigate = useNavigate();
  return (
    <div className="thankyou-page">
      <div className="thankyou-logo">D1 <span>TRAINING</span></div>
      <div className="thankyou-tagline">The Place for The Athlete®</div>
      <div className="thankyou-accent" />
      <h1 className="thankyou-title">Your Submission Has Been Received.</h1>
      <p className="thankyou-body">
        Thank you for taking the time — this matters. Your responses will help D1 leadership understand what's working, where we're falling short on training, and how we can build better systems so everyone wins.
      </p>
      <div style={{ marginTop: '48px', color: '#888B8D', fontSize: '12px', letterSpacing: '2px', fontFamily: 'var(--font-header)', textTransform: 'uppercase' }}>
        TRAIN D1FFERENT
      </div>
    </div>
  );
}
