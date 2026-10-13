import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams, useSearchParams } from "react-router-dom";

// Ui library imports
import { Box, Container, Flex, Stack, Tabs, Title } from "@mantine/core";

// Local Import
import { SortDirection } from "@/models";
import { EXPLORE_TYPES } from "@/utils/legacyRedirects";
import CategoryChips from "@/components/explore/categoryChips";
import ExploreSidebar from "@/components/explore/exploreSidebar";
import { hasExploreSidebar } from "@/components/explore/exploreTypes";
import BooksList from "@/components/books/booksList";
import LastReadBooks from "@/components/books/lastReadBooks";
import WritingsList from "@/components/writings/writingsList";
import PoetryList from "@/components/poetry/poetryList";
import PeriodicalsList from "@/components/periodicals/periodicalsList";
import AuthorsList from "@/components/authors/authorsList";
import SeriesList from "@/components/series/seriesList";
import { IconNames, Icon } from '@/components/icon';
// -----------------------------------------

const TAB_ICONS = {
    books: IconNames.Books,
    writings: IconNames.Writings,
    poetry: IconNames.Poetry,
    periodicals: IconNames.Periodicals,
    authors: IconNames.Authors,
    series: IconNames.Series,
};

const TAB_LABEL_KEYS = {
    books: 'header.books',
    writings: 'header.writings',
    poetry: 'header.poetry',
    periodicals: 'header.periodicals',
    authors: 'header.authors',
    series: 'header.series',
};

// Types whose list can be narrowed by category
const CATEGORY_TYPES = ['books', 'writings', 'poetry', 'periodicals'];

// One page for every content type. The active type is the :type path segment and every filter
// is a query parameter, so any view is linkable and the back button restores it. On wide
// screens the header navigation and the sidebar replace the tab strip and the category chips,
// which stay for narrower screens.
const ExplorePage = () => {
    const { t } = useTranslation();
    const { libraryId, type } = useParams();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const user = useSelector((state) => state.auth.user);

    if (!EXPLORE_TYPES.includes(type)) {
        return <Navigate to={`/libraries/${libraryId}/explore/books`} replace />;
    }

    const query = searchParams.get("query");
    const category = searchParams.get("category");
    const frequency = searchParams.get("frequency");
    const sortBy = searchParams.get("sortBy") ?? (type === 'periodicals' ? "title" : "name");
    const sortDirection = searchParams.get("sortDirection") ?? SortDirection.Ascending;
    const pageNumber = parseInt(searchParams.get("pageNumber") ?? "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") ?? "12", 10);

    // Sets (or, with an empty value, clears) one filter and goes back to the first page
    const setParam = (key, value) => {
        const next = new URLSearchParams(searchParams);
        if (value === null || value === undefined || value === '') next.delete(key); else next.set(key, value);
        next.delete('pageNumber');
        setSearchParams(next);
    };

    const common = { libraryId, query, sortBy, sortDirection, pageNumber, pageSize, showSearch: type !== 'books' };

    const lists = {
        books: <BooksList {...common} showTitle={false}
            author={searchParams.get("author")}
            category={category}
            bookShelf={searchParams.get("bookShelf")}
            series={searchParams.get("series")}
            status={searchParams.get("status")} />,
        writings: <WritingsList {...common} showTitle={false}
            author={searchParams.get("author")}
            category={category} />,
        poetry: <PoetryList {...common} showTitle={false}
            author={searchParams.get("author")}
            category={category} />,
        periodicals: <PeriodicalsList {...common} showTitle={false}
            category={category}
            frequency={frequency} />,
        authors: <AuthorsList {...common}
            authorType={searchParams.get("authorType")} />,
        series: <SeriesList {...common} />,
    };

    const sidebar = hasExploreSidebar(type) && (
        <ExploreSidebar
            libraryId={libraryId}
            type={type}
            category={category}
            onCategory={(value) => setParam('category', value)}
            query={query}
            onQuery={(value) => setParam('query', value)}
            frequency={frequency}
            onFrequency={(value) => setParam('frequency', value)} />
    );

    return (
        <Container fluid px="lg" pt="md">
            <Stack gap="md" hiddenFrom="md" mb="md">
                <Tabs value={type} onChange={(value) => navigate(`/libraries/${libraryId}/explore/${value}`)}>
                    <Tabs.List style={{ flexWrap: 'nowrap', overflowX: 'auto' }}>
                        {EXPLORE_TYPES.map((tab) => (
                            <Tabs.Tab key={tab} value={tab} leftSection={<Icon name={TAB_ICONS[tab]} height="18px" />}>
                                {t(TAB_LABEL_KEYS[tab])}
                            </Tabs.Tab>
                        ))}
                    </Tabs.List>
                </Tabs>
                {CATEGORY_TYPES.includes(type) && (
                    <CategoryChips libraryId={libraryId} type={type} selected={category}
                        onSelect={(id) => setParam('category', id)} />
                )}
            </Stack>

            <Flex gap="xl" align="flex-start">
                {sidebar && <Box visibleFrom="md" w={240} style={{ flexShrink: 0 }}>{sidebar}</Box>}
                <Stack gap="xl" style={{ flex: 1, minWidth: 0 }}>
                    {type === 'books' && user && !query && !category && <LastReadBooks libraryId={libraryId} />}
                    {type === 'books' && <Title order={2}>{t('exploreSidebar.library')}</Title>}
                    {['authors', 'series', 'periodicals'].includes(type) && <Title order={2} visibleFrom="md">{t(TAB_LABEL_KEYS[type])}</Title>}
                    {lists[type]}
                </Stack>
            </Flex>
        </Container>
    );
};

export default ExplorePage;
