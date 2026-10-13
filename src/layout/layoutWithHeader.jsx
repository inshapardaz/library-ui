// 3rd party libraries
import { AppShell, rem } from '@mantine/core';

// Local imports
import SiteHeader from "@/components/layout/siteHeader";
import { LibraryScope, LibraryOutlet } from './libraryScope';
// -----------------------------------------

// Immersive layout for the readers: header only, no footer and no bottom tab bar.
const Shell = () => {
    return (
        <AppShell>
            <AppShell.Header>
                <SiteHeader />
            </AppShell.Header>
            <AppShell.Main pt={`calc(${rem(64)} + var(--mantine-spacing-md))`}>
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
