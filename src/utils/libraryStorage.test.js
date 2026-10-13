import { afterEach, describe, expect, it, vi } from 'vitest';
import { getLastLibraryId, resolveStartLibrary, setLastLibraryId } from './libraryStorage';

const makeStorage = (overrides = {}) => {
    const data = {};
    return {
        getItem: vi.fn((k) => (k in data ? data[k] : null)),
        setItem: vi.fn((k, v) => { data[k] = v; }),
        ...overrides,
    };
};

describe('libraryStorage', () => {
    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it('round-trips the last library id', () => {
        vi.stubGlobal('window', { localStorage: makeStorage() });
        setLastLibraryId(12);
        expect(getLastLibraryId()).toBe('12');
    });

    it('ignores a missing id', () => {
        const storage = makeStorage();
        vi.stubGlobal('window', { localStorage: storage });
        setLastLibraryId(null);
        expect(storage.setItem).not.toHaveBeenCalled();
    });

    it('behaves as if nothing is remembered when storage throws', () => {
        const boom = () => { throw new Error('blocked'); };
        vi.stubGlobal('window', { localStorage: makeStorage({ getItem: boom, setItem: boom }) });
        expect(getLastLibraryId()).toBeNull();
        expect(() => setLastLibraryId(1)).not.toThrow();
    });
});

describe('resolveStartLibrary', () => {
    it('shows the empty state when there are no libraries', () => {
        expect(resolveStartLibrary([], '3')).toEqual({ action: 'empty' });
        expect(resolveStartLibrary(undefined, null)).toEqual({ action: 'empty' });
    });

    it('opens the only library directly, ignoring what was remembered', () => {
        expect(resolveStartLibrary([{ id: 5 }], '9')).toEqual({ action: 'open', libraryId: '5' });
    });

    it('opens the remembered library when it is in the list', () => {
        expect(resolveStartLibrary([{ id: 1 }, { id: 12 }], '12')).toEqual({ action: 'open', libraryId: '12' });
    });

    it('shows the picker when the remembered library is not in the list', () => {
        expect(resolveStartLibrary([{ id: 1 }, { id: 2 }], '12')).toEqual({ action: 'pick' });
    });

    it('shows the picker when nothing is remembered', () => {
        expect(resolveStartLibrary([{ id: 1 }, { id: 2 }], null)).toEqual({ action: 'pick' });
    });
});
