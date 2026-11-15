import MissionCertificate from './3d/MissionCertificate';

export default function MissionCertificateSection({ story }) {
  return (
    <section aria-label="Mission Certificate" className="space-y-8">
      <div className="text-center max-w-[65ch] mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-space-cyan block mb-2">
          Mission Certificate
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white mb-3 tracking-tight">
          Commemorative Certificate of Record
        </h2>
        <p className="text-sm sm:text-base text-slate-300">
          An archival 3D document honoring {story.name}&apos;s journey, interactive with pointer tilt.
        </p>
      </div>

      {/* 3D Certificate Container */}
      <div className="relative w-full h-[460px] sm:h-[540px] max-w-xl mx-auto flex items-center justify-center">
        <MissionCertificate story={story} />
      </div>

      {/* Plain text accessible version: facts never depend on 3D */}
      <div className="max-w-xl mx-auto p-6 sm:p-8 rounded-2xl bg-navy-900/90 border border-navy-700/80 shadow-xl space-y-5 text-slate-200">
        <div className="flex items-center justify-between border-b border-navy-700/80 pb-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-space-cyan block">
              Permanent Record
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white">
              {story.name}
            </h3>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-navy-800 text-slate-300 border border-navy-700">
            {story.planet}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="p-3 rounded-lg bg-navy-950/70 border border-navy-800">
            <span className="text-xs uppercase tracking-wider text-slate-400 block font-semibold">
              Mission
            </span>
            <p className="font-medium text-white">{story.mission}</p>
          </div>

          <div className="p-3 rounded-lg bg-navy-950/70 border border-navy-800">
            <span className="text-xs uppercase tracking-wider text-slate-400 block font-semibold">
              Planned Lifespan
            </span>
            <p className="font-medium text-white">
              {story.plannedLifespan || 'Left behind intentionally'}
            </p>
          </div>

          <div className="p-3 rounded-lg bg-navy-950/70 border border-navy-800 sm:col-span-2">
            <span className="text-xs uppercase tracking-wider text-slate-400 block font-semibold">
              Actual Exploration / Status
            </span>
            <p className="font-bold text-space-cyan">{story.actualLifespan}</p>
            {!story.plannedLifespan && (
              <p className="text-xs text-slate-400 italic mt-1">
                Descent stage remains on the Moon as a permanent historical base.
              </p>
            )}
          </div>

          {story.endEvent && (
            <div className="p-3 rounded-lg bg-navy-950/70 border border-navy-800 sm:col-span-2">
              <span className="text-xs uppercase tracking-wider text-slate-400 block font-semibold">
                Conclusion / Last Contact
              </span>
              <p className="text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed">
                {story.endEvent}
              </p>
            </div>
          )}
        </div>

        <p className="text-xs text-slate-400 italic text-center pt-3 border-t border-navy-800">
          Illustrative card, not an official NASA document.
        </p>
      </div>
    </section>
  );
}
