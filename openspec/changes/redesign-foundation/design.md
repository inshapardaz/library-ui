## Context

Mantine 8 with CSS modules and postcss-preset-mantine. Theme is created inline in `App.jsx` with only `scale: 0.9`. Urdu is the default language; `fontFamily` is commented out. Dark mode is toggled via redux `uiSlice.mode`.

## Goals / Non-Goals

**Goals:** a distinctive, coherent look; tokens as the single source of truth; equal-quality Urdu/English; light/dark parity; fast on mobile.
**Non-Goals:** replacing Mantine; redesigning individual page content in this change.

## Decisions

1. **Tokens in `src/theme/`** (colors, typography, components) composed into one `createTheme` call. Rationale: keeps `App.jsx` small and lets CSS modules use Mantine CSS variables.
2. **Custom 10-shade primary palette + semantic roles** (surface, text, accent, success/error), defined for both colour schemes using `light-dark()` / Mantine color-scheme variables.
3. **Typography:** separate font stacks for Urdu (Nastaleeq-based, larger line-height) and Latin, selected via `lang`; self-hosted, `font-display: swap`, subsetted. Reader fonts remain user-selectable.
4. **Logical CSS properties only** (`margin-inline-start`, etc.) so one stylesheet serves LTR and RTL.
5. **Component defaults via `theme.components`** (Button, Card, Badge, TextInput, Modal) rather than per-usage props.
6. **Incremental delivery:** foundation first, then one change per screen group (shell → home → listings → detail → reader).

## Risks / Trade-offs

- Font weight vs. performance on slow networks → subset, preload only the active language's primary font, budget in tasks.
- Visual regressions on untouched pages when theme changes → Playwright screenshot checks on key routes, both languages and modes.
- Brand direction is undecided → see open questions; tokens are isolated so palette can change cheaply.

## Open Questions

- Brand direction: references, preferred mood (classic/literary vs. modern/minimal), logo status?
- Which Urdu typeface(s) are licensed/acceptable (e.g. Noto Nastaliq Urdu, Jameel Noori, Mehr Nastaleeq — already referenced in code)?
- Is a visual design (Figma) planned, or is design done in code?
- Browser/device support floor?
