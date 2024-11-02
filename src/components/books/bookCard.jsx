import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Ui Library import
import { Card, Text, Group, Tooltip, useMantineTheme, Center, Image, Divider } from '@mantine/core';

// Local imports
import { IconBook, IconPages, IconChapters } from '@/components/icon';
import AuthorsAvatar from '@/components/authors/authorsAvatar';
import FavoriteButton from '@/components/books/favoriteButton';
import IconText from '@/components/iconText';
//---------------------------------------

const BookCard = ({ libraryId, book }) => {
    const { t } = useTranslation();
    const theme = useMantineTheme();

    const icon = <Center h={450}><IconBook width={250} style={{ color: theme.colors.dark[1] }} /></Center>;

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                {book.links?.image ?
                    <Image h={450} radius="sm" src={book?.links?.image} /> :
                    icon
                }
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
                <Text component={Link} to={`/libraries/${libraryId}/books/${book.id}`} truncate="end" fw={500}>{book.title}</Text>
                <FavoriteButton book={book} readonly />
            </Group>

            <Group justify="space-between" mt="md" mb="xs">
                <AuthorsAvatar libraryId={libraryId} authors={book?.authors} />
            </Group>

            {book?.description ?
                (<Tooltip label={book.description} withArrow>
                    <Text size="sm" c="dimmed" lineClamp={1}>
                        {book.description}
                    </Text>
                </Tooltip>) :
                (<Text size="sm" fs="italic" c="dimmed" lineClamp={1}>
                    {t('book.noDescription')}
                </Text>)}

            <Group mt="md">
                {book.pageCount != null ? (<IconText icon={<IconPages height={16} style={{ color: theme.colors.dark[2] }} />} text={book.pageCount} />) : null}
                <Divider orientation="vertical" />
                {book.chapterCount != null ? (<IconText icon={<IconChapters height={16} style={{ color: theme.colors.dark[2] }} />} text={book.chapterCount} />) : null}
            </Group>
        </Card>
    )
}

BookCard.propTypes = {
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
};

export default BookCard