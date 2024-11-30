import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Ui Library import
import { Card, Text, Group, useMantineTheme, Center, Image } from '@mantine/core';

// Local imports
import { IconWriting } from '@/components/icon';
import AuthorsAvatar from '@/components/authors/authorsAvatar';
import FavoriteButton from './favoriteButton';
//---------------------------------------

const WritingCard = ({ libraryId, writing }) => {
    const theme = useMantineTheme();

    const icon = <Center h={450}><IconWriting width={250} style={{ color: theme.colors.dark[1] }} /></Center>;

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                {writing.links?.image ?
                    <Image h={450} radius="sm" src={writing?.links?.image} /> :
                    icon
                }
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
                <Text component={Link} to={`/libraries/${libraryId}/writings/${writing.id}`} truncate="end" fw={500}>{writing.title}</Text>
                <FavoriteButton article={writing} readonly />
            </Group>

            <Group justify="space-between" mt="md" mb="xs">
                <AuthorsAvatar libraryId={libraryId} authors={writing?.authors} />
            </Group>
        </Card>
    )
}

WritingCard.propTypes = {
    libraryId: PropTypes.string,
    writing: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        authors: PropTypes.array,
        pageCount: PropTypes.number,
        chapterCount: PropTypes.number,
        links: PropTypes.shape({
            image: PropTypes.string
        })
    })
};

export default WritingCard