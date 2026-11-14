import { useState, useEffect, Fragment } from 'react';
import { useParams, useSearchParams, Link, Navigate } from 'react-router-dom';
import storiesData from '../data/stories.json';
import ChapterBlock from '../components/ChapterBlock';
import Timeline from '../components/Timeline';
import ThenNow from '../components/ThenNow';
import DustStormChart from '../components/DustStormChart';
import ChartErrorBoundary from '../components/ChartErrorBoundary';
import HeroPlanet from '../components/3d/HeroPlanet';
import { fetchAndParseDustStormData } from '../lib/parseCsv';

export default function Story() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const isDebug = searchParams.get('debug') === '1';

  const story = storiesData.find((s) => s.id === id);
  const [activeChapter, setActiveChapter] = useState(0);
  const [dustData, setDustData] = useState([]);
  const [dustLoading, setDustLoading] = useState(false);
  const [dustError, setDustError] = useState(null);

  useEffect(() => {
    if (id === 'opportunity') {
      setDustLoading(true);
      fetchAndParseDustStormData()
        .then((data) => {
          setDustData(data);
          setDustLoading(false);
        })
        .catch((err) => {
          setDustError(err?.message || 'Could not load NASA dust storm data.');
          setDustLoading(false);
        });
    }
  }, [id]);

  useEffect(() => {
    if (!story) return;
    const observers = [];
    story.chapters.forEach((_, idx) => {
      const el = document.getElementById(`chapter-${idx}`);
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveChapter(idx);
          });
        },
        { rootMargin: '-20% 0px -60% 0px', threshold: 0.1 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((obs) => obs.disconnect());
  }, [story]);

  if (!story) return <Navigate to="/404" replace />;

  const targetBody = story.planet === 'Moon' ? 'moon' : 'mars';

  const handleSelectChapter = (idx) => {
    setActiveChapter(idx);
    const el = document.getElementById(`chapter-${idx}`);
    if (el) {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
    }
  };

  return (
    <div className="star-field min-h-screen text-slate-100 flex flex-col">
      <header className="w-full border-b border-navy-700 bg-navy-950/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            to="/"
            className="text-sm sm:text-base font-bold text-space-cyan hover:text-cyan-300 transition-colors flex items-center gap-1.5 focus-visible:underline"
          >
            &larr; Back to all stories
          </Link>
          <div className="flex items-center gap-4 text-xs sm:text-sm font-semibold text-slate-300">
            <Link to="/compare" className="hover:text-space-cyan transition-colors">Compare</Link>
            <Link to="/quiz" className="hover:text-space-cyan transition-colors">Quiz</Link>
            <Link to="/sources" className="hover:text-space-cyan transition-colors">Sources</Link>
          </div>
        </div>
      </header>

      <Timeline
        chapters={story.chapters}
        activeChapter={activeChapter}
        onSelectChapter={handleSelectChapter}
      />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 sm:py-12 space-y-10 sm:space-y-12">
        {/* Story Header with matching 3D celestial body */}
        <section className="relative text-center max-w-2xl mx-auto py-2">
          <div className="absolute inset-0 -top-4 flex items-center justify-center opacity-25 sm:opacity-35 -z-10 h-56 sm:h-72">
            <HeroPlanet body={targetBody} />
          </div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-navy-900 border border-navy-700 text-xs sm:text-sm font-semibold text-slate-300">
              <span>{story.planet}</span>
              <span>&bull;</span>
              <span>{story.mission}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              {story.name}
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 font-medium italic">
              &ldquo;{story.hook}&rdquo;
            </p>
          </div>
        </section>

        <section aria-label="Story chapters" className="space-y-8">
          {story.chapters.map((chapter, idx) => (
            <Fragment key={chapter.title || idx}>
              <ChapterBlock chapter={chapter} index={idx} id={`chapter-${idx}`} />
              {story.id === 'opportunity' && idx === 3 && (
                <div id="opportunity-chart" className="pt-2">
                  <ChartErrorBoundary>
                    <DustStormChart data={dustData} loading={dustLoading} error={dustError} />
                  </ChartErrorBoundary>
                </div>
              )}
            </Fragment>
          ))}
        </section>

        <section aria-label="Planned vs Actual Lifespan">
          <ThenNow
            plannedLifespan={story.plannedLifespan}
            actualLifespan={story.actualLifespan}
            endEvent={story.endEvent}
          />
        </section>

        <section className="p-6 sm:p-8 rounded-2xl bg-navy-900/90 border border-navy-700/80 shadow-xl">
          <span className="text-xs font-bold uppercase tracking-wider text-space-cyan block mb-2">
            Big Picture
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white mb-3">
            Why it matters
          </h3>
          <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-[65ch]">
            {story.whyItMatters}
          </p>
        </section>

        {isDebug && story.verifyNotes && (
          <aside
            aria-label="Debug Verification Notes"
            className="p-4 rounded-xl bg-amber-950/60 border border-amber-600/80 text-amber-200 text-xs space-y-2"
          >
            <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-amber-400">
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Debug Mode: Verification Notes
            </div>
            <ul className="list-disc pl-5 space-y-1">
              {story.verifyNotes.map((note, i) => (
                <li key={i}>{note}</li>
              ))}
            </ul>
          </aside>
        )}

        <nav className="pt-6 border-t border-navy-700 flex flex-wrap justify-between gap-4 text-sm font-semibold">
          <Link to="/" className="text-slate-400 hover:text-white transition-colors">
            &larr; Back to all machines
          </Link>
          <div className="flex gap-4">
            <Link to="/compare" className="text-space-cyan hover:text-cyan-300">
              Compare machines &rarr;
            </Link>
            <Link to="/quiz" className="text-space-cyan hover:text-cyan-300">
              Take Quiz &rarr;
            </Link>
          </div>
        </nav>
      </main>
    </div>
  );
}
