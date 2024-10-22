import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

// UI library imports
import {
    Avatar,
    Center,
    List,
    Skeleton,
    Space,
    Text,
    Title,
    rem
} from '@mantine/core';
import { useGetBookChaptersQuery } from '@/store/slices/books.api';
import { Link } from 'react-router-dom';
//------------------------------------------------------

const PRIMARY_COL_HEIGHT = rem(300);

const BookChaptersList = ({ libraryId, book, isLoading }) => {
    const { t } = useTranslation();
    const {
        data: chapters,
        //error: errorLoadingChapters,
        isFetching: loadingChapters,
    } = useGetBookChaptersQuery({
        libraryId,
        bookId: book?.id
    }, { skip: isLoading === false || !libraryId || book === null || book?.id === null });

    if (isLoading === true || loadingChapters) {
        return (<Skeleton height={PRIMARY_COL_HEIGHT} radius="md" />);
    }

    if (chapters === null || chapters.data === null || chapters.data.length < 1) {
        return (<Center h={100}><Text>{t('book.chapterCount', { count: 0 })}</Text></Center>);
    }

    return (<>
        <Title order={3}>{t('book.chapters')}</Title>
        <Space h="md" />
        <List size="lg" spacing="md"> {chapters.data.map((chapter =>
            <List.Item key={chapter.id}
                icon={
                    <Avatar color="cyan" radius="xl">{chapter.chapterNumber}</Avatar>
                }>
                <Text component={Link} to={`/libraries/${libraryId}/books/${book.id}/chapters/${chapter.chapterNumber}`}>
                    {chapter.title}
                </Text>
            </List.Item>
        ))}
        </List>
    </>
    );
}

BookChaptersList.propTypes = {
    libraryId: PropTypes.string,
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
        language: PropTypes.string,
        isPublic: PropTypes.bool,
        copyrights: PropTypes.string,
        pageCount: PropTypes.number,
        chapterCount: PropTypes.number,
    }),
    isLoading: PropTypes.object
};

export default BookChaptersList;