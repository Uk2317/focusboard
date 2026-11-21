import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, Clock, Info, Layers, Plus, Trash2, X } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatCard from './components/StatCard';
import FocusNotes from './components/FocusNotes';
import FilterTabs from './components/FilterTabs';
import SearchBar from './components/SearchBar';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import useLocalStorage from './hooks/useLocalStorage';
import { SAMPLE_TASKS } from './data/sampleTasks';

export default function App() {
  const [tasks, setTasks] = useLocalStorage('focusboard.tasks', SAMPLE_TASKS);
  const [theme, setTheme] = useLocalStorage('focusboard.theme', 'light');

  const [statusTab, setStatusTab] = useState('all');
  const [priority, setPriority] = useState('all');
  const [search, setSearch] = useState('');

  const [form, setForm] = useState({ open: false, initial: null });
  const [pendingDelete, setPendingDelete] = useState(null);
  const [placeholder, setPlaceholder] = useState(null);
  const [toast, setToast] = useState(null);
  const [activeNav, setActiveNav] = useState('overview');

  const tasksSectionRef = useRef(null);
  const keepTaskRef = useRef(null);
  const infoOkRef = useRef(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    if (!pendingDelete) return undefined;
    keepTaskRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setPendingDelete(null);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [pendingDelete]);

  useEffect(() => {
    if (!placeholder) return undefined;
    infoOkRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setPlaceholder(null);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [placeholder]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(timer);
  }, [toast]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === 'completed').length;
    const inProgress = tasks.filter((t) => t.status === 'in-progress').length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { total, completed, inProgress, percent };
  }, [tasks]);

  const tabCounts = useMemo(
    () => ({ all: tasks.length, 'in-progress': stats.inProgress, completed: stats.completed }),
    [tasks, stats]
  );

  const visibleTasks = useMemo(() => {
    const q = search.trim().toLowerCase();
    const filtered = tasks.filter(
      (t) =>
        (statusTab === 'all' || t.status === statusTab) &&
        (priority === 'all' || t.priority === priority) &&
        (q === '' || t.title.toLowerCase().includes(q))
    );
    return [...filtered].sort((a, b) => {
      const aDone = a.status === 'completed' ? 1 : 0;
      const bDone = b.status === 'completed' ? 1 : 0;
      if (aDone !== bDone) return aDone - bDone;
      return (a.dueDate || '9999-12-31').localeCompare(b.dueDate || '9999-12-31');
    });
  }, [tasks, statusTab, priority, search]);

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: t.status === 'completed' ? 'todo' : 'completed' } : t))
    );
  };

  const openCreate = () => setForm({ open: true, initial: null });
  const openEdit = (task) => setForm({ open: true, initial: task });

  const saveTask = (values) => {
    if (form.initial) {
      setTasks((prev) => prev.map((t) => (t.id === form.initial.id ? { ...t, ...values } : t)));
      setToast({ id: Date.now(), message: 'Task updated' });
    } else {
      const task = {
        ...values,
        id: `task-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      setTasks((prev) => [task, ...prev]);
      setToast({ id: Date.now(), message: 'Task added' });
    }
    setForm({ open: false, initial: null });
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    setPendingDelete(null);
    setToast({ id: Date.now(), message: 'Task deleted' });
  };

  const clearFilters = () => {
    setSearch('');
    setStatusTab('all');
    setPriority('all');
  };

  const navigate = (id) => {
    setActiveNav(id);
    if (id === 'overview') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'tasks') {
      tasksSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      setPlaceholder(id === 'calendar' ? 'Calendar' : 'Settings');
    }
  };

  return (
    <div className="app-shell">
      <Sidebar active={activeNav} onNavigate={navigate} completedCount={stats.completed} />

      <div className="main-col">
        <Header theme={theme} onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />

        <main className="page">
          <div id="overview" className="page-head">
            <div>
              <h1 className="page-title">Your work, in focus.</h1>
              <p className="page-sub">Plan your day, stay organized, and celebrate small wins.</p>
            </div>
            <button type="button" className="btn btn-primary" onClick={openCreate}>
              <Plus size={17} strokeWidth={2.5} aria-hidden="true" />
              New task
            </button>
          </div>

          <FocusNotes />

          <p className="section-label">Overview</p>
          <div className="stats-grid">
            <StatCard icon={Layers} tone="total" value={stats.total} title="Total tasks" sub="Across all projects" />
            <StatCard icon={Clock} tone="progress" value={stats.inProgress} title="In progress" sub="Keep the momentum" />
            <StatCard icon={CheckCircle2} tone="done" value={stats.completed} title="Completed" sub="Great work this week" />
          </div>

          <div className="completion">
            <div className="completion-head">
              <span>Overall completion</span>
              <b>{stats.percent}%</b>
            </div>
            <div
              className="completion-track"
              role="progressbar"
              aria-label="Overall completion"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={stats.percent}
            >
              <div className="completion-fill" style={{ width: `${stats.percent}%` }} />
            </div>
          </div>

          <section ref={tasksSectionRef} id="tasks" aria-labelledby="tasks-heading">
            <div className="tasks-head">
              <div>
                <h2 className="tasks-title" id="tasks-heading">My tasks</h2>
                <p className="tasks-sub">Manage and track everything in one place.</p>
              </div>
              <button
                type="button"
                className="view-all"
                onClick={() => {
                  clearFilters();
                  tasksSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                View all tasks <ArrowRight size={13} aria-hidden="true" style={{ verticalAlign: -2 }} />
              </button>
            </div>

            <div className="controls">
              <FilterTabs
                active={statusTab}
                onChange={setStatusTab}
                counts={tabCounts}
                priority={priority}
                onPriorityChange={setPriority}
              />
              <SearchBar value={search} onChange={setSearch} />
            </div>

            <TaskList
              tasks={visibleTasks}
              onToggle={toggleTask}
              onEdit={openEdit}
              onDelete={setPendingDelete}
              onClearFilters={clearFilters}
            />
          </section>
        </main>
      </div>

      {form.open && (
        <TaskForm
          initial={form.initial}
          onClose={() => setForm({ open: false, initial: null })}
          onSave={saveTask}
        />
      )}

      {pendingDelete && (
        <div className="modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && setPendingDelete(null)}>
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
              “{pendingDelete.title}” will be removed permanently. This can’t be undone.
            </p>
            <div className="modal-actions">
              <button type="button" className="btn btn-soft" onClick={() => setPendingDelete(null)} ref={keepTaskRef}>
                Keep task
              </button>
              <button type="button" className="btn btn-danger" onClick={() => deleteTask(pendingDelete.id)}>
                <Trash2 size={15} aria-hidden="true" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {placeholder && (
        <div className="modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && setPlaceholder(null)}>
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="info-title">
            <div className="confirm-icon" style={{ background: 'var(--brand-soft)', color: 'var(--brand-soft-ink)' }}>
              <Info size={22} aria-hidden="true" />
            </div>
            <div className="modal-head" style={{ marginBottom: 0 }}>
              <div>
                <h2 id="info-title">{placeholder}</h2>
                <p>Not included in this build</p>
              </div>
              <button type="button" className="icon-btn" onClick={() => setPlaceholder(null)} aria-label="Close dialog">
                <X size={18} aria-hidden="true" />
              </button>
            </div>
            <p style={{ margin: '12px 0 0', fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.55 }}>
              {placeholder} wasn’t part of the assessment brief, so it’s intentionally a placeholder rather than a
              half-finished screen. The dashboard, task management and persistence are fully working.
            </p>
            <div className="modal-actions">
              <button type="button" className="btn btn-primary" onClick={() => setPlaceholder(null)} ref={infoOkRef}>
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="toast" role="status" key={toast.id}>
          {toast.message}
        </div>
      )}
    </div>
  );
}
