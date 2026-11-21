# AI_USAGE

Per the assignment brief: which tools were used, what for, and what I verified
or rejected. Written honestly — this document would change if the workflow changed.

**Tool used for initial implementation:** Arena.ai Agent Mode (an AI coding agent),
driven interactively by me. I provided the brief (PDF + Notion reference) and the
Figma link and directed the build.

**Design source:** Figma file `FocusBoard — Dashboard References`
(file key `09TveHXjOvI73KDNndCFM4`, node `0-1`), used as the visual reference.
Asset-level Figma exports were not used; the frames were matched by inspection.

**Local tooling:** Node 20, npm, git, Vite dev/preview, headless Chromium (Playwright,
temporary local use only, not committed) used for screenshots and scripted checks.

## Representative prompts (verbatim intent, abridged)

1. "Build FocusBoard from the take-home brief (PDF + Notion ref + Figma link).
   React + Vite, plain JS/CSS, mobile-first, localStorage persistence, 3-slide
   Focus Notes carousel, CRUD with validation, stats derived from state."
2. "The brief requires AI_USAGE.md — document tools, prompts and what was
   corrected or rejected."
3. "Verify the build in a headless browser at 390/768/1440px, click through
   create/edit/delete/search/carousel/reload, and fix whatever breaks."
4. "Add a dark theme using CSS variables; persist the choice."
5. Bug-fix prompts during verification, e.g. "carousel grid-areas computed to
   none in Chromium — find the parse error and fix it."

## Which parts AI assisted with

Essentially the whole initial implementation: project scaffold, `src/index.css`,
all components, sample data, the localStorage hook, the README and this file.

## What I (the candidate) verified and corrected

> **Important:** only keep items in this section that are actually true for you
> before submitting. Everything here was checked during development in a headless
> browser at 2026-11-21, but you should re-run and personally understand each one.

- Sample data vs persistence: seeded 9 tasks appear on first load; after creating/
  editing/deleting and reloading, saved state wins and sample data does **not**
  re-seed over it (`useLocalStorage` lazy initializer + `App.jsx`).
- Derived stats: total/in-progress/completed/% are computed from `tasks` via
  `useMemo`; adding a task moved Total 9 → 10 in the scripted check.
- Carousel: next/previous wrap around 3 slides; indicator 3 jumps directly;
  arrow-key support works; see `src/components/FocusNotes.jsx`.
- Mobile banner bug (real example of checking AI output): the initially generated
  mobile grid used `grid-template-areas` with a non-rectangular area (`nav` on
  rows 1 and 3), which Chromium rejected — the whole declaration computed to
  `none` and the banner rendered broken. Found by measuring computed styles, fixed
  by making every grid area rectangular, and re-verified with screenshots.
- Form validation: submitting a title shorter than 3 characters shows an inline
  error and focuses the field; valid input creates the task.
- Delete flow: nothing is removed without passing the confirmation dialog.
- Rejected/changed during development:
  - No router and no state library (Redux/Zustand) were added — unnecessary for a
    single screen; plain `useState` keeps the data flow easy to explain.
  - "View all tasks" was wired to reset filters and scroll to the list rather than
    act as a dead link.
  - Calendar/Settings are explicit placeholders instead of half-built screens.

To own this honestly for the live review, I went through the code file by file and
can explain: the shape of the `tasks` array; why filters run in `useMemo`; why
`useEffect` writes to localStorage and not the other way round; how stats derive;
how the carousel wraps (`(i + dir + len) % len`); why completed tasks sort last.

## Corrections I personally made (fill in truthfully before submitting)

<!-- Replace with what you actually did — e.g. tweaking spacing, renaming,
     re-wording copy, changing the sort order — if you made changes.
     If you only verified, say so explicitly instead of inventing edits. -->

- [ ] I ran `npm install && npm run dev` and tried the app myself
- [ ] I read every file in `src/` and can explain it
- [ ] I re-checked at least one AI-suggested detail against the Figma and changed it
- [ ] I practiced making one small change live (e.g. adding an "Overdue" filter)

## What AI was NOT used for

- The Figma design itself (created by the company) — only inspected as reference
- The assignment text/criteria — not reproduced in the app
