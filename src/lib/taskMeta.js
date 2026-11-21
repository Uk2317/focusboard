
export const PRIORITY_META = {
  high: { label: 'High', className: 'pill pill-high' },
  medium: { label: 'Medium', className: 'pill pill-medium' },
  low: { label: 'Low', className: 'pill pill-low' },
};

export const STATUS_LABEL = {
  todo: 'To do',
  'in-progress': 'In progress',
  completed: 'Completed',
};

export const CATEGORY_CLASS = {
  Design: 'chip chip-design',
  Development: 'chip chip-development',
  Content: 'chip chip-content',
  Research: 'chip chip-research',
  Marketing: 'chip chip-marketing',
};

export function formatDueDate(isoDate) {
  if (!isoDate) return '';
  const d = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(d.getTime())) return isoDate;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export function dueState(isoDate, status) {
  if (!isoDate || status === 'completed') return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(due.getTime())) return null;
  const diffDays = Math.round((due - today) / 86400000);
  if (diffDays < 0) return { label: 'Overdue', tone: 'overdue' };
  if (diffDays <= 3) return { label: 'Due soon', tone: 'soon' };
  return null;
}
