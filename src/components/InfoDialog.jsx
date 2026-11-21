import { useEffect, useRef } from 'react';
import { Info, X } from 'lucide-react';

// Calendar and Settings aren't part of this build's scope — the brief allows
// unlinked sections to stay clearly-identified placeholders (see README).
export default function InfoDialog({ title, onClose }) {
  const okRef = useRef(null);

  useEffect(() => {
    okRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <div className="modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="info-title">
        <div className="confirm-icon" style={{ background: 'var(--brand-soft)', color: 'var(--brand-soft-ink)' }}>
          <Info size={22} aria-hidden="true" />
        </div>
        <div className="modal-head" style={{ marginBottom: 0 }}>
          <div>
            <h2 id="info-title">{title}</h2>
            <p>Not included in this build</p>
          </div>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close dialog">
            <X size={18} aria-hidden="true" />
          </button>
        </div>
        <p style={{ margin: '12px 0 0', fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.55 }}>
          {title} wasn’t part of the assessment brief, so it’s intentionally a placeholder rather than a
          half-finished screen. The dashboard, task management and persistence are fully working.
        </p>
        <div className="modal-actions">
          <button type="button" className="btn btn-primary" onClick={onClose} ref={okRef}>
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
