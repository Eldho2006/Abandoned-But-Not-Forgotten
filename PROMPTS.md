# PROMPTS.md — paste into Antigravity one at a time

Before Prompt 1: put AGENTS.md, PROJECT.md, NARRATIVES.md, SOURCES.md in the project root and public/data/opportunity_milestones.csv in place.
Test and commit after every prompt.

## Prompt 1 — Scaffold
Read AGENTS.md and PROJECT.md. Create the Vite + React + Tailwind project with react-router, recharts and papaparse. Create the folder structure from PROJECT.md with empty placeholder components and pages that render their names. Add a Footer and a NotFound page. Do not add content yet. Run npm run build.

## Prompt 2 — Data
Read NARRATIVES.md. Create src/data/stories.json following the schema in PROJECT.md for opportunity, apollo11-eagle and sojourner. Copy chapter text exactly. Put [VERIFY] items into a "verifyNotes" array per story. Use image: null for now. Add 2 quiz questions per story from the quiz seeds. Do not add any fact that is not in NARRATIVES.md.

## Prompt 3 — Home
Build the Home page and StoryCard: hero "Machines we left behind. Stories worth remembering.", three large cards (planet icon, one-line hook, "Hear its story" button), CSS-only star-field background with prefers-reduced-motion fallback. Large readable text, 375px first.

## Prompt 4 — Story page
Build /story/:id: chapter blocks that scroll in, a sticky Timeline showing the current chapter, ListenButton (SpeechSynthesis, play/pause/stop, captions always visible, graceful message if unsupported), a "Why it matters" card, and a ThenVsNow animated bar (planned vs actual). Data comes only from stories.json.

## Prompt 5 — Dust storm chart (the key feature)
Build DustStormChart for the Opportunity story. Load public/data/opportunity_milestones.csv with PapaParse. Dual-axis Recharts line chart: solar_energy_wh and tau by sol. Mark tau_estimated points with hollow dots and a legend note. Add a sol slider; as it moves, show a caption in plain words (e.g., "Sol 5106: only 345 watt-hours. The sky is getting dusty.") and highlight the selected point. Add a badge "Data: NASA/JPL" linking to the sources. Skip rows with missing values safely. Keep the logic in src/lib/parseCsv.js.

## Prompt 5b — Real PDS opacity data
Setup first (outside Antigravity): download 1tau880_5106_20181207a.tab (and optionally the 440 nm one) from the PDS folder in SOURCES.md into public/data/raw/. Then run:
  python scripts/prepare_opacity.py public/data/raw/1tau880_5106_20181207a.tab public/data/opacity_2018.csv 5000 5111
It outputs sol,tau,n_measurements (median per sol, -1.0 non-measurements removed).

Prompt:
Update DustStormChart. Tau line: load public/data/opacity_2018.csv (NASA PDS MER Pancam derived atmospheric opacity, 880 nm). Energy dots: load public/data/opportunity_milestones.csv (JPL status reports), labeled "JPL status reports". The PDS file ends around sol 5106-5107, so add one separate hollow marker for sol 5111 using the tau value from opportunity_milestones.csv, labeled "Last report (JPL)". Never connect that marker to the PDS line. Slider spans sols 5000-5111. Keep both source badges visible and do not change any numbers.

## Prompt 6 — Compare and Quiz
Build /compare (table of planet, launch/landing, planned vs actual, how it ended) and /quiz (8 questions built from stories.json in src/lib/quiz.js, immediate feedback with explanation, score screen, link back to the story for missed questions).

## Prompt 7 — Sources and disclosure
Build /sources from SOURCES.md content: data sources with links, image credits, AI disclosure, footer text. Add AiLabel component for AI-generated images. Link Sources from the footer on every page.

## Prompt 8 — Polish and deploy
Audit: mobile at 375px, WCAG AA contrast, keyboard navigation, reduced motion, broken links, loading and error states. Fix issues. Print a list of every [VERIFY] and TODO_VERIFY remaining. Give me Vercel deploy steps.

## Stretch (only if done early)
Add real NASA images with credits to stories.json; add a simple stylized Mars/Moon scene behind the Home hero.
