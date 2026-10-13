> **Superseded** by `apply-nawishta-design`: the design is a themed Mantine UI with one look and a configurable accent, so headless Mantine and two skins are no longer pursued. Kept for history.

## Why

The reader app looks like stock Mantine: default palette, system fonts, generic cards and header. It does not convey a premium reading product, and Urdu typography is an afterthought. A redesign needs a shared foundation (skinnable styling architecture, tokens, typography, shell) before individual screens are reworked, otherwise each screen will be restyled inconsistently.

## What Changes

- Run Mantine in **headless mode** (`<MantineProvider headless>`): keep Mantine's component behaviour, own all visual styling in an app-owned base stylesheet.
- Introduce **skins**: a skin is a set of design tokens plus scoped overrides. Ship two built-in skins, **Classic** and **Literary**, switchable at runtime by every user.
- Define design tokens (colour, typography, spacing, radius, shadow, motion) for light and dark modes, per skin.
- Add a user-selectable **Urdu font option**: Mehr Nastaleeq (Nastaleeq) or Naskh (Segoe UI stack).
- Persist all UI choices (skin, colour mode, language, Urdu font) in local storage.
- Redesign the app shell: header, navigation, library switcher, footer, skin switcher, responsive behaviour.
- Establish shared patterns for cards, lists, empty/loading/error states.
- Target modern evergreen browsers and mobile; no legacy polyfills.
- Document a screen-by-screen redesign roadmap; each screen is delivered as its own later change.

Out of scope: individual page redesigns (home, book detail, reader, etc.), runtime loading of custom/third-party skins, per-account (server-side) preference storage, backend/API changes, authentication flow, route changes.

## Capabilities

### New Capabilities
- `skinning`: selectable, token-driven skins (Classic, Literary) applied on top of a headless Mantine base.

### Modified Capabilities
- `design-system`: replaces the default-Mantine baseline with headless Mantine, an owned base stylesheet and token-driven styling.
- `app-shell`: redesigned header, navigation, skin switcher and footer with responsive requirements.
- `localization-and-theming`: Urdu typography and font option, RTL parity, dark-mode token coverage, persisted UI choices, browser support.

## Impact

- `src/App.jsx` (provider setup), new `src/theme/` (Mantine theme, minimal) and `src/skins/<skin>/` (tokens + overrides), base stylesheet, `src/components/layout/*`, `src/layout/*`, `src/store/slices/uiSlice.js` (skin, Urdu font).
- Every Mantine component in the app needs base styling once headless is enabled (largest piece of work).
- Font assets and loading strategy (performance budget); Mehr Nastaleeq licence check.
- `CLAUDE.md` conventions (theme location changes).
- Vite `build.target`, browserslist.
- Playwright and unit tests for shell, RTL, skins and theme switching.
- No API or route impact.
