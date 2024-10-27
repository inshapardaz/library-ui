import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Ui Library Imports
import { Group, Image, Stack, Table, Text } from '@mantine/core';

//-------------------------------------

const SeriesListItem = ({ libraryId, series }) => {

    return (<Table.Tr>
        <Table.Td>
            <Group gap="sm">
                <Image h={200} radius="sm" src={series?.links?.image} />
                <Stack>
                    <Text component={Link} to={`/libraries/${libraryId}/books?series=${series.id}`} truncate="end" fw={500}>{series.name}</Text>
                </Stack>
            </Group>
        </Table.Td>
    </Table.Tr>)
}

SeriesListItem.propTypes = {
    libraryId: PropTypes.string,
    series: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        links: PropTypes.shape({
            image: PropTypes.string
        })
    })
}

export default SeriesListItem;