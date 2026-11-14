// Design tokens and reusable UI classes for Echoes of Space

export const palette = {
  navy: {
    bg: '#030712',       // deep space navy
    surface: '#0b1120',  // card/panel navy
    surfaceAlt: '#111827',
    border: '#1e293b',
    borderHover: '#334155',
  },
  accent: {
    cyan: '#06b6d4',      // space cyan
    cyanLight: '#22d3ee',
    cyanDark: '#0891b2',
    mars: '#f97316',      // Mars orange
    marsLight: '#fb923c',
    marsDark: '#ea580c',
  },
  text: {
    primary: '#f8fafc',
    secondary: '#cbd5e1',
    muted: '#94a3b8',
  },
};

export const ui = {
  card: 'bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl transition-all duration-200',
  cardHover: 'hover:border-cyan-500/50 hover:shadow-cyan-950/20',
  buttonPrimary:
    'inline-flex items-center justify-center font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 focus-visible:ring-cyan-400 rounded-xl transition-all duration-150 shadow-md min-h-[48px] px-6 py-3',
  buttonSecondary:
    'inline-flex items-center justify-center font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 hover:text-white border border-slate-700 hover:border-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 focus-visible:ring-cyan-400 rounded-xl transition-all duration-150 min-h-[44px] px-5 py-2.5',
  focusRing:
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 focus-visible:ring-cyan-400',
  readingWidth: 'max-w-[65ch]',
};
