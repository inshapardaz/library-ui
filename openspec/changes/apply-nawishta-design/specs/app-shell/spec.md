## ADDED Requirements

### Requirement: Content navigation in the header
Inside a library the header SHALL show the Books menu (categories with counts and an all-books link) and links to Writings, Poetry, Authors, Series, Shelves and Periodicals, marking the open one as current, on screens 992px and wider.

#### Scenario: Open section is marked
- **WHEN** a user is on the poetry listing
- **THEN** the Poetry link has aria-current set to page

### Requirement: Tab bar below 992px
Below 992px the header navigation SHALL be replaced by the bottom tab bar, and exactly one main navigation SHALL be visible at any width.

#### Scenario: Tablet
- **WHEN** the viewport is 768px wide
- **THEN** the tab bar is shown and the header content links are hidden
