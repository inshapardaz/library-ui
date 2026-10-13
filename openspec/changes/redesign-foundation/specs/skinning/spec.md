## ADDED Requirements

### Requirement: Built-in skins
The app SHALL ship two skins, Classic and Literary, each defining the complete token contract for light and dark colour modes.

#### Scenario: Both skins complete
- **WHEN** either skin is active in light or dark mode
- **THEN** every shell and shared component renders with that skin's tokens and no unstyled elements

### Requirement: Skin switcher for all users
The app SHALL provide a skin switcher in the shell that is available to every user, and switching SHALL apply immediately without a page reload.

#### Scenario: Switch skin
- **WHEN** a user selects the Literary skin
- **THEN** the interface restyles immediately and the choice is saved in local storage

### Requirement: Skin persistence
The selected skin SHALL be restored from local storage before first paint, and a default skin SHALL apply when none is stored or storage is unavailable.

#### Scenario: Reload
- **WHEN** a user who chose Literary reloads the app
- **THEN** Literary is applied on first paint with no flash of another skin

### Requirement: Skins change styling only
A skin SHALL change appearance through design tokens and scoped style overrides and SHALL NOT change component markup, behaviour or routes.

#### Scenario: Behaviour parity
- **WHEN** the skin is switched
- **THEN** the page content, focus position and scroll position are preserved

### Requirement: Skin and language independence
Skins SHALL work in both LTR and RTL, and in both Urdu font options.

#### Scenario: Urdu with Literary skin
- **WHEN** the language is Urdu, the skin is Literary and the font option is Naskh
- **THEN** layout is mirrored and text uses the Naskh stack with the skin's tokens
