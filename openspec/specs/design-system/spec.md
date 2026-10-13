# Design System Specification

## Purpose
Single source of visual styling: theme, component conventions and styling rules.

## Requirements

### Requirement: Single Mantine theme
The app SHALL define one Mantine theme in `src/App.jsx`; component-specific styling SHALL live in sibling `*.module.css` files.

#### Scenario: Adding a style override
- **WHEN** a developer needs a global colour or radius change
- **THEN** it is made in the shared theme rather than per component

### Requirement: Current baseline appearance
The current UI SHALL be treated as using Mantine defaults with a 0.9 scale and no custom fonts, palette or component defaults. This baseline is superseded by the redesign changes.

#### Scenario: Baseline reference
- **WHEN** a redesign change proposes new tokens
- **THEN** it is compared against this default-Mantine baseline
