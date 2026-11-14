export default function ThenNow({ plannedLifespan, actualLifespan, endEvent }) {
  if (!plannedLifespan) {
    return (
      <div className="p-6 sm:p-8 rounded-2xl bg-navy-900/90 border border-navy-700/80 shadow-xl">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-mars-light">
            Mission Legacy
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-white mb-3">
          Left Behind on the Surface
        </h3>
        <div className="p-4 rounded-xl bg-navy-950 border border-navy-700 text-slate-300 space-y-2">
          <p className="font-semibold text-slate-200">
            <span className="text-mars-light font-bold">Status: </span>
            {actualLifespan || 'Remains on the surface'}
          </p>
          {endEvent && (
            <p className="text-sm text-slate-400">
              <span className="text-slate-300 font-semibold">Note: </span>
              {endEvent}
            </p>
          )}
          <p className="text-sm text-slate-400 italic">
            This machine was intentionally designed to stay behind as a permanent base and historical artifact.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-navy-900/90 border border-navy-700/80 shadow-xl">
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-xs font-bold uppercase tracking-wider text-space-cyan">
          Then vs Now
        </span>
        <span className="text-xs text-slate-400 font-medium">
          Planned vs Actual Lifespan
        </span>
      </div>

      <h3 className="text-xl sm:text-2xl font-black text-white mb-6">
        How long did it last?
      </h3>

      <div className="space-y-6">
        {/* Planned */}
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-sm font-semibold text-slate-300">
              Planned Lifespan
            </span>
            <span className="text-sm font-bold text-slate-400">
              {plannedLifespan}
            </span>
          </div>
          <div className="w-full bg-navy-950 rounded-full h-4 p-0.5 border border-navy-700">
            <div
              className="bg-slate-600 h-full rounded-full w-[15%] transition-all duration-1000 ease-out motion-reduce:transition-none"
              style={{ width: '15%' }}
              aria-label={`Planned: ${plannedLifespan}`}
            />
          </div>
        </div>

        {/* Actual */}
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-sm font-semibold text-white">
              Actual Exploration Time
            </span>
            <span className="text-sm font-extrabold text-space-cyan">
              {actualLifespan}
            </span>
          </div>
          <div className="w-full bg-navy-950 rounded-full h-4 p-0.5 border border-navy-700">
            <div
              className="bg-gradient-to-r from-teal-400 to-space-cyan h-full rounded-full transition-all duration-1000 ease-out motion-reduce:transition-none shadow-sm shadow-cyan-500/40"
              style={{ width: '100%' }}
              aria-label={`Actual: ${actualLifespan}`}
            />
          </div>
        </div>
      </div>

      {endEvent && (
        <div className="mt-6 pt-4 border-t border-navy-700 text-xs sm:text-sm text-slate-400">
          <span className="font-semibold text-slate-300">Conclusion: </span>
          {endEvent}
        </div>
      )}
    </div>
  );
}
