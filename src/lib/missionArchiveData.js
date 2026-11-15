export const MARS_RECIPE = {
  style: 'marble',
  colors: ['#0B0F14', '#2b1712', '#6e3524', '#C97B5A', '#e3b08e', '#2a1b17', '#0B0F14'],
  scale: 0.7,
  warp: 3.2,
  angle: -0.5,
  gloss: 0.35,
  veins: 0.4,
};

export const MOON_RECIPE = {
  style: 'streak',
  colors: ['#0B0F14', '#2a3038', '#6b737d', '#B8BEC6', '#e6e9ec', '#4a525b'],
  scale: 0.7,
  warp: 1.6,
  angle: 0.35,
  gloss: 0.2,
  veins: 0,
};

export const DATA_RECIPE = {
  style: 'marble',
  colors: ['#0B0F14', '#2a2418', '#6b5a36', '#C9A96E', '#efdfb4', '#1a1710'],
  scale: 0.7,
  warp: 3,
  angle: 1.2,
  gloss: 0.4,
  veins: 0.4,
};

export const FOLDERS = [
  {
    id: 'opportunity',
    label: 'Opportunity',
    meta: '3 sources',
    art: MARS_RECIPE,
    seed: 101,
    delay: 0,
    files: [
      { name: 'Mission Overview', meta: 'NASA Science', href: 'https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/', external: true },
      { name: 'Legacy Pan', meta: 'Photojournal PIA22930', href: 'https://science.nasa.gov/photojournal/opportunity-legacy-pan-true-color/', external: true },
      { name: 'Perseverance Valley', meta: 'Pancam Imaging', href: 'https://science.nasa.gov/photojournal/opportunitys-tracks-in-perseverance-valley/', external: true },
    ],
    sources: [
      { title: 'NASA Spirit and Opportunity Mission Overview', desc: 'Official mission overview for landings, last contact June 10, 2018, and driving record.', tag: 'NASA mission page', href: 'https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/' },
      { title: 'Opportunity Legacy Pan (Sol 5000)', desc: 'Pancam true-color mosaic taken near Endeavour Crater.', tag: 'JPL Photojournal', href: 'https://science.nasa.gov/photojournal/opportunity-legacy-pan-true-color/' },
      { title: 'Opportunity Tracks in Perseverance Valley', desc: 'Pancam imaging from upper Perseverance Valley.', tag: 'JPL Photojournal', href: 'https://science.nasa.gov/photojournal/opportunitys-tracks-in-perseverance-valley/' },
    ],
  },
  {
    id: 'apollo11-eagle',
    label: 'Apollo 11 Eagle',
    meta: '1 source',
    art: MOON_RECIPE,
    seed: 202,
    delay: 120,
    files: [
      { name: 'Apollo 11 Mission', meta: 'NASA History', href: 'https://www.nasa.gov/mission/apollo-11/', external: true },
    ],
    sources: [
      { title: 'NASA Apollo 11 Mission Overview', desc: 'Official Apollo 11 mission documentation, landing July 20, 1969, and lunar module Eagle descent stage details.', tag: 'NASA mission page', href: 'https://www.nasa.gov/mission/apollo-11/' },
    ],
  },
  {
    id: 'sojourner',
    label: 'Sojourner',
    meta: '1 source',
    art: MARS_RECIPE,
    seed: 303,
    delay: 240,
    files: [
      { name: 'Pathfinder & Sojourner', meta: 'NASA Science', href: 'https://science.nasa.gov/mission/mars-pathfinder/', external: true },
    ],
    sources: [
      { title: 'NASA Mars Pathfinder & Sojourner Overview', desc: 'Official mission overview for Mars Pathfinder and the Sojourner rover at Ares Vallis.', tag: 'NASA mission page', href: 'https://science.nasa.gov/mission/mars-pathfinder/' },
    ],
  },
  {
    id: 'nasa-data',
    label: 'NASA Data',
    meta: '5 sources',
    art: DATA_RECIPE,
    seed: 404,
    delay: 360,
    files: [
      { name: 'PDS Pancam Opacity', meta: '880 nm Data Folder', href: 'https://pds-geosciences.wustl.edu/mer/mer1_mer2-m-pancam-5-atmos-opacity-v1/merao_1xxx/data/', external: true },
      { name: 'NSSDCA Opacity Catalog', meta: 'Dataset PSPG-01754', href: 'https://nssdc.gsfc.nasa.gov/nmc/dataset/display.action?id=PSPG-01754', external: true },
      { name: 'Opportunity Updates', meta: 'JPL Status Reports', href: 'https://science.nasa.gov/mission/mer-opportunity/stories/', external: true },
      { name: 'On Mars, Light Is Energy', meta: 'JPL Solar Graphic', href: 'https://science.nasa.gov/resource/on-mars-light-is-energy/', external: true },
      { name: 'NSSDCA Craft 2003-032A', meta: 'Master Catalog Record', href: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2003-032A', external: true },
    ],
    sources: [
      { title: 'NASA PDS MER Pancam Derived Atmospheric Opacity', desc: "Atmospheric opacity (tau, 880 nm) measured by Opportunity's Pancam from Jan 27, 2004 to June 5, 2018.", tag: 'NASA PDS', href: 'https://pds-geosciences.wustl.edu/mer/mer1_mer2-m-pancam-5-atmos-opacity-v1/merao_1xxx/data/' },
      { title: 'NSSDCA Atmospheric Opacity Dataset Catalog', desc: 'Catalog record for MER Pancam opacity bundle (ID PSPG-01754).', tag: 'NSSDCA', href: 'https://nssdc.gsfc.nasa.gov/nmc/dataset/display.action?id=PSPG-01754' },
      { title: 'JPL Opportunity Mission Status Reports', desc: 'Daily solar energy production (watt-hours) and storm updates, including sol 5111 final readings.', tag: 'JPL status reports', href: 'https://science.nasa.gov/mission/mer-opportunity/stories/' },
      { title: 'On Mars, Light Is Energy Graphic', desc: 'Power vs tau relationship graphic published during the 2018 Martian dust storm.', tag: 'JPL graphic', href: 'https://science.nasa.gov/resource/on-mars-light-is-energy/' },
      { title: 'NSSDCA Opportunity Master Catalog Page', desc: 'NASA Space Science Data Coordinated Archive master record (craft ID 2003-032A).', tag: 'NSSDCA', href: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2003-032A' },
    ],
  },
];
