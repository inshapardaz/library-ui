import { store } from "@/store";
import { notesApi } from "@/store/slices/notes.api";

// Backend NoteView -> qari's Note shape. Note: the backend schema has no `color` column,
// so a note's highlight color is not persisted server-side and will reset to the default
// (yellow) on reload — a known gap until the backend adds one.
function toQariNote(view, bookId) {
    return {
        id: view.id,
        bookId,
        chapterId: view.chapterId,
        startOffset: view.startOffset,
        endOffset: view.endOffset,
        text: view.text,
        comment: view.comment,
        createdAt: view.dateAdded,
        updatedAt: view.dateUpdated,
    };
}

// Bridges qari's CustomNoteStoreAdapter to the real backend notes endpoints.
export default function createNoteStoreAdapter(libraryId, bookId) {
    return {
        async save(note) {
            const result = await store
                .dispatch(
                    notesApi.endpoints.upsertNote.initiate({
                        libraryId,
                        bookId,
                        clientId: note.id,
                        chapterId: note.chapterId,
                        startOffset: note.startOffset,
                        endOffset: note.endOffset,
                        text: note.text,
                        comment: note.comment,
                    })
                )
                .unwrap();
            return toQariNote(result, bookId);
        },
        async remove(noteId) {
            await store
                .dispatch(notesApi.endpoints.deleteNote.initiate({ libraryId, bookId, clientId: noteId }))
                .unwrap();
        },
        async list() {
            const results = await store
                .dispatch(notesApi.endpoints.getNotes.initiate({ libraryId, bookId }))
                .unwrap();
            return results.map((view) => toQariNote(view, bookId));
        },
        async load() {
            return this.list();
        },
    };
}
