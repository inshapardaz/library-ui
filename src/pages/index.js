import { lazy } from "react";

// Every route-level page is lazy-loaded so the initial bundle only pays for
// the pages actually visited, instead of eagerly bundling all ~30 routes
// (books, authors, series, periodicals, poetry, writings, bookshelves, ...)
// into the main chunk. See router.jsx for the <Suspense> boundary this relies on.
const HomePage = lazy(() => import("./homePage"));

const Error403Page = lazy(() => import("./error403"));
const Error404Page = lazy(() => import("./error404"));
const Error500Page = lazy(() => import("./error500"));

const LibrariesPage = lazy(() => import("./libraries"));
const LibraryPage = lazy(() => import("./libraries/library"));
const BooksPage = lazy(() => import("./books"));
const BookPage = lazy(() => import("./books/book"));
const BookReaderPage = lazy(() => import("./books/reader"));
const EBookReaderPage = lazy(() => import("./books/bookReader"));
const AuthorsPage = lazy(() => import("./authors"));
const AuthorPage = lazy(() => import("./authors/authorPage"));
const SeriesListPage = lazy(() => import("./series"));
const SeriesPage = lazy(() => import("./series/seriesPage"));
const WritingsPage = lazy(() => import("./writings"));
const WritingPage = lazy(() => import("./writings/writing"));
const PoetriesPage = lazy(() => import("./poetry"));
const PoetryPage = lazy(() => import("./poetry/poetryPage"));
const PeriodicalsPage = lazy(() => import("./periodicals"));
const PeriodicalPage = lazy(() => import("./periodicals/periodical"));
const IssuePage = lazy(() => import("./periodicals/issue"));
const IssueArticlePage = lazy(() => import("./periodicals/issue/article"));
const BookShelvesPage = lazy(() => import("./bookShelves"));
const BookShelvePage = lazy(() => import("./bookShelves/bookShelvePage"));

const SearchPage = lazy(() => import("./searchPage"));

const Pages = {
    HomePage,
    Error403Page,
    Error404Page,
    Error500Page,
    LibrariesPage,
    LibraryPage,
    BooksPage,
    BookPage,
    BookReaderPage,
    EBookReaderPage,
    AuthorsPage,
    AuthorPage,
    SeriesPage,
    SeriesListPage,
    WritingsPage,
    WritingPage,
    PoetriesPage,
    PoetryPage,
    PeriodicalsPage,
    PeriodicalPage,
    IssuePage,
    IssueArticlePage,
    BookShelvesPage,
    BookShelvePage,
    SearchPage
};

export default Pages;
