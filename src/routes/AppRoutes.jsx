import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

import Home from '../features/home/pages/Home.jsx';
import Login from '../features/auth/pages/Login.jsx';
import Register from '../features/auth/pages/Register.jsx';

import StudentDashboard from '../features/student/pages/StudentDashboard.jsx';
import ExamInstructions from '../features/student/pages/ExamInstructions.jsx';
import OnlineTest from '../features/student/pages/OnlineTest.jsx';
import Result from '../features/student/pages/Result.jsx';
import Analysis from '../features/student/pages/Analysis.jsx';

import AdminDashboard from '../features/admin/pages/AdminDashboard.jsx';
import CreateExam from '../features/admin/pages/CreateExam.jsx';
import ManageQuestions from '../features/admin/pages/ManageQuestions.jsx';
import Students from '../features/admin/pages/Students.jsx';
import Results from '../features/admin/pages/Results.jsx';
import Reports from '../features/admin/pages/Reports.jsx';

function Protected({ role, children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;
  if (!user) return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  if (role && user.role !== role) return <Navigate to={user.role === 'admin' ? '/admin' : '/student'} replace />;
  return children;
}

function RootGate() {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to={user.role === 'admin' ? '/admin' : '/student'} replace />;
  return <Home />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RootGate />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Student */}
      <Route path="/student" element={<Protected role="student"><StudentDashboard /></Protected>} />
      <Route path="/student/exam/:examId/instructions" element={<Protected role="student"><ExamInstructions /></Protected>} />
      <Route path="/student/exam/:examId/test" element={<Protected role="student"><OnlineTest /></Protected>} />
      <Route path="/student/exam/:examId/result" element={<Protected role="student"><Result /></Protected>} />
      <Route path="/student/exam/:examId/analysis" element={<Protected role="student"><Analysis /></Protected>} />

      {/* Admin */}
      <Route path="/admin" element={<Protected role="admin"><AdminDashboard /></Protected>} />
      <Route path="/admin/create-exam" element={<Protected role="admin"><CreateExam /></Protected>} />
      <Route path="/admin/questions" element={<Protected role="admin"><ManageQuestions /></Protected>} />
      <Route path="/admin/students" element={<Protected role="admin"><Students /></Protected>} />
      <Route path="/admin/results" element={<Protected role="admin"><Results /></Protected>} />
      <Route path="/admin/reports" element={<Protected role="admin"><Reports /></Protected>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
