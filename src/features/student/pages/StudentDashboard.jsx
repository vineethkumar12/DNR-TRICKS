import { useEffect, useState } from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout.jsx';
import ExamCard from '../components/ExamCard.jsx';
import { api } from '../../../services/api.js';

export default function StudentDashboard() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getExams().then((data) => {
      setExams(data);
      setLoading(false);
    });
  }, []);

  return (
    <DashboardLayout title="Exam Dashboard">
      <h1>Your exams</h1>
      <p style={{ color: 'var(--text-muted)' }}>Live tests, upcoming schedules, and past results — all in one place.</p>

      <div className="ledger-rule" />

      {loading ? (
        <p style={{ color: 'var(--text-muted)' }}>Loading your exams…</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {exams.map((exam) => (
            <ExamCard key={exam.id} exam={exam} />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
