import PropTypes from 'prop-types';

// Ui Library import
import { Group } from '@mantine/core';

// Local imports
import EntityCard from '@/components/entityCard';
import { IconBooks, IconWritings, IconAuthor, IconPoetries } from '@/components/icon';
import IconText from '../iconText';
//---------------------------------------

const AuthorCard = ({ libraryId, author }) => {
    const iconStyle = { color: 'var(--mantine-color-dimmed)' };

    return (
        <EntityCard
            to={`/libraries/${libraryId}/authors/${author.id}`}
            name={author.name}
            image={author.links?.image}
            icon={<IconAuthor width={44} />}
            meta={
                <Group gap="md" mt="xs" wrap="nowrap">
                    <IconText link={`/libraries/${libraryId}/explore/books?author=${author.id}`}
                        icon={<IconBooks height={14} style={iconStyle} />} text={author.bookCount} />
                    <IconText link={`/libraries/${libraryId}/explore/writings?author=${author.id}`}
                        icon={<IconWritings height={14} style={iconStyle} />} text={author.articleCount} />
                    <IconText link={`/libraries/${libraryId}/explore/poetry?author=${author.id}`}
                        icon={<IconPoetries height={14} style={iconStyle} />} text={author.poetryCount} />
                </Group>
            } />
    );
};

AuthorCard.propTypes = {
    libraryId: PropTypes.string,
    author: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        bookCount: PropTypes.number,
        articleCount: PropTypes.number,
        poetryCount: PropTypes.number,
        links: PropTypes.shape({
            image: PropTypes.string
        })
    })
};

export default AuthorCard
