# External Critique of Blueprint v0.2

**Source:** External reviewer (non-Council).
**Received:** 2026-04-22
**Subject:** Blueprint v0.2 — over-governance and tutorial mode recommendation
**Archived for:** deliberation history

---

## Summary of the reviewer's position

Tutorial-mode suggestion is strong. It fits the blueprint well, and in fact it helps resolve one of the main tensions in v0.2: the design wants to be educationally transparent, but the current MVP still begins directly with full triple matching. A tutorial layer would make the onboarding much cleaner.

My critical view is: yes, add it — but keep it narrowly scoped. If it becomes too elaborate, it will inflate the MVP and delay the useful part, namely testing whether the core triple-memory loop is fun.

## Overall assessment of the draft

The draft is much stronger than v0.1. It is clearer, more honest about curation, and substantially better aligned with an educational setting. In particular, these are real improvements:

- the explicit separation between gameplay convention and geographic fact,
- visible card types by default,
- the recognition that capitals and rivers are curated choices rather than neutral givens,
- the accessibility baseline,
- the separation of Same Country and Same Letter into distinct deck logics.

So the draft is not only more rigorous; it is also more teachable.

That said, the current version is at risk of becoming over-governed relative to the size of the first prototype. Some of the governance and metadata layers are excellent for publication or long-term maintenance, but they may burden the first implementation more than they help.

## Critical feedback

### 1. The draft is close to two documents, not one

At the moment it partly reads as a game blueprint AND a governance/curation charter. That is intellectually coherent, but for implementation it may be too dense. The risk is that the actual prototype work gets blocked by document overhead.

Recommendation: distinguish more sharply between implementation-critical requirements and publication-grade curation requirements.

**Implementation-critical now:**
- mode exclusivity,
- visible card type,
- fixed turn logic,
- triple validation,
- JSON schema,
- accessibility basics.

**Valuable, but can be lighter in MVP:**
- full dispute process,
- fully elaborated endorsement history,
- broad recognition taxonomy beyond un_member,
- highly formal provenance wording on every field.

### 2. Tutorial mode is missing and should be added

This is the most useful addition. A new player must immediately understand: three card types, one active mode, triple instead of pair matching, and the meaning of visible type hints. That is a lot at once, especially for children or casual players.

**Why tutorial mode helps:** educational transparency, reduced guesswork, faster onboarding, better playtesting quality (early failures are not about misunderstanding rules).

**But keep it small.** Three-step tutorial flow:

- **Step 1 — Learn the card types:** show Capital / Country / River examples.
- **Step 2 — Learn one mode at a time:** small Same Country example (Vienna/Austria/Danube), then small Same Letter example (Prague/Portugal/Po).
- **Step 3 — One guided mini-round:** 2 or 3 triples, type visible, soft hints after wrong attempts.

### 3. Some rules are slightly over-specified for MVP

**3a. The letter-mode filter may be too strict.** The cross-continental balance cap may reject otherwise good and memorable groups. The more important filter is: exactly one of each type, familiar labels, no misleading false geographic pattern. Continent-balancing may be a second-phase refinement.

**3b. Board-level collision rule may be too restrictive.** The §9.3 rule forbidding two cards of the same card_type with the same initial letter across different triples is logically clean but could make board generation brittle. Test whether it materially improves play before treating it as hard law.

### 4. Same Letter mode remains structurally weaker than Same Country mode

The draft is honest about this, which is good. But the asymmetry should perhaps be stated even more directly. Same Country teaches a semantic relation; Same Letter teaches a formal lexical relation. State explicitly that Same Letter mode is a lighter, faster, more playful mode, not a geography-reference mode in the same sense.

### 5. The document could state a stronger pedagogical progression

Good progression: tutorial → Same Country introductory → Same Letter standard → advanced / expert variants. The blueprint defines difficulty mainly by metadata and visibility, but not yet by learning progression.

### 6. The governance layer is good, but should not obscure fun

The main critical tension in the draft. Curation Statement, disputes, provenance, endorsement markers must remain available and linked, but must not visually dominate actual play.

## Concrete recommendation

- Yes for tutorial mode in MVP, if lightweight.
- Keep it to one short guided flow.
- No narrative tutorial.
- Use it to teach card types, mode logic, and triple matching.
- Make it optional from the menu, with a first-launch prompt.

## Bottom line

- v0.2 is substantially better than v0.1.
- The strongest new addition proposed is tutorial mode.
- The main risk of the draft is not conceptual weakness, but over-structuring the MVP.
- A small tutorial mode would improve onboarding more than several of the heavier governance refinements improve gameplay.

## Concise formulation

The blueprint is now rigorous, transparent, and educationally coherent. Its main remaining weakness is onboarding: first-time players are still expected to infer too much too quickly from the full game state. A lightweight tutorial mode would therefore be a high-value addition. By contrast, some of the more elaborate curation and board-generation constraints may be stronger than the MVP yet requires and should be tested empirically before being treated as hard rules.
