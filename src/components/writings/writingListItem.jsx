import PropTypes from 'prop-types';

// Local Imports
import LiteratureRow from '@/components/literatureRow';
import { IconWriting } from '@/components/icon';
import FavoriteButton from './favoriteButton';
//-------------------------------------

const WritingListItem = ({ libraryId, writing }) => (
    <LiteratureRow
        libraryId={libraryId}
        item={writing}
        to={`/libraries/${libraryId}/writings/${writing.id}`}
        icon={<IconWriting height={24} />}
        favoriteButton={<FavoriteButton article={writing} size={20} />} />
);

WritingListItem.propTypes = {
    libraryId: PropTypes.string,
    writing: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        authors: PropTypes.array,
    })
}

export default WritingListItem;
