import { Link } from 'react-router-dom';
import storiesData from '../data/stories.json';

export default function CompareTable() {
  return (
    <section aria-labelledby="compare-table-heading" className="space-y-6 pt-8">
      <div className="border-b border-border pb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-brass block mb-1">
          Historical Reference
        </span>
        <h2 id="compare-table-heading" className="font-serif text-2xl sm:text-3xl font-normal text-ivory">
          Complete Mission Record
        </h2>
        <p className="text-xs sm:text-sm text-muted mt-1">
          Verified timeline and lifespan details from official NASA documentation.
        </p>
      </div>

      <div
        tabIndex={0}
        role="region"
        aria-label="Mission comparison data table"
        className="overflow-x-auto rounded-2xl border border-border bg-surface/90 shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass"
      >
        <table className="w-full text-left border-collapse min-w-[720px]">
          <caption className="sr-only">
            Detailed comparison of Opportunity, Apollo 11 Eagle, and Sojourner missions
          </caption>
          <thead>
            <tr className="border-b border-border bg-surface-alt/70 text-xs uppercase tracking-wider text-muted font-semibold">
              <th scope="col" className="px-5 py-4">Machine</th>
              <th scope="col" className="px-5 py-4">Planet</th>
              <th scope="col" className="px-5 py-4">Launch</th>
              <th scope="col" className="px-5 py-4">Landing</th>
              <th scope="col" className="px-5 py-4">Planned</th>
              <th scope="col" className="px-5 py-4">Actual</th>
              <th scope="col" className="px-5 py-4">How It Ended</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-sm text-ivory">
            {storiesData.map((story) => {
              const isMoon = story.planet === 'Moon';
              const plannedText =
                story.plannedLifespan ||
                'Designed to stay behind (permanent base & historical artifact)';

              return (
                <tr key={story.id} className="hover:bg-surface-alt/40 transition-colors">
                  <th scope="row" className="px-5 py-4 font-normal">
                    <Link
                      to={`/story/${story.id}`}
                      className="font-serif text-base sm:text-lg text-ivory hover:text-brass transition-colors underline decoration-border hover:decoration-brass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass rounded px-0.5"
                    >
                      {story.name}
                    </Link>
                  </th>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        isMoon
                          ? 'bg-silver/10 text-silver border border-silver/20'
                          : 'bg-terracotta/10 text-terracotta border border-terracotta/20'
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`size-1.5 rounded-full ${isMoon ? 'bg-silver' : 'bg-terracotta'}`}
                      />
                      {story.planet}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs sm:text-sm text-ivory/90 leading-snug">
                    {story.launchDate}
                  </td>
                  <td className="px-5 py-4 text-xs sm:text-sm text-ivory/90 leading-snug">
                    {story.landingDate}
                  </td>
                  <td className="px-5 py-4 text-xs sm:text-sm text-ivory/90 font-medium">
                    {plannedText}
                  </td>
                  <td className="px-5 py-4 text-xs sm:text-sm text-brass font-bold">
                    {story.actualLifespan}
                  </td>
                  <td className="px-5 py-4 text-xs sm:text-sm text-muted leading-relaxed max-w-xs">
                    {story.endEvent}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
