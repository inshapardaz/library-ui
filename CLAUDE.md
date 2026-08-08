# CLAUDE.md

This file guides Claude Code (and other agents) working in this repository.

## Project overview

Nawishta Library UI — the reader-facing frontend for the Inshapardaz library platform. Lets users
browse libraries, authors, series, books, periodicals, poetry and "writings" (articles), read books
(page-scan and ebook readers), and manage favorites/bookshelves. It talks to the separate
Inshapardaz backend API (`API_URL` in [src/config.js](src/config.js)) and to a separate main site
for authentication (`MAIN_SITE`).

- **Framework**: React 18 (JS, no TypeScript), built with Vite
- **UI library**: [Mantine v7](https://mantine.dev/) (`@mantine/core`, `form`, `hooks`, `modals`,
  `notifications`, `spotlight`, `carousel`)
- **State/data**: Redux Toolkit + RTK Query (one API slice per backend resource)
- **Routing**: react-router-dom v6
- **i18n**: react-i18next, English + Urdu (RTL via Mantine `DirectionProvider`)
- **E2E tests**: Playwright (minimal coverage today — see Architecture notes)

## Commands

```bash
npm start          # vite dev server on port 4400
npm run build       # vite build
npm run lint         # eslint .
npm test              # playwright e2e tests
npm run test:debug     # playwright UI mode
```

There is no unit-test runner and no typecheck script — `lint` and `test` (Playwright) are the only
automated checks. Run `npm run lint` after changes; run `npm test` when touching routed pages or
flows Playwright already covers (currently just the home page, see
[tests/specs/homePage.spec.js](tests/specs/homePage.spec.js)).

## Mantine — read this before touching UI code

This app is built almost entirely from Mantine v7 components/hooks rather than custom CSS. Before
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
- The single shared Mantine theme is created once in [src/App.jsx](src/App.jsx) via `createTheme`.
  Add theme overrides there rather than per-component.
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
  layout/        AppShell-based page layouts + route guards (securePage.jsx)
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
  [src/layout/securePage.jsx](src/layout/securePage.jsx) is a route guard that redirects
  unauthenticated users the same way.
- **Data fetching**: every backend resource has its own RTK Query slice under `store/slices`
  (`books.api.js`, `authors.api.js`, ...), each wired into `configureStore` in
  [src/store/index.js](src/store/index.js) individually (reducer + middleware). New resources follow
  this same copy-paste pattern.
- **Multi-library**: most routes are nested under `/libraries/:libraryId/...`; the current library is
  fetched once in the layout and exposed via `LibraryContext` (see `layoutWithHeaderAndFooter.jsx`).
- **Environment/config**: [src/config.js](src/config.js) picks `API_URL`/`MAIN_SITE`/`NODE_ENV` by
  pattern-matching `window.location.host` at runtime, rather than using Vite's `import.meta.env` /
  `.env` files.

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

## Suggested improvement tasks

Findings from an architecture review, roughly ordered by impact. None of these are done yet —
treat this as a backlog, not a status report.

1. **Bug: `markBookAsRead` posts to the favorite link, not a read link** —
   [src/store/slices/books.api.js:155-163](src/store/slices/books.api.js:155) reuses
   `book.links.create_favorite` for the new `markBookAsRead` mutation. Verify what link the backend
   actually exposes for "mark as read" and fix, or the feature silently favorites instead of marking read.
2. **No unit/component test coverage** — only one Playwright e2e spec exists
   ([tests/specs/homePage.spec.js](tests/specs/homePage.spec.js)); there is no unit-test runner
   (Vitest/Jest) at all. Business logic in `utils/` (axios interceptors, `parseResponse`) and Redux
   slices/reducers currently has zero automated coverage.
3. **Runtime host-sniffing for environment config** — `src/config.js` branches on
   `window.location.host` strings to pick API URLs instead of using Vite's built-in `.env` /
   `import.meta.env` mechanism. This is fragile (breaks on new domains/previews), can't be overridden
   per-deploy without a code change, and isn't type-checked. Move to `.env.development` /
   `.env.production` + `import.meta.env.VITE_*`.
4. **Inconsistent `PropTypes` coverage** — only 85 of 125 `.jsx` files declare `propTypes`. Either
   enforce it repo-wide (add an eslint rule, e.g. `react/prop-types` is already available via
   `eslint-plugin-react`) or migrate incrementally to TypeScript for compile-time safety instead.
5. **No route-level code splitting** — [src/router.jsx](src/router.jsx) imports every page eagerly
   from the `Pages` barrel. With ~30 routes across many domains, this likely inflates the initial JS
   bundle. Convert page imports to `React.lazy` + `Suspense` (Mantine `Loader` is already used
   elsewhere in `App.jsx` for a similar loading state).
6. **No top-level error boundary** — there's no `ErrorBoundary` anywhere in `src/`; the app has
   dedicated 403/404/500 pages but nothing catches unhandled render errors to show them. Add a root
   error boundary around `<Router />` (or per-layout) that renders `Error500Page`.
7. **Store wiring is repetitive and easy to get out of sync** — [src/store/index.js](src/store/index.js)
   manually lists every api slice's reducer *and* middleware; adding a new `*.api.js` slice requires
   remembering to touch two separate places. Consider a small helper that collects all api slices and
   reduces over them for both `reducer` and `middleware.concat(...)`.
8. **CI doesn't lint or gate on it** — [.github/workflows/playwright.yml](.github/workflows/playwright.yml)
   only runs Playwright; `npm run lint` (and any future unit tests) aren't run in CI, so lint failures
   can merge un-caught even though `pre-commit` runs lint locally.
9. **No Storybook/visual catalog** for the sizeable shared component library under `src/components`,
   making it harder to review new Mantine-based components in isolation or catch visual regressions.
10. **`console.log` calls left in production config path** — `src/config.js` logs the resolved
    environment and API host on every load; consider gating behind `import.meta.env.DEV` once config
    is migrated to Vite env vars (see item 3).
