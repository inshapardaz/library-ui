import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

// Ui Library imports
import { Accordion, Anchor, Button, Center, Group, Loader, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

// Local imports
import { SortDirection } from '@/models';
import { useGetBooksQuery } from '@/store/slices/books.api';
import { useGetBookmarksQuery } from '@/store/slices/bookmarks.api';
import { useGetNotesQuery } from '@/store/slices/notes.api';

//------------------------------

// Bookmarks and notes are stored per book, so the books the user has read are listed and each
// one loads its own bookmarks and notes only when expanded.
const BookEntries = ({ libraryId, bookId }) => {
    const { t } = useTranslation();
    const bookmarks = useGetBookmarksQuery({ libraryId, bookId });
    const notes = useGetNotesQuery({ libraryId, bookId });

    if (bookmarks.isFetching || notes.isFetching) {
        return <Center h={60}><Loader size={24} /></Center>;
    }

    const bookmarkItems = bookmarks.data?.data ?? bookmarks.data ?? [];
    const noteItems = notes.data?.data ?? notes.data ?? [];

    if (bookmarkItems.length === 0 && noteItems.length === 0) {
        return <Text c="dimmed">{t('myLibrary.bookmarks.none')}</Text>;
    }

    return (
        <Stack gap="xs">
            {bookmarkItems.map((bookmark) => (
                <Text key={`b-${bookmark.id ?? bookmark.clientId}`} size="sm">{t('myLibrary.bookmarks.bookmarks')}: {bookmark.name}</Text>
            ))}
            {noteItems.map((note) => (
                <Text key={`n-${note.id ?? note.clientId}`} size="sm">{t('myLibrary.bookmarks.notes')}: {note.comment || note.text}</Text>
            ))}
        </Stack>
    );
};

BookEntries.propTypes = {
    libraryId: PropTypes.string.isRequired,
    bookId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

const BookmarksAndNotes = ({ libraryId }) => {
    const { t } = useTranslation();
    const { data, isFetching, isError, refetch } = useGetBooksQuery({
        libraryId,
        read: true,
        pageSize: 20,
        sortDirection: SortDirection.Descending,
    });
    const [showAll, { open }] = useDisclosure(false);
    const books = data?.data ?? [];
    const visible = showAll ? books : books.slice(0, 10);

    if (isFetching) {
        return <Center h={100}><Loader /></Center>;
    }
    if (isError) {
        return <Center h={100}><Button onClick={refetch}>{t('actions.retry')}</Button></Center>;
    }
    if (books.length === 0) {
        return <Center h={100}><Text>{t('myLibrary.empty')}</Text></Center>;
    }

    return (
        <Stack>
            <Text c="dimmed">{t('myLibrary.bookmarks.description')}</Text>
            <Accordion multiple variant="separated">
                {visible.map((book) => (
                    <Accordion.Item key={book.id} value={String(book.id)}>
                        <Accordion.Control>{book.title}</Accordion.Control>
                        <Accordion.Panel>
                            <Stack>
                                <BookEntries libraryId={libraryId} bookId={book.id} />
                                <Group>
                                    <Anchor component={Link} to={`/libraries/${libraryId}/books/${book.id}`}>
                                        {t('myLibrary.bookmarks.openBook')}
                                    </Anchor>
                                </Group>
                            </Stack>
                        </Accordion.Panel>
                    </Accordion.Item>
                ))}
            </Accordion>
            {!showAll && books.length > 10 && (
                <Button variant="subtle" onClick={open}>{t('actions.viewAll')}</Button>
            )}
        </Stack>
    );
};

BookmarksAndNotes.propTypes = {
    libraryId: PropTypes.string.isRequired,
};

export default BookmarksAndNotes;
