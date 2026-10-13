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
    IconCalendar
} from '@/components/icon';

import IconText from '@/components/iconText';
import If from '@/components/if';
//------------------------------------------------------

const BookInfo = ({ book }) => {
    const { t } = useTranslation();
    const theme = useMantineTheme();

    if (!book) {
        return null;
    }

    return (<Stack>
        <If condition={book.yearPublished != null}>
            <IconText size="sm" icon={<IconCalendar height={24} style={{ color: theme.colors.dark[2] }} />} text={book.yearPublished} />
        </If>
        <If condition={book.publisher != null}>
            <IconText size="sm" icon={<IconPublisher height={24} style={{ color: theme.colors.dark[2] }} />} text={book.publisher} />
        </If>
        <If condition={book.language != null}>
            <IconText size="sm" icon={<IconLanguage height={24} style={{ color: theme.colors.dark[2] }} />} text={t(`languages.${book.language}`)} />
        </If>
        <If condition={book.isPublic != null}>
            <IconText size="sm" icon={<IconWorld height={24} style={{ color: theme.colors.dark[2] }} />} text={t("book.isPublic")} />
        </If>
        <If condition={book.copyrights != null}>
            <IconText size="sm" icon={<IconCopyright height={24} style={{ color: theme.colors.dark[2] }} />} text={t(`copyrights.${book.copyrights}`)} />
        </If>
        <If condition={book.pageCount != null}>
            <IconText size="sm" icon={<IconPages height={24} style={{ color: theme.colors.dark[2] }} />} text={t("book.pageCount", { count: book.pageCount })} />
        </If>

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
        pageCount: PropTypes.number
    })
};

export default BookInfo;
