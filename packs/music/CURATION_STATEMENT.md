# Curation Statement — Music Pack

**Pack version:** 0.1 (draft)
**Endorsement Marker:** `music_pack_v0.1_draft`
**Status:** Single-operator draft. Content has not been through a two-person cross-check.
**Date:** 2026-04-24

---

## About this document

This Curation Statement is intended for teachers, parents, and players who want to understand the choices behind the data in this pack. It is not shown during gameplay. It is linked from the main menu footer and from the top-level `README.md`.

Per the Engine Blueprint's Governance Visibility Principle (§24), the pack's gameplay surface stays clean. Governance lives here.

---

## 1. Preamble

Music is a domain with several hazards the pack has to declare up front.

- **There is no single authoritative catalogue.** Grove Music Online is the closest thing to a consensus reference, but it is not a canon. Selection of the 20 composers, and of one canonical work per composer, is an editorial judgement.
- **"Canonical work" is a working fiction.** Almost every composer has more than one work that could reasonably stand in for them. The pack picks one per composer with enough name-recognition to carry a card, not one that is objectively the greatest.
- **"Canonical instrument" is a chain, not an attribute.** For geography, an entity (country) has a capital and a river as attributes; for chemistry, an element has a symbol and a group. For music the shared-entity link is: the composer wrote the canonical work, and the canonical work has a principal featured instrument. This is why some composers' cards point at an instrument other than the one they personally played (see §2.2).
- **The Western classical canon is demographically narrow.** Twenty entries cannot represent world music or even all of Europe; they can represent a core that many players will have some handle on, with a small number of additions that deliberately stretch the geography (Hildegard von Bingen from medieval Germany; Clara Schumann; George Gershwin; Ravi Shankar). This is a selection bias acknowledged, not apologised away.

---

## 2. Worked examples

### 2.1 Canonical work — Mozart's Clarinet Concerto over Eine kleine Nachtmusik

Mozart wrote over 600 catalogued works. *Eine kleine Nachtmusik* is more widely hummable, but the Clarinet Concerto (K. 622) ties cleanly to a single featured instrument, was written in the final year of Mozart's life, and gives the letter-mode matching a natural *Clarinet / Clarinet Concerto / Clarinet* triple at `C_01`. Selection was made for triple-mode strength, not for popularity.

### 2.2 Canonical instrument — Bach's Harpsichord over Organ

Bach was primarily an organist; most of his professional appointments were organist posts. The pack nevertheless lists Bach's canonical instrument as *Harpsichord* rather than *Organ*, because the canonical work (*Brandenburg Concertos*) puts the harpsichord at the centre (especially in Concerto No. 5, which is effectively a harpsichord concerto). The rule adopted throughout the pack is: **canonical instrument = principal featured instrument of the canonical work**, not **canonical instrument = composer's personal instrument**. This is noted because players who know Bach as an organist may be surprised.

Same rule explains why *Gershwin → Clarinet* (the opening glissando of *Rhapsody in Blue*) rather than *Piano*; why *Stravinsky → Bassoon* (the opening solo of *The Rite of Spring*) rather than *Piano*; and why *Tchaikovsky → Celesta* (the Dance of the Sugar Plum Fairy) rather than, say, *Orchestra* or *Piano*.

### 2.3 Off-roster letter-group cards

Letter groups intentionally reference composers and instruments that are **not** in the 20-entity roster: *Fauré*, *Paganini*, *Puccini*, *Telemann* on the composer side; *Double Bass*, *Drums*, *Horn*, *Lute*, *Mandolin*, *Marimba*, *Recorder*, *Saxophone* on the instrument side. This mirrors the geography pack's handling of off-roster `country_id` values (e.g. `GBR`, `RUS`, `LTU`) and the chemistry pack's handling of off-roster `entity_id` values (e.g. `AR`, `HF`, `TI`). The engine synthesises these shared-letter cards at runtime without entity metadata; they play correctly but do not surface facts or trilingual labels in the post-match overlay. If any of these composers or instruments is later promoted to the roster, their existing letter-group references automatically acquire full metadata without any change to `letter_groups.json`.

### 2.4 Definite articles and letter-mode matching

For letter-mode matching we strip leading definite articles in English (*The Nutcracker* → initial `N`, not `T`; *The Rite of Spring* → `R`, not `T`; *The Four Seasons* → `F`). The label as shown on the card drops the article too (*Nutcracker*, *Rite of Spring*, *Four Seasons*) so that the displayed letter matches the `initial_letter` used by the engine. This follows the geography pack's convention (labels are *Netherlands*, not *The Netherlands*). The Italian article in *La Campanella* is retained because *La Campanella* is the standard published title in Italian and stripping the article would rename the work.

### 2.5 Romanisation and native script

Tchaikovsky and Ravi Shankar carry non-Latin `native_display` strings (Cyrillic Чайковский, Щелкунчик; Bengali রবি শংকর; Devanagari राग जोग, सितार) in the label_variants pilot. The card face shows the English/Latin form; the native-script form appears in the post-match overlay only, matching the engine's `native_display` rendering path documented in `docs/PACK_INTERFACE.md §2.1`. The card's `initial_letter` remains Latin (`T` for Tchaikovsky, `R` for Ravi Shankar), so shared-letter matching is unaffected by the native-script form.

**Romanisation policy for `local_display`.** The engine appends both `local_display` and `native_display` to the post-match overlay when they differ from the currently-displayed card label. For Cyrillic, Bengali, and Devanagari entries there is no single agreed Latin-script "local" form (ISO 9, BGN/PCGN, and conventional English transliterations all disagree), so at v0.1_draft the pilot uses the conventional English form (*Tchaikovsky*, *Nutcracker*, *Ravi Shankar*, *Raga Jog*, *Sitar*) as `local_display`. This prevents the overlay from rendering the native-script string twice while leaving the authoritative choice (ISO-9 scientific transliteration versus conventional English versus a German-family transliteration such as *Tschaikowsky*) to the two-person cross-check.

### 2.6 Selection bias

The roster over-represents 18th- and 19th-century male European composers. This is a fair criticism of what the composite "canonical Western classical tradition" has inherited, not a judgement of the individuals on the list. The pack partially offsets this by including *Hildegard von Bingen* (medieval Germany; one of the earliest known named composers), *Clara Schumann* (Romantic era; often overshadowed historically by her husband Robert), *George Gershwin* (early-20th-century American, cross-genre), and *Ravi Shankar* (Hindustani classical, global cross-cultural influence). A v0.2 pass could add names such as *Florence Price*, *Nadia Boulanger*, *Fanny Mendelssohn*, *Umm Kulthum*, or *Toru Takemitsu* without changing engine code.

---

## 3. Provenance source list

- Grove Music Online (Oxford).
- Köchel-Verzeichnis (Mozart catalogue, 8th edition, ed. Giegling, Weinmann, Sievers).
- Hoboken-Verzeichnis (Haydn catalogue).
- Ryom-Verzeichnis (Vivaldi catalogue).
- Burghauser (Dvořák catalogue).
- Reich, Nancy B., *Clara Schumann: The Artist and the Woman* (Cornell University Press, 1985).
- Newman, Barbara, *Sister of Wisdom: St. Hildegard's Theology of the Feminine* (University of California Press, 1987).
- Shankar, Ravi, *My Music, My Life* (Simon & Schuster, 1968).
- Standard German musicological reference works for DE label variants (*Brandenburgische Konzerte*, *Klarinettenkonzert*, *Nussknacker*, etc.).

---

## 4. Dispute contact

If you believe an entry in this pack is wrong, misleading, or pedagogically inappropriate, please reach out. Corrections are reviewed and, where accepted, recorded in this document with an updated `endorsement_marker`.

**Contact:** Please open an issue in the project repository at `https://github.com/threehouse-plus-ec/triple-memory/issues`.

---

## 5. Endorsement Marker history

| Marker | Date | Notes |
|--------|------|-------|
| `music_pack_v0.1_draft` | 2026-04-24 | Initial draft. 20 composers, 20 letter groups, 5-entry DE / native_display / facts pilot (Bach, Mozart, Beethoven, Tchaikovsky, Ravi Shankar). Single-operator; TC-70-style cross-check not yet run. |

---

## 6. Known limitations

- Twenty composers cannot span the canon. Instrument distribution is piano-heavy (5 of 20) even after deliberate effort to spread featured instruments across the canonical works.
- "Canonical work" is editorial; reasonable alternatives exist for every entry and are not logged in the pack.
- The pack does not attempt to represent jazz, non-Hindustani world-music traditions, or living composers.
- Translation and native-script coverage is a 5-entry pilot. Cyrillic is given only via Tchaikovsky; Bengali and Devanagari only via Ravi Shankar. No right-to-left scripts, no CJK, no Arabic.
- Composer facts use simplified biographical framing and may smooth over scholarly disputes (e.g. the precise authorship of *Ordo Virtutum*, date of Hildegard's composition activity).
- All content is single-operator and pending the TASK_CARDS v1.0 §2 two-person cross-check protocol.
