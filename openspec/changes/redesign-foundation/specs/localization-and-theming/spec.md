## ADDED Requirements

### Requirement: Urdu typography
Urdu text SHALL use a Nastaleeq-appropriate typeface with line-height and size tokens tuned for Urdu, selected automatically by the active language.

#### Scenario: Urdu body text
- **WHEN** the language is Urdu
- **THEN** body text uses the Urdu font stack and Urdu line-height token

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
