import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Ui Library Imports
import { Divider, Group, Image, Stack, Table, Text } from '@mantine/core';

// local imports
import AuthorTypes from '@/models/authorTypes'
import { IconBooks, IconBlockQuote, IconUserEdit, IconFeather } from '@/components/icon';
//-------------------------------------

const AuthorListItem = ({ libraryId, author }) => {
    const { t } = useTranslation();

    if (author == null) return null;

    const icon = author.authorType === AuthorTypes.Poet ? <IconFeather size={200} style={{ fill: "grey" }} /> : <IconUserEdit size={200} style={{ fill: "grey" }} />;
    return (<Table.Tr>
        <Table.Td>
            <Group>
                {author.links?.image ?
                    <Image w={200} radius="sm" src={author?.links?.image} /> :
                    icon
                }
                <Stack>
                    <Text component={Link} to={`/libraries/${libraryId}/authors/${author.id}`} truncate="end" fw={500}>{author.name}</Text>
                </Stack>
            </Group>
        </Table.Td>
        <Table.Td>
            <Group>
                <IconBooks />
                <Text>{t('author.bookCount', { count: author.bookCount })}</Text>
                <Divider />
                <IconBlockQuote />
                <Text>{t('author.articleCount', { count: author.articleCount })}</Text>
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