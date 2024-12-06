import { useTranslation } from "react-i18next";
import { useParams, useSearchParams } from "react-router-dom";

// Local Import
import { SortDirection } from "@/models";
import AuthorsList from "@/components/authors/authorsList";
import PageHeader from "@/components/pageHeader";
import { IconNames } from '@/components/icon'

// -----------------------------------------
const AuthorsPage = () => {
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
            title={t('header.authors')}
            defaultIcon={IconNames.Authors}
            breadcrumbs={[
                { title: t('header.home'), href: `/libraries/${libraryId}`, icon: IconNames.Home }
            ]} />
        <AuthorsList
            libraryId={libraryId}
            query={query}
            sortBy={sortBy}
            sortDirection={sortDirection}
            pageNumber={pageNumber}
            pageSize={pageSize}
            showSearch />
    </>)
}

export default AuthorsPage;
