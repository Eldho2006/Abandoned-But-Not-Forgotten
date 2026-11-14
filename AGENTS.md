# AGENTS.md — rules for Echoes of Space

Read PROJECT.md, NARRATIVES.md and SOURCES.md before writing any code.

## What this is
Hackathon web app for NASA Space Apps 2026, challenge "Abandoned but Not Forgotten".
Audience: school-age kids. Reading level: grades 6-8.

## Hard rules
1. NEVER invent facts, dates or numbers. Use only NARRATIVES.md and public/data/*.csv.
   If something is missing, write `TODO_VERIFY: <what>` in the data file and list all of them in your final message.
2. Stack: React + Vite + Tailwind + react-router + Recharts + PapaParse. No backend, no API keys, no runtime calls to external APIs.
3. Narration uses the browser SpeechSynthesis API only. Always show captions.
4. Never use, draw or modify NASA logos. Footer must say: "Not affiliated with or endorsed by NASA."
5. Any AI-generated image must carry a visible "AI-generated" label (use the AiLabel component).
6. Accessibility: alt text on every image, keyboard navigable, WCAG AA contrast, no motion without a reduced-motion fallback.
7. Mobile-first. Test at 375px width.

## Separation of concerns
- src/data/      -> JSON/CSV only, no logic
- src/lib/       -> pure functions (parsing, formatting, quiz generation)
- src/components -> reusable UI, no data fetching
- src/pages      -> routes, compose components
- public/data/   -> raw NASA data files

## Workflow
- Do ONE task per prompt. Run `npm run build` before declaring done.
- Keep files small (<200 lines). Explain changes in 3 lines max.
- Never rewrite working files to restyle them unless asked.


## 3D rules (v2)
- Allowed: three, @react-three/fiber, @react-three/drei. Use versions compatible with this project's React version.
- Procedural geometry only (primitives, noise terrain). No downloaded 3D models or textures unless they are NASA public domain with credits listed in the Sources page.
- Lazy-load every 3D component. Always provide a non-3D fallback (static image/CSS) when WebGL is unavailable or prefers-reduced-motion is set.
- Keep scenes under 60fps-safe complexity on a phone. No post-processing.
- 3D is decoration and exploration, never the only way to read a fact.