import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full py-6 px-4 border-t border-slate-800 bg-slate-950/80 mt-auto text-center sm:text-left">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-slate-400">
        <p>Not affiliated with or endorsed by NASA. Data and images: NASA/JPL-Caltech unless stated.</p>
        <Link
          to="/sources"
          className="text-sky-400 hover:text-sky-300 font-semibold underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-sky-400 rounded px-1"
        >
          Sources &amp; AI Disclosure
        </Link>
      </div>
    </footer>
  );
}
