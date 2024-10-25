// import { useTranslation } from "react-i18next";
import { useParams, useSearchParams } from "react-router-dom";

// Local Import
import { SortDirection } from "@/models";
import AuthorsList from "@/components/authors/authorsList";

// -----------------------------------------
const AuthorsPage = () => {
    // const { t } = useTranslation();
    const { libraryId } = useParams();
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    const sortBy = searchParams.get("sortBy") ?? "name";
    const sortDirection = searchParams.get("sortDirection") ?? SortDirection.Descending;
    const pageNumber = searchParams.get("pageNumber") ?? 1;
    const pageSize = searchParams.get("pageSize") ?? 12;

    return (<AuthorsList
        libraryId={libraryId}
        query={query}
        sortBy={sortBy}
        sortDirection={sortDirection}
        pageNumber={pageNumber}
        pageSize={pageSize}
        showSearch />)
}

export default AuthorsPage;