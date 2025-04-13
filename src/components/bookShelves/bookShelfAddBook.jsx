import PropTypes from 'prop-types';
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

// UI library import
import { Group, Button, Drawer, Box, Table, Checkbox, Avatar, Text } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import cx from 'clsx';

// Local Import
import classes from './bookShelfAddBook.module.css';
import { useAddBookToBookShelfMutation } from "/src/store/slices/bookShelves.api";
import { useGetBooksQuery } from "/src/store/slices/books.api";
import { error, success } from '@/utils/notifications';
import SearchInput from "@/components/SearchInput";
// --------------------------------------
const BookShelfAddBook = ({ libraryId, bookShelf, children }) => {
    const { t } = useTranslation();
    const [opened, { open, close }] = useDisclosure(false);

    const [query, setQuery] = useState('');
    const [selection, setSelection] = useState([]);
    const [addBookToBookShelf, { isLoading: isAddingBook }] = useAddBookToBookShelfMutation();

    const {
        refetch,
        data: books,
        // isError,
        // isFetching,
    } = useGetBooksQuery({
        libraryId,
        query,
    }, {
        skip: query.length < 3,
    });

    useEffect(() => {
        if (opened) {
            setQuery('');
            setSelection([]);
        }
    }, [opened, refetch]);


    const onSubmit = () => {
        if (selection && selection.length > 0) {
            Promise.all(selection.map((bookId) =>
                addBookToBookShelf({ libraryId, bookShelfId: bookShelf.id, bookId })
                    .unwrap()
            ))
                .then(() => success({ message: t("bookShelf.actions.addBook.success") }))
                .then(() => close())
                .catch((e) => {
                    error(e)
                    return error({ message: t("bookShelf.actions.addBook.error") });
                });
        }
    }

    const title = t('bookShelf.actions.addBook.title', { name: bookShelf.name })

    const toggleRow = (id) =>
        setSelection((current) =>
            current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
        );

    const toggleAll = () => {
        if (!books || books.data.length < 1) return;
        return setSelection((current) => (current.length === books?.data.length ? [] : books?.data.map((book) => book.id)));
    };

    const rows = books?.data.map((book) => {
        const selected = selection.includes(book.id);
        return (
            <Table.Tr key={book.id} className={cx({ [classes.rowSelected]: selected })}>
                <Table.Td>
                    <Checkbox checked={selection.includes(book.id)} onChange={() => toggleRow(book.id)} />
                </Table.Td>
                <Table.Td>
                    <Group gap="sm">
                        <Avatar size={26} src={book.links.image} radius={26} />
                        <Text size="sm" fw={500}>
                            {book.title}
                        </Text>
                    </Group>
                </Table.Td>

                <Table.Td>{book.authors?.map(a => a.name)}</Table.Td>
            </Table.Tr>
        );
    });

    return (<>
        <Drawer opened={opened} onClose={close} title={title} position='right'>
            <SearchInput query={query} onQueryChanged={setQuery} maxWidth="100%" />
            <Table verticalSpacing="sm">
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th w={40}>
                            <Checkbox
                                onChange={toggleAll}
                                disabled={books?.data.length === 0}
                                checked={selection.length === books?.data.length}
                                indeterminate={selection.length > 0 && selection.length !== books?.data.length}
                            />
                        </Table.Th>
                        <Table.Th>{t('book.title')}</Table.Th>
                        <Table.Th> {t('book.authors')}</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>

            <Group justify="flex-end" mt="md">
                <Button type="submit" onClick={onSubmit} disabled={selection?.length < 1} loading={isAddingBook}>{t('bookShelf.actions.addBook.label')}</Button>
                <Button variant='light' onClick={close}>{t('actions.cancel')}</Button>
            </Group>
        </Drawer >
        <Box onClick={open}>
            {children}
        </Box>
    </>
    );
};


BookShelfAddBook.propTypes = {
    libraryId: PropTypes.any,
    children: PropTypes.any,
    bookShelf: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        description: PropTypes.string,
        isPublic: PropTypes.bool,
    })
};

export default BookShelfAddBook;