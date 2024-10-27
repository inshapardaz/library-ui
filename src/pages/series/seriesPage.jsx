import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

// UI library imports

// Local imports
//------------------------------------------------------


const SeriesPage = () => {
    const { libraryId, seriesId } = useParams();
    return `Series ${seriesId} in library ${libraryId}`
}

SeriesPage.propTypes = {
    authors: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
    }))
};

export default SeriesPage;
