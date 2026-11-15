import { Link } from 'react-router-dom';
import StoryCard from '../components/StoryCard';
import HomeOrb from '../components/3d/HomeOrb';
import Glass from '../components/ui/Glass';
import storiesData from '../data/stories.json';

export default function Home() {
  return (
    <div className="star-field min-h-screen text-ivory flex flex-col font-sans relative overflow-x-hidden">
      {/* Soft background ambient glows for glass refraction */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] h-[480px] bg-[radial-gradient(ellipse_at_center,_rgba(201,169,110,0.08)_0%,_rgba(201,123,90,0.05)_45%,_transparent_70%)] blur-3xl"
      />

      {/* Top Navigation */}
      <header className="w-full border-b border-border bg-bg/85 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            to="/"
            className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-ivory hover:text-brass transition-colors"
          >
            Echoes of Space
          </Link>
          <nav aria-label="Main navigation">
            <Glass variant="pill" contentClassName="flex items-center gap-3 sm:gap-6 px-4 py-1.5 text-xs sm:text-sm font-semibold">
              <Link to="/compare" className="text-muted hover:text-brass transition-colors rounded px-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass">
                Compare
              </Link>
              <Link to="/quiz" className="text-muted hover:text-brass transition-colors rounded px-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass">
                Quiz
              </Link>
              <Link to="/sources" className="text-muted hover:text-brass transition-colors rounded px-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass">
                Sources
              </Link>
            </Glass>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-12 sm:py-20 space-y-16 sm:space-y-24">
        {/* Hero Section with interactive 3D draggable orb behind headline */}
        <section className="relative text-center max-w-4xl mx-auto min-h-[420px] sm:min-h-[480px] flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            <HomeOrb />
          </div>
          <div className="relative z-10 pointer-events-none px-4 py-8 max-w-3xl mx-auto">
            <span className="inline-block px-3.5 py-1 mb-5 text-xs sm:text-sm font-semibold tracking-wider uppercase bg-surface/90 text-brass rounded-full border border-border shadow-sm backdrop-blur-sm">
              Interactive Space Museum
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-ivory leading-[1.08] mb-6 drop-shadow-[0_4px_16px_rgba(11,15,20,0.95)]">
              Machines we left behind.{' '}
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-brass via-ivory to-terracotta">
                Stories worth remembering.
              </span>
            </h1>
            <p className="text-base sm:text-xl text-ivory/90 leading-relaxed font-normal max-w-[65ch] mx-auto drop-shadow-[0_2px_10px_rgba(11,15,20,0.95)]">
              Listen to three legendary NASA explorers tell their own stories from Mars and the Moon, backed by real NASA data.
            </p>
          </div>
        </section>

        {/* Stories Cards Grid */}
        <section aria-label="Machine Stories">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {storiesData.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        </section>

        {/* Action Links */}
        <section className="text-center pt-4">
          <p className="text-sm text-muted mb-4 font-medium">
            Want to see all three side-by-side or test your knowledge?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/compare"
              className="rounded-xl inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:ring-brass"
            >
              <Glass variant="button" contentClassName="px-6 py-3 font-semibold text-ivory hover:text-brass transition-colors">
                Compare All Three Machines
              </Glass>
            </Link>
            <Link
              to="/quiz"
              className="rounded-xl inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:ring-brass"
            >
              <Glass variant="button" contentClassName="px-6 py-3 font-semibold text-ivory hover:text-brass transition-colors">
                Take the Space Quiz
              </Glass>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
