import { describe, expect, it } from 'vitest';
import { canReadWithoutLogin } from './readingAccess';

describe('canReadWithoutLogin', () => {
    it('allows poetry and writings when the library flag is true', () => {
        const library = { allowPublicAccessToWritings: true };
        expect(canReadWithoutLogin(library, 'poetry')).toBe(true);
        expect(canReadWithoutLogin(library, 'writings')).toBe(true);
    });

    it('requires login when the flag is false or absent', () => {
        expect(canReadWithoutLogin({ allowPublicAccessToWritings: false }, 'poetry')).toBe(false);
        expect(canReadWithoutLogin({}, 'writings')).toBe(false);
        expect(canReadWithoutLogin(undefined, 'writings')).toBe(false);
    });

    it('never covers books or periodical articles', () => {
        const library = { allowPublicAccessToWritings: true };
        expect(canReadWithoutLogin(library, 'books')).toBe(false);
        expect(canReadWithoutLogin(library, 'articles')).toBe(false);
    });

    it('only accepts a literal true', () => {
        expect(canReadWithoutLogin({ allowPublicAccessToWritings: 'true' }, 'poetry')).toBe(false);
    });
});
