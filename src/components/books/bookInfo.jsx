import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";

// UI Library Imports
import { Stack, Text, Title } from "@mantine/core";
//------------------------------------------------------

// The book's details as "Label: value" lines (publisher, year, language, copyrights, pages).
const BookInfo = ({ book }) => {
    const { t } = useTranslation();

    if (!book) {
        return null;
    }

    const rows = [
        [t('bookPage.publisher'), book.publisher],
        [t('bookPage.year'), book.yearPublished],
        [t('bookPage.language'), book.language ? t(`languages.${book.language}`) : null],
        [t('bookPage.copyrights'), book.copyrights ? t(`copyrights.${book.copyrights}`) : null],
        [t('bookPage.pageCount'), book.pageCount],
    ].filter(([, value]) => value != null && value !== '');

    return (
        <Stack gap="xs">
            <Title order={3}>{t('bookPage.details')}</Title>
            {rows.map(([label, value]) => (
                <Text key={label} size="sm"><Text span fw={700}>{label}:</Text> {value}</Text>
            ))}
        </Stack>
    );
};

BookInfo.propTypes = {
    book: PropTypes.shape({
        publisher: PropTypes.string,
        yearPublished: PropTypes.number,
        language: PropTypes.string,
        copyrights: PropTypes.string,
        pageCount: PropTypes.number
    })
};

export default BookInfo;
