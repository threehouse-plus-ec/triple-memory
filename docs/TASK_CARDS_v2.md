# Task Cards v2.0 — Geography Pack v0.5 Cross-Check & Phase 2 Promotion

**Version:** 2.0 (draft)
**Date:** 2026-04-23
**Status:** Ready for team assignment
**Companion documents:** Engine Blueprint v0.4, Geography Pack Blueprint v0.4, TASK_CARDS v1.0 (completed)
**Endorsement Marker:** `geography_pack_v0.5_tasking`

---

## 0. Purpose

v1.0 delivered the v0.4 MVP dataset. Between v0.4 sign-off (2026-04-22) and the opening of this v2.0 scope, single-operator content was added under the `geography_pack_v0.5_draft` marker:

- DE translations and `local_display` for the 12 original entities not in the v0.4 pilot.
- Three-fact-per-card-type records for the 15 original entities not in the v0.4 facts pilot.
- 5 contested-recognition entities (PSE, TWN, XKX, ESH, TRNC), currently `is_active: false`.
- `native_display` (non-Latin script) strings for 8 entities (EGY, CHN, IND, JPN, KOR, PSE, TWN, ESH).
- Engine support for rendering fact + `local_display` + `native_display` together in the post-match overlay.
- First-pass UI accessibility audit and remediation (see [ACCESSIBILITY.md §1–§2](ACCESSIBILITY.md)).

None of the above has passed the two-person cross-check protocol from TASK_CARDS v1.0 §2. This document formalises the protocol for closing that gap and promoting the draft to `geography_pack_v0.5`.

---

## 1. Cross-check protocol (inherited)

All rules from TASK_CARDS v1.0 §2 apply unchanged:

1. Two-person minimum.
2. Independent sources.
3. Written trail (source A / source B).
4. Disagreement = escalation to CURATION_STATEMENT.
5. No self-verification.

Additional rule for v2.0:

6. **Draft content is grep-able.** `geography_pack_v0.5_draft` marks content awaiting cross-check. Promotion commits must flip the marker to `geography_pack_v0.5` and remove the `_draft` suffix in all files touched.

---

## 2. Phase overview

| Phase | Cards | Focus | Depends on |
|------:|-------|-------|------------|
| 7 | TC-70 to TC-72 | Content cross-check (DE, local_display, facts) | v1.0 sign-off |
| 8 | TC-73, TC-78 | Contested-recognition verification and curation | TC-70 for DE |
| 9 | TC-74 | Native-script verification | Readers of each script |
| 10 | TC-75 to TC-77, TC-80 | UI accessibility cross-check and second playtest | ACCESSIBILITY.md §2 remediation |
| 11 | TC-79 | v0.5 promotion | All above |

---

## Phase 7 — Content cross-check

### TC-70 — Cross-check DE translations (12 remaining entries)

- **Team:** Verifier (German-fluent, not the v0.5_draft author) + second Verifier.
- **Depends on:** nothing (draft content already in repo).
- **Inputs:** `entities.json` — `label_variants.country.de`, `label_variants.capital.de`, `label_variants.river.de` for FRA, CHN, IND, JPN, KOR, ARG, BRA, MEX, USA, KEN, AUS, NZL.
- **Outputs:** sign-off log entry in `docs/de_translations.md` per entry; any disagreements documented as CURATION_STATEMENT flags.
- **Acceptance criteria:** each of the 36 DE strings confirmed against a German reference (Duden, DE-Wikipedia, Diercke Weltatlas) by each of two Verifiers using different sources.
- **Cross-check:** two Verifiers, two distinct sources, per TASK_CARDS v1.0 §2.
- **Blueprint anchor:** Pack §9, §14.5.
- **Effort:** 3–4 hours.

### TC-71 — Cross-check `local_display` (12 remaining entries)

- **Team:** Researcher (preferably with relevant language background per entry) + Verifier.
- **Depends on:** TC-70 (in parallel acceptable).
- **Inputs:** `entities.json` — `label_variants.*.local_display` for the same 12 entities plus the 5 contested entities.
- **Outputs:** sign-off log entry in `docs/local_display.md`; multilingual-state `language_note` values confirmed honest.
- **Acceptance criteria:** each `local_display` value matches the most widely used official local form in Latin script per Pack §9.2; romanisations match declared source (Pinyin, Hepburn, Revised, standard Arabic).
- **Cross-check:** Verifier checks each form against a second source (UNGEGN, national portals, standard romanisation tables).
- **Blueprint anchor:** Pack §9.2.
- **Effort:** 4–5 hours.

### TC-72 — Cross-check facts (15 remaining entries)

- **Team:** Researcher + Verifier; may split into two sub-teams covering ~7–8 entries each.
- **Depends on:** nothing (draft content already in repo).
- **Inputs:** `entities.json` — `facts.country`, `facts.capital`, `facts.river` for BEL, DEU, ESP, ITA, NLD, CHN, IND, KOR, ARG, MEX, USA, KEN, ZAF, AUS, NZL (15 entities × 9 facts = 135 facts).
- **Outputs:** updated `docs/facts_drafts.md` with sources logged per fact; disputed facts routed to TC-78 or dropped.
- **Acceptance criteria:** every fact passes Pack §10.2 criteria (short, structured, stable, pedagogically useful); every fact has a source; every fact verified against an independent source.
- **Cross-check:** Verifier checks every fact against an independent source.
- **Blueprint anchor:** Pack §10.2.
- **Effort:** 8–12 hours (the largest single card).

---

## Phase 8 — Contested-recognition verification

### TC-73 — Cross-check contested-recognition entities (5 entities)

- **Team:** Researcher (politically literate) + Verifier (different person) + Scribe. Escalation channel to Curation Statement mandatory for this card.
- **Depends on:** nothing (entities already in-repo with `is_active: false`).
- **Inputs:** `entities.json` entries for PSE, TWN, XKX, ESH, TRNC (all carrying `geography_pack_v0.5_draft`).
- **Outputs:** for each entity, a verification log confirming:
  - `recognition_status` enum value (`un_observer` for PSE; `limited_recognition` for the others).
  - `capital_name` and `alternative_capitals` — particularly for PSE (East Jerusalem vs. Ramallah) and ESH (El Aaiún vs. Tifariti).
  - `river_name` choice — especially ESH (seasonal wadi Saguia el-Hamra) and TRNC (Pedieos / Kanlıdere).
  - `shared_river_countries` symmetry where applicable (PSE Jordan ↔ ISR/JOR/SYR/LBN; XKX White Drin ↔ ALB).
  - `provenance` citations valid.
- **Acceptance criteria:** every field verified against two independent sources; any disagreement flagged and routed to TC-78.
- **Cross-check:** two independent sources per field per entity; sensitive fields (capital, recognition) get a third-source confirmation.
- **Blueprint anchor:** Pack §7 (recognition policy), §6 (capital policy), §5 (river policy).
- **Effort:** 6–10 hours.

### TC-78 — Curation Statement v0.5 worked examples

- **Team:** Researcher (writing role) + Verifier.
- **Depends on:** TC-73.
- **Inputs:** verification log from TC-73; existing CURATION_STATEMENT §2 worked-example template.
- **Outputs:** five additional worked-example sections in `packs/geography/CURATION_STATEMENT.md`, one per contested entity, explaining the recognition / capital / river choice and acknowledging alternatives.
- **Acceptance criteria:** each example names the alternative, the chosen form, the reason, and the pedagogical implication; written in Oxford British English.
- **Cross-check:** Verifier reads each example and confirms it accurately reflects the TC-73 verification log.
- **Blueprint anchor:** Pack §13.2.
- **Effort:** 2–3 hours.

---

## Phase 9 — Native-script verification

### TC-74 — Cross-check `native_display` strings (8 entities)

- **Team:** one native/fluent reader per script; Verifier with same script literacy (or from a different native-reader pool).
- **Depends on:** nothing.
- **Inputs:** `entities.json` — `label_variants.*.native_display` for EGY, CHN, IND, JPN, KOR, PSE, TWN, ESH (up to 3 strings per entity = up to 24 strings total).
- **Outputs:** sign-off log in a new `docs/native_display.md` per entry; spelling confirmed, diacritics correct, script appropriate (Arabic for EGY/PSE/ESH; Han simplified for CHN; Han traditional for TWN; Devanagari for IND; Kanji+Hiragana for JPN; Hangul for KOR).
- **Acceptance criteria:** every string confirmed by a reader of the target script against an authoritative source; spelling variants (e.g. Hong Kong vs. Mainland orthography) documented.
- **Cross-check:** two readers of each script, independently.
- **Blueprint anchor:** Pack §9 (label variants), §21 (cognitive load — native script goes only to post-match reveal, never to card face).
- **Effort:** 4–6 hours per script, depending on reviewer availability.

---

## Phase 10 — UI accessibility cross-check and second playtest

### TC-75 — Independent contrast recomputation

- **Team:** Verifier (different from the TC-51 Verifier and from the first-pass UI auditor).
- **Depends on:** [ACCESSIBILITY.md §2](ACCESSIBILITY.md) remediation.
- **Inputs:** `assets/cd/tokens.css`; `engine/style.css`; current commit.
- **Outputs:** a signed contrast audit in `docs/ACCESSIBILITY.md §3` confirming every token text/background pair meets WCAG 2.2 AA.
- **Acceptance criteria:** every ratio reproduced from a second calculator; all pairs ≥ 4.5:1 for normal text or ≥ 3:1 for large / bold text.
- **Cross-check:** Verifier's calculation independent from the first-pass numbers in ACCESSIBILITY.md §1.
- **Effort:** 1 hour.

### TC-76 — Screen-reader smoke test

- **Team:** Verifier (screen-reader-proficient) + one observer.
- **Depends on:** TC-75.
- **Inputs:** live build (`engine/index.html`) in a browser with VoiceOver (macOS/iOS) or NVDA (Windows).
- **Outputs:** signed log in `docs/ACCESSIBILITY.md` covering: menu navigation, tutorial (all three steps), one full Shared Entity game, one full Shared Letter game, match overlay (keyboard dismiss and auto-dismiss), locale switch, Teacher View.
- **Acceptance criteria:** every interactive element announced with its role and state; score changes announced; tutorial feedback announced; match overlay content announced via `aria-live`; no keyboard traps.
- **Cross-check:** observer independently records a parallel log.
- **Effort:** 2 hours.

### TC-77 — Keyboard-only run-through

- **Team:** Verifier (no pointer device).
- **Depends on:** TC-76 (in parallel acceptable).
- **Inputs:** live build.
- **Outputs:** signed log covering menu → tutorial → one game of each mode → return-to-menu loop, performed with keyboard only.
- **Acceptance criteria:** every task completable without mouse/touch; Tab order sensible; focus ring visible on every focusable element; no unreachable controls.
- **Cross-check:** Verifier's log reviewed by a second Verifier who repeats the run-through independently.
- **Effort:** 1 hour.

### TC-80 — Second playtest (remediated UI + v0.5 content)

- **Team:** playtest group of 2–4 people + observer.
- **Depends on:** TC-73 (so contested entities can be flagged `is_active: true` for the session), TC-76, TC-77.
- **Inputs:** live build with contested entities optionally activated.
- **Outputs:** `docs/playtest_02.md` — session log noting board generation outcomes with 25-entity pool, behaviour of contested entities in play, UX feedback on native_display overlay, any accessibility issues missed by TC-75/76/77.
- **Acceptance criteria:** at least one full game per mode played to completion with contested entities active; at least one game with native_display triggered (pick an entity from EGY/CHN/IND/JPN/KOR/PSE/TWN/ESH).
- **Cross-check:** observer records independent notes; debrief compares.
- **Blueprint anchor:** Engine §9.2, §14; Pack §12.4.
- **Effort:** 2 hours session + 1 hour writeup.

---

## Phase 11 — v0.5 promotion

### TC-79 — Flip endorsement markers and update CURATION_STATEMENT

- **Team:** Scribe.
- **Depends on:** TC-70, TC-71, TC-72, TC-73, TC-74, TC-75, TC-76, TC-77, TC-78, TC-80 all signed off.
- **Inputs:** the signed-off content.
- **Outputs:** one promotion commit that:
  - Flips every `geography_pack_v0.5_draft` occurrence to `geography_pack_v0.5` in `entities.json` and `CURATION_STATEMENT.md`.
  - Activates contested entities (`is_active: true`) that passed TC-73, if the playtest outcome supports it.
  - Adds a `geography_pack_v0.5` row to `CURATION_STATEMENT.md` §5 Endorsement Marker history with the promotion date.
  - Rewrites `CURATION_STATEMENT.md` §6 Known limitations to reflect the new state.
  - Updates `README.md` status lines.
- **Acceptance criteria:** `git grep geography_pack_v0.5_draft` returns zero matches; README and CURATION_STATEMENT consistent.
- **Cross-check:** second Scribe reviews the diff.
- **Blueprint anchor:** Pack §13, Engine §24.
- **Effort:** 1 hour.

---

## 3. Total effort estimate

Rough sum: **30–45 person-hours** across Phases 7–11. Critical path is Phase 10 (UI cross-check) because TC-80 depends on TC-73 and on the UI a11y work; everything else can run in parallel.

With a team of 3–5 reviewers, calendar time is roughly 1–2 weeks.

---

## 4. Out of v0.5 scope

Deliberately deferred until v0.6 or later:

- Additional packs (Music, Chemistry, Literature, History).
- Local multiplayer (2–4 players) — see Engine Blueprint §20.
- Non-Latin scripts on card faces (current v0.5 shows native only in post-match overlay).
- Online multiplayer, user accounts, timers, sound effects.
- Expansion past 20 active entities — the 5 contested entities, if activated, reach 25.

---

## 5. Guardian notes

- **The v0.5_draft marker is an honesty device.** It exists so no single operator can accidentally promote unchecked content. Leaving content at `_draft` is always valid; flipping the marker requires the protocol.
- **Escalation remains documentation, not defeat.** Contested-entity work in particular is expected to generate disagreements; those belong in the CURATION_STATEMENT, not in silent edits.
- **Accessibility audits target the remediated build, not the original.** The first-pass audit and remediation were committed together; TC-75/76/77 start from that baseline.

**Endorsement:** Task cards v2.0 for Geography Pack v0.5 cross-check and promotion. Internal tasking. Inherits cross-check protocol from v1.0.
