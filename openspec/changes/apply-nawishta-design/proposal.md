## Why

The design for the new site (a Mantine-style interface with a user-chosen accent colour, an Urdu font choice, light/dark/system modes, a content navigation bar, cover cards with reading progress, and richer book, search and landing pages) is ready. This change applies it to the app. It supersedes the earlier `redesign-foundation` direction (headless Mantine with two fixed skins): the design is a themed Mantine UI with one look and a configurable accent, which Mantine's theme handles without styling every component by hand.

## What Changes

- **Theme:** Open Sans, Mantine's gray scale, a small radius scale, and an accent palette generated at runtime from one hex colour. Choices (accent, Urdu font, colour mode) persist in local storage; colour mode follows the system by default.
- **Header:** brand with the libraries menu, a Books categories menu and content links (Writings, Poetry, Authors, Series, Shelves, Periodicals), colour mode, appearance, language toggle, search and profile. Below 992px the bottom tab bar replaces the content links.
- **Explore:** sidebar with favorites, recent reads, search, advanced-search link and categories (books); counts and categories (writings, poetry); frequency (periodicals). Cover cards with reading progress; rows for writings and poetry; entity cards for authors, series and periodicals.
- **Book page:** back link, cover, byline with series position, category and public-domain tags, description, reading-progress card, Resume/Read, chapters, files, bookmarks, details.
- **Issue page:** cover, issue facts, Read issue, articles.
- **Advanced search:** a form over the filters the API supports, kept in the URL.
- **Landing:** hero, library statistics and library cards (public/members, counts).
- Not built (no backend support today): Collections, Statistics, Upload, publisher and year-range filters, reading-status filter, month-level periodical timeline, cross-library "recently added" and category browsing.

## Capabilities

### New Capabilities
- `explore`: unchanged from `redesign-information-architecture`; extended by delta here with the sidebar and cover-card requirements.

### Modified Capabilities
- `design-system`: accent-driven Mantine theme.
- `localization-and-theming`: appearance settings, Urdu font option, colour mode.
- `app-shell`: header content and the tab-bar breakpoint.
- `content-detail`: book page sections and progress.

## Impact

- `src/theme/`, `src/styles/appearance.css`, `src/store/slices/uiSlice.js`, `src/App.jsx`.
- `src/components/layout/*` (header, appearance controls, more drawer, footer), `src/pages/explore`, `src/pages/books/book.jsx`, `src/pages/advancedSearchPage.jsx`, `src/pages/homePage.jsx`, card and row components.
- New dependencies: `@fontsource-variable/open-sans`, `@fontsource-variable/noto-nastaliq-urdu` (self-hosted, OFL).
- Playwright config now targets the dev server port (4400) and tests run against a mocked API.
