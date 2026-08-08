import { describe, it, expect } from 'vitest';
import { parseResponse, removeLinks } from './parseResponse';

describe('parseResponse', () => {
    it('converts a links array into a rel-keyed object', () => {
        const source = {
            links: [
                { rel: 'self', href: '/books/1' },
                { rel: 'create-favorite', href: '/books/1/favorite' },
            ],
        };

        const result = parseResponse(source);

        expect(result.links).toEqual({
            self: '/books/1',
            create_favorite: '/books/1/favorite',
        });
    });

    it('recursively parses nested data, files, contents and authors arrays', () => {
        const source = {
            data: [
                { links: [{ rel: 'self', href: '/books/1' }] },
                { links: [{ rel: 'self', href: '/books/2' }] },
            ],
            files: [{ links: [{ rel: 'self', href: '/files/1' }] }],
            contents: [{ links: [{ rel: 'self', href: '/contents/1' }] }],
            authors: [{ links: [{ rel: 'self', href: '/authors/1' }] }],
        };

        const result = parseResponse(source);

        expect(result.data[0].links).toEqual({ self: '/books/1' });
        expect(result.data[1].links).toEqual({ self: '/books/2' });
        expect(result.files[0].links).toEqual({ self: '/files/1' });
        expect(result.contents[0].links).toEqual({ self: '/contents/1' });
        expect(result.authors[0].links).toEqual({ self: '/authors/1' });
    });

    it('parses a top-level array of items', () => {
        const source = [
            { links: [{ rel: 'self', href: '/books/1' }] },
            { links: [{ rel: 'self', href: '/books/2' }] },
        ];

        const result = parseResponse(source);

        expect(result).toHaveLength(2);
        expect(result[0].links).toEqual({ self: '/books/1' });
        expect(result[1].links).toEqual({ self: '/books/2' });
    });

    it('returns falsy input unchanged', () => {
        expect(parseResponse(null)).toBeNull();
        expect(parseResponse(undefined)).toBeUndefined();
    });

    it('leaves objects without links/data/files/contents/authors untouched', () => {
        const source = { id: 1, title: 'A Book' };

        expect(parseResponse(source)).toEqual({ id: 1, title: 'A Book' });
    });
});

describe('removeLinks', () => {
    it('strips the links property from an object', () => {
        const source = { id: 1, links: { self: '/books/1' } };

        expect(removeLinks(source)).toEqual({ id: 1 });
    });

    it('recursively strips links from data, files, contents, authors and categories', () => {
        const source = {
            data: [{ id: 1, links: { self: '/books/1' } }],
            files: [{ id: 2, links: { self: '/files/2' } }],
            contents: [{ id: 3, links: { self: '/contents/3' } }],
            authors: [{ id: 4, links: { self: '/authors/4' } }],
            categories: [{ id: 5, links: { self: '/categories/5' } }],
        };

        const result = removeLinks(source);

        expect(result.data[0]).toEqual({ id: 1 });
        expect(result.files[0]).toEqual({ id: 2 });
        expect(result.contents[0]).toEqual({ id: 3 });
        expect(result.authors[0]).toEqual({ id: 4 });
        expect(result.categories[0]).toEqual({ id: 5 });
    });

    it('strips links from a top-level array of items', () => {
        const source = [
            { id: 1, links: { self: '/books/1' } },
            { id: 2, links: { self: '/books/2' } },
        ];

        expect(removeLinks(source)).toEqual([{ id: 1 }, { id: 2 }]);
    });

    it('returns falsy input unchanged', () => {
        expect(removeLinks(null)).toBeNull();
        expect(removeLinks(undefined)).toBeUndefined();
    });
});
