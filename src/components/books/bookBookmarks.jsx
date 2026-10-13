import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

// UI library imports
import { Card, Group, Stack, Text, Title } from '@mantine/core';

// Local imports
import { useGetBookmarksQuery } from '@/store/slices/bookmarks.api';
import { IconBookmark } from '@/components/icon';
//------------------------------------------------------

// The signed-in reader's bookmarks in this book. Not shown to signed-out visitors.
const BookBookmarks = ({ libraryId, bookId }) => {
    const { t } = useTranslation();
    const { data } = useGetBookmarksQuery({ libraryId, bookId });
    const bookmarks = data?.data ?? (Array.isArray(data) ? data : []);

    return (
        <Stack gap="sm">
            <Title order={3}>{t('bookPage.bookmarks')}</Title>
            {bookmarks.length === 0 && <Text c="dimmed">{t('bookPage.noBookmarks')}</Text>}
            {bookmarks.map((bookmark) => (
                <Card key={bookmark.id ?? bookmark.clientId} padding="sm" shadow="xs">
                    <Group wrap="nowrap" gap="md">
                        <IconBookmark height={18} style={{ color: 'var(--mantine-primary-color-filled)' }} />
                        <Text fw={600} size="sm">{bookmark.name}</Text>
                    </Group>
                </Card>
            ))}
        </Stack>
    );
};

BookBookmarks.propTypes = {
    libraryId: PropTypes.string,
    bookId: PropTypes.number,
};

export default BookBookmarks;
