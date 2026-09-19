import { useEffect, useRef } from 'react';
import { formatDuration } from '../../../utils/helpers.js';

export default function ExamTimer({ secondsLeft, setSecondsLeft, onExpire }) {
  const expiredRef = useRef(false);

  useEffect(() => {
    if (secondsLeft <= 0) {
      if (!expiredRef.current) {
        expiredRef.current = true;
        onExpire?.();
      }
      return;
    }
    const id = setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [secondsLeft, setSecondsLeft, onExpire]);

  const low = secondsLeft <= 60;

  return (
    <div
      className={`badge ${low ? 'badge-danger' : 'badge-gold'}`}
      style={{ fontSize: '0.9rem', padding: '7px 14px' }}
      aria-live="polite"
    >
      ⏱ {formatDuration(secondsLeft)}
    </div>
  );
}
