# Music Pack — Triple Memory

**Status:** Draft v0.1. Single-operator content; all entries flagged with `music_pack_v0.1_draft` and pending the TASK_CARDS v1.0 §2 two-person cross-check.

**Pack version:** 0.1
**Endorsement Marker:** `music_pack_v0.1_draft`

## Purpose

The Chemistry Pack was added to validate engine/pack decoupling. The Music Pack follows the same shape but stresses a different edge: non-Latin `native_display` scripts (Cyrillic for Tchaikovsky; Bengali and Devanagari for Ravi Shankar's labels), surfaced in the post-match overlay. Off-roster shared-letter references (12 distinct off-roster `entity_id` values) are used at roughly the same intensity as in the chemistry pack (13 off-roster) rather than more heavily — a natural consequence of the Western classical canon having crowded letter distributions at some letters (B, C, S) and sparse distributions at others (F, N, O, P instrument cards).

## Triple

Each entity is a composer. Its three cards are:

- **Composer** — the composer's surname (e.g. *Bach*, *Mozart*, *Tchaikovsky*). Where disambiguation is useful, a first name is included (*Clara Schumann*, *Ravi Shankar*, *Hildegard von Bingen*).
- **Work** — one canonical work (e.g. *Brandenburg Concertos*, *The Magic Flute* → *Clarinet Concerto* for Mozart). Definite articles are dropped for the purposes of letter-mode matching, following the geography pack's convention.
- **Instrument** — the principal solo or featured instrument of the canonical work (e.g. *Harpsichord* for Bach's Brandenburg Concertos, *Clarinet* for Mozart's Clarinet Concerto, *Celesta* for Tchaikovsky's Nutcracker). This is explicitly **not** the composer's personal instrument — see Curation Statement §2.2.

## Current contents

- `manifest.json` — pack declaration, 3 card types, en + de locales, board sizes 12 / 18 / 24.
- `entities.json` — 20 composers spanning Medieval (Hildegard), Baroque, Classical, Romantic, and 20th-century periods; includes two non-Western-European entries (Ravi Shankar; Gershwin).
- `cards.json` — 60 cards (3 per composer).
- `letter_groups.json` — 20 curated triples across 12 letters (B, C, D, F, H, L, M, P, R, S, T, V). Twelve distinct off-roster `entity_id` values appear in letter groups: composers *Fauré*, *Paganini*, *Puccini*, *Telemann*, and instruments *Double Bass*, *Drums*, *Horn*, *Lute*, *Mandolin*, *Marimba*, *Recorder*, *Saxophone*. The engine synthesises these shared-letter cards at runtime without entity metadata ([`engine/app.js:463`](../../engine/app.js#L463)), so they play correctly but do not surface facts or trilingual labels in the post-match overlay. See Curation Statement §2.3.
- `icons/composer.svg`, `icons/work.svg`, `icons/instrument.svg` — three monochrome `currentColor` SVGs.
- `CURATION_STATEMENT.md` — choices, provenance, dispute channel.

## Scope at v0.1

- 20 composers, 20 letter groups.
- DE and local/`native_display` label_variants supplied for a 5-entry pilot: **Bach, Mozart, Beethoven, Tchaikovsky, Ravi Shankar**. Tchaikovsky and Ravi Shankar exercise the `native_display` field with Cyrillic, Bengali, and Devanagari scripts. The other 15 entities carry empty `label_variants: {}`.
- Facts supplied for the same 5-entry pilot (three per card type per entity). Others carry empty `facts: {}`.
- Pianists dominate the Romantic canon and Piano dominates the instrument distribution (5 of 20 entities); letter-group design compensates by pairing P-initial works with off-roster P-initial composers (*Paganini*, *Puccini*).

All content is **draft** and has not been through the TASK_CARDS v1.0 §2 two-person cross-check protocol. Entities and letter-group cards carry `endorsement_marker: "music_pack_v0.1_draft"` so they are grep-able for a future verification pass. A single-operator self-audit has been recorded in [`docs/music_pack_self_check.md`](../../docs/music_pack_self_check.md).

## Launch

`engine/?pack=music` — the engine's pack selector in the menu switches between geography, chemistry, and music without reload of the app shell.

## Dispute channel

Please open an issue at `https://github.com/threehouse-plus-ec/triple-memory/issues`. Pack-specific disputes are reviewed and, where accepted, recorded in `CURATION_STATEMENT.md` with an updated `endorsement_marker`.

## Licence

This folder carries two licences per the repository's split architecture:

- **JSON datasets** (`manifest.json`, `entities.json`, `cards.json`, `letter_groups.json`) and **`CURATION_STATEMENT.md`** — CC BY-SA 4.0. See [`../../LICENCE-CONTENT`](../../LICENCE-CONTENT).
- **SVG icons** in `icons/` — MIT. See [`../../LICENCE`](../../LICENCE).
