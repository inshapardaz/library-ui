// import { useTranslation } from "react-i18next";
import { useParams, useSearchParams } from "react-router-dom";

// Local Import
import { SortDirection } from "@/models";
import BooksList from "@/components/books/booksList";

// -----------------------------------------
const BooksPage = () => {
    // const { t } = useTranslation();
    const { libraryId } = useParams();
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    const series = searchParams.get("series");
    const author = searchParams.get("author");
    const category = searchParams.get("category");
    const sortBy = searchParams.get("sortBy") ?? "name";
    const sortDirection = searchParams.get("sortDirection") ?? SortDirection.Descending;
    const pageNumber = searchParams.get("pageNumber") ?? 1;
    const pageSize = searchParams.get("pageSize") ?? 12;

    return (<BooksList
        libraryId={libraryId}
        query={query}
        author={author}
        category={category}
        series={series}
        sortBy={sortBy}
        sortDirection={sortDirection}
        pageNumber={pageNumber}
        pageSize={pageSize}
        showSearch />)
}

export default BooksPage;
