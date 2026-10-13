import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// UI library imports
import {
    Anchor,
    Badge,
    Box,
    Card,
    Container,
    Grid,
    Group,
    Progress,
    SimpleGrid,
    Skeleton,
    Stack,
    Text,
    Title,
    rem,
} from '@mantine/core';

// Local imports
import { useGetBookQuery } from '@/store/slices/books.api';
import BookChaptersList from '@/components/books/bookChaptersList';
import BookFiles from '@/components/books/bookFiles';
import BookBookmarks from '@/components/books/bookBookmarks';
import { useGetBookChaptersQuery } from '@/store/slices/books.api';
import { IconBook } from '@/components/icon';
import classes from './bookPage.module.css';
import FavoriteButton from '@/components/books/favoriteButton';
import BookInfo from '@/components/books/bookInfo';
import BookReadButton from '@/components/books/bookReadButton';
import ShareButton from '@/components/detail/shareButton';
import AddToShelfButton from '@/components/bookShelves/addToShelfButton';
import Error from '@/components/error';
//------------------------------------------------------

const PRIMARY_COL_HEIGHT = rem(300);

const BookPage = () => {
    const { t } = useTranslation();
    const { libraryId, bookId } = useParams();
    const user = useSelector((state) => state.auth.user);
    const [imgError, setImgError] = useState(false);

    const {
        data: book,
        error: errorLoadingBook,
        isFetching: loadingBook,
        refetch
    } = useGetBookQuery({
        libraryId,
        bookId
    });

    // Shared with the chapter list below (same query, one request); needed for "Chapter 7 of 22"
    const { data: chaptersData } = useGetBookChaptersQuery({ libraryId, bookId }, { skip: !book });
    const chapters = chaptersData?.data ?? [];

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

    const authors = (book.authors ?? []).map((author) => author.name).join(', ');
    const progress = typeof book.readProgress?.progressValue === 'number' ? book.readProgress.progressValue : null;
    const chapterPosition = chapters.findIndex((chapter) => chapter.id === book.readProgress?.progressId);
    const chapterNumber = book.readProgress?.progressType === 'Chapter' && chapterPosition >= 0 ? chapterPosition + 1 : null;

    return (
        <Container size="lg" mt="md">
            <Anchor component={Link} to={`/libraries/${libraryId}/explore/books`} size="sm" c="inherit">
                ← {t('bookPage.back')}
            </Anchor>

            <Group align="flex-start" wrap="wrap" gap={rem(40)} mt="lg">
                <Box className={classes.cover}>
                    {book.links?.image && !imgError
                        ? <img src={book.links.image} alt={book.title} onError={() => setImgError(true)} />
                        : <IconBook width={56} style={{ color: 'var(--mantine-color-accent-4)' }} />}
                </Box>
                <Stack gap="sm" style={{ flex: 1, minWidth: rem(280) }}>
                    <Title order={1}>{book.title}</Title>
                    <Text size="lg">
                        {authors && <>{t('bookPage.by')} {authors}</>}
                        {book.seriesName && <> · {t('bookPage.series', { index: book.seriesIndex ?? '', series: book.seriesName })}</>}
                    </Text>
                    <Group gap="xs">
                        {(book.categories ?? []).map((category) => (
                            <Badge key={category.id} component={Link}
                                to={`/libraries/${libraryId}/explore/books?category=${category.id}`}
                                variant="light" style={{ cursor: 'pointer' }}>{category.name}</Badge>
                        ))}
                        {book.isPublic && <Badge variant="outline" color="gray">{t('bookPage.publicDomain')}</Badge>}
                    </Group>
                    {book.description && <Text maw={560} style={{ lineHeight: 1.7 }}>{book.description}</Text>}

                    {user && progress !== null && (
                        <Card padding="md" maw={460} my="xs">
                            <Group justify="space-between" mb="xs">
                                <Text size="sm">
                                    {chapterNumber != null ? t('bookPage.chapterOf', { current: chapterNumber, total: chapters.length }) : ''}
                                </Text>
                                <Text size="sm">{t('bookPage.complete', { value: Math.round(progress) })}</Text>
                            </Group>
                            <Progress value={progress} size="sm" />
                        </Card>
                    )}

                    <Group gap="md" mt="xs" wrap="wrap">
                        <BookReadButton libraryId={libraryId} book={book} resume={Boolean(user && progress)} />
                        <Group gap="xs">
                            <FavoriteButton book={book} size={24} />
                            <AddToShelfButton libraryId={libraryId} bookId={book.id} />
                            <ShareButton title={book.title} />
                        </Group>
                    </Group>
                </Stack>
            </Group>

            <Stack gap={rem(40)} mt={rem(40)}>
                <BookChaptersList libraryId={libraryId} book={book} isLoading={{ loadingBook }} />
                {user && <BookFiles libraryId={libraryId} book={book} />}
                <SimpleGrid cols={{ base: 1, sm: user ? 2 : 1 }} spacing={rem(40)}>
                    {user && <BookBookmarks libraryId={libraryId} bookId={book.id} />}
                    <BookInfo book={book} />
                </SimpleGrid>
            </Stack>
        </Container>
    );
}

export default BookPage;
