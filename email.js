require('dotenv').config();
const { Resend } = require('resend');

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const NOTIFY_EMAILS = [process.env.NOTIFY_EMAIL_1, process.env.NOTIFY_EMAIL_2, process.env.NOTIFY_EMAIL_3].filter(Boolean);
const FROM_EMAIL = process.env.FROM_EMAIL || 'D1 Staff Audit <noreply@d1training.com>';

const brandedEmailWrapper = (content) => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:24px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr>
          <td style="background:#101820;padding:24px 32px;text-align:left;">
            <span style="color:white;font-family:Arial Black,Impact,sans-serif;font-size:22px;font-weight:900;letter-spacing:2px;">D1 TRAINING</span>
            <span style="color:#888B8D;font-size:13px;margin-left:16px;font-family:Arial,sans-serif;">Staff Time &amp; Energy Audit</span>
          </td>
        </tr>
        <tr><td style="background:white;padding:32px;">${content}</td></tr>
        <tr>
          <td style="background:#C8102E;padding:12px 32px;text-align:center;">
            <span style="color:white;font-family:Arial Black,sans-serif;font-size:11px;letter-spacing:2px;">TRAIN D1FFERENT</span>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

async function sendConfirmationEmail(submitterEmail, submitterName, location, formType) {
  if (!submitterEmail || !resend) return;
  const label = formType === 'gm' ? 'GM' : 'Staff';
  const content = `
    <h2 style="color:#101820;font-family:Arial Black,sans-serif;margin-top:0;">Thanks, ${submitterName}!</h2>
    <p style="color:#333;line-height:1.7;font-size:15px;">
      Your <strong>${label} audit submission</strong> for <strong>${location}</strong> has been received.
    </p>
    <p style="color:#333;line-height:1.7;font-size:15px;">
      We'll use this information to understand what's working, where we're falling short on training, and how we can build better systems so everyone wins.
    </p>
    <p style="color:#333;line-height:1.7;font-size:15px;">
      Thank you for taking the time — <strong>this matters.</strong>
    </p>
    <div style="margin-top:24px;padding-top:20px;border-top:2px solid #C8102E;">
      <p style="color:#888B8D;font-size:12px;margin:0;">D1 Training · <em>The Place for The Athlete®</em></p>
    </div>`;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: submitterEmail,
      subject: `D1 Training — Your Audit Submission Has Been Received`,
      html: brandedEmailWrapper(content)
    });
  } catch (err) {
    console.error('Confirmation email error:', err.message);
  }
}

async function sendNotificationEmail(submissionId, submitterName, location, role, formType, submittedAt) {
  if (!NOTIFY_EMAILS.length || !resend) return;
  const baseUrl = process.env.APP_URL || 'http://localhost:3001';
  const label = formType === 'gm' ? 'GM Submission' : 'Staff Submission';

  const content = `
    <h2 style="color:#101820;font-family:Arial Black,sans-serif;margin-top:0;">New Audit Submission</h2>
    <table style="width:100%;border-collapse:collapse;">
      <tr style="border-bottom:1px solid #eee;">
        <td style="padding:10px 0;color:#888B8D;font-size:13px;width:130px;">Submitter</td>
        <td style="padding:10px 0;font-weight:bold;font-size:15px;">${submitterName}</td>
      </tr>
      <tr style="border-bottom:1px solid #eee;">
        <td style="padding:10px 0;color:#888B8D;font-size:13px;">Location</td>
        <td style="padding:10px 0;font-size:15px;">${location}</td>
      </tr>
      <tr style="border-bottom:1px solid #eee;">
        <td style="padding:10px 0;color:#888B8D;font-size:13px;">Role</td>
        <td style="padding:10px 0;font-size:15px;">${role}</td>
      </tr>
      <tr style="border-bottom:1px solid #eee;">
        <td style="padding:10px 0;color:#888B8D;font-size:13px;">Form Type</td>
        <td style="padding:10px 0;font-size:15px;">
          <span style="background:${formType === 'gm' ? '#C8102E' : '#101820'};color:white;padding:3px 10px;border-radius:3px;font-size:12px;font-family:Arial Black,sans-serif;letter-spacing:1px;">${label}</span>
        </td>
      </tr>
      <tr>
        <td style="padding:10px 0;color:#888B8D;font-size:13px;">Submitted</td>
        <td style="padding:10px 0;font-size:15px;">${new Date(submittedAt).toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</td>
      </tr>
    </table>
    <div style="margin-top:28px;">
      <a href="${baseUrl}/admin" style="background:#C8102E;color:white;padding:14px 28px;text-decoration:none;font-family:Arial Black,sans-serif;font-size:13px;letter-spacing:1px;display:inline-block;">
        VIEW IN DASHBOARD →
      </a>
    </div>`;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAILS,
      subject: `New D1 Audit — ${submitterName} · ${location} · ${label}`,
      html: brandedEmailWrapper(content)
    });
  } catch (err) {
    console.error('Notification email error:', err.message);
  }
}

module.exports = { sendConfirmationEmail, sendNotificationEmail };
