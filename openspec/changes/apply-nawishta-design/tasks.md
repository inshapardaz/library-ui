## 1. Theme and settings
- [x] 1.1 Open Sans (self-hosted) and Urdu font stacks
- [x] 1.2 Accent palette generator with tests
- [x] 1.3 Mantine theme built from the accent; colour scheme defaults to system
- [x] 1.4 Persist accent and Urdu font in local storage (with tests, including blocked storage)

## 2. Shell
- [x] 2.1 Header with libraries menu, Books menu, content links, appearance, language, search, profile
- [x] 2.2 Appearance panel, colour mode menu, language toggle; More drawer and footer updated
- [x] 2.3 Tab bar below 992px

## 3. Pages
- [x] 3.1 Explore sidebar, cover cards with progress, writing/poetry rows, entity cards
- [x] 3.2 Book page, issue page, detail template restyle
- [x] 3.3 Advanced search page and Spotlight link
- [x] 3.4 Landing page and library cards

## 4. Verification
- [x] 4.1 Playwright suite against a mocked API (navigation, access, appearance, advanced search, responsive)
- [x] 4.2 `npm run lint`, `npm run test:unit`, `npm test`, `npm run build`

## 5. Follow-ups (need API or product decisions)
- [ ] 5.1 Confirm API field names for read progress, chapter page ranges and library counts
- [ ] 5.2 Collections, Statistics and Upload (no backend support)
- [ ] 5.3 Publisher, year-range and reading-status filters (not supported by the books API)
- [ ] 5.4 Month-level timeline for periodicals (API provides years only)
