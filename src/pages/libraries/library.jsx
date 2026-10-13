import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// UI library import
import { Container, Stack } from "@mantine/core";

// Local imports
import LibraryHeader from "@/components/library/header";
import LatestBooks from "@/components/books/latestBooks";
import LastReadBooks from "@/components/books/lastReadBooks";
import SignInPrompt from "@/components/home/signInPrompt";
import { LatestWritings, LatestPoetry, FeaturedAuthors, BrowseByCategory } from "@/components/home/homeSections";
//---------------------------------------------

// Library Home: a discovery page that is useful to anonymous visitors, with "continue reading"
// for signed-in readers and a sign-in prompt in its place for everyone else.
const LibraryPage = () => {
    const { libraryId } = useParams();
    const user = useSelector((state) => state.auth.user);

    return (
        <Stack align="stretch" justify="center" gap="md">
            <LibraryHeader />
            <Container fluid>
                <Stack align="stretch" justify="center" gap="md">
                    {user ? <LastReadBooks libraryId={libraryId} /> : <SignInPrompt />}
                    <LatestBooks libraryId={libraryId} />
                    <LatestWritings libraryId={libraryId} />
                    <LatestPoetry libraryId={libraryId} />
                    <FeaturedAuthors libraryId={libraryId} />
                    <BrowseByCategory libraryId={libraryId} />
                </Stack>
            </Container>
        </Stack>);
}

export default LibraryPage;
