// import { useTranslation } from "react-i18next";
import { useParams, useSearchParams } from "react-router-dom";

// Local Import
import { SortDirection } from "@/models";
import WritingsList from "@/components/writings/writingsList";
import { Grid, rem } from "@mantine/core";
import WritingsSideBar from "@/components/writings/writingsSidebar";

// -----------------------------------------
const WritingsPage = () => {
    const { libraryId } = useParams();
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    const author = searchParams.get("author");
    const category = searchParams.get("category");
    const favorite = searchParams.get("favorite");
    const read = searchParams.get("read");
    const sortBy = searchParams.get("sortBy") ?? "name";
    const sortDirection = searchParams.get("sortDirection") ?? SortDirection.Descending;
    const pageNumber = searchParams.get("pageNumber") ?? "1";
    const pageSize = searchParams.get("pageSize") ?? "12";

    return (<Grid type="container" breakpoints={{ xs: '100px', sm: '200px', md: '300px', lg: '400px', xl: '500px' }}>
        <Grid.Col span={{ md: 12, lg: 3, xl: 2 }} style={{ minWidth: rem(200) }}>
            <WritingsSideBar
                selectedCategory={category}
                favorite={favorite}
                read={read} />
        </Grid.Col>
        <Grid.Col span="auto">
            <WritingsList
                libraryId={libraryId}
                query={query}
                author={author}
                category={category}
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

export default WritingsPage;
