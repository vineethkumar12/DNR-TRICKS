import { useLocation, useParams, Link } from 'react-router-dom';
import DashboardLayout from '../../../components/layout/DashboardLayout.jsx';
import { percentage } from '../../../utils/helpers.js';

export default function Analysis() {
  const { examId } = useParams();
  const location = useLocation();
  const result = location.state?.result;
  const examTitle = location.state?.examTitle;

  return (
    <DashboardLayout title="Analysis">
      <Link to={`/student/exam/${examId}/result`} style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
        ← Back to result
      </Link>

      <h1 style={{ marginTop: 14 }}>{examTitle || 'Performance analysis'}</h1>
      <p style={{ color: 'var(--text-muted)' }}>A closer look at where you scored well and where to focus next.</p>

      <div className="ledger-rule" />

      {result?.breakdown?.length ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {result.breakdown.map((topic) => {
            const pct = percentage(topic.score, topic.max);
            return (
              <div key={topic.topic} className="ticket" style={{ padding: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <strong>{topic.topic}</strong>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {topic.score}/{topic.max}
                  </span>
                </div>
                <div style={{ height: 8, borderRadius: 4, background: 'var(--paper)', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${pct}%`,
                      height: '100%',
                      background: pct >= 70 ? 'var(--success)' : pct >= 40 ? 'var(--gold)' : 'var(--danger)',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="ticket" style={{ padding: 26 }}>
          <p style={{ marginBottom: 0, color: 'var(--text-muted)' }}>
            A topic-wise breakdown will appear here once this exam has scored analytics enabled.
          </p>
        </div>
      )}

      <div className="ledger-rule" />
      <h3>What this means</h3>
      <p style={{ color: 'var(--text-muted)' }}>
        Focus your revision on topics scoring below 70% — these are the fastest way to raise your overall average
        on the next attempt.
      </p>
    </DashboardLayout>
  );
}
