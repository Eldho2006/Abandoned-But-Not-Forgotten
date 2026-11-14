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
      stroke="#22d3ee"
      strokeWidth={2}
      fill={payload.tauEstimated ? 'transparent' : '#22d3ee'}
    />
  );
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload;
  return (
    <div className="p-3 rounded-xl bg-navy-950 border border-navy-700 text-xs shadow-xl space-y-1">
      <p className="font-extrabold text-white text-sm">Sol {p.sol}</p>
      {p.tau != null && <p className="text-mars-light font-medium">PDS Tau: {p.tau}</p>}
      {p.tauFinalJpl != null && <p className="text-red-400 font-medium">JPL Tau: {p.tauFinalJpl}</p>}
      {p.energy != null && (
        <p className="text-space-cyan font-medium">
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
    return <div className="p-8 rounded-2xl bg-navy-900 border border-navy-700 text-center text-slate-400">Loading NASA storm data...</div>;
  }
  if (error) {
    return <div className="p-8 rounded-2xl bg-navy-900 border border-red-900 text-center text-red-400">{error}</div>;
  }

  const selectedItem = data.find((d) => d.sol === selectedSol) || { sol: selectedSol };
  const captionText = getSolCaption(selectedItem);

  return (
    <section aria-label="Dust storm data chart" className="p-4 sm:p-7 rounded-2xl bg-navy-900/95 border border-navy-700/80 shadow-2xl space-y-5">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-mars-light">Real NASA Data</span>
          <div className="flex flex-wrap gap-2 text-[11px] font-semibold">
            <span className="px-2.5 py-1 rounded-md bg-orange-950/80 text-orange-300 border border-orange-800/60">
              Tau: NASA PDS Geosciences Node (MER Pancam)
            </span>
            <span className="px-2.5 py-1 rounded-md bg-cyan-950/80 text-space-cyan border border-cyan-800/60">
              Energy and final point: NASA/JPL status reports
            </span>
          </div>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-white">Why Opportunity Went Silent (2018 Dust Storm)</h3>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          Dual axis: tau on the left (&ldquo;Dust opacity, tau: higher means dustier&rdquo;), energy in watt-hours on the right.
        </p>
      </div>

      <div className="w-full h-[320px] sm:h-[360px] -ml-2 sm:ml-0">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 12, right: 6, left: -10, bottom: 0 }}>
            <XAxis dataKey="sol" type="number" domain={[5000, 5111]} stroke="#64748b" tick={{ fontSize: 11, fill: '#94a3b8' }} tickFormatter={(v) => `Sol ${v}`} />
            <YAxis yAxisId="left" width={32} domain={[0, 12]} stroke="#f97316" tick={{ fontSize: 11, fill: '#fb923c' }} />
            <YAxis yAxisId="right" width={38} orientation="right" domain={[0, 700]} stroke="#22d3ee" tick={{ fontSize: 11, fill: '#22d3ee' }} />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine yAxisId="left" x={selectedSol} stroke="#e2e8f0" strokeDasharray="3 3" strokeWidth={1.5} />
            <Line yAxisId="left" type="monotone" dataKey="tau" name="Dust opacity (PDS)" stroke="#f97316" strokeWidth={2} dot={false} connectNulls={false} isAnimationActive={!reducedMotion} />
            <Line yAxisId="right" dataKey="energy" name="JPL status reports" stroke="#22d3ee" strokeWidth={1} strokeDasharray="3 3" connectNulls={false} dot={<EnergyDot />} isAnimationActive={!reducedMotion} />
            <Line yAxisId="left" dataKey="tauFinalJpl" name="Last report (JPL)" stroke="#ef4444" strokeWidth={0} connectNulls={false} dot={{ r: 6, stroke: '#ef4444', strokeWidth: 2, fill: 'transparent' }} isAnimationActive={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-300">
        <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-orange-500 inline-block"></span>Tau Line (PDS 880nm)</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-space-cyan inline-block"></span>Energy Wh (JPL)</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full border-2 border-space-cyan inline-block"></span>estimated</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full border-2 border-red-500 inline-block"></span>Last report (JPL, sol 5111)</span>
      </div>

      <div className="p-4 rounded-xl bg-navy-950 border border-navy-700/80 space-y-3">
        <div className="flex items-center justify-between">
          <label htmlFor="sol-slider" className="text-xs sm:text-sm font-bold text-slate-200">Explore Day by Day (Sol Slider):</label>
          <span className="text-sm font-extrabold text-space-cyan px-2.5 py-0.5 rounded bg-cyan-950 border border-cyan-800">Sol {selectedSol}</span>
        </div>
        <input
          id="sol-slider"
          type="range"
          min={5000}
          max={5111}
          value={selectedSol}
          onChange={(e) => setSelectedSol(Number(e.target.value))}
          className="w-full h-2.5 bg-navy-800 rounded-lg appearance-none cursor-pointer accent-space-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-space-cyan"
          aria-label="Sol slider from 5000 to 5111"
        />
        <div className="pt-2 border-t border-navy-800 text-sm font-medium text-slate-100">
          <p>{captionText}</p>
        </div>
      </div>

      <p className="text-xs text-center text-slate-400 italic">
        Small differences between sources come from calibration.
      </p>
    </section>
  );
}
