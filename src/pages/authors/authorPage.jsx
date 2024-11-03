import PropTypes from 'prop-types';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// UI library imports
import {
    Container,
    Grid,
    Image,
    SimpleGrid,
    Skeleton,
    Space,
    Stack,
    Tabs,
    Title,
    rem,
    useMantineTheme
} from '@mantine/core';

// Local imports
import { SortDirection } from "@/models";
import { useGetAuthorQuery } from '@/store/slices/authors.api';
import { IconBooks, IconWritings, IconAuthor } from '@/components/icon';
import { updateLinkToAuthorPage } from '@/utils';
import BooksList from "@/components/books/booksList";
import IconText from "@/components/iconText";
import Error from '@/components/error';

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
    const sortDirection = searchParams.get("sortDirection") ?? SortDirection.Descending;
    const pageNumber = searchParams.get("pageNumber") ?? 1;
    const pageSize = searchParams.get("pageSize") ?? 12;
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
        <Grid>
            <Grid.Col span="content">
                {(author?.links?.image)
                    ?
                    <Image
                        src={author?.links?.image}
                        h={rem(300)}
                        w="auto"
                        radius="md"
                        alt={author?.name}
                        fit="contain"
                    /> :
                    <IconAuthor width={250} style={{ color: theme.colors.dark[1] }} />
                }
            </Grid.Col>
            <Grid.Col span="auto">
                <Stack>
                    <Title order={3}>{author.name}</Title>
                    <IconText icon={<IconBooks height={16} style={{ color: theme.colors.dark[2] }} />} text={t('author.bookCount', { count: author.bookCount })} />
                    <IconText icon={<IconWritings height={16} style={{ color: theme.colors.dark[2] }} />} text={t('author.articleCount', { count: author.articleCount })} />
                </Stack>
            </Grid.Col>
        </Grid>
        <Space h="md" />
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
        </Tabs>
    </Container >);
}

AuthorPage.propTypes = {
    authors: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
    }))
};

export default AuthorPage;
