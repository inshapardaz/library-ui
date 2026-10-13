## MODIFIED Requirements

### Requirement: Favorites
Users SHALL be able to favorite and unfavorite books, poetry and writings, and SHALL see all favorites together in My Library with a filter by content type.

#### Scenario: Favorite a book
- **WHEN** a user activates the favorite button on a book
- **THEN** the book is added to their favorites

#### Scenario: See favorites together
- **WHEN** a user opens My Library favorites
- **THEN** favorite books, poetry and writings are listed together and can be filtered by type

## ADDED Requirements

### Requirement: My Library hub
The app SHALL provide a My Library area containing continue reading, favorites, bookshelves, bookmarks and notes, and reading history.

#### Scenario: Open My Library
- **WHEN** a signed-in user opens My Library
- **THEN** all five sections are reachable from it

#### Scenario: Signed out
- **WHEN** an unauthenticated user opens My Library
- **THEN** they are sent to login and return to My Library afterwards

### Requirement: Bookmarks and notes access
Users SHALL be able to view their bookmarks and notes across books in My Library and open the book at the saved location.

#### Scenario: Open a bookmark
- **WHEN** a user selects a bookmark in My Library
- **THEN** the book reader opens at the bookmarked position
