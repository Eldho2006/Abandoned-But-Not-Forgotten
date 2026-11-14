# SOURCES.md — sources and AI disclosure

## Challenge Resources item (confirmed on the Resources tab)
- Spirit & Opportunity: https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/
  Verified on this page: landings (Spirit Jan 3, 2004; Opportunity Jan 24, 2004), last contact June 10, 2018, 28.06 mi (45.16 km) driven, Perseverance passed the record Oct 11, 2026. This page has facts and images, NOT the power/tau series. Get the series from its News and Features / mission updates: https://science.nasa.gov/mission/mer-opportunity/stories/

## Data used (verified by search on Nov 14, 2026)
- NASA/JPL graphic "On Mars, Light Is Energy" (power vs tau, Opportunity, 2018): https://science.nasa.gov/resource/on-mars-light-is-energy/
- NASA Photojournal PIA22930 "Last Images Opportunity Took" (tau on final day): https://photojournal.jpl.nasa.gov/catalog/PIA22930
- JPL Opportunity mission status updates (energy in watt-hours and tau per sol). Starter values in public/data/opportunity_milestones.csv came from JPL reports republished by Mars Daily. REPLACE with the original NASA/JPL update pages before submitting.

## PRIMARY DATASET (found Nov 14 in NSSDCA's Opportunity data collections list, 131 collections)
- "MER Pancam Science Derived Atmospheric Opacity Data Bundle (PDS)" (ID PSPG-01753)
- "MER1 Pancam Derived Opacity Data Collection (PDS)" (ID PSPG-01754)
  Page pattern: https://nssdc.gsfc.nasa.gov/nmc/dataset/display.action?id=PSPG-01754 (open it from the list at https://nssdc.gsfc.nasa.gov/nmc/spacecraft/displayDataset.action?spacecraftId=2003-032A and follow its link to the PDS archive to download the files).
  This is real NASA tau (dust opacity) data measured by Opportunity's Pancam. Use it for the tau line on the chart.
- DOWNLOAD FOLDER (PDS Geosciences Node): https://pds-geosciences.wustl.edu/mer/mer1_mer2-m-pancam-5-atmos-opacity-v1/merao_1xxx/data/
  Files for Opportunity (MER1): 1tau880_5106_20181207a.tab (880 nm) and 1tau440_5106_20181207a.tab (440 nm), each about 760 KB, with .lbl label files. Files starting with 2 are Spirit; ignore them.
  Verified from the .lbl: 8,639 rows; observations from Jan 27, 2004 to June 5, 2018 (so it ends BEFORE the sol 5111 reading of tau 10.8, which comes from JPL); columns are PANCAM_PRODUCT_ID, SOLAR_LONGITUDE, SOLAR_DISTANCE, LOCAL_TIME, AIRMASS, SOLAR_FLUX, ATMOSPHERIC_OPACITY, OPACITY_ERROR; -1.0 means no valid measurement; sol = LOCAL_TIME rounded up.
  Which wavelength to chart: read readme_mer_pancam_derived_opacity.txt in the parent folder. I used 880 nm in the prompts; confirm that is the one the team reports.
  Cite as: NASA PDS Geosciences Node, "MER1/MER2-M-PANCAM-5-ATMOS-OPACITY-V1.0".
- Energy (watt-hours) is NOT in this list. Keep the JPL status-report values in opportunity_milestones.csv for the energy line, and label them separately.
- Also available if you want odometry: "MER1 Rover Motion Counter Data Collection (PDS)" (PSPG-01354).

## NSSDCA catalog page (NASA Space Science Data Coordinated Archive)
- https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2003-032A
  Verified: launch July 8, 2003 UTC (July 7 US Eastern); landing Jan 25, 2004 UTC; site Terra Meridiani ("Hematite Site"); solar arrays up to 140 W; lander+rover facts; last communication June 10, 2018.
  Has a "Data collections from Opportunity" link and an "Experiments on Opportunity" link. Click those: they point to the real archived datasets. It also links NASA's 2007 press release "NASA Mars Rovers Braving Severe Dust Storms" (use it for the 2007 storm line).

## Added Nov 14: image and data finds
- Best hero image for the ending: NASA Photojournal "Opportunity Legacy Pan (True Color)", the last 360-degree panorama (May 13 - June 10, 2018): https://science.nasa.gov/photojournal/opportunity-legacy-pan-true-color/
- Also: "Opportunity's Tracks in Perseverance Valley": https://science.nasa.gov/photojournal/opportunitys-tracks-in-perseverance-valley/
- CSV points for sols 4970, 4984, 4991, 5105-5107 and 5111 come from JPL weekly status reports (quoted by ASU Red Planet, Mars Daily, Leonard David, Planetary Society). For submission, cite JPL's "Opportunity Update Archive" (find it by searching that exact name on NASA's Mars site) and check each number there.
- The News and Features page itself is a feed of articles and photos, not a data table.

## You still must do
1. Open the challenge Resources tab: https://www.spaceappschallenge.org/2026/challenges/nasas-discarded-equipment-storytelling/?tab=resources
   List the exact dataset names here and use at least one meaningfully: ______
2. Expand the CSV with more sols from the JPL/NASA update archive so the chart shows the whole storm, not just five points.
3. Add LROC (Apollo 11 site) and Pathfinder/Sojourner image IDs and credits.

## AI use disclosure (draft — edit to match what you really did)
"Parts of this project were built with AI coding assistance (Google Antigravity). Story text was drafted with AI help and checked against NASA sources. Any AI-generated images are labeled. No NASA logos were used or modified."

## Footer text
"Not affiliated with or endorsed by NASA. Data and images: NASA/JPL-Caltech unless stated."
