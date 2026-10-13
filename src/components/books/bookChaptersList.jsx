import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

// UI library imports
import { Anchor, Box, Button, Card, Center, Group, Skeleton, Stack, Text, Title } from '@mantine/core';

// Local imports
import { useGetBookChaptersQuery } from '@/store/slices/books.api';
import { IconReaderImage, IconReaderText } from '@/components/icon';
import Error from '@/components/error';
//------------------------------------------------------

// The book's chapters as rows: number, title and page range, a "Read as EPUB" button and, when
// the book has scanned pages and the chapter knows where it starts, a "Go to page" link.
const BookChaptersList = ({ libraryId, book, isLoading }) => {
    const { t } = useTranslation();
    const {
        data: chapters,
        error: errorLoadingChapters,
        isFetching: loadingChapters,
        refetch
    } = useGetBookChaptersQuery({
        libraryId,
        bookId: book?.id
    }, { skip: isLoading === false || !libraryId || book === null || book?.id === null });

    if (isLoading === true || loadingChapters) {
        return (<Skeleton height={200} radius="md" />);
    }
    if (errorLoadingChapters) {
        return (<Error title={t('book.error.loading.title')}
            detail={t('book.error.loading.detail')}
            onRetry={refetch} />)
    }

    if (!chapters || !chapters.data || chapters.data.length < 1) {
        return (<Center h={100}><Text>{t('book.chapterCount', { count: 0 })}</Text></Center>);
    }

    const base = `/libraries/${libraryId}/books/${book.id}`;

    return (
        <Stack gap="sm">
            <Title order={3}>{t('bookPage.chapters')}</Title>
            {chapters.data.map((chapter) => {
                const start = chapter.startPage ?? chapter.pageNumber;
                const end = chapter.endPage;
                return (
                    <Card key={chapter.id} padding="sm" shadow="xs">
                        <Group wrap="nowrap" gap="md">
                            <Text c="accent" fw={700} fz="lg" w={32} ta="center">{chapter.chapterNumber}</Text>
                            <Box style={{ flex: 1, minWidth: 0 }}>
                                <Text fw={600} truncate="end">{chapter.title}</Text>
                                {start != null && end != null && (
                                    <Text size="xs" c="dimmed">{t('bookPage.pages', { from: start, to: end })}</Text>
                                )}
                            </Box>
                            <Button component={Link} to={`${base}/ebook?chapter=${chapter.chapterNumber}`}
                                variant="light" size="compact-md" leftSection={<IconReaderText height={16} />}>
                                {t('bookPage.readAsEpub')}
                            </Button>
                            {start != null && book.pageCount > 0 && (
                                <Anchor component={Link} to={`${base}/read?page=${start}`} size="sm" fw={600} visibleFrom="sm">
                                    <Group gap={4} wrap="nowrap"><IconReaderImage height={16} />{t('bookPage.goToPage', { page: start })}</Group>
                                </Anchor>
                            )}
                        </Group>
                    </Card>
                );
            })}
        </Stack>
    );
}

BookChaptersList.propTypes = {
    libraryId: PropTypes.string,
    book: PropTypes.shape({
        id: PropTypes.number,
        pageCount: PropTypes.number,
    }),
    isLoading: PropTypes.object
};

export default BookChaptersList;
