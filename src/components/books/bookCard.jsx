import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Ui Library import
import { Card, Text, Group, Tooltip } from '@mantine/core';

// Local imports
import AuthorsAvatar from '@/components/authors/authorsAvatar';
import { BookImage } from './BookImage';
//---------------------------------------

const BookCard = ({ libraryId, book }) => {
    const { t } = useTranslation();

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                <BookImage book={book} />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
                <Text component={Link} to={`/libraries/${libraryId}/books/${book.id}`} truncate="end" fw={500}>{book.title}</Text>
            </Group>

            <Group justify="space-between" mt="md" mb="xs">
                <AuthorsAvatar authors={book?.authors} />
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
        </Card>
    )
}

BookCard.propTypes = {
    libraryId: PropTypes.string,
    book: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        authors: PropTypes.array
    })
};

export default BookCard