## Context

The design is a Mantine-style UI: white surface, Open Sans, blue accent that can be changed, 4/8px radii, cover cards, and a top navigation bar. The app already uses Mantine, so most of the look comes from the theme.

## Decisions

1. **Theme, not headless.** One Mantine theme (`src/theme`) is rebuilt from the accent colour. `redesign-foundation` proposed headless Mantine with two skins; with a single look and a configurable accent that would mean restyling every component by hand for no gain, so it is superseded.
2. **Accent palette from one hex.** `makeAccentPalette` mixes the colour with white and black into ten shades with the colour itself at the primary shade. The accent is stored as `accent` in local storage.
3. **Urdu font option.** `data-urdu-font="nastaleeq|naskh"` on `<html>` switches the Mantine font variables when the document language is Urdu (`styles/appearance.css`). Nastaleeq stack: Mehr Nastaleeq, Noto Nastaliq Urdu (self-hosted fallback), system. Naskh stack: Segoe UI, Tahoma, Noto Naskh/Sans Arabic. Nastaleeq gets a taller line height.
4. **Colour mode** uses Mantine's colour-scheme manager with `auto` as the default (follow the system); Light, Dark and System are in the header.
5. **Navigation** follows the design (content links in the header) while keeping the routes from `redesign-information-architecture`: Writings, Poetry, Authors, Series and Periodicals are Explore tabs, Shelves is under My Library. The Explore tab strip and category chips remain for screens below 992px.
6. **Data the design assumes but the API may not provide:** `readProgress` on books (progress bars, "Chapter n of m"), chapter `startPage`/`endPage` (page ranges, "Go to page"), library `bookCount`/`authorCount`/`seriesCount`. Each element renders only when the field is present.
7. **Dark colours** are Mantine's own dark palette with the generated accent; the design does not specify a dark mode.
8. **Accessibility:** filled buttons use accent shade 6 with white text (about 4.5:1 for the default blue; lighter accents such as orange and teal are lower, which is the user's choice of colour).

## Risks

- Fields in decision 6 are guesses about the API; confirm names with the API owner.
- Mehr Nastaleeq must be available on `fonts.nawishta.co.uk`; otherwise the Noto fallback is used.
- Very light custom accents give low-contrast buttons.
