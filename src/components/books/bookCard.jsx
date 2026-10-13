import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Ui Library import
import { Box, Progress, Text } from '@mantine/core';

// Local imports
import { IconBook } from '@/components/icon';
import FavoriteButton from '@/components/books/favoriteButton';
import BookRemoveFromShelfButton from '@/components/bookShelves/bookRemoveFromShelfButton';
import classes from './bookCard.module.css';
//---------------------------------------

// Reading progress as a percentage, when the API reports it for this reader
const progressOf = (book) => {
    const value = book?.readProgress?.progressValue;
    return typeof value === 'number' ? Math.max(0, Math.min(100, value)) : null;
};

// A book as a cover with its title, authors and reading progress underneath (the design's
// library card). Details such as page counts and the description live on the book page.
const BookCard = ({ libraryId, book }) => {
    const { t } = useTranslation();
    const [imgError, setImgError] = useState(false);
    const href = `/libraries/${libraryId}/books/${book.id}`;
    const authors = (book.authors ?? []).map((author) => author.name).join(', ');
    const progress = progressOf(book);

    return (
        <Box>
            <Box pos="relative">
                <Link to={href} className={classes.cover} aria-label={book.title}>
                    {book.links?.image && !imgError
                        ? <img src={book.links.image} alt="" loading="lazy" onError={() => setImgError(true)} />
                        : <IconBook width={44} style={{ color: 'var(--mantine-color-accent-4)' }} />}
                </Link>
                <Box className={classes.heart}>
                    <FavoriteButton book={book} size={18} />
                </Box>
            </Box>
            <Text component={Link} to={href} fw={600} fz="md" mt="xs" lineClamp={2} display="block" c="inherit" td="none">
                {book.title}
            </Text>
            {authors && <Text fz="sm" c="dimmed" lineClamp={1}>{authors}</Text>}
            {progress !== null && (
                <Progress value={progress} size={4} mt="xs" aria-label={t('book.progress', { value: Math.round(progress) })} />
            )}
            {book.links?.remove_book_from_bookshelf != null && (
                <BookRemoveFromShelfButton book={book} t={t} />
            )}
        </Box>
    );
};

BookCard.propTypes = {
    libraryId: PropTypes.string,
    book: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        authors: PropTypes.array,
        readProgress: PropTypes.shape({
            progressValue: PropTypes.number,
        }),
        links: PropTypes.shape({
            image: PropTypes.string,
            remove_book_from_bookshelf: PropTypes.string
        })
    })
};

export default BookCard
