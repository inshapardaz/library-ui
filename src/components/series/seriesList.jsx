import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

// Local imports
import { useGetSeriesQuery } from "@/store/slices/series.api";
import SeriesCard from './seriesCard';
import SeriesListItem from './seriesListItem';
import DataView from '@/components/dataView';
import { updateLinkToSeriesPage } from '@/utils';
//------------------------------

const SeriesList = ({
    libraryId,
    query = null,
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
        data: series,
        isError,
        isFetching,
    } = useGetSeriesQuery({
        libraryId,
        query,
        sortBy,
        sortDirection,
        status,
        pageNumber,
        pageSize,
    });

    return <DataView
        title={t('header.series')}
        emptyText={t('series.empty')}
        dataSource={series}
        isFetching={isFetching}
        isErro={isError}
        showViewToggle={true}
        viewToggleKey='series-list-view'
        cardRender={series => (<SeriesCard libraryId={libraryId} key={series.id} series={series} />)}
        listItemRender={series => (<SeriesListItem libraryId={libraryId} key={series.id} series={series} />)}
        onReload={refetch}
        onPageChanged={(index) => navigate(updateLinkToSeriesPage(location, {
            pageNumber: index,
            pageSize: pageSize,
        }))}
        showSearch={showSearch}
        searchValue={query}
        onSearchChanged={search => navigate(updateLinkToSeriesPage(location, {
            pageNumber: 1,
            query: search,
        }))}
    />;
}

SeriesList.propTypes = {

    libraryId: PropTypes.string,
    query: PropTypes.string,
    sortBy: PropTypes.string,
    sortDirection: PropTypes.string,
    status: PropTypes.string,
    pageNumber: PropTypes.string,
    pageSize: PropTypes.number,
    showSearch: PropTypes.bool,
}

export default SeriesList;