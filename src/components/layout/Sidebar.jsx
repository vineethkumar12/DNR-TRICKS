import { NavLink } from 'react-router-dom';

const LINKS = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/create-exam', label: 'Create Exam' },
  { to: '/admin/questions', label: 'Questions' },
  { to: '/admin/students', label: 'Students' },
  { to: '/admin/results', label: 'Results' },
  { to: '/admin/reports', label: 'Reports' },
];

export default function Sidebar() {
  return (
    <aside
      style={{
        width: 210,
        flexShrink: 0,
        borderRight: '1px solid var(--paper-line)',
        padding: '24px 14px',
        background: 'var(--paper-raised)',
      }}
    >
      <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', padding: '0 10px 10px' }}>
        Admin
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            style={({ isActive }) => ({
              display: 'block',
              padding: '9px 10px',
              borderRadius: 3,
              fontSize: '0.9rem',
              fontWeight: isActive ? 600 : 500,
              textDecoration: 'none',
              color: isActive ? 'var(--ink)' : 'var(--text-muted)',
              background: isActive ? 'var(--gold-wash)' : 'transparent',
              borderLeft: isActive ? '3px solid var(--gold)' : '3px solid transparent',
            })}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
