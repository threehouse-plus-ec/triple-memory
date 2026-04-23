# Pack Interface — JSON Schema Specifications

**Status:** Drafted per Task Card TC-01. Ready for validation cross-check.

This document contains JSON Schema (draft-07) definitions for the engine and pack data interfaces. These schemas are designed to validate the Geography Pack v0.4 data sets.

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
          "type_id": { "type": "string", "enum": ["capital", "country", "river"] },
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

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Entities Schema (Geography Pack Extended)",
  "type": "array",
  "items": {
    "type": "object",
    "required": [
      "entity_id", "entity_name", "difficulty", "is_active", "endorsement_marker",
      "country_id", "capital_name", "alternative_capitals", "river_name",
      "shared_river_flag", "shared_river_countries", "selection_reason",
      "capital_selection_reason", "provenance", "recognition_status", "region"
    ],
    "properties": {
      "entity_id": { "type": "string" },
      "entity_name": { "type": "string" },
      "difficulty": { "type": "integer", "minimum": 1, "maximum": 4 },
      "is_active": { "type": "boolean" },
      "endorsement_marker": { "type": "string" },
      "country_id": { "type": "string" },
      "capital_name": { "type": "string" },
      "alternative_capitals": {
        "type": "array",
        "items": { "type": "string" }
      },
      "river_name": { "type": "string" },
      "shared_river_flag": { "type": "boolean" },
      "shared_river_countries": {
        "type": "array",
        "items": { "type": "string" }
      },
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
      "region": { "type": "string" },
      "label_variants": {
        "type": "object",
        "description": "Per-card-type label map. Keys are card_type IDs (country/capital/river for geography); each value is an object with locale codes ('en', 'de', ...), 'local_display' (Latin-script official local form), and optional 'native_display' (native-script form, e.g. Arabic, Han, Devanagari). A 'language_note' key at the top level of label_variants documents multilingual or contested cases."
      },
      "facts": { "type": "object" }
    }
  }
}
```

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
      "card_type": { "type": "string", "enum": ["capital", "country", "river"] },
      "label": { "type": "string" },
      "label_script": { "type": "string", "enum": ["latin"] },
      "initial_letter": { "type": "string", "maxLength": 1 },
      "romanisation_source": { "type": "string" },
      "mode_tags": {
        "type": "array",
        "items": { "type": "string", "enum": ["shared_entity", "shared_letter"] }
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
          "required": ["card_type", "label", "country_id"],
          "properties": {
            "card_type": { "type": "string", "enum": ["capital", "country", "river"] },
            "label": { "type": "string" },
            "country_id": { "type": "string" }
          }
        }
      },
      "difficulty": { "type": "integer" },
      "endorsement_marker": { "type": "string" },
      "is_active": { "type": "boolean" }
    }
  }
}
```
