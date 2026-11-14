export default function ThenNow({ plannedLifespan, actualLifespan }) {
  if (!plannedLifespan && !actualLifespan) {
    return <div>ThenNow</div>;
  }

  return (
    <div className="space-y-3">
      {plannedLifespan ? (
        <div>
          <span className="text-xs text-slate-400">Planned: {plannedLifespan}</span>
          <div className="w-full bg-slate-800 rounded-full h-3">
            <div className="bg-sky-500 h-3 rounded-full w-1/4"></div>
          </div>
        </div>
      ) : null}
      {actualLifespan ? (
        <div>
          <span className="text-xs text-slate-400">Actual: {actualLifespan}</span>
          <div className="w-full bg-slate-800 rounded-full h-3">
            <div className="bg-emerald-500 h-3 rounded-full w-full"></div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
