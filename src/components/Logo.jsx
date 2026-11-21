// The FocusBoard mark. SVG file lives in assets/ and doubles as the favicon.
import logo from '../assets/logo.svg';

export default function Logo({ className = 'brand-mark' }) {
  return <img className={className} src={logo} alt="FocusBoard logo" width="64" height="64" />;
}
