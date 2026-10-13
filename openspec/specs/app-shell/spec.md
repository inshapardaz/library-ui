# App Shell Specification

## Purpose
Global layout, navigation and access control wrapping every page of the reader app.

## Requirements

### Requirement: Library-scoped routing
The app SHALL nest content routes under `/libraries/:libraryId/...` and SHALL expose the current library to all descendants.

#### Scenario: Open a library section
- **WHEN** a user visits `/libraries/12/books`
- **THEN** the books list for library 12 is shown inside the standard header and footer layout

### Requirement: Header and footer layouts
The app SHALL provide a layout with header and footer for browsing pages and a header-only layout for immersive pages (book reader, ebook reader, writing reader).

#### Scenario: Reading a book
- **WHEN** a user opens `/libraries/12/books/5/read`
- **THEN** the footer is not rendered and the page uses the header-only layout

### Requirement: Authentication gate
Browsing pages SHALL require an authenticated session. Unauthenticated users SHALL be redirected to the main site's login page. Login and registration are not implemented in this app.

#### Scenario: Expired session
- **WHEN** an API call returns 401 and token refresh fails
- **THEN** the user is redirected to the main site login

### Requirement: Error pages
The app SHALL render dedicated 403, 404 and 500 pages and SHALL catch uncaught render errors with an error boundary.

#### Scenario: Unknown URL
- **WHEN** a user visits an unmatched path
- **THEN** the 404 page is shown
