## 1. Discovery and direction
- [ ] 1.1 Confirm Mehr Nastaleeq licence/redistribution; pick Naskh fallback stack
- [ ] 1.2 Audit current screens (screenshots, EN/UR, light/dark) as the visual baseline
- [ ] 1.3 Inventory every Mantine component in use (input to headless styling)
- [ ] 1.4 Draft Classic and Literary palettes and type scales; decide default skin; get sign-off

## 2. Headless foundation and skin architecture
- [ ] 2.1 Enable `<MantineProvider headless>`; move to minimal `src/theme/`; set Vite `build.target` and browserslist
- [ ] 2.2 Define the skin token contract (colour light/dark, fonts, radius, shadow, spacing, motion)
- [ ] 2.3 Write the base stylesheet covering every inventoried component
- [ ] 2.4 Implement Classic skin and Literary skin under `src/skins/`
- [ ] 2.5 Extend `uiSlice` with `skin` and `urduFont`; persist all UI choices in local storage (try/catch)
- [ ] 2.6 Add pre-paint bootstrap in `index.html` setting `data-skin`, `data-urdu-font`, colour mode, `dir`/`lang`
- [ ] 2.7 Self-host and subset fonts; per-language and per-Urdu-option stacks and line-heights
- [ ] 2.8 Default colour mode to OS `prefers-color-scheme` unless user chose
- [ ] 2.9 Unit tests for uiSlice persistence, storage-unavailable fallback and attribute application
- [ ] 2.10 Update `CLAUDE.md` (theme/skin location, headless convention)

## 3. Shared patterns
- [ ] 3.1 Skeleton, empty-state and error-state components
- [ ] 3.2 Restyle shared cards and list items (book, author, series, poetry, writing)

## 4. App shell
- [ ] 4.1 Restyle the header, bottom tab bar, More sheet and library switcher built in `redesign-information-architecture` (destinations and structure are decided there)
- [ ] 4.2 Add the skin switcher and Urdu font switcher to the More menu/sheet (and header) for all users
- [ ] 4.3 Redesign footer
- [ ] 4.4 Redesign 403/404/500 pages

## 5. Verification
- [ ] 5.1 Playwright matrix: shell at 320/768/1280px × 2 skins × light/dark × EN/UR (and Urdu font options)
- [ ] 5.2 Accessibility pass (contrast per skin, focus, axe) and reduced-motion check
- [ ] 5.3 Manual check on iOS Safari and Android Chrome
- [ ] 5.4 `npm run lint`, `npm run test:unit`, `npm test`, `npm run build`

## 6. Roadmap
- [ ] 6.1 Draft follow-up changes: redesign-home, redesign-listings, redesign-detail-pages, redesign-reader
