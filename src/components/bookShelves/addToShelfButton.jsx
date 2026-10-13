import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Ui Library imports
import { ActionIcon, Loader, Menu, Text, Tooltip } from '@mantine/core';

// Local imports
import { IconBookShelve } from '@/components/icon';
import { useAddBookToBookShelfMutation, useGetBookShelvesQuery } from '@/store/slices/bookShelves.api';
import useRequireLogin from '@/hooks/useRequireLogin';
import { error, success } from '@/utils/notifications';

//------------------------------

const Shelves = ({ libraryId, bookId }) => {
    const { t } = useTranslation();
    const { data, isFetching } = useGetBookShelvesQuery({ libraryId, pageSize: 50 });
    const [addBookToBookShelf] = useAddBookToBookShelfMutation();
    const shelves = data?.data ?? [];

    const add = (bookShelfId) => addBookToBookShelf({ libraryId, bookShelfId, bookId })
        .unwrap()
        .then(() => success({ title: t('bookShelf.actions.addBook.success') }))
        .catch(() => error({ title: t('bookShelf.actions.addBook.error') }));

    if (isFetching) {
        return <Menu.Item disabled leftSection={<Loader size={14} />}>...</Menu.Item>;
    }
    if (shelves.length === 0) {
        return <Text size="sm" c="dimmed" p="sm">{t('detail.noShelves')}</Text>;
    }
    return shelves.map((shelf) => (
        <Menu.Item key={shelf.id} onClick={() => add(shelf.id)}>{shelf.name}</Menu.Item>
    ));
};

Shelves.propTypes = {
    libraryId: PropTypes.string,
    bookId: PropTypes.number,
};

// "Add to shelf" on a book page. Signed-out visitors are sent to login instead (bookshelves are
// personal), and the shelves are only fetched once the menu is opened.
const AddToShelfButton = ({ libraryId, bookId, size = 24 }) => {
    const { t } = useTranslation();
    const { isLoggedIn, requireLogin } = useRequireLogin();
    const [opened, setOpened] = useState(false);

    if (!isLoggedIn) {
        return (
            <Tooltip label={t('login.signInToUse')}>
                <ActionIcon variant="transparent" aria-label={t('detail.addToShelf')} onClick={requireLogin(() => { })}>
                    <IconBookShelve height={size} />
                </ActionIcon>
            </Tooltip>
        );
    }

    return (
        <Menu opened={opened} onChange={setOpened} position="bottom-end" withinPortal>
            <Menu.Target>
                <Tooltip label={t('detail.addToShelf')} disabled={opened}>
                    <ActionIcon variant="transparent" aria-label={t('detail.addToShelf')}>
                        <IconBookShelve height={size} />
                    </ActionIcon>
                </Tooltip>
            </Menu.Target>
            <Menu.Dropdown>
                {opened && <Shelves libraryId={libraryId} bookId={bookId} />}
            </Menu.Dropdown>
        </Menu>
    );
};

AddToShelfButton.propTypes = {
    libraryId: PropTypes.string,
    bookId: PropTypes.number,
    size: PropTypes.number,
};

export default AddToShelfButton;
