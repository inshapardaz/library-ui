import PropTypes from 'prop-types';

// Ui Library Import
import { Avatar, Tooltip } from "@mantine/core";

// Local imports
import UserEditSvg from '@/assets/icons/user-edit.svg';
//-----------------------------------------

const AuthorsAvatar = ({ authors }) => {
    return (
        <Avatar.Group>
            {authors.map((author) => (<Tooltip key={author.id} label={author.name} withArrow>
                <Avatar src={author?.links?.image || UserEditSvg} />
            </Tooltip>
            ))}
        </Avatar.Group>)
}


AuthorsAvatar.propTypes = {
    authors: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
    }))
};

export default AuthorsAvatar;