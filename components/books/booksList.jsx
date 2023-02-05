import { useEffect, useState } from "react";
import { useTranslations } from 'next-intl';
import { useRouter } from "next/router";
import { useLocalStorage } from "usehooks-ts";

// 3rd party libraries
import { Button, List, Space, Switch } from 'antd';

// Internal Imports
import libraryService from "@/services/libraryService";
import ApiContainer from "../common/ApiContainer";
import BookCard from "./bookCard";
import BookListItem from "./bookListItem";
import helpers from "../../helpers";

// ------------------------------------------------------

const grid = {
    gutter: 4,
    xs: 1,
    sm: 2,
    md: 3,
    lg: 3,
    xl: 4,
    xxl: 5,
};

// ------------------------------------------------------

function BooksList({libraryId, query, author, categories, series, sortBy, sortDirection, favorites, read, status, pageNumber = 1, pageSize = 12 }) {
    const t = useTranslations();
    const router = useRouter();
    const [busy, setBusy] = useState(true);
    const [error, setError] = useState(false);
    const [books, setBooks] = useState(null);
    const [showList, setShowList] = useLocalStorage('book-list-view', false);

    useEffect(() => {
        setBusy(true);
        setError(false);
    
        libraryService.getBooks(libraryId, query, author, categories, series, sortBy, sortDirection, favorites, read, status, pageNumber, pageSize)
            .then(res => setBooks(res))
            .catch(_ => setError(true))
            .finally(_ => setBusy(false))
    }, [libraryId, query, author, categories, series, sortBy, sortDirection, favorites, read, status, pageNumber, pageSize])
    
    const toggleView = (checked) => {
        setShowList(checked);
      };
    
    const onPageChanged = (newPage, newPageSize) => {
    router.push(helpers.buildLinkToBooksPage(
        `/libraries/${libraryId}/books`,
        newPage,
        newPageSize,
        query,
        author,
        categories,
        series,
        sortBy,
        sortDirection,
        favorites,
        read,
        status,
        ));
    }
    
    return (<ApiContainer
        busy={busy} 
        error={error} 
        empty={books && books.data && books.data.length < 1}
        actions={(<Switch checkedChildren={t('actions.list')} unCheckedChildren={t('actions.card')} checked={showList} onChange={toggleView} />) }>
        <List
            grid={ showList ? null : grid}
            loading={busy}
            size="large"
            itemLayout={ showList ? "vertical": "horizontal" }
            dataSource={books ? books.data : []}
            pagination={{
                onChange: onPageChanged,
                pageSize: books ? books.pageSize : 0,
                current: books ? books.currentPageIndex : 0,
                total: books ? books.totalCount : 0,
                showSizeChanger: true,
                responsive: true,
                showQuickJumper: true,
                pageSizeOptions: [12, 24, 48, 96]
            }}
            renderItem={(book) => (
            <List.Item>
                { showList ?  
                    <BookListItem key={book.id} libraryId={libraryId} book={book} t={t} /> : 
                    <BookCard key={book.id} libraryId={libraryId} book={book} t={t} /> }
            </List.Item>
            )}
        />
    </ApiContainer>);
}

export default BooksList;