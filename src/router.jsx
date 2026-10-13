import { Suspense } from "react";
import { Routes, BrowserRouter, Route, Navigate, useLocation, useParams } from "react-router-dom";

// UI library imports
import { Loader } from "@mantine/core";

import Pages from "@/pages";

import LayoutWithHeaderAndFooter from "@/layout/layoutWithHeaderAndFooter";
import LayoutWithHeader from "@/layout/layoutWithHeader";
import ProtectedRoute from "@/layout/protectedRoute";
import ReadingGate from "@/layout/readingGate";
import ErrorBoundary from "@/components/layout/errorBoundary";
import useResetCachesOnAuthChange from "@/hooks/useResetCachesOnAuthChange";
import { legacyRedirect } from "@/utils/legacyRedirects";

// ------------------------------------------------------------------

// Same loading-state pattern as App.jsx's auth-init screen, reused here as the
// fallback while a lazy-loaded route's page chunk (see pages/index.js) is fetched.
const RouteFallback = () => (
    <div style={{ position: "fixed", top: "50%", left: "50%" }}><Loader /></div>
);

// Pre-redesign list URLs (/libraries/:id/books?favorite=true, /authors, ...) keep working by
// redirecting to their equivalent in the new structure. See utils/legacyRedirects.js.
const LegacyRedirect = () => {
    const { pathname, search } = useLocation();
    const target = legacyRedirect(pathname, search);
    return <Navigate to={target ?? '/'} replace />;
};

const LibraryExploreRedirect = () => {
    const { libraryId } = useParams();
    return <Navigate to={`/libraries/${libraryId}/explore/books`} replace />;
};

const AppRoutes = () => {
    useResetCachesOnAuthChange();

    return (
        <Routes>
            {/* Browsing is public. Reading and everything personal needs a signed-in user. */}
            <Route element={<LayoutWithHeaderAndFooter />}>
                <Route path="/" element={<Pages.RootPage />} />
                <Route path="/libraries" element={<Pages.LibrariesPage />} />
                <Route path="/libraries/:libraryId" element={<Pages.LibraryPage />} />
                <Route path="/libraries/:libraryId/explore" element={<LibraryExploreRedirect />} />
                <Route path="/libraries/:libraryId/explore/:type" element={<Pages.ExplorePage />} />
                <Route path="/libraries/:libraryId/search" element={<Pages.SearchPage />} />
                <Route path="/libraries/:libraryId/search/advanced" element={<Pages.AdvancedSearchPage />} />
                <Route path="/libraries/:libraryId/authors/:authorId" element={<Pages.AuthorPage />} />
                <Route path="/libraries/:libraryId/series/:seriesId" element={<Pages.SeriesPage />} />
                <Route path="/libraries/:libraryId/books/:bookId" element={<Pages.BookPage />} />
                <Route path="/libraries/:libraryId/periodicals/:periodicalId/volumes/:volumeNumber/issues/:issueNumber" element={<Pages.IssuePage />} />
                <Route path="/libraries/:libraryId/periodicals/:periodicalId/volumes/:volumeNumber" element={<Pages.PeriodicalPage />} />
                <Route path="/libraries/:libraryId/periodicals/:periodicalId" element={<Pages.PeriodicalPage />} />

                {/* Legacy list URLs */}
                <Route path="/libraries/:libraryId/books" element={<LegacyRedirect />} />
                <Route path="/libraries/:libraryId/authors" element={<LegacyRedirect />} />
                <Route path="/libraries/:libraryId/series" element={<LegacyRedirect />} />
                <Route path="/libraries/:libraryId/periodicals" element={<LegacyRedirect />} />
                <Route path="/libraries/:libraryId/writings" element={<LegacyRedirect />} />
                <Route path="/libraries/:libraryId/poetry" element={<LegacyRedirect />} />
                <Route path="/libraries/:libraryId/bookShelves" element={<LegacyRedirect />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/libraries/:libraryId/my" element={<Pages.MyLibraryPage />} />
                    <Route path="/libraries/:libraryId/my/:section" element={<Pages.MyLibraryPage />} />
                    <Route path="/libraries/:libraryId/bookShelves/:bookShelfId" element={<Pages.BookShelvePage />} />
                    <Route path="/libraries/:libraryId/periodicals/:periodicalId/volumes/:volumeNumber/issues/:issueNumber/articles/:articleNumber" element={<Pages.IssueArticlePage />} />
                </Route>

                <Route path="/403" element={<Pages.Error403Page />} />
                <Route path="/500" element={<Pages.Error500Page />} />
                <Route path="*" element={<Pages.Error404Page />} />
            </Route>
            <Route element={<LayoutWithHeader />}>
                <Route element={<ProtectedRoute />}>
                    <Route path="/libraries/:libraryId/books/:bookId/read" element={<Pages.BookReaderPage />} />
                    <Route path="/libraries/:libraryId/books/:bookId/ebook" element={<Pages.EBookReaderPage />} />
                </Route>
                {/* Poetry and writings are readable anonymously only when the library's
                    allowPublicAccessToWritings flag is true. */}
                <Route element={<ReadingGate type="writings" />}>
                    <Route path="/libraries/:libraryId/writings/:articleId" element={<Pages.WritingPage />} />
                    <Route path="/libraries/:libraryId/poetry/:poetryId" element={<Pages.PoetryPage />} />
                </Route>
            </Route>
        </Routes>
    );
};

const Router = () => {
    return (
        <BrowserRouter>
            <ErrorBoundary>
                <Suspense fallback={<RouteFallback />}>
                    <AppRoutes />
                </Suspense>
            </ErrorBoundary>
        </BrowserRouter>
    );
};

export default Router;
