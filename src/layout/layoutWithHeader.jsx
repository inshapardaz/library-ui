import { Outlet, useParams } from "react-router-dom";

// 3rd party libraries
import { AppShell, rem } from '@mantine/core';

// Local imports
import AppFooter from "@/components/appFooter";
import AppHeader from "@/components/appHeader";
import { useGetLibraryQuery } from '@/store/slices/libraries.api';
import { LibraryContext } from '@/contexts'
import LibraryHeader from "@/components/libraryHeader";
// -----------------------------------------

const LayoutWithHeader = () => {
    const { libraryId } = useParams();
    const { data: library } = useGetLibraryQuery({ libraryId }, { skip: !libraryId });

    return (
        <LibraryContext.Provider value={{ libraryId, library }}>
            <AppShell>
                <AppShell.Header>
                    {libraryId && library ?
                        <LibraryHeader library={library} /> :
                        <AppHeader />
                    }
                </AppShell.Header>
                <AppShell.Main pt={`calc(${rem(60)} + var(--mantine-spacing-md))`}>
                    <Outlet />
                </AppShell.Main>
                <AppFooter />
            </AppShell>
        </LibraryContext.Provider>)
}

export default LayoutWithHeader;
