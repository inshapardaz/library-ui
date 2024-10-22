import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';

// Ui Library Import
import { Avatar, Group, Stack, Text } from "@mantine/core";

// Local imports
import UserEditSvg from '@/assets/icons/user-edit.svg';
//-----------------------------------------

const AuthorsList = ({ authors }) => {
    const { libraryId } = useParams();
    return (
        <Stack>
            {authors.map((author) => (
                <Group key={author.id} component={Link} to={`/libraries/${libraryId}/authors/${author.id}`}>
                    <Avatar src={author?.links?.image || UserEditSvg} />
                    <Text c="dimmed">{author.name}</Text>
                </Group>
            ))}
        </Stack>)
}


AuthorsList.propTypes = {
    authors: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
    }))
};

export default AuthorsList;