## 1. Discovery and direction
- [ ] 1.1 Resolve open questions in design.md (brand mood, fonts, design tool)
- [ ] 1.2 Audit current screens (screenshots, EN/UR, light/dark) as the visual baseline
- [ ] 1.3 Produce moodboard / palette / type scale and get sign-off

## 2. Theme foundation
- [ ] 2.1 Create `src/theme/` (colors, typography, radius/shadow/spacing, component defaults) and wire into `App.jsx`
- [ ] 2.2 Self-host and subset fonts; per-language font stacks and line-heights
- [ ] 2.3 Respect system colour scheme; sync with `uiSlice` mode
- [ ] 2.4 Unit tests for theme/colour-scheme logic

## 3. Shared patterns
- [ ] 3.1 Skeleton, empty-state and error-state components
- [ ] 3.2 Restyle shared cards and list items (book, author, series, poetry, writing)

## 4. App shell
- [ ] 4.1 Redesign header, mobile drawer navigation, library switcher
- [ ] 4.2 Redesign footer
- [ ] 4.3 Redesign 403/404/500 pages

## 5. Verification
- [ ] 5.1 Playwright checks: shell at 320/768/1280px, EN/UR, light/dark
- [ ] 5.2 Accessibility pass (contrast, focus, axe) and reduced-motion check
- [ ] 5.3 `npm run lint`, `npm run test:unit`, `npm test`, `npm run build`

## 6. Roadmap
- [ ] 6.1 Draft follow-up changes: redesign-home, redesign-listings, redesign-detail-pages, redesign-reader
