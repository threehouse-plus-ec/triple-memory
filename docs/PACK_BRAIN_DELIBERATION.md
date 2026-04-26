# Pack–Brain-Function Deliberation

**Status:** open · drafted 2026-04-26

This is an open deliberation about what kinds of content packs Triple Memory
should support, organised by the cognitive faculties (and rough brain regions)
each pack trains. The goal is to move beyond pure vocabulary recall and cover
distinct kinds of mental work.

The triple structure imposes one constraint that every candidate must satisfy:
**each entity must have three meaningfully different representations**, and a
valid Shared Entity triple is "find the three cards that all refer to the same
entity". Packs that don't fit this mould are out of scope here.

## 1. What we have (snapshot)

| Pack | Triple | Faculty primarily trained | Brain regions implicated |
|------|--------|--------------------------|--------------------------|
| Geography | country / capital / river | Verbal-declarative recall + geographic association | Hippocampus (episodic/semantic), parahippocampal (place) |
| Chemistry | element / symbol / group | Verbal-declarative + symbol-name binding + categorical reasoning | Left temporal cortex (semantic), VWFA (symbol reading) |
| Music | composer / work / instrument | Verbal-declarative + cultural-temporal placement | Anterior temporal lobe, hippocampus |
| Math | + / − expression / × / ÷ expression / number | Numerical computation + **equivalence reasoning** | Intraparietal sulcus (number), prefrontal (working memory) |

**Honest read:** three of four packs are flavours of declarative-memory
training. Math is the only one whose triple structure forces *equivalence
reasoning* — recognising that `7 + 5`, `3 × 4`, and `12` denote the same
quantity. That equivalence step is the most cognitively distinctive thing the
engine currently exercises.

## 2. Faculty axes worth covering

Drawing loosely on cognitive psychology and neuropsychology, here are the
faculties a card-based memory game can plausibly train, plus how each
currently fares:

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

## 3. Candidate packs

For each candidate: the proposed triple structure, the primary faculty
trained, content-availability sanity check (can we get to ~24 entities
without straining), and key open questions.

### 3.1 Geometry — Shapes (the user's prompt)

| Field | Value |
|-------|-------|
| Triple | shape name · diagram (SVG) · property triplet (sides/angles/symmetry) |
| Faculty | visuospatial recognition + property recall |
| Pool | ≥ 30 common shapes (triangle, square, rectangle, rhombus, parallelogram, trapezium, kite, pentagon, hexagon, heptagon, octagon, decagon, dodecagon, regular vs irregular variants, circle, ellipse, semicircle, sector, segment, plus 3-D: cube, cuboid, cylinder, cone, sphere, pyramid, prism, tetrahedron) |
| Open questions | (a) Property card needs to be unique across the pack to play cleanly with the unique-labels-per-board constraint; "4 sides" alone is not unique. Use a compact property fingerprint (e.g. `4 sides · 4 right angles · 4 equal sides`) or name it after the most distinctive feature. (b) For 3-D shapes, do diagrams need a perspective convention, or is iso-net enough? |

**Verdict:** strongest candidate. Cleanly fills the visuospatial gap; pool is
ample; engine already supports SVG icons so per-shape diagrams are no extra
work.

### 3.2 Geometry — Area/Perimeter Formulas

| Field | Value |
|-------|-------|
| Triple | shape diagram · area formula · perimeter formula |
| Faculty | cross-modal mapping (shape ↔ algebra) + formula recall |
| Pool | ~ 12 shapes with clean closed-form area+perimeter (triangle, square, rectangle, parallelogram, trapezium, rhombus, kite, regular polygons by case, circle, sector, ellipse) |
| Open questions | (a) Pool is small unless we tier by difficulty (basic for primary, then irregular polygons for older students). (b) Formulas need to render with subscripts and `π`; HTML or MathML? |

**Verdict:** beautiful pack but pool is thin; could ship as a v0.1 with
~12 entities and accept that 24-card boards always include almost everything.

### 3.3 Sequences

| Field | Value |
|-------|-------|
| Triple | named rule (e.g. "n²") · first three terms ("1, 4, 9") · later term (e.g. "10th = 100") |
| Faculty | pattern induction + arithmetic |
| Pool | ~ 25 well-known sequences (squares, cubes, triangular, primes, Fibonacci, Lucas, factorials, powers of 2, evens, odds, multiples of k, n+1, 2n+1, square pyramidal, harmonic partials, etc.) |
| Open questions | (a) "First three terms" might overlap between sequences (e.g. `1, 1, 2` is Fibonacci's start but also occurs elsewhere). The unique-labels constraint will prevent collisions on board, but pool needs to be designed so collisions are rare. (b) "Later term" cards risk being numerically large and visually noisy. |

**Verdict:** strong candidate; the only pack that genuinely trains *pattern
induction*. Slight curation risk around term overlap.

### 3.4 Logic — Equivalent Statements

| Field | Value |
|-------|-------|
| Triple | natural-language proposition · formal-logic notation · truth-table summary (e.g. "F only when both true") |
| Faculty | formal/logical reasoning + symbol-name binding |
| Pool | propositional templates (NAND, NOR, XOR, implication, biconditional, De Morgan variants, …) — moderate, perhaps 20 |
| Open questions | (a) Audience is older students / adults, not primary-school. (b) Truth-table card needs a compact, unambiguous textual rendering. |

**Verdict:** distinctive faculty (formal reasoning); narrower audience.
Worth queueing after Geometry.

### 3.5 Algebra — Equation / Graph / Solution-set

| Field | Value |
|-------|-------|
| Triple | equation (e.g. `y = x² − 4`) · graph (SVG plot) · key feature (e.g. roots `±2`) |
| Faculty | cross-modal mapping (algebra ↔ visual) + algebraic reasoning |
| Pool | ample once we commit to plot rendering |
| Open questions | (a) Need an offline way to generate consistent SVG plots; static-pre-rendered is fine. (b) Curation: each entity's "key feature" must be unique to it (roots, vertex coords, intercepts mixed up). |

**Verdict:** the most cognitively rich proposal but the most expensive to
build. Defer until at least one cheaper visuospatial pack ships and proves
the pattern.

### 3.6 Anatomy / Biology / Astronomy — declarative variants

| Field | Value |
|-------|-------|
| Triple | name · function description · region/diagram |
| Faculty | verbal-declarative (same as existing) |
| Pool | very large |
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
| Pool | unlimited |
| Open questions | (a) Existing `label_variants` already supplies dual-locale labels — does this pack add value the existing locale switcher doesn't? (b) Is "trio" the right structure, or should the third card type be a picture? |

**Verdict:** if shipped, the third card type should be a *picture* rather
than a third language — that turns it into a proper cross-modal pack
(vocabulary ↔ visual). Otherwise it's redundant with the locale toggle.

### 3.8 Coordinates & Maps (Geography companion)

| Field | Value |
|-------|-------|
| Triple | place name · lat/lon coordinates · position pin on a base map (SVG) |
| Faculty | visuospatial localisation + numerical |
| Pool | drawn from existing Geography entities |
| Open questions | (a) Single shared base map for all positions, or per-region maps? (b) Pin card and place-name card might both be unambiguous; coords card is the genuinely numerical one. |

**Verdict:** a slim companion pack to Geography that adds visuospatial
training without requiring fresh research. Lower priority than Geometry but
near-zero curation cost.

## 4. Recommended priorities

If we ship one new pack at a time:

1. **Geometry — Shapes** (§3.1). Highest cognitive return per unit of effort:
   fills the visuospatial gap, ample content pool, leans on the engine's
   existing SVG-icon machinery. Good fit for elementary children **and**
   older students because difficulty tiers naturally exist (basic 2-D →
   irregular polygons → 3-D solids).
2. **Sequences** (§3.3). Fills the pattern-induction gap. Curation needs care
   but the pool is well-known and the pedagogy is solid.
3. **Geometry — Formulas** (§3.2). After §3.1 has proven the geometric SVG
   pipeline. Smaller pool but tightly couples shape ↔ algebra.
4. **Logic** (§3.4) and **Algebra/Graph** (§3.5). Larger projects; defer
   until a couple of the above have shipped.

Park the declarative-only candidates (anatomy, trilingual vocab, constants)
unless a specific user need surfaces — they don't expand cognitive coverage.

## 5. Open questions for next discussion round

- Do we want each pack to declare a `cognitive_axis` field in its manifest,
  so the menu can group packs by faculty? Cheap to add and would make the
  brain-function framing visible to users.
- Should the engine support a fourth display style for "diagram" cards
  (SVG content rendered in the card body, not just an icon)? Several
  candidates above (Geometry shapes, Algebra graphs, Coordinates) lean on
  it. Currently icons only appear on the card *type*, not as the *label*
  itself.
- Do we want age-range metadata per pack so the menu can suggest a
  starting pack? `target_age_band` might pair well with `difficulty`
  per entity.
