import { useEffect, useState } from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout.jsx';
import QuestionForm from '../components/QuestionForm.jsx';
import { api } from '../../../services/api.js';

export default function ManageQuestions() {
  const [exams, setExams] = useState([]);
  const [examId, setExamId] = useState('');
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    api.getExams().then((data) => {
      setExams(data);
      if (data.length) setExamId(data[0].id);
    });
  }, []);

  useEffect(() => {
    if (!examId) return;
    api.getQuestions(examId).then(setQuestions);
  }, [examId]);

  return (
    <DashboardLayout variant="admin" title="Questions">
      <h1>Manage questions</h1>
      <p style={{ color: 'var(--text-muted)' }}>Build the question bank for each exam.</p>

      <div className="field" style={{ maxWidth: 320, marginTop: 10 }}>
        <label htmlFor="examId">Exam</label>
        <select id="examId" className="field-input" value={examId} onChange={(e) => setExamId(e.target.value)}>
          {exams.map((e) => (
            <option key={e.id} value={e.id}>{e.title}</option>
          ))}
        </select>
      </div>

      <div className="ledger-rule" />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 24, alignItems: 'start' }}>
        <div>
          <h3>Existing questions ({questions.length})</h3>
          {questions.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>No questions added for this exam yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {questions.map((q, i) => (
                <div key={q.id} className="ticket" style={{ padding: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <strong style={{ fontSize: '0.88rem' }}>Q{i + 1}</strong>
                    <span className="badge badge-gold">{q.marks} marks</span>
                  </div>
                  <p style={{ marginBottom: 6, fontSize: '0.9rem' }}>{q.prompt}</p>
                  <p style={{ marginBottom: 0, fontSize: '0.8rem', color: 'var(--success)' }}>
                    Correct: {q.options[q.correct]}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="ticket" style={{ padding: 22 }}>
          <h3>Add a question</h3>
          <QuestionForm onAdd={(q) => setQuestions((qs) => [...qs, q])} />
        </div>
      </div>
    </DashboardLayout>
  );
}
