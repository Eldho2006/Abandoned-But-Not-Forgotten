import { Link } from 'react-router-dom';
import HeroPlanet from '../components/3d/HeroPlanet';
import Glass from '../components/ui/Glass';
import StackedMissionCards from '../components/StackedMissionCards';
import CompareTable from '../components/CompareTable';
import storiesData from '../data/stories.json';
import { palette } from '../styles/theme';

export default function Compare() {
  const missionCards = storiesData.map((s) => ({
    id: s.id,
    title: s.name,
    place: s.planet,
    hook: s.hook,
    planned: s.plannedLifespan,
    plannedFallback:
      'This machine was intentionally designed to stay behind as a permanent base and historical artifact.',
    actual: s.actualLifespan,
    endEvent: s.endEvent,
    accent: s.planet === 'Moon' ? palette.silver : palette.terracotta,
  }));

  return (
    <div className="star-field min-h-screen text-ivory flex flex-col font-sans relative overflow-x-hidden">
      {/* Soft background ambient glows for glass refraction */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] h-[480px] bg-[radial-gradient(ellipse_at_center,_rgba(201,169,110,0.08)_0%,_rgba(201,123,90,0.05)_45%,_transparent_70%)] blur-3xl"
      />

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
              <Link to="/quiz" className="text-muted hover:text-brass transition-colors rounded px-1">
                Quiz
              </Link>
              <Link to="/sources" className="text-muted hover:text-brass transition-colors rounded px-1">
                Sources
              </Link>
            </Glass>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-10 sm:py-16 space-y-16 sm:space-y-24">
        {/* Short Hero */}
        <section className="relative text-center max-w-3xl mx-auto min-h-[320px] sm:min-h-[360px] flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
            <HeroPlanet body="mars" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_#0B0F14_85%)]" />
          </div>

          <div className="relative z-10 px-4 py-6 max-w-2xl mx-auto space-y-4">
            <h1 className="font-serif text-4xl sm:text-6xl font-normal tracking-tight text-ivory leading-tight drop-shadow-[0_4px_16px_rgba(11,15,20,0.95)]">
              Three machines, side by side
            </h1>
            <p className="text-base sm:text-lg text-ivory/90 leading-relaxed font-normal max-w-[65ch] mx-auto drop-shadow-[0_2px_8px_rgba(11,15,20,0.95)]">
              Opportunity and Sojourner explored the plains of Mars while Apollo 11 Eagle landed on the Moon, each leaving their mark behind when their missions ended.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Glass
                variant="chip"
                contentClassName="px-3.5 py-1.5 text-xs sm:text-sm font-medium text-ivory"
              >
                3 machines
              </Glass>
              <Glass
                variant="chip"
                contentClassName="px-3.5 py-1.5 text-xs sm:text-sm font-medium text-ivory"
              >
                2 worlds
              </Glass>
              <Glass
                variant="chip"
                contentClassName="px-3.5 py-1.5 text-xs sm:text-sm font-medium text-ivory"
              >
                1 question: why did they stop?
              </Glass>
            </div>
          </div>
        </section>

        {/* Stacked Interactive Mission Cards */}
        <section aria-label="Interactive stacked mission cards">
          <StackedMissionCards cards={missionCards} />
        </section>

        {/* Plain Accessible Table */}
        <CompareTable />
      </main>
    </div>
  );
}
