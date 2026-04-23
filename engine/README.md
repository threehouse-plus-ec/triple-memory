# Engine — Triple Memory

**Status:** Prototype implementation present. This directory contains the current topic-agnostic engine build described by `docs/ENGINE_BLUEPRINT.md`, with validation and accessibility refinement still in progress.

## Current contents (per Engine Blueprint v0.4 §23)

- `index.html` — entry point.
- `style.css` — presentation.
- `app.js` — core game logic (board generation, turn logic, match validation, score, end screen).
- `validator.js` — pack manifest and dataset validation against the schemas in `docs/PACK_INTERFACE.md`.

## Current constraints

- Single-pack MVP prototype: the Geography Pack in `packs/geography/`.
- Local JSON loading via a browser-served environment.
- Validation performed by `validator.js` at load time.

## Tech stack (per Engine Blueprint §11)

- HTML, CSS, JavaScript.
- React optional.
- No backend; local JSON loading only.
- In-browser state management.
