import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../components/layout/DashboardLayout.jsx';
import ExamForm from '../components/ExamForm.jsx';
import { api } from '../../../services/api.js';

export default function CreateExam() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(form) {
    setSubmitting(true);
    await api.createExam(form);
    setSubmitting(false);
    setSuccess(true);
    setTimeout(() => navigate('/admin'), 900);
  }

  return (
    <DashboardLayout variant="admin" title="Create Exam">
      <h1>Create a new exam</h1>
      <p style={{ color: 'var(--text-muted)' }}>Set up the exam shell — you can add questions once it's created.</p>

      <div className="ledger-rule" />

      <div className="ticket" style={{ padding: 28, maxWidth: 520 }}>
        {success ? (
          <div className="badge badge-success" style={{ padding: '8px 14px', fontSize: '0.85rem' }}>
            Exam created — redirecting to dashboard…
          </div>
        ) : (
          <ExamForm onSubmit={handleSubmit} submitting={submitting} />
        )}
      </div>
    </DashboardLayout>
  );
}
