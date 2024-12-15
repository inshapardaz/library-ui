import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

// Local imports
import { useGetArticlesQuery } from "@/store/slices/articles.api";
import WritingCard from './writingCard';
import WritingListItem from './writingListItem';
import DataView from '@/components/dataView';
import { updateLinkToWritingsPage } from '@/utils';
import SortMenu from '@/components/sortMenu';
import SortDirectionToggle from '@/components/sortDirectionToggle';
import { IconTitle, IconDateCreated } from '@/components/icon';
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

    let writingSortOptions = [{
        label: t('writing.title'),
        value: 'title',
        icon: <IconTitle />
    }, {
        label: t('writing.lastModified'),
        value: 'lastModified',
        icon: <IconDateCreated />
    }];

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
        extraFilters={
            <>
                <SortMenu options={writingSortOptions} value={sortBy} onChange={value => navigate(updateLinkToWritingsPage(location, {
                    pageNumber: 1,
                    sortBy: value,
                }))} />
                <SortDirectionToggle value={sortDirection} onChange={dir => navigate(updateLinkToWritingsPage(location, {
                    pageNumber: 1,
                    sortDirection: dir,
                }))} />
            </>
        }
        cols={{ base: 1, xs: 2, sm: 3, md: 4, lg: 4, xl: 6 }}
    />;
}

WritingsList.propTypes = {
    libraryId: PropTypes.string,
    query: PropTypes.string,
    author: PropTypes.number,
    category: PropTypes.string,
    sortBy: PropTypes.string,
    sortDirection: PropTypes.string,
    favorite: PropTypes.string,
    read: PropTypes.string,
    status: PropTypes.string,
    pageNumber: PropTypes.number,
    pageSize: PropTypes.number,
    showSearch: PropTypes.bool,
    showTitle: PropTypes.bool,
}

export default WritingsList;