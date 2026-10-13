import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('./axios.helpers', () => ({ axiosPrivate: vi.fn() }));
vi.mock('@/config', () => ({ API_URL: 'http://api' }));

import { axiosPrivate } from './axios.helpers';
import axiosBaseQuery from './axiosBaseQuery';

const apiWithUser = (user) => ({ getState: () => ({ auth: { user } }) });

describe('axiosBaseQuery', () => {
    beforeEach(() => {
        axiosPrivate.mockReset();
        axiosPrivate.mockResolvedValue({ data: 'ok' });
    });

    it('marks requests from signed-out visitors so a 401 does not redirect to login', async () => {
        await axiosBaseQuery()({ url: '/libraries', method: 'get' }, apiWithUser(null));
        expect(axiosPrivate).toHaveBeenCalledWith(expect.objectContaining({ url: 'http://api/libraries', skipAuthRedirect: true }));
    });

    it('keeps the refresh and redirect behaviour for signed-in users', async () => {
        await axiosBaseQuery()({ url: '/libraries', method: 'get' }, apiWithUser({ id: 1 }));
        expect(axiosPrivate).toHaveBeenCalledWith(expect.objectContaining({ skipAuthRedirect: false }));
    });

    it('returns status and data when a request fails', async () => {
        axiosPrivate.mockRejectedValue({ response: { status: 403, data: 'no' } });
        const result = await axiosBaseQuery()({ url: '/libraries/9', method: 'get' }, apiWithUser(null));
        expect(result).toEqual({ error: { status: 403, data: 'no' } });
    });
});
