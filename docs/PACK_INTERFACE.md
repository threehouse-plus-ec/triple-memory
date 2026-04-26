# Pack Interface — JSON Schema Specifications

**Status:** Drafted per Task Card TC-01. Reflects the live multi-pack contract implemented by [`engine/validator.js`](../engine/validator.js) and [`engine/app.js`](../engine/app.js).

This document contains JSON Schema (draft-07) definitions for the engine-level pack data interfaces. The schemas are deliberately pack-agnostic: `card_type` values are strings whose membership is validated at runtime against the active pack's `manifest.card_types[*].type_id` list rather than a hardcoded enum, and letter-group cards accept either the engine-level `entity_id` field or the legacy `country_id` alias that the geography pack was originally authored against.

Pack-specific fields (for example, geography's `country_id` / `capital_name` / `river_name` / `recognition_status` on entities) are shown here as **optional extensions** on top of the engine-level required set. A pack-specific validation layer may make them required for its own domain, but the engine will accept any pack whose JSON conforms to the engine-level schema below.

## 1. `manifest.json` (Engine §8.4, Pack §2)

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Pack Manifest Schema",
  "type": "object",
  "required": [
    "pack_id", "pack_name", "pack_version", "endorsement_marker",
    "card_types", "shared_entity_field", "supported_modes",
    "supported_locales", "primary_locale", "supported_board_sizes",
    "curation_statement_path", "accessibility_declaration"
  ],
  "properties": {
    "pack_id": { "type": "string" },
    "pack_name": { "type": "string" },
    "pack_version": { "type": "string" },
    "endorsement_marker": { "type": "string" },
    "card_types": {
      "type": "array",
      "minItems": 3,
      "maxItems": 3,
      "items": {
        "type": "object",
        "required": ["type_id", "display_name", "icon", "aria_label_template"],
        "properties": {
          "type_id": { "type": "string", "description": "Pack-defined card-type identifier. Must be unique within the pack. Referenced by cards.json.card_type and letter_groups.json.cards[*].card_type." },
          "display_name": { "type": "string" },
          "display_names": {
            "type": "object",
            "additionalProperties": { "type": "string" }
          },
          "icon": { "type": "string" },
          "aria_label_template": { "type": "string" },
          "aria_label_templates": {
            "type": "object",
            "additionalProperties": { "type": "string" }
          }
        }
      }
    },
    "shared_entity_field": { "type": "string" },
    "supported_modes": {
      "type": "array",
      "items": { "type": "string", "enum": ["shared_entity", "shared_letter"] }
    },
    "supported_locales": { "type": "array", "items": { "type": "string" } },
    "primary_locale": { "type": "string" },
    "supported_board_sizes": {
      "type": "array",
      "items": { "type": "integer", "enum": [12, 18, 24] }
    },
    "curation_statement_path": { "type": "string" },
    "accessibility_declaration": {
      "type": "object",
      "required": ["icons_shape_distinct", "icons_colour_independent"],
      "properties": {
        "icons_shape_distinct": { "type": "boolean" },
        "icons_colour_independent": { "type": "boolean" }
      }
    }
  }
}
```

## 2. `entities.json` (Engine §8.1, Pack §4)

### 2.1 Engine-level schema (all packs)

The engine validator enforces only the fields in the `required` list below ([`engine/validator.js:71`](../engine/validator.js#L71)). Anything else is a pack-specific extension and is validated (if at all) by the pack's own tooling.

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Entities Schema (engine-level)",
  "type": "array",
  "items": {
    "type": "object",
    "required": [
      "entity_id", "entity_name", "difficulty", "is_active", "endorsement_marker"
    ],
    "properties": {
      "entity_id": { "type": "string" },
      "entity_name": { "type": "string" },
      "difficulty": { "type": "integer", "minimum": 1, "maximum": 4 },
      "is_active": { "type": "boolean" },
      "endorsement_marker": { "type": "string" },
      "label_variants": {
        "type": "object",
        "description": "Per-card-type label map. Keys are card_type IDs defined in manifest.json; each value is an object with locale codes ('en', 'de', ...), 'local_display' (Latin-script official local form), and optional 'native_display' (native-script form, e.g. Arabic, Han, Devanagari). A 'language_note' key at the top level of label_variants documents multilingual or contested cases."
      },
      "facts": { "type": "object" }
    }
  }
}
```

### 2.2 Geography extensions (example)

The geography pack adds the following optional properties on top of the engine-level schema. The validator checks their enum membership only when the field is present; it does not require them.

```json
{
  "properties": {
    "country_id": { "type": "string", "description": "ISO 3166-1 alpha-3 country code. Typically equal to entity_id in this pack." },
    "capital_name": { "type": "string" },
    "alternative_capitals": { "type": "array", "items": { "type": "string" } },
    "river_name": { "type": "string" },
    "shared_river_flag": { "type": "boolean" },
    "shared_river_countries": { "type": "array", "items": { "type": "string" } },
    "selection_reason": {
      "type": "string",
      "enum": [
        "longest_in_country", "largest_basin", "capital_region",
        "major_historic", "iconic", "cross_border_reference", "none"
      ]
    },
    "capital_selection_reason": {
      "type": "string",
      "enum": [
        "sole_official", "executive", "legislative", "judicial",
        "historic", "de_facto", "contested_documented"
      ]
    },
    "provenance": { "type": "string" },
    "recognition_status": {
      "type": "string",
      "enum": ["un_member", "un_observer", "widely_recognised", "limited_recognition", "dependency"]
    },
    "region": { "type": "string" }
  }
}
```

### 2.3 Chemistry extensions (example)

The chemistry pack uses a narrower set of domain fields: `element_symbol`, `group_name`, `atomic_number`, `provenance`. These are informational only at the engine level.

## 3. `cards.json` (Engine §8.2)

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Cards Schema",
  "type": "array",
  "items": {
    "type": "object",
    "required": [
      "card_id", "entity_id", "card_type", "label", "label_script",
      "initial_letter", "romanisation_source", "mode_tags"
    ],
    "properties": {
      "card_id": { "type": "string" },
      "entity_id": { "type": "string" },
      "card_type": { "type": "string", "description": "Must match one of the type_id values declared in manifest.card_types. Validated at runtime." },
      "label": { "type": "string" },
      "label_script": { "type": "string", "enum": ["latin"] },
      "initial_letter": { "type": "string", "maxLength": 1 },
      "romanisation_source": { "type": "string" },
      "mode_tags": {
        "type": "array",
        "items": { "type": "string", "enum": ["shared_entity", "shared_letter"] }
      },
      "diagram": {
        "type": "string",
        "description": "Optional. Pack-relative path to an SVG file (e.g. 'diagrams/square.svg') that the engine inlines as the card's main visible content, in place of the text label. Used by visuospatial packs (geometry, coordinates) where the diagram, not the label, carries the recognition load. When set, the engine uses a generic aria-label so screen-reader play does not reveal the entity; such packs should declare the limitation in their accessibility_declaration."
      }
    }
  }
}
```

## 4. `letter_groups.json` (Engine §8.3, Pack §11.2)

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Letter Groups Schema",
  "type": "array",
  "items": {
    "type": "object",
    "required": [
      "letter_group_id", "initial_letter", "cards", "difficulty",
      "endorsement_marker", "is_active"
    ],
    "properties": {
      "letter_group_id": { "type": "string" },
      "initial_letter": { "type": "string", "maxLength": 1 },
      "cards": {
        "type": "array",
        "minItems": 3,
        "maxItems": 3,
        "items": {
          "type": "object",
          "required": ["card_type", "label"],
          "description": "Each letter-group card must carry either the engine-level 'entity_id' field or the legacy geography-specific 'country_id' alias. The validator ([engine/validator.js:89](../engine/validator.js#L89)) accepts either. An 'entity_id' that is not present in entities.json is permitted: the engine synthesises a shared-letter card without entity metadata ([engine/app.js:463](../engine/app.js#L463)), so such off-roster references will not surface facts or label_variants in the overlay.",
          "properties": {
            "card_type": { "type": "string", "description": "Must match one of the type_id values declared in manifest.card_types." },
            "label": { "type": "string" },
            "entity_id": { "type": "string", "description": "Engine-level reference field. Preferred for new packs." },
            "country_id": { "type": "string", "description": "Legacy alias accepted for the geography pack only." }
          },
          "anyOf": [
            { "required": ["entity_id"] },
            { "required": ["country_id"] }
          ]
        }
      },
      "difficulty": { "type": "integer" },
      "endorsement_marker": { "type": "string" },
      "is_active": { "type": "boolean" }
    }
  }
}
```
