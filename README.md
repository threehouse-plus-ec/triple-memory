# Triple Memory

A triple-matching memory game engine with a geography content pack as the first implementation.

**Status:** Prototype implementation and three content packs are present. Engine and Geography Pack blueprints are frozen at v0.4; validation, accessibility hardening, and playtesting are in progress. Chemistry and Music packs ship at `v0.1_draft` — Chemistry as an engine/pack decoupling exercise, Music as a stress test for non-Latin `native_display` rendering and for the off-roster shared-letter pattern.
**Current blueprint set:** Engine v0.4 + Geography Pack v0.4 (+ v0.5_draft additive content) + Chemistry Pack v0.1_draft + Music Pack v0.1_draft.
**Design standard:** Oxford British English. Pack-specific deviations (e.g. the chemistry pack's use of the IUPAC spelling "sulfur") are documented in each pack's Curation Statement.
**Endorsement Markers:** `geography_pack_v0.4`, `geography_pack_v0.5_draft`, `chemistry_pack_v0.1_draft`, `music_pack_v0.1_draft`

---

## What this is

Triple Memory is a memory-style card game where a successful match is a **triple** — three cards of three distinct types, linked by either a shared-entity relation or a shared-letter relation. The engine is topic-agnostic; each content pack supplies its own domain.

The first pack is **Geography**: Capital · Country · River (e.g., Vienna · Austria · Danube). A second pack, **Chemistry** (Element · Symbol · Group, e.g., Sodium · Na · Alkali metal), was added as a decoupling reality check for the engine. A third pack, **Music** (Composer · Work · Instrument, e.g., Bach · Brandenburg Concertos · Harpsichord), stresses non-Latin `native_display` rendering (Cyrillic, Bengali, Devanagari) — a path the earlier packs do not exercise. Future packs (Literature, History, …) would implement the same engine interface with their own card types.

---

## Repository structure

```
triple-memory/
├── README.md                         (this file)
├── index.html                        (GitHub Pages redirect to engine/)
├── engine/                           (prototype implementation)
│   ├── README.md
│   ├── index.html
│   ├── app.js
│   ├── style.css
│   └── validator.js
├── packs/
│   ├── geography/                    (v0.4 core + v0.5_draft additive data)
│   │   ├── README.md
│   │   ├── CURATION_STATEMENT.md
│   │   ├── manifest.json
│   │   ├── entities.json
│   │   ├── cards.json
│   │   ├── letter_groups.json
│   │   └── icons/
│   ├── chemistry/                    (v0.1_draft — engine decoupling pack)
│   │   ├── README.md
│   │   ├── CURATION_STATEMENT.md
│   │   ├── manifest.json
│   │   ├── entities.json
│   │   ├── cards.json
│   │   ├── letter_groups.json
│   │   └── icons/
│   └── music/                        (v0.1_draft — native-script stress test)
│       ├── README.md
│       ├── CURATION_STATEMENT.md
│       ├── manifest.json
│       ├── entities.json
│       ├── cards.json
│       ├── letter_groups.json
│       └── icons/
├── assets/
│   └── cd/                           (shared design-system tokens + emblem)
└── docs/
    ├── ENGINE_BLUEPRINT.md           (v0.4, active)
    ├── GEOGRAPHY_PACK_BLUEPRINT.md   (v0.4, active)
    ├── PACK_INTERFACE.md             (JSON schemas)
    ├── TASK_CARDS.md                 (v1.0, ready for assignment)
    ├── ACCESSIBILITY.md
    ├── blueprint_history/            (v0.1, v0.2, v0.3 archived)
    └── deliberation_history/         (Council-3 and external reviews)
```

---

## Where to start

**New to the project?** Read in this order:

1. This README.
2. `docs/ENGINE_BLUEPRINT.md` — the topic-agnostic game engine.
3. `docs/GEOGRAPHY_PACK_BLUEPRINT.md` — the first content pack.
4. `docs/TASK_CARDS.md` — structured work assignments for data collection.
5. `packs/geography/CURATION_STATEMENT.md` — rationale, provenance notes, and dispute channel for the geography pack.
6. `packs/chemistry/CURATION_STATEMENT.md` — rationale and known limitations for the chemistry decoupling pack.
7. `packs/music/CURATION_STATEMENT.md` — rationale, canonical-work selection policy, and off-roster handling for the music pack.

**Joining a task team?** Go straight to `docs/TASK_CARDS.md` and §2 (cross-check protocol).

**Curious about the design history?** `docs/blueprint_history/` holds v0.1, v0.2, v0.3. `docs/deliberation_history/` holds the Scout, Architect, and external reviews that shaped each revision.

---

## Design principles (short form)

1. **Clean data model.** Semantic objects (reference database) are separated from display cards (gameplay deck).
2. **Engine / pack separation.** The engine defines the game; each pack defines a domain.
3. **Educational transparency.** Card types are visible by default; opacity is a difficulty setting, not a default.
4. **Governance serves play.** Curation metadata exists and is honest, but never dominates the playing surface.
5. **Cross-check is binding.** No datum is accepted from a single source by a single person.
6. **Rich information belongs to moments of certainty**, not moments of uncertainty — learning surfaces in Tutorial Mode and after correct matches, not during card selection.

---

## Current status

**Complete:**
- Engine Blueprint v0.4 (`docs/ENGINE_BLUEPRINT.md`)
- Geography Pack Blueprint v0.4 (`docs/GEOGRAPHY_PACK_BLUEPRINT.md`)
- Task Cards v1.0 (`docs/TASK_CARDS.md`)
- Prototype engine implementation in `engine/`
- Geography Pack v0.4 core data (20 UN-member entities, 60 cards, 20 letter groups, icons, Curation Statement) in `packs/geography/`
- Geography Pack v0.5_draft additive content (25 entities total, full translations and facts, `native_display` field, 5 contested-recognition entities with `is_active: false`) — single-operator, pending cross-check
- Chemistry Pack v0.1_draft (20 elements, 60 cards, 20 letter groups, icons, Curation Statement) in `packs/chemistry/` — single-operator, added to validate engine/pack decoupling
- Music Pack v0.1_draft (20 composers, 60 cards, 20 letter groups, icons, Curation Statement) in `packs/music/` — single-operator, adds non-Latin `native_display` coverage (Cyrillic, Bengali, Devanagari) via a 5-entry pilot
- Full deliberation trail archived.

**Pending:**
- TC-31 / TC-32 / TC-35 two-person cross-check of Geography v0.5_draft additive content.
- Two-person cross-check of the Chemistry pack (TC-70-style protocol).
- Two-person cross-check of the Music pack (TC-70-style protocol).
- Validation and playtest passes against the current prototype.
- Accessibility audit of the implemented UI.
- Broader coverage of multilingual variants and fact content.
- Additional engine features beyond the three-pack MVP prototype.

See `docs/TASK_CARDS.md` for the full work breakdown and estimated effort (~70–95 person-hours for Phase 1–6 data work).

---

## Corrections and disputes

If you believe an entry in this repository is wrong, misleading, or culturally inappropriate, please open an issue at `https://github.com/threehouse-plus-ec/triple-memory/issues`. Corrections are reviewed and recorded in the relevant pack's Curation Statement.

Per-pack dispute channels:
- Geography: `packs/geography/CURATION_STATEMENT.md`
- Chemistry: `packs/chemistry/CURATION_STATEMENT.md`
- Music: `packs/music/CURATION_STATEMENT.md`

---

## Licence

This repository follows the T(h)reehouse +EC Corporate Design blueprint §0.3
split-licence architecture:

- **Code** (`engine/`, `index.html`) and **design assets** (`assets/cd/`,
  `packs/geography/icons/`, `packs/chemistry/icons/`, `packs/music/icons/`) —
  MIT. See [`LICENCE`](LICENCE).
- **Framework documents and content** (`docs/`, `packs/geography/*.json`,
  `packs/geography/CURATION_STATEMENT.md`, `packs/chemistry/*.json`,
  `packs/chemistry/CURATION_STATEMENT.md`, `packs/music/*.json`,
  `packs/music/CURATION_STATEMENT.md`) — CC BY-SA 4.0. See
  [`LICENCE-CONTENT`](LICENCE-CONTENT).
- **Fonts** (IBM Plex Mono, Crimson Pro, loaded from Google Fonts) — SIL OFL
  1.1 (governed upstream, not redistributed here).

Each folder carries its own licence note in its README or `LICENCE.md`.
Downstream consumers should check the specific layer they are using.
