import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Ui Library import
import { Card, Text, Group, Divider, useMantineTheme, Image, Center } from '@mantine/core';

// Local imports
import { IconBooks, IconWritings, IconAuthor } from '@/components/icon';
import IconText from '../iconText';
//---------------------------------------

const AuthorCard = ({ libraryId, author }) => {
    const theme = useMantineTheme();

    const icon = <Center h={225}><IconAuthor width={125} style={{ color: theme.colors.dark[1] }} /></Center>;

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                {author.links?.image ?
                    <Image h={225} radius="sm" src={author?.links?.image} /> :
                    icon
                }
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
                <Text component={Link} to={`/libraries/${libraryId}/authors/${author.id}`} truncate="end" fw={500}>{author.name}</Text>
            </Group>

            <Group justify="space-between" mt="md" mb="xs">
                <IconText icon={<IconBooks height={16} style={{ color: theme.colors.dark[2] }} />} text={author.bookCount} />
                <Divider />
                <IconText icon={<IconWritings height={16} style={{ color: theme.colors.dark[2] }} />} text={author.articleCount} />
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