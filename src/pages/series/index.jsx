import { useTranslation } from "react-i18next";
import { useParams, useSearchParams } from "react-router-dom";

// Local Import
import { SortDirection } from "@/models";
import SeriesList from "@/components/series/seriesList";
import PageHeader from "@/components/pageHeader";
import { IconNames, IconHome } from '@/components/icon'

// -----------------------------------------
const SeriesListPage = () => {
    const { t } = useTranslation();
    const { libraryId } = useParams();
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    const sortBy = searchParams.get("sortBy") ?? "name";
    const sortDirection = searchParams.get("sortDirection") ?? SortDirection.Ascending;
    const pageNumber = parseInt(searchParams.get("pageNumber") ?? "1");
    const pageSize = parseInt(searchParams.get("pageSize") ?? "12");

    return (<>
        <PageHeader
            title={t('header.series')}
            defaultIcon={IconNames.Series}
            breadcrumbs={[
                { title: t('header.home'), href: `/libraries/${libraryId}`, icon: <IconHome height={16} /> }
            ]} />
        <SeriesList
            libraryId={libraryId}
            query={query}
            sortBy={sortBy}
            sortDirection={sortDirection}
            pageNumber={pageNumber}
            pageSize={pageSize}
            showSearch />
    </>)
}

export default SeriesListPage;
