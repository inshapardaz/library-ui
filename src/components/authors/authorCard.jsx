import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Ui Library import
import { Card, Text, Group, Divider, useMantineTheme, Image, Center } from '@mantine/core';

// Local imports
import { IconBooks, IconArticle, IconAuthor } from '@/components/icon';
import IconText from '../iconText';
//---------------------------------------

const AuthorCard = ({ libraryId, author }) => {
    const { t } = useTranslation();
    const theme = useMantineTheme();

    const icon = <Center h={450}><IconAuthor width={250} style={{ color: theme.colors.dark[1] }} /></Center>;

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                {author.links?.image ?
                    <Image h={450} radius="sm" src={author?.links?.image} /> :
                    icon
                }
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
                <Text component={Link} to={`/libraries/${libraryId}/authors/${author.id}`} truncate="end" fw={500}>{author.name}</Text>
            </Group>

            <Group justify="space-between" mt="md" mb="xs">
                <IconText icon={<IconBooks height={16} style={{ color: theme.colors.dark[2] }} />} text={t('author.bookCount', { count: author.bookCount })} />
                <Divider />
                <IconText icon={<IconArticle height={16} style={{ color: theme.colors.dark[2] }} />} text={t('author.articleCount', { count: author.articleCount })} />
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