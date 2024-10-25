import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Ui Library Imports
import { Group, Image, Stack, Table, Text } from '@mantine/core';

//-------------------------------------

const AuthorListItem = ({ libraryId, author }) => {

    return (<Table.Tr>
        <Table.Td>
            <Group gap="sm">
                <Image h={200} radius="sm" src={author?.links?.image} />
                <Stack>
                    <Text component={Link} to={`/libraries/${libraryId}/authors/${author.id}`} truncate="end" fw={500}>{author.name}</Text>
                </Stack>
            </Group>
        </Table.Td>
    </Table.Tr>)
}

AuthorListItem.propTypes = {
    libraryId: PropTypes.string,
    author: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        links: PropTypes.shape({
            image: PropTypes.string
        })
    })
}

export default AuthorListItem;