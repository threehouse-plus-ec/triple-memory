# Geography Pack — Triple Memory

**Status:** Draft MVP data, icons, and Curation Statement are present. The pack is currently being validated and playtested against `docs/GEOGRAPHY_PACK_BLUEPRINT.md`.

**Pack version:** 0.4
**Endorsement Marker:** `geography_pack_v0.4`

## Current contents (per Pack Blueprint §16)

- `manifest.json` — pack declaration (TC-52).
- `entities.json` — 20 UN-member country entries (TC-16).
- `cards.json` — 60 cards derived from entities (TC-17).
- `letter_groups.json` — 20 curated letter triples (TC-24).
- `icons/` — three SVG icons (TC-50):
  - `capital.svg`
  - `country.svg`
  - `river.svg`
- `CURATION_STATEMENT.md` — canonical-choice rationale, provenance, and dispute channel.

## Scope at MVP

- UN member states only (Pack Blueprint §7).
- 20 entity entries, 20 letter groups.
- Full trilingual labels (EN / DE / local_display) on a pilot subset of 5–8 entries only.
- 1–3 structured facts on a pilot subset of 3–5 entries only.
- Three custom monochrome icons, accessibility-compliant.

## Dispute channel

Please open an issue at `github.com/triple-memory/triple-memory/issues` or email `curation@triple-memory.local`. Pack-specific disputes are reviewed and, where accepted, recorded in `CURATION_STATEMENT.md` with an updated `endorsement_marker`.

## Licence

This folder carries two licences per the repository's split architecture:

- **JSON datasets** (`manifest.json`, `entities.json`, `cards.json`,
  `letter_groups.json`) and **`CURATION_STATEMENT.md`** — CC BY-SA 4.0.
  See [`../../LICENCE-CONTENT`](../../LICENCE-CONTENT).
- **SVG icons** in `icons/` — MIT. See [`../../LICENCE`](../../LICENCE).
