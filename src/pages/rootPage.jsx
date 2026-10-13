import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";

// UI library
import { Button, Center, Container, Loader, Stack, Text } from "@mantine/core";

// Local imports
import { useGetLibrariesQuery } from "@/store/slices/libraries.api";
import { getLastLibraryId, resolveStartLibrary } from "@/utils/libraryStorage";
import { accountUrl } from "@/utils/returnUrl";
import Error from "@/components/error";
import HomePage from "./homePage";
// ------------------------------------------------------------------

// The site root. What it shows depends on how many libraries the API returns for this visitor:
// none -> empty state, one -> open it, several -> the remembered one or a picker.
const RootPage = () => {
    const { t } = useTranslation();
    const user = useSelector((state) => state.auth.user);
    const { data, isFetching, isError, refetch } = useGetLibrariesQuery({ pageSize: 100 });

    if (isFetching) {
        return <Center h="50vh"><Loader /></Center>;
    }

    if (isError) {
        return <Container><Error title={t('libraries.loadingError')} onRetry={refetch} /></Container>;
    }

    const start = resolveStartLibrary(data?.data, getLastLibraryId());

    if (start.action === 'open') {
        return <Navigate to={`/libraries/${start.libraryId}`} replace />;
    }

    if (start.action === 'empty') {
        return (
            <Container py="xl">
                <Stack align="center">
                    <Text size="lg">{user ? t('homePage.noLibraries') : t('homePage.noLibrariesSignedOut')}</Text>
                    {!user && (
                        <Button component="a" href={accountUrl('/account/login')}>
                            {t('login.signInToContinue.action')}
                        </Button>
                    )}
                </Stack>
            </Container>
        );
    }

    return <HomePage />;
};

export default RootPage;
