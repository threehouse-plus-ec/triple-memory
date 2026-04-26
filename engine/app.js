// Triple Memory - Core Game Engine

// Packs available to the engine. Add new entries here as they ship.
// The first entry is the default if no ?pack=<id> query param is supplied.
const AVAILABLE_PACKS = [
    { id: 'geography',  display: { en: 'Geography', de: 'Geografie' } },
    { id: 'chemistry',  display: { en: 'Chemistry', de: 'Chemie' } },
    { id: 'music',      display: { en: 'Music',     de: 'Musik'    } },
    { id: 'math',       display: { en: 'Math',      de: 'Mathe'    } },
    { id: 'geometry',   display: { en: 'Geometry',  de: 'Geometrie'} }
];

// Perfect-memory optimal play — Monte Carlo mean (20000 trials each).
// Derivation and re-runnable script: scripts/simulate_triples.js.
// Values are mean flips; replace when the sim is re-run on changed rules.
const AVG_PERFECT_MEMORY_FLIPS = {
    12: 30, // 4 triples
    18: 51, // 6 triples
    24: 73  // 8 triples
};

// Distinct, AA-contrast border colours used to tint each matched triple in
// turn. Cycled modulo length; 8 values cover the 24-card board (8 triples).
const MATCH_COLORS = [
    '#2c5f7c', // sea
    '#c05834', // warm red-orange
    '#5a8035', // forest green
    '#8f4a9c', // purple
    '#b8873e', // amber
    '#1e7c89', // teal
    '#c74a84', // rose
    '#4a5a95'  // slate blue
];

const UI_STRINGS = {
    en: {
        loading: 'Loading assets...',
        activePack: 'Active Pack: {name}',
        pack: 'Pack:',
        boardSize: 'Board Size:',
        boardOption: '{cards} Cards ({triples} Triples)',
        language: 'Language:',
        expertMode: 'Expert Mode (Hide card types & icons)',
        expertReveal: 'Show post-match reveal in Expert Mode',
        teacherView: 'Teacher View (Show Governance Info)',
        governanceHeader: 'Governance & Provenance',
        endorsement: 'Endorsement:',
        curationStatement: 'Curation Statement:',
        readHere: 'Read Here',
        tableEntity: 'Entity',
        tableRecognition: 'Recognition',
        tableProvenance: 'Provenance',
        playTutorial: 'Play: Tutorial',
        playSharedEntity: 'Play: Shared Entity Mode',
        playSharedLetter: 'Play: Shared Letter Mode',
        readCurationStatement: 'Read the Curation Statement',
        modePrefix: 'Mode: {mode}',
        modeSharedEntity: 'Shared Entity',
        modeSharedLetter: 'Shared Letter',
        modeNoteEnglishLabels: 'Using English labels for letter matching.',
        languageNoteLetter: 'Shared Letter Mode keeps English labels because its letter groups are curated by English initials.',
        score: 'Score: {n}',
        matches: 'Matches: {done}/{total}',
        time: 'Time: {time}',
        flips: 'Flips: {n}',
        perfectFlips: 'Perfect: {n}',
        avgFlips: 'Avg: ~{n}',
        randomFlips: 'Random: ~{n}',
        memoryQuality: 'Memory: {pct}%',
        scoringInfoLabel: 'About scoring',
        scoringInfoTitle: 'How scoring works',
        scoringInfoBody: '<p>Alongside your live flip count, the scoreboard shows three reference points:</p><ul><li><strong>Perfect</strong> — the absolute minimum: every card flipped exactly once, in the attempt that matches its triple. Requires flawless memory and some luck.</li><li><strong>Avg (~)</strong> — what perfect-memory optimal play typically needs when cards must be learned before they can be matched. From a Monte Carlo simulation (20 000 trials).</li><li><strong>Random (~)</strong> — expected flips for a player with no memory at all, picking three cards uniformly at random every attempt. Derived analytically.</li></ul><p><strong>Memory quality</strong> maps your flips onto a logarithmic scale between perfect (100%) and random (0%). A normal perfect-memory game lands around 75%; 50% sits halfway between random picking and optimal play on the log scale.</p><p class="scoring-info-caveat"><strong>Scoring above 75% consistently?</strong> That ceiling reflects what the player\'s memory alone can achieve. Scores sustained above it suggest extra information is reaching the player from outside their own recall — repeated games on the same deck layout, edge or timing tells, or other entanglement between player and game. The benchmark assumes honest play with a fresh shuffle every round.</p>',
        closeInfo: 'Close',
        quitToMenu: 'Quit to Menu',
        tutorialHeader: 'Tutorial - Step {n} of {total}',
        skipTutorial: 'Skip Tutorial',
        gotItNext: 'Got it! Next Step',
        tripleMatched: 'Triple Matched!',
        dismissHint: '(Press Escape, Enter, or tap anywhere to dismiss)',
        gameComplete: 'Game Complete!',
        gameCompleteHeader: 'Game Complete — {done}/{total} triples · Time {time} · Flips {flips} · Memory {pct}% (perfect {perfect}, avg ~{avg}, random ~{random})',
        playAgain: 'New Game',
        tutorialComplete: 'Tutorial Complete!',
        readyToPlay: "You're ready to play!",
        finalScore: 'Final Score: {n}',
        returnToMenu: 'Return to Menu',
        hiddenCard: 'Hidden card, position {n}',
        diagramCard: 'Diagram card, position {n} — visual recognition required',
        matchedSuffix: ', matched',
        selectedSuffix: ', selected',
        localName: 'Local name: {name}',
        tutorialStep1: "Welcome to Triple Memory! A match isn't a pair, it's a <strong>TRIPLE</strong>. Every valid match needs {required}.",
        tutorialStep2: '<strong>Shared Entity Mode:</strong> Find three cards that belong to the same pack entry. Click 3 matching cards below.',
        tutorialStep3: '<strong>Shared Letter Mode:</strong> Find three cards that start with the same letter AND have one of each type. Click a valid triple.',
        tutorialCorrect: 'Correct! Great job.',
        tutorialWrong: 'Not quite! You need {required} that share the required relation.',
        errorLoading: 'Error Loading Pack Data',
        errorHint: 'Check the console for details. (Note: The Fetch API requires a local web server).',
        schemaViolations: 'Schema Violations:',
        viewStatistics: 'Statistics',
        statisticsHeader: 'Your Statistics',
        statisticsEmpty: 'No games recorded yet. Play a round and come back.',
        statisticsPrivacy: 'Stored locally on this device; never sent anywhere.',
        statisticsFilterPack: 'Pack:',
        statisticsFilterMode: 'Mode:',
        statisticsFilterSize: 'Board:',
        statisticsAll: 'All',
        statisticsSummaryCount: 'Games: {n}',
        statisticsSummaryAvg: 'Avg memory: {n}%',
        statisticsSummaryBest: 'Best memory: {n}%',
        statisticsSummaryTime: 'Total time: {time}',
        statisticsHistMemory: 'Memory quality (%)',
        statisticsHistFlips: 'Flips',
        statisticsHistTime: 'Time (seconds)',
        statisticsBinRange: '{lo}–{hi}',
        statisticsClear: 'Clear All Statistics',
        statisticsClearConfirm: 'Delete every recorded game on this device? This cannot be undone.'
    },
    de: {
        loading: 'Lade Ressourcen...',
        activePack: 'Aktives Paket: {name}',
        pack: 'Paket:',
        boardSize: 'Spielfeldgröße:',
        boardOption: '{cards} Karten ({triples} Tripel)',
        language: 'Sprache:',
        expertMode: 'Expertenmodus (Kartentypen & Symbole ausblenden)',
        expertReveal: 'Nachmatch-Anzeige im Expertenmodus aktivieren',
        teacherView: 'Lehreransicht (Kuratierungsdaten anzeigen)',
        governanceHeader: 'Kuratierung & Herkunft',
        endorsement: 'Freigabe:',
        curationStatement: 'Kuratierungserklärung:',
        readHere: 'Hier lesen',
        tableEntity: 'Eintrag',
        tableRecognition: 'Anerkennung',
        tableProvenance: 'Herkunft',
        playTutorial: 'Spielen: Tutorial',
        playSharedEntity: 'Spielen: Modus Gemeinsame Entität',
        playSharedLetter: 'Spielen: Modus Gemeinsamer Buchstabe',
        readCurationStatement: 'Kuratierungserklärung lesen',
        modePrefix: 'Modus: {mode}',
        modeSharedEntity: 'Gemeinsame Entität',
        modeSharedLetter: 'Gemeinsamer Buchstabe',
        modeNoteEnglishLabels: 'Für das Buchstaben-Matching werden englische Bezeichnungen verwendet.',
        languageNoteLetter: 'Der Modus Gemeinsamer Buchstabe verwendet englische Bezeichnungen, da die Buchstabengruppen nach englischen Anfangsbuchstaben kuratiert sind.',
        score: 'Punkte: {n}',
        matches: 'Treffer: {done}/{total}',
        time: 'Zeit: {time}',
        flips: 'Aufdeckungen: {n}',
        perfectFlips: 'Perfekt: {n}',
        avgFlips: 'Ø: ~{n}',
        randomFlips: 'Zufällig: ~{n}',
        memoryQuality: 'Gedächtnis: {pct}%',
        scoringInfoLabel: 'Über die Bewertung',
        scoringInfoTitle: 'So funktioniert die Bewertung',
        scoringInfoBody: '<p>Neben deiner laufenden Aufdeckungs­zahl zeigt die Anzeige drei Referenzwerte:</p><ul><li><strong>Perfekt</strong> — das absolute Minimum: Jede Karte genau einmal aufgedeckt, im Zug, der ihr Tripel vervollständigt. Braucht perfektes Gedächtnis und etwas Glück.</li><li><strong>Ø (~)</strong> — was optimales Spiel mit perfektem Gedächtnis typischerweise benötigt, wenn Karten erst kennengelernt werden müssen, bevor sie passen. Aus einer Monte-Carlo-Simulation (20 000 Durchgänge).</li><li><strong>Zufällig (~)</strong> — erwartete Aufdeckungen für eine Spielerin ohne Gedächtnis, die pro Zug drei Karten rein zufällig zieht. Analytisch hergeleitet.</li></ul><p><strong>Gedächtnis-Qualität</strong> überträgt deine Aufdeckungen auf eine logarithmische Skala zwischen Perfekt (100 %) und Zufall (0 %). Ein normales Spiel mit perfektem Gedächtnis liegt bei etwa 75 %; 50 % entspricht dem logarithmischen Mittelwert zwischen Zufall und optimalem Spiel.</p><p class="scoring-info-caveat"><strong>Dauerhaft über 75 %?</strong> Diese Grenze bildet ab, was das Gedächtnis der Spielerin allein leisten kann. Werte dauerhaft darüber deuten darauf hin, dass zusätzliche Information von außerhalb der eigenen Erinnerung einfließt — wiederholte Partien auf derselben Deck-Anordnung, Hinweise über Kartenränder oder Timing, oder eine andere Verschränkung zwischen Spielerin und Spiel. Der Benchmark geht von ehrlichem Spiel mit frischer Mischung pro Runde aus.</p>',
        closeInfo: 'Schließen',
        quitToMenu: 'Zum Menü',
        tutorialHeader: 'Tutorial – Schritt {n} von {total}',
        skipTutorial: 'Tutorial überspringen',
        gotItNext: 'Verstanden! Weiter',
        tripleMatched: 'Tripel gefunden!',
        dismissHint: '(Escape, Enter oder irgendwo tippen zum Schließen)',
        gameComplete: 'Spiel beendet!',
        gameCompleteHeader: 'Spiel beendet — {done}/{total} Tripel · Zeit {time} · Aufdeckungen {flips} · Gedächtnis {pct}% (perfekt {perfect}, Ø ~{avg}, zufällig ~{random})',
        playAgain: 'Neues Spiel',
        tutorialComplete: 'Tutorial abgeschlossen!',
        readyToPlay: 'Du kannst jetzt loslegen!',
        finalScore: 'Endstand: {n}',
        returnToMenu: 'Zurück zum Menü',
        hiddenCard: 'Verdeckte Karte, Position {n}',
        diagramCard: 'Diagrammkarte, Position {n} — visuelle Erkennung erforderlich',
        matchedSuffix: ', gefunden',
        selectedSuffix: ', ausgewählt',
        localName: 'Lokaler Name: {name}',
        tutorialStep1: 'Willkommen bei Triple Memory! Ein Treffer ist kein Paar, sondern ein <strong>TRIPEL</strong>. Jeder gültige Treffer braucht {required}.',
        tutorialStep2: '<strong>Modus Gemeinsame Entität:</strong> Finde drei Karten, die zum selben Eintrag gehören. Klicke unten 3 passende Karten an.',
        tutorialStep3: '<strong>Modus Gemeinsamer Buchstabe:</strong> Finde drei Karten, die mit demselben Buchstaben beginnen und je einen Kartentyp abdecken. Klicke ein gültiges Tripel an.',
        tutorialCorrect: 'Richtig! Gut gemacht.',
        tutorialWrong: 'Nicht ganz! Du brauchst {required}, die die geforderte Beziehung teilen.',
        errorLoading: 'Fehler beim Laden der Paketdaten',
        errorHint: 'Details in der Konsole. (Hinweis: Die Fetch API benötigt einen lokalen Webserver.)',
        schemaViolations: 'Schemaverstöße:',
        viewStatistics: 'Statistik',
        statisticsHeader: 'Deine Statistik',
        statisticsEmpty: 'Noch keine Spiele aufgezeichnet. Spiel eine Runde und komm wieder.',
        statisticsPrivacy: 'Nur lokal auf diesem Gerät gespeichert; nichts wird übertragen.',
        statisticsFilterPack: 'Paket:',
        statisticsFilterMode: 'Modus:',
        statisticsFilterSize: 'Spielfeld:',
        statisticsAll: 'Alle',
        statisticsSummaryCount: 'Spiele: {n}',
        statisticsSummaryAvg: 'Ø Gedächtnis: {n}%',
        statisticsSummaryBest: 'Beste Gedächtnis-Qualität: {n}%',
        statisticsSummaryTime: 'Gesamtzeit: {time}',
        statisticsHistMemory: 'Gedächtnis-Qualität (%)',
        statisticsHistFlips: 'Aufdeckungen',
        statisticsHistTime: 'Zeit (Sekunden)',
        statisticsBinRange: '{lo}–{hi}',
        statisticsClear: 'Alle Statistiken löschen',
        statisticsClearConfirm: 'Wirklich alle auf diesem Gerät gespeicherten Spiele löschen? Kann nicht rückgängig gemacht werden.'
    }
};

class TripleMemoryEngine {
    constructor() {
        this.state = 'LOADING'; // States: LOADING, MENU, PLAYING, END, STATS
        this.pack = null;
        this.statsFilter = { pack: 'all', mode: 'all', size: 'all' };
        
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
        this.matchGroupCounter = 0; // Cycles through MATCH_COLORS so each triple gets its own hue
        this.gameComplete = false; // When true, keeps the finished board visible instead of switching to END
        this.flipCount = 0; // Number of individual card reveals in the current round
        this.startTime = null; // ms timestamp when the current round started
        this.elapsedMs = 0; // Elapsed time in the current round (frozen on completion)
        this.timerHandle = null; // setInterval handle for the live timer
        this.isChecking = false; // Lock interactions during flip animations
        
        this.isTutorial = false;
        this.tutorialStep = 0;
        this.tutorialMessage = "";
    }

    getAppRoot() {
        return document.getElementById('app') || document.body;
    }

    formatTime(ms) {
        const totalSeconds = Math.max(0, Math.floor(ms / 1000));
        const mm = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
        const ss = String(totalSeconds % 60).padStart(2, '0');
        return `${mm}:${ss}`;
    }

    startTimer() {
        if (this.timerHandle) clearInterval(this.timerHandle);
        this.startTime = Date.now();
        this.elapsedMs = 0;
        this.timerHandle = setInterval(() => {
            if (this.state !== 'PLAYING' || this.gameComplete) {
                this.stopTimer();
                return;
            }
            this.elapsedMs = Date.now() - this.startTime;
            this.updateScoreboard();
        }, 1000);
    }

    stopTimer() {
        if (this.timerHandle) {
            clearInterval(this.timerHandle);
            this.timerHandle = null;
        }
        if (this.startTime != null) {
            this.elapsedMs = Date.now() - this.startTime;
        }
    }

    perfectFlips() {
        // Minimum: every card revealed exactly once, in its triple's matching
        // attempt. = cardsPerTriple × triples = boardSize.
        return this.boardSize;
    }

    averageFlips() {
        // Empirical mean for perfect-memory optimal play, from
        // scripts/simulate_triples.js (Monte Carlo, 20k trials per config).
        // Fallback for non-standard board sizes: linear fit mean ≈ 11N - 14
        // where N is the triple count, which interpolates the three data
        // points {N=4: 30, N=6: 51, N=8: 73} within ~1 flip.
        if (AVG_PERFECT_MEMORY_FLIPS[this.boardSize] !== undefined) {
            return AVG_PERFECT_MEMORY_FLIPS[this.boardSize];
        }
        const N = this.boardSize / this.pack.manifest.card_types.length;
        return Math.max(this.boardSize, Math.round(11 * N - 14));
    }

    randomFlips() {
        // Expected flips for random-no-memory play (pick 3 face-down cards
        // uniformly at random every attempt). With k triples remaining and p
        // cards per triple, P(match|k) = k · p! / prod_{i=0..p-1}(pk-i),
        // so expected attempts at stage k = 1/P. Total flips = p · Σ 1/P.
        const p = this.pack.manifest.card_types.length;
        const triples = this.boardSize / p;
        let pFact = 1;
        for (let i = 1; i <= p; i++) pFact *= i;
        let totalAttempts = 0;
        for (let k = 1; k <= triples; k++) {
            let denom = 1;
            for (let i = 0; i < p; i++) denom *= (p * k - i);
            const pMatch = (k * pFact) / denom;
            totalAttempts += 1 / pMatch;
        }
        return Math.round(totalAttempts * p);
    }

    memoryQuality(flips) {
        // Log-scaled figure of merit:
        //   MQ = 1 - (log(flips) - log(perfect)) / (log(random) - log(perfect))
        // Linear FoM is dominated by the huge random baseline, so even
        // mediocre play scores >90%. A log scale spreads the interesting
        // range — perfect-memory optimal play scores ~72-76%, 2× that ~55%,
        // clearly random ~0%. Clamped to [0, 100].
        const perfect = this.perfectFlips();
        const random = this.randomFlips();
        const safeFlips = Math.max(flips, perfect);
        if (random <= perfect) return 100;
        const logRange = Math.log(random) - Math.log(perfect);
        const raw = 1 - (Math.log(safeFlips) - Math.log(perfect)) / logRange;
        return Math.round(Math.max(0, Math.min(1, raw)) * 100);
    }

    renderScoreboard() {
        const totalTriples = this.boardSize / this.pack.manifest.card_types.length;
        return `
            <span class="score-item">${this.t('matches', { done: this.score, total: totalTriples })}</span>
            <span class="score-item">${this.t('time', { time: this.formatTime(this.elapsedMs) })}</span>
            <span class="score-item">${this.t('flips', { n: this.flipCount })}</span>
            <span class="score-item score-item-ref">${this.t('perfectFlips', { n: this.perfectFlips() })}</span>
            <span class="score-item score-item-ref">${this.t('avgFlips', { n: this.averageFlips() })}</span>
            <span class="score-item score-item-ref">${this.t('randomFlips', { n: this.randomFlips() })}</span>
            <button type="button" class="score-info-button" onclick="game.showScoringInfo()" aria-label="${this.t('scoringInfoLabel')}" title="${this.t('scoringInfoLabel')}">?</button>
        `;
    }

    showScoringInfo() {
        const overlay = document.createElement('div');
        overlay.className = 'scoring-info-overlay';
        overlay.innerHTML = `
            <div class="scoring-info-content" role="dialog" aria-modal="true" aria-labelledby="scoring-info-title" tabindex="-1">
                <h2 id="scoring-info-title">${this.t('scoringInfoTitle')}</h2>
                ${this.t('scoringInfoBody')}
                <div class="scoring-info-actions">
                    <button type="button" class="scoring-info-close">${this.t('closeInfo')}</button>
                </div>
            </div>
        `;

        const previouslyFocused = document.activeElement;
        const onKeydown = (event) => {
            if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                dismiss();
            } else if (event.key === 'Tab') {
                event.preventDefault();
                const dialog = overlay.querySelector('.scoring-info-content');
                if (dialog) dialog.focus();
            }
        };
        const dismiss = () => {
            document.removeEventListener('keydown', onKeydown);
            if (document.body.contains(overlay)) document.body.removeChild(overlay);
            if (previouslyFocused && document.body.contains(previouslyFocused) && typeof previouslyFocused.focus === 'function') {
                previouslyFocused.focus();
            }
        };

        overlay.onclick = (event) => {
            // Click outside the content panel dismisses; clicks inside don't
            // (except the close button, handled below).
            if (event.target === overlay) dismiss();
        };
        overlay.querySelector('.scoring-info-close').onclick = dismiss;
        document.addEventListener('keydown', onKeydown);
        document.body.appendChild(overlay);
        const dialog = overlay.querySelector('.scoring-info-content');
        if (dialog) dialog.focus();
    }

    updateScoreboard() {
        const el = document.getElementById('score-display');
        if (el) el.innerHTML = this.renderScoreboard();
    }

    renderLegend() {
        if (this.expertMode) return '';
        if (!this.pack || !this.pack.manifest || !Array.isArray(this.pack.manifest.card_types)) return '';
        const items = this.pack.manifest.card_types.map(typeDef => {
            const label = this.getCardTypeLabel(typeDef);
            const icon = (this.pack.icons && this.pack.icons[typeDef.type_id]) || '';
            return `
                <div class="legend-item">
                    <span class="legend-icon" aria-hidden="true">${icon}</span>
                    <span class="legend-label">${label}</span>
                </div>
            `;
        }).join('');
        return `<div class="legend" role="group" aria-label="${this.t('tableEntity')}">${items}</div>`;
    }

    t(key, params) {
        const table = UI_STRINGS[this.currentLocale] || UI_STRINGS.en;
        const s = (table[key] !== undefined ? table[key] : (UI_STRINGS.en[key] !== undefined ? UI_STRINGS.en[key] : key));
        if (!params) return s;
        return s.replace(/\{(\w+)\}/g, (_, k) => params[k] !== undefined ? params[k] : `{${k}}`);
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
        // Packs may supply a grammatical "one X" phrase per locale via
        // typeDef.tutorial_phrase (e.g. { en: "one country", de: "ein Land" }).
        // Falls back to "one {display-name}" if no pack phrase is declared.
        const phrases = typeDef && typeDef.tutorial_phrase;
        if (phrases && typeof phrases === 'object') {
            if (phrases[this.currentLocale]) return phrases[this.currentLocale];
            if (phrases.en) return phrases.en;
        }
        return `one ${this.getCardTypeLabel(typeDef)}`;
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
        // Accept either the engine-level "entity_id" key or the legacy
        // geography-specific "country_id" on letter_group cards.
        const groupEntityId = groupCard.entity_id !== undefined ? groupCard.entity_id : groupCard.country_id;
        const canonicalCard = this.pack.cards.find(card =>
            card.entity_id === groupEntityId &&
            card.card_type === groupCard.card_type &&
            card.label === groupCard.label
        );

        return {
            card_id: canonicalCard ? canonicalCard.card_id : `${group.letter_group_id}_${groupCard.card_type}_${index}`,
            entity_id: groupEntityId,
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
            return this.t('hiddenCard', { n: index + 1 });
        }

        const hasDiagram = this.cardHasResolvedDiagram(card);
        const typeDef = this.getCardTypeDefinition(card.card_type);

        // Diagram cards must not leak the entity to screen readers while
        // unmatched: a sighted player sees the shape and has to recognise it,
        // so the non-visual aria-label has to stay generic. Once matched, the
        // resolved label is safe to surface (the round is over for that
        // triple).
        let visibleLabel;
        if (hasDiagram && card.status !== 'matched') {
            visibleLabel = this.t('diagramCard', { n: index + 1 });
        } else {
            visibleLabel = typeDef
                ? this.getCardTypeAriaLabel(typeDef, this.getCardLabel(card))
                : this.getCardLabel(card);
        }

        if (card.status === 'matched') {
            return `${visibleLabel}${this.t('matchedSuffix')}`;
        }

        return visibleLabel;
    }

    cardHasResolvedDiagram(card) {
        return !!(card && typeof card.diagram === 'string'
            && this.pack && this.pack.diagrams
            && this.pack.diagrams[card.diagram]);
    }

    renderCardBody(card, cardLabel) {
        if (this.cardHasResolvedDiagram(card)) {
            return `<div class="card-diagram" aria-hidden="true">${this.pack.diagrams[card.diagram]}</div>`;
        }
        return `<div class="card-label">${cardLabel}</div>`;
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
            supplements.push({ kind: 'variant', text: this.t('localName', { name: variants.local_display }) });
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
        const heightLimitedCard = (availableHeight - gap * (rows - 1)) / rows;
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
        const params = new URLSearchParams(window.location.search);
        const requested = params.get('pack');
        const known = new Set(AVAILABLE_PACKS.map(p => p.id));
        const packId = (requested && known.has(requested)) ? requested : AVAILABLE_PACKS[0].id;
        this.packId = packId;
        await this.loadPack(packId);
        this.state = 'MENU';
        this.render();
    }

    switchPack(packId) {
        if (!AVAILABLE_PACKS.some(p => p.id === packId)) return;
        const url = new URL(window.location.href);
        url.searchParams.set('pack', packId);
        window.location.assign(url.toString());
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

            // Optional in-card diagrams: collect every distinct diagram path
            // referenced by the cards and inline-fetch each once. Cards whose
            // 'diagram' field resolves to a successful fetch will render the
            // SVG in the card body in place of the text label.
            const diagrams = {};
            const diagramPaths = Array.from(new Set(
                cards.map(c => c.diagram).filter(p => typeof p === 'string' && p.length > 0)
            ));
            await Promise.all(diagramPaths.map(async (relPath) => {
                try {
                    const res = await fetch(`${basePath}/${relPath}`);
                    if (res.ok) diagrams[relPath] = await res.text();
                } catch (_) {
                    // Tolerate missing diagrams: the card simply renders its
                    // text label as before.
                }
            }));

            this.pack = { manifest, entities, cards, letterGroups, icons, diagrams };
            // Prefer the browser's language when the pack supports it; fall
            // back to the pack's declared primary_locale otherwise. Compares
            // the primary subtag only (e.g. "de-CH" → "de").
            const supported = Array.isArray(manifest.supported_locales) ? manifest.supported_locales : [];
            const primary = manifest.primary_locale || 'en';
            const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase().split('-')[0];
            this.currentLocale = supported.includes(browserLang) ? browserLang : primary;
            document.documentElement.lang = this.currentLocale;
            console.log(`Successfully loaded pack: ${this.pack.manifest.pack_name}`);
        } catch (error) {
            console.error("Failed to load or validate pack data.", error);

            let errorDetails = error.message;
            if (error.validationErrors) {
                errorDetails += `<br><br><div style="text-align: left; font-size: 0.85rem; max-height: 250px; overflow-y: auto; background: var(--bg-color); padding: 15px; border-radius: 8px; border: 1px solid var(--grid);">
                    <strong>${this.t('schemaViolations')}</strong><br>
                    ${error.validationErrors.join('<br>')}
                </div>`;
            }

            this.getAppRoot().innerHTML = `
                <div class="screen end" style="text-align: center; margin: 50px auto;">
                    <h2 style="color: var(--signal); margin-top: 0;">${this.t('errorLoading')}</h2>
                    <p>${this.t('errorHint')}</p>
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
            const selectedEntities = [];
            const usedLabelsByType = new Map(); // card_type -> Set<label>

            const recordEntityLabels = (entity) => {
                this.getEntityCards(entity.entity_id).forEach(card => {
                    if (!usedLabelsByType.has(card.card_type)) {
                        usedLabelsByType.set(card.card_type, new Set());
                    }
                    usedLabelsByType.get(card.card_type).add(card.label);
                });
            };
            const entityCollidesOnAnyType = (entity) => {
                return this.getEntityCards(entity.entity_id).some(card => {
                    const used = usedLabelsByType.get(card.card_type);
                    return used && used.has(card.label);
                });
            };

            // First pass: prefer entities whose labels are all distinct from
            // those already picked, so duplicate visible labels (e.g. two
            // "Transition metal" cards) don't appear on the same board.
            for (const entity of shuffledEntities) {
                if (selectedEntities.length >= triplesCount) break;
                if (entityCollidesOnAnyType(entity)) continue;
                selectedEntities.push(entity);
                recordEntityLabels(entity);
            }

            // Second pass: fill remaining slots with forced collisions if the
            // unique-label pool was too small for the requested board size.
            if (selectedEntities.length < triplesCount) {
                for (const entity of shuffledEntities) {
                    if (selectedEntities.length >= triplesCount) break;
                    if (selectedEntities.includes(entity)) continue;
                    selectedEntities.push(entity);
                    console.log(`§9.2 Board Generator: Forced label collision logged for entity '${entity.entity_id}'.`);
                    recordEntityLabels(entity);
                }
            }

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
        this.flipCount++;
        this.revealedCards.push(card);
        this.updateScoreboard();

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
            const matchColor = MATCH_COLORS[this.matchGroupCounter % MATCH_COLORS.length];
            this.matchGroupCounter++;
            this.revealedCards.forEach(card => {
                card.status = 'matched';
                card.matchColor = matchColor;
                const el = document.getElementById(`card-${card.boardIndex}`);
                if (el) {
                    el.className = `card ${card.status}`;
                    el.style.setProperty('--match-color', matchColor);
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
        if (!this.boardCards.every(card => card.status === 'matched')) return;
        this.stopTimer();
        if (this.isTutorial) {
            this.state = 'END';
            this.render();
        } else {
            if (typeof TripleMemoryStats !== 'undefined' && this.pack) {
                TripleMemoryStats.record({
                    pack: this.pack.manifest.pack_id,
                    mode: this.currentMode,
                    size: this.boardSize,
                    locale: this.currentLocale,
                    flips: this.flipCount,
                    time_ms: this.elapsedMs,
                    memory_pct: this.memoryQuality(this.flipCount),
                    perfect: this.perfectFlips(),
                    avg: this.averageFlips(),
                    random: this.randomFlips(),
                    expert: this.expertMode
                });
            }
            // Keep the finished board visible so the player can review every
            // matched triple; swap the header into completion mode instead of
            // transitioning to the blank END screen.
            this.gameComplete = true;
            this.render();
        }
    }

    showMatchOverlay(matchedCards) {
        const overlay = document.createElement('div');
        overlay.className = 'match-overlay';
        
        let contentHtml = `<h2>${this.t('tripleMatched')}</h2><div class="match-facts">`;
        
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
        
        contentHtml += `</div><p class="dismiss-hint">${this.t('dismissHint')}</p>`;
        overlay.innerHTML = `<div class="match-overlay-content" role="dialog" aria-modal="true" aria-live="polite" tabindex="-1">${contentHtml}</div>`;

        const previouslyFocused = document.activeElement;
        const onKeydown = (event) => {
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
            // Skip the Shared Letter Mode walkthrough for packs that don't
            // support it (e.g. math, where number-keyed letter groups would
            // be meaningless).
            if (!(this.pack.manifest.supported_modes || []).includes('shared_letter')) {
                this.tutorialStep = 4;
                this.setupTutorialStep();
                return;
            }
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
            this.tutorialMessage = `<span style='color: var(--success-color);'>${this.t('tutorialCorrect')}</span>`;
            this.render();
            setTimeout(() => {
                this.tutorialStep++;
                this.setupTutorialStep();
            }, 1500);
        } else {
            this.tutorialMessage = this.t('tutorialWrong', { required: this.getRequiredTypePhrase() });
            selectedCards.forEach(c => c.selected = false);
            this.render();
        }
    }

    showStatistics() {
        this.state = 'STATS';
        this.render();
    }

    setStatsFilter(key, value) {
        this.statsFilter[key] = value;
        this.render();
    }

    clearStatistics() {
        if (!confirm(this.t('statisticsClearConfirm'))) return;
        TripleMemoryStats.clear();
        this.render();
    }

    formatStatsDuration(ms) {
        const total = Math.max(0, Math.floor(ms / 1000));
        const h = Math.floor(total / 3600);
        const m = Math.floor((total % 3600) / 60);
        const s = total % 60;
        if (h > 0) return `${h}h ${String(m).padStart(2, '0')}m`;
        return `${m}:${String(s).padStart(2, '0')}`;
    }

    renderHistogramRows(bins, labels) {
        const max = bins.reduce((a, b) => a > b ? a : b, 0) || 1;
        return bins.map((n, i) => {
            const pct = (n / max) * 100;
            const label = labels[i];
            return `
                <div class="stats-hist-row">
                    <span class="stats-hist-label">${label}</span>
                    <span class="stats-hist-bar-wrap"><span class="stats-hist-bar" style="width: ${pct}%"></span></span>
                    <span class="stats-hist-count">${n}</span>
                </div>
            `;
        }).join('');
    }

    renderStatistics() {
        const records = TripleMemoryStats.list(this.statsFilter);
        const summary = TripleMemoryStats.summary(records);

        const packOptions = [{ id: 'all', label: this.t('statisticsAll') }]
            .concat(AVAILABLE_PACKS.map(p => ({
                id: p.id,
                label: (p.display && (p.display[this.currentLocale] || p.display.en)) || p.id
            })));
        const modeOptions = [
            { id: 'all', label: this.t('statisticsAll') },
            { id: 'shared_entity', label: this.t('modeSharedEntity') },
            { id: 'shared_letter', label: this.t('modeSharedLetter') }
        ];
        const sizeOptions = [{ id: 'all', label: this.t('statisticsAll') }]
            .concat((this.pack ? this.pack.manifest.supported_board_sizes : [12, 18, 24]).map(s => ({
                id: String(s),
                label: String(s)
            })));

        const filterBlock = `
            <div class="stats-filters">
                <label>${this.t('statisticsFilterPack')}
                    <select onchange="game.setStatsFilter('pack', this.value)">
                        ${packOptions.map(o => `<option value="${o.id}" ${this.statsFilter.pack === o.id ? 'selected' : ''}>${o.label}</option>`).join('')}
                    </select>
                </label>
                <label>${this.t('statisticsFilterMode')}
                    <select onchange="game.setStatsFilter('mode', this.value)">
                        ${modeOptions.map(o => `<option value="${o.id}" ${this.statsFilter.mode === o.id ? 'selected' : ''}>${o.label}</option>`).join('')}
                    </select>
                </label>
                <label>${this.t('statisticsFilterSize')}
                    <select onchange="game.setStatsFilter('size', this.value)">
                        ${sizeOptions.map(o => `<option value="${o.id}" ${String(this.statsFilter.size) === o.id ? 'selected' : ''}>${o.label}</option>`).join('')}
                    </select>
                </label>
            </div>
        `;

        if (records.length === 0) {
            return `
                <div class="screen stats">
                    <h1>${this.t('statisticsHeader')}</h1>
                    <p class="stats-privacy">${this.t('statisticsPrivacy')}</p>
                    ${filterBlock}
                    <p class="stats-empty">${this.t('statisticsEmpty')}</p>
                    <div class="menu-actions">
                        <button onclick="game.state = 'MENU'; game.render()">${this.t('returnToMenu')}</button>
                    </div>
                </div>
            `;
        }

        const memoryBins = TripleMemoryStats.histogramMemory(records);
        const memoryLabels = memoryBins.map((_, i) => this.t('statisticsBinRange', { lo: i * 10, hi: (i + 1) * 10 }));

        const flipValues = records.map(r => Number(r.flips)).filter(Number.isFinite);
        const flipHist = TripleMemoryStats.histogramLinear(flipValues, 10);
        const flipLabels = this.binLabels(flipHist.min, flipHist.max, 10);

        const timeValues = records.map(r => Math.round(Number(r.time_ms) / 1000)).filter(Number.isFinite);
        const timeHist = TripleMemoryStats.histogramLinear(timeValues, 10);
        const timeLabels = this.binLabels(timeHist.min, timeHist.max, 10);

        return `
            <div class="screen stats">
                <h1>${this.t('statisticsHeader')}</h1>
                <p class="stats-privacy">${this.t('statisticsPrivacy')}</p>
                ${filterBlock}
                <div class="stats-summary">
                    <span>${this.t('statisticsSummaryCount', { n: summary.count })}</span>
                    <span>${this.t('statisticsSummaryAvg', { n: summary.avgMemory })}</span>
                    <span>${this.t('statisticsSummaryBest', { n: summary.bestMemory })}</span>
                    <span>${this.t('statisticsSummaryTime', { time: this.formatStatsDuration(summary.totalTimeMs) })}</span>
                </div>
                <section class="stats-hist">
                    <h3>${this.t('statisticsHistMemory')}</h3>
                    ${this.renderHistogramRows(memoryBins, memoryLabels)}
                </section>
                <section class="stats-hist">
                    <h3>${this.t('statisticsHistFlips')}</h3>
                    ${this.renderHistogramRows(flipHist.bins, flipLabels)}
                </section>
                <section class="stats-hist">
                    <h3>${this.t('statisticsHistTime')}</h3>
                    ${this.renderHistogramRows(timeHist.bins, timeLabels)}
                </section>
                <div class="menu-actions stats-actions">
                    <button onclick="game.state = 'MENU'; game.render()">${this.t('returnToMenu')}</button>
                    <button class="stats-clear" onclick="game.clearStatistics()">${this.t('statisticsClear')}</button>
                </div>
            </div>
        `;
    }

    binLabels(min, max, binCount) {
        if (!Number.isFinite(min) || !Number.isFinite(max) || min === max) {
            return new Array(binCount).fill('').map((_, i) => i === 0 ? String(min || 0) : '');
        }
        const step = (max - min) / binCount;
        return new Array(binCount).fill(0).map((_, i) => {
            const lo = Math.round(min + i * step);
            const hi = Math.round(min + (i + 1) * step);
            return this.t('statisticsBinRange', { lo, hi });
        });
    }

    render() {
        // A simple DOM-replacement render loop for the prototype
        const appRoot = this.getAppRoot();
        
        switch (this.state) {
            case 'LOADING':
                appRoot.innerHTML = `<div class="screen loading"><h1>Triple Memory</h1><p>${this.t('loading')}</p></div>`;
                break;
                
            case 'MENU':
                appRoot.innerHTML = `
                    <div class="screen menu">
                        <h1>Triple Memory</h1>
                        <p class="subtitle">${this.t('activePack', { name: this.pack.manifest.pack_name })}</p>

                        ${AVAILABLE_PACKS.length > 1 ? `
                        <div class="menu-settings">
                            <label for="pack-select">${this.t('pack')}</label>
                            <select id="pack-select" onchange="game.switchPack(this.value)">
                                ${AVAILABLE_PACKS.map(p => `
                                    <option value="${p.id}" ${this.packId === p.id ? 'selected' : ''}>${(p.display && (p.display[this.currentLocale] || p.display.en)) || p.id}</option>
                                `).join('')}
                            </select>
                        </div>
                        ` : ''}

                        <div class="menu-settings">
                            <label for="board-size">${this.t('boardSize')}</label>
                            <select id="board-size" onchange="game.selectedBoardSize = parseInt(this.value)">
                                ${this.pack.manifest.supported_board_sizes.map(size => `
                                    <option value="${size}" ${this.selectedBoardSize === size ? 'selected' : ''}>${this.t('boardOption', { cards: size, triples: size / 3 })}</option>
                                `).join('')}
                            </select>
                        </div>

                        ${this.pack.manifest.supported_locales && this.pack.manifest.supported_locales.length > 1 ? `
                        <div class="menu-settings">
                            <label for="locale-select">${this.t('language')}</label>
                            <select id="locale-select" onchange="game.setLocale(this.value)">
                                ${this.pack.manifest.supported_locales.map(loc => `
                                    <option value="${loc}" ${this.currentLocale === loc ? 'selected' : ''}>${this.getLocaleName(loc)}</option>
                                `).join('')}
                            </select>
                            ${this.currentLocale !== this.pack.manifest.primary_locale ? `
                                <p class="language-note">${this.t('languageNoteLetter')}</p>
                            ` : ''}
                        </div>
                        ` : ''}

                        <div class="menu-settings checkbox-setting">
                            <label>
                                <input type="checkbox" onchange="game.expertMode = this.checked; if (!this.checked) game.expertRevealEnabled = false; game.render();" ${this.expertMode ? 'checked' : ''}>
                                ${this.t('expertMode')}
                            </label>
                        </div>

                        ${this.expertMode ? `
                        <div class="menu-settings checkbox-setting">
                            <label>
                                <input type="checkbox" onchange="game.expertRevealEnabled = this.checked" ${this.expertRevealEnabled ? 'checked' : ''}>
                                ${this.t('expertReveal')}
                            </label>
                        </div>
                        ` : ''}

                        <div class="menu-settings checkbox-setting">
                            <label>
                                <input type="checkbox" onchange="game.teacherView = this.checked; game.render();" ${this.teacherView ? 'checked' : ''}>
                                ${this.t('teacherView')}
                            </label>
                        </div>

                        ${this.teacherView ? `
                        <div class="teacher-view-panel">
                            <h3>${this.t('governanceHeader')}</h3>
                            <p><strong>${this.t('endorsement')}</strong> <code>${this.pack.manifest.endorsement_marker}</code></p>
                            <p><strong>${this.t('curationStatement')}</strong> <a href="../packs/${this.pack.manifest.pack_id}/${this.pack.manifest.curation_statement_path}" target="_blank">${this.t('readHere')}</a></p>
                            <div class="governance-table-container">
                                <table class="governance-table">
                                    <thead><tr><th>${this.t('tableEntity')}</th><th>${this.t('tableRecognition')}</th><th>${this.t('tableProvenance')}</th></tr></thead>
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
                            <button onclick="game.startTutorial()">${this.t('playTutorial')}</button>
                            ${(this.pack.manifest.supported_modes || []).includes('shared_entity') ? `
                                <button onclick="game.boardSize = game.selectedBoardSize; game.startGame('shared_entity')">${this.t('playSharedEntity')}</button>
                            ` : ''}
                            ${(this.pack.manifest.supported_modes || []).includes('shared_letter') ? `
                                <button onclick="game.boardSize = game.selectedBoardSize; game.startGame('shared_letter')">${this.t('playSharedLetter')}</button>
                            ` : ''}
                            <button class="menu-secondary" onclick="game.showStatistics()">${this.t('viewStatistics')}</button>
                        </div>

                        <p class="menu-footer">
                            <a href="../packs/${this.pack.manifest.pack_id}/${this.pack.manifest.curation_statement_path}" target="_blank">${this.t('readCurationStatement')}</a>
                        </p>
                    </div>
                `;
                break;
                
            case 'PLAYING':
                appRoot.innerHTML = `
                    <div class="screen playing ${this.gameComplete ? 'complete' : ''}">
                        <header>
                            <div>
                                ${this.gameComplete
                                    ? `<h2 class="complete-banner">${this.t('gameCompleteHeader', { done: this.score, total: this.boardSize / this.pack.manifest.card_types.length, time: this.formatTime(this.elapsedMs), flips: this.flipCount, perfect: this.perfectFlips(), avg: this.averageFlips(), random: this.randomFlips(), pct: this.memoryQuality(this.flipCount) })}</h2>`
                                    : `<h2>${this.t('modePrefix', { mode: this.currentMode === 'shared_entity' ? this.t('modeSharedEntity') : this.t('modeSharedLetter') })}</h2>`
                                }
                                ${!this.gameComplete && this.currentMode === 'shared_letter' && this.currentLocale !== this.pack.manifest.primary_locale ? `
                                    <p class="mode-note">${this.t('modeNoteEnglishLabels')}</p>
                                ` : ''}
                            </div>
                            <div class="score" id="score-display" aria-live="polite" aria-atomic="true">${this.renderScoreboard()}</div>
                            ${this.gameComplete
                                ? `<div class="complete-actions">
                                       <button onclick="game.startGame('${this.currentMode}')">${this.t('playAgain')}</button>
                                       <button onclick="game.state = 'MENU'; game.render()">${this.t('returnToMenu')}</button>
                                   </div>`
                                : `<button onclick="game.state = 'MENU'; game.render()">${this.t('quitToMenu')}</button>`
                            }
                        </header>
                        ${this.renderLegend()}
                        <div class="board" id="board">
                            ${this.boardCards.map((card, index) => {
                                const cardLabel = this.getCardLabel(card);
                                const matchStyle = card.matchColor ? ` style="--match-color: ${card.matchColor}"` : '';
                                return `
                                <button type="button" class="card ${card.status}" id="card-${index}"${matchStyle} onclick="game.handleCardClick(${index})" aria-label="${this.getCardAriaLabel(card, index)}" tabindex="${card.status === 'matched' ? '-1' : '0'}" aria-disabled="${card.status === 'matched'}">
                                    <div class="card-inner" aria-hidden="true">
                                        <div class="card-front">
                                            ${!this.expertMode ? `
                                                <div class="card-icon" aria-hidden="true">${this.pack.icons[card.card_type]}</div>
                                            ` : ''}
                                            ${this.renderCardBody(card, cardLabel)}
                                        </div>
                                        <div class="card-back">
                                            <img class="card-back-emblem" src="../assets/cd/emblem-32.svg" alt="">
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
                    instructions = this.t('tutorialStep1', { required: this.getRequiredTypePhrase() });
                    actionBtn = `<button onclick="game.tutorialStep++; game.setupTutorialStep();">${this.t('gotItNext')}</button>`;
                } else if (this.tutorialStep === 2) {
                    instructions = this.t('tutorialStep2');
                } else if (this.tutorialStep === 3) {
                    instructions = this.t('tutorialStep3');
                }

                appRoot.innerHTML = `
                    <div class="screen tutorial">
                        <header>
                            <h2>${this.t('tutorialHeader', { n: this.tutorialStep, total: (this.pack.manifest.supported_modes || []).includes('shared_letter') ? 3 : 2 })}</h2>
                            <button onclick="game.isTutorial = false; game.state = 'MENU'; game.render()">${this.t('skipTutorial')}</button>
                        </header>
                        <div class="tutorial-instructions">
                            <p>${instructions}</p>
                            <p class="tutorial-msg" aria-live="polite" aria-atomic="true">${this.tutorialMessage}</p>
                            ${actionBtn}
                        </div>
                        ${this.renderLegend()}
                        <div class="board" id="board">
                            ${this.boardCards.map((card, index) => {
                                const cardLabel = this.getCardLabel(card);
                                const clickHandler = this.tutorialStep === 1 ? '' : `onclick="game.handleTutorialClick(${index})"`;
                                const selectedClass = card.selected ? 'selected' : '';
                                const matchStyle = card.matchColor ? ` style="--match-color: ${card.matchColor}"` : '';
                                return `
                                <button type="button" class="card ${card.status} ${selectedClass}" id="card-${index}"${matchStyle} ${clickHandler} aria-label="${this.getCardAriaLabel(card, index)}${card.selected ? this.t('selectedSuffix') : ''}" aria-pressed="${card.selected ? 'true' : 'false'}" tabindex="${this.tutorialStep === 1 ? '-1' : '0'}">
                                    <div class="card-inner" aria-hidden="true">
                                        <div class="card-front">
                                            <div class="card-icon" aria-hidden="true">${this.pack.icons[card.card_type]}</div>
                                            ${this.renderCardBody(card, cardLabel)}
                                        </div>
                                        <div class="card-back">
                                            <img class="card-back-emblem" src="../assets/cd/emblem-32.svg" alt="">
                                        </div>
                                    </div>
                                </button>
                            `}).join('')}
                        </div>
                    </div>
                `;
                break;
                
            case 'END':
                const title = this.isTutorial ? this.t('tutorialComplete') : this.t('gameComplete');
                const subtitle = this.isTutorial ? this.t('readyToPlay') : this.t('finalScore', { n: this.score });
                appRoot.innerHTML = `
                    <div class="screen end">
                        <h1>${title}</h1>
                        <p class="subtitle">${subtitle}</p>
                        <button onclick="game.isTutorial = false; game.state = 'MENU'; game.render()">${this.t('returnToMenu')}</button>
                    </div>
                `;
                break;

            case 'STATS':
                appRoot.innerHTML = this.renderStatistics();
                break;
        }

        if (this.state === 'PLAYING' || this.state === 'TUTORIAL') {
            window.requestAnimationFrame(() => this.scaleBoard());
        }
    }

    startGame(mode, isTutorial = false) {
        this.currentMode = mode;
        this.score = 0;
        this.matchGroupCounter = 0;
        this.gameComplete = false;
        this.flipCount = 0;
        this.elapsedMs = 0;
        this.boardCards = [];
        this.revealedCards = [];
        this.isTutorial = isTutorial;
        this.state = 'PLAYING';
        this.startTimer();

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
