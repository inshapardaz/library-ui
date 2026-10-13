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

### Requirement: Library selection by count
The app SHALL decide the starting library from the list of libraries the API returns for the current user. With one library it SHALL open it directly and hide the library switcher; with several it SHALL open the remembered library, or show a picker once if none is remembered or the remembered one is not in the list; with none it SHALL show an empty state.

#### Scenario: Single library
- **WHEN** the API returns exactly one library
- **THEN** `/` shows Home for that library and no library switcher is shown

#### Scenario: Returning user with several libraries
- **WHEN** the API returns several libraries and the remembered library 12 is among them
- **THEN** Home for library 12 is shown without a selection step

#### Scenario: Remembered library no longer available
- **WHEN** the remembered library is not in the returned list
- **THEN** the library picker is shown

#### Scenario: No libraries
- **WHEN** the API returns no libraries to an anonymous visitor
- **THEN** an empty state invites the visitor to sign in

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
