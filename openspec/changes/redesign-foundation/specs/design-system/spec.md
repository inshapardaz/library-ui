## MODIFIED Requirements

### Requirement: Current baseline appearance
The app SHALL NOT rely on default Mantine appearance. Mantine SHALL run in headless mode, and all visual styling SHALL come from an app-owned base stylesheet and the active skin's design tokens, in both light and dark colour schemes.

#### Scenario: Baseline reference
- **WHEN** a redesign change proposes new tokens
- **THEN** it is compared against this default-Mantine baseline

#### Scenario: Tokens drive styling
- **WHEN** a primary colour token is changed in a skin
- **THEN** buttons, links, badges and active states update everywhere without per-component edits

## ADDED Requirements

### Requirement: Token source of truth
All colours, font stacks, radii, shadows and spacing used by components SHALL come from skin tokens (CSS variables); hard-coded values in component styles are not permitted.

#### Scenario: Review a component stylesheet
- **WHEN** a module CSS file is reviewed
- **THEN** it contains no raw hex colours or pixel font sizes outside the token definitions

### Requirement: Full component coverage under headless
Every Mantine component used in the app SHALL have base styling so that none renders unstyled.

#### Scenario: Modal and menu
- **WHEN** a modal, drawer, menu or notification is shown
- **THEN** it is styled by the base stylesheet and active skin

### Requirement: Shared state patterns
The app SHALL provide consistent loading (skeleton), empty and error presentations reused by all listing and detail screens.

#### Scenario: Empty list
- **WHEN** a listing returns no items
- **THEN** a standard empty state with message and suggested action is shown

### Requirement: Accessibility baseline
Text and interactive elements SHALL meet WCAG 2.2 AA contrast in both colour schemes and every skin, show a visible keyboard focus indicator, and honour `prefers-reduced-motion`.

#### Scenario: Keyboard navigation
- **WHEN** a user tabs through the header
- **THEN** each control shows a visible focus ring
