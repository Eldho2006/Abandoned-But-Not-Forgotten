import ListenButton from './ListenButton';
import AiLabel from './AiLabel';

export default function ChapterBlock({ chapter, index, id }) {
  if (!chapter) return null;

  return (
    <article
      id={id || `chapter-${index}`}
      className="scroll-mt-28 p-6 sm:p-10 rounded-2xl bg-navy-900/90 border border-navy-700/80 shadow-xl transition-all duration-300 hover:border-navy-600 motion-safe:animate-fadeIn"
    >
      <div className="max-w-[65ch] mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-950/80 text-space-cyan font-bold text-sm border border-cyan-800/60 shadow-sm">
            {index + 1}
          </span>
          <span className="text-xs font-semibold tracking-wider uppercase text-slate-400">
            Chapter {index + 1}
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white mb-4 tracking-tight leading-snug">
          {chapter.title}
        </h2>

        {chapter.image && (
          <figure className="my-6 overflow-hidden rounded-xl bg-navy-950 border border-navy-700">
            <img
              src={chapter.image}
              alt={chapter.imageAlt || chapter.title}
              className="w-full h-auto object-cover max-h-[400px]"
            />
            <figcaption className="p-3 text-xs text-slate-400 flex items-center justify-between gap-2 border-t border-navy-700">
              <span>{chapter.imageCredit || 'NASA'}</span>
              {chapter.isAiGenerated && <AiLabel />}
            </figcaption>
          </figure>
        )}

        <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal mb-8">
          {chapter.text}
        </p>

        {/* Speech Narration & Captions */}
        <ListenButton text={chapter.text} title={chapter.title} />
      </div>
    </article>
  );
}
