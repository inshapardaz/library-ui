import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// UI library imports
import {
    Card,
    Center,
    Container,
    Grid,
    Skeleton,
    Stack,
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
import BookReadButton from '@/components/books/bookReadButton';
import RelatedBooks from '@/components/books/relatedBooks';
import DetailTemplate from '@/components/detail/detailTemplate';
import ShareButton from '@/components/detail/shareButton';
import AddToShelfButton from '@/components/bookShelves/addToShelfButton';
import Error from '@/components/error';
import { IconNames, IconBook } from '@/components/icon';
//------------------------------------------------------

const PRIMARY_COL_HEIGHT = rem(300);

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

    const icon = <Center h={320}><IconBook width={200} style={{ color: theme.colors.dark[1] }} /></Center>;

    return (<DetailTemplate
        title={book.title}
        subTitle={book.description}
        image={book?.links?.image}
        imageAlt={book?.title}
        fallbackIcon={icon}
        breadcrumbs={[
            { title: t('header.home'), href: `/libraries/${libraryId}`, icon: IconNames.Home },
            { title: t('header.books'), href: `/libraries/${libraryId}/explore/books`, icon: IconNames.Books },
        ]}
        meta={
            <Stack gap="xs">
                <AuthorsAvatar libraryId={libraryId} authors={book?.authors} showNames />
                <BookSeriesInfo libraryId={libraryId} book={book} />
                <CategoriesList categories={book?.categories} size={24} showIcon={false} />
            </Stack>
        }
        primaryAction={<BookReadButton libraryId={libraryId} book={book} />}
        secondaryActions={[
            <FavoriteButton key="book-fav-button" book={book} size={24} />,
            <AddToShelfButton key="book-shelf-button" libraryId={libraryId} bookId={book.id} />,
            <ShareButton key="book-share-button" title={book.title} />,
        ]}
        tabs={[
            { value: 'about', content: <BookInfo book={book} /> },
            { value: 'contents', content: <Card withBorder><BookChaptersList libraryId={libraryId} book={book} isLoading={{ loadingBook }} /></Card> },
            { value: 'related', content: <RelatedBooks libraryId={libraryId} book={book} /> },
        ]} />);
}

export default BookPage;
