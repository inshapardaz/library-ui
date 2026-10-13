import { describe, expect, it } from 'vitest';
import { ACCENT_PRESETS, DEFAULT_ACCENT, isValidAccent, makeAccentPalette } from './accent';

describe('makeAccentPalette', () => {
    it('returns ten shades with the accent itself at the primary shade (index 6)', () => {
        const palette = makeAccentPalette('#7950f2');
        expect(palette).toHaveLength(10);
        expect(palette[6]).toBe('#7950f2');
    });

    it('goes from light to dark', () => {
        const brightness = (hex) => [1, 3, 5].reduce((sum, i) => sum + parseInt(hex.slice(i, i + 2), 16), 0);
        const values = makeAccentPalette('#228be6').map(brightness);
        expect([...values].sort((a, b) => b - a)).toEqual(values);
    });

    it('produces valid hex colours for every preset', () => {
        ACCENT_PRESETS.forEach(({ hex }) => {
            makeAccentPalette(hex).forEach((shade) => expect(isValidAccent(shade)).toBe(true));
        });
    });

    it('falls back to the default accent for an invalid value', () => {
        expect(makeAccentPalette('blue')[6]).toBe(DEFAULT_ACCENT);
        expect(makeAccentPalette(undefined)[6]).toBe(DEFAULT_ACCENT);
    });

    it('normalises upper-case input', () => {
        expect(makeAccentPalette('#E8590C')[6]).toBe('#e8590c');
    });
});

describe('isValidAccent', () => {
    it('accepts six-digit hex colours only', () => {
        expect(isValidAccent('#228be6')).toBe(true);
        expect(isValidAccent('#228BE6')).toBe(true);
        expect(isValidAccent('#fff')).toBe(false);
        expect(isValidAccent('228be6')).toBe(false);
        expect(isValidAccent(null)).toBe(false);
    });
});
