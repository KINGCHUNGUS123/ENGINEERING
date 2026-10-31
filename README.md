# QCAA Engineering Hub — Unit 4: Machines and mechanisms

An interactive revision website for the QCAA Engineering external exam (Engineering 2025 v1.4 syllabus, Unit 4).

## What's inside
- **11 topic lessons** written from the syllabus and the Unit 4 student learning guide: machines in society; simple machines (MA, VR, levers, pulleys, screws, belts, gears); work, power, energy and efficiency; uniformly accelerated motion; friction and inclined planes; logic control; electrical circuits (new in 2026); stress–strain; Pb–Sn phase diagrams and the lever rule; steels and heat treatment; engineering plastics.
- **11 simulations**: lever, pulley, gear train, energy on a ramp, v–t graph, incline FBD, logic gates and a truth-table builder, series/parallel circuits, stress–strain explorer, Pb–Sn phase diagram with live lever rule, steel microstructure and heat treatment.
- **Practice**: randomised calculation questions with worked solutions, plus concept checks.
- **133 past-paper questions (2020–2025)**: 60 MC with answers and worked explanations, 73 written questions with the official marking guide. Each is tagged by topic.
- **Exam mode**: 5 min perusal + 120 min working, then automatic MC marking and self-marking against the guides. Mixed papers are also available.
- Progress, notes and your own questions are saved in the browser (localStorage), with reset options on the Progress page.

## Files (flat layout — no folders)
| File | Purpose |
|---|---|
| index.html | Page shell and navigation |
| main.js | App: routing, pages, exam mode, progress |
| content.js | Lessons, formulas, practice generators, concept quiz |
| sims.js | Canvas simulations |
| custom.js | Your own questions (edit this to add more) |
| style.css | Styling (light/dark) |
| exams.json | Question index: topics, marks, MC answers, explanations |
| ex-2020.json … ex-2025.json | Question and marking-guide images (base64 WebP), loaded per year |
| package.json, vite.config.js | Vite build setup |

## Run locally
```
npm install
npm run dev
```

## Deploy on Bolt
1. Upload all 16 files to the root of a GitHub repo.
2. Import the repo into bolt.new.
3. Ask Bolt to "install dependencies and run the dev server", check it, then click Publish.

Past-paper material © State of Queensland (QCAA) 2020–2025, licensed CC BY 4.0. Some third-party images in the original papers were redacted by QCAA.
