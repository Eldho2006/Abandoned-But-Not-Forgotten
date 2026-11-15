import { Link } from 'react-router-dom';
import AiLabel from '../components/AiLabel';
import MissionArchiveFolders from '../components/MissionArchiveFolders';
import Glass from '../components/ui/Glass';

export default function Sources() {
  return (
    <div className="star-field min-h-screen text-ivory flex flex-col font-sans relative overflow-x-hidden">
      {/* Soft background ambient glows for glass refraction */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] h-[480px] bg-[radial-gradient(ellipse_at_center,_rgba(201,169,110,0.08)_0%,_rgba(201,123,90,0.05)_45%,_transparent_70%)] blur-3xl"
      />

      <header className="w-full border-b border-border bg-bg/85 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-sm sm:text-base font-bold text-brass hover:text-brass-hover transition-colors flex items-center gap-1.5 focus-visible:underline">
            &larr; Back to Home
          </Link>
          <nav aria-label="Main navigation">
            <Glass variant="pill" contentClassName="flex items-center gap-3 sm:gap-6 px-4 py-1.5 text-xs sm:text-sm font-semibold">
              <Link to="/compare" className="text-muted hover:text-brass transition-colors">Compare</Link>
              <Link to="/quiz" className="text-muted hover:text-brass transition-colors">Quiz</Link>
            </Glass>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-12 sm:py-20 space-y-12 sm:space-y-16">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-brass block mb-2">Transparency &amp; Citations</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-ivory tracking-tight mb-3">Data Sources &amp; Disclosures</h1>
          <p className="text-muted text-sm sm:text-base max-w-[65ch] leading-relaxed">
            All data, dates, and historical measurements used in this project originate strictly from official NASA and JPL publications.
          </p>
        </div>

        {/* Interactive Mission Archive Folders */}
        <MissionArchiveFolders />

        {/* Primary Data Sources: Plain text list below the folders */}
        <section aria-labelledby="sources-heading" className="space-y-6">
          <h2 id="sources-heading" className="font-serif text-2xl sm:text-3xl font-normal text-ivory border-b border-border pb-2">Data Sources</h2>
          <div className="space-y-5">
            <Glass variant="panel" className="p-6 sm:p-7 space-y-2.5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-ivory">NASA PDS MER Pancam Derived Atmospheric Opacity Collection</h3>
                <Glass variant="chip" contentClassName="text-xs px-2.5 py-0.5 text-muted">ID PSPG-01754 / PSPG-01753</Glass>
              </div>
              <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-[65ch]">
                Atmospheric opacity (tau, 880 nm) measured by Opportunity&apos;s Pancam from Jan 27, 2004 to June 5, 2018 (8,639 rows). Cite as: NASA PDS Geosciences Node, &ldquo;MER1/MER2-M-PANCAM-5-ATMOS-OPACITY-V1.0&rdquo;.
              </p>
              <div className="flex flex-wrap gap-3 pt-1 text-xs font-semibold">
                <a href="https://nssdc.gsfc.nasa.gov/nmc/dataset/display.action?id=PSPG-01754" target="_blank" rel="noreferrer" className="text-brass hover:underline">
                  NSSDCA Dataset Catalog &rarr;
                </a>
                <a href="https://pds-geosciences.wustl.edu/mer/mer1_mer2-m-pancam-5-atmos-opacity-v1/merao_1xxx/data/" target="_blank" rel="noreferrer" className="text-brass hover:underline">
                  PDS Geosciences Node Data Folder &rarr;
                </a>
              </div>
            </Glass>

            <Glass variant="panel" className="p-6 sm:p-7 space-y-2.5">
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-ivory">JPL Opportunity Mission Status Reports &amp; Graphics</h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-[65ch]">
                Daily solar energy production (watt-hours) and storm updates, including sol 5111 final readings (22 Wh, tau 10.8).
              </p>
              <div className="flex flex-wrap gap-3 pt-1 text-xs font-semibold">
                <a href="https://science.nasa.gov/mission/mer-opportunity/stories/" target="_blank" rel="noreferrer" className="text-brass hover:underline">
                  Opportunity Stories &amp; Updates &rarr;
                </a>
                <a href="https://science.nasa.gov/resource/on-mars-light-is-energy/" target="_blank" rel="noreferrer" className="text-brass hover:underline">
                  &ldquo;On Mars, Light Is Energy&rdquo; Graphic &rarr;
                </a>
                <a href="https://photojournal.jpl.nasa.gov/catalog/PIA22930" target="_blank" rel="noreferrer" className="text-brass hover:underline">
                  Photojournal PIA22930 &rarr;
                </a>
              </div>
            </Glass>

            <Glass variant="panel" className="p-6 sm:p-7 space-y-2.5">
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-ivory">NASA Spirit and Opportunity Mission Overview</h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-[65ch]">
                Official mission overview for landings (Spirit Jan 3, 2004; Opportunity Jan 24, 2004), last contact June 10, 2018, 28.06 mi (45.16 km) driven, and driving record.
              </p>
              <div className="pt-1 text-xs font-semibold">
                <a href="https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/" target="_blank" rel="noreferrer" className="text-brass hover:underline">
                  NASA Mars Exploration Rovers Page &rarr;
                </a>
              </div>
            </Glass>

            <Glass variant="panel" className="p-6 sm:p-7 space-y-2.5">
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-ivory">NASA Apollo 11 Mission Overview</h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-[65ch]">
                Official Apollo 11 mission documentation, launch July 16, 1969, landing July 20, 1969, lunar module Eagle descent stage details, and laser ranging retroreflector experiment.
              </p>
              <div className="pt-1 text-xs font-semibold">
                <a href="https://www.nasa.gov/mission/apollo-11/" target="_blank" rel="noreferrer" className="text-brass hover:underline">
                  NASA Apollo 11 Mission Page &rarr;
                </a>
              </div>
            </Glass>

            <Glass variant="panel" className="p-6 sm:p-7 space-y-2.5">
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-ivory">NASA Mars Pathfinder &amp; Sojourner Overview</h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-[65ch]">
                Official mission overview for Mars Pathfinder and the Sojourner rover (launch Dec 4, 1996, landing July 4, 1997, Ares Vallis site, and exploration history).
              </p>
              <div className="pt-1 text-xs font-semibold">
                <a href="https://science.nasa.gov/mission/mars-pathfinder/" target="_blank" rel="noreferrer" className="text-brass hover:underline">
                  NASA Mars Pathfinder Page &rarr;
                </a>
              </div>
            </Glass>
          </div>
        </section>

        {/* AI Disclosure Statement */}
        <section aria-labelledby="ai-disclosure-heading" className="pt-4 border-t border-border">
          <Glass variant="panel" className="p-6 sm:p-8 space-y-3">
            <div className="flex items-center gap-3">
              <AiLabel />
              <h2 id="ai-disclosure-heading" className="font-serif text-2xl font-normal text-ivory">AI Development Disclosure</h2>
            </div>
            <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-[65ch]">
              This application was developed with the assistance of AI coding tools (<strong className="text-ivory">Google Antigravity</strong>). The narrative stories and interactive quizzes were drafted with AI assistance and verified against primary NASA and JPL sources.
            </p>
            <p className="text-xs text-muted max-w-[65ch]">
              AI coding tools were used strictly for scaffolding, formatting, and responsive design assistance. Every historical milestone, scientific measurement, and mission date is grounded exclusively in the cited NASA source materials.
            </p>
          </Glass>
        </section>
      </main>
    </div>
  );
}
