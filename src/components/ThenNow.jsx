import Glass from './ui/Glass';

export default function ThenNow({ plannedLifespan, actualLifespan, endEvent }) {
  if (!plannedLifespan) {
    return (
      <Glass variant="panel" className="p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-terracotta">
            Mission Legacy
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-ivory mb-3 font-serif">
          Left Behind on the Surface
        </h3>
        <div className="p-4 rounded-xl bg-bg border border-border text-ivory space-y-2">
          <p className="font-semibold text-ivory">
            <span className="text-terracotta font-bold">Status: </span>
            {actualLifespan || 'Remains on the surface'}
          </p>
          {endEvent && (
            <p className="text-sm text-muted">
              <span className="text-ivory font-semibold">Note: </span>
              {endEvent}
            </p>
          )}
          <p className="text-sm text-muted italic">
            This machine was intentionally designed to stay behind as a permanent base and historical artifact.
          </p>
        </div>
      </Glass>
    );
  }

  return (
    <Glass variant="panel" className="p-6 sm:p-8">
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-xs font-bold uppercase tracking-wider text-brass">
          Then vs Now
        </span>
        <span className="text-xs text-muted font-medium">
          Planned vs Actual Lifespan
        </span>
      </div>

      <h3 className="text-xl sm:text-2xl font-black text-ivory mb-6 font-serif">
        How long did it last?
      </h3>

      <div className="space-y-6">
        {/* Planned */}
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-sm font-semibold text-muted">
              Planned Lifespan
            </span>
            <span className="text-sm font-bold text-muted">
              {plannedLifespan}
            </span>
          </div>
          <div className="w-full bg-bg rounded-full h-4 p-0.5 border border-border">
            <div
              className="bg-border-hover h-full rounded-full w-[15%] transition-all duration-1000 ease-out motion-reduce:transition-none"
              style={{ width: '15%' }}
              aria-label={`Planned: ${plannedLifespan}`}
            />
          </div>
        </div>

        {/* Actual */}
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-sm font-semibold text-ivory">
              Actual Exploration Time
            </span>
            <span className="text-sm font-extrabold text-brass">
              {actualLifespan}
            </span>
          </div>
          <div className="w-full bg-bg rounded-full h-4 p-0.5 border border-border">
            <div
              className="bg-gradient-to-r from-brass-dark to-brass h-full rounded-full transition-all duration-1000 ease-out motion-reduce:transition-none shadow-sm shadow-brass/20"
              style={{ width: '100%' }}
              aria-label={`Actual: ${actualLifespan}`}
            />
          </div>
        </div>
      </div>

      {endEvent && (
        <div className="mt-6 pt-4 border-t border-border text-xs sm:text-sm text-muted">
          <span className="font-semibold text-ivory">Conclusion: </span>
          {endEvent}
        </div>
      )}
    </Glass>
  );
}
