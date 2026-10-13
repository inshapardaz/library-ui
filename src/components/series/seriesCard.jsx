import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

// Ui Library import
import { Text } from '@mantine/core';

// Local imports
import EntityCard from '@/components/entityCard';
import { IconSeries } from '@/components/icon';
//---------------------------------------

const SeriesCard = ({ libraryId, series }) => {
    const { t } = useTranslation();

    return (
        <EntityCard
            to={`/libraries/${libraryId}/series/${series.id}`}
            name={series.name}
            image={series.links?.image}
            icon={<IconSeries width={40} />}
            aspect="16 / 9"
            meta={series.bookCount != null
                ? <Text size="sm" c="dimmed" mt="xs">{t('series.bookCount', { count: series.bookCount })}</Text>
                : null} />
    );
};

SeriesCard.propTypes = {
    libraryId: PropTypes.string,
    series: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        bookCount: PropTypes.number,
        links: PropTypes.shape({
            image: PropTypes.string
        })
    })
};

export default SeriesCard
