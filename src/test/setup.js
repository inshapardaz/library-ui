// Only extends `expect` with DOM matchers (toBeInTheDocument, etc.) - safe to
// import unconditionally even for the plain-node unit tests below, since it
// doesn't touch the DOM itself, only registers matchers for files that do
// (component tests opt into a jsdom environment via a per-file pragma).
import '@testing-library/jest-dom/vitest';

if (typeof globalThis.window === 'undefined') {
    globalThis.window = {
        location: { host: 'localhost:4400', href: '' },
        localStorage: {},
    };
} else if (typeof globalThis.window.matchMedia !== 'function') {
    // jsdom (used by component tests) doesn't implement matchMedia, but
    // Mantine's MantineProvider calls it on mount to track the OS color
    // scheme - stub it out rather than pulling in a full polyfill package.
    globalThis.window.matchMedia = (query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
    });
}
