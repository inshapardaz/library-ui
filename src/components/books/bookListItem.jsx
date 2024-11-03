import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Ui Library Imports
import { Divider, Group, Image, Stack, Table, Text, Tooltip, useMantineTheme } from '@mantine/core';

// Local Imports
import AuthorsAvatar from '@/components/authors/authorsAvatar';
import { IconBook, IconPages, IconChapters } from '@/components/icon';
import IconText from '@/components/iconText';
//-------------------------------------

const BookListItem = ({ libraryId, book }) => {
    const { t } = useTranslation();
    const theme = useMantineTheme();

    const icon = <IconBook width={150} style={{ color: theme.colors.dark[1] }} />;

    return (<Table.Tr>
        <Table.Td>
            <Group gap="sm" wrap="nowrap">
                {book.links?.image ?
                    <Image w={150} radius="sm" src={book?.links?.image} /> :
                    icon
                }
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
                    <AuthorsAvatar libraryId={libraryId} authors={book?.authors} />
                    <Group mt="md">
                        {book.pageCount != null ? (<IconText icon={<IconPages height={16} style={{ color: theme.colors.dark[2] }} />} text={t('book.pageCount', { count: book.pageCount })} />) : null}
                        <Divider orientation="vertical" />
                        {book.chapterCount != null ? (<IconText icon={<IconChapters height={16} style={{ color: theme.colors.dark[2] }} />} text={t('book.chapterCount', { count: book.chapterCount })} />) : null}
                    </Group>
                </Stack>
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
        pageCount: PropTypes.number,
        chapterCount: PropTypes.number,
        links: PropTypes.shape({
            image: PropTypes.string
        })
    })
}

export default BookListItem;