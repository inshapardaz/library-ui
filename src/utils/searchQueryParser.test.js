import { describe, it, expect } from 'vitest';
import parseSearchQuery, { findIncompleteOperators, removeOperatorTokens } from './searchQueryParser';

describe('parseSearchQuery', () => {
    it('returns empty filters and free text for an empty/falsy query', () => {
        expect(parseSearchQuery('')).toEqual({
            authorNames: [],
            tagNames: [],
            languages: [],
            seriesNames: [],
            freeText: '',
        });
        expect(parseSearchQuery(undefined)).toEqual({
            authorNames: [],
            tagNames: [],
            languages: [],
            seriesNames: [],
            freeText: '',
        });
    });

    it('splits a mixed-order query into the four filter arrays plus free text', () => {
        const result = parseSearchQuery('#fantasy @tolkien hobbit $en :lotr');

        expect(result).toEqual({
            authorNames: ['tolkien'],
            tagNames: ['fantasy'],
            languages: ['en'],
            seriesNames: ['lotr'],
            freeText: 'hobbit',
        });
    });

    it('matches the acceptance-criteria example, dropping a bare operator with no value', () => {
        const result = parseSearchQuery('@tolkien #fantasy $ :lotr hobbit');

        expect(result).toEqual({
            authorNames: ['tolkien'],
            tagNames: ['fantasy'],
            languages: [],
            seriesNames: ['lotr'],
            freeText: 'hobbit',
        });
    });

    it('handles quoted multi-word operator values', () => {
        const result = parseSearchQuery('@"J.R.R. Tolkien" #fantasy');

        expect(result.authorNames).toEqual(['J.R.R. Tolkien']);
        expect(result.tagNames).toEqual(['fantasy']);
    });

    it('combines multiple tokens of the same type (AND) in encounter order', () => {
        const result = parseSearchQuery('#fantasy #adventure title words');

        expect(result.tagNames).toEqual(['fantasy', 'adventure']);
        expect(result.freeText).toBe('title words');
    });

    it('drops an empty quoted operator value instead of pushing an empty string', () => {
        const result = parseSearchQuery('@"" #fantasy');

        expect(result.authorNames).toEqual([]);
        expect(result.tagNames).toEqual(['fantasy']);
    });

    it('treats an unrecognized prefix as ordinary free text', () => {
        const result = parseSearchQuery('%unknown hobbit');

        expect(result.freeText).toBe('%unknown hobbit');
        expect(result.authorNames).toEqual([]);
        expect(result.tagNames).toEqual([]);
        expect(result.languages).toEqual([]);
        expect(result.seriesNames).toEqual([]);
    });

    it('is order-independent - filters land in the same arrays regardless of token order', () => {
        const result = parseSearchQuery(':lotr $en hobbit @tolkien #fantasy');

        expect(result).toEqual({
            authorNames: ['tolkien'],
            tagNames: ['fantasy'],
            languages: ['en'],
            seriesNames: ['lotr'],
            freeText: 'hobbit',
        });
    });
});

describe('findIncompleteOperators', () => {
    it('returns an empty array for an empty/falsy query', () => {
        expect(findIncompleteOperators('')).toEqual([]);
        expect(findIncompleteOperators(undefined)).toEqual([]);
    });

    it('finds a trailing bare operator', () => {
        expect(findIncompleteOperators('@tolkien #fantasy $')).toEqual(['$']);
    });

    it('finds a leading bare operator', () => {
        expect(findIncompleteOperators(': hobbit')).toEqual([':']);
    });

    it('finds an empty quoted operator value', () => {
        expect(findIncompleteOperators('@"" #fantasy')).toEqual(['@']);
    });

    it('finds multiple distinct incomplete operators without duplicates', () => {
        expect(findIncompleteOperators('@ # @')).toEqual(['@', '#']);
    });

    it('does not flag a fully-formed token', () => {
        expect(findIncompleteOperators('@tolkien #fantasy $en :lotr')).toEqual([]);
    });
});

describe('removeOperatorTokens', () => {
    it('returns an empty string for an empty/falsy query', () => {
        expect(removeOperatorTokens('', '@')).toBe('');
        expect(removeOperatorTokens(undefined, '@')).toBe('');
    });

    it('removes every unquoted token of the given operator type', () => {
        expect(removeOperatorTokens('@tolkien #fantasy hobbit', '@')).toBe('#fantasy hobbit');
    });

    it('removes a quoted token of the given operator type', () => {
        expect(removeOperatorTokens('@"J.R.R. Tolkien" #fantasy', '@')).toBe('#fantasy');
    });

    it('removes a bare operator with no value', () => {
        expect(removeOperatorTokens('@tolkien $ #fantasy', '$')).toBe('@tolkien #fantasy');
    });

    it('leaves other operator types untouched', () => {
        expect(removeOperatorTokens('@tolkien #fantasy :lotr', '#')).toBe('@tolkien :lotr');
    });
});
