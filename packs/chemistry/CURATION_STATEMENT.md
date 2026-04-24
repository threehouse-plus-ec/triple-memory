# Curation Statement — Chemistry Pack

**Pack version:** 0.1 (draft)
**Endorsement Marker:** `chemistry_pack_v0.1_draft`
**Status:** Single-operator draft. Exists to validate engine/pack decoupling; content has not been through a two-person cross-check.
**Date:** 2026-04-24

---

## About this document

This Curation Statement is intended for teachers, parents, and players who want to understand the choices behind the data in this pack. It is not shown during gameplay. It is linked from the main menu footer and from the top-level `README.md`.

Per the Engine Blueprint's Governance Visibility Principle (§24), the pack's gameplay surface stays clean. Governance lives here.

---

## 1. Preamble

Chemistry has the advantage of a single authoritative source. The names, symbols, and group assignments used in this pack follow the IUPAC Periodic Table (2021 edition). Within that constraint, three curation decisions remain:

- **Which 20 elements.** Chosen to be recognisable at school-atlas level and to span the eight commonly-taught groups (alkali metal, alkaline earth metal, transition metal, post-transition metal, metalloid, nonmetal, halogen, noble gas).
- **Which group name.** Some elements sit on the boundary of two categories (e.g. hydrogen is sometimes grouped with the alkali metals and sometimes with the nonmetals). We chose the category most commonly taught at secondary-school level.
- **How to treat symbols.** Symbols are short Latin strings (1–2 characters) and do not always share their first letter with the element name — *Na* for Sodium, *Fe* for Iron, *Au* for Gold. Letter-matching groups therefore cross elements by symbol, element name, and group name independently; a card's juxtaposition in a letter group asserts nothing about chemical reality.

---

## 2. Worked examples

### 2.1 Group choice — Hydrogen as a nonmetal

Hydrogen sits in group 1 of the periodic table alongside the alkali metals, but it is a reactive nonmetal that shares many properties with the halogens. The IUPAC table classifies it most commonly as a nonmetal. We adopted that classification; the alkali-metal grouping is acknowledged as a valid alternative.

### 2.2 Symbol–name divergence — Sodium (Na), Iron (Fe), Gold (Au)

Many element symbols derive from the element's Latin or Greek name (*natrium*, *ferrum*, *aurum*) rather than the English form. Letter-matching groups therefore treat the symbol as an independent Latin token — *Na* starts with *N*, not *S*. This is correct under IUPAC conventions and is clarified in the pack README; players who only know the English names may need a round or two to adjust.

### 2.3 Letter-group coverage — repeated group cards

Only seven letters in the Latin alphabet begin a commonly-taught group name (A, H, L, M, N, P, T). Several letters have exactly one matching group (*Halogen* for H, *Lanthanide* for L, *Metalloid* for M, *Transition metal* for T, *Post-transition metal* for P). Consequently a letter group like `H_02` (*Helium · He · Halogen*) repeats the *Halogen* label from `H_01` (*Hydrogen · H · Halogen*). This is a structural consequence of the pack's shape, not a data duplication bug: each letter group is a distinct triple of cards drawn from three different card types.

---

## 3. Provenance source list

- IUPAC Periodic Table of Elements (2021 edition).
- Royal Society of Chemistry, periodic-table educational materials.
- Standard school-level chemistry references and atlases (for German common-name translations in the label-variants pilot).

---

## 4. Dispute contact

If you believe an entry in this pack is wrong, misleading, or pedagogically inappropriate, please reach out. Corrections are reviewed and, where accepted, recorded in this document with an updated `endorsement_marker`.

**Contact:** Please open an issue in the project repository at `github.com/threehouse-plus-ec/triple-memory/issues`.

---

## 5. Endorsement Marker history

| Marker | Date | Notes |
|--------|------|-------|
| `chemistry_pack_v0.1_draft` | 2026-04-24 | Initial draft. 20 elements, 20 letter groups, 5-entry DE and facts pilot. Single-operator; TC-70-style cross-check not yet run. |

---

## 6. Known limitations

- Only 20 of 118 elements represented. Group coverage is complete for common schoolbook groups but Lanthanide / Actinide categories appear in letter_groups only (no v0.1 entity).
- No isotope / mass-number / electron-configuration card types. Triple is (element, symbol, group) only.
- Symbols are rendered as 1–2 Latin characters; no subscript or superscript formatting.
- Non-Latin scripts are not supplied for chemistry at v0.1. If the engine's `native_display` field is populated in a later revision, it would typically carry the element name in the reader's language rather than a script difference.
- All content is single-operator and pending the TASK_CARDS v1.0 §2 two-person cross-check protocol.
