# Architect Review of Blueprint v0.1

**Source:** Council-3 deliberative input, Architect stance.
**Received:** 2026-04-22
**Subject:** Blueprint v0.1
**Archived for:** deliberation history

---

## [Stance: Architect]

### 1. Summary

The Blueprint v0.1 exhibits robust structural coherence. The deliberate separation of the semantic entity model from the active card display model provides a highly scalable foundation.

Generating the initial countries.json and same_letter_groups.json is the structurally superior next step. The foundational data schema will dictate the rendering logic and state management requirements, which must be solidified before drafting the repository handbook (README).

### 2. Structured Detail

Applying the ADM triad and Error-Correction protocols to the current blueprint reveals the following structural parameters:

- **Analog Lens (Physical Play Mechanics):** Transitioning from traditional two-card matching to a three-card protocol significantly increases cognitive load. Traditional memory relies on a binary state (match/no match). A triple introduces a partial success state (two out of three). The recommended starting board of 18 cards (6 triples) is optimal to prevent working-memory saturation during early playtesting.
- **Digital Lens (Data Architecture):** The proposed JSON structures successfully decouple the reference database from the gameplay deck. This allows the system to scale seamlessly from a local prototype to a global, database-backed application.
- **Memory Lens (Cognitive Pathways):** The dual-mode design exercises orthogonal memory retrieval systems. "Same Country Mode" relies on semantic and spatial memory (geographical relationships), whereas "Same Letter Mode" relies on phonetic and lexical categorization.
- **Error-Correction (Systemic Resilience):**

  A hidden bottleneck exists within Section 11 (UI Principles) combined with Section 9 (Same Letter Mode). If card types (Capital, Country, River) are completely hidden, players in "Same Letter Mode" could become confused if the active board contains multiple entities of the same type starting with the same letter (e.g., Paris and Prague both on the board).

  *Correction:* The dataset curation for "Same Letter Mode" must enforce a strict constraint: no two active triples on the board should contain overlapping initial letters unless a subtle visual indicator (an icon or colour tint) identifies the card type.

### 3. Implications & Next Steps

- **Data Generation:** Constructing the JSON datasets first allows for immediate validation of the selection_reason logic for rivers, testing the rigidity of the curation rules.
- **Schema Enforcement:** Creating a strict schema for same_letter_groups.json ensures that every curated set contains exactly one Capital, one Country, and one River, maintaining mechanical parity with the geographic mode.
- **Handbook Alignment:** Once the data structure is finalised, the repository handbook can accurately document the precise JSON requirements for future contributors looking to expand the decks.

Proposal: begin by drafting the countries.json with the first 20 curated triples to test the geographical boundary conditions.
