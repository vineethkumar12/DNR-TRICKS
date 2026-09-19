import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '../../../components/layout/DashboardLayout.jsx';
import QuestionPanel from '../components/QuestionPanel.jsx';
import ExamTimer from '../components/ExamTimer.jsx';
import Button from '../../../components/common/Button.jsx';
import { api } from '../../../services/api.js';

export default function OnlineTest() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [secondsLeft, setSecondsLeft] = useState(0);
  const submittingRef = useRef(false);

  useEffect(() => {
    Promise.all([api.getExamById(examId), api.getQuestions(examId)]).then(([e, qs]) => {
      setExam(e);
      setQuestions(qs);
      setSecondsLeft(e.durationMinutes * 60);
    });
  }, [examId]);

  const handleSubmit = useCallback(async () => {
    if (submittingRef.current) return;
    submittingRef.current = true;
    const result = await api.submitExam(examId, answers);
    navigate(`/student/exam/${examId}/result`, { state: { result, examTitle: exam?.title } });
  }, [examId, answers, exam, navigate]);

  if (!exam || questions.length === 0) {
    return (
      <DashboardLayout title="Online Test">
        <p style={{ color: 'var(--text-muted)' }}>Loading your test…</p>
      </DashboardLayout>
    );
  }

  const question = questions[current];
  const answeredCount = Object.keys(answers).length;

  return (
    <DashboardLayout title={exam.title}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <h2 style={{ marginBottom: 2 }}>{exam.title}</h2>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{answeredCount} of {questions.length} answered</span>
        </div>
        <ExamTimer secondsLeft={secondsLeft} setSecondsLeft={setSecondsLeft} onExpire={handleSubmit} />
      </div>

      <QuestionPanel
        question={question}
        index={current}
        total={questions.length}
        selected={answers[question.id]}
        onSelect={(i) => setAnswers((a) => ({ ...a, [question.id]: i }))}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
        <Button variant="outline" disabled={current === 0} onClick={() => setCurrent((c) => c - 1)}>
          Previous
        </Button>

        <div style={{ display: 'flex', gap: 6 }}>
          {questions.map((q, i) => (
            <button
              key={q.id}
              onClick={() => setCurrent(i)}
              aria-label={`Go to question ${i + 1}`}
              style={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                border: '1px solid var(--paper-line)',
                fontSize: '0.78rem',
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
                background: i === current ? 'var(--ink)' : answers[q.id] !== undefined ? 'var(--gold-wash)' : 'var(--paper-raised)',
                color: i === current ? 'var(--paper)' : 'var(--ink)',
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {current === questions.length - 1 ? (
          <Button variant="gold" onClick={handleSubmit}>Submit exam</Button>
        ) : (
          <Button variant="primary" onClick={() => setCurrent((c) => c + 1)}>Next</Button>
        )}
      </div>
    </DashboardLayout>
  );
}
