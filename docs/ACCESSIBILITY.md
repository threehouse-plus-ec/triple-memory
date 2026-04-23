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
