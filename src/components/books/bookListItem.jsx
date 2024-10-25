import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Ui Library Imports
import { Avatar, Group, Stack, Table, Text, Tooltip } from '@mantine/core';

// Local Imports
import AuthorsList from '@/components/authors/authorsList';
//-------------------------------------

const BookListItem = ({ libraryId, book }) => {
    const { t } = useTranslation();

    return (<Table.Tr>
        <Table.Td>
            <Group gap="sm">
                <Avatar size={198} radius="sm" src={book?.links?.image} />
                <Stack>
                    <Text component={Link} to={`/libraries/${libraryId}/books/${book.id}`} truncate="end" fw={500}>{book.title}</Text>
                    {book?.description ?
                        (<Tooltip label={book.description} withArrow>
                            <Text size="sm" c="dimmed" lineClamp={1}>
                                {book.description}
                            </Text>
                        </Tooltip>) :
                        (<Text size="sm" fs="italic" c="dimmed" lineClamp={1}>
                            {t('book.noDescription')}
                        </Text>)}
                </Stack>
            </Group>
        </Table.Td>
        <Table.Td>
            <Group>
                <AuthorsList authors={book?.authors} />
            </Group>
        </Table.Td>
    </Table.Tr>)
}

BookListItem.propTypes = {
    libraryId: PropTypes.string,
    book: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        authors: PropTypes.array,
        links: PropTypes.shape({
            image: PropTypes.string
        })
    })
}

export default BookListItem;