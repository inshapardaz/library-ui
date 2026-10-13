import { lazy } from "react";

// Every route-level page is lazy-loaded so the initial bundle only pays for
// the pages actually visited, instead of eagerly bundling all ~30 routes
// (books, authors, series, periodicals, poetry, writings, bookshelves, ...)
// into the main chunk. See router.jsx for the <Suspense> boundary this relies on.
const RootPage = lazy(() => import("./rootPage"));
const ExplorePage = lazy(() => import("./explore"));
const MyLibraryPage = lazy(() => import("./myLibrary"));

const Error403Page = lazy(() => import("./error403"));
const Error404Page = lazy(() => import("./error404"));
const Error500Page = lazy(() => import("./error500"));

const LibrariesPage = lazy(() => import("./libraries"));
const LibraryPage = lazy(() => import("./libraries/library"));
const BookPage = lazy(() => import("./books/book"));
const BookReaderPage = lazy(() => import("./books/reader"));
const EBookReaderPage = lazy(() => import("./books/bookReader"));
const AuthorPage = lazy(() => import("./authors/authorPage"));
const SeriesPage = lazy(() => import("./series/seriesPage"));
const WritingPage = lazy(() => import("./writings/writing"));
const PoetryPage = lazy(() => import("./poetry/poetryPage"));
const PeriodicalPage = lazy(() => import("./periodicals/periodical"));
const IssuePage = lazy(() => import("./periodicals/issue"));
const IssueArticlePage = lazy(() => import("./periodicals/issue/article"));
const BookShelvePage = lazy(() => import("./bookShelves/bookShelvePage"));

const SearchPage = lazy(() => import("./searchPage"));

const Pages = {
    RootPage,
    ExplorePage,
    MyLibraryPage,
    Error403Page,
    Error404Page,
    Error500Page,
    LibrariesPage,
    LibraryPage,
    BookPage,
    BookReaderPage,
    EBookReaderPage,
    AuthorPage,
    SeriesPage,
    WritingPage,
    PoetryPage,
    PeriodicalPage,
    IssuePage,
    IssueArticlePage,
    BookShelvePage,
    SearchPage
};

export default Pages;
