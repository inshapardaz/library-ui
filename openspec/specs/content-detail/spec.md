# Content Detail Specification

## Purpose
Detail pages for individual library items: books, authors, series, periodicals, poetry and writings.

## Requirements

### Requirement: Detail pages
The app SHALL provide detail pages for books, authors, series, periodicals (with volumes, issues and articles), poetry and writings.

#### Scenario: Book detail
- **WHEN** a user opens a book
- **THEN** its metadata, chapters and available reading formats are shown with actions to read or favorite

### Requirement: Periodical hierarchy
Periodicals SHALL be navigable as periodical → volume → issue → article.

#### Scenario: Open an article
- **WHEN** a user opens an issue and selects an article
- **THEN** the article page at `/periodicals/:id/volumes/:v/issues/:i/articles/:a` is shown
