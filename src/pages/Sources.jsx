import { Link } from 'react-router-dom';
import AiLabel from '../components/AiLabel';

export default function Sources() {
  return (
    <div className="star-field min-h-screen text-slate-100 flex flex-col">
      <header className="w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-sm sm:text-base font-bold text-sky-400 hover:text-sky-300 transition-colors flex items-center gap-1.5 focus:outline-none focus:underline">
            &larr; Back to Home
          </Link>
          <div className="flex items-center gap-4 text-xs sm:text-sm font-semibold text-slate-300">
            <Link to="/compare" className="hover:text-white">Compare</Link>
            <Link to="/quiz" className="hover:text-white">Quiz</Link>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 sm:py-12 space-y-10">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-400 block mb-2">Transparency &amp; Citations</span>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">Data Sources &amp; Disclosures</h1>
          <p className="text-slate-300 text-sm sm:text-base">
            All data, dates, and historical measurements used in this project originate strictly from official NASA and JPL publications.
          </p>
        </div>

        {/* Primary Data Sources */}
        <section aria-labelledby="sources-heading" className="space-y-4">
          <h2 id="sources-heading" className="text-xl sm:text-2xl font-bold text-white border-b border-slate-800 pb-2">Data Sources</h2>
          <div className="space-y-4">
            <article className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-bold text-white text-base sm:text-lg">NASA PDS MER Pancam Derived Atmospheric Opacity Collection</h3>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">ID PSPG-01754 / PSPG-01753</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Atmospheric opacity (tau, 880 nm) measured by Opportunity&apos;s Pancam from Jan 27, 2004 to June 5, 2018 (8,639 rows). Cite as: NASA PDS Geosciences Node, &ldquo;MER1/MER2-M-PANCAM-5-ATMOS-OPACITY-V1.0&rdquo;.
              </p>
              <div className="flex flex-wrap gap-3 pt-1 text-xs">
                <a href="https://nssdc.gsfc.nasa.gov/nmc/dataset/display.action?id=PSPG-01754" target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">
                  NSSDCA Dataset Catalog &rarr;
                </a>
                <a href="https://pds-geosciences.wustl.edu/mer/mer1_mer2-m-pancam-5-atmos-opacity-v1/merao_1xxx/data/" target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">
                  PDS Geosciences Node Data Folder &rarr;
                </a>
              </div>
            </article>

            <article className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white text-base sm:text-lg">JPL Opportunity Mission Status Reports &amp; Graphics</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Daily solar energy production (watt-hours) and storm updates, including sol 5111 final readings (22 Wh, tau 10.8).
              </p>
              <div className="flex flex-wrap gap-3 pt-1 text-xs">
                <a href="https://science.nasa.gov/mission/mer-opportunity/stories/" target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">
                  Opportunity Stories &amp; Updates &rarr;
                </a>
                <a href="https://science.nasa.gov/resource/on-mars-light-is-energy/" target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">
                  &ldquo;On Mars, Light Is Energy&rdquo; Graphic &rarr;
                </a>
                <a href="https://photojournal.jpl.nasa.gov/catalog/PIA22930" target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">
                  Photojournal PIA22930 &rarr;
                </a>
              </div>
            </article>

            <article className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white text-base sm:text-lg">NASA Spirit and Opportunity Mission Overview</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Official mission overview for landings (Spirit Jan 3, 2004; Opportunity Jan 24, 2004), last contact June 10, 2018, 28.06 mi (45.16 km) driven, and driving record.
              </p>
              <div className="pt-1 text-xs">
                <a href="https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/" target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">
                  NASA Mars Exploration Rovers Page &rarr;
                </a>
              </div>
            </article>

            <article className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white text-base sm:text-lg">NSSDCA Opportunity Master Catalog Page</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                NASA Space Science Data Coordinated Archive (craft ID 2003-032A): launch July 8, 2003 UTC (July 7 US Eastern); landing Jan 25, 2004 UTC; site Terra Meridiani; solar arrays up to 140 W; datasets and 2007 dust storm press release.
              </p>
              <div className="pt-1 text-xs">
                <a href="https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2003-032A" target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">
                  NSSDCA Spacecraft ID 2003-032A Record &rarr;
                </a>
              </div>
            </article>
          </div>
        </section>

        {/* Image Credits */}
        <section aria-labelledby="images-heading" className="space-y-4">
          <h2 id="images-heading" className="text-xl sm:text-2xl font-bold text-white border-b border-slate-800 pb-2">Image Credits</h2>
          <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3 text-xs sm:text-sm text-slate-300">
            <p className="font-medium text-slate-200">Data and images: NASA/JPL-Caltech unless stated.</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
              <li>
                NASA Photojournal &ldquo;Opportunity Legacy Pan (True Color)&rdquo;, last 360-degree panorama (May 13 - June 10, 2018):{' '}
                <a href="https://science.nasa.gov/photojournal/opportunity-legacy-pan-true-color/" target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">
                  Photojournal Entry
                </a>
              </li>
              <li>
                NASA Photojournal &ldquo;Opportunity&apos;s Tracks in Perseverance Valley&rdquo;:{' '}
                <a href="https://science.nasa.gov/photojournal/opportunitys-tracks-in-perseverance-valley/" target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">
                  Photojournal Entry
                </a>
              </li>
            </ul>
          </div>
        </section>

        {/* AI Use Disclosure */}
        <section aria-labelledby="ai-heading" className="space-y-4">
          <h2 id="ai-heading" className="text-xl sm:text-2xl font-bold text-white border-b border-slate-800 pb-2 flex items-center justify-between">
            <span>AI Use Disclosure</span>
            <AiLabel />
          </h2>
          <div className="p-5 rounded-xl bg-slate-900/90 border border-purple-900/50 space-y-3 text-sm text-slate-300 leading-relaxed">
            <p>
              &ldquo;Parts of this project were built with AI coding assistance (Google Antigravity). Story text was drafted with AI help and checked against NASA sources. Any AI-generated images are labeled. No NASA logos were used or modified.&rdquo;
            </p>
            <div className="flex items-center gap-2 pt-1 text-xs text-slate-400">
              <span>Sample component label used for AI media:</span>
              <AiLabel />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
