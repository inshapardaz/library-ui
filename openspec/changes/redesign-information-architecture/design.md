## Context

Current structure: `/` hero + library list; `/libraries/:libraryId/...` for everything else (26 routes); two headers (`appHeader` outside, `libraryHeader` inside) plus a library page header; category mega-menus for books/writings/poetry; favorites as a `?favorite=true` filter in the books sidebar; bookmarks and notes exist in the API (`bookmarks.api.js`, `notes.api.js`) but have no user-facing hub; `SecurePage` wraps all browsing routes. Readers are mostly on phones; Urdu/RTL is first-class.

## Goals / Non-Goals

**Goals:** task-oriented structure; one consistent shell; every existing feature reachable in at most two taps from any page; mobile-first navigation; public browsing; stable legacy URLs.
**Non-Goals:** visual design; new backend features; changing reader internals; personalised recommendations.

## Decisions

1. **Five global destinations.** Home, Explore, Search, My Library, More.
   ```
   +------+---------+--------+------------+------+
   | Home | Explore | Search | My Library | More |   mobile: bottom tab bar
   +------+---------+--------+------------+------+   desktop: same items in header
   ```
   Rationale: replaces ~10 header entries and three mega-menus with a small, learnable set. Content types become tabs inside Explore rather than top-level items.
2. **Explore with type tabs and a shared filter bar.** Tabs: Books, Writings, Poetry, Periodicals, Authors, Series. Active tab and filters live in the URL query so views are linkable and back-button safe. Category becomes a filter (and a chip row on Home), not a menu.
3. **My Library hub.** Sections: Continue, Favorites (books, writings, poetry together with type filter), Bookshelves, Bookmarks and notes, History. Surfaces data the API already provides.
4. **Library as context, not a gate.** Last-used library id is kept in local storage; `/` opens Home for it. If none is stored and one library exists, open it; if several exist, show a library picker once. Switcher lives in the header and under More.
5. **URL scheme.** Keep `/libraries/:libraryId` as the prefix to stay compatible with the API and existing links. New canonical routes: `/libraries/:id` (Home), `/libraries/:id/explore/:type?`, `/libraries/:id/my`, `/libraries/:id/search`, detail routes unchanged. Legacy list routes (`/books`, `/authors`, `/series`, `/periodicals`, `/writings`, `/poetry` with their query params, including `?favorite=true` and `?category=`) redirect to the matching Explore/My Library view. Detail and reader routes do not change.
6. **Public vs protected.** Remove the blanket `SecurePage`. Protect only My Library routes and actions that write (favorite, shelf, bookmark, note, progress). Anonymous users who trigger a protected action are sent to the main-site login and return to the same page. Assumes the backend permits anonymous reads; this must be verified before implementation (see risks).
7. **One shell.** One header component and one tab bar serve library and non-library pages; the reader keeps its immersive header-only layout.
8. **Detail template.** Header (cover/portrait, title, creators, series, categories), primary action (Read / Continue), secondary actions (Favorite, Add to shelf, Share), tabs About / Contents / Related. Related content: same author, same series, same category. Authors, series, poetry, writings and periodical issues reuse it.
9. **More menu** groups: switch library, dictionary/fonts/tools/editor (external), language, skin, Urdu font, colour mode, profile, about.
10. **Search:** persistent search entry in the shell and a keyboard shortcut palette (Mantine Spotlight, already a dependency) for quick jumps; full results page stays grouped by type.

## Risks / Trade-offs

- Backend may require authentication for reads → verify with the API owner; fallback is keeping login required but still delivering the new structure.
- Merging list pages into tabs changes mental model for returning users → redirects plus a short first-run hint; keep old URLs working.
- Aggregated favorites/history may need many requests or a new endpoint → start with per-type requests merged client-side; flag backend ask if too slow.
- Overlap with `redesign-foundation` on header content → treat this change as the source of truth for destinations and that change for appearance.
- Anonymous browsing exposes content to crawlers; confirm this is acceptable for licensing/content policy.

## Open Questions

- How many libraries exist and do readers normally use one? (Decides whether Home opens the last library directly or shows a picker; assumed default above.)
- Is anonymous read access supported by the backend and acceptable to the content owners?
- Should reading history be stored (server) or derive from last-read data already available?
