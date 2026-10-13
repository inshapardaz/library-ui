## MODIFIED Requirements

### Requirement: Detail pages
The app SHALL provide detail pages for books, authors, series, periodicals (with volumes, issues and articles), poetry and writings, sharing one template: header with image and key metadata, a primary action (Read or Continue), secondary actions (favorite, add to shelf, share) and tabs for About, Contents and Related where applicable.

#### Scenario: Book detail
- **WHEN** a user opens a book
- **THEN** its metadata and primary Read or Continue action are visible without scrolling on a phone, with chapters under Contents and favorite and share as secondary actions

#### Scenario: Related content
- **WHEN** a user opens the Related tab of a book
- **THEN** other books by the same author, in the same series and in the same category are offered

## ADDED Requirements

### Requirement: Consistent actions across types
Favorite, share and (for books) add-to-shelf actions SHALL appear in the same place with the same appearance on every detail page that supports them.

#### Scenario: Poetry detail
- **WHEN** a user opens a poem
- **THEN** favorite and share appear in the same position as on a book page
