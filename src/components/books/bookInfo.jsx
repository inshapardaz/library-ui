import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";

// UI Library Imports
import { useMantineTheme, Stack } from "@mantine/core";

// Local Imports
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
//------------------------------------------------------

const BookInfo = ({ book }) => {
    const { t } = useTranslation();
    const theme = useMantineTheme();

    if (!book) {
        return null;
    }
    return (<Stack>
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
    book: PropTypes.shape({
        id: PropTypes.number,
        publisher: PropTypes.string,
        yearPublished: PropTypes.number,
        language: PropTypes.string,
        isPublic: PropTypes.bool,
        copyrights: PropTypes.string,
        pageCount: PropTypes.number,
        chapterCount: PropTypes.number,
    })
};

export default BookInfo;