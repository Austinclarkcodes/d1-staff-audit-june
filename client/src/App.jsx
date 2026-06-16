import { Routes, Route, Navigate } from 'react-router-dom';
import GMForm from './pages/GMForm.jsx';
import StaffForm from './pages/StaffForm.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import ThankYou from './pages/ThankYou.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/gm" element={<GMForm />} />
      <Route path="/staff" element={<StaffForm />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/" element={<Navigate to="/staff" replace />} />
      <Route path="*" element={<Navigate to="/staff" replace />} />
    </Routes>
  );
}
