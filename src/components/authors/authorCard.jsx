import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Ui Library import
import { Card, Text, Group, Divider } from '@mantine/core';

// Local imports
import { AuthorImage } from './AuthorImage';
import { IconBooks, IconBlockQuote } from '@/components/icon';
//---------------------------------------

const AuthorCard = ({ libraryId, author }) => {
    const { t } = useTranslation();
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                <AuthorImage author={author} />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
                <Text component={Link} to={`/libraries/${libraryId}/authors/${author.id}`} truncate="end" fw={500}>{author.name}</Text>
            </Group>

            <Group justify="space-between" mt="md" mb="xs">
                <IconBooks />
                <Text>{t('author.bookCount', { count: author.bookCount })}</Text>
                <Divider />
                <IconBlockQuote />
                <Text>{t('author.articleCount', { count: author.articleCount })}</Text>
            </Group>
        </Card>
    )
}

AuthorCard.propTypes = {
    libraryId: PropTypes.string,
    author: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        bookCount: PropTypes.number,
        articleCount: PropTypes.number,
        links: PropTypes.shape({
            image: PropTypes.string
        })
    })
};

export default AuthorCard