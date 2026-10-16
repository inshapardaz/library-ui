# CLAUDE.md

This file guides Claude Code (and other agents) working in this repository.

## Project overview

Nawishta Library UI — the reader-facing frontend for the Inshapardaz library platform. Lets users
browse libraries, authors, series, books, periodicals, poetry and "writings" (articles), read books
(page-scan and ebook readers), and manage favorites/bookshelves. It talks to the separate
Inshapardaz backend API (`API_URL` in [src/config.js](src/config.js)) and to a separate main site
for authentication (`MAIN_SITE`).

- **Framework**: React 18 (JS, no TypeScript), built with Vite
- **UI library**: [Mantine v8](https://mantine.dev/) (`@mantine/core`, `form`, `hooks`, `modals`,
  `notifications`, `spotlight`, `carousel`)
- **State/data**: Redux Toolkit + RTK Query (one API slice per backend resource)
- **Routing**: react-router-dom v6
- **i18n**: react-i18next, English + Urdu (RTL via Mantine `DirectionProvider`)
- **Tests**: Vitest (unit/component) and Playwright (end to end, against a mocked API)

## Commands

```bash
npm start          # vite dev server on port 4400
npm run build       # vite build
npm run lint         # eslint .
npm test              # playwright e2e tests
npm run test:debug     # playwright UI mode
```

There is no typecheck script. `lint`, `test:unit` (Vitest) and `test` (Playwright) are the automated
checks. Run `npm run lint` and `npm run test:unit` after changes; run `npm test` when touching routed
pages, navigation, access rules or appearance. The Playwright specs stub the API with
[tests/support/mockApi.js](tests/support/mockApi.js), so no backend is needed. If the browser
Playwright expects is not installed, point `PW_CHROMIUM_PATH` at an installed Chromium.

## Mantine — read this before touching UI code

This app is built almost entirely from Mantine v8 components/hooks rather than custom CSS. Before
adding new UI, check whether Mantine already has the component/prop/hook you need instead of hand-rolling it.

- Core docs: https://mantine.dev/core/package/
- Component index: https://mantine.dev/getting-started/
- Hooks (`@mantine/hooks`): https://mantine.dev/hooks/use-disclosure/ (browse sidebar for the full list)
- Forms (`@mantine/form`): https://mantine.dev/form/use-form/
- Notifications (`@mantine/notifications`): https://mantine.dev/x/notifications/
- Modals (`@mantine/modals`): https://mantine.dev/x/modals/
- Spotlight (`@mantine/spotlight`): https://mantine.dev/x/spotlight/
- Carousel (`@mantine/carousel`): https://mantine.dev/x/carousel/
- Theming / `createTheme` / style props / CSS variables: https://mantine.dev/theming/theme-object/
- Styling with CSS modules + `postcss-preset-mantine` (used throughout this repo): https://mantine.dev/styles/css-modules/

Conventions already in use — follow them rather than introducing new patterns:

- Component-scoped styles live in a sibling `*.module.css` file (e.g. `appHeader.jsx` +
  `appHeader.module.css`), imported and used via CSS Modules, not styled-components or inline `sx`.
- The single shared Mantine theme is built by `createAppTheme` in [src/theme/index.js](src/theme/index.js)
  and passed to `MantineProvider` in [src/App.jsx](src/App.jsx). The primary colour is a palette
  generated from the user's accent ([src/theme/accent.js](src/theme/accent.js)), so use the
  `accent` colour (`c="accent"`, `--mantine-color-accent-*`, `--mantine-primary-color-filled`)
  rather than hard-coded blues. Add theme overrides there rather than per-component.
- Appearance choices (accent, Urdu font, colour mode) are user settings kept in local storage:
  accent and Urdu font in [src/store/slices/uiSlice.js](src/store/slices/uiSlice.js), colour mode
  by Mantine (default: follow the system). The Urdu typeface is the `data-urdu-font` attribute on
  `<html>`, styled in [src/styles/appearance.css](src/styles/appearance.css).
- App-wide providers are already wired in `App.jsx`: `MantineProvider`, `DirectionProvider` (RTL
  support for Urdu), `ModalsProvider`, `Notifications`. Use the existing `notifications` helpers in
  [src/utils/notifications.js](src/utils/notifications.js) (`error/success/warning/info`) instead of
  calling `@mantine/notifications` directly.
- Route-level layout is via Mantine `AppShell` — see
  [src/layout/layoutWithHeaderAndFooter.jsx](src/layout/layoutWithHeaderAndFooter.jsx).

## Architecture

```
src/
  pages/         route-level screens, one folder per domain (books, authors, series, periodicals, ...)
  components/    reusable UI pieces, mirrors the pages/ domain folders
  layout/        AppShell-based page layouts + route guards (protectedRoute.jsx, readingGate.jsx)
  store/         Redux Toolkit store; store/slices has one RTK Query "api" slice per backend resource
                 plus authSlice (auth) and uiSlice (language/theme prefs)
  utils/         axios instances + interceptors, RTK Query base query, notification helpers
  contexts/      React context(s) — currently LibraryContext (current library id/data)
  models/        plain JS enums/constants mirrored from the backend (status enums, etc.)
  i18n/          react-i18next setup, en.js / ur.js translation dictionaries
  hooks/         custom hooks (currently just useTouchSlide)
```

Key flows:

- **Auth**: cookie-based refresh tokens (`js-cookie`) with the login/registration UI living on a
  *separate* site (`MAIN_SITE`). This app only reads the session: `axiosPrivate` (see
  [src/utils/axios.helpers.js](src/utils/axios.helpers.js)) auto-refreshes on 401 via a mutex-guarded
  shared refresh promise, and redirects to `MAIN_SITE/account/login` on refresh failure.
  Browsing is public. [src/layout/protectedRoute.jsx](src/layout/protectedRoute.jsx) guards the
  routes that need a login (readers, My Library) and redirects unauthenticated users the same
  way; [src/layout/readingGate.jsx](src/layout/readingGate.jsx) lets poetry/writing readers
  through anonymously when the library's `allowPublicAccessToWritings` flag is true. Requests
  from signed-out visitors are flagged in `axiosBaseQuery` so a 401 never redirects them.
- **Data fetching**: every backend resource has its own RTK Query slice under `store/slices`
  (`books.api.js`, `authors.api.js`, ...), each wired into `configureStore` in
  [src/store/index.js](src/store/index.js) individually (reducer + middleware). New resources follow
  this same copy-paste pattern.
- **Multi-library**: most routes are nested under `/libraries/:libraryId/...`; the current library is
  fetched once in the layout (`src/layout/libraryScope.jsx`) and exposed via `LibraryContext`. The
  site root opens the only / last-used library (`src/utils/libraryStorage.js`). A private library
  answers 403 to everyone, so the auth state decides between "sign in" and the 403 page.
- **Site structure**: Home, Explore (`/explore/:type` with tabs), Search, My Library (`/my/:section`)
  and More; one `SiteHeader` plus a mobile `BottomTabBar`. Old list URLs redirect through
  `src/utils/legacyRedirects.js`.
- **Environment/config**: [src/config.js](src/config.js) reads `API_URL`/`MAIN_SITE`/`NODE_ENV` (plus the app-switcher links `LIBRARIES_URL`/`LIBRARY_EDITOR_URL`/`DICTIONARY_URL`; the header logo links to `MAIN_SITE`) at
  runtime from `window.__ENV__` (served as `/env-config.js`, generated by the container at startup
  from env vars — see `config/docker/40-env-config.sh`), falling back to `VITE_*` vars and then
  localhost defaults for local dev.

## Conventions to follow

- Functional components + hooks only; no class components.
- `PropTypes` for prop validation (not consistently applied — see improvement tasks below).
- Path alias `@` → `src/` (configured in [vite.config.js](vite.config.js)); prefer `@/...` imports
  over relative `../../..` paths.
- One barrel `index.js` per `pages/<domain>` and some `components/<domain>` folders re-exporting the
  public components — check for an existing barrel before adding new import paths.
- Translation strings go through `react-i18next` (`useTranslation`), added to both
  [src/i18n/en.js](src/i18n/en.js) and [src/i18n/ur.js](src/i18n/ur.js) — don't hardcode
  user-facing strings.

## How to make changes

- Make sure the repository is up-to-date with remote main branch. Pull and rebase if required.
- Create a new branch for changes
- Commit with the issue number in the commit message
- Create a PR from the branch
- Do not close the issue once the issue is resolved locally. Wait for green build and PR merge to main branch for closing issue
- Push all code changes to remote

## Suggested improvement tasks

Findings from an architecture review, roughly ordered by impact. Status noted per item — this is a
living backlog, not a fresh audit.

1. ~~**Bug: `markBookAsRead` posts to the favorite link, not a read link**~~ — **Resolved.** The
   `markBookAsRead` mutation reusing `book.links.create_favorite` no longer exists in
   `src/store/slices/books.api.js`.
2. **No unit/component test coverage** — Vitest is now configured (`npm run test:unit`) with 26
   tests across 4 files covering `utils/` and the auth/ui Redux slices, but coverage is still
   partial. Still open; pick it up incrementally as new business logic is added rather than as one
   large PR.
3. ~~**Runtime host-sniffing for environment config**~~ — **Resolved** (#29). `src/config.js` now
   reads `import.meta.env.VITE_*` / a runtime `window.__ENV__` instead of sniffing
   `window.location.host`.
4. ~~**Inconsistent `PropTypes` coverage**~~ — **Resolved.** `eslint-plugin-react`'s recommended
   config (already wired into `eslint.config.js`) enables `react/prop-types` as an error, and the
   repo currently lints clean — components that don't declare `propTypes` don't use undeclared
   props.
5. **No route-level code splitting** — still open, out of scope for the current cleanup pass.
6. ~~**No top-level error boundary**~~ — **Resolved.** `src/components/layout/errorBoundary.jsx`
   wraps `router.jsx`'s `<Routes>` and renders `Error500Page` on an uncaught render error.
7. ~~**Store wiring is repetitive and easy to get out of sync**~~ — **Resolved.**
   `src/store/index.js` now collects all api slices into one array and derives `reducer` and
   `middleware` from it.
8. ~~**CI doesn't lint or gate on it**~~ — **Resolved.**
   [.github/workflows/playwright.yml](.github/workflows/playwright.yml) now runs a
   `lint-and-unit-test` job (`npm run lint` + `npm run test:unit`) that the Playwright job depends on.
9. **No Storybook/visual catalog** — **Won't fix.** Considered and declined; not worth the added
   devDependency/tooling surface for this repo right now.
10. ~~**`console.log` calls left in production config path**~~ — **Resolved** alongside item 3; the
    runtime-env rewrite of `src/config.js` dropped the `console.log` calls entirely.
