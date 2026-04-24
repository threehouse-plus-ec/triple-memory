# Engine Blueprint — Triple Memory

**Version:** 0.4 (Engine)
**Date:** 2026-04-22
**Status:** Draft — split from v0.3 monolithic blueprint
**Predecessor:** Blueprint v0.3 (2026-04-22, monolithic)
**Companion documents:** Geography Pack Blueprint v0.4 (formal pack blueprint); Chemistry Pack v0.1_draft (decoupling-validation pack, no separate blueprint — see `packs/chemistry/README.md` and `packs/chemistry/CURATION_STATEMENT.md`); Music Pack v0.1_draft (native-script and off-roster stress-test pack, no separate blueprint — see `packs/music/README.md` and `packs/music/CURATION_STATEMENT.md`)
**Language:** English (Oxford British standard)
**Scope:** Topic-agnostic engine for a triple-matching memory game
**Endorsement Marker:** Internal — engine v0.4

---

## 0. Changelog from v0.3

v0.4 splits the monolithic v0.3 blueprint into two complementary documents:

1. **Engine Blueprint** (this document) — topic-agnostic rules, interfaces, UI grammar, accessibility, tutorial structure, MVP scope.
2. **Geography Pack Blueprint** — the first content pack, with pack-specific schema extensions, curation policies (rivers, capitals, recognition), and starter data.

Principal changes extracted into the engine layer:

- **§3** Mode abstractions renamed: *Same Country Mode* → *Shared Entity Mode*; *Same Letter Mode* → *Shared Letter Mode*. The renamings are pack-neutral and allow future packs (music, chemistry, literature) to implement the same abstract modes.
- **§10** **[new]** Pack Interface — the explicit contract a pack must fulfil to plug into the engine.
- **§16** **[new]** Post-Match Information Reveal — 2–3 second multi-name / short-fact overlay after a successful triple. Accepts optional pack-provided content.
- **§15** **[retained from v0.3 §10.4]** Tutorial Mode — now fully engine-level, with content slots filled by the active pack.
- **§25** **[new]** Example Pack Stubs — one-line demonstrations that the engine is not secretly geography-shaped.

Principal items **moved out** of this document into the Geography Pack Blueprint:

- River selection, capital selection, country inclusion / recognition policies (v0.3 §7, §7a, §7b).
- Romanisation rule (v0.3 §6.3) — still applies to any pack that uses non-Latin scripts, but the specific mapping policy is pack-curated.
- Letter Mode curation filters (v0.3 §9.2 familiarity floor, false-pattern prevention) — pack-level, because "familiarity" is domain-specific.
- Starter data examples (v0.3 §19).
- Pack-specific risks (v0.3 §14.4 political recognition, §14.5 script).

**Retained unchanged from v0.3:**

- Tutorial structure (3 steps).
- Accessibility baseline.
- Visible card type default.
- Governance Visibility Principle.
- Difficulty system mapping.
- Pedagogical progression.
- MVP / Phase-2 split philosophy.

---

## 1. Concept

**Triple Memory** is a card-matching game pattern in which a successful match is not a pair but a **triple**: three cards drawn from three distinct card types, linked by either a shared-entity relation or a shared-letter relation.

The engine implements the rules, the UI, the tutorial, the accessibility baseline, and the difficulty framework once. Each **pack** supplies its own domain: a set of three card types, the icons for them, the entities, the labels, optional language variants, and optional facts.

The first pack is Geography (Capital · Country · River). Future packs might be Music (Composer · Work · Instrument), Chemistry (Element · Compound · Group), Literature (Author · Work · Character), or History (Figure · Era · Event). The engine does not know which pack is active at development time; it reads the pack manifest at runtime.

---

## 2. Architecture — Engine / Pack Separation

**Engine layer (stable coastline):**

- Triple-matching rule.
- Two abstract modes (Shared Entity, Shared Letter).
- Turn, score, end-of-game logic.
- Tutorial Mode structure.
- Post-match reveal pattern.
- UI grammar and accessibility.
- Difficulty levels including visibility toggle.
- Board generation algorithm.
- Schema interfaces (required fields, validation hooks).

**Pack layer (navigable sails):**

- Declaration of three card types and their icons.
- Entity dataset.
- Card dataset (instances of card types).
- Curation policies appropriate to the domain.
- Optional: label variants, facts, difficulty ratings.
- Curation Statement.

**Rule of purity:** if something only makes sense for geography, it belongs in the Geography Pack, not here.

---

## 3. Modes (abstract)

### 3.1 Shared Entity Mode

**Rule:** three cards share a pack-defined entity. The engine does not know what an entity is; it only knows that each card carries an `entity_id` and three cards with the same `entity_id` (and distinct `card_type`) form a valid triple.

**Example (Geography Pack):** Vienna · Austria · Danube → shared `country_id: AUT`.

**Example (stub Music Pack):** Brandenburg Concerto · J.S. Bach · Harpsichord → shared `composer_id: BACH`.

**Matching logic:** a triple is correct if all three cards share the same `entity_id` **and** the triple contains one card of each `card_type`.

### 3.2 Shared Letter Mode

**Rule:** three cards share the same `initial_letter` **and** cover the three `card_type` slots, one each.

**Example (Geography Pack):** Berlin · Belgium · Brahmaputra → all "B", one capital, one country, one river.

**Example (stub Music Pack):** Bach · Brandenburg · Bassoon → all "B", one composer, one work, one instrument.

**Matching logic:** a triple is correct if all three cards share the same `initial_letter` **and** the triple contains exactly one card of each `card_type`.

### 3.3 Mode Exclusivity

Within a single round, only one mode is active. Cards on the board are drawn from one curated deck (shared-entity or shared-letter), never mixed. Coincidental cross-mode triples do not exist within a round because the active deck governs which triples are present.

### 3.4 Mode Asymmetry

The two modes are not educationally equivalent.

- **Shared Entity Mode** teaches a **semantic relation** within the pack's domain (geography, music, chemistry, etc.). Slower, more reference-weight.
- **Shared Letter Mode** teaches a **formal lexical relation** — three labels sharing an initial letter. Lighter, faster, pattern-memory.

Each pack's Curation Statement must state this asymmetry openly for its own domain so that the formal mode is not misread as a reference mode it isn't.

---

## 4. Board Sizes and Recommended Targets

- **12 cards** = 4 triples (children, introductory, or first-launch sessions).
- **18 cards** = 6 triples (**default MVP**).
- **24 cards** = 8 triples (standard play).

Board sizes refer to cards drawn per round from a larger pack pool. Engine MVP supports all three sizes; each pack declares which sizes are supported given its Phase 1 pool.

## 4a. Pedagogical Progression

The engine presents a staged user journey:

1. **Tutorial** (§15).
2. **Introductory** — Shared Entity Mode, difficulty Level 1, 12 cards.
3. **Standard** — either mode, difficulty Level 2, 18 cards (MVP default).
4. **Advanced** — either mode, difficulty Level 3, 24 cards.
5. **Expert** — either mode, difficulty Level 4 (type-hidden), 18 or 24 cards.

Menu presentation treats these as a progression, not as flat equivalents. First-time players are guided towards Tutorial → Introductory; returning players may enter at any stage.

---

## 5. Turn Sequence

A player reveals cards one by one, up to three cards per turn (Strict Triple Turn).

- Reveal card 1, 2, 3.
- System validates the three against the active mode's rule.
- **Correct:** cards remain open; player scores one point; turn ends.
- **Incorrect:** cards flip back after a short delay; next player takes over.

Turn continuation: after a correct triple the player's turn **ends**. Play passes regardless of outcome. (Rationale: predictable session length and continuous engagement; documented alternative for future versions.)

## 6. Scoring

Base: **1 point** per correct triple. Optional later additions (consecutive bonus, difficulty weighting, timed bonus, failure penalty) are not in MVP.

## 7. End of Game

Game ends when all triples have been found. Highest score wins. Ties are shared wins in MVP.

---

## 8. Engine Data Schema (abstract)

The engine defines three schema slots that each pack fills.

### 8.1 Entity Schema (pack-filled)

Required engine fields:

- `entity_id` — unique identifier within the pack (string).
- `entity_name` — human-readable name, used in UI when the entity itself appears (some packs: yes; others: no).
- `difficulty` — integer 1–3 (or higher for Phase 2 packs).
- `is_active` — boolean.
- `endorsement_marker` — string identifying the pack curation version.

Pack-optional fields (schema allows, engine ignores):

- Pack-specific descriptive fields (e.g., `region`, `era`, `period`).
- `label_variants` — locale-keyed label map.
- `facts` — array of short fact strings.
- `provenance` — source citation.
- Pack-specific governance fields (e.g., `recognition_status` in Geography).

### 8.2 Card Schema (pack-filled)

Required engine fields:

- `card_id` — unique identifier (string).
- `entity_id` — reference to the parent entity.
- `card_type` — one of the three pack-declared types.
- `label` — displayed text.
- `label_script` — script of the displayed label (`latin` at MVP).
- `initial_letter` — derived from `label`; used by Shared Letter Mode.
- `mode_tags` — array including `shared_entity` and/or `shared_letter`.

Pack-optional fields:

- `label_variants` — map of locale to alternative labels (e.g., `{"de": "Wien"}`).
- `facts` — array of short fact strings.
- Pack-specific disambiguation fields.

### 8.3 Letter-Group Schema (pack-filled, Shared Letter Mode only)

Required engine fields:

- `letter_group_id` — unique identifier.
- `initial_letter` — the shared letter.
- `cards` — exactly three card references, one of each `card_type`. **Enforced at load time.**
- `difficulty` — integer.
- `endorsement_marker` — string.
- `is_active` — boolean.

### 8.4 Pack Manifest

The pack manifest declares:

- `pack_id` — unique identifier.
- `pack_name` — human-readable name.
- `card_types` — exactly three, each with an identifier, display name, icon reference, and aria-label template.
- `shared_entity_field` — the name of the entity reference field (e.g., `country_id` for Geography).
- `supported_modes` — array: `shared_entity` and/or `shared_letter`.
- `supported_locales` — array of locale codes for label variants.
- `supported_board_sizes` — subset of {12, 18, 24}.
- `curation_statement_path` — path to the pack's Curation Statement.
- `pack_version` and `endorsement_marker`.

---

## 9. Letter Mode Engine Rules

These rules are engine-level; the curation criteria (what makes a letter group "good" for a domain) live in each pack.

**§9.1 Schema constraint (engine):** every letter group contains exactly one card of each `card_type`. Groups failing validation are rejected at load time.

**§9.2 Board-level letter-collision preference (engine):** within a round, the board generator **prefers** to avoid placing two cards of the same `card_type` and the same `initial_letter` from different letter groups. This is a preference, not a prohibition; unavoidable cases are logged for playtest review and may harden into a rule, loosen, or be removed after empirical evidence.

**§9.3 Pack-level curation filters (packs):** familiarity floor, false-pattern prevention, domain-specific quality gates. See each pack's Curation Statement.

---

## 10. Pack Interface (contract)

An engine-compliant pack must supply:

1. A **pack manifest** (§8.4).
2. An **entity dataset** conforming to §8.1.
3. A **card dataset** conforming to §8.2.
4. *(If Shared Letter Mode supported)* a **letter-group dataset** conforming to §8.3.
5. **Icons** for the three card types (SVG or equivalent; accessibility-compliant — shape-distinct, colour-independent).
6. A **Curation Statement** describing domain-specific policies, non-obvious choices, provenance, and dispute contact.
7. *(Optional)* Fact content in the `facts` slot of entities or cards.
8. *(Optional)* Label variants in `label_variants`.

The engine validates the manifest and datasets at load time. Invalid packs do not play.

---

## 11. Gameplay Architecture

Browser-based local game on one screen. Suggested stack: HTML, CSS, JavaScript (React optional). No backend beyond local JSON loading. JSON file storage. In-browser state management.

## 12. Game States

1. Start screen.
2. Pack selection (if more than one pack installed).
3. Mode selection with pedagogical progression (§4a).
4. Player count.
5. Difficulty.
6. Board generation.
7. Active game (with post-match reveal, §16).
8. End screen with score summary.
9. Restart or return to menu.

## 13. Board Generation (abstract algorithm)

**Shared Entity Mode:** choose N entities from the active pool; generate three cards per entity from the pack's card dataset; shuffle; place on board.

**Shared Letter Mode:** choose N letter groups from the active pool, applying the §9.2 collision preference; generate three cards per group; shuffle; place on board.

---

## 14. Tutorial Mode

Three-step onboarding, invoked automatically on first launch with a skip option.

**Step 1 — Card-type introduction.** Three revealed example cards displayed with their type icons and labels. Caption explains that every triple contains one of each type. Example content is provided by the active pack.

**Step 2 — One guided example per mode.** Shared Entity example then Shared Letter example. Both show six revealed cards; the player clicks a valid triple. Incorrect clicks gently highlight correct answers without penalty.

**Step 3 — One guided mini-round.** Real small board (2–3 triples, 6–9 cards), face-down, mode labelled, types visible on reveal. Optional soft hints after wrong attempts.

After Step 3, the player enters the real game.

**MVP constraints (engine-level):**

- No narration, no dialogue, no multi-level flow.
- No characters or mascots.
- Same visual design as the main game.
- Optional from the main menu; offered on first launch with a skip option.

**Pack responsibility:** provide the example entities and labels used in Steps 1–3. The engine picks suitable examples from the pack's Phase 1 pool based on `difficulty: 1` entries with stable canonical choices.

---

## 15. Tutorial — Extended Learning Surface [new, v0.4]

Tutorial Mode is the primary place where a pack's **label variants** and **facts** (if supplied) surface in full.

**Step 1 extended:** example cards may show `label_variants` — e.g., *Vienna* (default), *Wien* (DE), *Wien* (local) — as a micro-language lesson. The engine controls the presentation (collapsed by default, expandable tap-to-see); the pack supplies the content.

**Step 2 extended:** the correct answer reveal may show short structured facts from the pack's `facts` arrays, 1–3 lines per card.

**Pack deferral:** if a pack supplies no variants or facts, Tutorial Mode still works — the extended surfaces simply render with the primary label only. The engine does not require these fields.

---

## 16. Post-Match Information Reveal [new, v0.4]

After a correct triple in normal gameplay (not only tutorial), the engine shows a brief reveal:

- **Timing:** 2–3 seconds, with option to dismiss early or linger by tap.
- **Content (MVP minimum):** the three matched labels.
- **Content (if pack supplies):** additionally, one line of `label_variants` (e.g., EN / DE / local names concatenated) OR one short fact per card, whichever the pack prefers for MVP. Not both at once.
- **Timing rule:** reveal appears **after** the correctness check, never before card selection. "Rich information belongs to moments of certainty, not moments of uncertainty."

**Accessibility:** reveal duration honours `prefers-reduced-motion`; content is announced to screen readers; keyboard users can extend or dismiss.

**Expert mode (Level 4):** post-match reveal is optional and off by default at Level 4, because type-hidden gameplay is already cognitively loaded. Player setting can re-enable.

This resolves the external reviewer's concern that tutorial-only placement would make the learning layer invisible after first use.

---

## 17. UI Principles

- Large readable text.
- Strong hidden-vs-revealed visual distinction.
- Visible current player, score, mode.
- Card type visible by default on revealed cards (pack-provided icon plus short type word or localised equivalent).

**Expert mode:** type-hiding available via difficulty toggle (§19), not as default.

## 18. Accessibility Baseline

MVP must meet, at minimum:

- **Contrast:** WCAG 2.2 AA for all text.
- **Font size:** no gameplay text below 18px at default zoom.
- **Colour-only signalling:** prohibited. Any state conveyed by colour also conveyed by shape, icon, text, or pattern.
- **Keyboard navigation:** all interactions reachable via Tab, activatable via Enter/Space.
- **Screen reader:** cards carry `aria-label`s reflecting type and label when revealed; hidden cards announce "hidden card, position N".
- **Reduced motion:** animations honour `prefers-reduced-motion`, including post-match reveal.
- **Icon independence:** pack-provided icons must be shape-distinct so that a greyscale or single-colour rendering still communicates type.

Guardian holds this section against any MVP scope pressure.

## 19. Difficulty System

| Level | Name | Type Visible | Post-Match Reveal | Notes |
|------|------|-------------:|-------------------|-------|
| 1 | Introductory | Yes | Yes (full) | Children, classroom |
| 2 | Standard | Yes | Yes (full) | Default MVP |
| 3 | Advanced | Yes | Yes (labels only) | Mixed difficulty pool |
| 4 | Expert | **No** | Off by default, opt-in | Type-hidden |

Level 4 is explicit opt-in.

## 20. Multiplayer

**Status:** Deferred. The v0.4 prototype is single-player only — one score counter, no turn-passing, no player identity. The concept below describes the intended shape of local multiplayer when it is implemented; it is not part of the current MVP build.

**Intended shape:** 2–4 local players, turn-based, one shared screen. No hidden private information beyond memory. Each player has their own score; a turn ends after one triple attempt (match or flip-back).

Also deferred: team mode, timed turns, cooperative mode, classroom mode.

---

## 21. Engine-Level Risks

**§21.1 Cognitive overload from extended surfaces.** Label variants and facts can saturate working memory. Mitigation: variants and facts appear only after match success (§16), never during selection.

**§21.2 Under-use of learning layer.** If rich content lives only in tutorial, returning players may never see it. Mitigation: §16 post-match reveal brings a minimal version into normal play.

**§21.3 Over-governance contamination.** Engine should not know about pack curation hazards. Mitigation: engine-level §14 risks are engine-generic only; domain-specific hazards (political recognition, contested names, translation validity) live in each pack.

**§21.4 Pack compliance drift.** Packs may ship with invalid data. Mitigation: load-time validation against §8 schemas; failed packs do not play.

**§21.5 Accessibility erosion via packs.** A pack could ship icons that fail shape-distinct or colour-independent tests. Mitigation: engine validates icon metadata at load; packs must declare that icons meet the accessibility rule in their manifest.

---

## 22. Engine MVP Scope

### 22.1 MVP-required (engine)

- Shared Entity Mode and Shared Letter Mode.
- Pedagogical progression menu.
- Tutorial Mode (three steps).
- Post-match information reveal (labels-only minimum; richer if pack supplies).
- Difficulty Levels 1–3 default, Level 4 opt-in.
- Board sizes 12 / 18 / 24, default 18.
- Strict triple turn; turn ends after attempt.
- Card type visible by default.
- Accessibility baseline met.
- Single-player score tracking, flip animation, end screen.
- Pack manifest validation at load.
- Single-pack MVP launch (Geography Pack v0.4).
- Dispute channel: contact line in engine README.
- JSON schema validation at load (§8 enforcement).

### 22.2 Phase-2-valuable

- 2–4-player local mode with per-player score tracking and turn handling (see §20).
- Multi-pack selection UI.
- Full fact content surfaces (if pack supplies).
- Multi-locale label switching.
- Pack dispute routing to pack-specific contact.
- Classroom / teacher view with governance fields exposed.
- Pack-specific settings screens.

### 22.3 Out of MVP

- Online multiplayer.
- User accounts.
- Database server.
- Timers.
- Sound effects.
- Non-Latin script support.
- Team / cooperative / classroom modes.

---

## 23. File Structure

```
triple-memory/
├── engine/
│   ├── index.html
│   ├── style.css
│   ├── app.js
│   └── validator.js
├── packs/
│   └── geography/
│       ├── manifest.json
│       ├── entities.json        (was countries.json in v0.3)
│       ├── cards.json
│       ├── letter_groups.json   (was same_letter_groups.json)
│       ├── icons/
│       └── CURATION_STATEMENT.md
├── docs/
│   ├── ENGINE_BLUEPRINT.md      (this document)
│   ├── GEOGRAPHY_PACK_BLUEPRINT.md
│   ├── ACCESSIBILITY.md
│   └── PACK_INTERFACE.md
├── assets/
│   └── common/
└── README.md
```

## 24. Governance Visibility Principle

- The active pack's Curation Statement is linked from the main menu footer or a Settings → About screen. Never shown during gameplay.
- Dispute contact line lives in the engine `README.md` and, for pack-specific matters, in each pack's Curation Statement.
- `endorsement_marker`, `provenance`, and any pack-specific governance fields are machine-readable and not displayed on cards, scoreboard, or end screen at MVP.
- Pack governance fields may surface in a future opt-in "teacher view".

---

## 25. Example Packs

The engine is not secretly geography-shaped. Two packs now ship with the prototype, and further pack sketches remain open for future work.

**Implemented:**

- **Geography Pack** (v0.4 core; v0.5_draft additive content) — Capital · Country · River. Example triple: *Vienna · Austria · Danube*. See `packs/geography/` and `docs/GEOGRAPHY_PACK_BLUEPRINT.md`.
- **Chemistry Pack** (v0.1_draft) — Element · Symbol · Group. Example triple: *Sodium · Na · Alkali metal*. Added specifically to validate engine/pack decoupling: it deliberately mirrors the geography pack's shape (same four JSON files, same board sizes, same manifest schema) so any remaining geography-specific assumptions surface as concrete failures. The exercise confirmed that the engine validator and runtime accept manifest-defined `card_type` values and both `entity_id` (engine-level) and `country_id` (legacy alias) on letter-group cards; several small decoupling fixes landed alongside the pack. See `packs/chemistry/`.
- **Music Pack** (v0.1_draft) — Composer · Work · Instrument. Example triple: *Bach · Brandenburg Concertos · Harpsichord*. Stresses two paths the first two packs did not: (a) non-Latin `native_display` rendering in the post-match overlay (Cyrillic for Tchaikovsky; Bengali and Devanagari for Ravi Shankar), and (b) off-roster shared-letter cards (12 off-roster entity_ids across composers and instruments, vs. 13 for chemistry and ~26 for geography), confirming that the synthesis path in `buildSharedLetterCard` scales. See `packs/music/`.

**Future sketches** (not implemented; noted to keep the engine honest):

- **Literature Pack** — Author · Work · Character. Example triple: *Dickens · David Copperfield · Uriah Heep*.
- **History Pack** — Figure · Event · Era. Example triple: *Marie Curie · Discovery of Radium · Early 20th C.*

Each implemented or future pack implements the same §10 Pack Interface, provides three card-type icons, and ships its own Curation Statement. None of the three shipped packs required changes to engine logic beyond the decoupling fixes noted above.

---

## 26. Recommended Next Steps

1. Freeze Engine Blueprint v0.4.
2. Freeze Geography Pack Blueprint v0.4.
3. Draft engine schema validators (§8 enforcement, §10 interface compliance).
4. Implement engine core: board generation, turn logic, match validation, score, end.
5. Implement Tutorial Mode (§14–§15) against a stubbed minimal pack.
6. Implement Post-Match Information Reveal (§16).
7. Draft Geography Pack data (`entities.json`, `cards.json`, `letter_groups.json`) per Pack Blueprint §8.1.
8. Draft Geography Pack Curation Statement (preamble + worked examples).
9. Accessibility compliance audit.
10. Playtest with Geography Pack; log §9.2 board-level collisions for review.
11. Before Phase 2 work: decide engine-level refinements (harden/loosen §9.2, enable multi-pack UI, promote facts/variants into normal play).

---

## 27. Short Position

v0.3 was a single document trying to be two things: a game blueprint and a content curation charter. v0.4 splits them. The engine blueprint holds what is invariant across domains; the pack blueprint holds what is domain-specific.

This split is ethically protective. Different content domains carry different curation hazards — Geography has political recognition and contested capitals; Chemistry has priority disputes over discoveries; Literature has canon debates. Keeping these at the pack layer prevents any single domain's problems from being baked into the engine's ethics.

The Lock-Key Rule holds cleanly now: the engine is the lock (stable concepts — triple, mode, type, letter, turn); the pack is the key (interpretations — what the types are, which entities count, which rivers are canonical). Multiple keys may open the same lock; the lock does not need to change.

---

**Endorsement:** Internal curation, Engine v0.4, 2026-04-22. Council-3 deliberative input and external critique incorporated through v0.3; architectural split introduced at v0.4.
