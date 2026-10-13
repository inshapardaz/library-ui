import { useContext } from "react";

// 3rd party libraries
import { AppShell, rem } from '@mantine/core';

// Local imports
import AppHeader from "@/components/layout/appHeader";
import LibraryHeader from "@/components/layout/libraryHeader";
import { LibraryContext } from '@/contexts'
import { LibraryScope, LibraryOutlet } from './libraryScope';
// -----------------------------------------

const Shell = () => {
    const { libraryId, library } = useContext(LibraryContext);

    return (
        <AppShell>
            <AppShell.Header>
                {libraryId && library ?
                    <LibraryHeader library={library} /> :
                    <AppHeader />
                }
            </AppShell.Header>
            <AppShell.Main pt={`calc(${rem(60)} + var(--mantine-spacing-md))`}>
                <LibraryOutlet />
            </AppShell.Main>
        </AppShell>
    );
}

const LayoutWithHeader = () => (
    <LibraryScope>
        <Shell />
    </LibraryScope>
);

export default LayoutWithHeader;
