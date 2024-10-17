import { useContext } from "react";
import { Outlet } from "react-router-dom";

// 3rd party libraries
import { AppShell, rem } from '@mantine/core';

// Local imports
import AppFooter from "@/components/appFooter";
import AppHeader from "@/components/appHeader";
import { LibraryContext } from '@/contexts'
import LibraryHeader from "@/components/libraryHeader";
// -----------------------------------------

const LayoutWithHeader = () => {

    const { libraryId } = useContext(LibraryContext)

    return (
        <AppShell>
            <AppShell.Header>
                {libraryId ?
                    <LibraryHeader /> :
                    <AppHeader />
                }
            </AppShell.Header>
            <AppShell.Main pt={`calc(${rem(60)} + var(--mantine-spacing-md))`}>
                <Outlet />
            </AppShell.Main>
            <AppFooter />
        </AppShell>)
}

export default LayoutWithHeader;
