import PropTypes from 'prop-types';
import { useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// UI library imports
import {
    Container,
    Grid,
    Image,
    SimpleGrid,
    Skeleton,
    Stack,
    Text,
    Title,
    rem,
    useMantineTheme
} from '@mantine/core';

// Local imports
import { SortDirection } from "@/models";
import { useGetSeriesByIdQuery } from '@/store/slices/series.api';
import { IconBooks, IconSeries } from '@/components/icon';
import BooksList from "@/components/books/booksList";
import IconText from "@/components/iconText";

//------------------------------------------------------
const PRIMARY_COL_HEIGHT = rem(300);


const SeriesPage = () => {
    const { libraryId, seriesId } = useParams();
    const { t } = useTranslation();
    const theme = useMantineTheme();
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    const sortDirection = searchParams.get("sortDirection") ?? SortDirection.Ascending;
    const pageNumber = searchParams.get("pageNumber") ?? 1;
    const pageSize = searchParams.get("pageSize") ?? 12;
    const {
        data: series,
        error: errorLoadingSeries,
        isFetching: loadingSeries,
    } = useGetSeriesByIdQuery({
        libraryId,
        seriesId
    });

    const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

    if (loadingSeries) {
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

    if (errorLoadingSeries) {
        return "Error";
    }

    return (<Container fluid mt='md'>
        <Grid>
            <Grid.Col span="content">
                {(series?.links?.image)
                    ?
                    <Image
                        src={series?.links?.image}
                        h={rem(300)}
                        w="auto"
                        radius="md"
                        alt={series?.name}
                        fit="contain"
                    /> :
                    <IconSeries width={250} style={{ color: theme.colors.dark[1] }} />
                }
            </Grid.Col>
            <Grid.Col span="auto">
                <Stack>
                    <Title order={3}>{series.name}</Title>
                    <Text order={3}>{series.description}</Text>
                    <IconText icon={<IconBooks height={16} style={{ color: theme.colors.dark[2] }} />} text={t('author.bookCount', { count: series.bookCount })} />
                </Stack>
            </Grid.Col>
        </Grid>
        <BooksList
            libraryId={libraryId}
            series={series?.id}
            query={query}
            sortBy="seriesIndex"
            sortDirection={sortDirection}
            pageNumber={pageNumber}
            pageSize={pageSize}
            showSearch
            showTitle={false} />
    </Container >);
}

SeriesPage.propTypes = {
    authors: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
    }))
};

export default SeriesPage;
