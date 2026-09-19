import { useState } from 'react';
import Input from '../../../components/common/Input.jsx';
import Button from '../../../components/common/Button.jsx';

export default function QuestionForm({ onAdd }) {
  const [prompt, setPrompt] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correct, setCorrect] = useState(0);
  const [marks, setMarks] = useState(10);

  function updateOption(i, value) {
    setOptions((opts) => opts.map((o, idx) => (idx === i ? value : o)));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!prompt.trim() || options.some((o) => !o.trim())) return;
    onAdd({ id: `q${Date.now()}`, prompt, options, correct, marks: Number(marks) });
    setPrompt('');
    setOptions(['', '', '', '']);
    setCorrect(0);
    setMarks(10);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input id="prompt" label="Question" placeholder="Type the question text…" value={prompt} onChange={(e) => setPrompt(e.target.value)} />

      <div className="field">
        <label>Options — select the correct one</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {options.map((opt, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <input type="radio" name="correct-option" checked={correct === i} onChange={() => setCorrect(i)} />
              <input
                className="field-input"
                placeholder={`Option ${i + 1}`}
                value={opt}
                onChange={(e) => updateOption(i, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 160 }}>
        <Input id="marks" label="Marks" type="number" min={1} value={marks} onChange={(e) => setMarks(e.target.value)} />
      </div>

      <Button type="submit" variant="outline">Add question</Button>
    </form>
  );
}
