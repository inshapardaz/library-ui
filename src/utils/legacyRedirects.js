// Maps the URLs that existed before the information-architecture redesign onto the new
// structure so old bookmarks and shared links keep working. Query strings are preserved,
// except for the filters that moved to a different destination (favorite, read).

export const EXPLORE_TYPES = ['books', 'writings', 'poetry', 'periodicals', 'authors', 'series'];
export const MY_LIBRARY_SECTIONS = ['continue', 'favorites', 'shelves', 'bookmarks', 'history'];

const withQuery = (path, params) => {
    const qs = params.toString();
    return qs ? `${path}?${qs}` : path;
};

const LEGACY_LIST = /^\/libraries\/([^/]+)\/(books|writings|poetry|periodicals|authors|series)\/?$/;
const LEGACY_SHELVES = /^\/libraries\/([^/]+)\/bookShelves\/?$/;

// Returns the new location for a legacy URL, or null when the URL is not a legacy one.
export const legacyRedirect = (pathname, search = '') => {
    const params = new URLSearchParams(search);

    const shelves = LEGACY_SHELVES.exec(pathname);
    if (shelves) {
        return withQuery(`/libraries/${shelves[1]}/my/shelves`, params);
    }

    const list = LEGACY_LIST.exec(pathname);
    if (!list) return null;

    const [, libraryId, type] = list;
    const hasFavorite = params.get('favorite') === 'true';
    const hasRead = type === 'books' && params.get('read') === 'true';

    if (hasFavorite && ['books', 'writings', 'poetry'].includes(type)) {
        params.delete('favorite');
        params.set('type', type);
        return withQuery(`/libraries/${libraryId}/my/favorites`, params);
    }

    if (hasRead) {
        params.delete('read');
        return withQuery(`/libraries/${libraryId}/my/history`, params);
    }

    params.delete('favorite');
    params.delete('read');
    return withQuery(`/libraries/${libraryId}/explore/${type}`, params);
};
