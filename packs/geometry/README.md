# Geometry Pack (v0.1 draft)

Visuospatial content pack for Triple Memory. Each entity is a 2-D or 3-D
shape; the three card types are:

- **Name** — the shape's name (English / German).
- **Diagram** — an inline SVG drawing of the shape, rendered as the
  card's main visible content.
- **Properties** — a unique triplet of distinguishing facts
  (e.g. `4 sides · 4 right angles · all sides equal`).

Example triple: `Square` · *(square diagram)* · `4 sides · 4 right angles · all sides equal`.

See [CURATION_STATEMENT.md](CURATION_STATEMENT.md) for scope, accessibility
notes (diagram cards are inherently sighted content), and the rationale
behind the British / European "trapezium" sense.

## Files

| File | Purpose |
|------|---------|
| `manifest.json` | Card-type registry; `supported_modes: ["shared_entity"]`; locales en/de. |
| `entities.json` | 24 shape entities across difficulty tiers 1–4. |
| `cards.json` | 72 cards (24 entities × 3 card types). Diagram cards carry a `diagram` field referencing the SVG file in `diagrams/`. |
| `letter_groups.json` | Empty array — Shared Letter Mode not supported. |
| `diagrams/` | 24 inline SVG diagrams, one per shape. |
| `icons/` | Card-type SVG icons (name / diagram / properties). |

## Engine prerequisite

This pack depends on the in-card diagram surface added in the companion
engine PR. Without that surface the diagram card collapses to a
text-label-only fallback, which forfeits the visuospatial training the
pack exists to deliver.
