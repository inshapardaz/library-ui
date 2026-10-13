import { useTranslation } from "react-i18next";
import { Navigate, useNavigate, useParams } from "react-router-dom";

// Ui library imports
import { Card, Container, Stack, Tabs } from "@mantine/core";

// Local Import
import { MY_LIBRARY_SECTIONS } from "@/utils/legacyRedirects";
import PageHeader from "@/components/pageHeader";
import { IconNames } from '@/components/icon';
import LastReadBooks from "@/components/books/lastReadBooks";
import BookShelvesList from "@/components/bookShelves/bookShelvesList";
import TypedContent from "@/components/myLibrary/typedContent";
import BookmarksAndNotes from "@/components/myLibrary/bookmarksAndNotes";
import { SortDirection } from "@/models";
import { useSearchParams } from "react-router-dom";
// -----------------------------------------

// One hub for everything that belongs to the signed-in reader. The route is protected (see
// router.jsx), so a user is always present here.
const MyLibraryPage = () => {
    const { t } = useTranslation();
    const { libraryId, section } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    if (!section) {
        return <Navigate to={`/libraries/${libraryId}/my/continue`} replace />;
    }
    if (!MY_LIBRARY_SECTIONS.includes(section)) {
        return <Navigate to={`/libraries/${libraryId}/my/continue`} replace />;
    }

    const content = {
        continue: <LastReadBooks libraryId={libraryId} />,
        favorites: <TypedContent libraryId={libraryId} mode="favorite" />,
        shelves: <BookShelvesList
            libraryId={libraryId}
            query={searchParams.get("query")}
            sortBy={searchParams.get("sortBy") ?? "name"}
            sortDirection={searchParams.get("sortDirection") ?? SortDirection.Ascending}
            pageNumber={parseInt(searchParams.get("pageNumber") ?? "1", 10)}
            pageSize={parseInt(searchParams.get("pageSize") ?? "12", 10)} />,
        bookmarks: <BookmarksAndNotes libraryId={libraryId} />,
        history: <TypedContent libraryId={libraryId} mode="read" />,
    };

    return (
        <Container fluid>
            <PageHeader
                title={t('myLibrary.title')}
                defaultIcon={IconNames.Library}
                breadcrumbs={[
                    { title: t('header.home'), href: `/libraries/${libraryId}`, icon: IconNames.Home }
                ]} />
            <Stack mx="md" gap="md">
                <Tabs value={section} onChange={(value) => navigate(`/libraries/${libraryId}/my/${value}`)}>
                    <Tabs.List style={{ flexWrap: 'nowrap', overflowX: 'auto' }}>
                        {MY_LIBRARY_SECTIONS.map((name) => (
                            <Tabs.Tab key={name} value={name}>{t(`myLibrary.sections.${name}`)}</Tabs.Tab>
                        ))}
                    </Tabs.List>
                </Tabs>
                <Card withBorder>
                    {content[section]}
                </Card>
            </Stack>
        </Container>
    );
};

export default MyLibraryPage;
