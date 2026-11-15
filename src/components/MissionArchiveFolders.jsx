import GlassFolder from './ui/glass-folder-cards';
import SceneErrorBoundary from './3d/SceneErrorBoundary';

const MARS_RECIPE = {
  style: 'marble',
  colors: ['#0B0F14', '#2b1712', '#6e3524', '#C97B5A', '#e3b08e', '#2a1b17', '#0B0F14'],
  scale: 0.7,
  warp: 3.2,
  angle: -0.5,
  gloss: 0.35,
  veins: 0.4,
};

const MOON_RECIPE = {
  style: 'streak',
  colors: ['#0B0F14', '#2a3038', '#6b737d', '#B8BEC6', '#e6e9ec', '#4a525b'],
  scale: 0.7,
  warp: 1.6,
  angle: 0.35,
  gloss: 0.2,
  veins: 0,
};

const DATA_RECIPE = {
  style: 'marble',
  colors: ['#0B0F14', '#2a2418', '#6b5a36', '#C9A96E', '#efdfb4', '#1a1710'],
  scale: 0.7,
  warp: 3,
  angle: 1.2,
  gloss: 0.4,
  veins: 0.4,
};

const OPPORTUNITY_FILES = [
  { name: 'Mission Overview', meta: 'NASA Science', href: 'https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/', external: true },
  { name: 'Legacy Pan (Sol 5000)', meta: 'Photojournal PIA22930', href: 'https://science.nasa.gov/photojournal/opportunity-legacy-pan-true-color/', external: true },
  { name: 'Perseverance Valley', meta: 'Pancam Imaging', href: 'https://science.nasa.gov/photojournal/opportunitys-tracks-in-perseverance-valley/', external: true },
];

const EAGLE_FILES = [
  { name: 'Apollo 11 Mission', meta: 'NASA History', href: 'https://www.nasa.gov/mission/apollo-11/', external: true },
];

const SOJOURNER_FILES = [
  { name: 'Pathfinder & Sojourner', meta: 'NASA Science', href: 'https://science.nasa.gov/mission/mars-pathfinder/', external: true },
];

const DATA_FILES = [
  { name: 'PDS Pancam Opacity', meta: '880 nm Data Folder', href: 'https://pds-geosciences.wustl.edu/mer/mer1_mer2-m-pancam-5-atmos-opacity-v1/merao_1xxx/data/', external: true },
  { name: 'NSSDCA Opacity Catalog', meta: 'Dataset PSPG-01754', href: 'https://nssdc.gsfc.nasa.gov/nmc/dataset/display.action?id=PSPG-01754', external: true },
  { name: 'Opportunity Updates', meta: 'JPL Status Reports', href: 'https://science.nasa.gov/mission/mer-opportunity/stories/', external: true },
  { name: 'On Mars, Light Is Energy', meta: 'JPL Solar Graphic', href: 'https://science.nasa.gov/resource/on-mars-light-is-energy/', external: true },
  { name: 'NSSDCA Craft 2003-032A', meta: 'Master Catalog Record', href: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2003-032A', external: true },
];

export default function MissionArchiveFolders() {
  return (
    <section aria-label="Mission archive folders" className="space-y-6">
      <div className="border-b border-border pb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-brass block mb-1">
          Interactive Artifacts
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-normal text-ivory">
          Mission Archive
        </h2>
        <p className="text-xs sm:text-sm text-muted mt-1">
          Open each archival folder to inspect direct NASA documents and publications.
        </p>
      </div>

      <SceneErrorBoundary>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 justify-items-center pt-2">
          <GlassFolder
            label="Opportunity"
            meta="3 documents"
            tone="dark"
            action="none"
            art={MARS_RECIPE}
            seed={101}
            files={OPPORTUNITY_FILES}
            width={240}
            appear={true}
            appearDelay={0}
          />
          <GlassFolder
            label="Apollo 11 Eagle"
            meta="1 document"
            tone="dark"
            action="none"
            art={MOON_RECIPE}
            seed={202}
            files={EAGLE_FILES}
            width={240}
            appear={true}
            appearDelay={120}
          />
          <GlassFolder
            label="Sojourner"
            meta="1 document"
            tone="dark"
            action="none"
            art={MARS_RECIPE}
            seed={303}
            files={SOJOURNER_FILES}
            width={240}
            appear={true}
            appearDelay={240}
          />
          <GlassFolder
            label="NASA Data"
            meta="5 records"
            tone="dark"
            action="none"
            art={DATA_RECIPE}
            seed={404}
            files={DATA_FILES}
            width={240}
            appear={true}
            appearDelay={360}
          />
        </div>
      </SceneErrorBoundary>
    </section>
  );
}
