import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { initials } from '../../utils/helpers.js';

export default function Navbar({ title }) {
  const { user, logout } = useAuth();

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 28px',
        borderBottom: '1px solid var(--paper-line)',
        background: 'var(--paper-raised)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.2rem', color: 'var(--ink)' }}>
            DNR Tricks
          </span>
        </Link>
        {title && (
          <>
            <span style={{ color: 'var(--paper-line)' }}>/</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>{title}</span>
          </>
        )}
      </div>

      {user && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ textAlign: 'right', lineHeight: 1.25 }}>
            <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--ink)' }}>{user.name}</div>
            <div className="badge badge-gold" style={{ marginTop: 2 }}>{user.role}</div>
          </div>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'var(--ink)',
              color: 'var(--paper)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.8rem',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
            }}
          >
            {initials(user.name)}
          </div>
          <button className="btn btn-ghost btn-sm" onClick={logout}>Log out</button>
        </div>
      )}
    </header>
  );
}
