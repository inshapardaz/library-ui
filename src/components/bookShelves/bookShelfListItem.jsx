import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Ui Library Imports
import { Divider, Group, Stack, Text, Tooltip, useMantineTheme } from '@mantine/core';

// Local Imports
import { Icon, IconNames, IconBookShelve, IconBooks, IconEdit } from '@/components/icon';
import If from '@/components/if';
import IconText from '@/components/iconText';
import BookShelfDeleteButton from './bookShelfDeleteButton';
import BookShelfEditForm from './bookShelfEditForm';
//-------------------------------------
const IMAGE_HEIGHT = 150;

const BookShelfListItem = ({ libraryId, bookShelf }) => {
    const { t } = useTranslation();
    const theme = useMantineTheme();

    const icon = <IconBookShelve width={IMAGE_HEIGHT} style={{ color: theme.colors.dark[1] }} />;

    return (<>
        <Group gap="sm" wrap="nowrap">
            {icon}
            <Stack>
                <Text component={Link} to={`/libraries/${libraryId}/books?bookShelf=${bookShelf.id}`} truncate="end" fw={500}>{bookShelf.name}</Text>
                <If condition={bookShelf?.description}
                    elseChildren={(<Text size="sm" fs="italic" c="dimmed" lineClamp={1}>
                        {t('series.noDescription')}
                    </Text>)}>
                    <Tooltip label={bookShelf.description} withArrow>
                        <Text size="sm" c="dimmed" lineClamp={1}>
                            {bookShelf.description}
                        </Text>
                    </Tooltip>
                </If>
                <Group mt="md">
                    <IconText icon={<Icon name={bookShelf?.isPublic ? IconNames.World : IconNames.Private} height={16} style={{ color: theme.colors.dark[2] }} />}
                        tooltip={bookShelf?.isPublic ? t('bookShelf.public') : t('bookShelf.private')}
                    />
                    <Divider orientation="vertical" />
                    <IconText link={`/libraries/${libraryId}/bookshelves/${bookShelf.id}`}
                        icon={<IconBooks height={16} style={{ color: theme.colors.dark[2] }} />}
                        text={t('bookShelves.bookCount', { count: bookShelf?.bookCount })} />
                    <If condition={bookShelf.links.update}>
                        <>
                            <Divider orientation="vertical" />
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
            </Stack>
        </Group>
        <Divider />
    </>)
}

BookShelfListItem.propTypes = {
    libraryId: PropTypes.string,
    bookShelf: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        description: PropTypes.string,
        bookCount: PropTypes.number,
        isPublic: PropTypes.bool,
        links: PropTypes.shape({
            update: PropTypes.string,
            delete: PropTypes.string,
        })
    })
}

export default BookShelfListItem;