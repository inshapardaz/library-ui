import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Ui Library import
import { Card, Text, Group, useMantineTheme, Center, Image } from '@mantine/core';

// Local imports
import { IconSeries } from '@/components/icon';
//---------------------------------------

const SeriesCard = ({ libraryId, series }) => {
    const theme = useMantineTheme();

    const icon = <Center h={450}><IconSeries width={250} style={{ color: theme.colors.dark[1] }} /></Center>;

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                {series.links?.image ?
                    <Image h={450} radius="sm" src={series?.links?.image} /> :
                    icon
                }
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
                <Text component={Link} to={`/libraries/${libraryId}/series/${series.id}`} truncate="end" fw={500}>{series.name}</Text>
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