# V2_DESIGN.md — cleaner 3D direction for Echoes of Space

Work on the `v2` branch. `main` stays deployable.

## Rule about the reference sites
The ThreeUI pages (Sylva, Kage, Orb Gallery, Ashen Press, 3D Paper, Sketchbook, Gallery, Character Carousel, Text Path, Book Showcase) are INSPIRATION ONLY.
- Do NOT copy their HTML, shaders, fonts, images or iframes. Check their license before reusing anything.
- Write original code. Procedural geometry only. No external CDN, no remote fonts at runtime.
- Never let a decorative 3D element carry a fact. Every fact stays readable as plain text.

## What we borrow (as ideas) and where it goes
| Inspiration | Idea | Our version |
|---|---|---|
| Orb Gallery | Drag-to-spin sphere of plates, hover lift, inertia | HOME: a sphere of mission "plates" (procedural panels). Three bright plates are the machines; click one to open its story |
| Sylva / Kage | Scroll-driven scenes, camera moves through a world | STORY: one planet scene; the camera glides to a new angle per chapter as you scroll |
| 3D Paper | Translucent paper that bends | END OF STORY: a "Mission certificate" card (planned vs actual) that tilts and bends with the pointer |
| Sketchbook | Draggable magnifying glass, plates | EAGLE / OPPORTUNITY: drag a lens over a real NASA image (LRO Apollo 11 site, Opportunity Legacy Pan) with credit shown |
| Gallery ribbon | Curved panels orbiting a rail | CHAPTER TIMELINE: chapters as curved panels on a ring; click to jump |
| Character carousel | Card wave, keyboard nav | Mobile chapter cards (swipe) |
| Book showcase / Ashen Press | Editorial layout, calm paper feel | Typography and spacing: big serif headlines, narrow reading column, generous whitespace |

## Visual language (keep it clean)
- Palette: deep navy #030712, cyan #22d3ee, Mars orange #f97316, off-white text. One accent per screen.
- Type: serif headings (Instrument Serif style) + clean sans body, self-hosted via npm (@fontsource). Max 2 families.
- Max 1 3D canvas visible at a time. No bloom or post-processing.
- Motion: slow and purposeful. Respect prefers-reduced-motion everywhere (static fallback).
- Performance: lazy-load all 3D, pause when tab hidden, cap devicePixelRatio at 2, test at 375px.

## Priority order (stop adding at ~9 PM on submission day)
1. Prompt F1 clean layout + fonts
2. Prompt F2 scroll-driven story scene
3. Prompt F3 orb home navigation
4. Prompt F4 mission certificate
5. Prompt F5 magnifier (needs NASA image files with credits)
