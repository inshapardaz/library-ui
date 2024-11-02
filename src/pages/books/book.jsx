import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

// UI library imports
import {
    Container,
    Grid,
    Image,
    SimpleGrid,
    Skeleton,
    Space,
    rem
} from '@mantine/core';

// Local imports
import { useGetBookQuery } from '@/store/slices/books.api';
import BookChaptersList from '@/components/books/bookChaptersList';
import { BookInfo } from '../../components/books/BookInfo';

//------------------------------------------------------

export const PRIMARY_COL_HEIGHT = rem(300);

const BookPage = () => {
    const { libraryId, bookId } = useParams();
    const {
        data: book,
        error: errorLoadingBook,
        isFetching: loadingBook,
    } = useGetBookQuery({
        libraryId,
        bookId
    });

    const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

    if (errorLoadingBook) {
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

    return (<Container my="md">
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
            {(loadingBook === true || !book)
                ?
                (<Skeleton height={PRIMARY_COL_HEIGHT} radius="md" />)
                :
                <Image
                    src={book?.links?.image}
                    h={rem(400)}
                    w="auto"
                    radius="md"
                    alt={book?.title}
                    fit="contain"
                />}
            <BookInfo libraryId={libraryId} book={book} isLoading={{ loadingBook }} />
        </SimpleGrid>
        <Space h="md" />
        <BookChaptersList libraryId={libraryId} book={book} isLoading={{ loadingBook }} />
    </Container>);
}

BookPage.propTypes = {
    authors: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
    }))
};

export default BookPage;
