import Papa from 'papaparse';

export function parseOpacityCsv(csvText) {
  const result = Papa.parse(csvText, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  });
  return result.data || [];
}

export function parseMilestonesCsv(csvText) {
  const result = Papa.parse(csvText, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  });
  return result.data || [];
}

export function buildDustStormData(opacityRows, milestoneRows) {
  const opacityMap = new Map();
  opacityRows.forEach((row) => {
    if (row.sol != null && row.tau != null && row.tau !== -1.0) {
      opacityMap.set(Number(row.sol), Number(row.tau));
    }
  });

  const milestoneMap = new Map();
  milestoneRows.forEach((row) => {
    if (row.sol != null) {
      milestoneMap.set(Number(row.sol), row);
    }
  });

  const series = [];
  for (let s = 5000; s <= 5111; s++) {
    const tauVal = opacityMap.has(s) ? opacityMap.get(s) : null;
    const milestone = milestoneMap.get(s);

    const energyVal = milestone && milestone.solar_energy_wh != null ? milestone.solar_energy_wh : null;
    const tauFinalJpl = s === 5111 && milestone && milestone.tau != null ? milestone.tau : null;

    series.push({
      sol: s,
      tau: tauVal,
      energy: energyVal,
      tauFinalJpl: tauFinalJpl,
      tauEstimated: milestone ? Boolean(milestone.tau_estimated) : false,
      milestoneNote: milestone ? milestone.note : null,
    });
  }

  return series;
}

export async function fetchAndParseDustStormData() {
  const [opacityRes, milestonesRes] = await Promise.all([
    fetch('/data/opacity_2018.csv'),
    fetch('/data/opportunity_milestones.csv'),
  ]);

  if (!opacityRes.ok && !milestonesRes.ok) {
    throw new Error('Failed to load opacity_2018.csv and opportunity_milestones.csv');
  }
  if (!opacityRes.ok) {
    throw new Error('Failed to load opacity_2018.csv (NASA PDS data)');
  }
  if (!milestonesRes.ok) {
    throw new Error('Failed to load opportunity_milestones.csv (JPL data)');
  }

  const [opacityText, milestonesText] = await Promise.all([
    opacityRes.text(),
    milestonesRes.text(),
  ]);

  const opacityRows = parseOpacityCsv(opacityText);
  const milestoneRows = parseMilestonesCsv(milestonesText);

  return buildDustStormData(opacityRows, milestoneRows);
}

export function getSolCaption(item) {
  if (!item) return 'No reading for this sol';

  const hasPdsTau = item.tau != null;
  const hasJplTau = item.tauFinalJpl != null;
  const hasEnergy = item.energy != null;

  if (!hasPdsTau && !hasJplTau && !hasEnergy) {
    return `Sol ${item.sol}: No reading for this sol`;
  }

  const parts = [];
  if (hasPdsTau) {
    parts.push(`Dust opacity (tau) is ${item.tau}`);
  } else if (hasJplTau) {
    parts.push(`Dust opacity (tau) is ${item.tauFinalJpl} (JPL final report)`);
  }

  if (hasEnergy) {
    parts.push(
      `Solar energy is ${item.energy} Wh${item.tauEstimated ? ' (estimated)' : ''}`
    );
  }

  return `Sol ${item.sol}: ${parts.join('. ')}.`;
}
