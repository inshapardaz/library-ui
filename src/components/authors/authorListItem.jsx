import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Ui Library Imports
import { Divider, Group, Image, Stack, Text, useMantineTheme } from '@mantine/core';

// local imports
import { IconBooks, IconWritings, IconAuthor } from '@/components/icon';
import IconText from '../iconText';
//-------------------------------------

const AuthorListItem = ({ libraryId, author }) => {
    const { t } = useTranslation();
    const theme = useMantineTheme();

    if (author == null) return null;

    const icon = <IconAuthor height={200} style={{ color: theme.colors.dark[2] }} />;
    return (
        <Group wrap="nowrap">
            {author.links?.image ?
                <Image w={200} radius="sm" src={author?.links?.image} /> :
                icon
            }
            <Stack>
                <Text component={Link} to={`/libraries/${libraryId}/authors/${author.id}`} truncate="end" fw={500}>{author.name}</Text>
                <Group mt="md">
                    {author.bookCount != null ? (<IconText icon={<IconBooks height={16} style={{ color: theme.colors.dark[2] }} />} text={t('author.bookCount', { count: author.bookCount })} />) : null}
                    <Divider orientation="vertical" />
                    {author.articleCount != null ? (<IconText icon={<IconWritings height={16} style={{ color: theme.colors.dark[2] }} />} text={t('author.articleCount', { count: author.articleCount })} />) : null}
                </Group>
            </Stack>
        </Group>)
}

AuthorListItem.propTypes = {
    libraryId: PropTypes.string,
    author: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        authorType: PropTypes.string,
        bookCount: PropTypes.number,
        articleCount: PropTypes.number,
        links: PropTypes.shape({
            image: PropTypes.string
        })
    })
}

export default AuthorListItem;