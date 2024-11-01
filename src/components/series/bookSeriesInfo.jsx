import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';

// Ui Library Import

// Local imports
import { IconBooks } from '@/components/icon';
import IconText from '@/components/iconText';
import { useMantineTheme } from '@mantine/core';
//-----------------------------------------

const BookSeriesInfo = ({ book }) => {
    const { libraryId } = useParams();
    const { t } = useTranslation();
    const theme = useMantineTheme();

    if (book && book.seriesName) {
        if (book.seriesIndex && book.seriesIndex > 0) {
            return (<IconText component={Link} to={`/libraries/${libraryId}/books?series=${book.seriesId}`}
                icon={<IconBooks height={24} style={{ color: theme.colors.dark[2] }} />}
                text={t("book.series.seriesAndIndexLabel", { name: book.seriesName, index: book.seriesIndex })}
            />);
        } else {
            return (<IconText component={Link} to={`/libraries/${libraryId}/books?series=${book.seriesId}`}
                icon={<IconBooks height={24} style={{ color: theme.colors.dark[2] }} />}
                text={t("book.series.indexLabel", { name: book.seriesName })}
            />);
        }
    }

    return null;
}

BookSeriesInfo.propTypes = {
    book: PropTypes.shape({
        seriesId: PropTypes.number,
        seriesIndex: PropTypes.number,
        seriesName: PropTypes.string
    })
};

export default BookSeriesInfo;