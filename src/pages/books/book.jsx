import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// UI library imports
import {
    Button,
    Center,
    Container,
    Divider,
    Grid,
    Group,
    Image,
    Skeleton,
    Space,
    Stack,
    Text,
    Title,
    rem,
    useMantineTheme
} from '@mantine/core';

// Local imports
import { useGetBookQuery } from '@/store/slices/books.api';
import BookChaptersList from '@/components/books/bookChaptersList';
import BookSeriesInfo from '@/components/series/bookSeriesInfo';
import FavoriteButton from '@/components/books/favoriteButton';
import AuthorsAvatar from '@/components/authors/authorsAvatar';
import CategoriesList from '@/components/categories/categoriesList';
import BookInfo from '@/components/books/bookInfo';
import Error from '@/components/error';
import { IconBook } from '@/components/icon';
//------------------------------------------------------

export const PRIMARY_COL_HEIGHT = rem(300);

const BookPage = () => {
    const { t } = useTranslation();
    const { libraryId, bookId } = useParams();
    const theme = useMantineTheme();
    const {
        data: book,
        error: errorLoadingBook,
        isFetching: loadingBook,
        refetch
    } = useGetBookQuery({
        libraryId,
        bookId
    });

    const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;


    if (loadingBook) {
        return (<Container fluid mt="sm">
            <Grid
                mih={50}
            >
                <Grid.Col span={{ base: 12, md: 4, lg: 3 }}>
                    <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 8, lg: 9 }}>
                    <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4, lg: 3 }}>
                    <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 8, lg: 9 }}>
                    <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" />
                </Grid.Col>
            </Grid>
        </Container>);
    }

    if (errorLoadingBook) {
        return (<Container fluid mt="sm">
            <Error title={t('book.error.loading.title')}
                detail={t('book.error.loading.detail')}
                onRetry={refetch} />
        </Container>)
    }

    const icon = <Center h={450}><IconBook width={250} style={{ color: theme.colors.dark[1] }} /></Center>;

    return (<Container fluid mt="sm">
        <Grid
            mih={50}
        >
            <Grid.Col span={{ base: 12, md: 4, lg: 3 }}>
                {book.links?.image ?
                    <Image
                        src={book?.links?.image}
                        h={rem(400)}
                        w="auto"
                        radius="md"
                        alt={book?.title}
                        fit='contain'
                    /> :
                    icon
                }
                <Space h="md" />
                <Button fullWidth leftSection={<IconBook />}>Read</Button>
                <Space h="md" />
                <Button fullWidth variant='outline' leftSection={<IconBook />}>Download</Button>
                <Space h="md" />
                <BookInfo libraryId={libraryId} book={book} isLoading={{ loadingBook }} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 8, lg: 9 }}>
                <Stack align="stretch"
                    justify="flex-start"
                    gap="md">
                    <Group>
                        <Title order={3}>{book.title}</Title>
                        <Space w="lg" />
                        <FavoriteButton book={book} size={24} />
                    </Group>
                    <Space h="lg" />
                    {book?.description && <Text order={3}>{book.description}</Text>}
                    <AuthorsAvatar libraryId={libraryId} authors={book?.authors} showNames />
                    <CategoriesList categories={book?.categories} size={24} />
                    <BookSeriesInfo libraryId={libraryId} book={book} />
                    <Divider h="lg" />
                    <BookChaptersList libraryId={libraryId} book={book} isLoading={{ loadingBook }} />
                </Stack>
            </Grid.Col>
        </Grid>
    </Container>);
}

BookPage.propTypes = {
    authors: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
    }))
};

export default BookPage;
