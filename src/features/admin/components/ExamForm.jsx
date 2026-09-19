import { useState } from 'react';
import Input from '../../../components/common/Input.jsx';
import Button from '../../../components/common/Button.jsx';

export default function ExamForm({ onSubmit, submitting }) {
  const [form, setForm] = useState({
    title: '',
    subject: '',
    durationMinutes: 30,
    totalMarks: 50,
    scheduledFor: '',
  });

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input id="title" label="Exam title" placeholder="e.g. Data Structures — Unit Test 2" value={form.title} onChange={update('title')} required />
      <Input id="subject" label="Subject" placeholder="e.g. Computer Science" value={form.subject} onChange={update('subject')} required />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Input id="durationMinutes" label="Duration (minutes)" type="number" min={5} value={form.durationMinutes} onChange={update('durationMinutes')} />
        <Input id="totalMarks" label="Total marks" type="number" min={1} value={form.totalMarks} onChange={update('totalMarks')} />
      </div>

      <Input id="scheduledFor" label="Scheduled date & time" type="datetime-local" value={form.scheduledFor} onChange={update('scheduledFor')} />

      <Button type="submit" variant="gold" loading={submitting}>Create exam</Button>
    </form>
  );
}
