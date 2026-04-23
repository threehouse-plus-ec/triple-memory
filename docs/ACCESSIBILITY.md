# Accessibility — Triple Memory

**Status:** Baseline defined in Engine Blueprint §18. Conformance audits pending per Task Card TC-51.

## Baseline requirements (Engine Blueprint §18)

- **Contrast:** WCAG 2.2 AA for all text on cards and UI chrome.
- **Font size:** no gameplay text below 18px at default zoom.
- **Colour-only signalling:** prohibited. Any state conveyed by colour must also be conveyed by shape, icon, text, or pattern.
- **Keyboard navigation:** all card reveals, mode selections, and menu actions reachable via Tab, activatable via Enter/Space.
- **Screen reader:** cards carry `aria-label`s reflecting type and label when revealed; hidden cards announce "hidden card, position N".
- **Reduced motion:** card-flip animations and post-match reveals honour `prefers-reduced-motion`.
- **Icon independence:** pack-provided icons must be shape-distinct so that a greyscale or single-colour rendering still communicates type.

These are floor requirements, not targets.

## Audit log

| Date | Auditor | Component | Status | Notes |
|------|---------|-----------|--------|-------|
| 2026-04-22 | TC-51 Verifier | Geography Pack Icons (`capital.svg`, `country.svg`, `river.svg`) | **Pass** | Icons successfully tested for shape distinctness at 16px, 24px, and 48px. Confirmed colour-independence (monochrome `currentColor` fill) and greyscale legibility. |
| 2026-04-23 | UI audit (first pass) | Engine prototype (`engine/index.html`, `app.js`, `style.css`) | **Partial — remediation required** | See §1 below. 4 requirements pass, 4 partial/fail. |
| 2026-04-23 | UI remediation (first pass) | Engine prototype | **Applied — awaiting SR/keyboard cross-check** | See §2 below. All 5 recommended fixes committed; behaviour still needs an independent screen-reader smoke test and keyboard-only run. |

---

## 1. UI audit — 2026-04-23 (engine prototype first pass)

Auditor: first-pass review against Engine Blueprint §18 using the tokens defined in [assets/cd/tokens.css](assets/cd/tokens.css). Cross-check required before remediation is accepted.

### Requirement-by-requirement

| §18 Requirement | Status | Evidence |
|---|---|---|
| Contrast — WCAG 2.2 AA | **Pass** | All token text/background pairs tested: minimum ratio `stone on parchment` = 4.70:1; `signal on parchment` = 4.79:1 (the `.tutorial-msg` uses `signal` with `font-weight: bold`, pushing it into the large-text class); all primary `ink` text ≥ 15:1. Button text (`warm-white` on `sea`) = 6.52:1. |
| Gameplay text ≥ 18px at default zoom | **Fail** | Multiple gameplay text declarations drop below 18px at their clamp minimum or fixed size: `.score` 16px ([style.css:74](engine/style.css#L74)); `header h2` 17.6px ([style.css:68](engine/style.css#L68)); `.mode-note` 13.6px ([style.css:80](engine/style.css#L80)); `.tutorial-instructions p` 16px ([style.css:332](engine/style.css#L332)); `.fact-text` 14.4px ([style.css:305](engine/style.css#L305)) — this is post-match gameplay content per Engine §16; `.variant-text` 15.2px ([style.css:299](engine/style.css#L299)); `.dismiss-hint` 13.6px ([style.css:312](engine/style.css#L312)); `.card-type` clamp min 10px and `.card-label` clamp min 13px (via [app.js:232-233](engine/app.js#L232-L233)) on small boards. |
| Colour-only signalling prohibited | **Pass** | `matched` state signalled by persistent card flip + opacity + `aria-disabled="true"` + `tabindex="-1"` + aria-label ", matched" ([app.js:417-425](engine/app.js#L417-L425)). `selected` tutorial state signalled by `aria-pressed` + box-shadow + colour ([app.js:764](engine/app.js#L764)). Hidden vs. revealed distinguished by 3D flip and divergent aria-labels. |
| Keyboard navigation | **Partial** | Cards are `<button>` with correct `tabindex` toggling (0/-1) and Enter/Space activation. Menu controls use native `<select>` and `<input type="checkbox">`. **Gap:** match overlay ([app.js:462-502](engine/app.js#L462-L502)) dismisses on `overlay.onclick` only — no Escape/Enter handler, no focus is moved into the dialog, no Tab trap. Keyboard users cannot dismiss on demand and must wait the 3.5s auto-timer. |
| Screen reader — card aria-labels | **Pass** | `getCardAriaLabel` ([app.js:144-159](engine/app.js#L144-L159)) covers hidden ("Hidden card, position N"), revealed (pack template, e.g. "Capital: Vienna"), and matched (", matched") states. Tutorial `, selected` suffix paired with `aria-pressed` ([app.js:764](engine/app.js#L764)). |
| Screen reader — state-change announcements | **Fail** | `#score-display` ([app.js:706,429](engine/app.js#L706)) updates via `innerText` with no `aria-live`; score changes are silent. `.tutorial-msg` ([app.js:754](engine/app.js#L754)) has no `aria-live`; "Correct!" and "Not quite!" feedback is not announced. Card reveal mutates the aria-label on an existing DOM node without a live region — most screen readers will not re-announce on attribute change. |
| Screen reader — modal semantics | **Partial** | Match overlay declares `role="dialog" aria-modal="true" aria-live="polite"` ([app.js:490](engine/app.js#L490)) but focus is never programmatically moved into the dialog, no focus trap exists, and the dialog auto-dismisses after 3.5s. The `aria-modal` claim and the actual focus behaviour are inconsistent. |
| Reduced motion | **Partial** | `.card-inner` transition and `.match-overlay` fadeIn are disabled under `prefers-reduced-motion` ([style.css:221-224](engine/style.css#L221-L224)). **Gap:** `button:not(.card):hover` uses `transform: translateY(-2px)` with a 0.1s transition ([style.css:353,360](engine/style.css#L353)) and is not suppressed. |
| Icon shape-distinct / colour-independent | **Pass** | Covered by TC-51 sign-off. |
| `<html lang>` reflects active locale | **Fail** (out-of-band) | [engine/index.html:2](engine/index.html#L2) hard-codes `lang="en"`. Locale switcher ([app.js:631](engine/app.js#L631)) updates `game.currentLocale` but not `document.documentElement.lang`. German-locale content is then served under `lang="en"`, misleading screen-reader pronunciation and translation tools. Not explicitly listed in §18 but a prerequisite for locale-aware SR behaviour. |

### Findings summary

**Pass (4):** contrast, colour-only signalling, card aria-labels, icon independence.
**Partial (3):** keyboard (overlay), modal semantics, reduced motion.
**Fail (3):** gameplay font size floor, live-region announcements, `<html lang>` sync.

### Recommended remediation order

1. **Font size floor** (content fix) — raise clamp minima on gameplay text so no declaration drops below 18px at default zoom. Board-scaling logic in `scaleBoard()` needs its `--card-type-size` and `--card-label-size` floors raised; the small-viewport branch may then require fewer columns or a different layout. This is the highest-impact change because it cascades into board-scaling assumptions.
2. **Live regions** — add `aria-live="polite"` on `#score-display` and `.tutorial-msg`; keep the match overlay's existing `aria-live="polite"`. Small, isolated change.
3. **`<html lang>` sync** — on locale change, set `document.documentElement.lang = this.currentLocale` in the locale-select handler. One line.
4. **Match overlay keyboard dismiss** — add `keydown` listener for Escape/Enter on the overlay, move focus into the dialog on mount, restore focus to the originating card on dismiss. Medium change; couples with whether the 3.5s auto-dismiss should pause when the overlay has focus.
5. **Reduced-motion button hover** — wrap the `transform` on `button:not(.card):hover` in a `@media (prefers-reduced-motion: no-preference)` guard. Two-line CSS change.

### Cross-check required

Per the cross-check protocol ([docs/TASK_CARDS.md §2](docs/TASK_CARDS.md#L44-L54)), these findings need a second auditor's sign-off before remediation commits. Specifically: (a) independent contrast re-computation from the tokens, (b) independent SR smoke test (VoiceOver or NVDA) confirming the live-region and modal gaps, (c) independent keyboard-only run through one tutorial and one shared-entity game.

---

## 2. UI remediation — 2026-04-23 (first pass applied)

Single-operator remediation applied directly against §1 findings, ahead of the cross-check sign-off. The cross-check tasks above remain open and are now effectively a verification pass on the fixed build rather than on the original baseline.

### Changes applied

| # | §18 item | Change | Files |
|---|---|---|---|
| 1 | Font size floor ≥ 18px | Raised fixed sizes and clamp minima on `.score`, `header h2`, `.mode-note`, `.tutorial-instructions p`, `.fact-text`, `.variant-text`, `.dismiss-hint` to ≥ 1.125rem (18px). Raised `--card-type-size` clamp floor from 10 → 18px and `--card-label-size` clamp floor from 13 → 18px in `scaleBoard()`, and bumped their slope coefficients (0.105 → 0.12, 0.15 → 0.18) so mid-sized cards scale proportionally. | [engine/style.css](engine/style.css), [engine/app.js:232-233](engine/app.js#L232-L233) |
| 2 | Live-region announcements | Added `aria-live="polite" aria-atomic="true"` on `#score-display` and `.tutorial-msg`. | [engine/app.js](engine/app.js) |
| 3 | `<html lang>` sync | New `setLocale(locale)` method updates `document.documentElement.lang` and re-renders. Locale `<select>` now calls `game.setLocale(this.value)` instead of inlining two assignments. `loadPack` also sets the initial `lang` from the pack manifest. | [engine/app.js](engine/app.js) |
| 4 | Match overlay keyboard dismiss | Overlay content is now `tabindex="-1"` and receives programmatic focus on mount. A document-level `keydown` listener dismisses on Escape / Enter / Space. The previously focused element (typically the last-clicked card button) is restored on dismiss, whether the dismiss comes from click, keyboard, or the 3.5s auto-timer. Hint text updated to "(Press Escape, Enter, or tap anywhere to dismiss)". | [engine/app.js](engine/app.js) |
| 5 | Reduced-motion button hover | `button:not(.card):hover { transform }` and `:active { transform }` wrapped in `@media (prefers-reduced-motion: no-preference)`. | [engine/style.css](engine/style.css) |

### Known follow-ups after this pass

- **Small-viewport layout:** card-text floors at 18px may now force text wrap or visual crowding on 54–96px cards used on phones. The `scaleBoard()` column-count heuristic ([engine/app.js:188-205](engine/app.js#L188-L205)) does not currently reduce column count further on phones to compensate. Needs a visual review on a real small viewport.
- **Auto-dismiss and focus:** the 3.5s auto-dismiss still fires even when the user has given the dialog focus. A keyboard user who starts reading may be interrupted. Consider pausing the timer on keyboard focus or extending it while focus is inside the dialog.
- **Cross-check still owed:** this remediation was applied by a single operator. The §1 cross-check tasks (independent contrast, SR smoke test, keyboard-only run) are still required and should now target the remediated build.
