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
6. **Public browsing, login to read.** Remove the blanket `SecurePage`. Home, Explore, Search and detail pages are public. These require login: the page-scan and ebook readers, My Library, and write actions (favorite, shelf, bookmark, note, progress). Anonymous users who open a protected route or trigger a protected action are sent to the main-site login and return to the same page afterwards. On detail pages the primary action reads "Sign in to read" for anonymous users.
   ```
   Anonymous        Signed in
   Browse, detail    ok     ok
   Read books        --     ok
   Poetry/writings   flag   ok     (flag on library; default requires login)
   My Library/writes --     ok
   ```
7. **Poetry and writings are configurable.** Whether poetry and writings may be read without login is decided per library by a flag in the GET library response. When the flag allows it, the poetry and writing reader routes and detail primary action work anonymously; otherwise they behave like books. The default when the flag is absent is login required. The exact field name and semantics are to be agreed with the API owner; the client reads it from the library already fetched for `LibraryContext`.
8. **Anonymous-safe requests.** Today every call uses `axiosPrivate`, whose 401 handler attempts a token refresh and redirects to login on failure. Browse requests must use an anonymous-safe path: send credentials if present, but a 401 on a browse request must not redirect. Redirect to login only when the user triggers a protected route or action. Implementation options (separate public query base vs. per-request flag) are decided in tasks.
9. **One shell.** One header component and one tab bar serve library and non-library pages; the reader keeps its immersive header-only layout.
10. **Detail template.** Header (cover/portrait, title, creators, series, categories), primary action (Read / Continue), secondary actions (Favorite, Add to shelf, Share), tabs About / Contents / Related. Related content: same author, same series, same category. Authors, series, poetry, writings and periodical issues reuse it.
11. **More menu** groups: switch library, dictionary/fonts/tools/editor (external), language, skin, Urdu font, colour mode, profile, about.
12. **Search:** persistent search entry in the shell and a keyboard shortcut palette (Mantine Spotlight, already a dependency) for quick jumps; full results page stays grouped by type.

## Risks / Trade-offs

- Backend may require authentication for browse endpoints or lack the library flag → verify with the API owner; fallback is keeping login required for browsing while still delivering the new structure.
- Gating the reader moves the sign-in wall from the front door to the Read button; track drop-off and consider a preview later (out of scope here).
- Merging list pages into tabs changes mental model for returning users → redirects plus a short first-run hint; keep old URLs working.
- Aggregated favorites/history may need many requests or a new endpoint → start with per-type requests merged client-side; flag backend ask if too slow.
- Overlap with `redesign-foundation` on header content → treat this change as the source of truth for destinations and that change for appearance.
- Anonymous browsing exposes content to crawlers; confirm this is acceptable for licensing/content policy.

## Open Questions

- How many libraries exist and do readers normally use one? (Decides whether Home opens the last library directly or shows a picker; assumed default above.)
- Does the backend answer anonymous GETs for browse endpoints, and what is the name and shape of the poetry/writings public-reading flag in the GET library response?
- Should reading history be stored (server) or derive from last-read data already available?
