// Design tokens and reusable UI classes for Echoes of Space (V2)

export const palette = {
  bg: '#0B0F14',
  bgDark: '#080C10',
  surface: '#121821',
  surfaceAlt: '#161F2B',
  border: '#222B37',
  borderHover: '#313D4D',
  text: '#EDE8DC',          // ivory
  muted: '#9AA3AE',         // muted text
  brass: '#C9A96E',         // accent brass
  brassHover: '#D8BC84',
  brassDark: '#A8874E',
  terracotta: '#C97B5A',    // Mars terracotta
  terracottaHover: '#D88E6F',
  terracottaDark: '#AB6142',
  silver: '#B8BEC6',        // Moon silver
  silverHover: '#CCD2DA',
  silverDark: '#9FA6AF',
};

export const ui = {
  card: 'bg-surface/90 border border-border rounded-2xl p-6 sm:p-8 shadow-xl transition-all duration-200',
  cardHover: 'hover:border-brass/50 hover:shadow-[0_4px_24px_rgba(201,169,110,0.08)]',
  headingSerif: 'font-serif tracking-tight text-ivory font-normal',
  buttonPrimary:
    'inline-flex items-center justify-center font-bold text-bg bg-brass hover:bg-brass-hover active:bg-brass-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:ring-brass rounded-xl transition-all duration-150 shadow-md min-h-[48px] px-6 py-3',
  buttonSecondary:
    'inline-flex items-center justify-center font-semibold text-ivory bg-surface hover:bg-surface-alt hover:text-white border border-border hover:border-border-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:ring-brass rounded-xl transition-all duration-150 min-h-[44px] px-5 py-2.5',
  focusRing:
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:ring-brass',
  readingWidth: 'max-w-[65ch] mx-auto',
};
