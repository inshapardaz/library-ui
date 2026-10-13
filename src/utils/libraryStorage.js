const KEY = 'lastLibraryId';

// Local storage can throw (private mode, blocked site data), so every access is guarded and
// the app simply behaves as if no library were remembered.
export const getLastLibraryId = () => {
    try {
        return window.localStorage.getItem(KEY);
    } catch {
        return null;
    }
};

export const setLastLibraryId = (libraryId) => {
    if (libraryId == null) return;
    try {
        window.localStorage.setItem(KEY, String(libraryId));
    } catch {
        // ignore: remembering the library is a convenience only
    }
};

// Decides what the site root should do from the libraries the API returned for the current user:
//   none            -> { action: 'empty' }
//   exactly one     -> { action: 'open', libraryId }
//   several         -> remembered library if it is still in the list, otherwise the picker
export const resolveStartLibrary = (libraries, rememberedId) => {
    const list = libraries ?? [];
    if (list.length === 0) return { action: 'empty' };
    if (list.length === 1) return { action: 'open', libraryId: String(list[0].id) };

    const remembered = list.find((l) => String(l.id) === String(rememberedId));
    if (remembered) return { action: 'open', libraryId: String(remembered.id) };

    return { action: 'pick' };
};
