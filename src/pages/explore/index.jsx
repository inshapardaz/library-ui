import { useTranslation } from "react-i18next";
import { Navigate, useNavigate, useParams, useSearchParams } from "react-router-dom";

// Ui library imports
import { Button, Card, Container, Group, Select, Stack, Tabs } from "@mantine/core";

// Local Import
import { SortDirection } from "@/models";
import PeriodicalFrequency from "@/models/periodicalFrequency";
import { EXPLORE_TYPES } from "@/utils/legacyRedirects";
import PageHeader from "@/components/pageHeader";
import CategoryChips from "@/components/explore/categoryChips";
import BooksList from "@/components/books/booksList";
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

// One page for every content type. The active tab is the :type path segment and every filter
// is a query parameter, so any view is linkable and the back button restores it.
const ExplorePage = () => {
    const { t } = useTranslation();
    const { libraryId, type } = useParams();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    if (!EXPLORE_TYPES.includes(type)) {
        return <Navigate to={`/libraries/${libraryId}/explore/books`} replace />;
    }

    const query = searchParams.get("query");
    const category = searchParams.get("category");
    const hasFilters = ['query', 'category', 'author', 'series', 'bookShelf', 'frequency', 'authorType']
        .some((key) => searchParams.get(key));
    const sortBy = searchParams.get("sortBy") ?? (type === 'periodicals' ? "title" : "name");
    const sortDirection = searchParams.get("sortDirection") ?? SortDirection.Ascending;
    const pageNumber = parseInt(searchParams.get("pageNumber") ?? "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") ?? "12", 10);

    const selectCategory = (id) => {
        const next = new URLSearchParams(searchParams);
        if (id == null) next.delete('category'); else next.set('category', id);
        next.delete('pageNumber');
        setSearchParams(next);
    };

    const frequency = searchParams.get("frequency");
    const selectFrequency = (value) => {
        const next = new URLSearchParams(searchParams);
        if (value) next.set('frequency', value); else next.delete('frequency');
        next.delete('pageNumber');
        setSearchParams(next);
    };

    const common = { libraryId, query, sortBy, sortDirection, pageNumber, pageSize, showSearch: true };

    const lists = {
        books: <BooksList {...common} showTitle={false}
            author={searchParams.get("author")}
            category={category}
            bookShelf={searchParams.get("bookShelf")}
            series={searchParams.get("series")} />,
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

    return (
        <Container fluid>
            <PageHeader
                title={t('explore.title')}
                subTitle={t('explore.description')}
                defaultIcon={IconNames.Search}
                breadcrumbs={[
                    { title: t('header.home'), href: `/libraries/${libraryId}`, icon: IconNames.Home }
                ]} />
            <Stack mx="md" gap="md">
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
                    <CategoryChips libraryId={libraryId} type={type} selected={category} onSelect={selectCategory} />
                )}
                {type === 'periodicals' && (
                    <Select
                        w={{ base: '100%', sm: 260 }}
                        clearable
                        placeholder={t('periodical.frequency.placeholder')}
                        value={frequency}
                        onChange={selectFrequency}
                        data={Object.entries(PeriodicalFrequency)
                            .filter(([key]) => key !== 'All')
                            .map(([key, value]) => ({ value, label: t(`periodical.frequency.${key.toLowerCase()}`) }))} />
                )}
                {hasFilters && (
                    <Group>
                        <Button variant="subtle" size="compact-sm"
                            onClick={() => navigate(`/libraries/${libraryId}/explore/${type}`)}>
                            {t('explore.clearFilters')}
                        </Button>
                    </Group>
                )}
                <Card withBorder>
                    {lists[type]}
                </Card>
            </Stack>
        </Container>
    );
};

export default ExplorePage;
