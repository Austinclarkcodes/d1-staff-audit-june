const express = require('express');
const router = express.Router();
const { createSubmission, getAllSubmissions, getSubmissionById, getAllSubmissionsForExport, getStats } = require('../db');
const { sendConfirmationEmail, sendNotificationEmail } = require('../email');

router.post('/submit/gm', async (req, res) => {
  try {
    const { formData } = req.body;
    if (!formData || !formData.fullName || !formData.facility || !formData.role) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const submissionId = createSubmission({
      formType: 'gm',
      submitterName: formData.fullName,
      submitterEmail: formData.email,
      location: formData.facility,
      role: formData.role,
      employmentType: formData.employmentType,
      formData,
      staffMembers: formData.staffMembers || []
    });
    const now = new Date().toISOString();
    sendConfirmationEmail(formData.email, formData.fullName, formData.facility, 'gm');
    sendNotificationEmail(submissionId, formData.fullName, formData.facility, formData.role, 'gm', now);
    res.json({ success: true, submissionId });
  } catch (err) {
    console.error('GM submit error:', err);
    res.status(500).json({ error: 'Failed to save submission. Please try again.' });
  }
});

router.post('/submit/staff', async (req, res) => {
  try {
    const { formData } = req.body;
    if (!formData || !formData.fullName || !formData.facility || !formData.role) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const submissionId = createSubmission({
      formType: 'staff',
      submitterName: formData.fullName,
      submitterEmail: formData.email,
      location: formData.facility,
      role: formData.role,
      employmentType: formData.employmentType,
      formData,
      staffMembers: []
    });
    const now = new Date().toISOString();
    sendConfirmationEmail(formData.email, formData.fullName, formData.facility, 'staff');
    sendNotificationEmail(submissionId, formData.fullName, formData.facility, formData.role, 'staff', now);
    res.json({ success: true, submissionId });
  } catch (err) {
    console.error('Staff submit error:', err);
    res.status(500).json({ error: 'Failed to save submission. Please try again.' });
  }
});

router.get('/submissions', (req, res) => {
  try {
    const { location, formType, role, dateFrom, dateTo } = req.query;
    const submissions = getAllSubmissions({ location, formType, role, dateFrom, dateTo });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

router.get('/submissions/export/csv', (req, res) => {
  try {
    const submissions = getAllSubmissionsForExport();
    const headers = ['ID', 'Form Type', 'Name', 'Email', 'Location', 'Role', 'Employment Type', 'Submitted At',
      'Days Worked', 'Hours Per Week', 'Training Quality', 'Daily Clarity', 'Scripts/SOPs', '1-on-1 Meetings', 'Staff Meetings', 'Leadership Support', 'Job Confidence'];

    const rows = submissions.map(s => {
      const fd = s.form_data || {};
      return [
        s.id, s.form_type, s.submitter_name, s.submitter_email || '',
        s.location, s.role, s.employment_type || '', s.submitted_at,
        (fd.daysWorked || []).join('; '), fd.hoursPerWeek || '',
        fd.trainingQuality || '', fd.dailyClarity || '', fd.scriptsSops || '',
        fd.oneOnOneMeetings || '', fd.staffMeetings || '', fd.leadershipSupport || '', fd.jobConfidence || ''
      ];
    });

    const csv = [headers, ...rows]
      .map(row => row.map(c => `"${String(c ?? '').replace(/"/g, '""')}"`).join(','))
      .join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="d1-audit-submissions.csv"');
    res.send(csv);
  } catch (err) {
    res.status(500).json({ error: 'Export failed' });
  }
});

router.get('/submissions/stats', (req, res) => {
  try {
    res.json(getStats());
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

router.get('/submissions/:id', (req, res) => {
  try {
    const submission = getSubmissionById(parseInt(req.params.id));
    if (!submission) return res.status(404).json({ error: 'Submission not found' });
    res.json(submission);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch submission' });
  }
});

module.exports = router;
