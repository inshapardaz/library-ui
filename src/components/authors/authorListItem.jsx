import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Ui Library Imports
import { Divider, Group, Image, Stack, Text, useMantineTheme } from '@mantine/core';

// local imports
import { IconBooks, IconWritings, IconAuthor } from '@/components/icon';
import IconText from '@/components/iconText';
import If from '@/components/if';
//-------------------------------------

const IMAGE_HEIGHT = 150;
const AuthorListItem = ({ libraryId, author }) => {
    const { t } = useTranslation();
    const theme = useMantineTheme();

    const icon = <IconAuthor height={IMAGE_HEIGHT} style={{ color: theme.colors.dark[2] }} />;
    return (<>
        <Group wrap="nowrap">
            {author.links?.image ?
                <Image w={IMAGE_HEIGHT} radius="sm" src={author?.links?.image} /> :
                icon
            }
            <Stack>
                <Text component={Link} to={`/libraries/${libraryId}/authors/${author.id}`} truncate="end" fw={500}>{author.name}</Text>
                <Group mt="md">
                    <If condition={author.bookCount != null}>
                        <IconText icon={<IconBooks height={16} style={{ color: theme.colors.dark[2] }} />} text={t('author.bookCount', { count: author.bookCount })} />
                    </If>
                    <If condition={author.bookCount != null && author.articleCount != null}>
                        <Divider orientation="vertical" />
                    </If>
                    <If condition={author.articleCount != null}>
                        <IconText icon={<IconWritings height={16} style={{ color: theme.colors.dark[2] }} />} text={t('author.articleCount', { count: author.articleCount })} />
                    </If>
                </Group>
            </Stack>
        </Group>
        <Divider />
    </>
    )
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