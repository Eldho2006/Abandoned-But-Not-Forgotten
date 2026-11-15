import { Link } from 'react-router-dom';
import AiLabel from '../components/AiLabel';

export default function Sources() {
  return (
    <div className="star-field min-h-screen text-ivory flex flex-col font-sans">
      <header className="w-full border-b border-border bg-bg/85 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-sm sm:text-base font-bold text-brass hover:text-brass-hover transition-colors flex items-center gap-1.5 focus-visible:underline">
            &larr; Back to Home
          </Link>
          <div className="flex items-center gap-4 text-xs sm:text-sm font-semibold text-muted">
            <Link to="/compare" className="hover:text-brass transition-colors">Compare</Link>
            <Link to="/quiz" className="hover:text-brass transition-colors">Quiz</Link>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12 sm:py-20 space-y-12 sm:space-y-16">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-brass block mb-2">Transparency &amp; Citations</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-ivory tracking-tight mb-3">Data Sources &amp; Disclosures</h1>
          <p className="text-muted text-sm sm:text-base max-w-[65ch] leading-relaxed">
            All data, dates, and historical measurements used in this project originate strictly from official NASA and JPL publications.
          </p>
        </div>

        {/* Primary Data Sources */}
        <section aria-labelledby="sources-heading" className="space-y-6">
          <h2 id="sources-heading" className="font-serif text-2xl sm:text-3xl font-normal text-ivory border-b border-border pb-2">Data Sources</h2>
          <div className="space-y-5">
            <article className="p-6 sm:p-7 rounded-2xl bg-surface/90 border border-border space-y-2.5 shadow-lg">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-ivory">NASA PDS MER Pancam Derived Atmospheric Opacity Collection</h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-surface-alt text-muted border border-border">ID PSPG-01754 / PSPG-01753</span>
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
            </article>

            <article className="p-6 sm:p-7 rounded-2xl bg-surface/90 border border-border space-y-2.5 shadow-lg">
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
            </article>

            <article className="p-6 sm:p-7 rounded-2xl bg-surface/90 border border-border space-y-2.5 shadow-lg">
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-ivory">NASA Spirit and Opportunity Mission Overview</h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-[65ch]">
                Official mission overview for landings (Spirit Jan 3, 2004; Opportunity Jan 24, 2004), last contact June 10, 2018, 28.06 mi (45.16 km) driven, and driving record.
              </p>
              <div className="pt-1 text-xs font-semibold">
                <a href="https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/" target="_blank" rel="noreferrer" className="text-brass hover:underline">
                  NASA Mars Exploration Rovers Page &rarr;
                </a>
              </div>
            </article>

            <article className="p-6 sm:p-7 rounded-2xl bg-surface/90 border border-border space-y-2.5 shadow-lg">
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-ivory">NSSDCA Opportunity Master Catalog Page</h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-[65ch]">
                NASA Space Science Data Coordinated Archive (craft ID 2003-032A): launch July 8, 2003 UTC (July 7 US Eastern); landing Jan 25, 2004 UTC; site Terra Meridiani; solar arrays up to 140 W; datasets and 2007 dust storm press release.
              </p>
              <div className="pt-1 text-xs font-semibold">
                <a href="https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2003-032A" target="_blank" rel="noreferrer" className="text-brass hover:underline">
                  NSSDCA Spacecraft ID 2003-032A Record &rarr;
                </a>
              </div>
            </article>
          </div>
        </section>

        {/* Image Credits */}
        <section aria-labelledby="images-heading" className="space-y-4">
          <h2 id="images-heading" className="font-serif text-2xl sm:text-3xl font-normal text-ivory border-b border-border pb-2">Image Credits</h2>
          <div className="p-6 sm:p-7 rounded-2xl bg-surface/90 border border-border space-y-3 text-xs sm:text-sm text-muted shadow-lg">
            <p className="font-semibold text-ivory">Data and images: NASA/JPL-Caltech unless stated.</p>
            <ul className="list-disc pl-5 space-y-2 text-muted">
              <li>
                <strong className="text-ivory">Opportunity Legacy Pan (Sol 5000):</strong> NASA/JPL-Caltech/Cornell/ASU. Pancam true-color mosaic taken near Endeavour Crater.{' '}
                <a href="https://science.nasa.gov/photojournal/opportunity-legacy-pan-true-color/" target="_blank" rel="noreferrer" className="text-brass hover:underline">
                  Photojournal Archive &rarr;
                </a>
              </li>
              <li>
                <strong className="text-ivory">Opportunity Tracks in Perseverance Valley:</strong> NASA/JPL-Caltech/Cornell/ASU. Pancam imaging from upper Perseverance Valley.{' '}
                <a href="https://science.nasa.gov/photojournal/opportunitys-tracks-in-perseverance-valley/" target="_blank" rel="noreferrer" className="text-brass hover:underline">
                  Photojournal Archive &rarr;
                </a>
              </li>
            </ul>
          </div>
        </section>

        {/* AI Use Disclosure */}
        <section aria-labelledby="ai-disclosure-heading" className="space-y-4">
          <h2 id="ai-disclosure-heading" className="font-serif text-2xl sm:text-3xl font-normal text-ivory border-b border-border pb-2">AI Use Disclosure</h2>
          <div className="p-6 sm:p-7 rounded-2xl bg-surface/90 border border-border space-y-4 text-xs sm:text-sm text-muted shadow-lg">
            <div className="flex items-center gap-2">
              <AiLabel />
              <span className="font-bold text-ivory text-sm">Transparency in Generative Technology</span>
            </div>
            <p className="leading-relaxed">
              This application was developed with the assistance of AI coding tools (<strong className="text-ivory">Google Antigravity</strong>). The narrative stories and interactive quizzes were drafted with AI assistance and verified against primary NASA and JPL sources.
            </p>
            <div className="p-3.5 rounded-xl bg-bg border border-border text-xs space-y-1">
              <span className="font-bold text-brass block">Data Integrity Policy:</span>
              <p>
                Every numeric measurement (e.g. sol numbers, atmospheric opacity tau readings, watt-hour solar power generation) is strictly queried from published NASA PDS and JPL datasets. No historical data or dates are AI-generated.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
