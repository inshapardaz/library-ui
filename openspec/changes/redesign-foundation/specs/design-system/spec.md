## MODIFIED Requirements

### Requirement: Current baseline appearance
The app SHALL NOT rely on default Mantine appearance. It SHALL use a brand theme with a custom primary palette, defined typography, radius, shadow and spacing tokens, applied in both light and dark colour schemes.

#### Scenario: Baseline reference
- **WHEN** a redesign change proposes new tokens
- **THEN** it is compared against this default-Mantine baseline

#### Scenario: Tokens drive styling
- **WHEN** a primary colour token is changed in the theme
- **THEN** buttons, links, badges and active states update everywhere without per-component edits

## ADDED Requirements

### Requirement: Token source of truth
All colours, font stacks, radii, shadows and spacing used by components SHALL come from theme tokens or Mantine CSS variables; hard-coded values in component styles are not permitted.

#### Scenario: Review a component stylesheet
- **WHEN** a module CSS file is reviewed
- **THEN** it contains no raw hex colours or pixel font sizes outside the token definitions

### Requirement: Shared state patterns
The app SHALL provide consistent loading (skeleton), empty and error presentations reused by all listing and detail screens.

#### Scenario: Empty list
- **WHEN** a listing returns no items
- **THEN** a standard empty state with message and suggested action is shown

### Requirement: Accessibility baseline
Text and interactive elements SHALL meet WCAG 2.2 AA contrast in both colour schemes, show a visible keyboard focus indicator, and honour `prefers-reduced-motion`.

#### Scenario: Keyboard navigation
- **WHEN** a user tabs through the header
- **THEN** each control shows a visible focus ring
