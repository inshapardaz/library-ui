import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";

// UI Library imports
import { Card, Tabs, useMantineTheme } from "@mantine/core";

// Local imports
import { updateLinkToSearchPage } from '@/utils';
import { IconNames, IconBooks, IconAuthors, IconSeries, IconPeriodicals, IconWritings, IconPoetries } from '@/components/icon'
import PageHeader from "@/components/pageHeader";
import BooksList from "@/components/books/booksList";
import AuthorsList from "@/components/authors/authorsList";
import WritingsList from "@/components/writings/writingsList";
import PoetryList from "@/components/poetry/poetryList";
import SeriesList from "@/components/series/seriesList";
import PeroidicalsList from "@/components/periodicals/periodicalsList";
import SearchInput from '@/components/searchInput';

//-------------------------------------
const SearchPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { libraryId } = useParams();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const section = searchParams.get("section") ?? "books";
    const query = searchParams.get("query");
    const pageNumber = parseInt(searchParams.get("pageNumber") ?? "1");
    const pageSize = parseInt(searchParams.get("pageSize") ?? "12");
    const theme = useMantineTheme();

    const onChangeTab = (key) => {
        navigate(updateLinkToSearchPage(location, { section: key, query, pageNumber: 1 }));
    };

    const onSearchChanged = (query) => {
        navigate(updateLinkToSearchPage(location, { section, query, pageNumber: 1 }));
    }

    return (<>
        <PageHeader
            title={t('search.header')}
            defaultIcon={IconNames.Search}
            breadcrumbs={[
                { title: t('header.home'), href: `/libraries/${libraryId}`, icon: IconNames.Home }
            ]} />
        <Card withBorder mx="md">
            <Card.Section withBorder inheritPadding py="xs">
                <SearchInput onQueryChanged={onSearchChanged} />
            </Card.Section>
            <Tabs value={section} onChange={onChangeTab}>
                <Tabs.List>
                    <Tabs.Tab value="books" leftSection={<IconBooks style={{ color: theme.colors.dark[3] }} />}>
                        {t('header.books')}
                    </Tabs.Tab>
                    <Tabs.Tab value="authors" leftSection={<IconAuthors style={{ color: theme.colors.dark[3] }} />}>
                        {t('header.authors')}
                    </Tabs.Tab>
                    <Tabs.Tab value="writings" leftSection={<IconWritings style={{ color: theme.colors.dark[3] }} />}>
                        {t('header.writings')}
                    </Tabs.Tab>
                    <Tabs.Tab value="poetries" leftSection={<IconPoetries style={{ color: theme.colors.dark[3] }} />}>
                        {t('header.poetry')}
                    </Tabs.Tab>
                    <Tabs.Tab value="series" leftSection={<IconSeries style={{ color: theme.colors.dark[3] }} />}>
                        {t('header.series')}
                    </Tabs.Tab>
                    <Tabs.Tab value="periodicals" leftSection={<IconPeriodicals style={{ color: theme.colors.dark[3] }} />}>
                        {t('header.periodicals')}
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="books">
                    <BooksList
                        libraryId={libraryId}
                        query={query}
                        pageNumber={pageNumber}
                        pageSize={pageSize}
                        searchMode />
                </Tabs.Panel>

                <Tabs.Panel value="authors">
                    <AuthorsList
                        libraryId={libraryId}
                        query={query}
                        pageNumber={pageNumber}
                        pageSize={pageSize}
                        searchMode />
                </Tabs.Panel>

                <Tabs.Panel value="writings">
                    <WritingsList
                        libraryId={libraryId}
                        query={query}
                        pageNumber={pageNumber}
                        pageSize={pageSize}
                        searchMode />
                </Tabs.Panel>

                <Tabs.Panel value="poetries">
                    <PoetryList
                        libraryId={libraryId}
                        query={query}
                        pageNumber={pageNumber}
                        pageSize={pageSize}
                        searchMode />
                </Tabs.Panel>

                <Tabs.Panel value="series">
                    <SeriesList
                        libraryId={libraryId}
                        query={query}
                        pageNumber={pageNumber}
                        pageSize={pageSize}
                        searchMode />
                </Tabs.Panel>

                <Tabs.Panel value="periodicals">
                    <PeroidicalsList
                        libraryId={libraryId}
                        query={query}
                        pageNumber={pageNumber}
                        pageSize={pageSize}
                        searchMode />
                </Tabs.Panel>
            </Tabs>
        </Card>
    </>
    );
};

export default SearchPage;
