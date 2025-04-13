import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Ui Library import
import { Card, Text, Group, useMantineTheme, Center, Divider } from '@mantine/core';

// Local imports
import { Icon, IconNames, IconBookShelve, IconBooks, IconEdit } from '@/components/icon';
import IconText from '@/components/iconText';
import If from '@/components/if';
import BookShelfEditForm from './bookShelfEditForm';
import BookShelfDeleteButton from './bookShelfDeleteButton';
//---------------------------------------

const IMAGE_HEIGHT = 225;
const IMAGE_WIDTH = 150;

const BookShelfCard = ({ libraryId, bookShelf }) => {
    const { t } = useTranslation();
    const theme = useMantineTheme();

    const icon = <Center h={IMAGE_HEIGHT}><IconBookShelve width={IMAGE_WIDTH} style={{ color: theme.colors.dark[1] }} /></Center>;

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                {icon}
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
                <Text component={Link} to={`/libraries/${libraryId}/books?bookShelf=${bookShelf.id}`} truncate="end" fw={500}>{bookShelf.name}</Text>
            </Group>

            <Group mt="md">
                <If condition={bookShelf.bookCount != null}>
                    <IconText link={`/libraries/${libraryId}/bookshelves/${bookShelf.id}`}
                        icon={<IconBooks height={16} style={{ color: theme.colors.dark[2] }} />}
                        text={t('bookShelves.bookCount', { count: bookShelf.bookCount })} />
                </If>
            </Group>
            <Group mt="md">
                <IconText icon={<Icon name={bookShelf?.isPublic ? IconNames.World : IconNames.Private} height={16} style={{ color: theme.colors.dark[2] }} />}
                    tooltip={bookShelf?.isPublic ? t('bookShelf.public') : t('bookShelf.private')}
                />
                <Divider orientation="vertical" />

                <If condition={bookShelf.links.update}>
                    <>
                        <BookShelfEditForm libraryId={libraryId} bookShelf={bookShelf}  >
                            <IconText
                                tooltip={t('actions.edit')}
                                icon={<IconEdit height={16} style={{ color: theme.colors.dark[2] }} />} />
                        </BookShelfEditForm>
                    </>
                </If>
                <If condition={bookShelf.links.delete != null}>
                    <>
                        <Divider orientation="vertical" />
                        <BookShelfDeleteButton bookShelf={bookShelf} t={t} />
                    </>
                </If>
            </Group>
        </Card>
    )
}

BookShelfCard.propTypes = {
    libraryId: PropTypes.string,
    bookShelf: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        bookCount: PropTypes.number,
        isPublic: PropTypes.bool,
        links: PropTypes.shape({
            update: PropTypes.string,
            delete: PropTypes.string,
        })
    })
};

export default BookShelfCard