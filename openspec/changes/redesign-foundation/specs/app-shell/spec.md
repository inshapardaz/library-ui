## MODIFIED Requirements

### Requirement: Header and footer layouts
The app SHALL provide a redesigned header (brand, primary navigation, search, library switcher, and the skin switcher, language, Urdu font, theme and profile controls; the destinations themselves are defined by `redesign-information-architecture`) and footer for browsing pages, and a minimal header-only layout for immersive reader pages.

#### Scenario: Reading a book
- **WHEN** a user opens `/libraries/12/books/5/read`
- **THEN** the footer is not rendered and the page uses the header-only layout

#### Scenario: Mobile header
- **WHEN** the viewport is narrower than the tablet breakpoint
- **THEN** the primary destinations move to the bottom tab bar defined by `redesign-information-architecture` (Home, Explore, Search, My Library, More), More opens a bottom sheet holding the skin, Urdu font, language, theme and profile controls, and search remains reachable in one tap

## ADDED Requirements

### Requirement: Responsive layout
Every shell element SHALL render without horizontal scrolling from 320px width upward.

#### Scenario: Small phone
- **WHEN** the viewport is 320px wide
- **THEN** no horizontal scrollbar appears on the home page
