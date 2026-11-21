import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search">
      <Search size={17} aria-hidden="true" />
      <label htmlFor="task-search" className="visually-hidden">Search tasks by title</label>
      <input
        id="task-search"
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Find a task…"
        autoComplete="off"
      />
    </div>
  );
}
