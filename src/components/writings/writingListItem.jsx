import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Ui Library Imports
import { Group, Image, Stack, Text, useMantineTheme } from '@mantine/core';

// Local Imports
import AuthorsAvatar from '@/components/authors/authorsAvatar';
import { IconWriting } from '@/components/icon';
import FavoriteButton from './favoriteButton';
//-------------------------------------
const IMAGE_HEIGHT = 150;

const WritingListItem = ({ libraryId, writing }) => {
    const theme = useMantineTheme();

    const icon = <IconWriting width={IMAGE_HEIGHT} style={{ color: theme.colors.dark[1] }} />;

    return (
        <Group gap="sm" wrap="nowrap" key={writing.id}>
            {writing.links?.image ?
                <Image w={IMAGE_HEIGHT} radius="sm" src={writing?.links?.image} /> :
                icon
            }
            <Stack>
                <Group justify="space-between">
                    <Text component={Link} to={`/libraries/${libraryId}/writings/${writing.id}`} truncate="end" fw={500}>{writing.title}</Text>
                    <FavoriteButton article={writing} readonly />
                </Group>
                <AuthorsAvatar libraryId={libraryId} authors={writing?.authors} />
            </Stack>
        </Group>)
}

WritingListItem.propTypes = {
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
}

export default WritingListItem;