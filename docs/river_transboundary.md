# Phase 1 Transboundary River Metadata (TC-13)

**Status:** Drafted per TC-13. Ready for TC-15 second-pass cross-check.

This document records the transboundary status and riparian neighbours for the canonical rivers of the 20 Phase 1 countries.

---

## Europe
### AUT - Austria (Danube)
- **shared_river_flag:** `true`
- **shared_river_countries:** `["DEU", "SVK", "HUN", "HRV", "SRB", "ROU", "BGR", "MDA", "UKR"]`

### BEL - Belgium (Meuse)
- **shared_river_flag:** `true`
- **shared_river_countries:** `["FRA", "NLD"]`

### DEU - Germany (Rhine)
- **shared_river_flag:** `true`
- **shared_river_countries:** `["CHE", "LIE", "AUT", "FRA", "NLD"]`

### ESP - Spain (Tagus)
- **shared_river_flag:** `true`
- **shared_river_countries:** `["PRT"]`

### FRA - France (Loire)
- **shared_river_flag:** `false`
- **shared_river_countries:** `[]`

### ITA - Italy (Po)
- **shared_river_flag:** `false`
- **shared_river_countries:** `[]`

### NLD - Netherlands (Rhine)
- **shared_river_flag:** `true`
- **shared_river_countries:** `["CHE", "LIE", "AUT", "DEU", "FRA"]`

---

## Asia
### CHN - China (Yangtze)
- **shared_river_flag:** `false`
- **shared_river_countries:** `[]`

### IND - India (Ganges)
- **shared_river_flag:** `true`
- **shared_river_countries:** `["BGD"]`

### JPN - Japan (Shinano)
- **shared_river_flag:** `false`
- **shared_river_countries:** `[]`

### KOR - South Korea (Han)
- **shared_river_flag:** `true`
- **shared_river_countries:** `["PRK"]`

---

## Americas
### ARG - Argentina (Paraná)
- **shared_river_flag:** `true`
- **shared_river_countries:** `["BRA", "PRY"]`

### BRA - Brazil (Amazon)
- **shared_river_flag:** `true`
- **shared_river_countries:** `["PER", "COL"]`

### MEX - Mexico (Rio Grande)
- **shared_river_flag:** `true`
- **shared_river_countries:** `["USA"]`

### USA - United States (Mississippi)
- **shared_river_flag:** `false`
- **shared_river_countries:** `[]`

---

## Africa
### EGY - Egypt (Nile)
- **shared_river_flag:** `true`
- **shared_river_countries:** `["BDI", "COD", "ERI", "ETH", "KEN", "RWA", "SDN", "SSD", "TZA", "UGA"]`

### KEN - Kenya (Tana)
- **shared_river_flag:** `false`
- **shared_river_countries:** `[]`

### ZAF - South Africa (Orange)
- **shared_river_flag:** `true`
- **shared_river_countries:** `["LSO", "NAM"]`

---

## Oceania
### AUS - Australia (Murray)
- **shared_river_flag:** `false`
- **shared_river_countries:** `[]`

### NZL - New Zealand (Waikato)
- **shared_river_flag:** `false`
- **shared_river_countries:** `[]`

---

## Cross-Check Log
- **Researcher Source:** Wikipedia river geography infoboxes and maps.
- **Verifier Source:** International River Basin Register and authoritative hydrology databases.
- **Notes:** The Amazon main stem riparian states are strictly PER, COL, BRA. The Nile incorporates all 10 other states historically recognized in its hydrological basin. The Po River drainage basin touches France and Switzerland, but the river main stem flows entirely within Italy, hence flagged `false`.