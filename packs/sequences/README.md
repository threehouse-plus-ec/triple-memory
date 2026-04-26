# Sequences Pack (v0.1 draft)

Pattern-induction content pack for Triple Memory. Each entity is a named
mathematical sequence; the three card types are alternative fingerprints
of it:

- **Rule** — the sequence's name or closed-form rule.
- **First terms** — the first three terms (e.g. `1, 4, 9`).
- **Later term** — a value at a later position (e.g. `10th term: 100`).

Example triple: `Fibonacci numbers` · `1, 1, 2` · `12th term: 144`.

See [CURATION_STATEMENT.md](CURATION_STATEMENT.md) for the position
choices behind each later-term card (e.g. why Fibonacci uses 12th rather
than 10th — to avoid colliding with triangular's `10th term: 55` under
the engine's unique-labels-per-board constraint).

## Files

| File | Purpose |
|------|---------|
| `manifest.json` | Card-type registry; `supported_modes: ["shared_entity"]`; locales en/de. |
| `entities.json` | 20 sequence entities across difficulty tiers 1–4. |
| `cards.json` | 60 cards (20 entities × 3 card types). |
| `letter_groups.json` | Empty array — Shared Letter Mode not supported. |
| `icons/` | Card-type SVG icons (rule / first_terms / later_term). |

## Engine prerequisite

None beyond standard text rendering. Pure-text pack.
