## ADDED Requirements

### Requirement: Unified Explore page
The app SHALL provide one Explore page with tabs for Books, Writings, Poetry, Periodicals, Authors and Series for the current library.

#### Scenario: Switch tab
- **WHEN** a user selects the Poetry tab
- **THEN** poetry for the current library is listed and the URL reflects the tab

### Requirement: Shared filters
Explore SHALL provide filters for category and sort on every tab, plus type-specific filters where the data supports them, and SHALL keep the active tab and filters in the URL.

#### Scenario: Shareable view
- **WHEN** a user applies a category and sort and copies the URL
- **THEN** opening that URL shows the same tab, category and sort

#### Scenario: Back button
- **WHEN** a user changes a filter and presses back
- **THEN** the previous filter state is restored

### Requirement: Presentation and paging
Explore SHALL offer grid and list presentations and SHALL page results, remembering the chosen presentation.

#### Scenario: Large result set
- **WHEN** a tab has more results than one page
- **THEN** the user can load further pages without losing filters

### Requirement: Category browsing
Categories SHALL be browsable from Explore and Home as filter chips without a separate mega-menu.

#### Scenario: Choose category chip
- **WHEN** a user selects a category chip
- **THEN** the active tab is filtered to that category

### Requirement: Empty and error states
Explore SHALL show a clear empty state when no results match and offer to clear filters.

#### Scenario: No matches
- **WHEN** filters match nothing
- **THEN** an empty state with a "clear filters" action is shown
