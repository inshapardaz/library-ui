import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocalStorage } from "usehooks-ts";

// 3rd party libraries
import { List, Switch } from "antd";

// Local Imports
import DataContainer from "../layout/dataContainer"
import AuthorCard from './authorCard'
import helpers from '../../helpers';
import AuthorListItem from "./authorListItem";
import { fetchAuthors, getAuthors, getAuthorsError, getAuthorsStatus } from '../../features/libraries/authorsSlice'
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

function AuthorsList({libraryId, query, authorType, pageNumber, pageSize}) {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const status = useSelector(getAuthorsStatus);
    const error = useSelector(getAuthorsError);
    const authors = useSelector(getAuthors);
    const [showList, setShowList] = useLocalStorage('author-list-view', false);
    
    useEffect(() => {
        if (status === 'idle' ) {
            dispatch(fetchAuthors({libraryId, query, authorType, pageNumber, pageSize}))
        }
    }, [libraryId, query, authorType, pageNumber, pageSize, status, dispatch])
   
    const toggleView = (checked) => {
        setShowList(checked);
    };

    const renderItem = (author) => {
        if (showList) {
            return <AuthorListItem key={author.id} libraryId={libraryId} author={author} t={t} />
        } 
        else {
            return <List.Item><AuthorCard key={author.id} libraryId={libraryId} author={author} t={t} /></List.Item>
        }
    }

    const onPageChanged = (newPage, newPageSize) => {
        navigate(helpers.buildLinkToAuthorsPage(
            libraryId,
            newPage,
            newPageSize,
            query,
            authorType
            ));
        }

        return (<DataContainer
            busy={status === 'loading'} 
            error={error} 
            empty={authors && authors.data && authors.data.length < 1}
            actions={(<Switch checkedChildren={t('actions.list')} unCheckedChildren={t('actions.card')} checked={showList} onChange={toggleView} />) }>           
            <List
                grid={ showList ? null : grid}
                loading={status === 'loading'}
                size="large"
                itemLayout={ showList ? "vertical": "horizontal" }
                dataSource={authors ? authors.data : []}
                pagination={{
                    onChange: onPageChanged,
                    pageSize: authors ? authors.pageSize : 0,
                    current: authors ? authors.currentPageIndex : 0,
                    total: authors ? authors.totalCount : 0,
                    showSizeChanger: true,
                    responsive: true,
                    showQuickJumper: true,
                    pageSizeOptions: [12, 24, 48, 96]
                }}
                renderItem={renderItem}
            />
        </DataContainer>);
}

export default AuthorsList;