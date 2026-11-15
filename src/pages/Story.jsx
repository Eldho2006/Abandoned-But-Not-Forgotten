import { useState, useEffect, Fragment } from 'react';
import { useParams, Link, Navigate, useSearchParams } from 'react-router-dom';
import StoryPlanetBackground from '../components/3d/StoryPlanetBackground';
import Timeline from '../components/Timeline';
import ChapterBlock from '../components/ChapterBlock';
import DustStormChart from '../components/DustStormChart';
import ChartErrorBoundary from '../components/ChartErrorBoundary';
import ThenNow from '../components/ThenNow';
import MissionCertificateSection from '../components/MissionCertificateSection';
import Glass from '../components/ui/Glass';
import storiesData from '../data/stories.json';
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
        .then((merged) => {
          setDustData(merged);
          setDustLoading(false);
        })
        .catch((err) => {
          setDustError(err.message || 'Failed to load storm data');
          setDustLoading(false);
        });
    }
  }, [id]);

  useEffect(() => {
    if (!story) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute('data-chapter-index'));
          if (!isNaN(index)) setActiveChapter(index);
        }
      });
    }, { rootMargin: '-20% 0px -60% 0px' });

    story.chapters.forEach((_, idx) => {
      const el = document.getElementById(`chapter-${idx}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [story]);

  if (!story) return <Navigate to="/" replace />;

  const isMoon = story.planet === 'Moon';
  const targetBody = isMoon ? 'moon' : 'mars';

  const handleSelectChapter = (idx) => {
    setActiveChapter(idx);
    const el = document.getElementById(`chapter-${idx}`);
    if (el) {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen text-ivory flex flex-col font-sans">
      <StoryPlanetBackground body={targetBody} activeChapter={activeChapter} />

      <header className="w-full border-b border-border bg-bg/85 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            to="/"
            className="text-sm sm:text-base font-bold text-brass hover:text-brass-hover transition-colors flex items-center gap-1.5 focus-visible:underline"
          >
            &larr; Back to all stories
          </Link>
          <nav aria-label="Story navigation">
            <Glass variant="pill" contentClassName="flex items-center gap-3 sm:gap-6 px-4 py-1.5 text-xs sm:text-sm font-semibold">
              <Link to="/compare" className="text-muted hover:text-brass transition-colors">Compare</Link>
              <Link to="/quiz" className="text-muted hover:text-brass transition-colors">Quiz</Link>
              <Link to="/sources" className="text-muted hover:text-brass transition-colors">Sources</Link>
            </Glass>
          </nav>
        </div>
      </header>

      <Timeline
        chapters={story.chapters}
        activeChapter={activeChapter}
        onSelectChapter={handleSelectChapter}
      />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12 sm:py-20 space-y-12 sm:space-y-16">
        <section className="text-center max-w-2xl mx-auto py-4">
          <Glass
            variant="chip"
            contentClassName="inline-flex items-center gap-2 px-3.5 py-1 mb-4 text-xs sm:text-sm font-semibold text-muted"
          >
            <span className={isMoon ? 'text-silver' : 'text-terracotta'}>{story.planet}</span>
            <span>&bull;</span>
            <span>{story.mission}</span>
          </Glass>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-ivory tracking-tight leading-[1.08] mb-4">
            {story.name}
          </h1>
          <p className="text-base sm:text-xl text-muted italic font-normal max-w-[65ch] mx-auto">
            &ldquo;{story.hook}&rdquo;
          </p>
        </section>

        <section aria-label="Story Chapters" className="space-y-10 sm:space-y-14">
          {story.chapters.map((chapter, idx) => (
            <Fragment key={chapter.title || idx}>
              <div data-chapter-index={idx} id={`chapter-${idx}`}>
                <ChapterBlock chapter={chapter} index={idx} id={`chapter-block-${idx}`} />
              </div>
              {story.id === 'opportunity' && chapter.title === 'The storm' && (
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

        <Glass variant="panel" className="p-6 sm:p-10">
          <div className="max-w-[65ch] mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-brass block mb-2">
              Big Picture
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-ivory mb-4 tracking-tight leading-snug">
              Why it matters
            </h2>
            <p className="text-base sm:text-lg text-ivory/90 leading-relaxed font-normal">
              {story.whyItMatters}
            </p>
          </div>
        </Glass>

        <MissionCertificateSection story={story} />

        {isDebug && story.verifyNotes && (
          <aside
            aria-label="Debug Verification Notes"
            className="p-4 rounded-xl bg-surface border border-terracotta/60 text-ivory text-xs space-y-2"
          >
            <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-terracotta">
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Debug Mode: Verification Notes
            </div>
            <ul className="list-disc pl-5 space-y-1 text-muted">
              {story.verifyNotes.map((note, i) => (
                <li key={i}>{note}</li>
              ))}
            </ul>
          </aside>
        )}

        <nav className="pt-8 border-t border-border flex flex-wrap justify-between gap-4 text-sm font-semibold">
          <Link to="/" className="text-muted hover:text-ivory transition-colors">
            &larr; Back to all machines
          </Link>
          <div className="flex gap-4">
            <Link to="/compare" className="text-brass hover:text-brass-hover">
              Compare machines &rarr;
            </Link>
            <Link to="/quiz" className="text-brass hover:text-brass-hover">
              Take Quiz &rarr;
            </Link>
          </div>
        </nav>
      </main>
    </div>
  );
}
