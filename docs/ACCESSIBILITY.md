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

*Pending.* Audit results from TC-51 (icons) and later engine-level audits will be recorded here, each with the auditor name, date, icon or component audited, and pass / fail status.
