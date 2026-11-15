import { Link } from 'react-router-dom';
import StoryCard from '../components/StoryCard';
import HeroPlanet from '../components/3d/HeroPlanet';
import storiesData from '../data/stories.json';
import { ui } from '../styles/theme';

export default function Home() {
  return (
    <div className="star-field min-h-screen text-slate-100 flex flex-col font-sans">
      {/* Top Navigation */}
      <header className="w-full border-b border-navy-700 bg-navy-950/80 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-white hover:text-space-cyan transition-colors"
          >
            Echoes of Space
          </Link>
          <nav className="flex items-center gap-4 sm:gap-8 text-sm sm:text-base font-semibold">
            <Link to="/compare" className="text-slate-300 hover:text-space-cyan transition-colors rounded px-1">
              Compare
            </Link>
            <Link to="/quiz" className="text-slate-300 hover:text-space-cyan transition-colors rounded px-1">
              Quiz
            </Link>
            <Link to="/sources" className="text-slate-300 hover:text-space-cyan transition-colors rounded px-1">
              Sources
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-12 sm:py-20 space-y-16 sm:space-y-24">
        {/* Hero Section with 3D planet behind headline */}
        <section className="relative text-center max-w-3xl mx-auto">
          <div className="absolute inset-0 -top-8 sm:-top-16 flex items-center justify-center opacity-30 sm:opacity-40 -z-10 h-72 sm:h-96">
            <HeroPlanet body="mars" />
          </div>
          <div className="relative z-10">
            <span className="inline-block px-3.5 py-1 mb-5 text-xs sm:text-sm font-semibold tracking-wider uppercase bg-navy-800 text-space-cyan rounded-full border border-navy-700 shadow-sm">
              Interactive Space Museum
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-white leading-[1.08] mb-6">
              Machines we left behind.{' '}
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-space-cyan via-sky-300 to-indigo-300">
                Stories worth remembering.
              </span>
            </h1>
            <p className="text-base sm:text-xl text-slate-300 leading-relaxed font-normal max-w-[65ch] mx-auto">
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
          <p className="text-sm text-slate-400 mb-4 font-medium">
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
