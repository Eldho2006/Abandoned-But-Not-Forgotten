export default function Timeline({ chapters = [], activeChapter = 0, onSelectChapter }) {
  if (!chapters.length) return null;

  return (
    <nav
      aria-label="Story chapter timeline"
      className="sticky top-14 z-20 w-full py-2.5 px-4 bg-navy-950/90 backdrop-blur-md border-b border-navy-700/80 shadow-sm"
    >
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
        <span className="text-xs font-black uppercase tracking-wider text-space-cyan shrink-0 hidden sm:inline">
          Timeline
        </span>
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          {chapters.map((chapter, idx) => {
            const isActive = activeChapter === idx;
            return (
              <button
                key={chapter.title || idx}
                type="button"
                onClick={() => onSelectChapter && onSelectChapter(idx)}
                aria-current={isActive ? 'step' : undefined}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950 focus-visible:ring-space-cyan ${
                  isActive
                    ? 'bg-space-cyan text-slate-950 shadow-md ring-2 ring-space-cyan/50 font-extrabold'
                    : 'bg-navy-900 text-slate-300 hover:bg-navy-800 hover:text-white border border-navy-700 hover:border-navy-600'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full transition-transform ${
                    isActive ? 'bg-slate-950 scale-110' : 'bg-slate-500'
                  }`}
                />
                <span>Ch {idx + 1}</span>
                <span className="hidden md:inline text-[11px] opacity-90 max-w-[130px] truncate">
                  - {chapter.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
