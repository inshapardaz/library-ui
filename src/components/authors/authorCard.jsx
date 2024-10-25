import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Ui Library import
import { Card, Text, Group } from '@mantine/core';

// Local imports
import { AuthorImage } from './AuthorImage';
//---------------------------------------

const AuthorCard = ({ libraryId, author }) => {

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                <AuthorImage author={author} />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
                <Text component={Link} to={`/libraries/${libraryId}/authors/${author.id}`} truncate="end" fw={500}>{author.name}</Text>
            </Group>
        </Card>
    )
}

AuthorCard.propTypes = {
    libraryId: PropTypes.string,
    author: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        links: PropTypes.shape({
            image: PropTypes.string
        })
    })
};

export default AuthorCard