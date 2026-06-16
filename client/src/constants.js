// ─── Update these 8 facility names to match your locations ───────────────────
export const FACILITIES = [
  'D1 Training — Bloomingdale',
  'D1 Training — Chattanooga',
  'D1 Training — Mission Viejo',
  'D1 Training — Torrance',
  'D1 Training — Frisco',
  'D1 Training — Firewheel',
  'D1 Training — Hulen',
  'D1 Training — Arlington',
];

export const ROLES = [
  'General Manager',
  'Assistant GM',
  'Head Coach',
  'Coach',
  'Recruiter',
  'Membership Coordinator',
  'Other',
];

export const TIME_IN_ROLE = [
  'Less than 3 months',
  '3–6 months',
  '6–12 months',
  '1–2 years',
  '2+ years',
];

export const HOURS_OPTIONS = [
  'Under 20',
  '20–29',
  '30–39',
  '40',
  '40+',
];

export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const ACTIVITIES = [
  '—',
  'Open/Close Facility',
  'Lead Follow-Up / Outbound Calls',
  'Inbound Calls / Walk-Ins',
  'Tours / Membership Sales',
  'CRM / Data Entry',
  'Group Class — Coaching',
  '1-on-1 Training',
  'Small Group Training',
  'Youth / Camps',
  'Staff Meeting',
  '1-on-1 Meeting (with manager)',
  'Team Huddle',
  'Admin / Reporting',
  'Social Media / Marketing',
  'Lunch / Break',
  'Training / Development',
  'Other',
];

function timeToMinutes(t) {
  const m = t.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!m) return 0;
  let h = parseInt(m[1]);
  const min = parseInt(m[2]);
  const p = m[3].toUpperCase();
  if (p === 'PM' && h !== 12) h += 12;
  if (p === 'AM' && h === 12) h = 0;
  return h * 60 + min;
}

function minutesToTime(mins) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const p = h >= 12 ? 'PM' : 'AM';
  const dh = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${dh}:${m.toString().padStart(2, '0')} ${p}`;
}

export function generateArrivalTimes() {
  const times = [];
  for (let m = 5 * 60; m <= 10 * 60; m += 30) times.push(minutesToTime(m));
  return times;
}

export function generateDepartureTimes() {
  const times = [];
  for (let m = 11 * 60; m <= 22 * 60; m += 30) times.push(minutesToTime(m));
  return times;
}

export function generateTimeSlots(arrival, departure) {
  if (!arrival || !departure) return [];
  const start = timeToMinutes(arrival);
  const end = timeToMinutes(departure);
  const slots = [];
  for (let m = start; m < end; m += 15) slots.push(minutesToTime(m));
  return slots;
}

export const SECTION5_QUESTIONS = [
  {
    key: 'trainingQuality',
    question: 'How well were you trained when you started this role?',
    options: [
      'I never received formal training',
      'I received some training but it was incomplete',
      'I was trained adequately',
      'I was trained thoroughly and felt prepared',
    ],
  },
  {
    key: 'dailyClarity',
    question: 'How clear are you on your daily responsibilities?',
    options: [
      "I'm not sure what I'm supposed to be doing",
      'I have a general idea but make a lot of it up',
      "I mostly know what's expected of me",
      'I know exactly what I\'m doing hour by hour',
    ],
  },
  {
    key: 'scriptsSops',
    question: 'Do you have scripts, SOPs, or written guides for your role?',
    options: [
      "No — I've never seen anything like that",
      "I've seen some but don't use them regularly",
      'Yes — I reference them sometimes',
      'Yes — I use them consistently and they\'re helpful',
    ],
  },
  {
    key: 'oneOnOneMeetings',
    question: 'Do you have regular 1-on-1 meetings with your manager?',
    options: [
      'Never',
      'Rarely (a few times total)',
      'Sometimes (monthly-ish)',
      'Yes — weekly or bi-weekly consistently',
    ],
  },
  {
    key: 'staffMeetings',
    question: 'Do you attend regular staff meetings?',
    options: [
      'No staff meetings happen at my location',
      "They happen but I don't always attend",
      'I attend most of them',
      'Yes — every time, they\'re consistent and useful',
    ],
  },
  {
    key: 'leadershipSupport',
    question: 'How supported do you feel by D1 leadership?',
    options: [
      "I don't feel supported",
      'Somewhat supported',
      'Mostly supported',
      'Very supported — I know exactly who to go to',
    ],
  },
  {
    key: 'jobConfidence',
    question: 'Overall, how confident are you in your ability to do your job well?',
    options: [
      'Not confident — I need more help',
      'Somewhat confident',
      'Mostly confident',
      'Very confident — I know what I\'m doing',
    ],
  },
];

export const PROFICIENCY_COLORS = ['#C8102E', '#E07B00', '#E8B400', '#2E7D32'];
export const PROFICIENCY_BG = ['#fde8ec', '#fff3e0', '#fffde7', '#e8f5e9'];

export const INITIAL_FORM_DATA = {
  fullName: '',
  email: '',
  facility: '',
  role: '',
  employmentType: '',
  timeInRole: '',
  daysWorked: [],
  arrivalTime: '',
  departureTime: '',
  hoursPerWeek: '',
  schedule: {},
  scheduleNotes: '',
  mainResponsibilities: [],
  unknownTimeSpend: '',
  slowdowns: '',
  trainingQuality: '',
  dailyClarity: '',
  scriptsSops: '',
  oneOnOneMeetings: '',
  staffMeetings: '',
  leadershipSupport: '',
  jobConfidence: '',
  performanceSuggestion: '',
  anythingElse: '',
  staffMembers: [],
};
