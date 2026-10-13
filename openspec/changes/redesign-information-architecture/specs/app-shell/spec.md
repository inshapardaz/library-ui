## MODIFIED Requirements

### Requirement: Library-scoped routing
The app SHALL nest content routes under `/libraries/:libraryId/...`, SHALL expose the current library to all descendants, and SHALL use the same shell inside and outside a library. Legacy routes SHALL redirect to their new equivalents.

#### Scenario: Open a library section
- **WHEN** a user visits `/libraries/12/books`
- **THEN** they are redirected to the Books tab of Explore for library 12 inside the standard shell

### Requirement: Authentication gate
Browsing pages (Home, Explore, Search and detail pages) SHALL be available without login. Reading content (page-scan reader, ebook reader, and by default poetry and writing readers), My Library, and write actions (favorite, bookshelf, bookmark, note, reading progress) SHALL require an authenticated session. Unauthenticated users attempting a protected route or action SHALL be redirected to the main site's login page and returned to the same page afterwards. Login and registration are not implemented in this app.

#### Scenario: Anonymous browsing
- **WHEN** an unauthenticated user opens a book detail page
- **THEN** the page is shown with a "Sign in to read" primary action

#### Scenario: Direct reader URL
- **WHEN** an unauthenticated user opens `/libraries/12/books/5/read`
- **THEN** they are sent to the main site login and return to the reader after signing in

#### Scenario: Protected action
- **WHEN** an unauthenticated user presses the favorite button
- **THEN** they are sent to the main site login and return to the same book afterwards

#### Scenario: Expired session
- **WHEN** an API call for a protected route or action returns 401 and token refresh fails
- **THEN** the user is redirected to the main site login

## ADDED Requirements

### Requirement: Anonymous-safe browse requests
Requests that load public browse data SHALL NOT redirect an anonymous visitor to login when they return 401.

#### Scenario: Anonymous visitor on Explore
- **WHEN** an unauthenticated visitor opens Explore and a browse request is unauthorised
- **THEN** the page shows a recoverable error state and the visitor is not redirected

### Requirement: Public reading of poetry and writings
Whether poetry and writings can be read without login SHALL be controlled per library by the boolean `allowPublicAccessToWritings` in the GET library response. When the flag is false or absent the app SHALL require login. Books and periodical articles SHALL always require login.

#### Scenario: Library allows public poetry
- **WHEN** the library response has `allowPublicAccessToWritings` true and an anonymous visitor opens a poem
- **THEN** the poem is readable without login

#### Scenario: Flag absent
- **WHEN** the library response has no `allowPublicAccessToWritings` flag and an anonymous visitor opens a writing
- **THEN** a "Sign in to read" action is shown instead of the content

#### Scenario: Flag does not cover books
- **WHEN** `allowPublicAccessToWritings` is true and an anonymous visitor opens a book reader URL
- **THEN** they are sent to login

### Requirement: Private libraries
Private libraries SHALL be visible and accessible only to authorised members. Anonymous visitors SHALL see only public libraries, and library and browse data SHALL be refreshed when the user signs in or out.

#### Scenario: Anonymous opens private library URL
- **WHEN** an anonymous visitor opens a URL in a private library and the API returns 403
- **THEN** a "Sign in to continue" screen is shown and the visitor returns to that URL after login

#### Scenario: Signed-in non-member
- **WHEN** a signed-in user who is not a member opens a URL in a private library and the API returns 403
- **THEN** the 403 page is shown

#### Scenario: Sign in reveals more libraries
- **WHEN** a visitor signs in and is a member of a private library
- **THEN** the private library appears in the library list without a manual reload
