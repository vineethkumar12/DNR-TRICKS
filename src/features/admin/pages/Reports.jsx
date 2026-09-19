import { useEffect, useState } from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout.jsx';
import { api } from '../../../services/api.js';

export default function Reports() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    api.getReportSummary().then(setSummary);
  }, []);

  if (!summary) {
    return (
      <DashboardLayout variant="admin" title="Reports">
        <p style={{ color: 'var(--text-muted)' }}>Loading reports…</p>
      </DashboardLayout>
    );
  }

  const maxAvg = Math.max(...summary.scoreTrend.map((t) => t.avg));

  return (
    <DashboardLayout variant="admin" title="Reports">
      <h1>Reports</h1>
      <p style={{ color: 'var(--text-muted)' }}>Aggregate performance trends across recent exams.</p>

      <div className="ledger-rule" />

      <div className="ticket" style={{ padding: 28 }}>
        <h3 style={{ marginBottom: 20 }}>Average score by exam</h3>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 20, height: 180 }}>
          {summary.scoreTrend.map((t) => (
            <div key={t.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{t.avg}%</span>
              <div
                style={{
                  width: '100%',
                  maxWidth: 46,
                  height: `${(t.avg / maxAvg) * 130}px`,
                  background: 'var(--gold)',
                  borderRadius: '3px 3px 0 0',
                }}
              />
              <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', textAlign: 'center' }}>{t.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginTop: 20 }}>
        <div className="ticket" style={{ padding: 20 }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--font-display)' }}>{summary.avgScoreAcrossExams}%</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Overall average score</div>
        </div>
        <div className="ticket" style={{ padding: 20 }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--font-display)' }}>{summary.passRate}%</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Pass rate</div>
        </div>
        <div className="ticket" style={{ padding: 20 }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--font-display)' }}>{summary.totalStudents}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Active students</div>
        </div>
      </div>
    </DashboardLayout>
  );
}
