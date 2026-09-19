import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../../components/common/Input.jsx';
import Button from '../../../components/common/Button.jsx';
import { useAuth } from '../../../context/AuthContext.jsx';
import { validateRegisterForm } from '../authService.js';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', rollNo: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    const validation = validateRegisterForm(form);
    setErrors(validation);
    if (Object.keys(validation).length) return;

    setServerError('');
    setLoading(true);
    try {
      await register(form);
      navigate('/student', { replace: true });
    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-shell" style={{ alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div className="ticket" style={{ width: '100%', maxWidth: 420, padding: '36px 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: 26 }}>
          <div className="badge badge-gold" style={{ marginBottom: 12 }}>DNR Tricks</div>
          <h1 style={{ fontSize: '1.6rem' }}>Create your student account</h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: 0 }}>Register to access scheduled exams.</p>
        </div>

        <form onSubmit={onSubmit} noValidate>
          <Input id="name" label="Full name" placeholder="Aarav Mehta" value={form.name} onChange={update('name')} error={errors.name} />
          <Input id="rollNo" label="Roll number" placeholder="DNR-2026-014" value={form.rollNo} onChange={update('rollNo')} error={errors.rollNo} />
          <Input id="email" label="Email address" type="email" placeholder="you@example.com" value={form.email} onChange={update('email')} error={errors.email} />
          <Input id="password" label="Password" type="password" placeholder="At least 6 characters" value={form.password} onChange={update('password')} error={errors.password} />
          {serverError && <div className="field-error" style={{ marginBottom: 14 }}>{serverError}</div>}
          <Button type="submit" block loading={loading}>Create account</Button>
        </form>

        <div className="ledger-rule" />
        <p style={{ textAlign: 'center', marginBottom: 0, fontSize: '0.9rem' }}>
          Already registered? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
