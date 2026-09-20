import { useCallback, useMemo, useRef } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

// UI library imports
import { Container, rem, Skeleton, Stack } from "@mantine/core";
import { Reader } from "@inshapardaz/qari/components/Reader";

// Local imports
import { useGetBookQuery, useGetBookChaptersQuery } from "@/store/slices/books.api";
import useBookReaderSource from "@/components/reader/useBookReaderSource";
import createBookmarkStoreAdapter from "@/components/reader/adapters/bookmarkStoreAdapter";
import createNoteStoreAdapter from "@/components/reader/adapters/noteStoreAdapter";
import createProgressStoreAdapter from "@/components/reader/adapters/progressStoreAdapter";
import Error from "@/components/error";
import { error as showError } from "@/utils/notifications";
//------------------------------------------------------

const EBookReaderPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { libraryId, bookId: routeBookId } = useParams();
    const [searchParams] = useSearchParams();
    const format = searchParams.get("format");

    const {
        data: book,
        error: errorLoadingBook,
        isLoading: loadingBook,
        refetch: refetchBook,
    } = useGetBookQuery({ libraryId, bookId: routeBookId });

    const language = useMemo(() => book?.language ?? "ur", [book]);
    const hasGotPages = useMemo(() => book && book.pageCount > 0 && book.links.pages, [book]);

    const {
        data: chaptersResult,
        error: errorLoadingChapters,
        isLoading: loadingChapters,
        refetch: refetchChapters,
    } = useGetBookChaptersQuery({ libraryId, bookId: book?.id }, { skip: !book?.id });

    const chapters = chaptersResult?.data;

    const { source, error: errorResolvingSource, loading: loadingSource } = useBookReaderSource(
        libraryId,
        book,
        chapters,
        language,
        format
    );

    // qari's <Reader> re-runs its book/bookmarks/notes/progress loading effect whenever
    // these props change identity. RTK Query hands back a new `book`/`chapters` object on
    // every background refetch even when the data is unchanged, so props derived from them
    // must stay referentially stable across such refetches - otherwise the reload effect
    // keeps re-firing, and an in-flight bookmarks/notes/progress load can lose the race and
    // get silently discarded (matching "bookmarks/notes/progress never load"). A ref lets
    // progressAdapter read the latest book/chapters without its own identity changing.
    const bookId = book?.id;

    const bookRef = useRef({ book, chapters });
    bookRef.current = { book, chapters };

    const bookmarkStore = useMemo(
        () => (bookId ? createBookmarkStoreAdapter(libraryId, bookId) : null),
        [libraryId, bookId]
    );
    const noteAdapter = useMemo(
        () => (bookId ? createNoteStoreAdapter(libraryId, bookId) : null),
        [libraryId, bookId]
    );
    const progressAdapter = useMemo(
        () => (bookId ? createProgressStoreAdapter(libraryId, bookRef) : null),
        [libraryId, bookId]
    );

    const bookInfo = useMemo(
        () => (book ? { title: book.title, author: book.authors?.map((a) => a.name).join(", "), language } : undefined),
        // Deliberately depends on book.title/book.authors, not `book` itself, so this stays
        // referentially stable across RTK Query refetches that don't actually change them.
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [book?.title, book?.authors, language]
    );

    const handleClose = useCallback(() => {
        navigate(hasGotPages ? `/libraries/${libraryId}/books/${bookId}/read` : `/libraries/${libraryId}/books/${bookId}`);
    }, [navigate, hasGotPages, libraryId, bookId]);

    const handleError = useCallback(
        (e) => showError({ title: t("book.error.loading.title"), message: e.message }),
        [t]
    );

    if (loadingBook || loadingChapters || loadingSource) {
        return (
            <Container fluid mt="sm">
                <Stack>
                    {Array(20)
                        .fill(1)
                        .map((e, index) => (
                            <Skeleton key={index} height={rem(24)} radius="md" />
                        ))}
                </Stack>
            </Container>
        );
    }

    if (errorLoadingBook || errorLoadingChapters || errorResolvingSource || !source) {
        return (
            <Container fluid mt="sm">
                <Error
                    title={t("book.error.loading.title")}
                    detail={t("book.error.loading.detail")}
                    onRetry={() => {
                        refetchBook();
                        refetchChapters();
                    }}
                />
            </Container>
        );
    }

    return (
        <div style={{ height: "100vh" }}>
            <Reader
                source={source}
                bookInfo={bookInfo}
                direction="auto"
                bookmarkStore={bookmarkStore}
                noteAdapter={noteAdapter}
                progressAdapter={progressAdapter}
                showCloseButton
                onClose={handleClose}
                onError={handleError}
            />
        </div>
    );
};

export default EBookReaderPage;
