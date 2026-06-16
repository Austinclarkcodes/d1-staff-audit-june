# D1 Staff Audit

Internal time and energy audit tool for D1 Training's 8 brick-and-mortar facilities.

**Forms:**
- `/gm` — GM submission (covers GM + their entire staff's schedule)
- `/staff` — Individual staff submission
- `/admin` — Admin dashboard (all submissions, filters, export)

---

## Setup

### Prerequisites
- Node.js v22+ (uses built-in `node:sqlite`)
- A [Resend](https://resend.com) account for email

### Local Development

```bash
# Install all dependencies
npm install && npm run build  # or just cd client && npm install for dev

# Copy env file and fill in values
cp .env.example .env

# Start backend (port 3001)
node server.js

# In another terminal, start frontend dev server (port 5173)
cd client && npm run dev
```

The Vite dev server proxies `/api` requests to the Express backend automatically.

### Update Facility Names

Edit [`client/src/constants.js`](client/src/constants.js) — the `FACILITIES` array at the top. Replace the 8 placeholder location names with your actual facility names.

### Update Due Date

Search for `DUE DATE TBD` in `client/src/pages/GMForm.jsx` and `client/src/pages/StaffForm.jsx` and replace with the actual deadline.

---

## Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Server port (Railway sets this automatically) |
| `DATABASE_PATH` | Path to SQLite file (default: `./data/db.sqlite`) |
| `RESEND_API_KEY` | From [resend.com](https://resend.com) |
| `FROM_EMAIL` | Sender address (must be verified in Resend) |
| `NOTIFY_EMAIL_1` | First notification recipient (e.g. Austin) |
| `NOTIFY_EMAIL_2` | Second notification recipient (e.g. Carly) |
| `APP_URL` | Public URL of the deployed app (for dashboard links in emails) |

---

## Railway Deployment

1. Push this repo to GitHub
2. In Railway: **New Project → Deploy from GitHub repo**
3. Set all environment variables from the table above
4. **Add a Volume** at mount path `/data` so SQLite persists across deploys
5. Set `DATABASE_PATH=/data/db.sqlite` in Railway env vars
6. Railway will auto-detect Node.js and run `npm install && npm run build` then `node server.js`

The `railway.toml` configures the build and start commands automatically.

---

## Admin Dashboard

Navigate to `/admin`. No authentication is currently set up.

**TODO before sharing the link externally:** Add a password check. Simplest approach:

```javascript
// In server.js, before the /admin route or as middleware:
app.use('/admin', (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || auth !== `Bearer ${process.env.ADMIN_TOKEN}`) {
    return res.status(401).send('Unauthorized');
  }
  next();
});
```

Or use [express-basic-auth](https://www.npmjs.com/package/express-basic-auth) for a simple username/password prompt.

---

## Tech Stack

- **Frontend:** React 18 + Vite + React Router v6
- **Backend:** Express + Node.js
- **Database:** SQLite via built-in `node:sqlite` (Node 22+)
- **Email:** Resend
- **Deploy:** Railway-ready
