import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LiquidGlass } from './ui/liquid-glass';
import SceneErrorBoundary from './3d/SceneErrorBoundary';

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
          <article
            data-stack-card
            aria-label={card.title}
            className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border bg-surface/95 p-5 sm:p-10 shadow-2xl transition-transform motion-reduce:transform-none"
            style={{
              boxShadow: '0 24px 60px -24px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(237, 232, 220, 0.08)',
            }}
          >
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${card.accent}, transparent)` }}
            />

            <SceneErrorBoundary
              fallback={
                <span className="inline-flex items-center gap-2 px-3 py-1 text-xs tracking-wide text-ivory/90 rounded-full bg-surface border border-border">
                  <span aria-hidden className="size-2 rounded-full" style={{ background: card.accent }} />
                  {card.place}
                </span>
              }
            >
              <LiquidGlass
                tint={0.12}
                scale={16}
                bevelDepth={8}
                aberration={1}
                contentClassName="flex items-center gap-2 px-3 py-1 text-xs tracking-wide text-ivory/90 font-medium"
                className="inline-block"
              >
                <span aria-hidden className="size-2 rounded-full" style={{ background: card.accent }} />
                {card.place}
              </LiquidGlass>
            </SceneErrorBoundary>

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
              <SceneErrorBoundary
                fallback={
                  <span className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-bg bg-brass rounded-full shadow-md">
                    Read its story &rarr;
                  </span>
                }
              >
                <LiquidGlass
                  tint={0.16}
                  scale={20}
                  bevelDepth={10}
                  aberration={2}
                  contentClassName="px-6 py-3 text-sm font-bold text-ivory group-hover:text-brass transition-colors"
                >
                  Read its story &rarr;
                </LiquidGlass>
              </SceneErrorBoundary>
            </Link>
          </article>
        </div>
      ))}
    </div>
  );
}
