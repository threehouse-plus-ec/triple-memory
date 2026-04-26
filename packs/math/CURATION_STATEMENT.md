# Math Pack — Curation Statement (v0.1 draft)

## Purpose
The math pack is for elementary-school children (and anyone refreshing
mental arithmetic). Each entity is a positive whole-number result, and
the three card types are alternative ways to express that result:

- **+ / −** card — an addition or subtraction expression evaluating to the result.
- **× / ÷** card — a multiplication or division expression evaluating to the result.
- **Number** card — the result itself, as a numeral.

A valid Shared Entity Mode triple matches the three cards that all
evaluate to the same number (e.g. `7 + 5`, `3 × 4`, `12`).

## Scope
- 29 result numbers in v0.1, spread across four difficulty tiers:
  - **Difficulty 1 (5 entities):** results 4 – 10. Single-digit operands.
  - **Difficulty 2 (8 entities):** results 12 – 24. Times tables ≤ 5.
  - **Difficulty 3 (9 entities):** results 25 – 48. Times tables 5 – 8.
  - **Difficulty 4 (7 entities):** results 49 – 81. Times tables 7 – 9.
- One canonical expression per (entity, card type). Future versions may
  add expression variants per number for round-to-round freshness.
- Each result has both a non-trivial addition/subtraction expression and
  a non-trivial multiplication/division expression. Primes greater than
  7 are deliberately omitted because their only multiplication factoring
  is `1 × p`, which is pedagogically thin.

## Operator notation by locale
- English (`primary_locale`): `+`, `−`, `×`, `÷`.
- German: `+`, `−`, `·` (centred dot), `:` (colon for division) — the
  conventional schoolbook notation in the German-speaking world.

## Game-mode support
- **Shared Entity Mode**: yes. This is the natural fit.
- **Shared Letter Mode**: not supported. Numerical "letter groups"
  would be meaningless. The engine hides the Shared Letter Mode button
  for packs whose `supported_modes` does not list it, and `letter_groups.json`
  is intentionally empty.

## Provenance
Standard arithmetic; expressions chosen by hand to suit elementary-school
practice. No external dataset.

## Endorsement marker
`math_pack_v0.1_draft`
