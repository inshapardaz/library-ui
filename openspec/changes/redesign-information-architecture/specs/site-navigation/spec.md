## ADDED Requirements

### Requirement: Global destinations
The app SHALL provide five global destinations available on every browsing page: Home, Explore, Search, My Library and More.

#### Scenario: Any page
- **WHEN** a user is on any browsing page
- **THEN** all five destinations are reachable in one action from the shell

### Requirement: Mobile navigation
On narrow viewports the app SHALL show the global destinations in a bottom tab bar, and SHALL keep the tab bar hidden on immersive reader pages.

#### Scenario: Phone browsing
- **WHEN** the viewport is below the tablet breakpoint on a list page
- **THEN** a bottom tab bar with the five destinations is shown

#### Scenario: Reader
- **WHEN** a user opens a book reader
- **THEN** the tab bar is not shown

### Requirement: Reachability
Every existing feature SHALL be reachable within two navigation actions from any browsing page.

#### Scenario: Open a series
- **WHEN** a user on Home wants to browse series
- **THEN** choosing Explore and then the Series tab reaches the series list

### Requirement: Library persistence
The app SHALL remember the last used library and open it directly when the user returns to the site root, falling back to a library picker only when several libraries exist and none is remembered.

#### Scenario: Returning user
- **WHEN** a user whose last library was 12 opens `/`
- **THEN** Home for library 12 is shown without a library selection step

#### Scenario: Storage unavailable
- **WHEN** local storage cannot be read
- **THEN** the app behaves as if no library were remembered, without error

### Requirement: Legacy URL redirects
Every URL that exists before this change SHALL continue to work and SHALL redirect to its equivalent in the new structure, preserving filters in the query string.

#### Scenario: Old books list with category
- **WHEN** a user opens `/libraries/12/books?category=3`
- **THEN** they land on Explore with the Books tab and category 3 applied

#### Scenario: Old favorites filter
- **WHEN** a user opens `/libraries/12/books?favorite=true`
- **THEN** they land on My Library favorites filtered to books

### Requirement: External tools placement
Links to external sites (dictionary, fonts, tools, editor) SHALL appear under More and in the footer and SHALL NOT appear among primary destinations.

#### Scenario: Open More
- **WHEN** a user opens More
- **THEN** external tools are listed and open outside the app
