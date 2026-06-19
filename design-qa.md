**Design QA**

- Source visual truth: `/private/tmp/uz-city-picker-figma.png` (Figma node `75375:37267`)
- Implementation screenshot: `/private/tmp/uz-city-picker-implementation.png`
- Combined comparison: `/private/tmp/uz-city-picker-comparison.png`
- Viewport: `375 x 812`
- State: city picker open, `Звідки` focused, query `Дніпро-Гол`, one matching station

**Full-view comparison evidence**

The reference and implementation were combined side by side at native size. The app-owned surface matches the 62 px status area, 16 px side insets, 343 x 112 route card, 56 px route rows, 190 px results-sheet origin, 32 px sheet radii, 16 px sheet padding, and 343 x 64 result card.

The Figma frame includes an iOS keyboard. The web implementation correctly delegates this to the device's native keyboard; the desktop browser capture does not render OS keyboard chrome.

**Focused region comparison evidence**

The upper 375 x 271 region was reviewed at native scale. Route-card fills and radii, caret placement, back control, switch control, result-card spacing, text weights, and station icon were compared individually. Status, back, and station icons use assets captured directly from the referenced Figma nodes.

**Findings**

- No actionable P0/P1/P2 mismatches remain.
- P3: `UZ Sans` falls back to the system UI stack because the font binary is not present in the project.
- Test gap: desktop automation cannot capture the device-owned mobile keyboard; focus and input behavior were verified through the DOM instead.

**Patches made**

- Replaced the separate picker header and search box with the two-row route card from Figma.
- Removed the extra input focus ring and clear control that were absent from the source frame.
- Replaced approximate status, back, and station icons with exact Figma-derived assets.
- Implemented automatic focus transfer from `Звідки` to `Куди` and close-after-destination behavior.

**Interaction verification**

- Opening `Звідки` focuses an empty input.
- Selecting `Дніпро-Головний` fills the origin and focuses an empty `Куди` input.
- Selecting `Львів` closes the picker.
- The main screen then shows `Дніпро` and `Львів` with their station labels.

**Final result**

final result: passed
