# Sequences Pack — Curation Statement (v0.1 draft)

## Purpose
The sequences pack trains **pattern induction** — the cognitive axis
identified as uncovered (along with visuospatial work) by the existing
packs in `docs/PACK_BRAIN_DELIBERATION.md`. Each entity is a named
mathematical sequence, and the three card types are alternative
fingerprints of it:

- **Rule** — the sequence's name or closed-form rule (e.g. "Square
  numbers (n²)", "Fibonacci numbers", "Multiples of 7").
- **First terms** — the first three terms of the sequence as a
  comma-separated list (e.g. "1, 4, 9").
- **Later term** — a value at a later position, given as
  "Nth term: V" (or "N. Glied: V" in German).

A valid Shared Entity Mode triple is the three cards that all describe
the same sequence.

Per the deliberation §3.3, this is the only pack that genuinely trains
*pattern induction* — recognising a rule across different
representations, not rehearsing a name pairing. It also has good
repeated-play durability because each round forces the player to
re-decompose `1, 1, 2` ↔ "Fibonacci numbers" ↔ "12th term: 144" rather
than memorise a face-card pairing.

## Scope
- **20 sequences** spread across four difficulty tiers:
  - **Difficulty 1 (6):** naturals, evens, odds, multiples of 3,
    multiples of 5, square numbers.
  - **Difficulty 2 (7):** cubes, triangular, powers of 2, multiples of
    7, multiples of 11, primes, composites.
  - **Difficulty 3 (6):** pentagonal, hexagonal, tetrahedral, powers of
    3, factorials, Fibonacci.
  - **Difficulty 4 (1):** square pyramidal numbers.
- **Later-term position chosen per sequence** to ensure each
  later-term card has a unique displayed value across the active pool.
  Most sequences use "10th term"; Fibonacci uses "12th term: 144" to
  avoid colliding with triangular's "10th term: 55"; powers of 3 uses
  "8th term"; factorials uses "6th term"; powers of 2 keeps "10th
  term: 1024" because no other pool member produces 1024.
- **First-terms triplets verified unique** at generation time (e.g.
  Catalan's first three "1, 1, 2" would have collided with Fibonacci's,
  so Catalan is intentionally not in v0.1).

This satisfies the unique-labels-per-board constraint shipped in PR #5
(engine §9.2) without falling back to its forced-collision pass for any
of the three card types.

## Notation
- **Rule cards**: prefer the canonical English / German name; include
  a short formula in brackets where it aids recognition (e.g. "Square
  numbers (n²)", "Quadratzahlen (n²)").
- **First-terms cards**: comma-separated, locale-neutral. The German
  decimal comma does not affect integer sequences.
- **Later-term cards**: "Nth term: V" in English, "N. Glied: V" in
  German — the conventional schoolbook form in each locale.

## Game-mode support
- **Shared Entity Mode**: yes. This is the natural fit.
- **Shared Letter Mode**: not supported. A "sequences whose name starts
  with P" group tests English spelling, not pattern induction. The pack
  declares `supported_modes: ["shared_entity"]` only and ships an empty
  `letter_groups.json`. The engine hides the corresponding menu button
  for packs that don't list the mode.

## Provenance
Standard mathematical sequences, OEIS-aligned references where
applicable. Position choices for later-term cards are recorded in this
file so future maintainers know why "12th: 144" is used for Fibonacci
rather than the more obvious "10th: 55".

## Endorsement marker
`sequences_pack_v0.1_draft`
