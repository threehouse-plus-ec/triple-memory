# Chemistry Pack — Triple Memory

**Status:** Draft v0.1. Exists to validate engine/pack decoupling; all content is single-operator draft and flagged as such.

**Pack version:** 0.1
**Endorsement Marker:** `chemistry_pack_v0.1_draft`

## Purpose

The engine was first built alongside the geography pack. Some pack-agnostic assumptions had to be checked before a second pack could load, and this pack is the reality check. It deliberately mirrors the geography pack's shape — three card types per entity, a `manifest.json` + `entities.json` + `cards.json` + `letter_groups.json` layout, the same board sizes — so any remaining coupling between engine and content surfaces as a concrete failure rather than a theoretical one.

## Triple

Each entity is a chemical element. Its three cards are:

- **Element** — the element's English name (e.g. *Sodium*).
- **Symbol** — its IUPAC chemical symbol (e.g. *Na*). Symbols are 1–2 Latin characters, intentionally shorter than the other two card labels.
- **Group** — its commonly-taught classification (e.g. *Alkali metal*).

## Current contents

- `manifest.json` — pack declaration, 3 card types, en + de locales, board sizes 12 / 18 / 24.
- `entities.json` — 20 elements spanning the 8 commonly-taught groups.
- `cards.json` — 60 cards (3 per element).
- `letter_groups.json` — 20 curated triples covering the 7 letters that have at least one group name starting with them (A, H, L, M, N, P, T). Some letters have repeated group-cards because only a single group name starts with that letter (e.g. H → Halogen).
- `icons/element.svg`, `icons/symbol.svg`, `icons/group.svg` — three monochrome `currentColor` SVGs.
- `CURATION_STATEMENT.md` — choices, provenance, dispute channel.

## Scope at v0.1

- 20 elements, 20 letter groups.
- DE label_variants supplied for a 5-entry pilot (H, He, C, O, Fe) where the German form differs meaningfully. Others carry empty `label_variants: {}`.
- Facts supplied for the same 5-entry pilot (three per card type per entity). Others carry empty `facts: {}`.
- Lanthanide and Actinide groups referenced in letter_groups only; no v0.1 entity belongs to those groups.

All content is **draft** and has not been through the TASK_CARDS v1.0 §2 two-person cross-check protocol. Entities and letter-group cards carry `endorsement_marker: "chemistry_pack_v0.1_draft"` so they are grep-able for a future verification pass.

## Launch

`engine/?pack=chemistry` — the engine's pack selector in the menu switches between geography and chemistry without reload of the app shell.

## Dispute channel

Please open an issue at `github.com/threehouse-plus-ec/triple-memory/issues`. Pack-specific disputes are reviewed and, where accepted, recorded in `CURATION_STATEMENT.md` with an updated `endorsement_marker`.

## Licence

This folder carries two licences per the repository's split architecture:

- **JSON datasets** (`manifest.json`, `entities.json`, `cards.json`, `letter_groups.json`) and **`CURATION_STATEMENT.md`** — CC BY-SA 4.0. See [`../../LICENCE-CONTENT`](../../LICENCE-CONTENT).
- **SVG icons** in `icons/` — MIT. See [`../../LICENCE`](../../LICENCE).
