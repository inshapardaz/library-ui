import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

// ui library import
import { Card, Container } from "@mantine/core";

// Local Import
import { SortDirection } from "@/models";
import LibrariesList from "@/components/library/librariesList";
import PageHeader from "@/components/pageHeader";
import { IconNames } from '@/components/icon';

// -----------------------------------------
const LibraryHomePage = () => {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    const sortBy = searchParams.get("sortBy") ?? "name";
    const sortDirection = searchParams.get("sortDirection") ?? SortDirection.Ascending;
    const pageNumber = searchParams.get("pageNumber") ?? 1;
    const pageSize = searchParams.get("pageSize") ?? 12;

    return (<Container fluid mt="sm">
        <PageHeader title={t('header.libraries')}
            defaultIcon={IconNames.Library}
            breadcrumbs={[
                { title: t('header.home'), href: `/libraries/}`, icon: IconNames.Home },
            ]} />
        <Card withBorder>
            <LibrariesList
                query={query}
                sortBy={sortBy}
                sortDirection={sortDirection}
                pageNumber={pageNumber}
                pageSize={pageSize}
                showSearch />
        </Card>
    </Container >
    );
}

export default LibraryHomePage;
