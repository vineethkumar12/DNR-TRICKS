import { Link } from 'react-router-dom';
import Button from '../../../components/common/Button.jsx';
import { formatDate, formatTime } from '../../../utils/helpers.js';
import { EXAM_STATUS } from '../../../utils/constants.js';

const STATUS_BADGE = {
  [EXAM_STATUS.ACTIVE]: { cls: 'badge-success', label: 'Live now' },
  [EXAM_STATUS.UPCOMING]: { cls: 'badge-gold', label: 'Upcoming' },
  [EXAM_STATUS.COMPLETED]: { cls: 'badge-muted', label: 'Completed' },
};

export default function ExamCard({ exam }) {
  const badge = STATUS_BADGE[exam.status];

  return (
    <div className="ticket" style={{ padding: 22, display: 'flex', justifyContent: 'space-between', gap: 20, alignItems: 'center' }}>
      <div>
        <span className={`badge ${badge.cls}`}>{badge.label}</span>
        <h3 style={{ marginTop: 10, marginBottom: 4 }}>{exam.title}</h3>
        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.88rem' }}>
          {exam.subject} · {exam.questionCount} questions · {exam.totalMarks} marks · {exam.durationMinutes} min
        </p>
        <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          {formatDate(exam.scheduledFor)} · {formatTime(exam.scheduledFor)}
        </p>
      </div>

      <div>
        {exam.status === EXAM_STATUS.ACTIVE && (
          <Link to={`/student/exam/${exam.id}/instructions`}>
            <Button variant="gold">Start exam</Button>
          </Link>
        )}
        {exam.status === EXAM_STATUS.UPCOMING && (
          <Button variant="outline" disabled>Not yet open</Button>
        )}
        {exam.status === EXAM_STATUS.COMPLETED && (
          <Link to={`/student/exam/${exam.id}/result`}>
            <Button variant="ghost">View result</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
