# Scripts

One-off tooling that supports the engine but isn't loaded by it.

## `simulate_triples.js`

Monte Carlo simulation of the triple-matching game under two strategies:

- **Perfect memory optimal-ish play** — full recall; completes any
  fully-known triple first, otherwise gambles on a known pair + one
  unknown, otherwise reveals 3 unknowns for information gathering.
- **Random no-memory play** — picks 3 face-down cards uniformly at
  random on every attempt.

The perfect-memory mean output is the source of the
`AVG_PERFECT_MEMORY_FLIPS` lookup table in
[`engine/app.js`](../engine/app.js). The random output validates the
closed-form expected value `p · Σ_{k=1..N} 1/P(match|k)` used by
`randomFlips()`.

### Run

```
node scripts/simulate_triples.js [trials]
```

`trials` defaults to 20000 and applies per configuration.

### Baseline values used by the engine (20000 trials per configuration)

| Triples | Cards | Perfect (min) | Avg (sim mean) | Random (sim mean) |
|--------:|------:|--------------:|---------------:|------------------:|
| 4       | 12    | 12            | 30             | 282               |
| 6       | 18    | 18            | 51             | 962               |
| 8       | 24    | 24            | 73             | 2287              |

Re-run with more trials to tighten the estimates; update the lookup
table in `app.js` if the mean shifts materially.

## Licence

MIT. See the root [`LICENCE`](../LICENCE).
