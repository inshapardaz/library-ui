# Discovery and Browsing Specification

## Purpose
How readers find content: home page, library switching, listings, categories and search.

## Requirements

### Requirement: Library selection
The app SHALL list available libraries and let the user switch the current library.

#### Scenario: Switch library
- **WHEN** a user selects another library in the switcher
- **THEN** all content views reload for the chosen library

### Requirement: Content listings
The app SHALL provide listing pages for books, authors, series, periodicals, poetry and writings, supporting card and list presentations where available, with pagination and filtering/sorting.

#### Scenario: Browse books
- **WHEN** a user opens the books page
- **THEN** books are shown in pages and can be filtered and sorted

### Requirement: Home highlights
The home page SHALL surface latest, favorite, last-read and suggested content.

#### Scenario: Returning reader
- **WHEN** a reader with reading history opens the home page
- **THEN** their last-read books appear

### Requirement: Categories
The app SHALL allow browsing content by category from the header menu.

#### Scenario: Pick a category
- **WHEN** a user chooses a category
- **THEN** the listing is filtered to that category

### Requirement: Global search
The app SHALL provide search across books, authors, series, periodicals, poetry and writings, with results grouped by type.

#### Scenario: Search
- **WHEN** a user submits a query
- **THEN** the search page shows a section per content type with matches
