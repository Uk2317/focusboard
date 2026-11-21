export default function StatCard({ icon: Icon, tone, value, title, sub }) {
  return (
    <div className="stat-card">
      <span className={`stat-icon tone-${tone}`}>
        <Icon size={21} strokeWidth={2} aria-hidden="true" />
      </span>
      <span className="stat-body">
        <span className="stat-num">{value}</span>
        <span className="stat-title">{title}</span>
        <span className="stat-sub">{sub}</span>
      </span>
    </div>
  );
}
