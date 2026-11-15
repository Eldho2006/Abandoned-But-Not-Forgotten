import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Glass from './ui/Glass';

gsap.registerPlugin(ScrollTrigger);

export type MissionCard = {
  id: string;
  title: string;
  /** e.g. "Mars" or "Moon" */
  place: string;
  hook?: string;
  /** null/undefined when the story has no planned lifespan */
  planned?: string | null;
  /** shown instead of planned when planned is null */
  plannedFallback?: string;
  actual?: string | null;
  endEvent?: string | null;
  /** any CSS colour; pass a theme token such as "#C97B5A" */
  accent: string;
};

/**
 * Stacked scroll cards. Each card is sticky; as the next card slides up,
 * the one beneath it scales down slightly.
 */
export default function StackedMissionCards({ cards }: { cards: MissionCard[] }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const wrappers = gsap.utils.toArray<HTMLElement>('[data-stack-wrap]');
      const inners = gsap.utils.toArray<HTMLElement>('[data-stack-card]');
      inners.forEach((card, i) => {
        const next = wrappers[i + 1];
        if (!next) return;
        const target = 1 - (inners.length - 1 - i) * 0.04;
        gsap.to(card, {
          scale: target,
          ease: 'none',
          transformOrigin: 'center top',
          scrollTrigger: {
            trigger: next,
            start: 'top bottom',
            end: 'top 25%',
            scrub: true,
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, [cards.length]);

  return (
    <div ref={rootRef} className="relative mx-auto w-full max-w-4xl px-4">
      {cards.map((card, i) => (
        <div
          key={card.id}
          data-stack-wrap
          className="sticky mb-[8vh] last:mb-0"
          style={{
            top: `calc(4.75rem + ${i * 1.25}rem)`,
            zIndex: 10 + i,
          }}
        >
          <Glass
            variant="panel"
            data-stack-card
            aria-label={card.title}
            className="p-5 sm:p-10 transition-transform motion-reduce:transform-none"
          >
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${card.accent}, transparent)` }}
            />

            <Glass
              variant="chip"
              contentClassName="flex items-center gap-2 px-3 py-1 text-xs tracking-wide text-ivory/90 font-medium"
              className="inline-block"
            >
              <span aria-hidden className="size-2 rounded-full" style={{ background: card.accent }} />
              {card.place}
            </Glass>

            <h3 className="mt-4 font-serif text-3xl text-ivory sm:text-4xl font-normal">{card.title}</h3>
            {card.hook ? <p className="mt-2 max-w-prose text-sm sm:text-base text-muted">{card.hook}</p> : null}

            <dl className="mt-6 sm:mt-8 grid gap-4 sm:gap-6 sm:grid-cols-3">
              <div>
                <dt className="text-xs uppercase tracking-widest text-muted font-bold">Planned</dt>
                <dd className="mt-1 text-sm sm:text-base text-ivory font-medium">
                  {card.planned ?? card.plannedFallback ?? 'Not applicable'}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-muted font-bold">Actual</dt>
                <dd className="mt-1 text-sm sm:text-base text-ivory font-medium">{card.actual ?? '—'}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-muted font-bold">How it ended</dt>
                <dd className="mt-1 text-sm sm:text-base text-ivory font-medium">{card.endEvent ?? '—'}</dd>
              </div>
            </dl>

            <Link
              to={`/story/${card.id}`}
              className="group mt-6 sm:mt-8 inline-block rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:ring-brass"
            >
              <Glass
                variant="button"
                contentClassName="px-6 py-3 text-sm font-bold text-ivory group-hover:text-brass transition-colors"
              >
                Read its story &rarr;
              </Glass>
            </Link>
          </Glass>
        </div>
      ))}
    </div>
  );
}
