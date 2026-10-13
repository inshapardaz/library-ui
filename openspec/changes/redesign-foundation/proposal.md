## Why

The reader app looks like stock Mantine: default palette, system fonts, generic cards and header. It does not convey a premium reading product, and Urdu typography is an afterthought. A redesign needs a shared foundation (tokens, typography, shell) before individual screens are reworked, otherwise each screen will be restyled inconsistently.

## What Changes

- Define a brand identity and design tokens (colour palette, typography scale, spacing, radius, shadow, motion) for light and dark modes.
- Adopt proper Urdu (Nastaleeq) and Latin type pairings with a defined reading-typography scale.
- Centralise tokens in the Mantine theme (`src/App.jsx`) with component default-prop and style overrides; remove ad-hoc styling.
- Redesign the app shell: header, navigation, library switcher, footer, responsive behaviour.
- Establish shared patterns for cards, lists, empty/loading/error states.
- Document a screen-by-screen redesign roadmap; each screen is delivered as its own later change.

Out of scope: individual page redesigns (home, book detail, reader, etc.), backend/API changes, authentication flow, route changes.

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `design-system`: replaces the default-Mantine baseline with a tokenised brand theme and component conventions.
- `app-shell`: redesigned header, navigation and footer with responsive requirements.
- `localization-and-theming`: Urdu typography requirements, RTL parity and dark-mode token coverage.

## Impact

- `src/App.jsx` (theme), new `src/theme/` tokens, global CSS, `src/components/layout/*`, `src/layout/*`.
- Font assets and loading strategy (performance budget).
- Playwright and unit tests for shell, RTL and theme switching.
- No API or route impact.
