import { useEffect, useState } from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout.jsx';
import { api } from '../../../services/api.js';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    api.getStudents().then(setStudents);
  }, []);

  const filtered = students.filter((s) =>
    `${s.name} ${s.rollNo} ${s.email}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <DashboardLayout variant="admin" title="Students">
      <h1>Students</h1>
      <p style={{ color: 'var(--text-muted)' }}>Everyone registered on the platform.</p>

      <input
        className="field-input"
        placeholder="Search by name, roll number, or email…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ maxWidth: 360, marginTop: 10, marginBottom: 20 }}
      />

      <div className="ticket" style={{ padding: 4 }}>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll No.</th>
              <th>Email</th>
              <th>Exams taken</th>
              <th>Avg. score</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>{s.rollNo}</td>
                <td>{s.email}</td>
                <td>{s.examsTaken}</td>
                <td>
                  <span className={`badge ${s.avgScore >= 75 ? 'badge-success' : 'badge-gold'}`}>{s.avgScore}%</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
