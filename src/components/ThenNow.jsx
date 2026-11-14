export default function ThenNow({ plannedLifespan, actualLifespan, endEvent }) {
  // If plannedLifespan is null (e.g. Apollo 11 Eagle), hide the bar and show the 'left behind' note instead
  if (!plannedLifespan) {
    return (
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Mission Legacy
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
          Left Behind on the Surface
        </h3>
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 space-y-2">
          <p className="font-medium text-slate-200">
            <span className="text-amber-400 font-bold">Status: </span>
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
    <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
          Then vs Now
        </span>
        <span className="text-xs text-slate-400 font-medium">
          Planned vs Actual Lifespan
        </span>
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">
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
          <div className="w-full bg-slate-950 rounded-full h-4 p-0.5 border border-slate-800">
            <div
              className="bg-slate-500 h-full rounded-full w-[15%] transition-all duration-1000 ease-out motion-reduce:transition-none"
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
            <span className="text-sm font-extrabold text-emerald-400">
              {actualLifespan}
            </span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-4 p-0.5 border border-slate-800">
            <div
              className="bg-gradient-to-r from-emerald-500 to-sky-400 h-full rounded-full transition-all duration-1000 ease-out motion-reduce:transition-none shadow-sm shadow-emerald-500/50"
              style={{ width: '100%' }}
              aria-label={`Actual: ${actualLifespan}`}
            />
          </div>
        </div>
      </div>

      {endEvent && (
        <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs sm:text-sm text-slate-400">
          <span className="font-semibold text-slate-300">Conclusion: </span>
          {endEvent}
        </div>
      )}
    </div>
  );
}
