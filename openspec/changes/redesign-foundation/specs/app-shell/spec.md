## MODIFIED Requirements

### Requirement: Header and footer layouts
The app SHALL provide a redesigned header (brand, primary navigation, search, library switcher, language, theme and profile controls) and footer for browsing pages, and a minimal header-only layout for immersive reader pages.

#### Scenario: Reading a book
- **WHEN** a user opens `/libraries/12/books/5/read`
- **THEN** the footer is not rendered and the page uses the header-only layout

#### Scenario: Mobile header
- **WHEN** the viewport is narrower than the tablet breakpoint
- **THEN** primary navigation collapses into a drawer and search remains reachable in one tap

## ADDED Requirements

### Requirement: Responsive layout
Every shell element SHALL render without horizontal scrolling from 320px width upward.

#### Scenario: Small phone
- **WHEN** the viewport is 320px wide
- **THEN** no horizontal scrollbar appears on the home page
