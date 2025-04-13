import { useTranslation } from "react-i18next";
import { useParams, useSearchParams } from "react-router-dom";

// // UI Library Imports
import { Card } from "@mantine/core";

// Local Import
import { SortDirection } from "@/models";
import BookShelvesList from "../../components/bookShelves/bookShelvesList";
import PageHeader from "@/components/pageHeader";
import { IconNames } from '@/components/icon'

// -----------------------------------------
const BookShelvesPage = () => {
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
            title={t('header.bookShelves')}
            defaultIcon={IconNames.BookShelve}
            breadcrumbs={[
                { title: t('header.home'), href: `/libraries/${libraryId}`, icon: IconNames.Home }
            ]} />
        <Card withBorder mx="md">
            <BookShelvesList
                libraryId={libraryId}
                query={query}
                sortBy={sortBy}
                sortDirection={sortDirection}
                pageNumber={pageNumber}
                pageSize={pageSize}
                showSearch />
        </Card>
    </>)
}

export default BookShelvesPage;
