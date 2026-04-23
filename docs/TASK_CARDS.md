# Task Cards — Geography Pack v0.4 Data Collection & Cross-Check

**Version:** 1.0
**Date:** 2026-04-22
**Status:** Ready for team assignment
**Companion documents:** Engine Blueprint v0.4, Geography Pack Blueprint v0.4
**Endorsement Marker:** `geography_pack_v0.4_tasking`

---

## 0. How to use these cards

Each card is a self-contained unit of work. Teams pick up a card, complete it, and mark it done by satisfying the **Acceptance Criteria** and passing **Cross-Check**.

**Card anatomy:**

- **ID** — stable identifier (TC-xx).
- **Title** — what it produces.
- **Team** — which role owns it (see §1).
- **Depends on** — cards that must be complete first.
- **Inputs** — what the team needs.
- **Outputs** — what the team produces.
- **Acceptance criteria** — how we know it's done.
- **Cross-check** — who verifies, by what method.
- **Blueprint anchor** — which section of the blueprint governs this.
- **Estimated effort** — rough hours for a two-person team.

Cards may be worked in parallel where dependencies allow. The phase structure is advisory, not rigid.

---

## 1. Team roles

Three roles, based on the Council-3 stances. One person can hold more than one role on different cards, but not on the same card (see §2 cross-check rule).

- **Researcher** — collects primary data, drafts content.
- **Verifier** — independently checks researcher output against a second source.
- **Scribe** — prepares the final JSON or markdown artefact from verified content.

A "team" for a given card is typically one Researcher plus one Verifier, sometimes with a Scribe. For short cards the Scribe role may be combined with Researcher.

---

## 2. Cross-check protocol (binding)

The cross-check rule is non-negotiable:

1. **Two-person minimum.** No card is marked done by a single person.
2. **Independent sources.** The Verifier must consult a source the Researcher did not use.
3. **Written trail.** Both sources are recorded in the card's completion note (source A / source B, one line each).
4. **Disagreement = escalation.** If Researcher and Verifier disagree on a fact, the card is flagged and routed to the Curation Statement for documented resolution, not silently overridden.
5. **No self-verification.** Same person cannot research and verify. Same team cannot pass cards to itself without a reviewer outside the team.

**Guardian citation:** Violation of this protocol is a Violation of Clarity. Cards that skip cross-check are returned, not accepted.

---

## 3. Phase overview

| Phase | Cards | Focus | Parallel OK? |
|------:|-------|-------|:------------:|
| 0 | TC-00, TC-01 | Setup | — |
| 1 | TC-10 to TC-17 | Shared Entity data (20 country triples) | Within phase |
| 2 | TC-20 to TC-24 | Shared Letter data (20 letter groups) | After TC-17 |
| 3 | TC-30 to TC-36 | Pilot enrichment (DE / local / facts) | After TC-17 |
| 4 | TC-40 to TC-43 | Curation Statement | Alongside Phase 1–3 |
| 5 | TC-50 to TC-52 | Icons & manifest | Independent |
| 6 | TC-60 to TC-62 | Integration & first playtest | After all above |

---

## Phase 0 — Setup

### TC-00 — Repository skeleton

- **Team:** Scribe.
- **Depends on:** none.
- **Inputs:** Engine Blueprint §23 file structure.
- **Outputs:** empty directory tree committed to the repository (`engine/`, `packs/geography/`, `docs/`, `assets/cd/`, `README.md` stub).
- **Acceptance criteria:** structure matches Engine §23; README links to both blueprints.
- **Cross-check:** second team member reviews the commit and confirms no extra or missing directories.
- **Blueprint anchor:** Engine §23, Pack §16.
- **Effort:** 1 hour.

### TC-01 — Freeze JSON schemas

- **Team:** Researcher (engine-side) + Verifier.
- **Depends on:** TC-00.
- **Inputs:** Engine Blueprint §8, Pack Blueprint §4, §11.2.
- **Outputs:** `docs/PACK_INTERFACE.md` with JSON Schema (draft-07 or later) for `manifest.json`, `entities.json`, `cards.json`, `letter_groups.json`.
- **Acceptance criteria:** schemas cover all required fields from §8.1–§8.4; schemas validate the worked examples in Pack §15; `card_type` enum matches the three manifest-declared types.
- **Cross-check:** Verifier runs the schemas against Pack §15.1 (Austria) and §15.2 (France) examples using a standard JSON Schema validator; both must pass. Verifier also checks that an intentionally malformed entry (e.g. missing `river_name`) fails.
- **Blueprint anchor:** Engine §8, §10; Pack §4.
- **Effort:** 4–6 hours.

---

## Phase 1 — Shared Entity Data (20 country triples)

### TC-10 — Select 20 UN-member countries

- **Team:** Researcher + Verifier.
- **Depends on:** TC-01.
- **Inputs:** UN member state list; Engine §22.1 MVP scope; Pack §7 recognition policy; difficulty heuristic (familiarity at school-atlas level).
- **Outputs:** `docs/selection_shortlist.md` — 20 ISO-3166 alpha-3 codes with a one-line rationale each. Regional balance: aim for at least 4 Europe, 3 Asia, 3 Africa, 3 Americas, 2 Oceania, rest open.
- **Acceptance criteria:** all 20 are `un_member`; regional spread documented; no two countries with severely overlapping identifier letters at school-atlas level (this is a soft preference, not a hard rule).
- **Cross-check:** Verifier confirms UN membership status for each from the current UN member list (separate from Researcher's source). Verifier flags any difficulty-rating disagreements.
- **Blueprint anchor:** Pack §7, §12.1.
- **Effort:** 3–4 hours.

### TC-11 — Canonical capital research

- **Team:** Researcher + Verifier. One team of two per 10 entries, or one team covering all 20.
- **Depends on:** TC-10.
- **Inputs:** the 20 countries from TC-10; Pack §6 capital policy.
- **Outputs:** `docs/capital_research.md` — for each country: canonical `capital_name`, `alternative_capitals` list, `capital_selection_reason`, and a one-sentence rationale for non-trivial cases. Flag every case where `alternative_capitals` is non-empty as a "non-trivial case" for Curation Statement worked-example selection.
- **Acceptance criteria:** every entry has a `capital_selection_reason` from the permitted enum; every non-trivial case has a rationale note; contested cases (if any appear) are flagged and escalated to TC-41.
- **Cross-check:** Verifier consults a source independent of the Researcher's (e.g., one uses CIA World Factbook, the other uses Britannica or the country's official government portal). Any mismatch is logged.
- **Blueprint anchor:** Pack §6, §14.2.
- **Effort:** 4–6 hours.

### TC-12 — Canonical river research

- **Team:** Researcher + Verifier.
- **Depends on:** TC-10.
- **Inputs:** the 20 countries; Pack §5 river policy and `selection_reason` enum.
- **Outputs:** `docs/river_research.md` — for each country: canonical `river_name`, `selection_reason`, and a one-sentence rationale for non-trivial cases (i.e., any country with two or more plausible rivers). Flag each non-trivial case for Curation Statement use.
- **Acceptance criteria:** every entry has a `selection_reason` from the permitted enum; non-trivial cases have a rationale; rivers chosen meet the canonical-rule principle in Pack §5.
- **Cross-check:** Verifier consults a different source (e.g., Researcher uses UN FAO Aquastat; Verifier uses a national hydrological agency page or a standard atlas). Where the two sources disagree on which river is "most important", the case is flagged for Curation Statement documentation, not silently resolved.
- **Blueprint anchor:** Pack §5, §14.3.
- **Effort:** 5–7 hours.

### TC-13 — Transboundary river metadata

- **Team:** Researcher + Verifier.
- **Depends on:** TC-12.
- **Inputs:** the canonical rivers from TC-12.
- **Outputs:** `docs/river_transboundary.md` — for each river: `shared_river_flag` (boolean) and `shared_river_countries` (list of ISO-3166 alpha-3 codes for other riparian states). Rivers wholly within one country get `false` and an empty list.
- **Acceptance criteria:** riparian lists are complete for transboundary rivers (e.g., Danube returns 10 countries).
- **Cross-check:** Verifier checks each transboundary river's country list against a second source (e.g., Researcher uses the river's Wikipedia infobox; Verifier uses an authoritative river-basin atlas or the International Commission governing the river if applicable).
- **Blueprint anchor:** Pack §4, §14.3.
- **Effort:** 3–4 hours.

### TC-14 — Cross-check: capitals (second pass)

- **Team:** Verifier (different person from TC-11 Verifier).
- **Depends on:** TC-11.
- **Inputs:** TC-11 output.
- **Outputs:** a sign-off entry in `docs/capital_research.md` per country, or a flag note where a second-pass source disagrees.
- **Acceptance criteria:** every country has two independent confirmations; all flags routed to TC-41.
- **Cross-check:** this card IS the cross-check for TC-11 at the second-pass level. It exists because capitals are politically sensitive and deserve a doubled check.
- **Blueprint anchor:** Pack §6, §14.2.
- **Effort:** 2–3 hours.

### TC-15 — Cross-check: rivers (second pass)

- **Team:** Verifier (different person from TC-12 Verifier).
- **Depends on:** TC-12, TC-13.
- **Inputs:** TC-12 and TC-13 outputs.
- **Outputs:** sign-off or flag note per river, in `docs/river_research.md`.
- **Acceptance criteria:** every river has two independent confirmations; all flags routed to TC-41.
- **Cross-check:** as above; this card doubles the TC-12 check because rivers are the most contested field.
- **Blueprint anchor:** Pack §5, §14.3.
- **Effort:** 3–4 hours.

### TC-16 — Draft `entities.json`

- **Team:** Scribe.
- **Depends on:** TC-10, TC-11, TC-12, TC-13, TC-14, TC-15.
- **Inputs:** all Phase 1 research docs.
- **Outputs:** `packs/geography/entities.json` with 20 entries; non-pilot entries have empty `label_variants: {}` and empty `facts: {}` (these are filled in Phase 3).
- **Acceptance criteria:** validates against TC-01 schema; every entry has non-empty `provenance` (may be brief); `endorsement_marker: "geography_pack_v0.4"` on every entry.
- **Cross-check:** a second Scribe runs the schema validator and visually inspects five random entries for field-by-field match with research docs.
- **Blueprint anchor:** Pack §4, §15.
- **Effort:** 3 hours.

### TC-17 — Derive `cards.json`

- **Team:** Scribe.
- **Depends on:** TC-16.
- **Inputs:** `entities.json`.
- **Outputs:** `packs/geography/cards.json` with 60 cards (3 per entity: capital, country, river). Each card has `card_id`, `entity_id` (= `country_id`), `card_type`, `label` (from primary locale), `label_script: "latin"`, `initial_letter`, `romanisation_source: "standard_english"`, `mode_tags: ["shared_entity"]` (letter-group membership added after Phase 2).
- **Acceptance criteria:** exactly 60 cards; every `entity_id` appears exactly three times with three distinct `card_type` values; `initial_letter` matches the first Latin character of `label`.
- **Cross-check:** a second Scribe runs a derivation script that compares cards.json against entities.json and reports any mismatch.
- **Blueprint anchor:** Pack §4, Engine §8.2.
- **Effort:** 2–3 hours (largely mechanical).

---

## Phase 2 — Shared Letter Data (20 letter groups)

### TC-20 — Brainstorm candidate letter groups

- **Team:** Researcher + second Researcher (brainstorming works better with two minds from the start).
- **Depends on:** TC-17.
- **Inputs:** the derived card pool in `cards.json` plus free access to atlas material for rivers and countries outside the 20-country core (letter groups may draw on cards beyond the 20 core entities — they are a separate deck layer).
- **Outputs:** `docs/letter_candidates.md` — at least 30 candidate groups, targeting 2–3 per letter across a balanced set of initial letters. Each candidate: letter, proposed three cards (capital / country / river), and a one-line familiarity justification.
- **Acceptance criteria:** at least 30 candidates; at least 10 distinct letters represented; type coverage (one capital, one country, one river) verified on every candidate.
- **Cross-check:** the two Researchers verify each other's candidates for type coverage and for whether the first-letter claim holds on all three labels.
- **Blueprint anchor:** Pack §11.1, §11.2.
- **Effort:** 4–6 hours.

### TC-21 — Apply familiarity floor filter

- **Team:** Verifier (classroom-facing; ideally someone with school-atlas teaching experience).
- **Depends on:** TC-20.
- **Inputs:** `docs/letter_candidates.md`, a reference list of commonly taught geographic names.
- **Outputs:** annotated candidates — pass / fail / borderline — with one-line notes on failures.
- **Acceptance criteria:** at least 25 candidates pass the filter (so 20 can be selected with room for Phase 2 adjustments).
- **Cross-check:** a second Verifier re-runs the filter against a different reference list (e.g., Researcher used a German Gymnasium atlas index; Verifier uses a UK Key Stage 3 geography syllabus).
- **Blueprint anchor:** Pack §11.1.
- **Effort:** 2–3 hours.

### TC-22 — Apply false-pattern filter

- **Team:** Researcher (different from TC-20) + Verifier.
- **Depends on:** TC-21.
- **Inputs:** familiarity-passing candidates from TC-21.
- **Outputs:** further-annotated list — each candidate tagged for false-pattern risk (e.g., *Berlin · Bavaria · Bodensee* tagged "all German — geographic false pattern; reject").
- **Acceptance criteria:** every candidate has a false-pattern assessment; rejects are documented with reason.
- **Cross-check:** Verifier reviews the risk tags, especially for borderline cases. Where Researcher and Verifier disagree, the candidate is dropped rather than force-accepted (safer default).
- **Blueprint anchor:** Pack §11.1.
- **Effort:** 2–3 hours.

### TC-23 — Select the final 20

- **Team:** Researcher + Verifier + Scribe.
- **Depends on:** TC-22.
- **Inputs:** filtered candidate list.
- **Outputs:** final list of 20 letter groups, with `letter_group_id`, `initial_letter`, three cards, `difficulty` (1–3), and a note on how each passes §11.1.
- **Acceptance criteria:** 20 groups; letter distribution reasonably spread (no more than 3 groups per letter); difficulty 1 groups exist for the tutorial (§Engine-14).
- **Cross-check:** the Verifier runs each group through the §11.1 filter once more, as a final check.
- **Blueprint anchor:** Pack §11, §12.1.
- **Effort:** 2 hours.

### TC-24 — Draft `letter_groups.json`

- **Team:** Scribe.
- **Depends on:** TC-23.
- **Inputs:** the final 20 list.
- **Outputs:** `packs/geography/letter_groups.json`.
- **Acceptance criteria:** validates against TC-01 schema; every group has exactly one card of each `card_type` (engine-enforced); `endorsement_marker: "geography_pack_v0.4"`.
- **Cross-check:** second Scribe runs the schema validator and spot-checks five groups against TC-23 output.
- **Blueprint anchor:** Pack §11.2.
- **Effort:** 1–2 hours.

---

## Phase 3 — Pilot Enrichment (DE / local / facts)

### TC-30 — Select 5–8 entries for DE / local pilot

- **Team:** Researcher.
- **Depends on:** TC-16.
- **Inputs:** the 20 entities.
- **Outputs:** a shortlist of 5–8 country IDs for trilingual treatment. Selection criterion: the German form differs meaningfully from English across at least one of country / capital / river (e.g., Austria/Österreich/Wien/Donau; Italy/Italien/Rom/Tiber).
- **Acceptance criteria:** 5–8 entries; each documented as having meaningful EN↔DE divergence.
- **Cross-check:** a second Researcher with German reading knowledge confirms the divergence is genuine, not cosmetic.
- **Blueprint anchor:** Pack §9.3.
- **Effort:** 1–2 hours.

### TC-31 — DE translations

- **Team:** Researcher (German-fluent) + Verifier (German-fluent, different person).
- **Depends on:** TC-30.
- **Inputs:** the shortlist.
- **Outputs:** `docs/de_translations.md` — for each shortlisted entry, the German form of country / capital / river.
- **Acceptance criteria:** all forms sourced from a reputable reference (Duden, standard German atlas, or the country's German-language Wikipedia article cross-checked against a second source).
- **Cross-check:** Verifier checks each entry against a different source than the Researcher's. Any diacritic or spelling disagreement is investigated, not auto-resolved.
- **Blueprint anchor:** Pack §9, §14.5.
- **Effort:** 2–3 hours.

### TC-32 — `local_display` curation

- **Team:** Researcher (preferably with relevant language background per entry) + Verifier.
- **Depends on:** TC-30.
- **Inputs:** the shortlist.
- **Outputs:** `docs/local_display.md` — the `local_display` form for each component, per the Pack §9.2 gameplay convention (most widely used official local form in Latin script at MVP). Also: `language_note` for any multilingual state.
- **Acceptance criteria:** each `local_display` is sourced; `language_note` present and honest for multilingual cases.
- **Cross-check:** Verifier checks each form against a second source. Multilingual states flagged for Curation Statement documentation.
- **Blueprint anchor:** Pack §9.2.
- **Effort:** 2–3 hours.

### TC-33 — Merge variants into `entities.json`

- **Team:** Scribe.
- **Depends on:** TC-31, TC-32.
- **Inputs:** TC-31 and TC-32 outputs.
- **Outputs:** updated `packs/geography/entities.json` with `label_variants` populated on pilot entries only.
- **Acceptance criteria:** validates against schema; non-pilot entries retain `label_variants: {}`.
- **Cross-check:** a second Scribe reviews the diff.
- **Blueprint anchor:** Pack §9, §15.1.
- **Effort:** 1 hour.

### TC-34 — Select 3–5 entries for facts pilot

- **Team:** Researcher.
- **Depends on:** TC-16.
- **Inputs:** the 20 entities.
- **Outputs:** a shortlist of 3–5 countries suitable for a full 3-fact pilot on country / capital / river.
- **Acceptance criteria:** shortlist documented; entries chosen for pedagogical impact and fact stability (avoid countries with rapidly changing facts).
- **Cross-check:** a second Researcher confirms selection against Pack §10.2 criteria.
- **Blueprint anchor:** Pack §10.3.
- **Effort:** 1 hour.

### TC-35 — Draft facts

- **Team:** Researcher + Verifier.
- **Depends on:** TC-34.
- **Inputs:** the fact shortlist; Pack §10.2 fact quality criteria.
- **Outputs:** `docs/facts_drafts.md` — for each shortlisted entry, 3 facts each for country / capital / river (9 facts per entry). Each fact under ~80 characters, structured-not-decorative, stable.
- **Acceptance criteria:** every fact has a source; every fact passes the §10.2 criteria (short, structured, stable, pedagogically useful).
- **Cross-check:** Verifier checks every fact against an independent source. Disputed facts routed to TC-41 or dropped.
- **Blueprint anchor:** Pack §10.2.
- **Effort:** 3–5 hours.

### TC-36 — Merge facts into `entities.json`

- **Team:** Scribe.
- **Depends on:** TC-35.
- **Inputs:** TC-35 output.
- **Outputs:** updated `entities.json` with `facts` populated on the pilot subset.
- **Acceptance criteria:** validates against schema; non-pilot entries retain `facts: {}`.
- **Cross-check:** second Scribe reviews the diff.
- **Blueprint anchor:** Pack §10, §15.1.
- **Effort:** 1 hour.

---

## Phase 4 — Curation Statement

### TC-40 — Preamble draft

- **Team:** Researcher (writing role).
- **Depends on:** none (can start early); informed by TC-11, TC-12 outputs as they arrive.
- **Inputs:** Pack §13.2; Engine §24 Governance Visibility Principle.
- **Outputs:** the opening paragraph of `packs/geography/CURATION_STATEMENT.md` — explains the gameplay-canon vs. geographic-fact distinction and the Endorsement Marker system.
- **Acceptance criteria:** preamble is readable by teachers and parents; no jargon without explanation; Oxford British English.
- **Cross-check:** Verifier reads the preamble and flags any opaque passages.
- **Blueprint anchor:** Pack §13.2.
- **Effort:** 1–2 hours.

### TC-41 — Three worked examples

- **Team:** Researcher + Verifier.
- **Depends on:** TC-11, TC-12, TC-14, TC-15 (needs the flagged non-trivial cases).
- **Inputs:** flagged cases from capital, river, and recognition research.
- **Outputs:** three sections in the Curation Statement — one river choice (e.g., France — Loire over Seine), one capital choice (e.g., Netherlands — Amsterdam vs. The Hague), one recognition note (e.g., why only `un_member` at MVP). Each section is a short paragraph, honest about alternatives.
- **Acceptance criteria:** each example names the alternative, the chosen form, the reason, and the pedagogical implication.
- **Cross-check:** Verifier reads each example and confirms it accurately reflects the research flag notes from Phases 1.
- **Blueprint anchor:** Pack §13.2.
- **Effort:** 2–3 hours.

### TC-42 — Provenance source list

- **Team:** Scribe.
- **Depends on:** all of Phase 1.
- **Inputs:** sources cited across all Phase 1 research docs.
- **Outputs:** a deduplicated source list in the Curation Statement; one line per source.
- **Acceptance criteria:** every source actually used in research appears; list is alphabetised.
- **Cross-check:** Verifier randomly picks five entries from `entities.json` and confirms their `provenance` citations are on the list.
- **Blueprint anchor:** Pack §13.2.
- **Effort:** 1 hour.

### TC-43 — Dispute contact line

- **Team:** Scribe.
- **Depends on:** project maintainer decision on contact address.
- **Inputs:** the agreed contact address.
- **Outputs:** a one-line dispute note in `README.md` and a longer version in the Curation Statement.
- **Acceptance criteria:** contact address is real and monitored; language matches Pack §13.2 exemplar wording.
- **Cross-check:** a test message sent to the address, confirmation of receipt.
- **Blueprint anchor:** Pack §13.2, Engine §24.
- **Effort:** 30 minutes.

---

## Phase 5 — Icons & Manifest

### TC-50 — Design three SVG icons

- **Team:** Researcher (design role).
- **Depends on:** none (can run in parallel with Phase 1).
- **Inputs:** Pack §3 criteria (monochrome, shape-distinct, legible at 16px, colour-independent).
- **Outputs:** three SVG files — `icons/capital.svg`, `icons/country.svg`, `icons/river.svg`.
- **Acceptance criteria:** icons render legibly at 16, 24, and 48px; silhouettes are distinct from each other at any size.
- **Cross-check:** Verifier views icons in greyscale and at 16px; confirms each remains distinct.
- **Blueprint anchor:** Pack §3, Engine §18.
- **Effort:** 3–5 hours.

### TC-51 — Accessibility audit

- **Team:** Verifier (accessibility-experienced).
- **Depends on:** TC-50.
- **Inputs:** the three icons.
- **Outputs:** `docs/ACCESSIBILITY.md` entry — confirmation that icons meet Engine §18 baseline (shape-distinct, colour-independent, contrast floor).
- **Acceptance criteria:** all three icons pass; any failures return to TC-50 for redesign.
- **Cross-check:** a second Verifier repeats the audit.
- **Blueprint anchor:** Engine §18, Pack §3.
- **Effort:** 1–2 hours.

### TC-52 — Draft `manifest.json`

- **Team:** Scribe.
- **Depends on:** TC-51.
- **Inputs:** Pack §2 manifest template.
- **Outputs:** `packs/geography/manifest.json`.
- **Acceptance criteria:** validates against TC-01 manifest schema; `accessibility_declaration` fields set to `true` only after TC-51 passes.
- **Cross-check:** Verifier validates manifest against schema and confirms referenced icon paths exist.
- **Blueprint anchor:** Pack §2.
- **Effort:** 30 minutes.

---

## Phase 6 — Integration & First Playtest

### TC-60 — Full schema validation pass

- **Team:** Scribe.
- **Depends on:** TC-16, TC-17, TC-24, TC-33, TC-36, TC-52.
- **Inputs:** all pack JSON artefacts.
- **Outputs:** a validation log confirming all files pass TC-01 schemas.
- **Acceptance criteria:** zero schema violations.
- **Cross-check:** a second Scribe re-runs validation on a clean checkout.
- **Blueprint anchor:** Engine §10.
- **Effort:** 30 minutes.

### TC-61 — Pack self-check against Engine §10 interface

- **Team:** Researcher + Verifier.
- **Depends on:** TC-60.
- **Inputs:** the complete pack.
- **Outputs:** a compliance checklist — eight items per Engine §10 — each marked done with evidence.
- **Acceptance criteria:** all eight interface items supplied or explicitly documented as optional-and-deferred.
- **Cross-check:** the checklist itself is the cross-check; two sign-offs required.
- **Blueprint anchor:** Engine §10.
- **Effort:** 1–2 hours.

### TC-62 — First playtest, log board collisions

- **Team:** one playtest group of 2–4 people + one observer.
- **Depends on:** TC-61 and a working engine prototype.
- **Inputs:** the pack running in the engine.
- **Outputs:** `docs/playtest_01.md` — session log noting board generation outcomes, any §9.2 letter collisions the generator logged, player confusion points, and tutorial effectiveness.
- **Acceptance criteria:** at least one full game per mode played to completion; collision log reviewed.
- **Cross-check:** observer independently records notes and compares with player debrief.
- **Blueprint anchor:** Engine §9.2, §14; Pack §12.4.
- **Effort:** 2 hours for the session; 1 hour for writeup.

---

## 4. Total effort estimate

Sum of the above: approximately **70–95 person-hours** for a team of 4–6 people working in parallel where dependencies allow. With a two-person core team, calendar time is roughly 3–4 weeks; with four people, roughly 2 weeks.

Phase 1 (data) is the critical path and should start immediately. Phases 4 and 5 can run in parallel with Phases 1–3. Phase 6 gates on all others.

---

## 5. Guardian notes

- **Cross-check is not optional.** A single-person sign-off is a Violation of Clarity. Any card returned to the team should be re-worked, not approved with a note.
- **Escalation is documentation, not defeat.** When Researcher and Verifier disagree, the case becomes material for the Curation Statement — that is the ethically honest outcome.
- **Political sensitivities** (recognition tier, contested capitals, transboundary rivers) are built into this workflow through doubled-check cards (TC-14, TC-15) and explicit Curation Statement routing (TC-41). If the team encounters cases beyond UN-member scope during Phase 1, they are deferred, not forced in.
- **Pilot subsets protect against burnout.** The 5–8 DE entries and 3–5 facts entries are deliberately small. Do not scope-creep into full coverage at MVP; Phase 2 exists for that.

**Endorsement:** Task cards v1.0 for Geography Pack v0.4. Internal tasking. Council-3 Guardian sponsorship on cross-check protocol.
