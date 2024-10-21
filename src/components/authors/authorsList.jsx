import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';

// Ui Library Import
import { Anchor, Avatar, Group, Stack, Text } from "@mantine/core";

// Local imports
import UserEditSvg from '@/assets/icons/user-edit.svg';
//-----------------------------------------

const AuthorsList = ({ authors }) => {
    const { libraryId } = useParams();
    return (
        <Stack>
            {authors.map((author) => (
                <Anchor key={author.id} component={Link} to={`/libraries/${libraryId}/authors/${author.id}`}>
                    <Group >
                        <Avatar src={author?.links?.image || UserEditSvg} />
                        <Text>{author.name}</Text>
                    </Group>
                </Anchor>
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