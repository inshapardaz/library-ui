import PropTypes from 'prop-types';

// Ui Library import
import { Text } from '@mantine/core';

// Local imports
import EntityCard from '@/components/entityCard';
import { IconPoetry } from '@/components/icon';
//---------------------------------------

const PoetryCard = ({ libraryId, poetry }) => {
    const authors = (poetry.authors ?? []).map((author) => author.name).join(', ');

    return (
        <EntityCard
            to={`/libraries/${libraryId}/poetry/${poetry.id}`}
            name={poetry.title}
            image={poetry.links?.image}
            icon={<IconPoetry width={40} />}
            aspect="16 / 9"
            meta={authors ? <Text size="sm" c="dimmed" mt="xs" lineClamp={1}>{authors}</Text> : null} />
    );
};

PoetryCard.propTypes = {
    libraryId: PropTypes.string,
    poetry: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        authors: PropTypes.array,
        links: PropTypes.shape({
            image: PropTypes.string
        })
    })
};

export default PoetryCard;
