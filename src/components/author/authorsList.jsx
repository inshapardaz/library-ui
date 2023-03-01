import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";

// 3rd party libraries
import { List, Switch } from "antd";

// Local Imports
import DataContainer from "../layout/dataContainer"
import AuthorCard from './authorCard'
import helpers from '../../helpers';
import AuthorListItem from "./authorListItem";
import { useGetAuthorsQuery } from '../../features/api/authorsSlice'
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
    const [showList, setShowList] = useLocalStorage('author-list-view', false);
    
    const { data : authors, error, isFetching } = useGetAuthorsQuery({libraryId, query, authorType, pageNumber, pageSize})

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
            busy={isFetching} 
            error={error} 
            empty={authors && authors.data && authors.data.length < 1}
            actions={(<Switch checkedChildren={t('actions.list')} unCheckedChildren={t('actions.card')} checked={showList} onChange={toggleView} />) }>           
            <List
                grid={ showList ? null : grid}
                loading={isFetching}
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