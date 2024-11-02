import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";

// UI Library Imports
import { useMantineTheme, Skeleton, Stack, Title, Text, Group } from "@mantine/core";

// Local Imports
import AuthorsAvatar from '@/components/authors/authorsAvatar';
import CategoriesList from '@/components/categories/categoriesList';
import {
    IconPublisher,
    IconLanguage,
    IconWorld,
    IconPages,
    IconCopyright,
    IconCalendar,
    IconChapters
} from '@/components/icon';
import IconText from '@/components/iconText';
import BookSeriesInfo from '@/components/series/bookSeriesInfo';
import { PRIMARY_COL_HEIGHT } from "@/pages/books/book";
import FavoriteButton from './favoriteButton';
//------------------------------------------------------

export const BookInfo = ({ libraryId, book, isLoading }) => {
    const { t } = useTranslation();
    const theme = useMantineTheme();

    if (isLoading === true || !book) {
        return (<Skeleton height={PRIMARY_COL_HEIGHT} radius="md" />);
    }
    return (<Stack>
        <Group>
            <Title order={3}>{book.title}</Title>
            <FavoriteButton book={book} />
        </Group>
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
            create_favorite: PropTypes.string,
            remove_favorite: PropTypes.string,
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
