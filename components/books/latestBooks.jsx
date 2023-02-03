import { useEffect, useState } from "react";
import { useTranslations } from 'next-intl';
import { useRouter } from "next/router";

// 3rd party libraries
import { Button, List, Space, Switch } from 'antd';

// Internal Imports
import libraryService from "@/services/libraryService";
import ApiContainer from "../common/ApiContainer";
import BookCard from "./bookCard";
import BookListItem from "./bookListItem";

// ------------------------------------------------------

function ShowMoreButton ({ libraryId, t}) {
    const router = useRouter();
    return(<div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button size="small" onClick={() => router.push(`/libraries/${libraryId}/books?sortBy=latest`)}>
            {t('actions.seeMore')}
        </Button>
    </div>);
}

function LatestBooks({libraryId}) {
    const t = useTranslations();
    const [busy, setBusy] = useState(true);
    const [error, setError] = useState(false);
    const [books, setBooks] = useState(null);
    const [showList, setShowList] = useState(false);

    const loadBooks = (libId) => {
        setBusy(true);
        setError(false);

        libraryService.getLatestBooks(libId)
            .then(res => setBooks(res))
            .catch(_ => setError(true))
            .finally(_ => setBusy(false))
    }

    useEffect(() => loadBooks(libraryId), [libraryId])
    
    const toggleView = (checked) => {
        setShowList(checked);
      };

    const grid = {
        gutter: 4,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 4,
        xxl: 5,
    };

    return (<ApiContainer title={t('books.latest.title')} 
        busy={busy} 
        error={error} 
        empty={books && books.data && books.data.length < 1}
        actions={(<Switch checked={showList} onChange={toggleView} />) }>
        <List
            grid={ showList ? null : grid}
            loading={busy}
            size="large"
            itemLayout={ showList ? "vertical": "horizontal" }
            dataSource={books ? books.data : []}
            loadMore={<ShowMoreButton t={t} libraryId={libraryId} />}
            renderItem={(book) => (
            <List.Item>
                { showList ?  
                    <BookListItem key={book.id} libraryId={libraryId} book={book} t={t} /> : 
                    <BookCard key={book.id} libraryId={libraryId} book={book} t={t} /> }
            </List.Item>
            )}
        />
    </ApiContainer>)
}

export default LatestBooks;