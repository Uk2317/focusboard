const STATUS_TABS = [
  { value: 'all', label: 'All tasks' },
  { value: 'in-progress', label: 'In progress' },
  { value: 'completed', label: 'Completed' },
];

export default function FilterTabs({ active, onChange, counts }) {
  return (
    <div className="tabs" role="group" aria-label="Filter by status">
      {STATUS_TABS.map((tab) => (
        <button
          key={tab.value}
          type="button"
          className={`tab${active === tab.value ? ' active' : ''}`}
          aria-pressed={active === tab.value}
          onClick={() => onChange(tab.value)}
        >
          {tab.label}
          <span className="tab-count">{counts[tab.value]}</span>
        </button>
      ))}
    </div>
  );
}
