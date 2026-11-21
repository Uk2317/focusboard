import { ChevronDown } from 'lucide-react';

const STATUS_TABS = [
  { value: 'all', label: 'All tasks' },
  { value: 'in-progress', label: 'In progress' },
  { value: 'completed', label: 'Completed' },
];

export default function FilterTabs({ active, onChange, counts, priority, onPriorityChange }) {
  return (
    <>
      <div className="tabs" role="group" aria-label="Filter by status">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            className={`tab${active === tab.value ? ' active' : ''}`}
            aria-pressed={active === tab.value}
            onClick={() => onChange(tab.value)}
          >
            {tab.label}
            <span className="tab-count">{counts[tab.value]}</span>
          </button>
        ))}
      </div>

      <div className="select">
        <label htmlFor="priority-filter" className="visually-hidden">Filter by priority</label>
        <select
          id="priority-filter"
          value={priority}
          onChange={(event) => onPriorityChange(event.target.value)}
        >
          <option value="all">Priority: All</option>
          <option value="high">Priority: High</option>
          <option value="medium">Priority: Medium</option>
          <option value="low">Priority: Low</option>
        </select>
        <ChevronDown size={16} aria-hidden="true" />
      </div>
    </>
  );
}
