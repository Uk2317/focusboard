// Seed data used only when localStorage is empty — see App.jsx.
// Dates are ISO strings so sorting stays a plain string compare.
export const SAMPLE_TASKS = [
  {
    id: 'task-001',
    title: 'Design landing page',
    description: 'Website redesign · hero, pricing and FAQ sections',
    category: 'Design',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2026-11-23',
    createdAt: '2026-11-09T09:30:00',
  },
  {
    id: 'task-002',
    title: 'Fix mobile navigation',
    description: 'Frontend sprint · bottom bar overlaps the CTA at 390px',
    category: 'Development',
    status: 'in-progress',
    priority: 'medium',
    dueDate: '2026-11-24',
    createdAt: '2026-11-10T14:15:00',
  },
  {
    id: 'task-003',
    title: 'Refactor API client',
    description: 'Split the fetch wrapper into small typed modules',
    category: 'Development',
    status: 'todo',
    priority: 'high',
    dueDate: '2026-11-22',
    createdAt: '2026-11-11T10:05:00',
  },
  {
    id: 'task-004',
    title: 'Review onboarding copy',
    description: 'Tighten first-run empty states and the welcome email',
    category: 'Content',
    status: 'completed',
    priority: 'low',
    dueDate: '2026-11-18',
    createdAt: '2026-11-02T11:40:00',
  },
  {
    id: 'task-005',
    title: 'Prepare launch checklist',
    description: 'QA pass, analytics events and rollback plan',
    category: 'Marketing',
    status: 'todo',
    priority: 'medium',
    dueDate: '2026-11-28',
    createdAt: '2026-11-15T16:20:00',
  },
  {
    id: 'task-006',
    title: 'Dark mode pass on settings',
    description: 'Contrast audit for the billing and profile screens',
    category: 'Design',
    status: 'in-progress',
    priority: 'low',
    dueDate: '2026-11-30',
    createdAt: '2026-11-16T09:10:00',
  },
  {
    id: 'task-007',
    title: 'Customer interview synthesis',
    description: 'Tag 12 interviews, pull quotes for the churn deck',
    category: 'Research',
    status: 'completed',
    priority: 'medium',
    dueDate: '2026-11-14',
    createdAt: '2026-10-30T13:45:00',
  },
  {
    id: 'task-008',
    title: 'Draft November changelog',
    description: 'Summarise released features for the customer newsletter',
    category: 'Content',
    status: 'todo',
    priority: 'low',
    dueDate: '2026-12-02',
    createdAt: '2026-11-17T15:30:00',
  },
  {
    id: 'task-009',
    title: 'QA onboarding flow on Android',
    description: 'Walked the whole flow on a mid-range device, filed 4 bugs',
    category: 'Development',
    status: 'completed',
    priority: 'high',
    dueDate: '2026-11-10',
    createdAt: '2026-10-26T08:25:00',
  },
];

export const TASK_STATUSES = [
  { value: 'todo', label: 'To do' },
  { value: 'in-progress', label: 'In progress' },
  { value: 'completed', label: 'Completed' },
];

export const TASK_PRIORITIES = [
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

export const TASK_CATEGORIES = ['Design', 'Development', 'Content', 'Research', 'Marketing'];
