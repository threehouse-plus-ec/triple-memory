# Pack–Cognitive-Coverage Deliberation

**Status:** open · drafted 2026-04-26

This is an open deliberation about what kinds of content packs Triple Memory
should support, organised by the cognitive faculties each pack primarily
trains. The goal is to move beyond pure vocabulary recall and cover distinct
kinds of mental work.

The framing here is deliberately heuristic, not neuroscientific. The point is
to compare packs by the kind of mental work they ask of the player, not to make
strong claims about localised brain activation.

The triple structure imposes one constraint that every candidate must satisfy:
**each entity must have three meaningfully different representations**, and a
valid Shared Entity triple is "find the three cards that all refer to the same
entity". Packs that don't fit this mould are out of scope here.

## 1. What we have (snapshot)

| Pack | Triple | Faculty primarily trained |
|------|--------|--------------------------|
| Geography | country / capital / river | Verbal-declarative recall + geographic association |
| Chemistry | element / symbol / group | Verbal-declarative + symbol-name binding + categorical reasoning |
| Music | composer / work / instrument | Verbal-declarative + cultural-temporal placement |
| Math | + / − expression / × / ÷ expression / number | Numerical computation + **equivalence reasoning** |

**Honest read:** three of four packs are flavours of declarative-memory
training. Math is the only one whose triple structure forces *equivalence
reasoning* — recognising that `7 + 5`, `3 × 4`, and `12` denote the same
quantity. That equivalence step is the most cognitively distinctive thing the
engine currently exercises.

## 2. Faculty axes worth covering

Drawing loosely on cognitive psychology, here are the faculties a card-based
memory game can plausibly train, plus how each currently fares:

| Axis | Examples | Existing coverage |
|------|----------|--------------------|
| **Verbal-declarative recall** | vocabulary, names, facts | over-represented (3/4 packs) |
| **Symbol-name binding** | element symbols, written notation | partial (Chemistry) |
| **Categorical reasoning** | "what group does X belong to?" | partial (Chemistry groups, Music era) |
| **Numerical computation** | arithmetic, algebra | Math |
| **Equivalence / multi-representation reasoning** | same value, different forms | **Math is the only example** |
| **Visuospatial recognition** | identifying shapes, diagrams | **uncovered** |
| **Mental rotation / spatial transforms** | matching rotated forms | **uncovered** |
| **Pattern induction** | finding rules from examples | **uncovered** |
| **Logical / formal reasoning** | equivalent propositions | **uncovered** |
| **Cross-modal mapping** | linking text ↔ visual ↔ formula | **uncovered** |
| **Cross-linguistic mapping** | same concept across languages | partial via `label_variants`, but no pack centred on it |
| **Phonological / auditory** | rhyme, melody | **out of scope** (no audio in engine) |
| **Procedural / motor sequencing** | gesture, key-press order | **out of scope** (engine is pointer-only) |

The big gaps are visuospatial work, pattern induction, formal reasoning, and
cross-modal mapping. Those are the directions that promise the most
*distinct* cognitive value per new pack.

## 2.1 Extra screening questions

Beyond topic interest, each candidate should be screened against four product
questions:

- Does it support `shared_entity` cleanly, and does it also support
  `shared_letter` naturally or only by contrivance?
- Does it require a new engine surface such as in-card SVG/diagram rendering?
- Does it preserve active reasoning after repeated play, or does it collapse
  quickly into rote memorisation?
- Is the visual/formal representation doing real work, or is it decorative
  next to a text label that already gives the answer away?
- Does each card-type stay visually distinguishable across the active pool,
  or do labels collide and force the unique-labels-per-board constraint
  (engine §9.2) into its forced-collision second pass? Concretely: is there
  a third card type whose value space is as rich as the first two, or does
  it tend to collapse onto a small set of shared descriptors (e.g.
  "4 sides", "first three terms `1, 1, 2`")?

## 3. Candidate packs

For each candidate: the proposed triple structure, the primary faculty
trained, the likely mode support, content-availability sanity check, any
implementation dependency, and key open questions.

### 3.1 Geometry — Shapes (the user's prompt)

| Field | Value |
|-------|-------|
| Triple | shape name · diagram (SVG) · property triplet (sides/angles/symmetry) |
| Faculty | visuospatial recognition + property recall |
| Mode support | `shared_entity` cleanly; `shared_letter` likely weak or artificial in v0.1 |
| Pool | ≥ 30 common shapes (triangle, square, rectangle, rhombus, parallelogram, trapezium, kite, pentagon, hexagon, heptagon, octagon, decagon, dodecagon, regular vs irregular variants, circle, ellipse, semicircle, sector, segment, plus 3-D: cube, cuboid, cylinder, cone, sphere, pyramid, prism, tetrahedron) |
| Engine dependency | Strongly prefers an in-card diagram surface; type icons alone are not enough if the diagram is meant to carry the recognition load |
| Open questions | (a) Property card needs to be unique across the pack to play cleanly with the unique-labels-per-board constraint; "4 sides" alone is not unique. Use a compact property fingerprint (e.g. `4 sides · 4 right angles · 4 equal sides`) or name it after the most distinctive feature. (b) For 3-D shapes, do diagrams need a perspective convention, or is iso-net enough? |

**Verdict:** strongest content candidate, but its cognitive payoff is
*gated on* first paying the engine cost called out as §4 priority 1. It cleanly fills the
visuospatial gap and has ample pool depth; what it does *not* do is offer a
cheap shortcut. If we ship it before the in-card diagram surface exists, the
diagram card collapses to a name-only label and the player can win by
reading text alone — which forfeits the visuospatial training the pack
exists to deliver.

### 3.2 Geometry — Area/Perimeter Formulas

| Field | Value |
|-------|-------|
| Triple | shape diagram · area formula · perimeter formula |
| Faculty | cross-modal mapping (shape ↔ algebra) + formula recall |
| Mode support | `shared_entity` cleanly; `shared_letter` not a natural fit |
| Pool | ~ 12 shapes with clean closed-form area+perimeter (triangle, square, rectangle, parallelogram, trapezium, rhombus, kite, regular polygons by case, circle, sector, ellipse) |
| Engine dependency | Same diagram-surface requirement as §3.1; formula rendering also needs a settled notation policy |
| Open questions | (a) Pool is small unless we tier by difficulty (basic for primary, then irregular polygons for older students). (b) Formulas need to render with subscripts and `π`; HTML or MathML? |

**Verdict:** beautiful pack with a smaller pool, but not a non-starter. A
24-card board only needs 8 entities, so ~12 can still support a compact v0.1.
The real question is whether we want a specialist pack early, not whether the
pool is formally too small.

### 3.3 Sequences

| Field | Value |
|-------|-------|
| Triple | named rule (e.g. "n²") · first three terms ("1, 4, 9") · later term (e.g. "10th = 100") |
| Faculty | pattern induction + arithmetic |
| Mode support | `shared_entity` cleanly; `shared_letter` unlikely to be worth curating |
| Pool | ~ 25 well-known sequences (squares, cubes, triangular, primes, Fibonacci, Lucas, factorials, powers of 2, evens, odds, multiples of k, n+1, 2n+1, square pyramidal, harmonic partials, etc.) |
| Engine dependency | None beyond normal text rendering |
| Open questions | (a) "First three terms" might overlap between sequences (e.g. `1, 1, 2` is Fibonacci's start but also occurs elsewhere). The unique-labels constraint will prevent collisions on board, but pool needs to be designed so collisions are rare. (b) "Later term" cards risk being numerically large and visually noisy. |

**Verdict:** strong candidate; the only pack that genuinely trains *pattern
induction*. It also has good repeated-play durability because the player must
keep recognising a rule across different representations, not just rehearse a
name pairing. Slight curation risk around term overlap.

### 3.4 Logic — Equivalent Statements

| Field | Value |
|-------|-------|
| Triple | natural-language proposition · formal-logic notation · truth-table summary (e.g. "F only when both true") |
| Faculty | formal/logical reasoning + symbol-name binding |
| Mode support | `shared_entity` cleanly; `shared_letter` unnatural |
| Pool | propositional templates (NAND, NOR, XOR, implication, biconditional, De Morgan variants, …) — moderate, perhaps 20 |
| Engine dependency | None beyond clear notation rendering and accessible typography |
| Open questions | (a) Audience is older students / adults, not primary-school. (b) Truth-table card needs a compact, unambiguous textual rendering. |

**Verdict:** distinctive faculty (formal reasoning); narrower audience.
Worth queueing after Geometry.

### 3.5 Algebra — Equation / Graph / Solution-set

| Field | Value |
|-------|-------|
| Triple | equation (e.g. `y = x² − 4`) · graph (SVG plot) · key feature (e.g. roots `±2`) |
| Faculty | cross-modal mapping (algebra ↔ visual) + algebraic reasoning |
| Mode support | `shared_entity` cleanly; `shared_letter` unnatural |
| Pool | ample once we commit to plot rendering |
| Engine dependency | Requires an in-card graph surface and a reliable offline SVG-generation pipeline |
| Open questions | (a) Need an offline way to generate consistent SVG plots; static-pre-rendered is fine. (b) Curation: each entity's "key feature" must be unique to it (roots, vertex coords, intercepts mixed up). |

**Verdict:** the most cognitively rich proposal but the most expensive to
build. Defer until at least one cheaper visuospatial pack ships and proves
the pattern.

### 3.6 Anatomy / Biology / Astronomy — declarative variants

| Field | Value |
|-------|-------|
| Triple | name · function description · region/diagram |
| Faculty | verbal-declarative (same as existing) |
| Mode support | `shared_entity` cleanly; `shared_letter` possible but not inherently interesting |
| Pool | very large |
| Engine dependency | None, unless the diagram becomes central rather than supplementary |
| Open questions | none structural |

**Verdict:** content is interesting; faculty-wise these are *more of the
same*. Useful for users in a specific subject domain, but they don't expand
the cognitive footprint of the game. Park unless someone specifically
requests them.

### 3.7 Languages — Trilingual Vocabulary

| Field | Value |
|-------|-------|
| Triple | word in language A · word in language B · word in language C |
| Faculty | cross-linguistic vocabulary recall |
| Mode support | `shared_entity` cleanly; `shared_letter` depends on language pair and would be very uneven |
| Pool | unlimited |
| Engine dependency | None for text-only; image support if the third card becomes a picture rather than a third language |
| Open questions | (a) Existing `label_variants` already supplies dual-locale labels — does this pack add value the existing locale switcher doesn't? (b) Is "trio" the right structure, or should the third card type be a picture? |

**Verdict:** if shipped, the third card type should be a *picture* rather
than a third language — that turns it into a proper cross-modal pack
(vocabulary ↔ visual). Otherwise it's redundant with the locale toggle.

### 3.8 Coordinates & Maps (Geography companion)

| Field | Value |
|-------|-------|
| Triple | place name · lat/lon coordinates · position pin on a base map (SVG) |
| Faculty | visuospatial localisation + numerical |
| Mode support | `shared_entity` cleanly; `shared_letter` not a natural fit |
| Pool | drawn from existing Geography entities |
| Engine dependency | Needs the same in-card diagram/map surface as Geometry and Algebra, though with much simpler assets |
| Open questions | (a) Single shared base map for all positions, or per-region maps? (b) Pin card and place-name card might both be unambiguous; coords card is the genuinely numerical one. |

**Verdict:** a slim companion pack to Geography that adds visuospatial
training without requiring fresh research. Lower priority than Geometry but
near-zero curation cost.

## 4. Recommended priorities

The original recommended sequence was:

1. add an in-card diagram surface to the engine;
2. ship **Geometry — Shapes** (§3.1);
3. then choose between **Sequences** (§3.3) and **Coordinates & Maps** (§3.8);
4. then consider **Geometry — Formulas** (§3.2);
5. defer **Logic** (§3.4) and **Algebra/Graph** (§3.5) until later.

**Current status:** priorities 1 and 2 are now in flight together. That is a
sound pairing: Geometry — Shapes is the content case that justifies the
diagram-surface work, and the diagram surface is the engine feature that keeps
Geometry — Shapes from collapsing into a text-only naming exercise.

With that combined track underway, the next pickups are clearer:

1. **Next for broader cognitive coverage:** **Sequences** (§3.3). This is the
   natural follow-on if the goal is to expand the distinct kinds of mental
   work the game trains, because it adds pattern induction without depending
   on the geometry rendering path.
2. **Next once the diagram surface is proven on Geometry — Shapes:**
   **Geometry — Formulas** (§3.2). This is the natural follow-on if the goal
   is to deepen the geometry line after §3.1 has validated the diagram-card
   pipeline in actual play.
3. **Later:** **Logic** (§3.4) and **Algebra/Graph** (§3.5). Both remain
   attractive, but both should wait until the next pack after Geometry is no
   longer carrying engine-level uncertainty.

**Coordinates & Maps** (§3.8) still has value as a low-curation companion
pack, but once Geometry — Shapes itself is serving as the live proof case for
diagram cards, its role as the cheapest rendering pilot matters less.

Park the declarative-only candidates (anatomy, trilingual vocab, constants)
unless a specific user need surfaces — they don't expand cognitive coverage.

## 5. Open questions for next discussion round

- Do we want each pack to declare a `cognitive_axis` field in its manifest,
  so the menu can group packs by faculty? Cheap to add and would make the
  cognitive-coverage framing visible to users.
- Must every future pack support Shared Letter Mode, or is `shared_entity`
  support alone acceptable for specialised packs? The manifest already has a
  `supported_modes` slot, so this is mainly a product-policy decision.
- Should the engine support a fourth display style for "diagram" cards
  (SVG content rendered in the card body, not just an icon)? Several
  candidates above (Geometry shapes, Algebra graphs, Coordinates) lean on
  it. Currently icons only appear on the card *type*, not as the *label*
  itself.
- Do we want a pack-level field that distinguishes `primary_faculty` from
  `secondary_faculties`, or is one axis enough for MVP menu grouping?
- Do we want age-range metadata per pack so the menu can suggest a
  starting pack? `target_age_band` might pair well with `difficulty`
  per entity.
