// import { useTranslation } from "react-i18next";
import { useParams, useSearchParams } from "react-router-dom";

// UI Library Import
import { Grid, rem } from "@mantine/core";

// Local Import
import { SortDirection } from "@/models";
import PeriodicalsSideBar from "@/components/periodicals/periodicalsSideBar";
import PeriodicalsList from "@/components/periodicals/periodicalsList";

// -----------------------------------------
const PeriodicalsPage = () => {
    const { libraryId } = useParams();
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    const category = searchParams.get("category");
    const frequency = searchParams.get("frequency");
    const sortBy = searchParams.get("sortBy") ?? "title";
    const sortDirection = searchParams.get("sortDirection") ?? SortDirection.Ascending;
    const pageNumber = searchParams.get("pageNumber") ?? 1;
    const pageSize = searchParams.get("pageSize") ?? 12;

    return (<Grid type="container" breakpoints={{ xs: '100px', sm: '200px', md: '300px', lg: '400px', xl: '500px' }}>
        <Grid.Col span={{ md: 12, lg: 3, xl: 2 }} style={{ minWidth: rem(200) }}>
            <PeriodicalsSideBar
                selectedCategory={category}
                frequency={frequency} />
        </Grid.Col>
        <Grid.Col span="auto">
            <PeriodicalsList
                libraryId={libraryId}
                query={query}
                category={category}
                sortBy={sortBy}
                frequency={frequency}
                sortDirection={sortDirection}
                pageNumber={pageNumber}
                pageSize={pageSize}
                showSearch
                showTitle={false} />
        </Grid.Col>
    </Grid>)
}

export default PeriodicalsPage;
