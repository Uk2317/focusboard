import { ChevronRight, Moon, Sun } from 'lucide-react';
import Logo from './Logo';

export default function TopBar({ theme, onToggleTheme }) {
  const isDark = theme === 'dark';

  return (
    <header className="topbar">
      <div className="topbar-logo" aria-hidden="true">
        <Logo />
        <span>FocusBoard</span>
      </div>

      <nav className="crumbs" aria-label="Breadcrumb">
        <span>Workspace</span>
        <ChevronRight size={14} className="crumb-sep" aria-hidden="true" />
        <strong aria-current="page">Overview</strong>
      </nav>

      <div className="top-actions">
        <button
          type="button"
          className="icon-btn"
          onClick={onToggleTheme}
          aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
          aria-pressed={isDark}
        >
          {isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
        </button>
        <div className="avatar">
          <div className="avatar-circle" aria-hidden="true">AC</div>
          <div className="avatar-meta">
            <b>Alex Carter</b>
            <small>Product designer</small>
          </div>
        </div>
      </div>
    </header>
  );
}
