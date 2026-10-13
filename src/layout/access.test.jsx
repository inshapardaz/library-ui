// @vitest-environment jsdom
import { afterEach, beforeAll, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { MantineProvider } from '@mantine/core';

import i18n from '@/i18n';
import { LibraryContext } from '@/contexts';
import { LibraryOutlet } from './libraryScope';
import ReadingGate from './readingGate';
import ProtectedRoute from './protectedRoute';

afterEach(cleanup);

beforeAll(async () => {
    await i18n.changeLanguage('en');
});

const storeWith = (auth) =>
    configureStore({ reducer: { auth: (state = auth) => state } });

const renderAt = (route, { auth, library = {}, error, libraryId = '1' }) =>
    render(
        <Provider store={storeWith(auth)}>
            <MantineProvider>
                <LibraryContext.Provider value={{ libraryId, library, error }}>
                    <MemoryRouter initialEntries={['/page']}>
                        <Routes>{route}</Routes>
                    </MemoryRouter>
                </LibraryContext.Provider>
            </MantineProvider>
        </Provider>
    );

const signedOut = { user: null, loadUserStatus: 'idle' };
const signedIn = { user: { id: 1, name: 'Reader' }, loadUserStatus: 'succeeded' };

describe('LibraryOutlet (private libraries answer 403 to everyone)', () => {
    const route = (
        <Route element={<LibraryOutlet />}>
            <Route path="/page" element={<div>library page</div>} />
        </Route>
    );

    it('renders the page when the library loaded', () => {
        renderAt(route, { auth: signedOut });
        expect(screen.getByText('library page')).toBeInTheDocument();
    });

    it('asks a signed-out visitor to sign in on 403', () => {
        renderAt(route, { auth: signedOut, error: { status: 403 } });
        expect(screen.getByText('Sign in to continue')).toBeInTheDocument();
        expect(screen.queryByText('library page')).not.toBeInTheDocument();
    });

    it('shows the 403 page to a signed-in non-member', () => {
        renderAt(route, { auth: signedIn, error: { status: 403 } });
        expect(screen.getByText('403')).toBeInTheDocument();
        expect(screen.queryByText('Sign in to continue')).not.toBeInTheDocument();
    });

    it('does not treat other errors as access problems', () => {
        renderAt(route, { auth: signedOut, error: { status: 500 } });
        expect(screen.getByText('library page')).toBeInTheDocument();
    });
});

describe('ReadingGate (poetry and writings)', () => {
    const route = (
        <Route element={<ReadingGate type="writings" />}>
            <Route path="/page" element={<div>poem</div>} />
        </Route>
    );

    it('lets an anonymous visitor read when the library allows public access', () => {
        renderAt(route, { auth: signedOut, library: { allowPublicAccessToWritings: true } });
        expect(screen.getByText('poem')).toBeInTheDocument();
    });

    it('requires login when the flag is false', () => {
        renderAt(route, { auth: signedOut, library: { allowPublicAccessToWritings: false } });
        expect(screen.queryByText('poem')).not.toBeInTheDocument();
    });

    it('requires login when the flag is absent', () => {
        renderAt(route, { auth: signedOut, library: {} });
        expect(screen.queryByText('poem')).not.toBeInTheDocument();
    });

    it('always lets a signed-in reader through', () => {
        renderAt(route, { auth: signedIn, library: {} });
        expect(screen.getByText('poem')).toBeInTheDocument();
    });
});

describe('ProtectedRoute', () => {
    const route = (
        <Route element={<ProtectedRoute />}>
            <Route path="/page" element={<div>secret</div>} />
        </Route>
    );

    it('renders nothing for an anonymous visitor', () => {
        renderAt(route, { auth: signedOut });
        expect(screen.queryByText('secret')).not.toBeInTheDocument();
    });

    it('renders the page for a signed-in user', () => {
        renderAt(route, { auth: signedIn });
        expect(screen.getByText('secret')).toBeInTheDocument();
    });
});
