# Geometry Pack — Curation Statement (v0.1 draft)

## Purpose
The geometry pack trains **visuospatial recognition** alongside vocabulary
and property recall — the cognitive axis identified as uncovered by the
existing four packs in `docs/PACK_BRAIN_DELIBERATION.md`. Each entity is a
2-D or 3-D shape, and the three card types are alternative representations
of it:

- **Name** card — the shape's English (primary) or German name.
- **Diagram** card — an inline SVG drawing of the shape, rendered as the
  card's main visible content. Engine support for in-card diagrams is the
  prerequisite called out as §4 priority 1 in the deliberation document
  and is shipped in the companion engine PR.
- **Properties** card — a triplet of distinguishing properties unique to
  the shape (e.g. for a square: `4 sides · 4 right angles · all sides
  equal`).

A valid Shared Entity Mode triple is the three cards that all describe
the same shape.

## Scope
- **24 shapes** spread across four difficulty tiers:
  - **Difficulty 1 (6):** square, rectangle, circle, equilateral
    triangle, right triangle, isosceles triangle.
  - **Difficulty 2 (7):** rhombus, parallelogram, trapezium, kite,
    scalene triangle, ellipse, semicircle.
  - **Difficulty 3 (5 + 3):** regular pentagon, regular hexagon, regular
    octagon — plus the basic 3-D solids cube, cuboid, sphere.
  - **Difficulty 4 (4):** cylinder, cone, square pyramid, triangular
    prism, tetrahedron.
- One canonical diagram per shape (oblique/isometric stylisation for the
  3-D solids — recognisable at the small card sizes used by the engine,
  not photoreal).
- **Properties triplets verified unique** across the pack at generation
  time; this satisfies the unique-labels-per-board constraint shipped in
  PR #5 (engine §9.2) without falling back to the forced-collision path.

## Notation
- Names: English (primary) and German.
- Property triplets: separator `·` (Unicode middle dot) between the three
  facts, unchanged across locales for consistency.
- Trapezium uses the **British / European** sense — a quadrilateral with
  exactly one pair of parallel sides. (US "trapezoid" is the same shape.
  US "trapezium" is what the rest of the world calls a "trapezoid", i.e.
  no parallel sides.) Documented here so future maintainers don't change
  the geometry while translating.

## Game-mode support
- **Shared Entity Mode**: yes. This is the natural fit.
- **Shared Letter Mode**: not supported. A "shape whose English name
  starts with S" group does not test geometric understanding — it tests
  English spelling. The pack therefore declares
  `supported_modes: ["shared_entity"]` only, and `letter_groups.json`
  is intentionally empty. The engine hides the corresponding menu
  button for packs that don't list the mode.

## Accessibility
The diagram card type is fundamentally **sighted content**. The engine's
diagram surface (companion engine PR) uses a generic aria-label
("Diagram card, position N — visual recognition required") for unmatched
diagram cards so that screen-reader play does not reveal the entity. Once
matched, the resolved label is surfaced. The pack manifest declares this
limitation explicitly:

```
"accessibility_declaration": {
  "diagram_cards_require_sight": true,
  "diagram_cards_aria_label": "generic-until-matched"
}
```

This honestly reflects that the visuospatial axis is not equally
accessible in non-visual modalities, just as the deliberation noted
phonological/auditory packs are not equally accessible without audio.
Players relying on screen readers will find the existing four packs
better suited.

## Provenance
Standard school geometry. Shape names follow common British / European
classroom usage; properties are minimal and non-controversial. No
external dataset.

## Endorsement marker
`geometry_pack_v0.1_draft`
