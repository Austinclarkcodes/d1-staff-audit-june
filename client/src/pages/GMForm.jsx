import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import ProgressBar from '../components/ProgressBar.jsx';
import Section1 from '../components/Section1.jsx';
import Section2 from '../components/Section2.jsx';
import Section3 from '../components/Section3.jsx';
import Section4 from '../components/Section4.jsx';
import Section5 from '../components/Section5.jsx';
import Section6 from '../components/Section6.jsx';
import Section7 from '../components/Section7.jsx';
import { INITIAL_FORM_DATA, SECTION5_QUESTIONS } from '../constants.js';

const SECTIONS = ['Your Info', 'Work Week', 'Time Audit', 'Responsibilities', 'Training & Onboarding', 'Open Field', 'Your Staff'];
const DRAFT_KEY = 'd1-gm-draft';

function validate(section, data) {
  const errs = {};
  if (section === 0) {
    if (!data.fullName?.trim()) errs.fullName = 'Name is required';
    if (!data.facility) errs.facility = 'Please select your location';
    if (!data.role) errs.role = 'Please select your role';
    if (!data.employmentType) errs.employmentType = 'Please select employment type';
    if (!data.timeInRole) errs.timeInRole = "Please select how long you've been in this role";
  }
  if (section === 1) {
    if (!data.daysWorked?.length) errs.daysWorked = 'Select at least one day';
    if (!data.arrivalTime) errs.arrivalTime = 'Select your arrival time';
    if (!data.departureTime) errs.departureTime = 'Select your departure time';
    if (!data.hoursPerWeek) errs.hoursPerWeek = 'Select approximate hours per week';
  }
  if (section === 3) {
    if (!data.mainResponsibilities?.length) errs.mainResponsibilities = 'Select at least one responsibility';
    if (!data.unknownTimeSpend?.trim()) errs.unknownTimeSpend = 'Please answer this question';
  }
  if (section === 4) {
    SECTION5_QUESTIONS.forEach((q) => {
      if (!data[q.key]) errs[q.key] = 'Please select an answer';
    });
  }
  return errs;
}

export default function GMForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem(DRAFT_KEY);
      return saved ? { ...INITIAL_FORM_DATA, ...JSON.parse(saved) } : { ...INITIAL_FORM_DATA };
    } catch { return { ...INITIAL_FORM_DATA }; }
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    try { localStorage.setItem(DRAFT_KEY, JSON.stringify(formData)); } catch {}
  }, [formData]);

  const onChange = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => { const e = { ...prev }; delete e[field]; return e; });
  }, []);

  const handleNext = () => {
    const errs = validate(step, formData);
    if (Object.keys(errs).length) { setErrors(errs); window.scrollTo(0, 0); return; }
    setErrors({});
    setStep((s) => s + 1);
    window.scrollTo(0, 0);
  };

  const handleBack = () => { setStep((s) => s - 1); window.scrollTo(0, 0); };

  const handleSubmit = async () => {
    const errs = validate(step, formData);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitting(true);
    setSubmitError('');
    try {
      const res = await fetch('/api/submit/gm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData })
      });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || 'Submission failed'); }
      localStorage.removeItem(DRAFT_KEY);
      navigate('/thank-you');
    } catch (err) {
      setSubmitError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-wrap">
      <Header formType="gm" />
      <div style={{ background: 'var(--d1-black)', color: 'white', padding: '18px 24px', fontSize: '14px', lineHeight: '1.7' }}>
        <strong style={{ fontFamily: 'var(--font-header)', letterSpacing: '1px' }}>WHY WE'RE DOING THIS:</strong>{' '}
        We're doing this because we want to invest in you. This audit helps us understand what's working, where we're falling short on training, and how we can build better systems so everyone wins. Be honest. Be fast. There are no wrong answers.
      </div>
      <div style={{ background: 'var(--d1-red)', color: 'white', padding: '10px 24px', fontFamily: 'var(--font-header)', fontSize: '13px', letterSpacing: '2px', textAlign: 'center', fontWeight: 700 }}>
        DUE DATE TBD — TAKES 20–30 MINUTES
      </div>
      <ProgressBar current={step} total={SECTIONS.length} sections={SECTIONS} />

      <div className="form-container" style={{ paddingTop: '24px' }}>
        {step === 0 && <Section1 data={formData} onChange={onChange} errors={errors} />}
        {step === 1 && <Section2 data={formData} onChange={onChange} errors={errors} />}
        {step === 2 && <Section3 data={formData} onChange={onChange} errors={errors} />}
        {step === 3 && <Section4 data={formData} onChange={onChange} errors={errors} />}
        {step === 4 && <Section5 data={formData} onChange={onChange} errors={errors} />}
        {step === 5 && <Section6 data={formData} onChange={onChange} errors={errors} />}
        {step === 6 && <Section7 data={formData} onChange={onChange} errors={errors} />}

        {submitError && (
          <div style={{ background: '#fde8ec', border: '1px solid var(--d1-red)', borderRadius: '4px', padding: '14px 18px', color: 'var(--d1-red)', fontSize: '14px', marginBottom: '16px' }}>
            {submitError}
          </div>
        )}
      </div>

      <div className="form-nav">
        <div>
          {step > 0 && <button className="btn btn-secondary" onClick={handleBack}>← Back</button>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ color: 'var(--d1-gray)', fontSize: '12px', fontFamily: 'var(--font-header)', letterSpacing: '1px' }}>
            {step + 1} / {SECTIONS.length}
          </span>
          {step < SECTIONS.length - 1
            ? <button className="btn btn-primary" onClick={handleNext}>Next →</button>
            : <button className="btn btn-submit" onClick={handleSubmit} disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Audit'}
              </button>
          }
        </div>
      </div>
    </div>
  );
}
