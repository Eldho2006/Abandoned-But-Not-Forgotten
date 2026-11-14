import { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
} from 'recharts';
import { getSolCaption } from '../lib/parseCsv';

function EnergyDot({ cx, cy, payload }) {
  if (cx == null || cy == null || payload?.energy == null) return null;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={5}
      stroke="#38bdf8"
      strokeWidth={2}
      fill={payload.tauEstimated ? 'transparent' : '#38bdf8'}
    />
  );
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload;
  return (
    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-xs shadow-lg space-y-1">
      <p className="font-bold text-white">Sol {p.sol}</p>
      {p.tau != null && <p className="text-orange-400">PDS Tau: {p.tau}</p>}
      {p.tauFinalJpl != null && <p className="text-red-400">JPL Tau: {p.tauFinalJpl}</p>}
      {p.energy != null && (
        <p className="text-sky-400">
          Energy: {p.energy} Wh {p.tauEstimated ? '(estimated)' : ''}
        </p>
      )}
    </div>
  );
}

export default function DustStormChart({ data = [], loading = false, error = null }) {
  const [selectedSol, setSelectedSol] = useState(5106);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const media = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(media.matches);
      const listener = (e) => setReducedMotion(e.matches);
      media.addEventListener?.('change', listener);
      return () => media.removeEventListener?.('change', listener);
    }
  }, []);

  if (loading) {
    return <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center text-slate-400">Loading NASA storm data...</div>;
  }
  if (error) {
    return <div className="p-8 rounded-2xl bg-slate-900 border border-red-900 text-center text-red-400">{error}</div>;
  }

  const selectedItem = data.find((d) => d.sol === selectedSol) || { sol: selectedSol };
  const captionText = getSolCaption(selectedItem);

  return (
    <section aria-label="Dust storm data chart" className="p-4 sm:p-7 rounded-2xl bg-slate-900/95 border border-slate-800 shadow-2xl space-y-5">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-400">Real NASA Data</span>
          <div className="flex flex-wrap gap-2 text-[11px] font-medium">
            <span className="px-2.5 py-1 rounded-md bg-orange-950/80 text-orange-300 border border-orange-800/60">
              Tau: NASA PDS Geosciences Node (MER Pancam)
            </span>
            <span className="px-2.5 py-1 rounded-md bg-sky-950/80 text-sky-300 border border-sky-800/60">
              Energy and final point: NASA/JPL status reports
            </span>
          </div>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-white">Why Opportunity Went Silent (2018 Dust Storm)</h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Dual axis: tau on the left (&ldquo;Dust opacity, tau: higher means dustier&rdquo;), energy in watt-hours on the right.
        </p>
      </div>

      <div className="w-full h-[320px] sm:h-[360px] -ml-2 sm:ml-0">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <XAxis dataKey="sol" type="number" domain={[5000, 5111]} stroke="#64748b" tick={{ fontSize: 11, fill: '#94a3b8' }} tickFormatter={(v) => `Sol ${v}`} />
            <YAxis yAxisId="left" domain={[0, 12]} stroke="#f97316" tick={{ fontSize: 11, fill: '#f97316' }} />
            <YAxis yAxisId="right" orientation="right" domain={[0, 700]} stroke="#38bdf8" tick={{ fontSize: 11, fill: '#38bdf8' }} />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine yAxisId="left" x={selectedSol} stroke="#e2e8f0" strokeDasharray="3 3" strokeWidth={1.5} />
            {/* Tau Line: connectNulls=false so sol 5105 shows as a real gap */}
            <Line yAxisId="left" type="monotone" dataKey="tau" name="Dust opacity (PDS)" stroke="#f97316" strokeWidth={2} dot={false} connectNulls={false} isAnimationActive={!reducedMotion} />
            {/* Energy Dots: JPL reports with hollow dot for estimated */}
            <Line yAxisId="right" dataKey="energy" name="JPL status reports" stroke="#38bdf8" strokeWidth={1} strokeDasharray="3 3" connectNulls={false} dot={<EnergyDot />} isAnimationActive={!reducedMotion} />
            {/* Sol 5111 separate hollow marker: NEVER connected to PDS */}
            <Line yAxisId="left" dataKey="tauFinalJpl" name="Last report (JPL)" stroke="#ef4444" strokeWidth={0} connectNulls={false} dot={{ r: 6, stroke: '#ef4444', strokeWidth: 2, fill: 'transparent' }} isAnimationActive={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-300">
        <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-orange-500 inline-block"></span>Tau Line (PDS 880nm)</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-sky-400 inline-block"></span>Energy Wh (JPL)</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full border-2 border-sky-400 inline-block"></span>estimated</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full border-2 border-red-500 inline-block"></span>Last report (JPL, sol 5111)</span>
      </div>

      <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <label htmlFor="sol-slider" className="text-xs sm:text-sm font-bold text-slate-200">Explore Day by Day (Sol Slider):</label>
          <span className="text-sm font-extrabold text-sky-400 px-2.5 py-0.5 rounded bg-sky-950 border border-sky-800">Sol {selectedSol}</span>
        </div>
        <input
          id="sol-slider"
          type="range"
          min={5000}
          max={5111}
          value={selectedSol}
          onChange={(e) => setSelectedSol(Number(e.target.value))}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
          aria-label="Sol slider from 5000 to 5111"
        />
        <div className="pt-2 border-t border-slate-800/80 text-sm font-medium text-slate-100">
          <p>{captionText}</p>
        </div>
      </div>

      <p className="text-xs text-center text-slate-400 italic">
        Small differences between sources come from calibration.
      </p>
    </section>
  );
}
