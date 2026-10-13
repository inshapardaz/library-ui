import { describe, expect, it } from 'vitest';
import { legacyRedirect } from './legacyRedirects';

describe('legacyRedirect', () => {
    it('sends the books list to Explore keeping the category filter', () => {
        expect(legacyRedirect('/libraries/12/books', '?category=3')).toBe('/libraries/12/explore/books?category=3');
    });

    it.each(['writings', 'poetry', 'periodicals', 'authors', 'series'])('sends %s to its Explore tab', (type) => {
        expect(legacyRedirect(`/libraries/7/${type}`, '')).toBe(`/libraries/7/explore/${type}`);
    });

    it('preserves author, series, sort and paging params', () => {
        expect(legacyRedirect('/libraries/1/books', '?author=4&sortBy=name&pageNumber=2'))
            .toBe('/libraries/1/explore/books?author=4&sortBy=name&pageNumber=2');
    });

    it('sends favorite books to My Library favorites filtered to books', () => {
        expect(legacyRedirect('/libraries/12/books', '?favorite=true')).toBe('/libraries/12/my/favorites?type=books');
    });

    it('sends favorite poetry and writings to My Library favorites', () => {
        expect(legacyRedirect('/libraries/12/poetry', '?favorite=true')).toBe('/libraries/12/my/favorites?type=poetry');
        expect(legacyRedirect('/libraries/12/writings', '?favorite=true')).toBe('/libraries/12/my/favorites?type=writings');
    });

    it('sends read books to My Library history', () => {
        expect(legacyRedirect('/libraries/12/books', '?read=true')).toBe('/libraries/12/my/history');
    });

    it('drops a false favorite filter and stays in Explore', () => {
        expect(legacyRedirect('/libraries/12/books', '?favorite=false&category=2')).toBe('/libraries/12/explore/books?category=2');
    });

    it('sends bookshelves to My Library shelves', () => {
        expect(legacyRedirect('/libraries/12/bookShelves', '')).toBe('/libraries/12/my/shelves');
    });

    it('tolerates a trailing slash', () => {
        expect(legacyRedirect('/libraries/12/authors/', '')).toBe('/libraries/12/explore/authors');
    });

    it('leaves detail and unrelated URLs alone', () => {
        expect(legacyRedirect('/libraries/12/books/5', '')).toBeNull();
        expect(legacyRedirect('/libraries/12/bookShelves/3', '')).toBeNull();
        expect(legacyRedirect('/libraries/12/search', '?query=a')).toBeNull();
        expect(legacyRedirect('/libraries/12', '')).toBeNull();
    });
});
