# External Review — Tutorial Mode Restriction

**Source:** External reviewer (non-Council).
**Received:** 2026-04-22
**Subject:** Proposal to restrict multilingual names and facts to Tutorial Mode; introduces the Post-Match Reveal refinement
**Archived for:** deliberation history

---

## Reviewer's position

That is a very clean and strategically strong choice. It resolves several tensions at once: cognitive load, UI clarity, and curation overhead. I would endorse it, but with two refinements so you don't accidentally hide the educational value too much.

## 1. Why restricting it to tutorial mode works

**Cognitive load (primary benefit).** During gameplay, the player needs to remember positions, recognise categories, track the active mode, plan moves. Adding multilingual labels and facts on top of that would compete directly with working memory. You risk turning a memory game into a reading task.

> Gameplay = minimal, fast, clean. Tutorial = rich, explanatory, slower.

That separation is conceptually very strong.

### Alignment with v0.2 principles

- "Opacity is a difficulty setting" → tutorial reduces opacity, gameplay can stay lean.
- "Educational transparency" → tutorial provides the explanation layer explicitly.
- Separation of coastline vs. sails (Harbour framing) → gameplay = coastline (stable rules); tutorial = sails (interpretation, explanation, context).

## 2. What to include in tutorial mode

### 2.1 Multilingual names (excellent fit)

Tutorial is the right place for English / German / local or native form.

Example (after revealing a triple):

Vienna · Austria · Danube

Then:
- English: Vienna · Austria · Danube
- German: Wien · Österreich · Donau
- Local: Wien · Österreich · Donau

This turns the tutorial into a micro-language lesson, which is pedagogically strong.

### 2.2 Facts (also a good fit — with structure)

Strict rules: not random trivia, not long sentences, not more than 2–3 short facts per entity.

Example:

**Austria**
- Central Europe
- EU member
- Official language: German

**Vienna**
- Capital and largest city
- On the Danube
- Cultural centre

**Danube**
- ~2,850 km long
- Flows through 10 countries
- Ends in the Black Sea

Displayed after a correct match, not before.

### 2.3 Timing matters

**Show facts only after a successful triple, not during card selection.** Otherwise players will try to read instead of memorising.

Flow: Match → pause → show info panel → continue.

## 3. One important caution

If you only include facts and multilingual data in tutorial mode, you risk:
- players skipping tutorial once,
- never seeing the educational layer again.

That would underuse your strongest idea.

## 4. Suggested refinement (important)

Keep tutorial mode as the main learning space, but add a minimal "post-match reveal" in normal gameplay.

After a correct triple:
- show the three names (EN / DE / local) for 2–3 seconds,
- optionally one short fact line (not three).

Example:

Vienna (Wien) · Austria (Österreich) · Danube (Donau)

That's enough to reinforce learning without slowing the game. Then full facts only in tutorial (or optional info panel); gameplay remains fast.

## 5. Where this fits in the blueprint

New sections:

- **10.4 Tutorial Mode (Learning Layer)** — deep explanation.
- **5.4 Post-Match Information Reveal** — minimal reinforcement.

Architecture stays clean:
- Tutorial mode → deep explanation
- Gameplay → minimal reinforcement
- Advanced modes → no extra info

## 6. Critical evaluation

**Strong points:** reduces clutter, preserves game speed, aligns with educational intent, simplifies MVP implementation, avoids premature data explosion.

**Potential weakness (if unrefined):** learning content becomes invisible after tutorial, multilingual data underused, facts become "optional bonus" rather than integrated feature.

With the refinement above, this weakness disappears.

## 7. Final position

The proposal is not just "good" — it's structurally elegant.

> Rich information belongs to moments of certainty (tutorial and successful matches), not moments of uncertainty (card selection).

That principle fits the entire design philosophy.
