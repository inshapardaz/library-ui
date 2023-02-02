import { useEffect, useState } from "react";
import { useTranslations } from 'next-intl';

// 3rd party libraries

// Internal Imports
import libraryService from "@/services/libraryService";
import ApiContainer from "../common/ApiContainer";
import BookCard from "./bookCard";

// ------------------------------------------------------

const gridStyle = {
    width: '25%',
    textAlign: 'center',
    cursor: 'pointer'
  };

function LatestBooks({libraryId}) {
    const t = useTranslations();
    const [busy, setBusy] = useState(true);
    const [error, setError] = useState(false);
    const [books, setBooks] = useState(null);

    const loadBooks = (libId) => {
        setBusy(true);
        setError(false);

        libraryService.getLatestBooks(libId)
            .then(res => setBooks(res))
            .catch(_ => setError(true))
            .finally(_ => setBusy(false))
    }

    useEffect(() => loadBooks(libraryId), [libraryId])

    return (<ApiContainer title={t('books.latest.title')} busy={busy} error={error} empty={books && books.data && books.data.length < 1}>
    { books && books.data && books.data.map(book => (
        <BookCard key={book.id} libraryId={libraryId} book={book} style={gridStyle} />))
    }
    </ApiContainer>)
}

export default LatestBooks;