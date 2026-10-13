// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const load = async () => {
    vi.resetModules();
    return import('./uiSlice');
};

describe('uiSlice appearance settings', () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('starts with the default accent and Nastaleeq', async () => {
        const { uiSlice } = await load();
        const state = uiSlice.reducer(undefined, { type: 'init' });
        expect(state.accent).toBe('#228be6');
        expect(state.urduFont).toBe('nastaleeq');
    });

    it('restores saved choices from local storage', async () => {
        window.localStorage.setItem('accent', '#e8590c');
        window.localStorage.setItem('urduFont', 'naskh');
        const { uiSlice } = await load();
        const state = uiSlice.reducer(undefined, { type: 'init' });
        expect(state.accent).toBe('#e8590c');
        expect(state.urduFont).toBe('naskh');
    });

    it('ignores saved values that are not valid', async () => {
        window.localStorage.setItem('accent', 'not-a-colour');
        window.localStorage.setItem('urduFont', 'comic-sans');
        const { uiSlice } = await load();
        const state = uiSlice.reducer(undefined, { type: 'init' });
        expect(state.accent).toBe('#228be6');
        expect(state.urduFont).toBe('nastaleeq');
    });

    it('setAccent updates the state and remembers the colour', async () => {
        const { uiSlice, setAccent } = await load();
        const state = uiSlice.reducer(undefined, setAccent('#7950f2'));
        expect(state.accent).toBe('#7950f2');
        expect(window.localStorage.getItem('accent')).toBe('#7950f2');
    });

    it('setAccent rejects an invalid colour', async () => {
        const { uiSlice, setAccent } = await load();
        const state = uiSlice.reducer(undefined, setAccent('red'));
        expect(state.accent).toBe('#228be6');
        expect(window.localStorage.getItem('accent')).toBeNull();
    });

    it('setUrduFont updates the state, remembers it and rejects unknown fonts', async () => {
        const { uiSlice, setUrduFont } = await load();
        let state = uiSlice.reducer(undefined, setUrduFont('naskh'));
        expect(state.urduFont).toBe('naskh');
        expect(window.localStorage.getItem('urduFont')).toBe('naskh');
        state = uiSlice.reducer(state, setUrduFont('wingdings'));
        expect(state.urduFont).toBe('naskh');
    });

    it('still works when local storage throws', async () => {
        const boom = () => { throw new Error('blocked'); };
        vi.spyOn(Storage.prototype, 'getItem').mockImplementation(boom);
        vi.spyOn(Storage.prototype, 'setItem').mockImplementation(boom);
        const { uiSlice, setAccent } = await load();
        const initial = uiSlice.reducer(undefined, { type: 'init' });
        expect(initial.accent).toBe('#228be6');
        expect(() => uiSlice.reducer(initial, setAccent('#0ca678'))).not.toThrow();
    });
});
