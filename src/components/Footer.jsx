import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full py-6 px-4 border-t border-border bg-bg/90 mt-auto text-center sm:text-left">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-muted">
        <p>Not affiliated with or endorsed by NASA. Data and images: NASA/JPL-Caltech unless stated.</p>
        <Link
          to="/sources"
          className="text-brass hover:text-brass-hover font-semibold underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass rounded px-1"
        >
          Sources &amp; AI Disclosure
        </Link>
      </div>
    </footer>
  );
}
