# Engine — Triple Memory

**Status:** Implementation pending. This directory will contain the topic-agnostic game engine per `docs/ENGINE_BLUEPRINT.md`.

## Expected contents (per Engine Blueprint v0.4 §23)

- `index.html` — entry point.
- `style.css` — presentation.
- `app.js` — core game logic (board generation, turn logic, match validation, score, end screen).
- `validator.js` — pack manifest and dataset validation against the schemas in `docs/PACK_INTERFACE.md`.

## Implementation prerequisites

Before implementation starts, the following task cards must be complete:

- **TC-01** — JSON schemas frozen.
- **Phase 1–3** — Geography Pack data available for integration testing.

See `docs/TASK_CARDS.md`.

## Tech stack (per Engine Blueprint §11)

- HTML, CSS, JavaScript.
- React optional.
- No backend; local JSON loading only.
- In-browser state management.
