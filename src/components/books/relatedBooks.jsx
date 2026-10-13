import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

// Ui Library imports
import { Center, Loader, SimpleGrid, Stack, Text, Title } from '@mantine/core';

// Local imports
import { useGetBooksQuery } from '@/store/slices/books.api';
import BookCard from './bookCard';

//------------------------------

const RelatedGroup = ({ libraryId, title, filter, bookId }) => {
    const { data, isFetching } = useGetBooksQuery({ libraryId, pageSize: 7, ...filter });
    const books = (data?.data ?? []).filter((b) => b.id !== bookId).slice(0, 6);

    if (!isFetching && books.length === 0) return null;

    return (
        <Stack gap="xs">
            <Title order={4}>{title}</Title>
            {isFetching
                ? <Center h={100}><Loader size={30} /></Center>
                : <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }}>
                    {books.map((book) => <BookCard key={book.id} libraryId={libraryId} book={book} />)}
                </SimpleGrid>}
        </Stack>
    );
};

RelatedGroup.propTypes = {
    libraryId: PropTypes.string,
    title: PropTypes.string,
    filter: PropTypes.object,
    bookId: PropTypes.number,
};

// Other books by the same author, in the same series and in the same category. Groups without
// results are skipped; each group fetches only when the Related tab is opened.
const RelatedBooks = ({ libraryId, book }) => {
    const { t } = useTranslation();
    const authorId = book?.authors?.[0]?.id;
    const category = book?.categories?.[0];

    if (!authorId && !book?.seriesId && !category) {
        return <Text c="dimmed">{t('detail.related.empty')}</Text>;
    }

    return (
        <Stack gap="xl">
            {authorId && <RelatedGroup libraryId={libraryId} bookId={book.id} title={t('detail.related.sameAuthor')} filter={{ author: authorId }} />}
            {book.seriesId && <RelatedGroup libraryId={libraryId} bookId={book.id} title={t('detail.related.sameSeries')} filter={{ series: book.seriesId, sortBy: 'seriesIndex' }} />}
            {category && <RelatedGroup libraryId={libraryId} bookId={book.id} title={t('detail.related.sameCategory')} filter={{ category: category.id }} />}
        </Stack>
    );
};

RelatedBooks.propTypes = {
    libraryId: PropTypes.string,
    book: PropTypes.shape({
        id: PropTypes.number,
        seriesId: PropTypes.number,
        authors: PropTypes.array,
        categories: PropTypes.array,
    }),
};

export default RelatedBooks;
