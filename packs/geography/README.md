# Geography Pack — Triple Memory

**Status:** v0.4 core (20 UN-member entities) is cross-checked and endorsed; v0.5_draft additive content (5 contested-recognition entities, expanded translations and facts, optional `native_display`) is present in the data and awaiting TC-31 / TC-32 / TC-35 two-person cross-check. The pack is validated and playtested against `docs/GEOGRAPHY_PACK_BLUEPRINT.md`.

**Pack version:** 0.4 (endorsed) + v0.5_draft additive content
**Endorsement Marker:** `geography_pack_v0.4` (original 20 entities); `geography_pack_v0.5_draft` (additive metadata and 5 new contested entities)

## Current contents (per Pack Blueprint §16)

- `manifest.json` — pack declaration (TC-52).
- `entities.json` — 25 country entries (TC-16): 20 `un_member`, 1 `un_observer` (Palestine), 4 `limited_recognition` (Taiwan, Kosovo, Western Sahara, Northern Cyprus). The 5 non-`un_member` entries carry `is_active: false` and the `geography_pack_v0.5_draft` marker.
- `cards.json` — 75 cards derived from entities (TC-17).
- `letter_groups.json` — 20 curated letter triples (TC-24). Some letter-group cards reference `country_id` values (e.g. `GBR`, `RUS`, `CAN`, `LTU`) that are not represented as entities in this pack; the engine synthesises those as shared-letter cards without entity metadata.
- `icons/` — three SVG icons (TC-50):
  - `capital.svg`
  - `country.svg`
  - `river.svg`
- `CURATION_STATEMENT.md` — canonical-choice rationale, provenance, and dispute channel.

## Scope

- **v0.4 endorsed core:** 20 UN-member states (Pack Blueprint §7), 20 letter groups, three custom monochrome accessibility-compliant icons.
- **v0.5_draft additive content (single-operator, pending cross-check):**
  - Full trilingual labels (EN / DE / `local_display`) on all 25 entities.
  - 1–3 structured facts on all 25 entities.
  - Optional `native_display` field for non-Latin-script local forms (surfaced in the post-match overlay only; card faces and `initial_letter` logic remain Latin-only).
  - 5 contested-recognition entities flagged `is_active: false` — surfaced in Teacher View only; shared-entity board generation is unchanged until cross-check lands.

## Dispute channel

Please open an issue at `https://github.com/threehouse-plus-ec/triple-memory/issues`. Pack-specific disputes are reviewed and, where accepted, recorded in `CURATION_STATEMENT.md` with an updated `endorsement_marker`.

## Licence

This folder carries two licences per the repository's split architecture:

- **JSON datasets** (`manifest.json`, `entities.json`, `cards.json`,
  `letter_groups.json`) and **`CURATION_STATEMENT.md`** — CC BY-SA 4.0.
  See [`../../LICENCE-CONTENT`](../../LICENCE-CONTENT).
- **SVG icons** in `icons/` — MIT. See [`../../LICENCE`](../../LICENCE).
