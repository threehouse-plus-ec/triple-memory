# Curation Statement — Geography Pack

**Pack version:** 0.4
**Endorsement Marker:** `geography_pack_v0.4`
**Status:** Active for the current MVP prototype dataset; future corrections will be logged as the pack evolves.
**Date:** 2026-04-23

---

## About this document

This Curation Statement is intended for teachers, parents, and players who want to understand the choices behind the data in this pack. It is not shown during gameplay. It is linked from the main menu footer and from the top-level `README.md`.

Per the Engine Blueprint's Governance Visibility Principle (§24), the pack's gameplay surface stays clean. This document is where the governance lives.

---

## 1. Preamble

Welcome to the Geography Pack. This document explains the choices we made when selecting the cards for this game. Real-world geography is often complex and highly nuanced, but a matching game requires clear, single answers to function. To make the game playable, we have established a "gameplay canon" — a specific, curated set of canonical rivers, capitals, and countries that form our valid triples. 

This gameplay canon is a convention designed for educational play, not a rigid assertion of geographic fact. Because these choices involve interpretation and compromise, every data entry carries an Endorsement Marker to indicate which curation layer approved it, ensuring transparency for teachers, parents, and players.

---

## 2. Worked examples

The following examples illustrate how we resolved non-trivial geographic complexities to create a clear gameplay experience.

### 2.1 River choice — France: Loire over Seine
When selecting a canonical river for France, we chose the Loire rather than the Seine. While the Seine is heavily associated with Paris (the capital), the Loire is the longest river flowing entirely within France and serves as a major historic spine for the country. The Seine is acknowledged as a valid alternative in our research, but the Loire anchors the gameplay triple to encourage broader geographic learning.

### 2.2 Capital choice — Netherlands: Amsterdam or The Hague
Some countries have complex capital structures. For the Netherlands, we selected Amsterdam as the canonical capital because it is designated as such by the Constitution of the Netherlands. However, The Hague is the actual seat of the government and parliament. For the purposes of a clear matching game, Amsterdam acts as the single correct capital card.

### 2.3 Inclusion and recognition — why only `un_member` at MVP
Deciding which polities to include as "countries" is inherently political. For this initial version (MVP) of the pack, we have restricted our country list strictly to fully recognised United Nations member states (`un_member`). Complex recognition cases (such as observer states or territories with limited recognition) have been deferred to future expansions to ensure the introductory game remains focused on universally taught school-atlas geography.

---

## 3. Provenance source list

The following sources were consulted by our research and verification teams during the curation of the Geography Pack v0.4 MVP:

- Britannica (Encyclopedia)
- CIA World Factbook
- Diercke Weltatlas and standard German reference atlases
- Duden (Standard German orthography)
- International River Basin Register
- National government portals and mapping agencies
- National hydrological databases
- Standard World Atlases and comparative global geography textbooks
- UN FAO Aquastat
- UN Group of Experts on Geographical Names (UNGEGN)
- Wikipedia (English and German editions, for baseline checks)

---

## 4. Dispute contact

If you believe an entry in this pack is wrong, misleading, or culturally inappropriate, please reach out. Corrections are reviewed and, where accepted, recorded in this document with an updated `endorsement_marker`.

**Contact:** Please open an issue in the project repository at `github.com/triple-memory/triple-memory/issues` or email our curation team at `curation@triple-memory.local`.

---

## 5. Endorsement Marker history

| Marker | Date | Notes |
|--------|------|-------|
| `geography_pack_v0.4` | 2026-04-23 | Current MVP prototype datasets, icons, and worked examples aligned to the v0.4 pack blueprint. |
| `geography_pack_v0.5_draft` | 2026-04-23 | Phase 2 content expansion: full 20-entity DE and facts coverage; 5 contested-recognition entities added with `is_active: false`; optional `native_display` field introduced for non-Latin scripts. **Single-operator draft — the TC-31 / TC-32 / TC-35 two-person cross-check protocol has not yet been run on the new content.** The entity-level marker stays at `geography_pack_v0.4` for the original 20 entities (core entity choices are still cross-checked); only the additive metadata and the 5 new contested entities carry the `_draft` marker. |

---

## 6. Known limitations

- Non-Latin scripts now render in the post-match overlay when a pack supplies `native_display` (v0.5_draft). Card-side labels and `initial_letter` logic remain Latin-only.
- Contested recognition cases (Palestine, Taiwan, Kosovo, Western Sahara, Northern Cyprus) present in the dataset as v0.5_draft with `is_active: false` — surfaced in Teacher View only; Shared Entity Mode board generation is unchanged until cross-check lands.
- Translation coverage extended from the 8-entry pilot to all 20 original entities at v0.5_draft; awaits cross-check sign-off before promotion.
- Fact coverage extended from the 5-entry pilot to all 20 original entities at v0.5_draft; awaits cross-check sign-off before promotion.

v0.4 limitations were MVP scoping decisions; v0.5_draft limitations are single-operator sourcing decisions awaiting the cross-check step.
