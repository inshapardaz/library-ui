# Reading Specification

## Purpose
Reading experiences for scanned-page books, ebooks and written articles.

## Requirements

### Requirement: Page-scan reader
The app SHALL display page-scan books as images with zoom and a table of contents.

#### Scenario: Zoom
- **WHEN** a reader changes zoom
- **THEN** the page image scales accordingly

### Requirement: Ebook reader
The app SHALL render ebook/markdown content in scroll and flipbook views.

#### Scenario: Switch view
- **WHEN** a reader toggles between scroll and flip view
- **THEN** the content re-renders in the chosen view and the choice is remembered

### Requirement: Reader preferences
The reader SHALL let users choose font, font size, line height and reader theme, persisted across sessions.

#### Scenario: Persisted font size
- **WHEN** a reader increases font size and reloads
- **THEN** the larger size is still applied

### Requirement: Progress, bookmarks and notes
The app SHALL persist reading progress, bookmarks and notes through the backend.

#### Scenario: Resume
- **WHEN** a reader reopens a partly read book
- **THEN** it opens at the last saved position
