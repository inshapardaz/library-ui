import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Ui Library import
import { Card, Text, Group, useMantineTheme, Center, Image } from '@mantine/core';

// Local imports
import { IconSeries, IconBooks } from '@/components/icon';
import IconText from '../iconText';
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

            <Group mt="md">
                {series.bookCount != null ? (<IconText icon={<IconBooks height={16} style={{ color: theme.colors.dark[2] }} />} text={series.bookCount} />) : null}
            </Group>
        </Card>
    )
}

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