# Engine — Triple Memory

**Status:** Prototype implementation present. This directory contains the current topic-agnostic engine build described by `docs/ENGINE_BLUEPRINT.md`, with validation and accessibility refinement still in progress.

## Current contents (per Engine Blueprint v0.4 §23)

- `index.html` — entry point.
- `style.css` — presentation.
- `app.js` — core game logic (board generation, turn logic, match validation, score, end screen).
- `validator.js` — pack manifest and dataset validation against the schemas in `docs/PACK_INTERFACE.md`.

## Current constraints

- Two content packs ship with the prototype: Geography in `packs/geography/` and Chemistry in `packs/chemistry/`. The active pack is chosen from the main menu or via the `?pack=` URL parameter (e.g. `engine/?pack=chemistry`); the app shell does not reload when switching.
- Local JSON loading via a browser-served environment.
- Validation performed by `validator.js` at load time. The validator is pack-agnostic: `card_type` values are validated against the active pack's `manifest.card_types`, and letter-group cards accept either `entity_id` (engine-level) or the legacy `country_id` alias used by the geography pack.

## Tech stack (per Engine Blueprint §11)

- HTML, CSS, JavaScript.
- React optional.
- No backend; local JSON loading only.
- In-browser state management.

## Licence

All source files in this folder are released under the **MIT Licence**.
See the root [`LICENCE`](../LICENCE).
