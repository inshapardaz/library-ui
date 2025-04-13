import PropTypes from 'prop-types';

// Local imports
import { useDeleteBookShelfMutation } from '@/store/slices/bookShelves.api';
import DeleteButton from "@/components/deleteButton";

//---------------------------------
const BookShelfDeleteButton = ({ bookShelf, t, onDeleted = () => { }, ...props }) => {
    const [deleteBookShelf, { isLoading: isDeleting }] = useDeleteBookShelfMutation();

    return (<DeleteButton {...props}
        title={t("bookShelf.actions.delete.title")}
        message={t("bookShelf.actions.delete.message", { name: bookShelf.name })}
        tooltip={t('bookShelf.actions.delete.label', { name: bookShelf.name })}
        successMessage={t("bookShelf.actions.delete.success", { name: bookShelf.name })}
        errorMessage={t("bookShelf.actions.delete.error", { name: bookShelf.name })}
        isDeleting={isDeleting}
        onDelete={() => { return deleteBookShelf({ bookShelf }).unwrap() }}
        onDeleted={onDeleted}
    />)
}

BookShelfDeleteButton.propTypes = {
    libraryId: PropTypes.string,
    t: PropTypes.any,
    onDeleted: PropTypes.func,
    bookShelf: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        description: PropTypes.string,
        links: PropTypes.shape({
            delete: PropTypes.string,
        })
    })
};

export default BookShelfDeleteButton;