# PROJECT.md — Echoes of Space

## One-line pitch
An interactive museum where kids hear three abandoned NASA machines tell their stories, backed by real NASA data.

## Core experience (the demo moment)
"Why did Opportunity go silent?" — a sol slider over NASA solar-energy and dust-opacity (tau) data from the 2018 dust storm. As the slider moves, power collapses from hundreds of watt-hours to almost nothing.

## Scope (lean)
IN: Home, 3 story pages, Opportunity data chart, Compare page, Quiz, Sources/AI-disclosure page.
OUT (only if time remains): 3D scene, AI chatbot, backend, accounts.

## Pages
- / Home: hero + 3 cards (Opportunity, Apollo 11 Eagle, Sojourner)
- /story/:id Chapter scroll + sticky timeline + Listen button + "Then vs Now" + "What we learned"
- /story/opportunity also has the DustStormChart section
- /compare Side-by-side table: planet, years active, planned vs actual, how it ended
- /quiz 8 questions generated from stories.json
- /sources Data sources, image credits, AI disclosure

## Structure
```
echoes-of-space/
├─ AGENTS.md
├─ PROJECT.md
├─ NARRATIVES.md
├─ SOURCES.md
├─ PROMPTS.md
├─ scripts/prepare_opacity.py
├─ public/
│  └─ data/ (opportunity_milestones.csv, opacity_2018.csv, raw/*.tab)
└─ src/
   ├─ main.jsx, App.jsx
   ├─ data/stories.json
   ├─ lib/ (parseCsv.js, quiz.js, speech.js)
   ├─ components/ (StoryCard, ChapterBlock, Timeline, ListenButton,
   │               DustStormChart, ThenNow, AiLabel, Footer)
   └─ pages/ (Home, Story, Compare, Quiz, Sources, NotFound)
```

## stories.json schema
id, name, mission, planet, launchDate, landingDate, plannedLifespan, actualLifespan,
endEvent, hook, chapters[{title, text, image, imageAlt, imageCredit}],
whyItMatters, sources[{label, url}], quiz[{q, options[], answerIndex, explanation}]

## 30-second demo video script
0-4s  Title: "Echoes of Space: stories of machines we left behind"
4-10s Pick Opportunity; chapter scroll starts
10-22s Drag slider through the 2018 dust storm; power drops to near zero
22-27s Text: "Built for 90 days. Last heard from on sol 5,111."
27-30s Closing: data credit + "AI use disclosed on Sources page"
(Alternative: 7 slides max, including title and closing.)

## Judging checklist
- [ ] NASA dataset used meaningfully: PDS Pancam atmospheric opacity (tau) for Opportunity (see SOURCES.md); ask a mentor to confirm it counts under the Resources-tab rule
- [ ] Data badge + link on the chart
- [ ] AI disclosure on /sources and in the submission text
- [ ] Facts checked against NASA pages
- [ ] Works on phone, deployed URL tested in incognito
- [ ] Demo video/slides within the limit

## Timeline (about 20 build hours)
H0-1 dataset + facts | H1-3 scaffold + home | H3-8 Opportunity + chart | H8-12 other stories + compare
H12-16 quiz + sources | H16-20 polish + deploy | last 4h video + submit
