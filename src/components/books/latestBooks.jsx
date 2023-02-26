import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

// 3rd party libraries
import { Button, List, Switch } from 'antd';

// Internal Imports
import DataContainer from "../layout/dataContainer";
import BookCard from "./bookCard";
import BookListItem from "./bookListItem";
import { fetchLatestBooks, getLatestBooks, getLatestBooksError, getLatestBooksStatus } from '../../features/libraries/booksSlice'
import { useDispatch, useSelector } from "react-redux";

// ------------------------------------------------------

function ShowMoreButton ({ libraryId, t}) {
    const navigate = useNavigate();
    return(<div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button size="small" onClick={() => navigate(`/libraries/${libraryId}/books?sortBy=latest`)}>
            {t('actions.seeMore')}
        </Button>
    </div>);
}

const grid = {
    gutter: 4,
    xs: 1,
    sm: 2,
    md: 3,
    lg: 3,
    xl: 4,
    xxl: 5,
};

function LatestBooks() {
    const { t } = useTranslation();
    const { libraryId } = useParams()
    const dispatch = useDispatch()
    const books = useSelector(getLatestBooks)
    const status = useSelector(getLatestBooksStatus);
    const error = useSelector(getLatestBooksError);
    const [showList, setShowList] = useState(false);

    useEffect(() => {
        if (status === 'idle') 
        {
            dispatch(fetchLatestBooks(libraryId))
        }
    }, [dispatch, status, libraryId])
    
    const toggleView = (checked) => {
        setShowList(checked);
      };


    return (<DataContainer title={t('books.latest.title')} 
        busy={status === 'loading'} 
        error={error} 
        empty={books && books.data && books.data.length < 1}
        actions={(<Switch checked={showList} onChange={toggleView} />) }>
        <List
            grid={ showList ? null : grid}
            loading={status === 'loading'}
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
    </DataContainer>)
}

export default LatestBooks;