require('dotenv').config();
const { DatabaseSync } = require('node:sqlite');
const path = require('path');
const fs = require('fs');

const DB_PATH = process.env.DATABASE_PATH || path.join(__dirname, 'data', 'db.sqlite');
const dbDir = path.dirname(DB_PATH);
if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });

const db = new DatabaseSync(DB_PATH);

function initDb() {
  db.exec(`PRAGMA journal_mode = WAL`);

  db.exec(`
    CREATE TABLE IF NOT EXISTS submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      form_type TEXT NOT NULL,
      submitter_name TEXT NOT NULL,
      submitter_email TEXT,
      location TEXT NOT NULL,
      role TEXT NOT NULL,
      employment_type TEXT,
      submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      form_data TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS staff_entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      submission_id INTEGER NOT NULL,
      staff_name TEXT,
      staff_role TEXT,
      staff_data TEXT NOT NULL,
      FOREIGN KEY (submission_id) REFERENCES submissions(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_submissions_location ON submissions(location);
    CREATE INDEX IF NOT EXISTS idx_submissions_form_type ON submissions(form_type);
    CREATE INDEX IF NOT EXISTS idx_submissions_submitted_at ON submissions(submitted_at);
  `);
}

function createSubmission({ formType, submitterName, submitterEmail, location, role, employmentType, formData, staffMembers }) {
  const stmt = db.prepare(`
    INSERT INTO submissions (form_type, submitter_name, submitter_email, location, role, employment_type, form_data)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(formType, submitterName, submitterEmail || null, location, role, employmentType || null, JSON.stringify(formData));
  const submissionId = result.lastInsertRowid;

  if (staffMembers && staffMembers.length > 0) {
    const staffStmt = db.prepare(`
      INSERT INTO staff_entries (submission_id, staff_name, staff_role, staff_data)
      VALUES (?, ?, ?, ?)
    `);
    for (const member of staffMembers) {
      if (member.name) {
        staffStmt.run(submissionId, member.name || null, member.role || null, JSON.stringify(member));
      }
    }
  }

  return submissionId;
}

function getAllSubmissions(filters = {}) {
  let query = `SELECT id, form_type, submitter_name, submitter_email, location, role, employment_type, submitted_at FROM submissions WHERE 1=1`;
  const params = [];

  if (filters.location) { query += ` AND location = ?`; params.push(filters.location); }
  if (filters.formType) { query += ` AND form_type = ?`; params.push(filters.formType); }
  if (filters.role) { query += ` AND role = ?`; params.push(filters.role); }
  if (filters.dateFrom) { query += ` AND submitted_at >= ?`; params.push(filters.dateFrom); }
  if (filters.dateTo) { query += ` AND submitted_at <= ?`; params.push(filters.dateTo); }

  query += ` ORDER BY submitted_at DESC`;
  return db.prepare(query).all(...params);
}

function getSubmissionById(id) {
  const submission = db.prepare(`SELECT * FROM submissions WHERE id = ?`).get(id);
  if (!submission) return null;
  submission.form_data = JSON.parse(submission.form_data);
  const staffEntries = db.prepare(`SELECT * FROM staff_entries WHERE submission_id = ?`).all(id);
  submission.staff_entries = staffEntries.map(e => ({ ...e, staff_data: JSON.parse(e.staff_data) }));
  return submission;
}

function getAllSubmissionsForExport() {
  return db.prepare(`SELECT * FROM submissions ORDER BY submitted_at DESC`).all().map(s => ({
    ...s,
    form_data: JSON.parse(s.form_data)
  }));
}

function getStats() {
  const total = db.prepare(`SELECT COUNT(*) as count FROM submissions`).get().count;
  const gmCount = db.prepare(`SELECT COUNT(*) as count FROM submissions WHERE form_type = 'gm'`).get().count;
  const staffCount = db.prepare(`SELECT COUNT(*) as count FROM submissions WHERE form_type = 'staff'`).get().count;
  const locations = db.prepare(`SELECT COUNT(DISTINCT location) as count FROM submissions`).get().count;
  return { total, gmCount, staffCount, locations };
}

module.exports = { initDb, createSubmission, getAllSubmissions, getSubmissionById, getAllSubmissionsForExport, getStats };
