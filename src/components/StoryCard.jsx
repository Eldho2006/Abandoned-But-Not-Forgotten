import { Link } from 'react-router-dom';
import Glass from './ui/Glass';

function PlanetIcon({ planet }) {
  if (planet === 'Mars') {
    return (
      <svg
        className="w-5 h-5 text-terracotta flex-shrink-0"
        viewBox="0 0 24 24"
        fill="currentColor"
        role="img"
        aria-label="Mars icon"
      >
        <circle cx="12" cy="12" r="9" />
        <path
          d="M7 10c2-1 4-1 6 0M9 14c3 1 5 0 6-1"
          stroke="#6E3A24"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    );
  }

  return (
    <svg
      className="w-5 h-5 text-silver flex-shrink-0"
      viewBox="0 0 24 24"
      fill="currentColor"
      role="img"
      aria-label="Moon icon"
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="9" cy="9" r="1.5" fill="#5A626E" />
      <circle cx="14" cy="13" r="2" fill="#5A626E" />
      <circle cx="9" cy="15" r="1.2" fill="#5A626E" />
    </svg>
  );
}

export default function StoryCard({ story }) {
  if (!story) return null;
  const isMars = story.planet === 'Mars';

  return (
    <Glass
      variant="panel"
      className="flex flex-col justify-between group p-6 sm:p-8 hover:border-brass/50 transition-all duration-200"
    >
      <div>
        <div className="flex items-center justify-between gap-3 mb-5">
          <Glass
            variant="chip"
            contentClassName={`px-2.5 py-1 text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 ${
              isMars ? 'text-terracotta' : 'text-silver'
            }`}
          >
            <PlanetIcon planet={story.planet} />
            <span>{story.planet}</span>
          </Glass>
          <span className="text-xs px-3 py-1 bg-surface-alt text-muted rounded-full font-medium border border-border">
            {story.mission}
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-normal text-ivory mb-3 tracking-tight group-hover:text-brass transition-colors duration-150">
          {story.name}
        </h2>

        <p className="text-base sm:text-lg text-muted italic font-normal mb-8 leading-relaxed">
          &ldquo;{story.hook}&rdquo;
        </p>
      </div>

      <div className="pt-2">
        <Link
          to={`/story/${story.id}`}
          className="w-full inline-block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:ring-brass"
          aria-label={`Hear the story of ${story.name}`}
        >
          <Glass
            variant="button"
            contentClassName="w-full py-3 px-6 flex items-center justify-center font-bold text-base sm:text-lg text-ivory group-hover:text-brass transition-colors gap-2"
          >
            Hear its story &rarr;
          </Glass>
        </Link>
      </div>
    </Glass>
  );
}
