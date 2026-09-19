
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import studentHero from "../../../assets/images/boy.png";
import narayana from "../../../assets/images/nar3.png";

import {
  Menu,
  X,
  ArrowRight,
  GraduationCap,
  Brain,
  Calculator,
  MessagesSquare,
  ClipboardCheck,
  Award,
  Users,
  TrendingUp,
  Star,
  Quote,
  ShieldCheck,
  Sparkles,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Target,

  CheckCircle2,
  Timer,
  
} from 'lucide-react';

// Small inline brand marks
function SocialIcon({ path, size = 15 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}

const SOCIALS = [
  {
    name: 'Facebook',
    path: 'M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94z',
  },
  {
    name: 'Twitter',
    path: 'M22 5.9c-.77.35-1.6.58-2.46.68a4.3 4.3 0 0 0 1.88-2.37 8.6 8.6 0 0 1-2.72 1.04A4.28 4.28 0 0 0 11.1 8.9c0 .33.03.65.1.96A12.2 12.2 0 0 1 2.2 4.9a4.27 4.27 0 0 0 1.33 5.7 4.25 4.25 0 0 1-1.94-.54c0 .02 0 .04 0 .06a4.28 4.28 0 0 0 3.43 4.2c-.6.16-1.24.2-1.9.08a4.29 4.29 0 0 0 4 2.98A8.6 8.6 0 0 1 2 19.54a12.15 12.15 0 0 0 6.58 1.93c7.9 0 12.22-6.55 12.22-12.22l-.01-.56A8.7 8.7 0 0 0 22 5.9z',
  },
  {
    name: 'Instagram',
    path: 'M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.24 2.22.4.56.21.96.47 1.38.89.42.42.68.82.89 1.38.16.42.35 1.05.4 2.22.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.24 1.8-.4 2.22-.21.56-.47.96-.89 1.38-.42.42-.82.68-1.38.89-.42.16-1.05.35-2.22.4-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.24-2.22-.4a3.7 3.7 0 0 1-1.38-.89 3.7 3.7 0 0 1-.89-1.38c-.16-.42-.35-1.05-.4-2.22C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.04-.96.2-1.48.34-1.82.18-.46.39-.78.73-1.13.35-.34.67-.55 1.13-.73.34-.14.86-.3 1.82-.34 1.25-.06 1.6-.07 4.75-.07zm0 1.62c-3.15 0-3.5.01-4.75.07-.96.04-1.48.2-1.82.34-.46.18-.78.39-1.13.73-.34.35-.55.67-.73 1.13-.14.34-.3.86-.34 1.82-.06 1.25-.07 1.6-.07 4.75s.01 3.5.07 4.75c.04.96.2 1.48.34 1.82.18.46.39.78.73 1.13.35.34.67.55 1.13.73.34.14.86.3 1.82.34 1.25.06 1.6.07 4.75.07s3.5-.01 4.75-.07c.96-.04 1.48-.2 1.82-.34.46-.18.78-.39 1.13-.73.34-.35.55-.67.73-1.13.14-.34.3-.86.34-1.82.06-1.25.07-1.6.07-4.75s-.01-3.5-.07-4.75c-.04-.96-.2-1.48-.34-1.82a2.1 2.1 0 0 0-.73-1.13 2.1 2.1 0 0 0-1.13-.73c-.34-.14-.86-.3-1.82-.34-1.25-.06-1.6-.07-4.75-.07zm0 4.38a3.84 3.84 0 1 1 0 7.68 3.84 3.84 0 0 1 0-7.68zm0 6.34a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm4.89-6.5a.9.9 0 1 1-1.8 0 .9.9 0 0 1 1.8 0z',
  },
  {
    name: 'LinkedIn',
    path: 'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z',
  },
];

const NAV_LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'Programs', href: '#programs' },
  { label: 'Trainer', href: '#trainer' },
  { label: 'Contact', href: '#contact' },
];

const STATS = [
  { icon: Users, value: 5000, suffix: '+', label: 'Students trained' },
  { icon: Award, value: 92, suffix: '%', label: 'Placement success' },
  { icon: TrendingUp, value: 12, suffix: '+', label: 'Years of experience' },
  { icon: ClipboardCheck, value: 300, suffix: '+', label: 'Mock tests conducted' },
];

const PROGRAMS = [
  {
    icon: Calculator,
    title: 'Quantitative Aptitude',
    desc: 'Speed maths, arithmetic and problem-solving drills built for placement-level accuracy under time pressure.',
  },
  {
    icon: Brain,
    title: 'Logical Reasoning',
    desc: 'Pattern recognition, puzzles and analytical reasoning to sharpen decision-making in timed tests.',
  },
  {
    icon: MessagesSquare,
    title: 'Verbal Ability',
    desc: 'Grammar, vocabulary and comprehension coaching tailored for campus and competitive exams.',
  },
  {
    icon: ClipboardCheck,
    title: 'Mock Test Series',
    desc: 'Full-length, exam-pattern mock tests with instant analytics through the DNR Tricks test portal.',
  },
];

const WHY_US = [
  'Proven curriculum used by 5,000+ students across engineering colleges',
  'Personalised performance analysis after every mock test',
  'Live doubt-clearing sessions with the trainer, every week',
  'Dedicated student and admin portals to track every step of progress',
];

const TESTIMONIALS = [
  {
    name: 'Aarav Mehta',
    role: 'Placed at a Product-based MNC',
    quote:
      'The mock tests on this platform felt exactly like the real placement exam. My speed in quant improved massively in six weeks.',
  },
  {
    name: 'Sneha Reddy',
    role: 'Campus Placement, 2026 Batch',
    quote:
      'Narayana sir breaks down every reasoning trick so simply. The dashboard helped me see exactly which topics I was weak in.',
  },
  {
    name: 'Kiran Kumar',
    role: 'Aptitude Test Topper',
    quote:
      'Structured, disciplined and result-oriented. The analytics after each test told me exactly what to fix before the next attempt.',
  },
];

/* =====================================================================
   COUNT-UP + IN-VIEW HOOKS
===================================================================== */

function useCountUp(target, duration = 1800, start = false) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    let raf;
    const t0 = performance.now();

    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);

      setValue(Math.round(target * eased));

      if (p < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);

  return value;
}

function useInView(threshold = 0.3) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.unobserve(el);
        }
      },
      { threshold }
    );

    io.observe(el);

    return () => io.disconnect();
  }, [threshold]);

  return [ref, inView];
}

/* =====================================================================
   NAVBAR
===================================================================== */

function NavBar({ open, setOpen }) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">

        <a href="#top" className="flex items-center gap-2.5">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-orange-500 to-brand-orange-600 shadow-md shadow-orange-200">
            <GraduationCap className="h-5.5 w-5.5 text-white" size={22} />
          </span>

          <span className="font-display text-xl font-semibold leading-none text-brand-blue-900">
            DNR<span className="text-brand-orange-500"> Tricks</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-brand-orange-600"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/login?as=student"
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-brand-blue-800 transition-all hover:border-brand-blue-300 hover:bg-brand-blue-50"
          >
            Student Login
          </Link>

          <Link
            to="/login?as=admin"
            className="group relative overflow-hidden rounded-full bg-brand-blue-800 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-200 transition-all hover:bg-brand-blue-900"
          >
            <span className="relative z-10">Admin Login</span>
          </Link>
        </div>

        <button
          className="rounded-lg p-2 text-slate-700 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-100 bg-white px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-3.5">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-slate-600"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-4 flex flex-col gap-2.5">
            <Link
              to="/login?as=student"
              className="rounded-full border border-slate-200 px-4 py-2.5 text-center text-sm font-semibold text-brand-blue-800"
            >
              Student Login
            </Link>

            <Link
              to="/login?as=admin"
              className="rounded-full bg-brand-blue-800 px-4 py-2.5 text-center text-sm font-semibold text-white"
            >
              Admin Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

/* =====================================================================
   HERO
===================================================================== */

function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-white pt-14 pb-20 sm:pt-20 sm:pb-24"
      data-aos="fade-up"
      data-aos-duration="900"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-grid-fade" />

      <div
        className="pointer-events-none absolute -left-32 top-40 h-80 w-80 rounded-full bg-brand-blue-100/60 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute right-0 top-10 h-96 w-96 rounded-full bg-brand-orange-100/40 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-2">

        {/* ================= LEFT CONTENT ================= */}
        <div
          className="relative z-20 max-w-xl"
          data-aos="fade-right"
          data-aos-duration="900"
        >
          {/* Small label */}
          <div className="mb-5 inline-flex items-center rounded-full border border-brand-orange-200 bg-brand-orange-50 px-4 py-1.5 text-xs font-semibold text-brand-orange-700">
            Aptitude Training Institute
          </div>

          {/* Main Heading */}
          <h1 className="mt-3 font-display text-5xl font-semibold leading-[1.08] text-brand-blue-900 sm:text-6xl lg:text-[4.25rem]">
         Practise Today.
            <br />

            <span className="text-gradient-brand">
              Crack Tomorrow.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
            Master Quantitative Aptitude, Logical Reasoning and Verbal
            Ability with smart practice, real exam simulations and
            personalized performance insights.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/login?as=student"
              className="group inline-flex items-center gap-2 rounded-xl bg-brand-orange-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition-all duration-300 hover:-translate-y-1 hover:bg-brand-orange-600 hover:shadow-xl"
            >
              Start Practicing

              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/programs"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-brand-blue-800 bg-white px-7 py-3.5 text-sm font-semibold text-brand-blue-800 transition-all duration-300 hover:-translate-y-1 hover:bg-brand-blue-800 hover:text-white"
            >
              Explore Programs
            </Link>
          </div>

          {/* Placement note */}
          <div className="mt-6 flex items-start gap-2">
            <span className="mt-1 text-2xl text-brand-blue-600">
              ↗
            </span>

            <span className="font-display text-sm font-semibold italic leading-5 text-brand-blue-700">
              Your Placement
              <br />
              Journey Starts Here
            </span>
          </div>

          {/* ================= RATING ================= */}
          <div className="mt-8 flex items-center gap-5 border-t border-slate-100 pt-6">

            {/* Avatar circles */}
            <div className="flex -space-x-3">
              {["A", "S", "K", "P"].map((letter, i) => (
                <span
                  key={letter}
                  className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white ${
                    i % 2 === 0
                      ? "bg-brand-blue-600"
                      : "bg-brand-orange-500"
                  }`}
                >
                  {letter}
                </span>
              ))}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <Star
                size={17}
                className="fill-brand-orange-400 text-brand-orange-400"
              />

              <span className="text-sm text-slate-600">
                <span className="font-bold text-brand-blue-900">
                  4.9/5
                </span>{" "}
                rated by students
              </span>
            </div>
          </div>
        </div>

        {/* ================= RIGHT IMAGE ================= */}
        <div
          className="relative min-h-[500px] sm:min-h-[580px]"
          data-aos="fade-left"
          data-aos-duration="900"
          data-aos-delay="150"
        >
          {/* Soft blue organic background */}
          <div
            className="absolute left-[8%] top-[12%] h-[72%] w-[85%] rounded-[45%_55%_50%_45%/45%_45%_55%_55%] bg-blue-100/80"
            aria-hidden="true"
          />

          {/* ===== Ground / bottom-right shadow ===== */}
          <div
            className="absolute bottom-[2%] left-[20%] z-[5] h-20 w-[65%] rounded-[50%] bg-slate-400/30 blur-3xl"
            aria-hidden="true"
          />

          {/* Additional right-side shadow */}
          <div
            className="absolute bottom-[5%] right-[5%] z-[5] h-56 w-32 rounded-full bg-brand-blue-900/15 blur-3xl"
            aria-hidden="true"
          />

          {/* Student image */}
          <div className="absolute bottom-0 left-1/2 z-10 w-[95%] max-w-[650px] -translate-x-1/2">
            <img
              src={studentHero}
              alt="Student preparing for aptitude exams"
              className="
                h-auto
                w-full
                object-contain
                drop-shadow-[18px_22px_18px_rgba(15,23,42,0.18)]
              "
            />
          </div>

          {/* ================= FLOATING CARDS ================= */}

          {/* Accuracy */}
          <div className="absolute left-0 top-8 z-20 hidden animate-floatSlow items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl shadow-slate-200/70 sm:flex">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white">
              <ArrowUpRight
                size={25}
                strokeWidth={2.5}
              />
            </div>

            <div>
              <div className="text-2xl font-bold leading-none text-green-600">
                +18%
              </div>

              <div className="mt-1 text-xs font-semibold text-brand-blue-900">
                Accuracy
              </div>
            </div>
          </div>

          {/* Streak */}
          <div
            className="absolute left-8 top-36 z-20 hidden animate-floatSlow items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl shadow-slate-200/70 md:flex"
            style={{ animationDelay: "0.8s" }}
          >
            <span className="text-3xl">🔥</span>

            <div>
              <div className="text-base font-bold text-orange-600">
                7 Day Streak
              </div>

              <div className="text-xs text-slate-500">
                Keep practicing!
              </div>
            </div>
          </div>

          {/* Reasoning */}
          <div
            className="absolute bottom-32 left-0 z-20 hidden animate-floatSlow items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl shadow-slate-200/70 sm:flex"
            style={{ animationDelay: "1.2s" }}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue-600 text-white">
              <Target size={23} />
            </div>

            <div>
              <div className="text-xs font-semibold text-brand-blue-800">
                Reasoning
              </div>

              <div className="text-2xl font-bold text-brand-blue-900">
                76%
              </div>
            </div>
          </div>

          {/* Quant */}
          <div
            className="absolute right-0 top-24 z-20 hidden animate-floatSlow items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl shadow-slate-200/70 sm:flex"
            style={{ animationDelay: "1.5s" }}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500 text-white">
              <Calculator size={22} />
            </div>

            <div>
              <div className="text-xs font-semibold text-brand-blue-800">
                Quant
              </div>

              <div className="text-2xl font-bold text-brand-blue-900">
                82%
              </div>
            </div>
          </div>

          {/* ================= QUOTE ================= */}
          <div className="absolute bottom-16 right-0 z-20 hidden max-w-[180px] sm:block">
            <p className="font-display text-xl font-semibold italic leading-tight text-brand-blue-700">
              “Better
              <br />
              Practice.
              <br />
              Bigger
              <br />
              Dreams.”
            </p>

            <div className="mt-3 ml-4 h-1 w-28 -rotate-6 rounded-full bg-brand-blue-600" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* =====================================================================
   STATS STRIP
===================================================================== */

function StatItem({ stat, index, start }) {
  const count = useCountUp(stat.value, 1800, start);
  const display = count.toLocaleString();

  return (
    <div
      className={`flex items-center gap-3 transition-all duration-700 ${
        start
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
        <stat.icon size={20} className="text-brand-orange-400" />
      </span>

      <div>
        <div className="font-display text-2xl font-semibold tabular-nums text-white">
          {display}
          {stat.suffix}
        </div>

        <div className="text-xs text-blue-200">
          {stat.label}
        </div>
      </div>
    </div>
  );
}

function StatsStrip() {
  const [ref, inView] = useInView(0.3);

  return (
    <section
      ref={ref}
      className="border-y border-slate-100 bg-brand-blue-900"
      data-aos="fade-up"
      data-aos-duration="800"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-10 sm:px-8 md:grid-cols-4">
        {STATS.map((s, i) => (
          <StatItem
            key={s.label}
            stat={s}
            index={i}
            start={inView}
          />
        ))}
      </div>
    </section>
  );
}

/* =====================================================================
   PROGRAMS
===================================================================== */

function Programs() {
  return (
    <section
      id="programs"
      className="bg-white py-24"
      data-aos="fade-up"
      data-aos-duration="800"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">

        <div
          className="mx-auto max-w-2xl text-center"
          data-aos="fade-up"
          data-aos-duration="700"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-brand-orange-600">
            What we teach
          </span>

          <h2 className="mt-3 font-display text-3xl font-semibold text-brand-blue-900 sm:text-4xl">
            Aptitude Training, built exam by exam
          </h2>

          <p className="mt-4 text-slate-600">
            Every module maps directly to the sections tested in campus placements and
            competitive exams — practiced through timed tests on your own dashboard.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROGRAMS.map((p, i) => (
            <div
  key={p.title}
  data-aos="fade-up"
  data-aos-duration="700"
  data-aos-delay={i * 100}
  className={`group rounded-2xl border border-slate-100 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-orange-200 hover:shadow-xl hover:shadow-orange-100 ${
    i === 0
      ? "bg-blue-100"
      : i === 1
      ? "bg-orange-100"
      : i === 2
      ? "bg-emerald-100"
      : "bg-purple-100"
  }`}
>
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue-50 text-brand-blue-700 transition-colors duration-300 group-hover:bg-brand-orange-500 group-hover:text-white">
                <p.icon size={22} />
              </span>

              <h3 className="mt-5 text-base font-semibold text-brand-blue-900">
                {p.title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* =====================================================================
   TRAINER
===================================================================== */

function TrainerSection() {
  return (
    <section
      id="trainer"
      className="relative overflow-hidden bg-brand-blue-50/60 py-24"
      data-aos="fade-up"
      data-aos-duration="800"
    >
      <div
        className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-brand-orange-100 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">

        <div
          className="relative mx-auto w-full max-w-sm"
          data-aos="fade-right"
          data-aos-duration="900"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border-4 border-white bg-[#0B2A5B] shadow-2xl">

            {/* Curved orange shape */}
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-orange-500 opacity-95" />

            {/* Large curved blue/light-blue shape */}
            <div className="absolute -bottom-32 -left-20 h-80 w-[130%] rounded-[50%] bg-blue-400/30 rotate-[-8deg]" />

            {/* Orange curved wave at bottom */}
            <div className="absolute -bottom-24 -right-20 h-48 w-[120%] rounded-[50%] bg-orange-500/90 rotate-[8deg]" />

            {/* Soft highlight */}
            <div className="absolute left-8  top-10  h-32 w-32 rounded-full bg-white/10 blur-2xl" />

            {/* Person image */}
            <div className="relative z-10 mt-6 flex h-full w-full items-center justify-center">
              <img
                src={narayana}
                alt="Narayana, Founder & Lead Trainer"
                className="h-full w-full object-contain"
              />
            </div>

            {/* Soft overlay */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.18),transparent_45%)]" />
          </div>
          <div className="absolute -bottom-5 -right-4 flex items-center gap-2.5 rounded-2xl bg-white px-4 py-3 shadow-xl sm:-right-8">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-orange-50">
              <ShieldCheck
                size={18}
                className="text-brand-orange-500"
              />
            </span>

            <div>
              <div className="text-xs font-bold text-brand-blue-900">
                12+ Years
              </div>

              <div className="text-[11px] text-slate-500">
                Training experience
              </div>
            </div>
          </div>
        </div>

        <div
          data-aos="fade-left"
          data-aos-duration="900"
          data-aos-delay="150"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-brand-orange-600">
            Meet your trainer
          </span>

          <h2 className="mt-3 font-display text-3xl font-semibold text-brand-blue-900 sm:text-4xl">
            Narayana
          </h2>

          <p className="mt-1 text-sm font-semibold text-brand-blue-700">
            Founder &amp; Lead Trainer, DNR Tricks
          </p>

          <p className="mt-5 leading-relaxed text-slate-600">
            With over 12 years of experience training engineering and degree students for
            campus placements, Narayana has built a reputation for turning intimidating
            aptitude sections into simple, repeatable tricks. His sessions blend speed-maths
            shortcuts, structured reasoning frameworks and disciplined mock-test practice —
            helping thousands of students walk into their placement exams with confidence.
          </p>

          <ul className="mt-6 space-y-3">
            {WHY_US.map((point, i) => (
              <li
                key={point}
                className="flex items-start gap-3 text-sm text-slate-700"
                data-aos="fade-up"
                data-aos-delay={i * 80}
              >
                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0 text-brand-orange-500"
                />
                {point}
              </li>
            ))}
          </ul>

          <div
            className="mt-8 flex items-center gap-4 rounded-2xl border border-brand-orange-100 bg-white p-5"
            data-aos="zoom-in"
            data-aos-delay="250"
          >
            <Quote
              size={28}
              className="shrink-0 text-brand-orange-300"
            />

            <p className="text-sm italic text-slate-600">
              "Every student can crack aptitude tests — they just need the right trick and
              enough timed practice."
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

/* =====================================================================
   TESTIMONIALS
===================================================================== */

function Testimonials() {
  return (
    <section
      className="bg-white py-24"
      data-aos="fade-up"
      data-aos-duration="800"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">

        <div
          className="mx-auto max-w-2xl text-center"
          data-aos="fade-up"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-brand-orange-600">
            Student stories
          </span>

          <h2 className="mt-3 font-display text-3xl font-semibold text-brand-blue-900 sm:text-4xl">
            Results our students talk about
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              data-aos="fade-up"
              data-aos-duration="700"
              data-aos-delay={i * 120}
              className="flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="flex gap-1 text-brand-orange-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="fill-brand-orange-400"
                  />
                ))}
              </div>

              <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">
                "{t.quote}"
              </p>

              <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue-800 text-xs font-bold text-white">
                  {t.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </span>

                <div>
                  <div className="text-sm font-semibold text-brand-blue-900">
                    {t.name}
                  </div>

                  <div className="text-xs text-slate-500">
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* =====================================================================
   CTA BANNER
===================================================================== */

function CTABanner() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-r from-brand-blue-900 via-brand-blue-800 to-brand-orange-600 bg-[length:200%_200%] py-16 animate-gradientPan"
      data-aos="zoom-in"
      data-aos-duration="900"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-5 text-center sm:px-8">

        <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
          Ready to crack your next aptitude test?
        </h2>

        <p className="max-w-xl text-blue-100">
          Log in to your dashboard to take a mock test, or head to the admin portal to
          manage exams and track student performance.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/login?as=student"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-brand-blue-900 shadow-lg transition-transform hover:-translate-y-0.5"
          >
            Student Login
            <ArrowRight size={16} />
          </Link>

          <Link
            to="/login?as=admin"
            className="inline-flex items-center gap-2 rounded-full border-2 border-white/70 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/10"
          >
            Admin Login
          </Link>
        </div>

      </div>
    </section>
  );
}

/* =====================================================================
   FOOTER
===================================================================== */

function Footer() {
  return (
    <footer
      id="contact"
      className="bg-brand-blue-900 pt-16 pb-8 text-blue-100"
      data-aos="fade-up"
      data-aos-duration="800"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          <div data-aos="fade-up">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-orange-500">
                <GraduationCap
                  size={18}
                  className="text-white"
                />
              </span>

              <span className="font-display text-lg font-semibold text-white">
                DNR Tricks
              </span>
            </div>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-blue-200">
              An aptitude training institute helping students crack placement and
              competitive exams with proven shortcuts and disciplined mock-test practice.
            </p>

            <div className="mt-5 flex gap-3">
              {SOCIALS.map((s, i) => (
                <a
                  key={s.name}
                  href="#"
                  aria-label={s.name}
                  data-aos="zoom-in"
                  data-aos-delay={i * 80}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand-orange-500"
                >
                  <SocialIcon path={s.path} />
                </a>
              ))}
            </div>
          </div>

          <div data-aos="fade-up" data-aos-delay="100">
            <h4 className="text-sm font-semibold text-white">
              Quick links
            </h4>

            <ul className="mt-4 space-y-2.5 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-blue-200 transition-colors hover:text-brand-orange-400"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div data-aos="fade-up" data-aos-delay="200">
            <h4 className="text-sm font-semibold text-white">
              Portals
            </h4>

            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  to="/login?as=student"
                  className="text-blue-200 transition-colors hover:text-brand-orange-400"
                >
                  Student Login
                </Link>
              </li>

              <li>
                <Link
                  to="/login?as=admin"
                  className="text-blue-200 transition-colors hover:text-brand-orange-400"
                >
                  Admin Login
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className="text-blue-200 transition-colors hover:text-brand-orange-400"
                >
                  Create Student Account
                </Link>
              </li>
            </ul>
          </div>

          <div data-aos="fade-up" data-aos-delay="300">
            <h4 className="text-sm font-semibold text-white">
              Contact
            </h4>

            <ul className="mt-4 space-y-3 text-sm text-blue-200">
              <li className="flex items-center gap-2.5">
                <Mail
                  size={15}
                  className="text-brand-orange-400"
                />
                hello@dnrtricks.test
              </li>

              <li className="flex items-center gap-2.5">
                <Phone
                  size={15}
                  className="text-brand-orange-400"
                />
                +91 98765 43210
              </li>

              <li className="flex items-center gap-2.5">
                <MapPin
                  size={15}
                  className="text-brand-orange-400"
                />
                Hyderabad, India
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-blue-300 sm:flex-row">
          <span>© 2026 DNR Tricks. All rights reserved.</span>
          <span>Sample content for demonstration purposes.</span>
        </div>

      </div>
    </footer>
  );
}

/* =====================================================================
   HOME
===================================================================== */

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: false,
      offset: 100,
      delay: 0,
    });

    const timer = setTimeout(() => {
      AOS.refresh();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="font-body">
      <NavBar
        open={menuOpen}
        setOpen={setMenuOpen}
      />

      <Hero />
      <StatsStrip />
      <Programs />
      <TrainerSection />
      <Testimonials />
      <CTABanner />
      <Footer />
    </div>
  );
}

