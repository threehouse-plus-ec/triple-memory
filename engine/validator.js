// Triple Memory - JSON Schema Validator Logic

class PackValidator {
    constructor() {
        this.errors = [];
    }

    validate(pack) {
        this.errors = [];
        this.validateManifest(pack.manifest);
        this.validateEntities(pack.entities);
        this.validateCards(pack.cards, pack.letterGroups);
        this.validateLetterGroups(pack.letterGroups);
        
        if (this.errors.length > 0) {
            const error = new Error("Schema validation failed. The pack data is invalid.");
            error.validationErrors = this.errors;
            throw error;
        }
        console.log("§10 Interface Check: Pack schema validation passed.");
        return true;
    }

    checkRequired(obj, fields, context) {
        if (!obj) return;
        fields.forEach(f => {
            if (obj[f] === undefined) this.errors.push(`[${context}] Missing required field: '${f}'`);
        });
    }

    checkEnum(val, allowed, context) {
        if (val !== undefined && !allowed.includes(val)) {
            this.errors.push(`[${context}] Invalid enum value '${val}'. Allowed: ${allowed.join(', ')}`);
        }
    }

    normaliseInitial(value) {
        return String(value || '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .trim()
            .charAt(0)
            .toUpperCase();
    }

    validateManifest(m) {
        if (!m) { this.errors.push("Missing manifest.json"); return; }
        this.checkRequired(m, ["pack_id", "pack_name", "pack_version", "endorsement_marker", "card_types", "shared_entity_field", "supported_modes", "supported_locales", "primary_locale", "supported_board_sizes", "curation_statement_path", "accessibility_declaration"], "manifest.json");
        
        if (Array.isArray(m.card_types)) {
            if (m.card_types.length !== 3) this.errors.push("[manifest.json] 'card_types' must contain exactly 3 items.");
            m.card_types.forEach((ct, i) => this.checkRequired(ct, ["type_id", "display_name", "icon", "aria_label_template"], `manifest.card_types[${i}]`));
        }
        if (Array.isArray(m.supported_board_sizes)) {
            m.supported_board_sizes.forEach(size => this.checkEnum(size, [12, 18, 24], "manifest.supported_board_sizes"));
        }
    }

    validateEntities(e) {
        if (!Array.isArray(e)) { this.errors.push("entities.json must be an array."); return; }
        e.forEach((ent, i) => {
            const ctx = `entities[${ent.entity_id || i}]`;
            this.checkRequired(ent, ["entity_id", "entity_name", "difficulty", "is_active", "endorsement_marker", "country_id", "capital_name", "alternative_capitals", "river_name", "shared_river_flag", "shared_river_countries", "selection_reason", "capital_selection_reason", "provenance", "recognition_status", "region"], ctx);
            if (ent.difficulty < 1 || ent.difficulty > 4) this.errors.push(`[${ctx}] 'difficulty' must be between 1 and 4.`);
            this.checkEnum(ent.selection_reason, ["longest_in_country", "largest_basin", "capital_region", "major_historic", "iconic", "cross_border_reference", "none"], `${ctx}.selection_reason`);
            this.checkEnum(ent.capital_selection_reason, ["sole_official", "executive", "legislative", "judicial", "historic", "de_facto", "contested_documented"], `${ctx}.capital_selection_reason`);
            this.checkEnum(ent.recognition_status, ["un_member", "un_observer", "widely_recognised", "limited_recognition", "dependency"], `${ctx}.recognition_status`);
        });
    }

    validateCards(c, letterGroups = []) {
        if (!Array.isArray(c)) { this.errors.push("cards.json must be an array."); return; }
        const sharedLetterCardKeys = new Set();
        if (Array.isArray(letterGroups)) {
            letterGroups.forEach(group => {
                if (!Array.isArray(group.cards)) return;
                group.cards.forEach(groupCard => {
                    sharedLetterCardKeys.add(`${groupCard.country_id}::${groupCard.card_type}::${groupCard.label}`);
                });
            });
        }

        c.forEach((card, i) => {
            const ctx = `cards[${card.card_id || i}]`;
            this.checkRequired(card, ["card_id", "entity_id", "card_type", "label", "label_script", "initial_letter", "romanisation_source", "mode_tags"], ctx);
            if (card.initial_letter && card.initial_letter.length > 1) this.errors.push(`[${ctx}] 'initial_letter' must be max 1 character.`);
            this.checkEnum(card.card_type, ["capital", "country", "river"], `${ctx}.card_type`);
            if (card.label && card.initial_letter && this.normaliseInitial(card.label) !== card.initial_letter.toUpperCase()) {
                this.errors.push(`[${ctx}] 'initial_letter' must match the displayed label.`);
            }
            if (Array.isArray(card.mode_tags)) {
                card.mode_tags.forEach(mode => this.checkEnum(mode, ["shared_entity", "shared_letter"], `${ctx}.mode_tags`));
            }

            const exactLetterMatch = `${card.entity_id}::${card.card_type}::${card.label}`;
            if (sharedLetterCardKeys.has(exactLetterMatch) && (!Array.isArray(card.mode_tags) || !card.mode_tags.includes('shared_letter'))) {
                this.errors.push(`[${ctx}] Cards used by letter_groups.json must include 'shared_letter' in 'mode_tags'.`);
            }
        });
    }

    validateLetterGroups(lg) {
        if (!Array.isArray(lg)) { this.errors.push("letter_groups.json must be an array."); return; }
        lg.forEach((g, i) => {
            const ctx = `letter_groups[${g.letter_group_id || i}]`;
            this.checkRequired(g, ["letter_group_id", "initial_letter", "cards", "difficulty", "endorsement_marker", "is_active"], ctx);
            if (Array.isArray(g.cards)) {
                if (g.cards.length !== 3) this.errors.push(`[${ctx}] 'cards' array must have exactly 3 items.`);
                const cardTypes = new Set(g.cards.map(groupCard => groupCard.card_type));
                if (cardTypes.size !== g.cards.length) {
                    this.errors.push(`[${ctx}] 'cards' must contain one item per card type.`);
                }
                g.cards.forEach((gc, ci) => {
                    this.checkRequired(gc, ["card_type", "label", "country_id"], `${ctx}.cards[${ci}]`);
                    this.checkEnum(gc.card_type, ["capital", "country", "river"], `${ctx}.cards[${ci}].card_type`);
                    if (gc.label && g.initial_letter && this.normaliseInitial(gc.label) !== g.initial_letter.toUpperCase()) {
                        this.errors.push(`[${ctx}.cards[${ci}]] 'label' must match the group's initial letter.`);
                    }
                });
            }
        });
    }
}
