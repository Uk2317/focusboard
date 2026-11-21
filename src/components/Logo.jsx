// The FocusBoard mark, drawn as inline SVG so it scales crisply everywhere.
export default function Logo({ className = 'brand-mark' }) {
  return (
    <svg className={className} viewBox="0 0 64 64" role="img" aria-label="FocusBoard logo">
      <defs>
        <linearGradient id="fb-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6d44e8" />
          <stop offset="1" stopColor="#9775fa" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="url(#fb-g)" />
      <rect x="14" y="14" width="16" height="16" rx="5" fill="#fff" />
      <rect x="36" y="14" width="14" height="14" rx="5" fill="#fff" fillOpacity="0.55" />
      <rect x="14" y="36" width="14" height="14" rx="5" fill="#fff" fillOpacity="0.55" />
      <rect x="34" y="34" width="16" height="16" rx="5" fill="#fff" />
    </svg>
  );
}
