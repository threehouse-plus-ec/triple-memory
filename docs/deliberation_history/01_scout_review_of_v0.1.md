# Scout Review of Blueprint v0.1

**Source:** Council-3 deliberative input, Scout stance.
**Received:** 2026-04-22
**Subject:** Blueprint v0.1
**Archived for:** deliberation history

---

## [Stance: Scout]

### Analog — Landscape Feel

The blueprint presents a stable triangular ridge: Capital–Country–River forms a natural three-anchor topology that players must mentally traverse. The two modes create distinct terrains — Same Country Mode is a deep semantic valley with clear walls (the geography itself binds the triple), while Same Letter Mode is an open plain where arbitrary groupings can drift. The river-selection policy (Section 7) is correctly identified as the most seismically active zone; it is where player trust in the game's "educational without feeling like a quiz" promise will either hold or fracture.

### Digital — Precise Signals

- Clean structural boundary: semantic objects separated from display cards (Section 6).
- MVP is tightly scoped: 18 cards, 6 triples, 2 players, no backend (Section 15).
- JSON schemas are explicit and portable.
- Turn logic defaults to Option A (strict triple reveal), which minimizes state-machine complexity.
- The selection_reason field for rivers is a precise instrumentation — it documents justification without asserting objective uniqueness.

### Memory — Reference Prior Scans

Resonance detected with existing frameworks:

- The selection_reason tag functions analogously to the Claim Analysis Ledger's classification metadata — it produces a data point about curation without claiming to be the curve.
- The "gameplay deck vs. reference database" split (Section 14.3) mirrors the Harbour/Sails/Breakwater layering: a stable coastline (reference) separated from navigational practice (gameplay deck).
- The phased dataset strategy (Phase 1 → 2 → 3) aligns with the staging protocol (candidate → tested → endorsed), though the validation gates between phases are not yet explicit.

### Error-Correction — Flagged Occlusions & Reframing Needs

**⚠ Horizon Signal — Dual-Mode Collision:** The blueprint does not specify whether a triple can satisfy both matching conditions simultaneously. In Same Country Mode, if the three cards also share an initial letter (e.g., Bern, Bangladesh, Brahmaputra — though this exact example is unlikely), is this a bonus, a distraction, or an irrelevant coincidence? The mode_tags field (Section 6.2) suggests cards can carry multiple mode affiliations, but the rule layer does not state whether modes are mutually exclusive per round. In competitive play, this ambiguity could generate disputes about "valid" vs. "intended" matches.

**⚠ Horizon Signal — Turn Continuation Occlusion:** Section 5.1 Option A states the player "continues or ends turn depending on rule setting," yet Section 15 (MVP) does not resolve this setting. Continuous play (keep the turn after a correct triple) dramatically changes game dynamics and session length; it is not a neutral default. The MVP should explicitly declare which branch is active in v0.1.

**⚠ Horizon Signal — River Authority Gap:** Section 7 establishes "one canonical river per country" and provides selection_reason tags, but it does not specify who validates these canons or against what authority. For a game with educational positioning, this is a latent credibility risk. The "canonical" choice is a local convention, not a geographic law — it needs an Endorsement Marker-equivalent (per Council-3 Resolution) distinguishing "our curated coastline" from "externally validated fact," particularly for contested cases (e.g., Turkey — Euphrates, Tigris, or Kızılırmak?).

**⚠ Horizon Signal — Letter Mode Quality Control:** Section 9 correctly rejects auto-generation, but the curation criteria for "playable triples" remain undefined. The example Berlin–Belgium–Brahmaputra is geographically incoherent by design, yet some players may burn cognitive cycles searching for a geographic pattern that does not exist. The document notes "awkward or obscure combinations" as a risk but does not specify a filter protocol (e.g., cross-continental spread caps, familiarity floor, or "false pattern" UX warning). This will become a scaling bottleneck when expanding beyond the initial 20 groups.

**⚠ Horizon Signal — Card Type Visibility Drift:** Section 11 suggests hiding card types "may make the game more interesting," but frames this as a UI preference rather than a difficulty parameter. In memory-categorization hybrids, category hints significantly alter cognitive load and search-space pruning. This decision should be explicitly mapped to the difficulty system (Section 12) — e.g., Type Visible = Level 1, Type Hidden = Level 2 — rather than left as an informal recommendation.

**⚠ Horizon Signal — Dataset Pool vs. Board Size Mismatch:** Section 8.1 recommends building "20 countries for Same Country Mode" as a starter dataset, while Section 4 recommends an 18-card board (6 triples). The relationship between pool size (20) and draw size (6) is mathematically clear to a designer but may not be explicit to a future implementer. A brief note clarifying that 20 is the reservoir from which 6 are sampled per round would prevent misinterpretation.

### Scan Summary

The blueprint is harborworthy. Its strongest structural element is the data model (Section 6), which creates a clean coastline between semantic content and presentation. The primary reframing need is to treat river-curation and letter-curation as claim-validation exercises (with explicit authority markers and feasibility flags) rather than purely editorial tasks, given the game's educational positioning.

Horizon clear on technical architecture and MVP scope; six signals detected on rule completeness, data governance, and UX cognition.
