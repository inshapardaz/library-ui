## ADDED Requirements

### Requirement: Book page sections
The book page SHALL show a back link, the cover, title, authors with series position, category and public-domain tags, the description, a reading-progress card for signed-in readers with progress, the primary Read or Resume action, the chapters, the files and bookmarks (signed-in readers only) and the details.

#### Scenario: Signed-out visitor
- **WHEN** a signed-out visitor opens a book
- **THEN** the primary action reads "Sign in to read" and the files and bookmarks are not shown

#### Scenario: Reader with progress
- **WHEN** a signed-in reader has read to chapter 7 of 22
- **THEN** the progress card shows "Chapter 7 of 22" and the percentage, and the primary action reads "Resume reading"
