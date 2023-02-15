import { useEffect, useState } from "react";
import { useTranslations } from 'next-intl';
import { useRouter } from "next/router";

// 3rd party libraries
import { List, Switch } from 'antd';

// Internal Imports
import ApiContainer from "../common/ApiContainer";
import BookCard from "./bookCard";
import BookListItem from "./bookListItem";
import helpers from "@/helpers/index";

// ------------------------------------------------------

const grid = {
    gutter: 4,
    xs: 1,
    sm: 1,
    md: 1,
    lg: 2,
    xl: 3,
    xxl: 4,
};

// ------------------------------------------------------

function BooksList({libraryId, query, author, categories, series, sortBy, sortDirection, favorites, read, status, books, pageNumber = 1, pageSize = 12 }) {
    const t = useTranslations();
    const router = useRouter();
    const [showList, setShowList] = useState(false);

    const toggleView = (checked) => {
        setShowList(checked);
        localStorage.setItem('book-list-view', checked)
      };
    
    useEffect(() =>  {
        setShowList (localStorage.getItem('book-list-view') === 'true')
    }, [])

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
    
    const renderItem = (book) => {
        if (showList) {
            return <BookListItem key={book.id} libraryId={libraryId} book={book} t={t} />
        } 
        else {
            return <List.Item><BookCard key={book.id} libraryId={libraryId} book={book} t={t} /></List.Item>
        }
    }

    return (<ApiContainer 
        bordered={false}
        empty={books && books.data && books.data.length < 1}
        actions={(<Switch checkedChildren={t('actions.list')} unCheckedChildren={t('actions.card')} checked={showList} onChange={toggleView} />) }>
        <List
            grid={ showList ? null : grid}
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
            renderItem={renderItem}
        />
    </ApiContainer>);
}

export default BooksList;