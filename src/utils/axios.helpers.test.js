import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

function createMockAxiosInstance() {
    const instance = vi.fn();
    instance.post = vi.fn();
    instance.get = vi.fn();
    instance.interceptors = {
        request: { use: vi.fn() },
        response: { use: vi.fn() },
    };
    return instance;
}

vi.mock('axios', () => ({
    default: {
        create: vi.fn(() => createMockAxiosInstance()),
    },
}));

describe('axios.helpers response interceptor', () => {
    let axiosPublic;
    let axiosPrivate;
    let responseErrorHandler;

    beforeEach(async () => {
        vi.resetModules();
        window.location.href = '';

        const axios = (await import('axios')).default;
        axios.create.mockClear();

        const helpers = await import('./axios.helpers');
        axiosPublic = helpers.axiosPublic;
        axiosPrivate = helpers.axiosPrivate;

        responseErrorHandler = axiosPrivate.interceptors.response.use.mock.calls[0][1];
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('refreshes the token and retries the original request on a 401', async () => {
        axiosPublic.post.mockResolvedValue({ data: {} });
        axiosPrivate.mockResolvedValue({ data: 'retried' });

        const originalRequest = { url: '/books' };
        const error = { response: { status: 401 }, config: originalRequest };

        const result = await responseErrorHandler(error);

        expect(axiosPublic.post).toHaveBeenCalledWith('/accounts/refresh-token', {});
        expect(originalRequest._retry).toBe(true);
        expect(axiosPrivate).toHaveBeenCalledWith(originalRequest);
        expect(result).toEqual({ data: 'retried' });
    });

    it('does not attempt a refresh for non-401 errors', async () => {
        const error = { response: { status: 500 }, config: { url: '/books' } };

        await expect(responseErrorHandler(error)).rejects.toBe(error);

        expect(axiosPublic.post).not.toHaveBeenCalled();
    });

    it('does not retry a request that already went through a refresh (_retry set)', async () => {
        const error = {
            response: { status: 401 },
            config: { url: '/books', _retry: true },
        };

        await expect(responseErrorHandler(error)).rejects.toBe(error);

        expect(axiosPublic.post).not.toHaveBeenCalled();
    });

    it('redirects to the main site login and rejects when the refresh call fails', async () => {
        const refreshError = new Error('refresh failed');
        axiosPublic.post.mockRejectedValue(refreshError);

        const originalRequest = { url: '/books' };
        const error = { response: { status: 401 }, config: originalRequest };

        await expect(responseErrorHandler(error)).rejects.toBe(refreshError);

        expect(window.location.href).toContain('/account/login?returnUrl=');
        expect(axiosPrivate).not.toHaveBeenCalled();
    });

    it('lets both requests succeed when two 401s arrive concurrently', async () => {
        axiosPublic.post.mockResolvedValue({ data: {} });
        axiosPrivate.mockResolvedValue({ data: 'retried' });

        const errorA = { response: { status: 401 }, config: { url: '/a' } };
        const errorB = { response: { status: 401 }, config: { url: '/b' } };

        const [resultA, resultB] = await Promise.all([
            responseErrorHandler(errorA),
            responseErrorHandler(errorB),
        ]);

        expect(resultA).toEqual({ data: 'retried' });
        expect(resultB).toEqual({ data: 'retried' });
        expect(axiosPrivate).toHaveBeenCalledWith(errorA.config);
        expect(axiosPrivate).toHaveBeenCalledWith(errorB.config);
    });
});
