import { useEffect, useState } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import DashboardLayout from '../../../components/layout/DashboardLayout.jsx';
import Button from '../../../components/common/Button.jsx';
import { api } from '../../../services/api.js';
import { percentage, formatDate, formatTime } from '../../../utils/helpers.js';

export default function Result() {
  const { examId } = useParams();
  const location = useLocation();
  const [result, setResult] = useState(location.state?.result || null);
  const [examTitle] = useState(location.state?.examTitle || '');
  const [loading, setLoading] = useState(!location.state?.result);

  useEffect(() => {
    if (result) return;
    api.getResultByExam(examId).then((r) => {
      setResult(r);
      setLoading(false);
    });
  }, [examId, result]);

  if (loading) {
    return (
      <DashboardLayout title="Result">
        <p style={{ color: 'var(--text-muted)' }}>Fetching your result…</p>
      </DashboardLayout>
    );
  }

  if (!result) {
    return (
      <DashboardLayout title="Result">
        <p>No result found for this exam yet.</p>
        <Link to="/student">← Back to dashboard</Link>
      </DashboardLayout>
    );
  }

  const pct = percentage(result.score, result.totalMarks);
  const passed = pct >= 40;

  return (
    <DashboardLayout title="Result">
      <div className="ticket" style={{ padding: 36, textAlign: 'center', maxWidth: 480, margin: '0 auto' }}>
        <span className={`badge ${passed ? 'badge-success' : 'badge-danger'}`}>{passed ? 'Passed' : 'Needs improvement'}</span>
        <h1 style={{ marginTop: 14, marginBottom: 2 }}>{examTitle || result.examTitle}</h1>
        {result.submittedAt && (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>
            Submitted {formatDate(result.submittedAt)} · {formatTime(result.submittedAt)}
          </p>
        )}

        <div style={{ margin: '26px 0' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 700, color: 'var(--ink)' }}>
            {result.score}<span style={{ fontSize: '1.4rem', color: 'var(--text-muted)' }}>/{result.totalMarks}</span>
          </div>
          <div style={{ color: 'var(--text-muted)' }}>{pct}% score</div>
        </div>

        <div className="ledger-rule" />

        <div style={{ display: 'flex', justifyContent: 'space-around', margin: '18px 0' }}>
          <Stat label="Correct" value={result.correct} color="var(--success)" />
          <Stat label="Incorrect" value={result.incorrect} color="var(--danger)" />
          <Stat label="Skipped" value={result.unanswered} color="var(--text-muted)" />
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 8 }}>
          <Link to="/student"><Button variant="outline">Back to dashboard</Button></Link>
          <Link to={`/student/exam/${examId}/analysis`} state={{ result, examTitle: examTitle || result.examTitle }}>
            <Button variant="gold">View analysis</Button>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}

function Stat({ label, value, color }) {
  return (
    <div>
      <div style={{ fontSize: '1.4rem', fontWeight: 700, color, fontFamily: 'var(--font-mono)' }}>{value}</div>
      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{label}</div>
    </div>
  );
}
