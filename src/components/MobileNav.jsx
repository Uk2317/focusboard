import { CalendarDays, LayoutGrid, ListTodo, Settings } from 'lucide-react';

const ITEMS = [
  { id: 'overview', label: 'Overview', icon: LayoutGrid },
  { id: 'tasks', label: 'Tasks', icon: ListTodo },
  { id: 'calendar', label: 'Calendar', icon: CalendarDays },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function MobileNav({ active, onNavigate }) {
  return (
    <nav className="mobile-nav" aria-label="Sections">
      {ITEMS.map(({ id, label, icon: Icon }) => (
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
  );
}
