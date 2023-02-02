import { useEffect, useState } from "react";
import { useTranslations } from 'next-intl';
import { useRouter } from "next/router";

// 3rd party libraries
import { Button, List, Space, Toggle } from 'antd';

// Internal Imports
import libraryService from "@/services/libraryService";
import ApiContainer from "../common/ApiContainer";
import BookCard from "./bookCard";

// ------------------------------------------------------

function ShowMoreButton ({ libraryId, t}) {
    const { router } = useRouter();
    return(<Space block="true" align="center">
        <Button onClick={() => router.push(`/libraries/${libraryId}/books?sortBy=latest`)}>
            {t('books.seeMore')}
        </Button>
    </Space>);
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

    return (<ApiContainer title={t('books.latest.title')} 
        busy={busy} 
        error={error} 
        empty={books && books.data && books.data.length < 1}
        extra={<Toggle checked={showList} onChange={(checked) => setShowList(checked)}/>}>
        <List
            grid={{
                gutter: 4,
                xs: 1,
                sm: 2,
                md: 3,
                lg: 3,
                xl: 4,
                xxl: 5,
            }}
            loading={busy}
            dataSource={books ? books.data : []}
            loadMore={<ShowMoreButton t={t} libraryId={libraryId} />}
            renderItem={(book) => (
            <List.Item>
                <BookCard key={book.id} libraryId={libraryId} book={book} />
            </List.Item>
            )}
        />
    </ApiContainer>)
}

export default LatestBooks;