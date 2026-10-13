## MODIFIED Requirements

### Requirement: Library-scoped routing
The app SHALL nest content routes under `/libraries/:libraryId/...`, SHALL expose the current library to all descendants, and SHALL use the same shell inside and outside a library. Legacy routes SHALL redirect to their new equivalents.

#### Scenario: Open a library section
- **WHEN** a user visits `/libraries/12/books`
- **THEN** they are redirected to the Books tab of Explore for library 12 inside the standard shell

### Requirement: Authentication gate
Browsing pages SHALL be available without login. Only My Library routes and write actions (favorite, bookshelf, bookmark, note, reading progress) SHALL require an authenticated session. Unauthenticated users attempting a protected action or route SHALL be redirected to the main site's login page and returned to the same page afterwards. Login and registration are not implemented in this app.

#### Scenario: Anonymous browsing
- **WHEN** an unauthenticated user opens a book page
- **THEN** the page is shown with a prompt to sign in for favorites and progress

#### Scenario: Protected action
- **WHEN** an unauthenticated user presses the favorite button
- **THEN** they are sent to the main site login and return to the same book afterwards

#### Scenario: Expired session
- **WHEN** an API call returns 401 and token refresh fails
- **THEN** the user is redirected to the main site login
