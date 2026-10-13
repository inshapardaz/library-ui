// Stubs the Inshapardaz API and the main (login) site so the UI can be exercised without a
// backend. Defaults describe one public library with no content; override per test.

const API = 'http://localhost:4000';
const MAIN_SITE = 'http://localhost:4200';

const emptyList = { data: [], pageNumber: 1, pageSize: 12, links: [] };

export const defaultBook = {
    id: 5,
    title: 'Test Book',
    description: 'A book used in tests',
    chapterCount: 2,
    pageCount: 0,
    authors: [{ id: 2, name: 'Test Author' }],
    categories: [{ id: 7, name: 'Fiction' }],
    links: [],
};

export const mockApi = async (page, {
    user = null,
    libraries = [{ id: 1, name: 'Main Library' }],
    library = {},
    libraryStatus = 200,
    english = true,
    book = defaultBook,
} = {}) => {
    if (english) {
        await page.addInitScript(() => window.localStorage.setItem('i18nextLng', 'en'));
    }

    await page.route(`${MAIN_SITE}/**`, (route) =>
        route.fulfill({ status: 200, contentType: 'text/html', body: '<html><body>main site login</body></html>' }));

    await page.route(`${API}/**`, (route) => {
        const { pathname } = new URL(route.request().url());
        const json = (body, status = 200) => route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(body) });

        if (pathname === '/accounts/user') return json(user);
        if (pathname === '/accounts/refresh-token') return json({}, 401);
        if (pathname === '/libraries') return json({ ...emptyList, data: libraries });
        if (/^\/libraries\/\d+$/.test(pathname)) {
            if (libraryStatus !== 200) return json({ message: 'forbidden' }, libraryStatus);
            return json({ id: 1, name: 'Main Library', links: [], ...library });
        }
        if (/^\/libraries\/\d+\/books\/5$/.test(pathname)) return json(book);
        if (/\/categories$/.test(pathname)) {
            return json({ ...emptyList, data: [{ id: 7, name: 'Fiction', bookCount: 3, articleCount: 1, poetryCount: 1, periodicalCount: 0 }] });
        }
        return json(emptyList);
    });
};

export const signedInUser = { id: 1, name: 'Reader' };
