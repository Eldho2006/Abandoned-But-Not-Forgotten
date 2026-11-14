export default function Timeline({ chapters = [], activeChapter = 0, onSelectChapter }) {
  if (!chapters.length) return null;

  return (
    <nav
      aria-label="Story chapter timeline"
      className="sticky top-14 z-10 w-full py-2.5 px-3 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80"
    >
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 shrink-0 hidden sm:inline">
          Timeline:
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
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all focus:outline-none focus:ring-2 focus:ring-sky-400 ${
                  isActive
                    ? 'bg-sky-500 text-slate-950 shadow-md font-bold'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isActive ? 'bg-slate-950' : 'bg-slate-500'
                  }`}
                />
                <span>Ch {idx + 1}</span>
                <span className="hidden md:inline text-[11px] opacity-90 max-w-[120px] truncate">
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
