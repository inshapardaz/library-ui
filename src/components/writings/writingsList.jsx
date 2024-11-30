import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

// Local imports
import { useGetArticlesQuery } from "@/store/slices/articles.api";
import WritingCard from './writingCard';
import WritingListItem from './writingListItem';
import DataView from '@/components/dataView';
import { updateLinkToWritingsPage } from '@/utils';
//------------------------------

const WritingsList = ({
    libraryId,
    query = null,
    author = null,
    category = null,
    sortBy = null,
    sortDirection = null,
    favorite = null,
    read = null,
    status,
    pageNumber,
    pageSize,
    showSearch = true,
    showTitle = true
}) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    const {
        refetch,
        data: articles,
        isError,
        isFetching,
    } = useGetArticlesQuery({
        libraryId,
        query,
        author,
        category,
        type: 'writing',
        sortBy,
        sortDirection,
        favorite,
        read,
        status,
        pageNumber,
        pageSize,
    });

    return <DataView
        title={showTitle ? t('header.writings') : null}
        emptyText={t('writings.empty')}
        dataSource={articles}
        isFetching={isFetching}
        isError={isError}
        errorTitle={t('writings.error.loading.title')}
        errorDetail={t('writings.error.loading.detail')}
        showViewToggle={true}
        viewToggleKey='writings-list-view'
        cardRender={writing => (<WritingCard libraryId={libraryId} key={writing.id} writing={writing} />)}
        listItemRender={writing => (<WritingListItem libraryId={libraryId} key={writing.id} writing={writing} />)}
        onReload={refetch}
        onPageChanged={(index) => navigate(updateLinkToWritingsPage(location, {
            pageNumber: index,
            pageSize: pageSize,
        }))}
        showSearch={showSearch}
        searchValue={query}
        onSearchChanged={search => navigate(updateLinkToWritingsPage(location, {
            pageNumber: 1,
            query: search,
        }))}
    />;
}

WritingsList.propTypes = {
    libraryId: PropTypes.string,
    query: PropTypes.string,
    author: PropTypes.string,
    category: PropTypes.string,
    sortBy: PropTypes.string,
    sortDirection: PropTypes.string,
    favorite: PropTypes.string,
    read: PropTypes.string,
    status: PropTypes.string,
    pageNumber: PropTypes.string,
    pageSize: PropTypes.string,
    showSearch: PropTypes.bool,
    showTitle: PropTypes.bool,
}

export default WritingsList;