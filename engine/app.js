// Triple Memory - Core Game Engine

class TripleMemoryEngine {
    constructor() {
        this.state = 'LOADING'; // States: LOADING, MENU, PLAYING, END
        this.pack = null;
        
        // Active game state
        this.currentMode = null;
        this.selectedBoardSize = 18; // Default preference
        this.currentLocale = 'en'; // Default locale
        this.expertMode = false; // Level 4 Difficulty (hides types)
        this.expertRevealEnabled = false; // Expert Mode can opt back into reveal overlays
        this.teacherView = false; // Exposes governance data
        this.boardSize = 18;
        this.boardCards = [];
        this.revealedCards = [];
        this.score = 0;
        this.isChecking = false; // Lock interactions during flip animations
        this.matchTimeout = null; // Timer for auto-dismissing the overlay
        
        this.isTutorial = false;
        this.tutorialStep = 0;
        this.tutorialMessage = "";
    }

    getAppRoot() {
        return document.getElementById('app') || document.body;
    }

    getCardTypeDefinition(cardType) {
        return this.pack.manifest.card_types.find(typeDef => typeDef.type_id === cardType) || null;
    }

    getCardTypeLabel(typeDef) {
        if (!typeDef) return '';
        if (typeDef.display_names && typeDef.display_names[this.currentLocale]) {
            return typeDef.display_names[this.currentLocale];
        }
        return typeDef.display_name;
    }

    getCardTypeAriaLabel(typeDef, cardLabel) {
        if (!typeDef) return cardLabel;
        const template = typeDef.aria_label_templates && typeDef.aria_label_templates[this.currentLocale]
            ? typeDef.aria_label_templates[this.currentLocale]
            : typeDef.aria_label_template;
        return template.replace('{label}', cardLabel);
    }

    formatList(items) {
        const conjunction = this.currentLocale === 'de' ? 'und' : 'and';
        if (items.length === 0) return '';
        if (items.length === 1) return items[0];
        if (items.length === 2) return `${items[0]} ${conjunction} ${items[1]}`;
        const serialComma = this.currentLocale === 'de' ? '' : ',';
        return `${items.slice(0, -1).join(', ')}${serialComma} ${conjunction} ${items[items.length - 1]}`;
    }

    getCardTypeRequirement(typeDef) {
        const localizedRequirements = {
            de: {
                capital: 'eine Hauptstadt',
                country: 'ein Land',
                river: 'ein Fluss'
            }
        };
        const requirement = localizedRequirements[this.currentLocale] &&
            localizedRequirements[this.currentLocale][typeDef.type_id];
        return requirement || `one ${this.getCardTypeLabel(typeDef)}`;
    }

    getRequiredTypePhrase() {
        const typeNames = this.pack.manifest.card_types.map(typeDef => this.getCardTypeRequirement(typeDef));
        return this.formatList(typeNames);
    }

    getLocaleName(locale) {
        const names = {
            en: 'English',
            de: 'Deutsch'
        };
        return names[locale] || locale.toUpperCase();
    }

    setLocale(locale) {
        this.currentLocale = locale;
        document.documentElement.lang = locale;
        this.render();
    }

    usesPrimaryLabelSet(card = null) {
        return this.currentMode === 'shared_letter' || Boolean(card && card.sourceLetterGroupId);
    }

    getCardEntity(card) {
        if (card.canUseEntityMetadata === false) return null;
        return this.pack.entities.find(entity => entity.entity_id === card.entity_id) || null;
    }

    getEntityCards(entityId) {
        return this.pack.cards.filter(card => card.entity_id === entityId);
    }

    getActiveEntities() {
        return this.pack.entities.filter(entity => entity.is_active);
    }

    getActiveLetterGroups() {
        return this.pack.letterGroups.filter(group => group.is_active);
    }

    getTutorialEntities(count) {
        const completeEntities = this.getActiveEntities().filter(entity => {
            const typeCount = new Set(this.getEntityCards(entity.entity_id).map(card => card.card_type)).size;
            return typeCount === this.pack.manifest.card_types.length;
        });
        const easyEntities = completeEntities.filter(entity => entity.difficulty === 1);
        const pool = easyEntities.length >= count ? easyEntities : completeEntities;
        return pool.slice(0, count);
    }

    getTutorialLetterGroups(count) {
        const easyGroups = this.getActiveLetterGroups().filter(group => group.difficulty === 1);
        const pool = easyGroups.length >= count ? easyGroups : this.getActiveLetterGroups();
        return pool.slice(0, count);
    }

    buildSharedLetterCard(group, groupCard, index) {
        const canonicalCard = this.pack.cards.find(card =>
            card.entity_id === groupCard.country_id &&
            card.card_type === groupCard.card_type &&
            card.label === groupCard.label
        );

        return {
            card_id: canonicalCard ? canonicalCard.card_id : `${group.letter_group_id}_${groupCard.card_type}_${index}`,
            entity_id: groupCard.country_id,
            card_type: groupCard.card_type,
            label: groupCard.label,
            label_script: canonicalCard ? canonicalCard.label_script : 'latin',
            initial_letter: group.initial_letter,
            romanisation_source: canonicalCard ? canonicalCard.romanisation_source : 'curated_group',
            mode_tags: ['shared_letter'],
            canUseEntityMetadata: Boolean(canonicalCard),
            sourceLetterGroupId: group.letter_group_id
        };
    }

    getCardAriaLabel(card, index) {
        if (card.status === 'hidden') {
            return `Hidden card, position ${index + 1}`;
        }

        const typeDef = this.getCardTypeDefinition(card.card_type);
        const visibleLabel = typeDef
            ? this.getCardTypeAriaLabel(typeDef, this.getCardLabel(card))
            : this.getCardLabel(card);

        if (card.status === 'matched') {
            return `${visibleLabel}, matched`;
        }

        return visibleLabel;
    }

    getCardSupplements(card) {
        const entity = this.getCardEntity(card);
        if (!entity) return [];

        const effectiveLocale = this.usesPrimaryLabelSet(card)
            ? this.pack.manifest.primary_locale
            : this.currentLocale;
        const isPrimary = effectiveLocale === this.pack.manifest.primary_locale;
        const currentLabel = this.getCardLabel(card);
        const variants = entity.label_variants && entity.label_variants[card.card_type];
        const supplements = [];

        const facts = entity.facts && entity.facts[card.card_type];
        if (isPrimary && Array.isArray(facts) && facts.length > 0) {
            supplements.push({ kind: 'fact', text: facts[0] });
        }

        if (!isPrimary && variants && variants.local_display && variants.local_display !== currentLabel) {
            supplements.push({ kind: 'variant', text: `Local name: ${variants.local_display}` });
        }

        if (variants && variants.native_display && variants.native_display !== currentLabel) {
            supplements.push({ kind: 'native', text: variants.native_display });
        }

        return supplements;
    }

    clamp(value, min, max) {
        return Math.min(max, Math.max(min, value));
    }

    getBoardColumnCount(cardCount) {
        const viewportWidth = window.innerWidth || document.documentElement.clientWidth || 1024;

        if (cardCount <= 3) return Math.max(1, cardCount);
        if (viewportWidth < 420) {
            if (cardCount <= 6) return 2;
            if (cardCount <= 12) return 3;
            return 4;
        }
        if (viewportWidth < 760) {
            if (cardCount <= 6) return 3;
            if (cardCount <= 12) return 4;
            return 4;
        }
        if (cardCount <= 6) return 3;
        if (cardCount <= 12) return 4;
        return 6;
    }

    scaleBoard() {
        const board = document.getElementById('board');
        if (!board || this.boardCards.length === 0) return;

        const cardCount = this.boardCards.length;
        const columns = this.getBoardColumnCount(cardCount);
        const rows = Math.ceil(cardCount / columns);
        const viewportWidth = window.innerWidth || document.documentElement.clientWidth || 1024;
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 768;
        const boardTop = board.getBoundingClientRect().top;
        const parentWidth = board.parentElement ? board.parentElement.clientWidth : viewportWidth;
        const gap = Math.round(this.clamp(Math.min(viewportWidth, viewportHeight) * 0.014, 6, 16));
        const availableWidth = Math.max(240, Math.min(parentWidth, viewportWidth - 16));
        const availableHeight = Math.max(180, viewportHeight - boardTop - 12);
        const widthLimitedCard = (availableWidth - gap * (columns - 1)) / columns;
        const heightLimitedCard = ((availableHeight - gap * (rows - 1)) / rows) * 0.75;
        const cardWidth = Math.floor(this.clamp(Math.min(widthLimitedCard, heightLimitedCard), 54, 220));

        board.style.setProperty('--card-columns', columns);
        board.style.setProperty('--board-gap', `${gap}px`);
        board.style.setProperty('--card-width', `${cardWidth}px`);
        board.style.setProperty('--card-padding', `${Math.round(this.clamp(cardWidth * 0.07, 5, 15))}px`);
        board.style.setProperty('--card-radius', `${Math.round(this.clamp(cardWidth * 0.055, 6, 14))}px`);
        board.style.setProperty('--card-icon-size', `${Math.round(this.clamp(cardWidth * 0.26, 18, 54))}px`);
        board.style.setProperty('--card-inner-gap', `${Math.round(this.clamp(cardWidth * 0.045, 3, 10))}px`);
        const textFloor = viewportWidth < 480 ? 14 : 18;
        board.style.setProperty('--card-type-size', `${Math.round(this.clamp(cardWidth * 0.12, textFloor, 22))}px`);
        board.style.setProperty('--card-label-size', `${Math.round(this.clamp(cardWidth * 0.18, textFloor, 28))}px`);
        board.style.setProperty('--card-back-size', `${Math.round(this.clamp(cardWidth * 0.35, 24, 72))}px`);
    }

    async init() {
        this.render();
        await this.loadPack('geography'); // Default to geography pack for MVP
        this.state = 'MENU';
        this.render();
    }

    async loadPack(packId) {
        try {
            // Fetch all required pack datasets per Engine §10
            const basePath = `../packs/${packId}`;
            const [manifest, entities, cards, letterGroups] = await Promise.all([
                fetch(`${basePath}/manifest.json`).then(res => res.json()),
                fetch(`${basePath}/entities.json`).then(res => res.json()),
                fetch(`${basePath}/cards.json`).then(res => res.json()),
                fetch(`${basePath}/letter_groups.json`).then(res => res.json())
            ]);

            // Engine §10 Interface schema validation
            const validator = new PackValidator();
            validator.validate({ manifest, entities, cards, letterGroups });

            const icons = {};
            for (const type of manifest.card_types) {
                const svgText = await fetch(`${basePath}/${type.icon}`).then(res => res.text());
                icons[type.type_id] = svgText;
            }

            this.pack = { manifest, entities, cards, letterGroups, icons };
            this.currentLocale = manifest.primary_locale || 'en';
            document.documentElement.lang = this.currentLocale;
            console.log(`Successfully loaded pack: ${this.pack.manifest.pack_name}`);
        } catch (error) {
            console.error("Failed to load or validate pack data.", error);

            let errorDetails = error.message;
            if (error.validationErrors) {
                errorDetails += `<br><br><div style="text-align: left; font-size: 0.85rem; max-height: 250px; overflow-y: auto; background: var(--bg-color); padding: 15px; border-radius: 8px; border: 1px solid var(--grid);">
                    <strong>Schema Violations:</strong><br>
                    ${error.validationErrors.join('<br>')}
                </div>`;
            }

            this.getAppRoot().innerHTML = `
                <div class="screen end" style="text-align: center; margin: 50px auto;">
                    <h2 style="color: var(--signal); margin-top: 0;">Error Loading Pack Data</h2>
                    <p>Check the console for details. (Note: The Fetch API requires a local web server).</p>
                    <p>${errorDetails}</p>
                </div>
            `;
        }
    }

    getCardLabel(card) {
        if (card.canUseEntityMetadata === false) return card.label;
        if (this.usesPrimaryLabelSet(card)) return card.label;
        if (this.currentLocale === this.pack.manifest.primary_locale) return card.label;
        const entity = this.getCardEntity(card);
        if (entity && entity.label_variants && entity.label_variants[card.card_type] && entity.label_variants[card.card_type][this.currentLocale]) {
            return entity.label_variants[card.card_type][this.currentLocale];
        }
        return card.label; // Fallback to default if translation is missing
    }

    shuffleArray(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    generateBoard(mode) {
        const triplesCount = this.boardSize / 3;
        let selectedCards = [];

        if (mode === 'shared_entity') {
            const activeEntities = this.getActiveEntities();
            if (activeEntities.length < triplesCount) {
                throw new Error(`Shared Entity Mode requires at least ${triplesCount} active entities.`);
            }

            const shuffledEntities = this.shuffleArray(activeEntities);
            const selectedEntities = shuffledEntities.slice(0, triplesCount);

            selectedEntities.forEach(entity => {
                const entityCards = this.getEntityCards(entity.entity_id);
                if (entityCards.length !== this.pack.manifest.card_types.length) {
                    throw new Error(`Entity '${entity.entity_id}' is missing one or more card definitions.`);
                }
                selectedCards.push(...entityCards.map(card => ({ ...card, canUseEntityMetadata: true })));
            });
        } else if (mode === 'shared_letter') {
            const activeGroups = this.getActiveLetterGroups();
            if (activeGroups.length < triplesCount) {
                throw new Error(`Shared Letter Mode requires at least ${triplesCount} active letter groups.`);
            }

            const shuffledGroups = this.shuffleArray(activeGroups);
            const selectedGroups = [];
            const usedLetters = new Set();

            // First pass: try to pick unique letters to avoid collisions (Engine §9.2 preference)
            for (const group of shuffledGroups) {
                if (!usedLetters.has(group.initial_letter) && selectedGroups.length < triplesCount) {
                    selectedGroups.push(group);
                    usedLetters.add(group.initial_letter);
                }
            }

            // Second pass: fill remaining slots if needed (forced collisions)
            if (selectedGroups.length < triplesCount) {
                for (const group of shuffledGroups) {
                    if (!selectedGroups.includes(group) && selectedGroups.length < triplesCount) {
                        selectedGroups.push(group);
                        console.log(`§9.2 Board Generator: Forced letter collision logged for '${group.initial_letter}'.`);
                    }
                }
            }

            // Map the selected group cards to the full card definitions
            selectedGroups.forEach(group => {
                group.cards.forEach((groupCard, index) => {
                    selectedCards.push(this.buildSharedLetterCard(group, groupCard, index));
                });
            });
        }

        if (selectedCards.length !== this.boardSize) {
            throw new Error(`Board generation produced ${selectedCards.length} cards for a ${this.boardSize}-card board.`);
        }

        // Map the selected cards into stateful board objects
        this.boardCards = this.shuffleArray(selectedCards).map((card, index) => ({
            ...card,
            canUseEntityMetadata: card.canUseEntityMetadata !== false,
            status: 'hidden', // 'hidden', 'revealed', 'matched'
            boardIndex: index
        }));
    }

    handleCardClick(index) {
        // Ignore clicks if we are currently checking a triple, or if the card is already flipped
        if (this.isChecking) return;
        
        const card = this.boardCards[index];
        if (card.status !== 'hidden') return;

        card.status = 'revealed';
        this.revealedCards.push(card);

        const cardEl = document.getElementById(`card-${index}`);
        if (cardEl) {
            cardEl.className = `card ${card.status}`;
            cardEl.setAttribute('aria-label', this.getCardAriaLabel(card, index));
        }

        if (this.revealedCards.length === 3) {
            this.validateTriple();
        }
    }

    validateTriple() {
        this.isChecking = true;
        const [c1, c2, c3] = this.revealedCards;
        
        // Engine Rule: A valid triple must always contain exactly one of each card type
        const uniqueTypes = new Set([c1.card_type, c2.card_type, c3.card_type]).size === 3;
        
        let isValid = false;
        if (uniqueTypes) {
            if (this.currentMode === 'shared_entity') {
                isValid = (c1.entity_id === c2.entity_id && c2.entity_id === c3.entity_id);
            } else if (this.currentMode === 'shared_letter') {
                isValid = (c1.initial_letter === c2.initial_letter && c2.initial_letter === c3.initial_letter);
            }
        }

        if (isValid) {
            const matchedCards = [...this.revealedCards];
            this.revealedCards.forEach(card => {
                card.status = 'matched';
                const el = document.getElementById(`card-${card.boardIndex}`);
                if (el) {
                    el.className = `card ${card.status}`;
                    el.setAttribute('aria-label', this.getCardAriaLabel(card, card.boardIndex));
                    el.setAttribute('aria-disabled', 'true');
                    el.setAttribute('tabindex', '-1');
                }
            });
            this.score++;
            const scoreEl = document.getElementById('score-display');
            if (scoreEl) scoreEl.innerText = `Score: ${this.score}`;

            this.revealedCards = [];
            this.isChecking = false;

            if (this.expertMode && !this.expertRevealEnabled) {
                this.completeRound();
            } else {
                this.showMatchOverlay(matchedCards);
            }
        } else {
            setTimeout(() => {
                this.revealedCards.forEach(card => {
                    card.status = 'hidden';
                    const el = document.getElementById(`card-${card.boardIndex}`);
                    if (el) {
                        el.className = `card ${card.status}`;
                        el.setAttribute('aria-label', this.getCardAriaLabel(card, card.boardIndex));
                    }
                });
                this.revealedCards = [];
                this.isChecking = false;
            }, 1500); // 1.5s delay to let players see their mistake before hiding
        }
    }

    completeRound() {
        if (this.boardCards.every(card => card.status === 'matched')) {
            this.state = 'END';
            this.render();
        }
    }

    showMatchOverlay(matchedCards) {
        const overlay = document.createElement('div');
        overlay.className = 'match-overlay';
        
        let contentHtml = `<h2>Triple Matched!</h2><div class="match-facts">`;
        
        matchedCards.forEach(card => {
            const supplements = this.getCardSupplements(card);
            const detailHtml = supplements.map(s => {
                const cls = s.kind === 'fact' ? 'fact-text'
                          : s.kind === 'native' ? 'native-text'
                          : 'variant-text';
                const extraAttr = s.kind === 'native' ? ' lang="und" dir="auto"' : '';
                return `<p class="${cls}"${extraAttr}>${s.text}</p>`;
            }).join('');

            contentHtml += `
                <div class="match-fact-item">
                    <div class="match-fact-icon" aria-hidden="true">${this.pack.icons[card.card_type]}</div>
                    <div class="match-fact-details">
                        <strong>${this.getCardLabel(card)}</strong>
                        ${detailHtml}
                    </div>
                </div>
            `;
        });
        
        contentHtml += `</div><p class="dismiss-hint">(Press Escape, Enter, or tap anywhere to dismiss)</p>`;
        overlay.innerHTML = `<div class="match-overlay-content" role="dialog" aria-modal="true" aria-live="polite" tabindex="-1">${contentHtml}</div>`;

        const previouslyFocused = document.activeElement;
        const onKeydown = (event) => {
            if (this.matchTimeout) {
                clearTimeout(this.matchTimeout);
                this.matchTimeout = null;
            }
            if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                dismiss();
            } else if (event.key === 'Tab') {
                event.preventDefault();
                const dialog = overlay.querySelector('.match-overlay-content');
                if (dialog) dialog.focus();
            }
        };
        const dismiss = () => {
            if (this.matchTimeout) clearTimeout(this.matchTimeout);
            this.matchTimeout = null;
            document.removeEventListener('keydown', onKeydown);
            if (document.body.contains(overlay)) document.body.removeChild(overlay);
            if (previouslyFocused && document.body.contains(previouslyFocused) && typeof previouslyFocused.focus === 'function') {
                previouslyFocused.focus();
            }
            this.completeRound();
        };

        overlay.onclick = dismiss;
        document.addEventListener('keydown', onKeydown);
        document.body.appendChild(overlay);
        const dialog = overlay.querySelector('.match-overlay-content');
        if (dialog) dialog.focus();
        this.matchTimeout = setTimeout(dismiss, 3500);
    }

    startTutorial() {
        this.isTutorial = true;
        this.tutorialStep = 1;
        this.setupTutorialStep();
    }

    setupTutorialStep() {
        this.tutorialMessage = "";
        this.state = 'TUTORIAL';
        
        if (this.tutorialStep === 1) {
            const [tutorialEntity] = this.getTutorialEntities(1);
            const cards = tutorialEntity ? this.getEntityCards(tutorialEntity.entity_id) : [];
            this.boardCards = cards.map((card, index) => ({
                ...card,
                canUseEntityMetadata: true,
                status: 'revealed',
                selected: false,
                boardIndex: index
            }));
            this.render();
            
        } else if (this.tutorialStep === 2) {
            const tutorialEntities = this.getTutorialEntities(2);
            const cards = tutorialEntities.flatMap(entity =>
                this.getEntityCards(entity.entity_id).map(card => ({ ...card, canUseEntityMetadata: true }))
            );
            this.boardCards = this.shuffleArray(cards).map((card, index) => ({
                ...card,
                status: 'revealed',
                selected: false,
                boardIndex: index
            }));
            this.render();
            
        } else if (this.tutorialStep === 3) {
            const [lg1, lg2] = this.getTutorialLetterGroups(2);
            let cards = [];
            [lg1, lg2].forEach(lg => {
                if (!lg) return;
                lg.cards.forEach((groupCard, index) => {
                    cards.push(this.buildSharedLetterCard(lg, groupCard, index));
                });
            });
            this.boardCards = this.shuffleArray(cards).map((card, index) => ({
                ...card,
                status: 'revealed',
                selected: false,
                boardIndex: index
            }));
            this.render();
            
        } else if (this.tutorialStep === 4) {
            // Step 3: Mini-round
            this.boardSize = 6;
            this.startGame('shared_entity', true);
        }
    }

    handleTutorialClick(index) {
        // Block interaction if we are showing the success delay
        if (this.tutorialMessage.includes('Correct')) return;
        
        const card = this.boardCards[index];
        if (card.status !== 'revealed') return;
        
        card.selected = !card.selected;
        this.render();

        const selectedCards = this.boardCards.filter(c => c.selected);
        if (selectedCards.length === 3) {
            this.validateTutorialTriple(selectedCards);
        }
    }

    validateTutorialTriple(selectedCards) {
        const [c1, c2, c3] = selectedCards;
        const uniqueTypes = new Set([c1.card_type, c2.card_type, c3.card_type]).size === 3;
        let isValid = false;
        
        if (this.tutorialStep === 2 && uniqueTypes) {
            isValid = (c1.entity_id === c2.entity_id && c2.entity_id === c3.entity_id);
        } else if (this.tutorialStep === 3 && uniqueTypes) {
            isValid = (c1.initial_letter === c2.initial_letter && c2.initial_letter === c3.initial_letter);
        }

        if (isValid) {
            this.tutorialMessage = "<span style='color: var(--success-color);'>Correct! Great job.</span>";
            this.render();
            setTimeout(() => {
                this.tutorialStep++;
                this.setupTutorialStep();
            }, 1500);
        } else {
            this.tutorialMessage = `Not quite! You need ${this.getRequiredTypePhrase()} that share the required relation.`;
            selectedCards.forEach(c => c.selected = false);
            this.render();
        }
    }

    render() {
        // A simple DOM-replacement render loop for the prototype
        const appRoot = this.getAppRoot();
        
        switch (this.state) {
            case 'LOADING':
                appRoot.innerHTML = `<div class="screen loading"><h1>Triple Memory</h1><p>Loading assets...</p></div>`;
                break;
                
            case 'MENU':
                appRoot.innerHTML = `
                    <div class="screen menu">
                        <h1>Triple Memory</h1>
                        <p class="subtitle">Active Pack: ${this.pack.manifest.pack_name}</p>
                        
                        <div class="menu-settings">
                            <label for="board-size">Board Size:</label>
                            <select id="board-size" onchange="game.selectedBoardSize = parseInt(this.value)">
                                ${this.pack.manifest.supported_board_sizes.map(size => `
                                    <option value="${size}" ${this.selectedBoardSize === size ? 'selected' : ''}>${size} Cards (${size / 3} Triples)</option>
                                `).join('')}
                            </select>
                        </div>

                        ${this.pack.manifest.supported_locales && this.pack.manifest.supported_locales.length > 1 ? `
                        <div class="menu-settings">
                            <label for="locale-select">Language:</label>
                            <select id="locale-select" onchange="game.setLocale(this.value)">
                                ${this.pack.manifest.supported_locales.map(loc => `
                                    <option value="${loc}" ${this.currentLocale === loc ? 'selected' : ''}>${this.getLocaleName(loc)}</option>
                                `).join('')}
                            </select>
                            ${this.currentLocale !== this.pack.manifest.primary_locale ? `
                                <p class="language-note">Shared Letter Mode keeps English labels because its letter groups are curated by English initials.</p>
                            ` : ''}
                        </div>
                        ` : ''}

                        <div class="menu-settings checkbox-setting">
                            <label>
                                <input type="checkbox" onchange="game.expertMode = this.checked; if (!this.checked) game.expertRevealEnabled = false; game.render();" ${this.expertMode ? 'checked' : ''}>
                                Expert Mode (Hide card types & icons)
                            </label>
                        </div>

                        ${this.expertMode ? `
                        <div class="menu-settings checkbox-setting">
                            <label>
                                <input type="checkbox" onchange="game.expertRevealEnabled = this.checked" ${this.expertRevealEnabled ? 'checked' : ''}>
                                Show post-match reveal in Expert Mode
                            </label>
                        </div>
                        ` : ''}

                        <div class="menu-settings checkbox-setting">
                            <label>
                                <input type="checkbox" onchange="game.teacherView = this.checked; game.render();" ${this.teacherView ? 'checked' : ''}>
                                Teacher View (Show Governance Info)
                            </label>
                        </div>

                        ${this.teacherView ? `
                        <div class="teacher-view-panel">
                            <h3>Governance & Provenance</h3>
                            <p><strong>Endorsement:</strong> <code>${this.pack.manifest.endorsement_marker}</code></p>
                            <p><strong>Curation Statement:</strong> <a href="../packs/${this.pack.manifest.pack_id}/${this.pack.manifest.curation_statement_path}" target="_blank">Read Here</a></p>
                            <div class="governance-table-container">
                                <table class="governance-table">
                                    <thead><tr><th>Entity</th><th>Recognition</th><th>Provenance</th></tr></thead>
                                    <tbody>
                                        ${this.pack.entities.map(e => `
                                            <tr><td>${e.entity_name}</td><td><code>${e.recognition_status}</code></td><td>${e.provenance}</td></tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        ` : ''}

                        <div class="menu-actions">
                            <button onclick="game.startTutorial()">Play: Tutorial</button>
                            <button onclick="game.boardSize = game.selectedBoardSize; game.startGame('shared_entity')">Play: Shared Entity Mode</button>
                            <button onclick="game.boardSize = game.selectedBoardSize; game.startGame('shared_letter')">Play: Shared Letter Mode</button>
                        </div>

                        <p class="menu-footer">
                            <a href="../packs/${this.pack.manifest.pack_id}/${this.pack.manifest.curation_statement_path}" target="_blank">Read the Curation Statement</a>
                        </p>
                    </div>
                `;
                break;
                
            case 'PLAYING':
                appRoot.innerHTML = `
                    <div class="screen playing">
                        <header>
                            <div>
                                <h2>Mode: ${this.currentMode === 'shared_entity' ? 'Shared Entity' : 'Shared Letter'}</h2>
                                ${this.currentMode === 'shared_letter' && this.currentLocale !== this.pack.manifest.primary_locale ? `
                                    <p class="mode-note">Using English labels for letter matching.</p>
                                ` : ''}
                            </div>
                            <div class="score" id="score-display" aria-live="polite" aria-atomic="true">Score: ${this.score}</div>
                            <button onclick="game.state = 'MENU'; game.render()">Quit to Menu</button>
                        </header>
                        <div class="board" id="board">
                            ${this.boardCards.map((card, index) => {
                                const typeDef = this.getCardTypeDefinition(card.card_type);
                                const cardLabel = this.getCardLabel(card);
                                return `
                                <button type="button" class="card ${card.status}" id="card-${index}" onclick="game.handleCardClick(${index})" aria-label="${this.getCardAriaLabel(card, index)}" tabindex="${card.status === 'matched' ? '-1' : '0'}" aria-disabled="${card.status === 'matched'}">
                                    <div class="card-inner" aria-hidden="true">
                                        <div class="card-front">
                                            ${!this.expertMode ? `
                                                <div class="card-icon" aria-hidden="true">${this.pack.icons[card.card_type]}</div>
                                                <div class="card-type">${this.getCardTypeLabel(typeDef)}</div>
                                            ` : ''}
                                            <div class="card-label">${cardLabel}</div>
                                        </div>
                                        <div class="card-back">
                                            <img class="card-back-emblem" src="../assets/cd/emblem-64.svg" alt="">
                                        </div>
                                    </div>
                                </button>
                            `}).join('')}
                        </div>
                    </div>
                `;
                break;
                
            case 'TUTORIAL':
                let instructions = "";
                let actionBtn = "";
                if (this.tutorialStep === 1) {
                    instructions = `Welcome to Triple Memory! A match isn't a pair, it's a <strong>TRIPLE</strong>. Every valid match needs ${this.getRequiredTypePhrase()}.`;
                    actionBtn = `<button onclick="game.tutorialStep++; game.setupTutorialStep();">Got it! Next Step</button>`;
                } else if (this.tutorialStep === 2) {
                    instructions = "<strong>Shared Entity Mode:</strong> Find three cards that belong to the same pack entry. Click 3 matching cards below.";
                } else if (this.tutorialStep === 3) {
                    instructions = "<strong>Shared Letter Mode:</strong> Find three cards that start with the same letter AND have one of each type. Click a valid triple.";
                }

                appRoot.innerHTML = `
                    <div class="screen tutorial">
                        <header>
                            <h2>Tutorial - Step ${this.tutorialStep} of 3</h2>
                            <button onclick="game.isTutorial = false; game.state = 'MENU'; game.render()">Skip Tutorial</button>
                        </header>
                        <div class="tutorial-instructions">
                            <p>${instructions}</p>
                            <p class="tutorial-msg" aria-live="polite" aria-atomic="true">${this.tutorialMessage}</p>
                            ${actionBtn}
                        </div>
                        <div class="board" id="board">
                            ${this.boardCards.map((card, index) => {
                                const typeDef = this.getCardTypeDefinition(card.card_type);
                                const cardLabel = this.getCardLabel(card);
                                const clickHandler = this.tutorialStep === 1 ? '' : `onclick="game.handleTutorialClick(${index})"`;
                                const selectedClass = card.selected ? 'selected' : '';
                                return `
                                <button type="button" class="card ${card.status} ${selectedClass}" id="card-${index}" ${clickHandler} aria-label="${this.getCardAriaLabel(card, index)}${card.selected ? ', selected' : ''}" aria-pressed="${card.selected ? 'true' : 'false'}" tabindex="${this.tutorialStep === 1 ? '-1' : '0'}">
                                    <div class="card-inner" aria-hidden="true">
                                        <div class="card-front">
                                            <div class="card-icon" aria-hidden="true">${this.pack.icons[card.card_type]}</div>
                                            <div class="card-type">${this.getCardTypeLabel(typeDef)}</div>
                                            <div class="card-label">${cardLabel}</div>
                                        </div>
                                        <div class="card-back">
                                            <img class="card-back-emblem" src="../assets/cd/emblem-64.svg" alt="">
                                        </div>
                                    </div>
                                </button>
                            `}).join('')}
                        </div>
                    </div>
                `;
                break;
                
            case 'END':
                const title = this.isTutorial ? "Tutorial Complete!" : "Game Complete!";
                const subtitle = this.isTutorial ? "You're ready to play!" : `Final Score: ${this.score}`;
                appRoot.innerHTML = `
                    <div class="screen end">
                        <h1>${title}</h1>
                        <p class="subtitle">${subtitle}</p>
                        <button onclick="game.isTutorial = false; game.state = 'MENU'; game.render()">Return to Menu</button>
                    </div>
                `;
                break;
        }

        if (this.state === 'PLAYING' || this.state === 'TUTORIAL') {
            window.requestAnimationFrame(() => this.scaleBoard());
        }
    }

    startGame(mode, isTutorial = false) {
        this.currentMode = mode;
        this.score = 0;
        this.boardCards = [];
        this.revealedCards = [];
        this.isTutorial = isTutorial;
        this.state = 'PLAYING';

        try {
            this.generateBoard(mode);
            this.render();
        } catch (error) {
            console.error("Failed to start game.", error);
            this.state = 'MENU';
            this.render();
            window.alert(error.message);
        }
    }
}

// Boot the engine when the DOM is ready
let game;
window.addEventListener('DOMContentLoaded', () => {
    game = new TripleMemoryEngine();
    game.init();
    window.addEventListener('resize', () => game.scaleBoard());
});
