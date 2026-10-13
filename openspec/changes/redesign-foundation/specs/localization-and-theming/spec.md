## ADDED Requirements

### Requirement: Urdu font option
The app SHALL let users choose the Urdu typeface: Mehr Nastaleeq (Nastaleeq) or Naskh (Segoe UI stack). Each option SHALL have its own line-height and size tokens, and the choice SHALL apply only while Urdu is active.

#### Scenario: Choose Naskh
- **WHEN** an Urdu user selects Naskh
- **THEN** body text switches to the Naskh stack and its line-height token without reload

### Requirement: Persisted UI choices
Skin, colour mode, language and Urdu font choices SHALL be persisted in local storage and applied before first paint. If storage is unavailable the app SHALL fall back to defaults without error.

#### Scenario: Storage blocked
- **WHEN** local storage access throws
- **THEN** the app renders with default choices and no crash

### Requirement: Direction parity
Every shell and shared component SHALL be correct in both LTR and RTL, using logical properties and mirroring directional icons.

#### Scenario: Back arrow in RTL
- **WHEN** the language is Urdu
- **THEN** back/forward icons point in the RTL-correct direction

### Requirement: System colour scheme
The app SHALL default to the OS colour scheme when the user has not chosen one, and a manual choice SHALL override it.

#### Scenario: First visit with dark OS
- **WHEN** a new user with a dark OS theme opens the app
- **THEN** dark mode is applied

### Requirement: Browser support
The app SHALL support current evergreen desktop browsers (Chrome, Edge, Firefox, Safari) and mobile browsers (iOS Safari, Android Chrome), and SHALL NOT ship legacy-browser polyfills.

#### Scenario: Mobile Safari
- **WHEN** the app is opened in current iOS Safari
- **THEN** layout, skins, RTL and font options work as on desktop
