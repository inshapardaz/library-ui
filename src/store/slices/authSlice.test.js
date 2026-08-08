import { describe, it, expect } from 'vitest';
import {
    authSlice,
    isLoggedIn,
    getUserStatus,
    getUserError,
    getLogoutStatus,
    getLogoutError,
} from './authSlice';

const initialState = authSlice.reducer(undefined, { type: '@@INIT' });

describe('authSlice reducer', () => {
    it('returns the initial state', () => {
        expect(initialState).toEqual({
            user: null,
            status: 'idle',
            error: null,
            forgetPasswordStatus: 'idle',
            forgetPasswordError: null,
            resetPasswordStatus: 'idle',
            resetPasswordError: null,
            loadUserStatus: 'idle',
            loadUserError: null,
            tokenStatus: 'idle',
            tokenError: null,
        });
    });

    it('sets loadUserStatus to loading and clears loadUserError on auth/user/pending', () => {
        const state = authSlice.reducer(
            { ...initialState, loadUserError: 'previous error' },
            { type: 'auth/user/pending' }
        );

        expect(state.loadUserStatus).toBe('loading');
        expect(state.loadUserError).toBeNull();
    });

    it('sets the user and succeeded status on auth/user/fulfilled', () => {
        const user = { id: 1, name: 'Jane' };

        const state = authSlice.reducer(initialState, {
            type: 'auth/user/fulfilled',
            payload: user,
        });

        expect(state.loadUserStatus).toBe('succeeded');
        expect(state.loadUserError).toBeNull();
        expect(state.user).toEqual(user);
    });

    it('does not overwrite the user when auth/user/fulfilled has no payload', () => {
        const user = { id: 1, name: 'Jane' };

        const state = authSlice.reducer(
            { ...initialState, user },
            { type: 'auth/user/fulfilled', payload: null }
        );

        expect(state.user).toEqual(user);
    });

    it('sets failed status and error message on auth/user/rejected', () => {
        const state = authSlice.reducer(initialState, {
            type: 'auth/user/rejected',
            error: { message: 'Network error' },
        });

        expect(state.loadUserStatus).toBe('failed');
        expect(state.loadUserError).toBe('Network error');
    });

    it('clears the user and marks logout succeeded on auth/logout/fulfilled', () => {
        const user = { id: 1, name: 'Jane' };

        const state = authSlice.reducer(
            { ...initialState, user },
            { type: 'auth/logout/fulfilled' }
        );

        expect(state.logoutStatus).toBe('succeeded');
        expect(state.user).toBeNull();
    });

    it('marks logout failed with the error message on auth/logout/rejected', () => {
        const state = authSlice.reducer(initialState, {
            type: 'auth/logout/rejected',
            error: { message: 'Revoke failed' },
        });

        expect(state.logoutStatus).toBe('failed');
        expect(state.logoutUser).toBe('Revoke failed');
    });
});

describe('authSlice selectors', () => {
    it('isLoggedIn is true only when a user is present', () => {
        expect(isLoggedIn({ auth: { user: null } })).toBe(false);
        expect(isLoggedIn({ auth: { user: { id: 1 } } })).toBe(true);
        expect(isLoggedIn({ auth: {} })).toBe(false);
    });

    it('reads status/error fields off the auth slice', () => {
        const state = {
            auth: {
                loadUserStatus: 'succeeded',
                loadUserError: 'oops',
                logoutStatus: 'failed',
                logoutError: 'nope',
            },
        };

        expect(getUserStatus(state)).toBe('succeeded');
        expect(getUserError(state)).toBe('oops');
        expect(getLogoutStatus(state)).toBe('failed');
        expect(getLogoutError(state)).toBe('nope');
    });
});
