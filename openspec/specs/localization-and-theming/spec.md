# Localization and Theming Specification

## Purpose
Language, text direction and colour mode handling.

## Requirements

### Requirement: Bilingual UI
The app SHALL support English (LTR) and Urdu (RTL), defaulting to Urdu, and SHALL set `lang` and `dir` on the document when the language changes.

#### Scenario: Switch to English
- **WHEN** a user selects English
- **THEN** the document becomes LTR and strings render in English

### Requirement: Light and dark mode
The app SHALL offer light and dark colour modes via a header toggle, persisted in local storage.

#### Scenario: Toggle dark mode
- **WHEN** a user toggles dark mode and reloads
- **THEN** dark mode is still active
