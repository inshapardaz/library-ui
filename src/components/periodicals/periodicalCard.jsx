import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

// Ui Library import
import { Text } from '@mantine/core';

// Local imports
import EntityCard from '@/components/entityCard';
import { IconPeriodical } from '@/components/icon';
//---------------------------------------

const PeriodicalCard = ({ libraryId, periodical }) => {
    const { t } = useTranslation();
    const parts = [
        periodical.frequency ? t(`periodical.frequency.${periodical.frequency.toLowerCase()}`) : null,
        periodical.issueCount != null ? t('periodical.issueCount', { count: periodical.issueCount }) : null,
    ].filter(Boolean);

    return (
        <EntityCard
            to={`/libraries/${libraryId}/periodicals/${periodical.id}`}
            name={periodical.title}
            image={periodical.links?.image}
            icon={<IconPeriodical width={36} />}
            aspect="16 / 9"
            meta={parts.length > 0 ? <Text size="sm" c="dimmed" mt="xs">{parts.join(' · ')}</Text> : null} />
    );
};

PeriodicalCard.propTypes = {
    libraryId: PropTypes.string,
    periodical: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        frequency: PropTypes.string,
        issueCount: PropTypes.number,
        links: PropTypes.shape({
            image: PropTypes.string
        })
    })
};

export default PeriodicalCard;
