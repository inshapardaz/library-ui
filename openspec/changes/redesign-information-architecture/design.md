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
4. **Library as context, not a gate.** The list of libraries comes from the API and depends on who is asking. Behaviour follows the count returned:
   ```
   0 libraries   -> empty state (anonymous: "Sign in to see your libraries")
   1 library     -> open it directly; hide the library switcher
   2+ libraries  -> open the remembered library (local storage); if none, show a picker once
   ```
   The remembered id is ignored if it is not in the returned list. The switcher lives in the header and under More.
5. **URL scheme.** Keep `/libraries/:libraryId` as the prefix to stay compatible with the API and existing links. New canonical routes: `/libraries/:id` (Home), `/libraries/:id/explore/:type?`, `/libraries/:id/my`, `/libraries/:id/search`, detail routes unchanged. Legacy list routes (`/books`, `/authors`, `/series`, `/periodicals`, `/writings`, `/poetry` with their query params, including `?favorite=true` and `?category=`) redirect to the matching Explore/My Library view. Detail and reader routes do not change.
6. **Public browsing, login to read.** Remove the blanket `SecurePage`. Home, Explore, Search and detail pages are public. These require login: the page-scan and ebook readers, My Library, and write actions (favorite, shelf, bookmark, note, progress). Anonymous users who open a protected route or trigger a protected action are sent to the main-site login and return to the same page afterwards. On detail pages the primary action reads "Sign in to read" for anonymous users.
   ```
   Anonymous        Signed in
   Browse, detail    ok     ok
   Read books        --     ok
   Poetry/writings   flag   ok     (allowPublicAccessToWritings; default requires login)
   My Library/writes --     ok
   ```
7. **Poetry and writings are configurable.** Whether poetry and writings may be read without login is decided per library by the boolean `allowPublicAccessToWritings` in the GET library response (camelCase, to be added by the API owner). One flag covers both poetry and writings (articles). When true, the poetry and writing reader routes and the detail primary action work anonymously; otherwise they behave like books. Absent means false. Books and periodical articles are never covered by this flag. The client reads it from the library already fetched for `LibraryContext`.
8. **Anonymous-safe requests.** Today every call uses `axiosPrivate`, whose 401 handler attempts a token refresh and redirects to login on failure. Browse requests must use an anonymous-safe path: send credentials if present, but a 401 on a browse request must not redirect. Redirect to login only when the user triggers a protected route or action. Implementation options (separate public query base vs. per-request flag) are decided in tasks.
9. **Public and private libraries.** The API returns only public data (libraries, books, and so on) for anonymous calls; some libraries are private and members-only. Therefore:
   - Library and browse data depend on login state; RTK Query caches are reset on sign-in and sign-out so lists never show stale access.
   - An anonymous visitor opening a private library URL gets a "Sign in to continue" screen that returns them to that URL after login.
   - A signed-in user who is not a member gets the existing 403 page.
   - The API returns 403 for a private library both to anonymous visitors and to signed-in non-members, so status alone cannot distinguish them. On a 403 inside a library the client checks the auth state: not signed in shows "Sign in to continue"; signed in shows the 403 page. The browse request layer must therefore treat 403 as non-redirecting too.
10. **One shell.** One header component and one tab bar serve library and non-library pages; the reader keeps its immersive header-only layout.
11. **Detail template.** Header (cover/portrait, title, creators, series, categories), primary action (Read / Continue), secondary actions (Favorite, Add to shelf, Share), tabs About / Contents / Related. Related content: same author, same series, same category. Authors, series, poetry, writings and periodical issues reuse it.
12. **More menu** groups: switch library, dictionary/fonts/tools/editor (external), language, skin, Urdu font, colour mode, profile, about.
13. **Search:** persistent search entry in the shell and a keyboard shortcut palette (Mantine Spotlight, already a dependency) for quick jumps; full results page stays grouped by type.

## Risks / Trade-offs

- The API already returns public data to anonymous callers and 403 for private libraries; remaining dependency is the new `allowPublicAccessToWritings` flag owned by the API team.
- Gating the reader moves the sign-in wall from the front door to the Read button; track drop-off and consider a preview later (out of scope here).
- Merging list pages into tabs changes mental model for returning users → redirects plus a short first-run hint; keep old URLs working.
- Aggregated favorites/history may need many requests or a new endpoint → start with per-type requests merged client-side; flag backend ask if too slow.
- Overlap with `redesign-foundation` on header content → treat this change as the source of truth for destinations and that change for appearance.
- Anonymous browsing exposes content to crawlers; confirm this is acceptable for licensing/content policy.

## Open Questions

- None outstanding.
- Should reading history be stored (server) or derive from last-read data already available?
