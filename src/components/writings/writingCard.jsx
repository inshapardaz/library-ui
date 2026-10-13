import PropTypes from 'prop-types';

// Ui Library import
import { Text } from '@mantine/core';

// Local imports
import EntityCard from '@/components/entityCard';
import { IconWriting } from '@/components/icon';
//---------------------------------------

const WritingCard = ({ libraryId, writing }) => {
    const authors = (writing.authors ?? []).map((author) => author.name).join(', ');

    return (
        <EntityCard
            to={`/libraries/${libraryId}/writings/${writing.id}`}
            name={writing.title}
            image={writing.links?.image}
            icon={<IconWriting width={40} />}
            aspect="16 / 9"
            meta={authors ? <Text size="sm" c="dimmed" mt="xs" lineClamp={1}>{authors}</Text> : null} />
    );
};

WritingCard.propTypes = {
    libraryId: PropTypes.string,
    writing: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        authors: PropTypes.array,
        links: PropTypes.shape({
            image: PropTypes.string
        })
    })
};

export default WritingCard;
