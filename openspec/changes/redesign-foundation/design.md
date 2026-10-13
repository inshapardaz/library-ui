## Context

Mantine 8 with CSS modules and postcss-preset-mantine. Theme is created inline in `App.jsx` with only `scale: 0.9`. Urdu is the default language; `fontFamily` is commented out. Dark mode is toggled via redux `uiSlice.mode`, persisted in local storage. There is no design file; design is done in code. The app must be skinnable.

## Goals / Non-Goals

**Goals:** a distinctive, coherent look; two selectable skins (Classic, Literary); tokens as the single source of truth; equal-quality Urdu/English; light/dark parity; fast on modern mobile browsers.
**Non-Goals:** replacing Mantine; redesigning individual page content in this change; user-authored or remotely loaded skins; server-side preference storage.

## Decisions

1. **Headless Mantine + owned base stylesheet.** Use `<MantineProvider headless>` so Mantine ships no CSS. A single structural base stylesheet (layout, spacing, focus, state styles for every Mantine component in use) is written against Mantine's stable class names and CSS variables. Rationale: skins become pure CSS and no Mantine default styling leaks through. Trade-off: all components in use (Button, Modal, Drawer, Menu, Carousel, Spotlight, Notifications, inputs, etc.) must be styled by us; track in tasks.
2. **Skin = tokens + scoped overrides.** Each skin lives in `src/skins/<name>/` and is activated by `data-skin="classic|literary"` on `<html>`. A skin defines the full token contract (colours for light and dark, font stacks, radius, shadow, spacing, motion) as CSS variables and may add component overrides scoped under its attribute. Skins never change markup. Switching is instant, with no reload.
3. **Two built-in skins.** *Classic*: restrained, traditional book-like feel (serif-leaning, muted warm neutrals, subtle borders). *Literary*: expressive, editorial feel (stronger typographic contrast, richer accent, more whitespace). Exact palettes are decided during implementation and reviewed visually.
4. **Mantine theme stays minimal** in `src/theme/` (breakpoints, default props, font keys). Colour and typography come from skin tokens, not from the Mantine palette. `CLAUDE.md` is updated to point here instead of "single theme in App.jsx".
5. **Urdu font option** independent of skin and colour mode: `uiSlice.urduFont = 'nastaleeq' | 'naskh'`, applied as `data-urdu-font` on `<html>`. Nastaleeq uses Mehr Nastaleeq (self-hosted, subset, `font-display: swap`). Naskh uses the Segoe UI system stack with `Noto Naskh Arabic`/system fallbacks, because Segoe UI is not available on all platforms. Each option has its own line-height and size tokens. Reader font selection stays separate and user-selectable.
6. **Persistence:** skin, colour mode, language and Urdu font are stored in local storage and restored before first paint (inline bootstrap in `index.html`) to avoid a flash of the wrong skin. Reads and writes are try/caught; defaults apply if storage is unavailable.
7. **Colour mode:** default to the OS `prefers-color-scheme` when no stored choice; manual choice overrides.
8. **Logical CSS properties only** (`margin-inline-start`, etc.) so one stylesheet serves LTR and RTL.
9. **Browser support:** current evergreen browsers (last 2 versions of Chrome, Edge, Firefox, Safari) plus iOS Safari and Android Chrome. Modern CSS is allowed (`light-dark()`, `:has()`, container queries, CSS nesting); no legacy polyfills. Vite `build.target` set accordingly.
10. **Incremental delivery:** foundation first, then one change per screen group (shell → home → listings → detail → reader).

## Risks / Trade-offs

- Headless means a large initial styling effort and risk of unstyled/regressed components → inventory every Mantine component in use first; Playwright screenshot checks on key routes across skin × mode × language.
- Font weight vs. performance on mobile → subset, preload only the active language's primary font, define a size budget.
- Mehr Nastaleeq licence/redistribution unverified → confirm before self-hosting; Naskh option is the fallback.
- Two skins double visual QA → shared token contract and automated matrix tests.
- Flash of default skin on load → blocking bootstrap script sets `data-skin`, `data-urdu-font` and colour mode.

## Open Questions

- Exact Classic and Literary palettes and type pairings (resolved by visual review during implementation).
- Which skin is the default for first-time visitors?
