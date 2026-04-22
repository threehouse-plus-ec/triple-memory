# Geography Pack Blueprint — Triple Memory

**Version:** 0.4 (Geography Pack)
**Date:** 2026-04-22
**Status:** Draft — split from v0.3 monolithic blueprint
**Predecessor:** Blueprint v0.3 (2026-04-22, monolithic)
**Companion document:** Engine Blueprint v0.4
**Language:** English (Oxford British standard)
**Scope:** First content pack for the Triple Memory engine — geography domain
**Endorsement Marker:** geography_pack_v0.4

---

## 0. Changelog from v0.3

v0.4 extracts the geography-specific content of the v0.3 monolithic blueprint into this pack document, leaving the Engine Blueprint to cover domain-agnostic rules. All v0.3 items retained here:

- River, capital, and country-inclusion policies (v0.3 §7 / §7a / §7b).
- Romanisation rule as it applies to place names (v0.3 §6.3).
- Letter Mode curation filters — familiarity floor, false-pattern prevention (v0.3 §9.2).
- Starter data examples (v0.3 §19).
- Geography-specific risks (v0.3 §14.4 political recognition, §14.5 script and romanisation).
- Curation Statement requirements for geography (v0.3 §18).

New in v0.4:

- **§2** Pack manifest declaration — how this pack identifies itself to the engine.
- **§4** Pack schema extensions — fields specific to geography.
- **§9** Label variants — multilingual schema support for EN / DE / local; content deferred to a pilot subset at MVP.
- **§10** Facts — schema support; content deferred to Phase 2 with optional pilot entries.
- **§13** Pack-level MVP split following Engine §22 pattern.

---

## 1. Pack Overview

The Geography Pack implements the engine's three-card triple with:

- **Capital** (city) — the canonical capital of a country.
- **Country** — the country itself.
- **River** — a designated canonical river associated with the country.

Example triple: Vienna · Austria · Danube.

The pack supports both engine modes:

- **Shared Entity Mode** (concretely: Same Country Mode) — three cards share a `country_id`.
- **Shared Letter Mode** — three cards share an initial letter, covering one capital, one country, one river each.

---

## 2. Pack Manifest

The pack's `manifest.json` declaration:

```json
{
  "pack_id": "geography",
  "pack_name": "Geography — Capitals, Countries, Rivers",
  "pack_version": "0.4",
  "endorsement_marker": "geography_pack_v0.4",
  "card_types": [
    {
      "type_id": "capital",
      "display_name": "Capital",
      "icon": "icons/capital.svg",
      "aria_label_template": "Capital: {label}"
    },
    {
      "type_id": "country",
      "display_name": "Country",
      "icon": "icons/country.svg",
      "aria_label_template": "Country: {label}"
    },
    {
      "type_id": "river",
      "display_name": "River",
      "icon": "icons/river.svg",
      "aria_label_template": "River: {label}"
    }
  ],
  "shared_entity_field": "country_id",
  "supported_modes": ["shared_entity", "shared_letter"],
  "supported_locales": ["en", "de"],
  "primary_locale": "en",
  "supported_board_sizes": [12, 18, 24],
  "curation_statement_path": "CURATION_STATEMENT.md",
  "accessibility_declaration": {
    "icons_shape_distinct": true,
    "icons_colour_independent": true
  }
}
```

---

## 3. Icons

Three icons are provided, one per card type. Accessibility constraints from Engine §18 apply:

- **Capital:** a simple building silhouette (monochrome, shape-distinct).
- **Country:** a simple outline / map-region mark (monochrome, shape-distinct).
- **River:** a wavy line or current stroke (monochrome, shape-distinct).

MVP may use emoji placeholders (🏛️ 🗺️ 🌊) for prototyping, but production assets are custom monochrome SVG. Each icon is independently legible in greyscale and at 16px minimum. The manifest's `accessibility_declaration` records compliance.

---

## 4. Pack Schema — Entity

Extends the engine entity schema (Engine §8.1) with geography-specific fields.

```json
{
  "entity_id": "AUT",
  "country_id": "AUT",
  "entity_name": "Austria",
  "capital_name": "Vienna",
  "alternative_capitals": [],
  "river_name": "Danube",
  "shared_river_flag": true,
  "shared_river_countries": ["DEU", "SVK", "HUN", "HRV", "SRB", "ROU", "BGR", "MDA", "UKR"],
  "selection_reason": "major_historic",
  "capital_selection_reason": "sole_official",
  "provenance": "UN member list; CIA World Factbook 2025",
  "recognition_status": "un_member",
  "difficulty": 1,
  "region": "Europe",
  "label_variants": {
    "country": { "en": "Austria", "de": "Österreich", "local_display": "Österreich" },
    "capital": { "en": "Vienna", "de": "Wien", "local_display": "Wien" },
    "river": { "en": "Danube", "de": "Donau", "local_display": "Donau" }
  },
  "facts": {
    "country": ["Central European country", "EU member since 1995", "Official language: German"],
    "capital": ["Austria's largest city", "On the Danube", "Cultural capital of the former Habsburg empire"],
    "river": ["Approx. 2,850 km", "Flows through 10 countries", "Empties into the Black Sea"]
  },
  "endorsement_marker": "geography_pack_v0.4",
  "is_active": true
}
```

**Pack-specific fields beyond the engine:**

- `country_id` — aliases `entity_id`; both are the ISO-3166 alpha-3 code for MVP.
- `capital_name`, `river_name` — canonical labels at the primary locale.
- `alternative_capitals` — empty list, or documented non-canonical capitals.
- `shared_river_flag`, `shared_river_countries` — transboundary river metadata.
- `selection_reason` — why this river was chosen (§5).
- `capital_selection_reason` — why this capital was chosen for contested cases (§6).
- `provenance` — source citation; may be brief at MVP.
- `recognition_status` — political recognition tier (§7).
- `region` — coarse geographic region.
- `label_variants` — per-entity-component locale map (§9). May be empty at MVP for all but a pilot subset.
- `facts` — per-entity-component fact arrays (§10). Empty at MVP for most entries.

---

## 5. River Selection Policy

Each entry must include a canonical `river_name`, a `selection_reason`, a `shared_river_flag`, `provenance`, and an `endorsement_marker`.

**Permitted `selection_reason` values:**

- `longest_in_country`
- `largest_basin`
- `capital_region`
- `major_historic`
- `iconic`
- `cross_border_reference`
- `none`

**Canonical Rule:**

> The pack uses one canonical river per country as a gameplay convention. This is a curation choice, not a geographic law. For countries with multiple plausible rivers, the canonical choice is documented in the Curation Statement with a brief justification.

Example decision recorded in the Curation Statement: **France — Loire selected over Seine** because the Loire is the longest river fully within France and is `major_historic`. The Seine, more Paris-associated, is recorded as `alternative_river: "Seine"` in the Statement.

## 6. Capital Selection Policy

For countries with more than one capital (South Africa, Netherlands, Bolivia, Eswatini) or contested capitals:

- a canonical `capital_name`,
- an `alternative_capitals` list,
- a `capital_selection_reason` from: `sole_official`, `executive`, `legislative`, `judicial`, `historic`, `de_facto`, `contested_documented`.

Worked examples belong in the Curation Statement. MVP Phase 1 may avoid the most contested cases (Israel/Palestine) entirely; these enter only with an explicit Curation Statement note and a pedagogical rationale.

## 7. Country Inclusion and Recognition Policy

Including or omitting a polity is a political act. Each entry carries:

**`recognition_status`** values:

- `un_member`
- `un_observer`
- `widely_recognised`
- `limited_recognition`
- `dependency`

**MVP restriction:** only `un_member` entries. Broader tiers enter in Phase 2 via teacher opt-in with a disclaimer surface.

---

## 8. Romanisation Rule (for place names)

For MVP, all card `label` fields are stored and displayed in their conventional English-language Latin-script form. The `initial_letter` derives from this displayed Latin label.

`romanisation_source` values on `cards.json` entries: `native_latin`, `standard_english`, `bgn_pcgn`, `pinyin`, `revised_romanisation`, `iso_9`. MVP default: `standard_english`.

Non-Latin scripts (Cyrillic, CJK, Arabic, Devanagari, etc.) are supported in `label_variants` (§9) but are not used for gameplay matching at MVP.

A future script-switching toggle would require re-defining `initial_letter` per script and is deferred.

---

## 9. Label Variants (multilingual)

### 9.1 Structure

Each entity carries optional `label_variants` keyed by entity component (country / capital / river) and by locale:

```json
"label_variants": {
  "country":  { "en": "Austria", "de": "Österreich", "local_display": "Österreich" },
  "capital":  { "en": "Vienna",  "de": "Wien",       "local_display": "Wien" },
  "river":    { "en": "Danube",  "de": "Donau",      "local_display": "Donau" }
}
```

Cards derive `label` from the primary locale and may surface variants in Tutorial Mode (Engine §15) and Post-Match Reveal (Engine §16) if present.

### 9.2 "Local" definition (gameplay convention)

The `local_display` field is a **gameplay convention**, not a complete linguistic representation:

> For MVP, `local_display` is the most widely used official local form of the entity's name, rendered in the script the engine currently supports (Latin at MVP). For multilingual states (Switzerland, India, South Africa, Belgium), the Curation Statement documents which language was selected and why.

**Optional companion fields** (schema-reserved, content deferred):

- `local_script` — the native-script form (e.g., `"日本"` for Japan).
- `local_romanised` — a romanised rendering if different from `en` (e.g., `"Nippon"`).
- `language_note` — a short explanation of the choice for multilingual states.

### 9.3 MVP coverage

- **English primary** for all 20 Phase 1 entries.
- **German (`de`)** on a pilot subset (5–8 entries selected for pedagogical impact: countries where the German form differs meaningfully from English, e.g., Austria/Österreich, Belgium/Belgien, Italy/Italien).
- **`local_display`** on the same pilot subset where the local form differs from English.
- Other locales deferred to Phase 2.

This keeps MVP translation workload modest (≈5–8 trilingual entries, not 20) while proving the schema.

---

## 10. Facts

### 10.1 Structure

Each entity carries optional `facts` keyed by entity component:

```json
"facts": {
  "country": ["Central European country", "EU member", "Official language: German"],
  "capital": ["Largest city in the country", "On the Danube", "Political and cultural centre"],
  "river":   ["~2,850 km", "Ends in the Black Sea", "Crosses 10 countries"]
}
```

### 10.2 Fact quality criteria

Facts in this pack must be:

- **Structured, not decorative** — region, EU membership status, length, source, mouth region, shared-river count, and similar parameterised claims.
- **Short** — each fact under ~80 characters.
- **Stable** — facts that change rapidly (prime ministers, populations) are avoided.
- **Pedagogically useful** — each fact teaches something a school-atlas-level learner might not already know.
- **Number** — 1–3 facts per entity component, not a fixed three.

### 10.3 MVP coverage

- **Empty or 1-fact `facts`** acceptable for most Phase 1 entries.
- **Full 3-fact `facts`** on a pilot subset of 3–5 entries for Tutorial Mode demonstration.
- **Full coverage** deferred to Phase 2.

This prevents the Phase 1 curation workload from scaling to 180+ facts at launch.

---

## 11. Same Letter Mode Curation (this pack)

### 11.1 Curation filter protocol

A letter group is accepted into the Phase 1 pool only if it meets:

- **Familiarity floor** — each of the three labels is present in a reference list of commonly taught geographic names (school-atlas level).
- **Type coverage** — exactly one capital, one country, one river (engine-enforced at load).
- **No false-pattern trap** — the group must not appear to form a geographic pattern it does not. *Berlin · Bavaria · Bodensee* would be rejected because all three are German, inviting a geographic read of what is meant to be a purely lexical triple.

**Deferred to Phase 2 (per v0.3 softening):** cross-continental balance cap. If playtest shows uncapped cross-continental spread causes player confusion, Phase 2 may reintroduce a cap.

### 11.2 Letter group schema

```json
{
  "letter_group_id": "P_01",
  "initial_letter": "P",
  "cards": [
    { "card_type": "capital", "label": "Prague",   "country_id": "CZE" },
    { "card_type": "country", "label": "Portugal", "country_id": "PRT" },
    { "card_type": "river",   "label": "Po",       "country_id": "ITA" }
  ],
  "difficulty": 1,
  "endorsement_marker": "geography_pack_v0.4",
  "is_active": true
}
```

---

## 12. Dataset Strategy

### 12.1 Phase 1 — Manual Curated Core

- 20 curated country triples (Shared Entity Mode).
- 20 curated letter groups (Shared Letter Mode).
- All entries UN-member states.
- 5–8 entries carry full `label_variants` for EN/DE/local.
- 3–5 entries carry full `facts` (for Tutorial Mode demonstration).
- Each entry validated against §5 / §6 / §7.

### 12.2 Phase 2 — Expanded Database

- Expand country coverage.
- Refine letter balance; evaluate cross-continental cap based on playtest.
- Introduce multiple difficulty levels at scale.
- Extend `label_variants` coverage (DE and `local_display` on all entries).
- Extend `facts` coverage to all entries.
- Optional: enable `widely_recognised` recognition tier via teacher toggle.

### 12.3 Phase 3 — Full Library

- Global deck.
- Regional decks.
- Children's deck / expert deck variants.
- Language switching beyond EN/DE (triggers Engine §8.2 romanisation revision).

### 12.4 Phase Gates

Progression between phases requires:

- every entry has non-empty `provenance`,
- every entry has an `endorsement_marker`,
- the Curation Statement has been updated,
- at least one playtest session with the target audience logged.

---

## 13. Pack MVP Scope

### 13.1 MVP-required (pack)

- 20 entity entries, UN-member only.
- 20 letter groups, passing §11.1 filters.
- Three card-type icons, accessibility-compliant.
- Pack manifest with `accessibility_declaration`.
- Curation Statement (partial acceptable; minimum requirements below).
- EN labels for all entries.
- DE + `local_display` for 5–8 pilot entries.
- 1–3 facts for 3–5 pilot entries.
- Contact line in engine README linking to pack Curation Statement.

### 13.2 Curation Statement — MVP minimum

- Preamble paragraph on gameplay-canon vs. geographic-fact distinction.
- At least three worked non-trivial examples: one river choice (e.g., France — Loire over Seine), one capital choice (e.g., Netherlands — Amsterdam de jure / The Hague de facto), one inclusion / recognition note (e.g., why only `un_member` at MVP).
- Provenance source list (may be brief).
- Current `endorsement_marker` version and date.
- Dispute contact.

### 13.3 Phase-2-valuable

- Full `label_variants` coverage.
- Full `facts` coverage.
- Formal `DISPUTES.md` document.
- Expanded recognition tier opt-in.
- Pack-specific settings (preferred locale, reveal depth).
- Regional sub-packs (Europe-only, Africa-only, etc.).

### 13.4 Out of pack MVP

- Non-Latin script support.
- Contested polities beyond `un_member`.
- Fully contested capital cases (Israel/Palestine resolution).
- Historical packs (pre-1945 geography).

---

## 14. Pack-Specific Risks

### 14.1 Political recognition

Encoded in `recognition_status`; MVP restricts to `un_member`. Guardian-held.

### 14.2 Contested capitals

Netherlands, Bolivia, South Africa, Israel. MVP may avoid the most contested. Documented cases recorded in the Curation Statement.

### 14.3 Transboundary rivers

Danube (10 countries), Nile, Rhine, Mekong. Assigning one to Country X encodes a perspective. Mitigation: `shared_river_flag` and `shared_river_countries` make the transboundary nature explicit in the data; Curation Statement documents the choice.

### 14.4 Romanisation and script

Addressed by §8. Latin-script MVP; non-Latin deferred.

### 14.5 Translation validity

DE variants must be accurate; errors in translation damage trust. Mitigation: DE variants on the pilot subset only at MVP; each DE variant checked against a reputable reference (Duden, standard German atlases). Corrections accepted via dispute channel.

### 14.6 Ambiguous labels

"Jordan" (country and river), "Mexico" (country and capital region), "Congo" (country and river). Mitigation: visible `card_type` in default mode (Engine §17); labels disambiguated in data where helpful ("Jordan River" for the river card).

### 14.7 Pedagogical load from facts

Three facts per card on 20 entries is 180 fact items. Mitigation: MVP pilots 3–5 entries only. Phase 2 scales up.

---

## 15. Starter Data — Worked Examples

### 15.1 Full trilingual + facts example (pilot entry)

```json
{
  "entity_id": "AUT",
  "country_id": "AUT",
  "entity_name": "Austria",
  "capital_name": "Vienna",
  "alternative_capitals": [],
  "river_name": "Danube",
  "shared_river_flag": true,
  "shared_river_countries": ["DEU", "SVK", "HUN", "HRV", "SRB", "ROU", "BGR", "MDA", "UKR"],
  "selection_reason": "major_historic",
  "capital_selection_reason": "sole_official",
  "provenance": "UN member list; Europa atlas",
  "recognition_status": "un_member",
  "difficulty": 1,
  "region": "Europe",
  "label_variants": {
    "country":  { "en": "Austria", "de": "Österreich", "local_display": "Österreich" },
    "capital":  { "en": "Vienna",  "de": "Wien",       "local_display": "Wien" },
    "river":    { "en": "Danube",  "de": "Donau",      "local_display": "Donau" }
  },
  "facts": {
    "country": ["Central European country", "EU member since 1995", "Official language: German"],
    "capital": ["Austria's largest city", "On the Danube", "Cultural capital of the former Habsburg empire"],
    "river":   ["Approx. 2,850 km", "Flows through 10 countries", "Empties into the Black Sea"]
  },
  "endorsement_marker": "geography_pack_v0.4",
  "is_active": true
}
```

### 15.2 Minimal entry (non-pilot, Phase 1)

```json
{
  "entity_id": "FRA",
  "country_id": "FRA",
  "entity_name": "France",
  "capital_name": "Paris",
  "alternative_capitals": [],
  "river_name": "Loire",
  "shared_river_flag": false,
  "shared_river_countries": [],
  "selection_reason": "major_historic",
  "capital_selection_reason": "sole_official",
  "provenance": "UN member; Loire documented in Curation Statement",
  "recognition_status": "un_member",
  "difficulty": 1,
  "region": "Europe",
  "label_variants": {},
  "facts": {},
  "endorsement_marker": "geography_pack_v0.4",
  "is_active": true
}
```

**Note:** the Seine is geographically more Paris-associated than the Loire. The Loire is chosen as the longest river fully within France. The Curation Statement records this choice with the Seine as the documented alternative.

### 15.3 Letter group example

```json
{
  "letter_group_id": "P_01",
  "initial_letter": "P",
  "cards": [
    { "card_type": "capital", "label": "Prague",   "country_id": "CZE" },
    { "card_type": "country", "label": "Portugal", "country_id": "PRT" },
    { "card_type": "river",   "label": "Po",       "country_id": "ITA" }
  ],
  "difficulty": 1,
  "endorsement_marker": "geography_pack_v0.4",
  "is_active": true
}
```

---

## 16. Pack File Structure

Within the engine tree (Engine §23):

```
packs/geography/
├── manifest.json
├── entities.json             (the country-level records)
├── cards.json                (card-level records derived from entities)
├── letter_groups.json        (curated letter triples)
├── icons/
│   ├── capital.svg
│   ├── country.svg
│   └── river.svg
└── CURATION_STATEMENT.md
```

---

## 17. Recommended Next Steps (pack)

1. Draft `manifest.json` per §2.
2. Draft `entities.json` — 20 UN-member entries.
3. Pick the 5–8 DE/local pilot entries (Austria, Germany, Belgium, Netherlands, Italy, Spain, and two others to be decided) — full `label_variants`.
4. Pick the 3–5 facts pilot entries (Austria, Egypt, France, Japan, and one other) — full `facts`.
5. Derive `cards.json` from the entities (one capital, one country, one river card per entity; mode_tags set per §11 letter-group membership).
6. Draft `letter_groups.json` — 20 groups per §11.1 filters.
7. Draft pack Curation Statement (preamble + three worked examples + provenance + dispute contact).
8. Commission or draft the three SVG icons per §3.
9. Validate the whole pack against Engine §8 / §10 interface.
10. Playtest with the engine; log board-level letter collisions per Engine §9.2.

---

## 18. Short Position

The Geography Pack holds the domain-specific weight — rivers, capitals, recognition, language variants, facts — that v0.3 let leak into the engine. Extracting it here makes the engine portable and the pack honest.

MVP scale is deliberately restrained. Twenty entries, five DE pilots, three or four fact pilots, three custom icons, one partial Curation Statement. Phase 2 expands all of these. The philosophy is the one inherited from v0.3: *governance serves play*. Curation exists at MVP in enough depth to be honest, but not in so much depth that it delays the first playable build.

The reviewer principle that sits at the centre of v0.4:

> Rich information belongs to moments of certainty (Tutorial Mode and successful matches), not moments of uncertainty (card selection).

The pack's label variants and facts surface through the engine's tutorial and post-match reveal — never on the playing surface itself.

---

**Endorsement:** Geography Pack v0.4, 2026-04-22. Internal curation. First content pack for the Triple Memory engine.
