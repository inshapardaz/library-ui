import PropTypes from 'prop-types';

// UI library imports
import { useMantineTheme } from '@mantine/core';

// Local imports
import { useRemoveBookFromBookShelfMutation } from '@/store/slices/bookShelves.api';
import DeleteButton from "@/components/deleteButton";
import { IconRemoveBookFromBookShelve } from '@/components/icon';
//---------------------------------
const BookRemoveFromShelfButton = ({ book, t, onDeleted = () => { }, ...props }) => {
    const theme = useMantineTheme();
    const [removeBook, { isLoading: isDeleting }] = useRemoveBookFromBookShelfMutation();

    return (<DeleteButton {...props}
        title={t("bookShelf.actions.removeBook.title")}
        message={t("bookShelf.actions.removeBook.message", { title: book.title, name: book.bookShelf?.name })}
        tooltip={t('bookShelf.actions.removeBook.title')}
        successMessage={t("bookShelf.actions.removeBook.success", { title: book.title, name: book.bookShelf?.name })}
        errorMessage={t("bookShelf.actions.removeBook.error", { title: book.title, name: book.bookShelf?.name })}
        isDeleting={isDeleting}
        onDelete={() => { return removeBook({ removeLink: book.links.remove_book_from_bookshelf }).unwrap() }}
        onDeleted={onDeleted}
        type="icon"
        icon={<IconRemoveBookFromBookShelve height={16} style={{ color: theme.colors.dark[2] }} />}
    />)
}

BookRemoveFromShelfButton.propTypes = {
    libraryId: PropTypes.string,
    t: PropTypes.any,
    onDeleted: PropTypes.func,
    book: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        links: PropTypes.shape({
            remove_book_from_bookshelf: PropTypes.string,
        }),
        bookShelf: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
        }),
    }),
};

export default BookRemoveFromShelfButton;