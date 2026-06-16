require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const { initDb } = require('./db');
const submissionsRouter = require('./routes/submissions');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? false : ['http://localhost:5173', 'http://localhost:3001']
}));
app.use(express.json({ limit: '10mb' }));

initDb();

app.get('/api/health', (req, res) => res.json({ status: 'ok', ts: new Date().toISOString() }));
app.use('/api', submissionsRouter);

const clientDist = path.join(__dirname, 'client', 'dist');
app.use(express.static(clientDist));
app.get('*', (req, res) => {
  const idx = path.join(clientDist, 'index.html');
  const fs = require('fs');
  if (fs.existsSync(idx)) {
    res.sendFile(idx);
  } else {
    res.status(503).send('Client not built. Run: npm run build');
  }
});

app.listen(PORT, () => console.log(`D1 Staff Audit running on port ${PORT}`));
