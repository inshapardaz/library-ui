import { store } from "@/store";
import { booksApi } from "@/store/slices/books.api";
import { chapterIdToPosition, positionToChapterId } from "@/utils/epubBuilder";

// Bridges qari's CustomProgressStoreAdapter to the real backend endpoint
// (POST /libraries/{libraryId}/my/books/{bookId}, body {progressType, progressId, progressValue}).
//
// qari's ReadingProgressRecord.chapterId is a string ("chap{N}" for any epub this app fed
// it, whether server-published or client-assembled - see epubBuilder.js). We recover the
// 1-based chapter position N and use `chapters[N - 1].id` as the backend's numeric
// ProgressId. For a flat (non-chaptered) markdown/pdf source, there is no chapter, so we
// fall back to `progressType: 'File'` using the book's content id.
//
// `bookRef` is a ref (not book/chapters directly) so this adapter object's identity stays
// stable across re-renders even as the book/chapters data refreshes - qari's <Reader>
// re-runs its load effect whenever the adapter prop's identity changes, so churning it on
// every RTK Query refetch would keep restarting (and losing) in-flight loads.
export default function createProgressStoreAdapter(libraryId, bookRef) {
    function resolveProgressTarget(chapterId) {
        const { book, chapters } = bookRef.current;
        const position = chapterIdToPosition(chapterId);
        const chapter = position != null ? chapters?.[position - 1] : null;
        if (chapter) {
            return { progressType: "Chapter", progressId: chapter.id };
        }

        const content = book?.contents?.[0];
        return { progressType: "File", progressId: content?.id ?? 0 };
    }

    return {
        async save(progress) {
            const { book } = bookRef.current;
            const { progressType, progressId } = resolveProgressTarget(progress.chapterId);
            await store
                .dispatch(
                    booksApi.endpoints.updateReadingProgress.initiate({
                        libraryId,
                        bookId: book.id,
                        progressType,
                        progressId,
                        progressValue: progress.percentage,
                    })
                )
                .unwrap();
        },
        async load() {
            const { book, chapters } = bookRef.current;
            const readProgress = book?.readProgress;
            if (!readProgress) {
                return null;
            }

            let chapterId;
            if (readProgress.progressType === "Chapter") {
                const position = chapters?.findIndex((c) => c.id === readProgress.progressId);
                chapterId = position != null && position >= 0 ? positionToChapterId(position + 1) : undefined;
            }

            return {
                bookId: book.id,
                chapterId,
                position: 0,
                percentage: readProgress.progressValue ?? 0,
                updatedAt: new Date().toISOString(),
            };
        },
        async remove() {
            // No dedicated delete endpoint; there is nothing to do here today.
        },
    };
}
