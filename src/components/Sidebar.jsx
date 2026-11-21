import { CalendarDays, LayoutGrid, ListTodo, Settings } from 'lucide-react';
import logo from '../assets/logo.svg';

const NAV = [
  { id: 'overview', label: 'Overview', icon: LayoutGrid },
  { id: 'tasks', label: 'My tasks', icon: ListTodo },
  { id: 'calendar', label: 'Calendar', icon: CalendarDays },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const MOBILE_NAV = [
  { id: 'overview', label: 'Overview', icon: LayoutGrid },
  { id: 'tasks', label: 'Tasks', icon: ListTodo },
  { id: 'calendar', label: 'Calendar', icon: CalendarDays },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ active, onNavigate, completedCount, weeklyTarget = 10 }) {
  const progress = Math.min(100, Math.round((completedCount / weeklyTarget) * 100));

  return (
    <>
    <aside className="sidebar" aria-label="Primary">
      <a className="brand" href="#top" onClick={(e) => { e.preventDefault(); onNavigate('overview'); }}>
        <img className="brand-mark" src={logo} alt="FocusBoard logo" width="64" height="64" />
        <span className="brand-name">Focus<em>Board</em></span>
      </a>

      <p className="side-label">Workspace</p>
      <nav className="side-nav" aria-label="Sections">
        {NAV.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            className={`nav-item${active === id ? ' active' : ''}`}
            aria-current={active === id ? 'page' : undefined}
            onClick={() => onNavigate(id)}
          >
            <Icon size={18} strokeWidth={2} aria-hidden="true" />
            {label}
          </button>
        ))}
      </nav>

      <div className="side-foot">
        <p>Weekly goal</p>
        <div
          className="side-goal-track"
          role="progressbar"
          aria-label="Weekly goal progress"
          aria-valuemin={0}
          aria-valuemax={weeklyTarget}
          aria-valuenow={Math.min(completedCount, weeklyTarget)}
        >
          <div className="side-goal-fill" style={{ width: `${progress}%` }} />
        </div>
        <small>{Math.min(completedCount, weeklyTarget)} of {weeklyTarget} tasks completed</small>
      </div>
    </aside>

    <nav className="mobile-nav" aria-label="Sections">
      {MOBILE_NAV.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          className={`mnav-item${active === id ? ' active' : ''}`}
          aria-current={active === id ? 'page' : undefined}
          onClick={() => onNavigate(id)}
        >
          <Icon aria-hidden="true" strokeWidth={2} />
          {label}
        </button>
      ))}
    </nav>
    </>
  );
}