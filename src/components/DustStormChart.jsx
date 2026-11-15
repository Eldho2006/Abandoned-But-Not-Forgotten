import { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  CartesianGrid,
} from 'recharts';
import { getSolCaption } from '../lib/parseCsv';
import { palette } from '../styles/theme';
import Glass from './ui/Glass';

function EnergyDot({ cx, cy, payload }) {
  if (cx == null || cy == null || payload?.energy == null) return null;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={5}
      stroke={palette.text}
      strokeWidth={2}
      fill={payload.tauEstimated ? 'transparent' : palette.text}
    />
  );
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload;
  return (
    <div className="p-3 rounded-xl bg-bg border border-border text-xs shadow-xl space-y-1">
      <p className="font-extrabold text-ivory text-sm">Sol {p.sol}</p>
      {p.tau != null && <p className="text-brass font-medium">PDS Tau: {p.tau}</p>}
      {p.tauFinalJpl != null && <p className="text-terracotta font-medium">JPL Tau: {p.tauFinalJpl}</p>}
      {p.energy != null && (
        <p className="text-ivory font-medium">
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
    return <div className="p-8 rounded-2xl bg-surface border border-border text-center text-muted">Loading NASA storm data...</div>;
  }
  if (error) {
    return <div className="p-8 rounded-2xl bg-surface border border-terracotta/40 text-center text-terracotta">{error}</div>;
  }

  const selectedItem = data.find((d) => d.sol === selectedSol) || { sol: selectedSol };
  const captionText = getSolCaption(selectedItem);

  return (
    <Glass variant="panel" aria-label="Dust storm data chart" className="p-4 sm:p-7 space-y-5">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brass">Real NASA Data</span>
          <div className="flex flex-wrap gap-2 text-[11px] font-semibold">
            <Glass variant="chip" contentClassName="px-2.5 py-1 text-brass font-semibold">
              Tau: NASA PDS Geosciences Node (MER Pancam)
            </Glass>
            <Glass variant="chip" contentClassName="px-2.5 py-1 text-ivory font-semibold">
              Energy and final point: NASA/JPL status reports
            </Glass>
          </div>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-ivory">Why Opportunity Went Silent (2018 Dust Storm)</h3>
        <p className="text-xs sm:text-sm text-muted mt-1">
          Dual axis: tau on the left (&ldquo;Dust opacity, tau: higher means dustier&rdquo;), energy in watt-hours on the right.
        </p>
      </div>

      <div className="w-full h-[320px] sm:h-[360px] -ml-2 sm:ml-0">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 12, right: 6, left: -10, bottom: 0 }}>
            <CartesianGrid stroke={palette.border} strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="sol" type="number" domain={[5000, 5111]} stroke={palette.borderHover} tick={{ fontSize: 11, fill: palette.muted }} tickFormatter={(v) => `Sol ${v}`} />
            <YAxis yAxisId="left" width={32} domain={[0, 12]} stroke={palette.brass} tick={{ fontSize: 11, fill: palette.brass }} />
            <YAxis yAxisId="right" width={38} orientation="right" domain={[0, 700]} stroke={palette.text} tick={{ fontSize: 11, fill: palette.text }} />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine yAxisId="left" x={selectedSol} stroke={palette.brass} strokeDasharray="3 3" strokeWidth={1.5} />
            <Line yAxisId="left" type="monotone" dataKey="tau" name="Dust opacity (PDS)" stroke={palette.brass} strokeWidth={2} dot={false} connectNulls={false} isAnimationActive={!reducedMotion} />
            <Line yAxisId="right" dataKey="energy" name="JPL status reports" stroke={palette.text} strokeWidth={1} strokeDasharray="3 3" connectNulls={false} dot={<EnergyDot />} isAnimationActive={!reducedMotion} />
            <Line yAxisId="left" dataKey="tauFinalJpl" name="Last report (JPL)" stroke={palette.terracotta} strokeWidth={0} connectNulls={false} dot={{ r: 6, stroke: palette.terracotta, strokeWidth: 2, fill: 'transparent' }} isAnimationActive={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-muted">
        <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-brass inline-block"></span>Tau Line (PDS 880nm)</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-ivory inline-block"></span>Energy Wh (JPL)</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full border-2 border-ivory inline-block"></span>estimated</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full border-2 border-terracotta inline-block"></span>Last report (JPL, sol 5111)</span>
      </div>

      <div className="p-4 rounded-xl bg-bg border border-border space-y-3">
        <div className="flex items-center justify-between">
          <label htmlFor="sol-slider" className="text-xs sm:text-sm font-bold text-ivory">Explore Day by Day (Sol Slider):</label>
          <span className="text-sm font-extrabold text-brass px-2.5 py-0.5 rounded bg-surface border border-border">Sol {selectedSol}</span>
        </div>
        <input
          id="sol-slider"
          type="range"
          min={5000}
          max={5111}
          value={selectedSol}
          onChange={(e) => setSelectedSol(Number(e.target.value))}
          className="w-full h-2.5 bg-surface rounded-lg appearance-none cursor-pointer accent-brass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass"
          aria-label="Sol slider from 5000 to 5111"
        />
        <div className="pt-2 border-t border-border text-sm font-medium text-ivory">
          <p>{captionText}</p>
        </div>
      </div>

      <p className="text-xs text-center text-muted italic">
        Small differences between sources come from calibration.
      </p>
    </Glass>
  );
}
