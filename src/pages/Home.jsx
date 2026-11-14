import { Link } from 'react-router-dom';
import StoryCard from '../components/StoryCard';
import storiesData from '../data/stories.json';
import { ui } from '../styles/theme';

export default function Home() {
  return (
    <div className="star-field min-h-screen text-slate-100 flex flex-col">
      {/* Top Navigation */}
      <header className="w-full border-b border-navy-700 bg-navy-950/80 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <Link
            to="/"
            className="text-lg sm:text-xl font-black tracking-tight text-white hover:text-space-cyan transition-colors"
          >
            Echoes of Space
          </Link>
          <nav className="flex items-center gap-3 sm:gap-6 text-sm sm:text-base font-semibold">
            <Link
              to="/compare"
              className="text-slate-300 hover:text-space-cyan transition-colors rounded px-1"
            >
              Compare
            </Link>
            <Link
              to="/quiz"
              className="text-slate-300 hover:text-space-cyan transition-colors rounded px-1"
            >
              Quiz
            </Link>
            <Link
              to="/sources"
              className="text-slate-300 hover:text-space-cyan transition-colors rounded px-1"
            >
              Sources
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8 sm:py-16">
        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block px-3 py-1 mb-4 text-xs sm:text-sm font-bold tracking-wider uppercase bg-navy-800 text-space-cyan rounded-full border border-navy-700">
            Interactive Space Museum
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight mb-5">
            Machines we left behind.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-space-cyan via-sky-300 to-indigo-300">
              Stories worth remembering.
            </span>
          </h1>
          <p className="text-base sm:text-xl text-slate-300 leading-relaxed font-normal">
            Listen to three legendary NASA explorers tell their own stories from Mars and the Moon, backed by real NASA data.
          </p>
        </section>

        {/* Stories Cards Grid */}
        <section aria-label="Machine Stories">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {storiesData.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        </section>

        {/* Fast Action Links for Mobile */}
        <section className="mt-12 sm:mt-16 text-center">
          <p className="text-sm text-slate-400 mb-3 font-medium">
            Want to see all three side-by-side or test your knowledge?
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/compare" className={ui.buttonSecondary}>
              Compare All Three Machines
            </Link>
            <Link to="/quiz" className={ui.buttonSecondary}>
              Take the Space Quiz
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
