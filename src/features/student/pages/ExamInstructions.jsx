import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import DashboardLayout from '../../../components/layout/DashboardLayout.jsx';
import Button from '../../../components/common/Button.jsx';
import { api } from '../../../services/api.js';

export default function ExamInstructions() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    api.getExamById(examId).then(setExam);
  }, [examId]);

  if (!exam) {
    return (
      <DashboardLayout title="Exam Instructions">
        <p style={{ color: 'var(--text-muted)' }}>Loading exam details…</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Exam Instructions">
      <Link to="/student" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>← Back to dashboard</Link>

      <div className="ticket" style={{ padding: 32, marginTop: 16 }}>
        <span className="badge badge-gold">{exam.subject}</span>
        <h1 style={{ marginTop: 10 }}>{exam.title}</h1>

        <div style={{ display: 'flex', gap: 24, margin: '16px 0 24px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <span>{exam.durationMinutes} minutes</span>
          <span>{exam.questionCount} questions</span>
          <span>{exam.totalMarks} marks</span>
        </div>

        <div className="ledger-rule" />

        <h3>Instructions</h3>
        <ul style={{ paddingLeft: 20, color: 'var(--text)' }}>
          {exam.instructions.map((line, i) => (
            <li key={i} style={{ marginBottom: 8 }}>{line}</li>
          ))}
        </ul>

        <div className="ledger-rule" />

        <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: '0.9rem', marginBottom: 22 }}>
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} style={{ marginTop: 3 }} />
          I have read the instructions and I'm ready to begin the timed test.
        </label>

        <Button variant="gold" disabled={!agreed} onClick={() => navigate(`/student/exam/${examId}/test`)}>
          Begin exam
        </Button>
      </div>
    </DashboardLayout>
  );
}
