## MODIFIED Requirements

### Requirement: Library selection
The app SHALL list available libraries and let the user switch the current library from the header and from More, and SHALL remember the choice.

#### Scenario: Switch library
- **WHEN** a user selects another library in the switcher
- **THEN** all content views reload for the chosen library and the choice is remembered

### Requirement: Content listings
The app SHALL provide listings for books, authors, series, periodicals, poetry and writings through the Explore page, supporting grid and list presentations where available, with pagination and filtering/sorting.

#### Scenario: Browse books
- **WHEN** a user opens Explore on the Books tab
- **THEN** books are shown in pages and can be filtered and sorted

### Requirement: Home highlights
The Home page SHALL surface, for the current library: continue reading (for signed-in readers), new arrivals, writings, poetry, featured authors and browse-by-category, and SHALL remain useful to anonymous visitors.

#### Scenario: Returning reader
- **WHEN** a signed-in reader with reading history opens Home
- **THEN** their last-read books appear first as "Continue reading"

#### Scenario: Anonymous visitor
- **WHEN** an unauthenticated visitor opens Home
- **THEN** new arrivals, poetry, writings and categories are shown and the continue-reading section is replaced by a sign-in prompt
