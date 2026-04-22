# External Review — Icons, Multilingual Names, Three Facts

**Source:** External reviewer (non-Council).
**Received:** 2026-04-22
**Subject:** Brainstorming additions after v0.3 — icons, trilingual labels, facts per entity
**Archived for:** deliberation history

---

## Reviewer's position

That can make the game much richer, but only if it is layered carefully. My view is:

- **Icons:** yes, strongly.
- **Three languages:** yes, but not all visible at once by default.
- **Three facts per category:** yes in principle, but not on the main card face.

## 1. Icons for country, city, river

This is a very good addition. It reinforces the educational transparency already established in v0.2 and reduces avoidable confusion.

I would keep the icon system extremely simple and stable:

- Country: 🗺️ or a small globe/map outline
- Capital / city: 🏛️ or a small skyline / building
- River: 🌊 or a simple wavy line

My preference would be not emoji as the final design, but custom monochrome icons in the same visual style. Emoji are useful as placeholders in prototypes, but they vary across systems and can look childish or inconsistent.

**Design criteria:** recognisable at small size, distinct in silhouette, understandable without colour, compatible with accessibility constraints.

## 2. English, German, and native language

Pedagogically excellent because it introduces exonyms and endonyms, multilingual awareness, and more authentic geographic naming. But in interface terms it can become cluttered very quickly.

**Recommendation: hierarchical display, not simultaneous full display by default.**

**Default card face:**
- main label in the active interface language
- small icon for category

**Expanded / revealed info panel:**
- English name
- German name
- native name

**Examples:**

- Country card: *Japan* → English: Japan / German: Japan / Native: 日本 / Nihon or Nippon
- Capital card: *Vienna* → English: Vienna / German: Wien / Native: Wien

### Structural issue

Define what "native language" means. That is not trivial:

- Switzerland has several official languages.
- India has many major languages.
- South Africa has many official languages.
- Belgium is multilingual.
- Some capitals have local forms and international forms.

Do not use the field name `native_language_name`. Better: `name_en`, `name_de`, `name_local_display`, `name_local_script`, `name_local_romanised`, `language_note`.

In the curation policy:

> For MVP, `name_local_display` is the most widely used official local form associated with the entity, documented as a gameplay convention rather than a complete linguistic representation.

## 3. Three representative facts for each category

Ambitious, but only if you separate gameplay from knowledge layer.

If each card carries three facts directly on its face, the board will become visually unusable. It will also dilute the memory gameplay.

**Not on the main card face.** Use one of these layers:

- a side panel after reveal,
- a tooltip / info popup,
- an end-of-round "learn more" panel,
- a quiz or tutorial extension,
- a "collection book" mode.

## 4. What kind of facts?

**For countries:** continent / region, population class or size, one characteristic identifier (currency, flag note, or official language family).

Example: Region: East Asia / Capital: Tokyo / Currency: Yen

**For capitals / cities:** population rank in country, river / coast / elevation context, administrative role.

Example: Capital of Austria / On the Danube / Largest city in the country

**For rivers:** approximate length, source / mouth region, countries crossed.

Example: Length: about 2,850 km / Flows into the Black Sea / Crosses 10 countries

That is much better than three arbitrary trivia facts. Facts should be structured, not decorative.

## 5. New data complexity

Schema should be explicitly layered:

- **Entity layer** — reference object.
- **Card layer** — playable representation.
- **Knowledge layer** — multilingual names and fact blocks.

Example:

```json
{
  "country_id": "AUT",
  "names": {
    "en": "Austria",
    "de": "Österreich",
    "local_display": "Österreich"
  },
  "capital": {
    "en": "Vienna",
    "de": "Wien",
    "local_display": "Wien"
  },
  "river": {
    "en": "Danube",
    "de": "Donau",
    "local_display": "Donau"
  },
  "facts": {
    "country": [
      "Central European country",
      "Member of the European Union",
      "Official language: German"
    ],
    "capital": [
      "Largest city in Austria",
      "Located on the Danube",
      "Political and cultural centre"
    ],
    "river": [
      "Flows through multiple European countries",
      "Empties into the Black Sea",
      "One of Europe's major rivers"
    ]
  }
}
```

## 6. Critical caution: factual maintenance burden

The main downside. As soon as you add facts, especially multilingual ones, the curation workload rises sharply: translations must be checked, local naming conventions chosen, facts must stay simple but correct, some facts change over time, some facts are contested or depend on phrasing.

**Staged rollout:**

- **Phase 1:** icons, English and German names, one local name field, no facts on cards, optional fact panel only for a few pilot entries.
- **Phase 2:** three structured facts per country triple, shown only in an info panel or tutorial layer.
- **Phase 3:** multilingual toggle, collection / encyclopedia mode, maybe quiz mode based on facts.

## 7. Best pedagogical use

The richest use of the fact layer is probably not during ordinary play, but: in tutorial mode, after a successful match, in a "learn this triple" panel, in classroom mode.

That way the player gets a reward: "You found the triple — now learn a little more about it." Facts become a payoff, not a distraction.

## 8. Recommendation

- **Icons:** definitely add them.
- **English/German/native names:** add them, but keep only one primary visible on the board.
- **Three facts:** add them as a secondary information layer, not as main gameplay text.

A concise design principle:

> The board should optimise recognition; the info panel should optimise learning.
