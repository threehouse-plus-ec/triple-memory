# Music Pack Self-Check

**Status:** Single-operator self-audit. Serves as the starting point for a future two-person cross-check (TC-70-style, following the TASK_CARDS v1.0 §2 protocol). No content in `packs/music/` has yet been independently verified.
**Date:** 2026-04-24
**Pack version:** 0.1 (draft)
**Endorsement Marker audited:** `music_pack_v0.1_draft`

---

## 0. Purpose

The Geography Pack had a structured Phase 6 self-check (`pack_self_check.md`, TC-61) before its first playtest, and the Chemistry Pack has an equivalent self-audit at `docs/chemistry_pack_self_check.md`. This document applies the same §10 Engine Interface Compliance Checklist to the Music Pack so that any subsequent cross-check has a baseline to verify against, and so that pack-specific hazards (native-script rendering, off-roster shared-letter references, canonical-work selection bias) are recorded in one place.

---

## 1. Engine §10 Interface Compliance Checklist

- [x] **1. Pack Manifest (Engine §8.4):** `packs/music/manifest.json` is present; parses as valid JSON; declares the 3 card types (`composer`, `work`, `instrument`), both supported modes (`shared_entity`, `shared_letter`), supported locales (`en`, `de`), primary locale (`en`), supported board sizes (12 / 18 / 24), curation-statement path, and accessibility declaration.
- [x] **2. Entity Dataset (Engine §8.1):** `packs/music/entities.json` is present; parses as valid JSON; contains 20 composer entries. Each entry carries the engine-required fields (`entity_id`, `entity_name`, `difficulty`, `is_active`, `endorsement_marker`) plus pack-specific metadata (`full_name`, `canonical_work`, `canonical_instrument`, `era`, `nationality`, `provenance`).
- [x] **3. Card Dataset (Engine §8.2):** `packs/music/cards.json` is present; parses as valid JSON; contains 60 cards — exactly 3 per entity (composer / work / instrument). All cards pass the validator's `initial_letter` consistency check, including the NFD-normalised *Dvořák → D* case. All cards referenced by a letter group carry `shared_letter` in `mode_tags`.
- [x] **4. Letter-Group Dataset (Engine §8.3):** `packs/music/letter_groups.json` is present; parses as valid JSON; contains 20 curated triples covering 11 letters (B, C, D, F, H, L, M, P, R, S, T, V). Each group contains exactly 3 cards of 3 distinct card types. All labels within a group satisfy the `initial_letter` consistency check.
- [ ] **5. Icons:** `composer.svg`, `work.svg`, and `instrument.svg` are present in `packs/music/icons/` as monochrome `currentColor` SVGs. The manifest's `accessibility_declaration` asserts shape-distinctness and colour-independence, but **no equivalent of the Geography TC-51 accessibility audit has been carried out**. Tick-box left unchecked pending an audit pass. The three silhouettes are deliberately dissimilar (diagonal baton; rectangular score with horizontal staff lines; small round note-head with vertical stem and flag), which should help the audit but does not substitute for it.
- [x] **6. Curation Statement:** `packs/music/CURATION_STATEMENT.md` is present. Includes preamble (§1), six worked examples (§2.1 canonical-work selection, §2.2 canonical-instrument as chain-not-attribute, §2.3 off-roster letter-group cards, §2.4 definite-article stripping for letter-mode matching, §2.5 native-script handling, §2.6 selection bias), provenance source list (§3), dispute contact (§4), endorsement-marker history (§5), and known limitations (§6).
- [x] **7. Fact Content (Optional):** Supplied for a 5-entry pilot (Bach, Mozart, Beethoven, Tchaikovsky, Ravi Shankar), three facts per card type per entity. The remaining 15 entities carry empty `facts: {}` by design — documented in `README.md` and `CURATION_STATEMENT.md §6`.
- [x] **8. Label Variants (Optional):** Supplied for the same 5-entry pilot, covering EN / DE / `local_display` per card type. Tchaikovsky adds Cyrillic `native_display` strings; Ravi Shankar adds Bengali and Devanagari `native_display` strings. The other 15 entities carry empty `label_variants: {}`.

---

## 2. Pack-specific observations

These are items that a cross-checker should keep in mind. None are blockers for play.

- **Off-roster letter-group references.** 12 distinct `entity_id` values appear in `letter_groups.json` but not in `entities.json`: composers `FAURE`, `PAGANINI`, `PUCCINI`, `TELEMANN` and instruments `DOUBLEBASS`, `DRUMS`, `HORN`, `LUTE`, `MANDOLIN`, `MARIMBA`, `RECORDER`, `SAX`. These synthesise at runtime via `engine/app.js:463` and do not surface facts or label_variants in the overlay. A cross-checker should confirm each off-roster composer and instrument is a real, uncontroversially-named entity; the risk is a typo slipping in without an `entities.json` row to catch it. **Composer-label off-roster entries are particularly sensitive** because they assert cultural presence without carrying the provenance field that a roster entry would.
- **Canonical-work selection is editorial.** The rule applied — canonical work is chosen for letter-mode triple-strength plus popular recognition, not for musicological weight — means reasonable alternatives exist for every entry. Example alternatives not chosen: for Bach, *St Matthew Passion* (would re-route instrument to *Voice*); for Beethoven, *Ninth Symphony* (would re-route instrument to either *Orchestra* or *Voice*); for Stravinsky, *Firebird* (would re-route instrument to *Orchestra*); for Gershwin, *Porgy and Bess* (would re-route instrument to *Voice*). The Curation Statement §2.1 acknowledges this; a cross-checker should verify that each chosen work is a recognised major work of the composer and not an obscure curiosity.
- **Canonical-instrument-as-chain rule (§2.2).** Bach's canonical instrument is listed as *Harpsichord*, not *Organ*, because the featured instrument of the canonical work (*Brandenburg Concertos*, especially No. 5) is the harpsichord. This is the rule the pack applies throughout and it must be cross-checked consistently: a reader who knows Bach as an organist may treat this as an error unless the rule is visible to them.
- **Non-Latin script pilot is narrow.** Cyrillic appears only via Tchaikovsky; Bengali and Devanagari only via Ravi Shankar. A cross-checker who reads either script natively should verify: (a) Чайковский, Щелкунчик (Russian); (b) রবি শংকর (Bengali); (c) राग जोग, सितार (Devanagari). Transliterations used in `local_display` for `native_display` entries are visually identical to `native_display`, which is not correct for cards that should offer a Latin-script local form — this is a known gap and a v0.2 item.
- **Piano over-representation.** 5 of 20 entities have `Piano` as their canonical instrument, and P is a letter with no roster composer. Letter-group design uses *Paganini* and *Puccini* as off-roster composer cards to make P-letter triples work. This is structurally similar to the chemistry pack's Halogen/H-letter situation and does not indicate a data bug.
- **`entity_name` for Hildegard and Ravi Shankar uses the full name** (including first-name form) because the short surname form would mis-identify (*Bingen* is not a standard way to refer to Hildegard; *Shankar* alone is ambiguous given Anoushka Shankar and Uday Shankar). This is consistent with the use of *Clara Schumann* (to distinguish from Robert) and is documented in the pack README. `initial_letter` for the composer-card follows the displayed label (*H* for Hildegard, *R* for Ravi).

---

## 3. Outstanding work before promotion

Before the Music Pack can drop the `_draft` suffix from its endorsement marker:

1. **Two-person cross-check of the composer roster.** For each of the 20 composers, verify `full_name`, `canonical_work`, `canonical_instrument`, `era`, and `nationality` against two independent sources (Grove Music Online and one other — a published catalogue, a scholarly biography, or a standard reference textbook). The canonical-work selection should be explicitly acknowledged by both checkers per §2.1 of the Curation Statement.
2. **Cross-check of letter-group triples.** Verify that every labelled composer, work, and instrument in `letter_groups.json` is real and correctly spelled, including off-roster references. Double-check the initial letter of each off-roster label against the group's `initial_letter`.
3. **Cross-check of the 5-entry fact and label_variants pilot.** Verify each DE translation, each `native_display` rendering, and each fact statement against an independent source. Native-script checks need a reader of the relevant script.
4. **Correct `local_display` for native-script entries.** The pilot currently duplicates the native-script string into `local_display`, which is wrong when `local_display` is meant to be the Latin-script official local form. Decide per entity whether `local_display` should be the scientific-transliteration form (e.g. *Chaikovskij* under ISO 9) or the conventional English form, and update.
5. **Icon accessibility audit.** Replicate the Geography TC-51 protocol on `composer.svg`, `work.svg`, `instrument.svg`: shape-distinctness under colour-blind simulation, legibility at minimum card size, colour-independence.
6. **First playtest.** Board generation at 12 / 18 / 24 sizes; shared-letter board draw (including off-roster cards surfacing with synthesised metadata); post-match overlay behaviour for the 5-entry fact pilot; native-script rendering on both desktop and mobile breakpoints.

On completion, the endorsement marker can be promoted from `music_pack_v0.1_draft` to `music_pack_v0.1` in all files, with the history row added to `CURATION_STATEMENT.md §5`.

---

## 4. Single-operator sign-off

- **Researcher:** (single-operator — pending independent verifier)
- **Verifier:** _not yet assigned_
- **Scribe:** _not yet assigned_

This document will be amended with cross-check log entries once the two-person protocol runs.
