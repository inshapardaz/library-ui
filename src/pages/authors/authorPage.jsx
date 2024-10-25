import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

// UI library imports

// Local imports
//------------------------------------------------------


const AuthorPage = () => {
    const { libraryId, authorId } = useParams();
    return `Authotr ${authorId} in library ${libraryId}`
}

AuthorPage.propTypes = {
    authors: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
    }))
};

export default AuthorPage;
