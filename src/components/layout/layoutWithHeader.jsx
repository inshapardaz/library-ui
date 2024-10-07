import { Outlet } from "react-router-dom";

// 3rd party libraries
import { AppShell } from '@mantine/core';
// Local imports
import AppFooter from "./appFooter";
import AppHeader from "./appHeader";

// -----------------------------------------

const LayoutWithHeader = () => {
    return (
        <>
            <AppShell>
                <AppShell.Header>
                    <AppHeader />
                </AppShell.Header>
                <AppShell.Main>
                    <Outlet />
                </AppShell.Main>
                <AppFooter />
            </AppShell>
        </>)
}

export default LayoutWithHeader;
