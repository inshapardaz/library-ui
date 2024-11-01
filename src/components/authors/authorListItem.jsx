import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Ui Library Imports
import { Group, Image, Stack, Table, Text, useMantineTheme } from '@mantine/core';

// local imports
import { IconBooks, IconArticle, IconAuthor } from '@/components/icon';
import IconText from '../iconText';
//-------------------------------------

const AuthorListItem = ({ libraryId, author }) => {
    const { t } = useTranslation();
    const theme = useMantineTheme();

    if (author == null) return null;

    const icon = <IconAuthor height={200} style={{ color: theme.colors.dark[2] }} />;
    return (<Table.Tr>
        <Table.Td>
            <Group wrap="nowrap">
                {author.links?.image ?
                    <Image w={200} radius="sm" src={author?.links?.image} /> :
                    icon
                }
                <Stack>
                    <Text component={Link} to={`/libraries/${libraryId}/authors/${author.id}`} truncate="end" fw={500}>{author.name}</Text>
                    <IconText icon={<IconBooks height={16} style={{ color: theme.colors.dark[2] }} />} text={t('author.bookCount', { count: author.bookCount })} />
                    <IconText icon={<IconArticle height={16} style={{ color: theme.colors.dark[2] }} />} text={t('author.articleCount', { count: author.articleCount })} />
                </Stack>
            </Group>
        </Table.Td>
    </Table.Tr>)
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