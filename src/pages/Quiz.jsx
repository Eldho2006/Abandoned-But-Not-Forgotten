import { Link } from 'react-router-dom';
import Glass from '../components/ui/Glass';

export default function Quiz() {
  return (
    <div className="star-field min-h-screen text-ivory flex flex-col font-sans">
      <header className="w-full border-b border-border bg-bg/85 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            to="/"
            className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-ivory hover:text-brass transition-colors"
          >
            Echoes of Space
          </Link>
          <nav aria-label="Main navigation">
            <Glass variant="pill" contentClassName="flex items-center gap-3 sm:gap-6 px-4 py-1.5 text-xs sm:text-sm font-semibold">
              <Link to="/" className="text-muted hover:text-brass transition-colors rounded px-1">
                Home
              </Link>
              <Link to="/compare" className="text-muted hover:text-brass transition-colors rounded px-1">
                Compare
              </Link>
              <Link to="/sources" className="text-muted hover:text-brass transition-colors rounded px-1">
                Sources
              </Link>
            </Glass>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full p-8">
        <h1 className="font-serif text-3xl font-normal text-ivory">Space Quiz</h1>
      </main>
    </div>
  );
}
