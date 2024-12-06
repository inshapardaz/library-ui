import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

// Local imports
import { useGetAuthorsQuery } from "@/store/slices/authors.api";
import AuthorCard from './authorCard';
import AuthorListItem from './authorListItem';
import DataView from '@/components/dataView';
import { updateLinkToAuthorsPage } from '@/utils';
//------------------------------

const AuthorsList = ({
    libraryId,
    query = null,
    authorType = null,
    sortBy = null,
    sortDirection = null,
    status,
    pageNumber,
    pageSize,
    showSearch = true,
}) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    const {
        refetch,
        data: authors,
        isError,
        isFetching,
    } = useGetAuthorsQuery({
        libraryId,
        query,
        authorType,
        sortBy,
        sortDirection,
        status,
        pageNumber,
        pageSize,
    });

    return <DataView
        emptyText={t('authors.empty')}
        dataSource={authors}
        isFetching={isFetching}
        isError={isError}
        errorTitle={t('authors.error.loading.title')}
        errorDetail={t('authors.error.loading.detail')}
        showViewToggle={true}
        viewToggleKey='authors-list-view'
        cardRender={author => (<AuthorCard libraryId={libraryId} key={author.id} author={author} />)}
        listItemRender={author => (<AuthorListItem libraryId={libraryId} key={author.id} author={author} />)}
        onReload={refetch}
        onPageChanged={(index) => navigate(updateLinkToAuthorsPage(location, {
            pageNumber: index,
            pageSize: pageSize,
        }))}
        showSearch={showSearch}
        searchValue={query}
        onSearchChanged={search => navigate(updateLinkToAuthorsPage(location, {
            pageNumber: 1,
            query: search,
        }))}
        cols={{ base: 1, xs: 2, sm: 3, md: 4, lg: 4, xl: 6 }}
    />;
}

AuthorsList.propTypes = {

    libraryId: PropTypes.string,
    query: PropTypes.string,
    authorType: PropTypes.string,
    sortBy: PropTypes.string,
    sortDirection: PropTypes.string,
    status: PropTypes.string,
    pageNumber: PropTypes.number,
    pageSize: PropTypes.number,
    showSearch: PropTypes.bool,
}

export default AuthorsList;