import { ChevronDown } from 'lucide-react';

export default function PriorityFilter({ value, onChange }) {
  return (
    <div className="select">
      <label htmlFor="priority-filter" className="visually-hidden">Filter by priority</label>
      <select
        id="priority-filter"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="all">Priority: All</option>
        <option value="high">Priority: High</option>
        <option value="medium">Priority: Medium</option>
        <option value="low">Priority: Low</option>
      </select>
      <ChevronDown size={16} aria-hidden="true" />
    </div>
  );
}
