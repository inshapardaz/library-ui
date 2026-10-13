// 3rd party libraries
import { AppShell, rem } from '@mantine/core';

// Local imports
import AppFooter from "@/components/layout/appFooter";
import SiteHeader from "@/components/layout/siteHeader";
import BottomTabBar from "@/components/layout/bottomTabBar";
import { LibraryScope, LibraryOutlet } from './libraryScope';
// -----------------------------------------

const Shell = () => {
    return (
        // On phones the bottom tab bar (fixed) takes 60px, so the main area reserves that space.
        <AppShell footer={{ height: { base: 60, md: 0 } }}>
            <AppShell.Header>
                <SiteHeader />
            </AppShell.Header>
            <AppShell.Main pt={`calc(${rem(64)} + var(--mantine-spacing-md))`} pb='var(--mantine-spacing-md)' className="pageBackgound">
                <LibraryOutlet />
            </AppShell.Main>
            <AppFooter />
            <BottomTabBar />
        </AppShell>
    );
}

const LayoutWithHeaderAndFooter = () => (
    <LibraryScope>
        <Shell />
    </LibraryScope>
);

export default LayoutWithHeaderAndFooter;
