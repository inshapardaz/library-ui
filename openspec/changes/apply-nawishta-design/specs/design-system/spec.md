## ADDED Requirements

### Requirement: Accent-driven theme
The app SHALL use one Mantine theme whose primary colour is generated from a user-chosen accent colour, so that buttons, links, tabs, badges and focus states change together.

#### Scenario: Change the accent
- **WHEN** a user picks orange in the appearance menu
- **THEN** the primary colour of every Mantine component becomes orange without a reload

#### Scenario: Custom accent
- **WHEN** a user picks any six-digit hex colour with the colour input
- **THEN** it is applied as the accent and remembered

### Requirement: Typography
The interface SHALL use Open Sans, self-hosted, with bold headings.

#### Scenario: No third-party font request
- **WHEN** the app loads
- **THEN** Open Sans is served from the app's own assets
