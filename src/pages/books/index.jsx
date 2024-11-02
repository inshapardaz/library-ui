// import { useTranslation } from "react-i18next";
import { useParams, useSearchParams } from "react-router-dom";

// Local Import
import { SortDirection } from "@/models";
import BooksSideBar from "@/components/books/booksSidebar";
import BooksList from "@/components/books/booksList";
import { Grid, rem } from "@mantine/core";

// -----------------------------------------
const BooksPage = () => {
    const { libraryId } = useParams();
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    const series = searchParams.get("series");
    const author = searchParams.get("author");
    const category = searchParams.get("category");
    const favorite = searchParams.get("favorite");
    const read = searchParams.get("read");
    const sortBy = searchParams.get("sortBy") ?? "name";
    const sortDirection = searchParams.get("sortDirection") ?? SortDirection.Descending;
    const pageNumber = searchParams.get("pageNumber") ?? 1;
    const pageSize = searchParams.get("pageSize") ?? 12;

    return (<Grid type="container" breakpoints={{ xs: '100px', sm: '200px', md: '300px', lg: '400px', xl: '500px' }}>
        <Grid.Col span={{ md: 12, lg: 3, xl: 2 }} style={{ minWidth: rem(200) }}>
            <BooksSideBar selectedCategory={category} />
        </Grid.Col>
        <Grid.Col span="auto">
            <BooksList
                libraryId={libraryId}
                query={query}
                author={author}
                category={category}
                series={series}
                sortBy={sortBy}
                favorite={favorite}
                read={read}
                sortDirection={sortDirection}
                pageNumber={pageNumber}
                pageSize={pageSize}
                showSearch
                showTitle={false} />
        </Grid.Col>
    </Grid>)
}

export default BooksPage;
