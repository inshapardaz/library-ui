import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Ui Library import
import { Card, Text, Group } from '@mantine/core';

// Local imports
import { SeriesImage } from './seriresImage';
//---------------------------------------

const SeriesCard = ({ libraryId, series }) => {

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                <SeriesImage series={series} />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
                <Text component={Link} to={`/libraries/${libraryId}/books?series=${series.id}`} truncate="end" fw={500}>{series.name}</Text>
            </Group>
        </Card>
    )
}

SeriesCard.propTypes = {
    libraryId: PropTypes.string,
    series: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        links: PropTypes.shape({
            image: PropTypes.string
        })
    })
};

export default SeriesCard