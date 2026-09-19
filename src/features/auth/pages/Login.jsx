import { useMemo, useState } from 'react';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import {
  GraduationCap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Star,
  Loader2,
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext.jsx';
import { validateLoginForm } from '../authService.js';

const ROLE_CONTENT = {
  admin: {
    badgeText: 'Admin Portal',
    title: 'Welcome back, Admin',
    subtitle: 'Manage exams, questions and student results.',
    accent: 'blue',
    demo: { email: 'admin@dnr.test', password: 'admin123' },
    panelHeadline: 'Run the institute from one dashboard.',
    panelBody:
      'Create exams, manage the question bank, track every student’s performance and export reports — all from the DNR Tricks admin console.',
    switchTo: { as: 'student', label: 'Sign in as a student instead' },
  },
  student: {
    badgeText: 'Student Portal',
    title: 'Welcome back',
    subtitle: 'Sign in to continue your aptitude prep.',
    accent: 'orange',
    demo: { email: 'student@dnr.test', password: 'student123' },
    panelHeadline: 'Pick up right where you left off.',
    panelBody:
      'Jump back into your mock tests, review past results and keep tracking your progress across Quant, Reasoning and Verbal.',
    switchTo: { as: 'admin', label: 'Sign in as admin instead' },
  },
  default: {
    badgeText: 'DNR Tricks',
    title: 'Sign in to your account',
    subtitle: 'Enter your credentials to continue.',
    accent: 'orange',
    demo: { email: 'student@dnr.test', password: 'student123' },
    panelHeadline: 'Master Aptitude. Ace Every Exam.',
    panelBody:
      'Sign in to take mock tests, review your results, or manage exams — whichever brings you here today.',
    switchTo: null,
  },
};

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const roleHint =
    searchParams.get('as') === 'admin' ? 'admin' : searchParams.get('as') === 'student' ? 'student' : null;
  const content = ROLE_CONTENT[roleHint] || ROLE_CONTENT.default;
  const isBlue = content.accent === 'blue';

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function fillDemo() {
    setForm({ email: content.demo.email, password: content.demo.password });
    setErrors({});
    setServerError('');
  }

  async function onSubmit(e) {
    e.preventDefault();
    const validation = validateLoginForm(form);
    setErrors(validation);
    if (Object.keys(validation).length) return;

    setServerError('');
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      const dest = location.state?.from || (user.role === 'admin' ? '/admin' : '/student');
      navigate(dest, { replace: true });
    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const inputBase =
    'w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:ring-2 focus:ring-offset-0';
  const ringClass = isBlue ? 'focus:border-brand-blue-500 focus:ring-brand-blue-100' : 'focus:border-brand-orange-500 focus:ring-brand-orange-100';

  return (
    <div className="flex min-h-screen font-body">
      {/* Brand panel */}
      <div className="relative hidden w-[44%] flex-col justify-between overflow-hidden bg-gradient-to-br from-brand-blue-900 via-brand-blue-800 to-brand-blue-900 p-10 text-white lg:flex">
        <div className="pointer-events-none absolute inset-0 bg-grid-fade opacity-40" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-brand-orange-500/30 blur-3xl animate-floatSlow"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-10 -left-16 h-64 w-64 rounded-full bg-brand-blue-400/20 blur-3xl animate-floatSlow"
          style={{ animationDelay: '1.2s' }}
          aria-hidden="true"
        />

        <Link to="/" className="relative z-10 flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-orange-500 to-brand-orange-600 shadow-lg shadow-black/20">
            <GraduationCap className="h-5 w-5 text-white" />
          </span>
          <span className="font-display text-xl font-semibold">
            DNR<span className="text-brand-orange-400"> Tricks</span>
          </span>
        </Link>

        <div className="relative z-10 max-w-sm opacity-0 animate-fadeUp">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-blue-100">
            <Sparkles size={13} className="text-brand-orange-400" />
            Aptitude Training Institute
          </span>
          <h2 className="mt-5 font-display text-3xl text-brand-orange-400 font-semibold leading-tight">{content.panelHeadline}</h2>
          <p className="mt-4 text-sm leading-relaxed text-blue-200">{content.panelBody}</p>
        </div>

        <div className="relative z-10 space-y-5">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
            <div className="flex gap-1 text-brand-orange-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={13} className="fill-brand-orange-400" />
              ))}
            </div>
            <p className="mt-3 text-sm italic leading-relaxed text-blue-100">
              "The dashboard made it so easy to see exactly which topics I was weak in before
              my placement exam."
            </p>
            <div className="mt-3 text-xs font-semibold text-white">Aarav Mehta — Student</div>
          </div>

          <div className="flex items-center gap-2 text-xs text-blue-300">
            <ShieldCheck size={14} className="text-brand-orange-400" />
            Trusted by 5,000+ students across engineering colleges
          </div>
        </div>
      </div>

      {/* Form panel */}
      <div className="relative flex w-full flex-1 items-center justify-center bg-white px-6 py-12 sm:px-10">
        <Link
          to="/"
          className="absolute left-6 top-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-brand-orange-600 sm:left-10 sm:top-8"
        >
          <ArrowLeft size={15} /> Back to home
        </Link>

        <div className="w-full max-w-sm opacity-0 animate-fadeUp">
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-orange-500 to-brand-orange-600">
              <GraduationCap className="h-5 w-5 text-white" />
            </span>
            <span className="font-display text-xl font-semibold text-brand-blue-900">
              DNR<span className="text-brand-orange-500"> Tricks</span>
            </span>
          </div>

          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide ${
              isBlue ? 'bg-brand-blue-50 text-brand-blue-700' : 'bg-brand-orange-50 text-brand-orange-700'
            }`}
          >
            {content.badgeText}
          </span>

          <h1 className="mt-4 font-display text-2xl font-semibold text-brand-blue-900 sm:text-3xl">
            {content.title}
          </h1>
          <p className="mt-2 text-sm text-slate-500">{content.subtitle}</p>

          <form onSubmit={onSubmit} noValidate className="mt-7 space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-slate-700">
                Email address
              </label>
              <div className="relative">
                <Mail size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={update('email')}
                  className={`${inputBase} ${ringClass} ${errors.email ? 'border-red-300' : ''}`}
                />
              </div>
              {errors.email && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.email}</p>}
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label htmlFor="password" className="block text-xs font-semibold text-slate-700">
                  Password
                </label>
                <a href="#" className="text-xs font-semibold text-slate-400 hover:text-brand-orange-600">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={update('password')}
                  className={`${inputBase} ${ringClass} pr-11 ${errors.password ? 'border-red-300' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.password}</p>}
            </div>

            {serverError && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-medium text-red-700">
                {serverError}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`group flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 ${
                isBlue
                  ? 'bg-brand-blue-800 shadow-blue-200 hover:bg-brand-blue-900'
                  : 'bg-brand-orange-500 shadow-orange-200 hover:bg-brand-orange-600'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Signing in…
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <button
            type="button"
            onClick={fillDemo}
            className="mt-5 flex w-full items-center justify-between rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-3 text-left transition-colors hover:border-slate-300 hover:bg-slate-100"
          >
            <span>
              <span className="block text-xs font-semibold text-slate-700">Use demo {roleHint === 'admin' ? 'admin' : 'student'} credentials</span>
              <span className="block text-[11px] text-slate-500">
                {content.demo.email} · {content.demo.password}
              </span>
            </span>
            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                isBlue ? 'bg-brand-blue-100 text-brand-blue-700' : 'bg-brand-orange-100 text-brand-orange-700'
              }`}
            >
              Autofill
            </span>
          </button>

          <div className="mt-6 flex flex-col items-center gap-2 border-t border-slate-100 pt-5 text-sm">
            {content.switchTo && (
              <Link
                to={`/login?as=${content.switchTo.as}`}
                className="font-semibold text-brand-blue-700 hover:text-brand-orange-600"
              >
                {content.switchTo.label}
              </Link>
            )}
            <p className="text-slate-500">
              New here?{' '}
              <Link to="/register" className="font-semibold text-brand-blue-900 hover:text-brand-orange-600">
                Create a student account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
