# FocusBoard

A responsive, single-user task dashboard built with React + Vite, matching the
FocusBoard Figma reference. Tasks can be created, edited, completed and deleted;
everything persists to `localStorage`; statistics and filters derive from the
task list, never from hardcoded values.

> Status: assignment build for the MobileFirst take-home. AI assistance was
> used and is disclosed in [AI_USAGE.md](./AI_USAGE.md).

## Stack

- React 19 + Vite
- Plain JavaScript (ES modules)
- CSS (single stylesheet, mobile-first, CSS custom properties, dark theme)
- `lucide-react` icons
- `localStorage` for persistence
- No router, no state library, no backend — deliberate, see below

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve the production build locally
npm run lint       # oxlint
```

Node 20+ recommended.

## What's implemented (vs the brief)

- [x] React + Vite, reusable components (`src/components/`)
- [x] 9 sample tasks with unique id, title, description, category, status, priority, due date
- [x] Create task — dedicated form/modal matching the Figma frame, title required + inline error
- [x] Edit task — same dialog, prefilled
- [x] Delete task — custom confirmation dialog before removal
- [x] Status: To do / In progress / Completed, one click on the circle toggles completion; stats update immediately
- [x] Case-insensitive title search, status tabs (All / In progress / Completed with live counts), priority filter — they combine
- [x] Statistics derived from state: total, in progress, completed, and overall completion % (bar)
- [x] Focus Notes carousel — 3 slides from the Figma frames (1:2 file, nodes 15:2 / 15:30 / 15:58), prev/next, clickable indicators, keyboard arrow support
- [x] localStorage persistence; seeded sample data only on first run (saved data is never overwritten)
- [x] Accessibility: semantic landmarks, labelled controls, `:focus-visible` rings, keyboard-operable carousel/dialogs, aria attributes where buttons are icon-only
- [x] Responsive at 390 / 768 / 1440 (checked at 320+ too), no horizontal overflow
- [x] Dark theme (extra, persisted) — not in the brief, cheap via the CSS variable setup

## Design decisions & tradeoffs

- **State management: plain `useState` + `useMemo`.** The brief requires explaining the choice.
  This is a single screen with one level of prop passing; Context would add a provider
  to save nothing, and Redux/Zustand would be architecture cosplay for a localStorage app.
  Derived values (stats, filtered list, completion %) are computed in `useMemo` from the
  single `tasks` array, so every view stays consistent by construction.
- **localStorage, not an API.** The brief allows frontend-only; storage failures
  (private mode/quota) are swallowed so the app keeps working in-memory.
- **Completed sink to the bottom, rest sorted by nearest due date.** Two-line rule in
  `App.jsx` (`visibleTasks`). Keeps the work queue actionable without extra UI.
- **"Due soon" = not completed and due within 3 days** (in `src/data/sampleTasks.js`).
  Judgment call; the Figma shows amber "Due soon" chips but doesn't define the window.
- **Mobile-first CSS** with `min-width` breakpoints (620 / 760 / 1024 px). Sidebar appears
  only at ≥1024px; below that a fixed bottom navigation (Overview / Tasks / Calendar / Settings)
  replaces it, as in the mobile Figma frame.
- **Categories were added to the form** (status/priority/due date are in the Figma form;
  category exists because the task rows display category chips). Optional, low cost.
- **Pixel fidelity is approximate.** The Figma file couldn't be exported asset-by-asset
  without API access; spacing/colors were matched from the shared frames and reference
  images. Fonts: Plus Jakarta Sans with system fallbacks.
- **"View all tasks" resets the filters and scrolls to the list** instead of navigating
  (there is no separate route); Calendar/Settings open an explicit "not in scope" dialog.

## Accessibility notes

- Dialogs use `role="dialog"` / `role="alertdialog"`, `aria-modal`, labelled headings,
  Escape to close, click-outside to close, focus moved in on open, simple Tab trap
  (create/edit dialog), focus returned to trigger implicitly on unmount.
- The completion circle is a `role="checkbox"` button with a task-specific aria-label.
- Carousel: `role="region"` + `aria-roledescription="carousel"`, live-region text,
  labelled prev/next buttons, indicators with `aria-current`.
- All icon-only buttons have aria-labels; decorative icons are `aria-hidden`.
- `prefers-reduced-motion` disables transitions.

## Verification done

Automated via headless Chromium (Playwright) — see `screenshots/`:

- create → shows in list and bumps Total 9 → 10; validation error blocks blank submits
- delete → confirmation dialog → row removed
- complete toggle → row strikes through, stats update
- search (incl. no-match empty state), status tabs, priority filter all combine
- reload → tasks persist; fresh profile → 9 seeded samples
- 0 console/page errors at 390px, 768px, 1440px and in dark theme

Manual pass still recommended before submission (see AI_USAGE.md).

## Limitations / not in scope

- Calendar and Settings are intentional placeholders (dialog explains why)
- Single user, no auth, no backend, no due-date notifications, no drag-and-drop
- Avatar/persona ("Alex Carter, Product designer") is sample UI chrome
- No automated test suite (verified via scripted browser checks instead)
- Seeded sample dates are late Nov 2026; "Due soon" flags depend on today's date

## What I'd do with more time

- Undo-toast for deletes (instead of confirm dialog), edit-in-place on rows
- Real drag-to-reorder with a persisted order field
- Playwright regression suite wired into CI, axe-core audit
- Extract exact design tokens from the Figma API (file key `09TveHXjOvI73KDNndCFM4`)
- Keyboard shortcut (`n`) for new task, `/` for search focus

## Project structure

```
focusboard/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   └── logo.svg
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── Header.jsx
│   │   ├── StatCard.jsx
│   │   ├── FocusNotes.jsx
│   │   ├── TaskList.jsx
│   │   ├── TaskCard.jsx
│   │   ├── TaskForm.jsx
│   │   ├── SearchBar.jsx
│   │   └── FilterTabs.jsx
│   ├── data/
│   │   └── sampleTasks.js
│   ├── hooks/
│   │   └── useLocalStorage.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── screenshots/
│   ├── desktop-1440.png
│   ├── tablet-768.png
│   ├── mobile-390.png
│   ├── desktop-dark.png
│   └── create-modal.png
├── README.md
├── AI_USAGE.md
├── package.json
└── .gitignore

```

## Deployment

Build is static (`dist/`). Vercel: import the repo, framework preset "Vite",
no env vars. Netlify: build `npm run build`, publish `dist`.

Hosted URL: **[PASTE_YOUR_DEPLOYED_URL_HERE]**
GitHub repo: **[PASTE_YOUR_REPO_URL_HERE]**
