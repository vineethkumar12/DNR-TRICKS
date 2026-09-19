import Navbar from './Navbar.jsx';
import Sidebar from './Sidebar.jsx';

export default function DashboardLayout({ children, title, variant = 'student' }) {
  return (
    <div className="page-shell">
      <Navbar title={title} />
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {variant === 'admin' && <Sidebar />}
        <main style={{ flex: 1, padding: '32px 0', overflowY: 'auto' }}>
          <div className={variant === 'admin' ? 'container-wide' : 'container'}>{children}</div>
        </main>
      </div>
    </div>
  );
}
