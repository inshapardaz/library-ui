## 1. Discovery and decisions
- [ ] 1.1 Confirm with the API owner that anonymous reads are supported for all browse endpoints (list any that are not) and agree the name and shape of the poetry/writings public-reading flag in the GET library response
- [ ] 1.2 Decide library behaviour (count of libraries, default on first visit) and record in design.md
- [ ] 1.3 Inventory every current route, header entry and deep-linkable query parameter (input to the redirect map)
- [ ] 1.4 Decide whether reading history comes from existing last-read data or needs a backend ask
- [ ] 1.5 Draw low-fidelity wireframes (mobile and desktop, LTR and RTL) for Home, Explore, My Library, More, detail template

## 2. Routing and access
- [ ] 2.1 Define the new route tree and canonical URLs in `src/router.jsx`
- [ ] 2.2 Implement legacy redirects with query preservation (books, authors, series, periodicals, writings, poetry, favorite and category filters)
- [ ] 2.3 Split public vs protected routes; replace blanket `SecurePage` with route-level protection for My Library and the book readers
- [ ] 2.3a Make browse requests anonymous-safe (no login redirect on 401); keep redirect for protected routes and actions
- [ ] 2.3b Read the public-reading flag from the library response and gate poetry and writing readers accordingly (default: login required)
- [ ] 2.4 Add action-level auth prompt (favorite, shelf, bookmark, note, progress) with return-to-page after login
- [ ] 2.5 Persist last-used library in local storage (try/catch) and implement `/` behaviour
- [ ] 2.6 Unit tests for redirect mapping, library persistence, storage-unavailable fallback, anonymous-safe 401 handling and the public-reading flag

## 3. Shell and navigation
- [ ] 3.1 Single shell and header used inside and outside a library
- [ ] 3.2 Mobile bottom tab bar (hidden in reader); desktop header navigation
- [ ] 3.3 More menu (switch library, external tools, language, skin, Urdu font, theme, profile, about) and footer links
- [ ] 3.4 Persistent search entry and Spotlight shortcut palette
- [ ] 3.5 Remove category mega-menus and six-link content header

## 4. Explore
- [ ] 4.1 Explore page with six tabs, URL-synced tab and filters
- [ ] 4.2 Shared filter bar (category, sort) and type-specific filters
- [ ] 4.3 Grid/list toggle with remembered preference, paging, empty and error states
- [ ] 4.4 Migrate existing list pages and sidebars into Explore tabs; remove obsolete components

## 5. Home
- [ ] 5.1 New Home sections: continue reading, new arrivals, writings, poetry, featured authors, category chips
- [ ] 5.2 Anonymous variant with sign-in prompt in place of continue reading

## 6. My Library
- [ ] 6.1 My Library hub page and section navigation
- [ ] 6.2 Unified favorites across books, poetry, writings with type filter
- [ ] 6.3 Bookshelves section (reuse existing pages)
- [ ] 6.4 Bookmarks and notes listing using existing APIs, opening reader at saved position
- [ ] 6.5 Reading history section

## 7. Detail pages
- [ ] 7.1 Shared detail template component (header, primary and secondary actions, tabs)
- [ ] 7.2 Apply to book, author, series, poetry, writing, periodical and issue pages
- [ ] 7.3 Related tab (same author, series, category)
- [ ] 7.4 "Sign in to read" primary action for anonymous visitors, honouring the poetry/writings flag

## 8. i18n and verification
- [ ] 8.1 Add all new strings to `src/i18n/en.js` and `src/i18n/ur.js`
- [ ] 8.2 Playwright: navigation, redirects, anonymous browsing, direct reader URL while signed out, protected actions, library persistence, poetry/writings flag on and off
- [ ] 8.3 RTL and mobile checks (320, 768, 1280px)
- [ ] 8.4 `npm run lint`, `npm run test:unit`, `npm test`, `npm run build`

## 9. Reconcile with redesign-foundation
- [ ] 9.1 Align header content requirements between this change and `redesign-foundation`; update whichever is applied second
