import PropTypes from 'prop-types';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

// Ui Library imports
import { Box, Drawer, Group, Text } from '@mantine/core';

// Local imports
import classes from './appHeader.module.css';
import { LibraryContext } from '@/contexts';
import useLibraryCount from '@/hooks/useLibraryCount';
import Logo from '@/components/logo';
import SearchBox from '@/components/search/searchBox';
import LibrarySwitcher from './librarySwitcher';
import Profile from './profile';
import MoreContent from './moreContent';
import BooksMenu from './booksMenu';
import ColorModeMenu from './colorModeMenu';
import AppearanceMenu from './appearanceMenu';
import LanguageToggle from './languageToggle';

//----------------------------------------------

// Content types in the header, in the design's order. Shelves are personal, so they live under
// My Library; everything else is an Explore tab.
const NAV_ITEMS = [
    { key: 'writings', label: 'header.writings', path: 'explore/writings' },
    { key: 'poetry', label: 'header.poetry', path: 'explore/poetry' },
    { key: 'authors', label: 'header.authors', path: 'explore/authors' },
    { key: 'series', label: 'header.series', path: 'explore/series' },
    { key: 'shelves', label: 'header.bookShelves', path: 'my/shelves' },
    { key: 'periodicals', label: 'header.periodicals', path: 'explore/periodicals' },
];

// The one header used on every page, inside or outside a library. Inside a library it carries
// the content navigation (wide screens), the appearance controls, language, search and profile.
// On narrower screens the destinations move to the bottom tab bar (see BottomTabBar).
const SiteHeader = () => {
    const { t } = useTranslation();
    const { libraryId, library } = useContext(LibraryContext) ?? {};
    const { count } = useLibraryCount();
    const inLibrary = Boolean(libraryId && library);
    const base = `/libraries/${libraryId}`;

    const brand = (
        <>
            <Logo />
            <Text fw={700} fz={20} c="accent" truncate="end" maw={220} ms="xs">
                {inLibrary ? library.name : t('app')}
            </Text>
        </>
    );

    return (
        <Box>
            <header className={classes.header}>
                <Group justify="space-between" h="100%" wrap="nowrap" gap="md">
                    <Group h="100%" gap="lg" wrap="nowrap" style={{ flex: 1, minWidth: 0 }}>
                        {inLibrary && count > 1
                            ? <LibrarySwitcher className={classes.brand} library={library}>{brand}</LibrarySwitcher>
                            : <NavLink to={inLibrary ? base : '/'} className={classes.brand} end>{brand}</NavLink>}

                        {inLibrary && (
                            <Group h="100%" gap={0} visibleFrom="md" wrap="nowrap" component="nav"
                                aria-label={t('nav.main')} className={classes.nav}>
                                <BooksMenu libraryId={libraryId} />
                                {NAV_ITEMS.map((item) => (
                                    <NavLink key={item.key} to={`${base}/${item.path}`} className={classes.link}>
                                        {t(item.label)}
                                    </NavLink>
                                ))}
                            </Group>
                        )}
                    </Group>

                    <Group gap="xs" wrap="nowrap">
                        <Group gap="xs" wrap="nowrap" visibleFrom="md">
                            <ColorModeMenu />
                            <AppearanceMenu />
                        </Group>
                        <LanguageToggle />
                        {inLibrary && <SearchBox />}
                        <Box visibleFrom="md"><Profile /></Box>
                    </Group>
                </Group>
            </header>
        </Box>
    );
};

export const MoreDrawer = ({ opened, onClose }) => {
    const { t } = useTranslation();
    return (
        <Drawer opened={opened} onClose={onClose} position="bottom" size="auto" title={t('nav.more')} hiddenFrom="md" zIndex={1000000}>
            <MoreContent onNavigate={onClose} />
        </Drawer>
    );
};

MoreDrawer.propTypes = {
    opened: PropTypes.bool,
    onClose: PropTypes.func,
};

export default SiteHeader;
