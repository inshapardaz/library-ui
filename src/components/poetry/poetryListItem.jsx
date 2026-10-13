import PropTypes from 'prop-types';

// Local Imports
import LiteratureRow from '@/components/literatureRow';
import { IconPoetry } from '@/components/icon';
import FavoriteButton from './favoriteButton';
//-------------------------------------

const PoetryListItem = ({ libraryId, poetry }) => (
    <LiteratureRow
        libraryId={libraryId}
        item={poetry}
        to={`/libraries/${libraryId}/poetry/${poetry.id}`}
        icon={<IconPoetry height={24} />}
        favoriteButton={<FavoriteButton poetry={poetry} size={20} />} />
);

PoetryListItem.propTypes = {
    libraryId: PropTypes.string,
    poetry: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        authors: PropTypes.array,
    })
}

export default PoetryListItem;
