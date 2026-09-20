import { useMemo } from "react";
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
    const { libraryId, bookId } = useParams();
    const [searchParams] = useSearchParams();
    const format = searchParams.get("format");

    const {
        data: book,
        error: errorLoadingBook,
        isLoading: loadingBook,
        refetch: refetchBook,
    } = useGetBookQuery({ libraryId, bookId });

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

    const bookmarkStore = useMemo(
        () => (book ? createBookmarkStoreAdapter(libraryId, book.id) : null),
        [libraryId, book]
    );
    const noteAdapter = useMemo(() => (book ? createNoteStoreAdapter(libraryId, book.id) : null), [libraryId, book]);
    const progressAdapter = useMemo(
        () => (book ? createProgressStoreAdapter(libraryId, book, chapters) : null),
        [libraryId, book, chapters]
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
                bookInfo={{ title: book.title, author: book.authors?.map((a) => a.name).join(", "), language }}
                direction="auto"
                bookmarkStore={bookmarkStore}
                noteAdapter={noteAdapter}
                progressAdapter={progressAdapter}
                showCloseButton
                onClose={() =>
                    navigate(hasGotPages ? `/libraries/${libraryId}/books/${book.id}/read` : `/libraries/${libraryId}/books/${book.id}`)
                }
                onError={(e) => showError({ title: t("book.error.loading.title"), message: e.message })}
            />
        </div>
    );
};

export default EBookReaderPage;
