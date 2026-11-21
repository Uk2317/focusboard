import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { TASK_CATEGORIES, TASK_PRIORITIES, TASK_STATUSES } from '../data/sampleTasks';

const EMPTY = {
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  category: 'Design',
  dueDate: '',
};

// Handles both create and edit — parent passes `initial` (a task) or null.
export default function TaskFormModal({ initial, onClose, onSave }) {
  const [values, setValues] = useState(() => (initial ? { ...EMPTY, ...initial } : EMPTY));
  const [error, setError] = useState('');
  const titleRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  // Escape closes; Tab cycles inside the dialog so focus can't escape behind it.
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusables = dialogRef.current.querySelectorAll(
        'input, textarea, select, button, [href]'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const set = (field) => (event) => {
    const next = event.target.value;
    setValues((v) => ({ ...v, [field]: next }));
    if (field === 'title' && error) setError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const title = values.title.trim();
    if (title.length < 3) {
      setError('Please give the task a title of at least 3 characters.');
      titleRef.current?.focus();
      return;
    }
    onSave({ ...values, title });
  };

  return (
    <div className="modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-form-title"
        ref={dialogRef}
      >
        <div className="modal-head">
          <div>
            <h2 id="task-form-title">{initial ? 'Edit task' : 'Create new task'}</h2>
            <p>{initial ? 'Update the details and save your changes.' : 'Add your task details to stay on top of your work.'}</p>
          </div>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close dialog">
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="task-title">Task title <span className="req" aria-hidden="true">*</span></label>
            <input
              ref={titleRef}
              id="task-title"
              type="text"
              value={values.title}
              onChange={set('title')}
              placeholder="e.g. Update pricing page"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? 'task-title-error' : undefined}
              required
            />
            {error && <p className="field-error" id="task-title-error" role="alert">{error}</p>}
          </div>

          <div className="field">
            <label htmlFor="task-description">Description</label>
            <textarea
              id="task-description"
              value={values.description}
              onChange={set('description')}
              placeholder="Add notes about this task…"
            />
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="task-status">Status</label>
              <select id="task-status" value={values.status} onChange={set('status')}>
                {TASK_STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="task-priority">Priority</label>
              <select id="task-priority" value={values.priority} onChange={set('priority')}>
                {TASK_PRIORITIES.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="task-category">Category</label>
              <select id="task-category" value={values.category} onChange={set('category')}>
                {TASK_CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="task-due">Due date</label>
              <input
                id="task-due"
                type="date"
                value={values.dueDate}
                onChange={set('dueDate')}
              />
            </div>
          </div>

          <p className="required-note">* Required field</p>

          <div className="modal-actions">
            <button type="button" className="btn btn-soft" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">
              {initial ? 'Save changes' : 'Create task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
