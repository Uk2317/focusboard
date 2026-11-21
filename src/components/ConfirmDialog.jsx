import { useEffect, useRef } from 'react';
import { Trash2 } from 'lucide-react';

export default function ConfirmDialog({ task, onCancel, onConfirm }) {
  const cancelRef = useRef(null);

  useEffect(() => {
    cancelRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onCancel();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onCancel]);

  return (
    <div className="modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && onCancel()}>
      <div
        className="modal"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-desc"
      >
        <div className="confirm-icon">
          <Trash2 size={22} aria-hidden="true" />
        </div>
        <h2 id="confirm-title" style={{ margin: '0 0 6px', fontSize: 18 }}>Delete this task?</h2>
        <p id="confirm-desc" style={{ margin: 0, fontSize: 13, color: 'var(--ink-2)' }}>
          “{task.title}” will be removed permanently. This can’t be undone.
        </p>
        <div className="modal-actions">
          <button type="button" className="btn btn-soft" onClick={onCancel} ref={cancelRef}>
            Keep task
          </button>
          <button type="button" className="btn btn-danger" onClick={() => onConfirm(task.id)}>
            <Trash2 size={15} aria-hidden="true" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
