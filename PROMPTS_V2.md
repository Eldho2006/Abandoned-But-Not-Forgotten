# PROMPTS_V2.md — paste into Antigravity one at a time, on the v2 branch

Before starting: read V2_DESIGN.md. Commit after each prompt. Do not change any text or numbers in stories.json or the CSVs.

## F1 — Clean layout and type
Read V2_DESIGN.md. Install self-hosted fonts with npm (a serif for headings, a clean sans for body, via @fontsource packages) and remove any remote font requests. Restyle Home, Story and Sources: serif headlines, 65ch reading column, generous spacing, one accent color per section, consistent cards. Keep the chart readable at 375px. No new content. WCAG AA contrast, focus rings, reduced motion. Run npm run build.

## F2 — Scroll-driven planet scene on story pages
On /story/:id replace the static planet with one lazy-loaded @react-three/fiber scene (procedural icosahedron planet, stars). As the active chapter changes, smoothly move the camera and rotate the planet to a different preset angle (store 5 presets in src/lib/cameraPresets.js, one per chapter). Scene sits behind the text and never covers it. Pause when the tab is hidden, cap DPR at 2, no post-processing. CSS fallback when WebGL is unavailable or prefers-reduced-motion is set. No external assets.

## F3 — Orb navigation on Home
On Home, replace the hero planet with a lazy-loaded draggable sphere made of about 60 small rounded panels (procedural, no images) arranged on a sphere. Three highlighted panels are the machines (Opportunity, Apollo 11 Eagle, Sojourner) with labels. Drag to rotate with inertia, hover lifts a panel, click a highlighted panel to navigate to its story. Keyboard accessible: the three "Hear its story" buttons must remain on the page as the primary, always-working navigation. Static fallback for no WebGL or reduced motion.

## F4 — Mission certificate card
At the end of each story, add a lazy-loaded "Mission certificate": a translucent paper-like card that tilts with pointer movement (touch: gentle auto-sway) and shows the machine name, planned vs actual (from stories.json; if plannedLifespan is null show the "left behind" note instead), and the last-contact date. Mark it "Illustrative card, not an official NASA document." The same facts must also appear as plain text under the card.

## F5 — Magnifier inspector (only if you have NASA images)
First add images to public/images/ with their NASA credit and source URL recorded in src/data/imageCredits.json (never invent a credit). Then build a lazy-loaded Magnifier component: a draggable circular lens that magnifies the image under it (2x to 4x with a zoom control), keyboard arrows move the lens, alt text and a visible credit line under the image. Use it for the Apollo 11 landing-site image and the Opportunity Legacy Pan, and list both in the Sources page.
