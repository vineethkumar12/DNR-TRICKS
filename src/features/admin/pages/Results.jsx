import { useEffect, useState } from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout.jsx';
import { api } from '../../../services/api.js';
import { percentage, formatDate } from '../../../utils/helpers.js';

export default function Results() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    api.getAllResults().then(setResults);
  }, []);

  return (
    <DashboardLayout variant="admin" title="Results">
      <h1>Exam results</h1>
      <p style={{ color: 'var(--text-muted)' }}>Every submitted attempt across all exams.</p>

      <div className="ticket" style={{ padding: 4, marginTop: 16 }}>
        <table className="table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Exam</th>
              <th>Score</th>
              <th>Percentage</th>
              <th>Submitted</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => {
              const pct = percentage(r.score, r.totalMarks);
              return (
                <tr key={r.id}>
                  <td>{r.studentName}</td>
                  <td>{r.examTitle}</td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>{r.score}/{r.totalMarks}</td>
                  <td>
                    <span className={`badge ${pct >= 70 ? 'badge-success' : pct >= 40 ? 'badge-gold' : 'badge-danger'}`}>
                      {pct}%
                    </span>
                  </td>
                  <td>{formatDate(r.submittedAt)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
