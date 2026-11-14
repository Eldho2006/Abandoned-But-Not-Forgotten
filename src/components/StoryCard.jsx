import { Link } from 'react-router-dom';

function PlanetIcon({ planet }) {
  if (planet === 'Mars') {
    return (
      <svg
        className="w-8 h-8 text-orange-400 flex-shrink-0"
        viewBox="0 0 24 24"
        fill="currentColor"
        role="img"
        aria-label="Mars icon"
      >
        <circle cx="12" cy="12" r="9" />
        <path
          d="M7 10c2-1 4-1 6 0M9 14c3 1 5 0 6-1"
          stroke="#7c2d12"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    );
  }

  return (
    <svg
      className="w-8 h-8 text-slate-300 flex-shrink-0"
      viewBox="0 0 24 24"
      fill="currentColor"
      role="img"
      aria-label="Moon icon"
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="9" cy="9" r="1.5" fill="#475569" />
      <circle cx="14" cy="13" r="2" fill="#475569" />
      <circle cx="9" cy="15" r="1.2" fill="#475569" />
    </svg>
  );
}

export default function StoryCard({ story }) {
  if (!story) return null;

  return (
    <article className="flex flex-col justify-between bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 shadow-xl hover:border-sky-500/60 transition-colors duration-200">
      <div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <PlanetIcon planet={story.planet} />
            <span className="text-sm font-semibold tracking-wider uppercase text-slate-300">
              {story.planet}
            </span>
          </div>
          <span className="text-xs px-2.5 py-1 bg-slate-800 text-slate-300 rounded-full font-medium border border-slate-700">
            {story.mission}
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 tracking-tight">
          {story.name}
        </h2>

        <p className="text-base sm:text-lg text-sky-200/90 italic font-medium mb-6 leading-snug">
          &ldquo;{story.hook}&rdquo;
        </p>
      </div>

      <div className="pt-2">
        <Link
          to={`/story/${story.id}`}
          className="inline-flex items-center justify-center w-full min-h-[48px] px-6 py-3 text-base sm:text-lg font-bold text-slate-950 bg-sky-400 hover:bg-sky-300 focus:outline-none focus:ring-4 focus:ring-sky-500/50 rounded-xl transition duration-150 shadow-md active:scale-[0.98]"
          aria-label={`Hear the story of ${story.name}`}
        >
          Hear its story &rarr;
        </Link>
      </div>
    </article>
  );
}
