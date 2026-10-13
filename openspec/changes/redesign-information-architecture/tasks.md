## 1. Discovery and decisions
- [ ] 1.1 Confirm with the API owner: `allowPublicAccessToWritings` (boolean) is added to the GET library response
- [x] 1.3 Inventory every current route, header entry and deep-linkable query parameter (input to the redirect map)
- [x] 1.4 Decide whether reading history comes from existing last-read data or needs a backend ask
- [x] 1.5 Draw low-fidelity wireframes (mobile and desktop, LTR and RTL) for Home, Explore, My Library, More, detail template

## 2. Routing and access
- [x] 2.1 Define the new route tree and canonical URLs in `src/router.jsx`
- [x] 2.2 Implement legacy redirects with query preservation (books, authors, series, periodicals, writings, poetry, favorite and category filters)
- [x] 2.3 Split public vs protected routes; replace blanket `SecurePage` with route-level protection for My Library and the book readers
- [x] 2.3a Make browse requests anonymous-safe (no login redirect on 401); keep redirect for protected routes and actions
- [x] 2.3b Read the public-reading flag from the library response and gate poetry and writing readers accordingly (default: login required)
- [x] 2.4 Add action-level auth prompt (favorite, shelf, bookmark, note, progress) with return-to-page after login
- [x] 2.5 Persist last-used library in local storage (try/catch) and implement `/` behaviour by library count (0, 1, 2+), ignoring a remembered id not in the list
- [x] 2.5a Reset RTK Query caches on sign-in and sign-out so library and browse data reflect access
- [x] 2.5b Handle 403 on a private library by auth state: "Sign in to continue" screen when signed out (return to URL after login), 403 page when signed in
- [x] 2.6 Unit tests for redirect mapping, library persistence, storage-unavailable fallback, anonymous-safe 401 and 403 handling, 403 by auth state (signed out vs. signed in), the `allowPublicAccessToWritings` flag and library-count selection

## 3. Shell and navigation
- [x] 3.1 Single shell and header used inside and outside a library
- [x] 3.2 Mobile bottom tab bar (hidden in reader); desktop header navigation
- [x] 3.3 More menu (switch library, external tools, language, skin, Urdu font, theme, profile, about) and footer links
- [x] 3.4 Persistent search entry and Spotlight shortcut palette
- [x] 3.5 Remove category mega-menus and six-link content header

## 4. Explore
- [x] 4.1 Explore page with six tabs, URL-synced tab and filters
- [x] 4.2 Shared filter bar (category, sort) and type-specific filters
- [x] 4.3 Grid/list toggle with remembered preference, paging, empty and error states
- [x] 4.4 Migrate existing list pages and sidebars into Explore tabs; remove obsolete components

## 5. Home
- [x] 5.1 New Home sections: continue reading, new arrivals, writings, poetry, featured authors, category chips
- [x] 5.2 Anonymous variant with sign-in prompt in place of continue reading

## 6. My Library
- [x] 6.1 My Library hub page and section navigation
- [x] 6.2 Unified favorites across books, poetry, writings with type filter
- [x] 6.3 Bookshelves section (reuse existing pages)
- [ ] 6.4 Bookmarks and notes listing using existing APIs, opening reader at saved position
- [x] 6.5 Reading history section

## 7. Detail pages
- [x] 7.1 Shared detail template component (header, primary and secondary actions, tabs)
- [ ] 7.2 Apply to book, author, series, poetry, writing, periodical and issue pages
- [x] 7.3 Related tab (same author, series, category)
- [x] 7.4 "Sign in to read" primary action for anonymous visitors, honouring the poetry/writings flag

## 8. i18n and verification
- [x] 8.1 Add all new strings to `src/i18n/en.js` and `src/i18n/ur.js`
- [x] 8.2 Playwright: navigation, redirects, anonymous browsing, direct reader URL while signed out, protected actions, library persistence, `allowPublicAccessToWritings` on and off, private library as anonymous and as non-member
- [x] 8.3 RTL and mobile checks (320, 768, 1280px)
- [x] 8.4 `npm run lint`, `npm run test:unit`, `npm test`, `npm run build`

## 9. Reconcile with redesign-foundation
- [x] 9.1 Align header content requirements between this change and `redesign-foundation`; update whichever is applied second
