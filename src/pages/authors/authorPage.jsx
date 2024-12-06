import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// UI library imports
import {
    Card,
    Container,
    Divider,
    Grid,
    Group,
    SimpleGrid,
    Skeleton,
    Tabs,
    rem,
    useMantineTheme
} from '@mantine/core';

// Local imports
import { SortDirection } from "@/models";
import { useGetAuthorQuery } from '@/store/slices/authors.api';
import { IconNames, IconBooks, IconWritings } from '@/components/icon';
import { updateLinkToAuthorPage } from '@/utils';
import BooksList from "@/components/books/booksList";
import WritingsList from "@/components/writings/writingsList";
import IconText from "@/components/iconText";
import Error from '@/components/error';
import PageHeader from "@/components/pageHeader";
import If from "@/components/if";

//------------------------------------------------------

const PRIMARY_COL_HEIGHT = rem(300);


const AuthorPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { libraryId, authorId } = useParams();
    const theme = useMantineTheme();
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    const sortBy = searchParams.get("sortBy") ?? "name";
    const sortDirection = searchParams.get("sortDirection") ?? SortDirection.Ascending;
    const pageNumber = parseInt(searchParams.get("pageNumber") ?? "1");
    const pageSize = parseInt(searchParams.get("pageSize") ?? "12");
    const selectedTab = searchParams.get("tab") ?? "books";
    const {
        data: author,
        error: errorLoadingAuthor,
        isFetching: loadingAuthor,
        refetch
    } = useGetAuthorQuery({
        libraryId,
        authorId
    });

    const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

    const onTabChanged = (value) => {
        navigate(updateLinkToAuthorPage(location, {
            tab: value,
            pageNumber: 1,
            query: ""
        }))
    };

    if (loadingAuthor) {
        return (<Container my="md">
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
                <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" />
                <Grid gutter="md">
                    <Grid.Col>
                        <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" />
                    </Grid.Col>
                </Grid>
            </SimpleGrid>
        </Container>);
    }

    if (errorLoadingAuthor) {
        return (<Container my="md">
            <Error title={t('authors.error.loading.title')}
                detail={t('authors.error.loading.detail')}
                onRetry={refetch} />
        </Container>)
    }

    return (<Container fluid mt='md'>
        <PageHeader title={author.name}
            imageLink={author?.links?.image}
            defaultIcon={IconNames.Author}
            subTitle={<Group>
                <If condition={author.bookCount > 0}>
                    <IconText icon={<IconBooks height={16} style={{ color: theme.colors.dark[2] }} />} text={t('author.bookCount', { count: author.bookCount })} />
                </If>
                <If condition={author.articleCount > 0 && author.bookCount > 0}>
                    <Divider orientation='vertical' />
                </If>
                <If condition={author.articleCount > 0}>
                    <IconText icon={<IconWritings height={16} style={{ color: theme.colors.dark[2] }} />} text={t('author.articleCount', { count: author.articleCount })} />
                </If>
            </Group>}
            breadcrumbs={[
                { title: t('header.home'), href: `/libraries/${libraryId}`, icon: IconNames.Home },
                { title: t('header.authors'), href: `/libraries/${libraryId}/authors`, icon: IconNames.Author },
            ]}
            details={author.description} />

        <Card withBorder>
            <Tabs keepMounted={false} value={selectedTab} onChange={onTabChanged}>
                <Tabs.List>
                    <Tabs.Tab value="books" leftSection={<IconBooks height={16} style={{ color: theme.colors.dark[2] }} />}>
                        {t('author.booksTabLabel', { count: author.bookCount })}
                    </Tabs.Tab>
                    <Tabs.Tab value="writings" leftSection={<IconWritings height={16} style={{ color: theme.colors.dark[2] }} />}>
                        {t('author.writingsTabLabel', { count: author.articleCount })}
                    </Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="books">
                    <BooksList
                        libraryId={libraryId}
                        author={author?.id}
                        query={query}
                        sortBy={sortBy}
                        sortDirection={sortDirection}
                        pageNumber={pageNumber}
                        pageSize={pageSize}
                        showSearch
                        showTitle={false} />
                </Tabs.Panel>
                <Tabs.Panel value="writings">
                    <WritingsList
                        libraryId={libraryId}
                        author={author?.id}
                        query={query}
                        sortBy={sortBy}
                        sortDirection={sortDirection}
                        pageNumber={pageNumber}
                        pageSize={pageSize}
                        showSearch
                        showTitle={false} />
                </Tabs.Panel>
            </Tabs>
        </Card>

    </Container >);
}

export default AuthorPage;
