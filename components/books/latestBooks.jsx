import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// 3rd party libraries
import { Container, Grid, Segment,  Button, Header, Icon } from 'semantic-ui-react'

// Internal Imports
import styles from '../../styles/library.module.scss'
import BookCard from "./bookCard";
import libraryService from "@/services/libraryService";
// ------------------------------------------------------

function LatestBooks({libraryId}) {
    const { t } = useTranslation('library');
    const [busy, setBusy] = useState(true);
    const [error, setError] = useState(false);
    const [books, setBooks] = useState(null);

    const loadBooks = (libId) => {
        console.log('Loading latest books')
        setBusy(true);
        setError(false);

        libraryService.getLatestBooks(libId)
            .then(res => setBooks(res))
            .catch(_ => setError(true))
            .finally(_ => setBusy(false))
    }

    useEffect(() => loadBooks(libraryId), [libraryId])

    if (busy) {
        return (
        <Grid container columns={3}>
        { [1,2,3].map(l => (
            <Grid.Column key={l} mobile={16} tablet={8} computer={4}>
                <BookCard loading />
            </Grid.Column>
            ))}
        </Grid>
      );
    }

    if (error) {
        return (<Segment placeholder>
            <Header icon>
            <Icon name='warning sign' />
                {t('books.latest.message.loading.error')}
            </Header>
            <Button primary onClick={loadBooks}>{t('action.retry')}</Button>
        </Segment>
        )
    }

    if (!busy && books && books.data && books.data.length < 1) {
        return (<Segment placeholder>
            <Header icon>
            <Icon name='inbox' />
                {t('books.latest.message.empty')}
            </Header>
        </Segment>)
    }

    console.log(books);

    return (<Container className={styles.latest}>
        <Header as='h2'>{t('books.latest.title')}</Header>
        <Grid container columns={3}>
        { books.data.map(b => (
            <Grid.Column key={b.id} mobile={16} tablet={8} computer={4}>
                <BookCard libraryId={libraryId} book={b} />
            </Grid.Column>
        ))}
        </Grid>
    </Container>)
}

export default LatestBooks;