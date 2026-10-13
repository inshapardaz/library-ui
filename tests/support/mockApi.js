// Stubs the Inshapardaz API and the main (login) site so the UI can be exercised without a
// backend. Defaults describe one public library with no content; override per test.

const API = 'http://localhost:4000';
const MAIN_SITE = 'http://localhost:4200';

const emptyList = { data: [], pageNumber: 1, pageSize: 12, links: [] };

const TITLES = [
    ['The Sundered Coast', 'Adaeze Okonkwo', 63], ['Salt and Static', 'Reiko Amano', 100], ['The Quiet Ledger', 'Marcus Webb', 12],
    ['Field Notes on Distance', 'Priya Nandan', 0], ['The Last Cartographer', 'Ilya Federov', 45], ['Orchard Hymnal', 'Bethan Cole', 0],
    ['The Glass Foundry', 'Tobias Wren', 88], ['Echoes of Meridian', 'Adaeze Okonkwo', 30], ['A Grammar of Rain', 'Naomi Ostberg', 0],
    ['The Copper Vigil', 'Sana Farouk', 100],
];

const sampleBooks = TITLES.map(([title, author, progress], i) => ({
    id: i + 1, title, authors: [{ id: 10 + i, name: author }], categories: [{ id: 7, name: 'Fiction' }], links: [],
    readProgress: progress ? { progressType: 'Chapter', progressId: 1, progressValue: progress } : undefined,
}));

const sampleArticles = [['His Wife', 'Ghulam Abbas', 'Completed'], ['Before Independence', 'Krishan Chander', 'Typing'], ['Anandi', 'Ghulam Abbas', 'Typing']]
    .map(([title, author, status], i) => ({ id: i + 1, title, status, authors: [{ id: 20 + i, name: author }], categories: [{ id: 7, name: 'Fiction' }], links: [] }));

const sampleAuthors = TITLES.map(([, author], i) => ({ id: 10 + i, name: author, bookCount: 1 + (i % 2), articleCount: 0, poetryCount: 0, links: [] }));

const paged = (data) => ({ ...emptyList, data, pageCount: 3, currentPageIndex: 1 });

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
        if (/^\/libraries\/\d+\/books\/5\/chapters$/.test(pathname)) {
            return json({ ...emptyList, data: [{ id: 1, chapterNumber: 1, title: 'The Calm Waters' }, { id: 2, chapterNumber: 2, title: 'Salt on the Wind' }] });
        }
        if (/\/categories$/.test(pathname)) {
            return json({ ...emptyList, data: [{ id: 7, name: 'Fiction', bookCount: 3, articleCount: 1, poetryCount: 1, periodicalCount: 0 }] });
        }
        if (/^\/libraries\/\d+\/books$/.test(pathname)) return json(paged(sampleBooks));
        if (/^\/libraries\/\d+\/articles$/.test(pathname)) return json(paged(sampleArticles));
        if (/^\/libraries\/\d+\/authors$/.test(pathname)) return json(paged(sampleAuthors));
        return json(emptyList);
    });
};

export const signedInUser = { id: 1, name: 'Reader' };
