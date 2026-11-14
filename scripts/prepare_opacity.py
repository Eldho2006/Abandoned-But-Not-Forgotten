#!/usr/bin/env python3
"""Turn NASA PDS MER Pancam opacity .tab into a small per-sol CSV.

Usage:
  python scripts/prepare_opacity.py public/data/raw/1tau880_5106_20181207a.tab public/data/opacity_2018.csv [first_sol] [last_sol]

Format (from the PDS .lbl): comma-separated, 8 columns:
 0 PANCAM_PRODUCT_ID, 1 SOLAR_LONGITUDE, 2 SOLAR_DISTANCE, 3 LOCAL_TIME,
 4 AIRMASS, 5 SOLAR_FLUX, 6 ATMOSPHERIC_OPACITY, 7 OPACITY_ERROR
Sol = ceil(LOCAL_TIME). A value of -1.0 means "no measurement": dropped.
Several measurements per sol are reduced to the median.
"""
import sys, math, statistics, csv
from collections import defaultdict

src, dst = sys.argv[1], sys.argv[2]
first = int(sys.argv[3]) if len(sys.argv) > 3 else 5000
last = int(sys.argv[4]) if len(sys.argv) > 4 else 5200

by_sol = defaultdict(list)
skipped = 0
with open(src, encoding="utf-8", errors="replace") as f:
    for line in f:
        parts = [p.strip().strip('"') for p in line.strip().split(",")]
        if len(parts) < 8:
            skipped += 1
            continue
        try:
            local_time = float(parts[3])
            tau = float(parts[6])
            err = float(parts[7])
        except ValueError:
            skipped += 1  # header lines land here
            continue
        if tau == -1.0 or err == -1.0:
            continue
        sol = math.ceil(local_time)
        if first <= sol <= last:
            by_sol[sol].append((tau, err))

with open(dst, "w", newline="") as out:
    w = csv.writer(out)
    w.writerow(["sol", "tau", "n_measurements"])
    for sol in sorted(by_sol):
        taus = [t for t, _ in by_sol[sol]]
        w.writerow([sol, round(statistics.median(taus), 3), len(taus)])

print(f"sols written: {len(by_sol)} | non-data lines skipped: {skipped}")
if by_sol:
    print(f"sol range in output: {min(by_sol)} to {max(by_sol)}")
