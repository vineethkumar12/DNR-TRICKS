export default function QuestionPanel({ question, index, total, selected, onSelect }) {
  return (
    <div className="ticket" style={{ padding: 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <span className="badge badge-muted">Question {index + 1} of {total}</span>
        <span className="badge badge-gold">{question.marks} marks</span>
      </div>

      <h3 style={{ fontWeight: 500, lineHeight: 1.4 }}>{question.prompt}</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 18 }}>
        {question.options.map((option, i) => {
          const isSelected = selected === i;
          return (
            <label
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 16px',
                border: `1px solid ${isSelected ? 'var(--gold-deep)' : 'var(--paper-line)'}`,
                borderRadius: 3,
                background: isSelected ? 'var(--gold-wash)' : 'var(--paper-raised)',
                cursor: 'pointer',
              }}
            >
              <input
                type="radio"
                name={`q-${question.id}`}
                checked={isSelected}
                onChange={() => onSelect(i)}
              />
              <span style={{ fontSize: '0.94rem' }}>{option}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
