import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
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
    Text,
    Title,
    rem,
    useMantineTheme
} from '@mantine/core';

// Local imports
import { useGetBookQuery } from '@/store/slices/books.api';
import AuthorsAvatar from '@/components/authors/authorsAvatar';
import CategoriesList from '@/components/categories/categoriesList';
import BookSeriesInfo from '@/components/series/bookSeriesInfo';
import BookChaptersList from '@/components/books/bookChaptersList';
import IconText from '@/components/iconText';
import {
    IconPublisher,
    IconLanguage,
    IconWorld,
    IconPages,
    IconCopyright,
    IconCalendar
} from '@/components/icon';
import { IconChapters } from '../../components/icon';
//------------------------------------------------------

const BookInfo = ({ libraryId, book, isLoading }) => {
    const { t } = useTranslation();
    const theme = useMantineTheme();


    if (isLoading === true || !book) {
        return (<Skeleton height={PRIMARY_COL_HEIGHT} radius="md" />)
    }
    return (<Stack>
        <Title order={3}>{book.title}</Title>
        {book?.description && <Text order={3}>{book.description}</Text>}
        <AuthorsAvatar libraryId={libraryId} authors={book?.authors} showNames />
        <CategoriesList categories={book?.categories} />
        <BookSeriesInfo book={book} />
        {book.yearPublished != null ? (<IconText icon={<IconCalendar height={24} style={{ color: theme.colors.dark[2] }} />} text={book.yearPublished} />) : null}
        {book.publisher != null ? (<IconText icon={<IconPublisher height={24} style={{ color: theme.colors.dark[2] }} />} text={book.publisher} />) : null}
        {book.language != null ? (<IconText icon={<IconLanguage height={24} style={{ color: theme.colors.dark[2] }} />} text={t(`languages.${book.language}`)} />) : null}
        {book.isPublic ? (<IconText icon={<IconWorld height={24} style={{ color: theme.colors.dark[2] }} />} text={t("book.isPublic")} />) : null}
        {book.copyrights != null ? (<IconText icon={<IconCopyright height={24} style={{ color: theme.colors.dark[2] }} />} text={t(`copyrights.${book.copyrights}`)} />) : null}
        {book.pageCount != null ? (<IconText icon={<IconPages height={24} style={{ color: theme.colors.dark[2] }} />} text={t("book.pageCount", { count: book.pageCount })} />) : null}
        {book.chapterCount != null ? (<IconText icon={<IconChapters height={24} style={{ color: theme.colors.dark[2] }} />} text={t("book.chapterCount", { count: book.chapterCount })} />) : null}
    </Stack>);
};

BookInfo.propTypes = {
    isLoading: PropTypes.object,
    libraryId: PropTypes.number,
    book: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        authors: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string
        })),
        categories: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string
        })),
        links: PropTypes.shape({
            image: PropTypes.string,
        }),
        publisher: PropTypes.string,
        yearPublished: PropTypes.number,
        language: PropTypes.string,
        isPublic: PropTypes.bool,
        copyrights: PropTypes.string,
        pageCount: PropTypes.number,
        chapterCount: PropTypes.number,
    })
};
//------------------------------------------------------

const PRIMARY_COL_HEIGHT = rem(300);

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
