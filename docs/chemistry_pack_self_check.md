# Chemistry Pack Self-Check

**Status:** Single-operator self-audit. Serves as the starting point for a future two-person cross-check (TC-70-style, following the TASK_CARDS v1.0 §2 protocol). This is **not** a substitute for that cross-check — no content in `packs/chemistry/` has yet been independently verified.
**Date:** 2026-04-24
**Pack version:** 0.1 (draft)
**Endorsement Marker audited:** `chemistry_pack_v0.1_draft`

---

## 0. Purpose

The Geography Pack had a structured Phase 6 self-check (`pack_self_check.md`, TC-61) before its first playtest. The Chemistry Pack was added as an engine-decoupling reality check and therefore did not go through the same task-card workflow. This document applies the equivalent §10 Engine Interface Compliance Checklist to the Chemistry Pack so that any subsequent cross-check has a baseline to verify against, and so that decoupling-relevant observations are recorded in one place.

---

## 1. Engine §10 Interface Compliance Checklist

- [x] **1. Pack Manifest (Engine §8.4):** `packs/chemistry/manifest.json` is present; parses as valid JSON; declares the 3 card types (`element`, `symbol`, `group`), both supported modes (`shared_entity`, `shared_letter`), supported locales (`en`, `de`), primary locale (`en`), supported board sizes (12 / 18 / 24), curation-statement path, and accessibility declaration.
- [x] **2. Entity Dataset (Engine §8.1):** `packs/chemistry/entities.json` is present; parses as valid JSON; contains 20 element entries. Each entry carries the engine-required fields (`entity_id`, `entity_name`, `difficulty`, `is_active`, `endorsement_marker`) plus pack-specific metadata (`element_symbol`, `group_name`, `atomic_number`, `provenance`).
- [x] **3. Card Dataset (Engine §8.2):** `packs/chemistry/cards.json` is present; parses as valid JSON; contains 60 cards — exactly 3 per entity (element / symbol / group). All cards pass the validator's `initial_letter` consistency check (first displayed-label character matches `initial_letter`, including the deliberate `Na → N` / `Fe → F` / `Au → A` symbol cases noted in the Curation Statement §2.2).
- [x] **4. Letter-Group Dataset (Engine §8.3):** `packs/chemistry/letter_groups.json` is present; parses as valid JSON; contains 20 curated triples covering the 7 letters (A, H, L, M, N, P, T) that begin at least one commonly-taught group name. Each group contains exactly 3 cards of 3 distinct card types. All labels within a group satisfy the `initial_letter` consistency check.
- [ ] **5. Icons:** `element.svg`, `symbol.svg`, and `group.svg` are present in `packs/chemistry/icons/` as monochrome `currentColor` SVGs. The manifest's `accessibility_declaration` asserts shape-distinctness and colour-independence, but **no equivalent of the Geography TC-51 accessibility audit has been carried out**. Tick-box left unchecked pending an audit pass.
- [x] **6. Curation Statement:** `packs/chemistry/CURATION_STATEMENT.md` is present. Includes preamble (§1), five worked examples (§2.1 Hydrogen-as-nonmetal, §2.2 symbol–name divergence, §2.3 repeated group cards, §2.4 off-roster letter-group cards, §2.5 Sulfur spelling), provenance source list (§3), dispute contact (§4), endorsement-marker history (§5), and known limitations (§6).
- [x] **7. Fact Content (Optional):** Supplied for a 5-entry pilot (H, He, C, O, Fe), three facts per card type per entity. The remaining 15 entities carry empty `facts: {}` by design — documented in `README.md` and `CURATION_STATEMENT.md §6`.
- [x] **8. Label Variants (Optional):** Supplied for the same 5-entry pilot, covering EN / DE / `local_display` per card type. The remaining 15 entities carry empty `label_variants: {}` by design.

---

## 2. Decoupling observations

These are items that surfaced during the engine/pack decoupling check and that a cross-checker should keep in mind. None are blockers for play.

- **Off-roster letter-group references.** 13 distinct entity_ids referenced in `letter_groups.json` are not present in `entities.json`: `AR`, `AC`, `AS`, `AM`, `HF`, `LA`, `MN`, `NI`, `NB`, `P`, `PT`, `TI`, `TA`. The engine synthesises shared-letter cards without entity metadata for these references ([`engine/app.js:463`](../engine/app.js#L463)); such cards play normally but do not surface facts or trilingual labels in the post-match overlay. This is intentional and documented in `README.md` and `CURATION_STATEMENT.md §2.4`. The Geography Pack exhibits the same pattern for `country_id` values like `GBR`, `RUS`, `CAN`, `LTU`. A cross-checker should confirm each off-roster reference resolves to a real, uncontroversially-named element or group; the risk is a typo slipping in without an `entities.json` entry to catch it.
- **`shared_entity_field` value.** The chemistry manifest uses `entity_id` as its `shared_entity_field`, whereas geography uses `country_id`. Both flow through `engine/validator.js:89` and `engine/app.js:463`, which accept either. Confirmed working.
- **Letter coverage asymmetry.** Only 7 of 26 Latin letters begin at least one commonly-taught group name, so letter-group diversity is naturally lower than in geography. Several groups reuse the same group-card label (e.g. both `H_01` and `H_02` include *Halogen*). This is a structural consequence of the pack's shape, not a data-duplication bug — see `CURATION_STATEMENT.md §2.3`.
- **Spelling standard deviation.** The project standard is Oxford British English, but the chemistry pack uses the IUPAC form "Sulfur" throughout (entity name, card label, initial letter `S`). Rationale and all other Oxford-British conventions (*aluminium*, *colourless*, *lustre*) are documented in `CURATION_STATEMENT.md §2.5`.

---

## 3. Outstanding work before promotion

Before the Chemistry Pack can drop the `_draft` suffix from its endorsement marker:

1. **Two-person cross-check of entity roster.** Verify each of the 20 entities' `element_symbol`, `group_name`, and `atomic_number` against two independent sources (IUPAC Periodic Table 2021 edition and one other — RSC, Britannica, or a standard school chemistry textbook). The group-assignment boundary cases flagged in the Curation Statement (Hydrogen as nonmetal; Mercury as transition metal; Aluminium as post-transition metal) should be explicitly acknowledged by both checkers.
2. **Cross-check of letter-group triples.** Verify that every labelled element and symbol in `letter_groups.json` is real and correctly spelled, including off-roster references.
3. **Cross-check of the 5-entry fact and label_variants pilot.** Verify each German translation and each fact statement against an independent source.
4. **Icon accessibility audit.** Replicate the Geography TC-51 protocol on `element.svg`, `symbol.svg`, `group.svg`: shape-distinctness under colour-blind simulation, legibility at minimum card size, colour-independence.
5. **First playtest.** Board generation, shared-letter board draw (including off-roster cards surfacing with synthesised metadata), post-match overlay behaviour for the 5-entry fact pilot.

On completion, the endorsement marker can be promoted from `chemistry_pack_v0.1_draft` to `chemistry_pack_v0.1` in all files, with the history row added to `CURATION_STATEMENT.md §5`.

---

## 4. Single-operator sign-off

- **Researcher:** (single-operator — pending independent verifier)
- **Verifier:** _not yet assigned_
- **Scribe:** _not yet assigned_

This document will be amended with cross-check log entries once the two-person protocol runs.
