import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../../components/layout/DashboardLayout.jsx';
import { api } from '../../../services/api.js';

export default function AdminDashboard() {
  const [summary, setSummary] = useState(null);
  const [exams, setExams] = useState([]);

  useEffect(() => {
    api.getReportSummary().then(setSummary);
    api.getExams().then(setExams);
  }, []);

  return (
    <DashboardLayout variant="admin" title="Dashboard">
      <h1>Admin dashboard</h1>
      <p style={{ color: 'var(--text-muted)' }}>An overview of exams, students, and platform activity.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, margin: '24px 0' }}>
        <StatCard label="Total exams" value={summary?.totalExams ?? '—'} />
        <StatCard label="Students" value={summary?.totalStudents ?? '—'} />
        <StatCard label="Average score" value={summary ? `${summary.avgScoreAcrossExams}%` : '—'} />
        <StatCard label="Pass rate" value={summary ? `${summary.passRate}%` : '—'} />
      </div>

      <div className="ledger-rule" />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ marginBottom: 0 }}>Recent exams</h2>
        <Link to="/admin/create-exam"><span style={{ fontSize: '0.85rem' }}>+ Create new exam</span></Link>
      </div>

      <table className="table" style={{ marginTop: 14 }}>
        <thead>
          <tr>
            <th>Exam</th>
            <th>Subject</th>
            <th>Status</th>
            <th>Marks</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((e) => (
            <tr key={e.id}>
              <td>{e.title}</td>
              <td>{e.subject}</td>
              <td><span className="badge badge-muted">{e.status}</span></td>
              <td>{e.totalMarks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="ticket" style={{ padding: 18 }}>
      <div style={{ fontSize: '1.6rem', fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>{value}</div>
      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{label}</div>
    </div>
  );
}
