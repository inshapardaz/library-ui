## ADDED Requirements

### Requirement: Appearance menu
The header SHALL offer the accent colour (seven presets and a custom colour), the Urdu font (Nastaleeq or Naskh) and the colour mode (Light, Dark, System), and SHALL remember each choice in local storage.

#### Scenario: Choose Naskh
- **WHEN** a user selects Naskh
- **THEN** Urdu text switches to the Naskh stack immediately and the choice survives a reload

#### Scenario: Storage unavailable
- **WHEN** local storage throws
- **THEN** the defaults apply (blue, Nastaleeq, system) and nothing crashes

### Requirement: Colour mode follows the system by default
Until a user chooses Light or Dark, the app SHALL follow the system colour scheme.

#### Scenario: Dark system
- **WHEN** a new visitor's system is dark
- **THEN** the app is dark

### Requirement: Language toggle
The header SHALL show one button that switches to the other language and is labelled with that language's name.

#### Scenario: Switch to Urdu
- **WHEN** a user presses the "اردو" button
- **THEN** the interface is Urdu and right-to-left
