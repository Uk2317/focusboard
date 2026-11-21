import { CalendarDays, Check, Pencil, Trash2 } from 'lucide-react';
import { CATEGORY_CLASS, PRIORITY_META, dueState, formatDueDate } from '../lib/taskMeta';

// One row in the task list. The circle button is the complete/incomplete toggle.
export default function TaskCard({ task, onToggle, onEdit, onDelete }) {
  const done = task.status === 'completed';
  const priority = PRIORITY_META[task.priority] ?? PRIORITY_META.medium;
  const due = dueState(task.dueDate, task.status);

  return (
    <li className={`task-row${done ? ' is-done' : ''}`}>
      <button
        type="button"
        className={`check-btn${done ? ' done' : ''}`}
        role="checkbox"
        aria-checked={done}
        aria-label={done ? `Mark "${task.title}" as not completed` : `Mark "${task.title}" as completed`}
        onClick={() => onToggle(task.id)}
      >
        {done && <Check size={14} strokeWidth={3.5} aria-hidden="true" />}
      </button>

      <div className="task-main">
        <h3 className="task-title">{task.title}</h3>
        <p className="task-desc">{task.description}</p>
      </div>

      <div className="task-meta">
        <span className={CATEGORY_CLASS[task.category] ?? 'chip'}>{task.category}</span>
        <span className={priority.className}>{priority.label}</span>
        <span className={`due${due ? ` ${due.tone}` : ''}`}>
          <CalendarDays size={13} aria-hidden="true" />
          <span>{formatDueDate(task.dueDate)}</span>
          {due && <span className="due-flag">{due.label}</span>}
        </span>
      </div>

      <div className="row-actions">
        <button
          type="button"
          className="row-btn"
          onClick={() => onEdit(task)}
          aria-label={`Edit "${task.title}"`}
        >
          <Pencil size={16} aria-hidden="true" />
        </button>
        <button
          type="button"
          className="row-btn danger"
          onClick={() => onDelete(task)}
          aria-label={`Delete "${task.title}"`}
        >
          <Trash2 size={16} aria-hidden="true" />
        </button>
      </div>
    </li>
  );
}
