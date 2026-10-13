## Why

The site structure mirrors the backend, not reader tasks. `/` is a hero whose only job is to force a library choice; everything useful lives under `/libraries/:id/...`; the header changes shape inside a library and carries three category mega-menus plus six content-type links; a reader's own things (favorites, shelves, bookmarks, notes, history) are scattered as filters and separate pages; Home shows only books; external tools (dictionary, fonts, tools, editor) are mixed into primary navigation; and every browsing route requires login. The redesign should reorganise the site around what readers want to do, not just restyle it.

## What Changes

- Replace the current navigation with five global destinations: **Home**, **Explore**, **Search**, **My Library**, **More**; a bottom tab bar on mobile, a single consistent header on desktop. The same shell is used inside and outside a library.
- **Explore**: one page with tabs (Books, Writings, Poetry, Periodicals, Authors, Series) and shared filters (category, sort, and type-specific filters), replacing six separate listing entries and the category mega-menus.
- **Home** becomes a discovery page for the current library: continue reading, new arrivals, poetry, writings, featured authors, browse by category.
- **My Library** becomes one hub: continue reading, favorites across all types, bookshelves, bookmarks and notes, reading history.
- **Search** becomes a global control (always visible, keyboard shortcut palette) with grouped results.
- Library selection becomes a switcher (under More / header) instead of a landing hurdle; the last used library is remembered and opened directly.
- Content detail pages share one template (header, primary action, secondary actions, tabs for About / Contents / Related).
- External sites (dictionary, fonts, tools, editor) move under **More** and the footer.
- Browsing becomes public; login is required only for My Library, favorites, bookshelves, bookmarks, notes and progress. **BREAKING** (behavioural): previously unauthenticated users were always redirected to login.
- Introduce new canonical URLs; every existing URL keeps working through redirects. **BREAKING** for bookmarked/deep links only if redirects regress.

Out of scope: visual styling, skins and tokens (see `redesign-foundation`); reader internals (page/ebook reader behaviour); backend API changes; login/registration UI (lives on the main site); recommendation algorithms beyond what existing endpoints provide.

## Capabilities

### New Capabilities
- `site-navigation`: global destinations, mobile/desktop navigation model, URL scheme and legacy redirects, library persistence.
- `explore`: unified, filterable browsing across all content types.

### Modified Capabilities
- `app-shell`: library-scoped routing and the authentication gate (public browsing, protected personal areas).
- `discovery-and-browsing`: library selection, content listings (moved into Explore), Home highlights.
- `personal-library`: unified My Library hub covering favorites, shelves, bookmarks, notes and history.
- `content-detail`: shared detail-page template and related content.

## Impact

- `src/router.jsx` (new route tree, redirects), `src/layout/*` (single shell, public vs protected routes, `securePage.jsx`), `src/components/layout/*` (header, tab bar, footer).
- `src/pages/*` (new Home, Explore, My Library pages; existing list pages become Explore tabs), `src/components/*` (shared filter bar, detail template).
- RTK Query: possible new queries for aggregated favorites/history; backend capability for anonymous reads must be verified.
- i18n keys in both `en.js` and `ur.js`.
- Playwright coverage for navigation, redirects and the public/protected split.
- Sequencing with `redesign-foundation`: this change defines destinations and routes; that change defines how the shell looks. Header content requirements in both must be reconciled when either is applied.
