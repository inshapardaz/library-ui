import { store } from "@/store";
import { bookmarksApi } from "@/store/slices/bookmarks.api";

// Backend BookmarkView -> qari's Bookmark shape (field names differ: dateAdded/dateUpdated
// vs createdAt/updatedAt).
function toQariBookmark(view, bookId) {
    return {
        id: view.id,
        bookId,
        chapterId: view.chapterId,
        position: view.position,
        name: view.name,
        createdAt: view.dateAdded,
        updatedAt: view.dateUpdated,
    };
}

// Bridges qari's BookmarkStoreInterface to the real backend bookmarks endpoints.
// Backend's PUT-by-clientId upsert accepts an opaque client-generated id and chapterId
// string, so qari's own Bookmark.id/chapterId are passed straight through unmodified.
export default function createBookmarkStoreAdapter(libraryId, bookId) {
    return {
        async save(bookmark) {
            const result = await store
                .dispatch(
                    bookmarksApi.endpoints.upsertBookmark.initiate({
                        libraryId,
                        bookId,
                        clientId: bookmark.id,
                        chapterId: bookmark.chapterId,
                        position: bookmark.position,
                        name: bookmark.name,
                    })
                )
                .unwrap();
            return toQariBookmark(result, bookId);
        },
        async update(bookmark) {
            return this.save(bookmark);
        },
        async remove(bookmarkId) {
            await store
                .dispatch(bookmarksApi.endpoints.deleteBookmark.initiate({ libraryId, bookId, clientId: bookmarkId }))
                .unwrap();
        },
        async list() {
            const results = await store
                .dispatch(bookmarksApi.endpoints.getBookmarks.initiate({ libraryId, bookId }))
                .unwrap();
            return results.map((view) => toQariBookmark(view, bookId));
        },
        async load() {
            return this.list();
        },
    };
}
