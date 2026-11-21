import { Inbox } from 'lucide-react';
import TaskCard from './TaskCard';

export default function TaskList({ tasks, onToggle, onEdit, onDelete, onClearFilters }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <Inbox size={34} strokeWidth={1.6} aria-hidden="true" />
        <h3>Nothing matches that view</h3>
        <p>Try a different search term, or reset the filters to see everything.</p>
        <button type="button" className="btn btn-primary btn-sm" onClick={onClearFilters}>
          Clear filters
        </button>
      </div>
    );
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </ul>
  );
}
