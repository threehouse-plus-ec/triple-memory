# Math Pack (v0.1 draft)

Mental-arithmetic content pack for Triple Memory, aimed at elementary-school
children. Entities are positive whole-number results; the three card types are:

- **+ / −** — an addition or subtraction expression that evaluates to the result.
- **× / ÷** — a multiplication or division expression that evaluates to the result.
- **Number** — the result itself.

Example triple: `7 + 5`, `3 × 4`, `12`.

See [CURATION_STATEMENT.md](CURATION_STATEMENT.md) for scope, operator
notation by locale, and pedagogical choices.

## Files

| File | Purpose |
|------|---------|
| `manifest.json` | Card-type registry, supported modes/locales/board sizes. |
| `entities.json` | 29 result-number entities across difficulty tiers 1–4, with German label variants. |
| `cards.json` | 87 cards (29 entities × 3 card types). |
| `letter_groups.json` | Intentionally empty — Shared Letter Mode is not supported by this pack. |
| `icons/` | Card-type SVG icons. |

## Game modes

- Shared Entity Mode: supported.
- Shared Letter Mode: **not supported**. The engine hides the button for
  packs whose `supported_modes` field does not list the mode.
