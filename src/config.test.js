// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';

const load = async (env) => {
    vi.resetModules();
    window.__ENV__ = env;
    return import('./config');
};

describe('config app links', () => {
    afterEach(() => {
        delete window.__ENV__;
    });

    it('defaults to the local dev servers', async () => {
        const config = await load({});
        expect(config.MAIN_SITE).toBe('http://localhost:4200');
        expect(config.LIBRARIES_URL).toBe('http://localhost:4400');
        expect(config.LIBRARY_EDITOR_URL).toBe('http://localhost:4300');
        expect(config.DICTIONARY_URL).toBe('http://localhost:4500');
    });

    it('takes the runtime values written by the container', async () => {
        const config = await load({
            MAIN_SITE: 'https://www.nawishta.co.uk',
            LIBRARIES_URL: 'https://libraries.nawishta.co.uk',
            LIBRARY_EDITOR_URL: 'https://editor.nawishta.co.uk',
            DICTIONARY_URL: 'https://dictionary.nawishta.co.uk',
        });
        expect(config.MAIN_SITE).toBe('https://www.nawishta.co.uk');
        expect(config.LIBRARIES_URL).toBe('https://libraries.nawishta.co.uk');
        expect(config.LIBRARY_EDITOR_URL).toBe('https://editor.nawishta.co.uk');
        expect(config.DICTIONARY_URL).toBe('https://dictionary.nawishta.co.uk');
    });
});
