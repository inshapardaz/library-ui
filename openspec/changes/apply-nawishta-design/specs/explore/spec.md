## ADDED Requirements

### Requirement: Explore sidebar
On screens 992px and wider the Explore page SHALL show a sidebar: for books quick links (favorites, recent reads, all books), search, an advanced-search link and category tags; for writings and poetry favorites, all items and categories with counts; for periodicals the publication frequency.

#### Scenario: Filter books by category
- **WHEN** a user selects a category tag in the books sidebar
- **THEN** the books list is filtered to that category and the URL carries it

### Requirement: Cover cards with progress
Books SHALL be shown as covers with title and authors and, when the reader has progress, a progress bar.

#### Scenario: Book in progress
- **WHEN** a book has reading progress of 63
- **THEN** its card shows a progress bar at 63 percent

### Requirement: Advanced search
The app SHALL provide an advanced search page with title, author, series, category, language, favorites and reading-history filters, keeping them in the URL.

#### Scenario: Linkable search
- **WHEN** a user fills in the author field
- **THEN** the URL contains the author and opening that URL shows the same filters and results
