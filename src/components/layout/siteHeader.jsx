import PropTypes from 'prop-types';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router-dom';

// Ui Library imports
import { Box, Drawer, Group, Popover, Space, Text, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

// Local imports
import classes from './appHeader.module.css';
import { LibraryContext } from '@/contexts';
import useLibraryCount from '@/hooks/useLibraryCount';
import Logo from '@/components/logo';
import SearchBox from '@/components/search/searchBox';
import LanguageSwitch from './languageSwitch';
import DarkModeToggle from './darkModeToggle';
import LibrarySwitcher from './librarySwitcher';
import Profile from './profile';
import MoreContent from './moreContent';
import { IconHome, IconLibrary, IconBookShelve, IconSearch, IconSettings } from '@/components/icon';

//----------------------------------------------

// The one header used on every page, inside or outside a library. Inside a library the primary
// destinations are Home, Explore, My Library and More (Search is the persistent search button);
// on phones the same destinations move to the bottom tab bar (see BottomTabBar).
const SiteHeader = () => {
    const { t } = useTranslation();
    const { libraryId, library } = useContext(LibraryContext) ?? {};
    const { count } = useLibraryCount();
    const [moreOpened, { toggle: toggleMore, close: closeMore }] = useDisclosure(false);
    const inLibrary = Boolean(libraryId && library);
    const base = `/libraries/${libraryId}`;

    const brand = (
        <>
            <Logo />
            <Space w="md" />
            <Text size="sm" truncate="end" maw={200}>{inLibrary ? library.name : t('app')}</Text>
        </>
    );

    return (
        <Box>
            <header className={classes.header}>
                <Group justify="space-between" h="100%" wrap="nowrap">
                    <Group h="100%" gap={0} wrap="nowrap">
                        {inLibrary && count > 1
                            ? <LibrarySwitcher className={classes.link} library={library}>{brand}</LibrarySwitcher>
                            : <NavLink to={inLibrary ? base : '/'} className={classes.link} end>{brand}</NavLink>}
                    </Group>

                    <Group h="100%" gap={0} visibleFrom="sm" wrap="nowrap" component="nav" aria-label={t('nav.main')}>
                        {inLibrary ? (
                            <>
                                <NavLink to={base} end className={classes.link} aria-label={t('nav.home')}>
                                    <IconHome height="24px" />
                                    <Space w="sm" />
                                    <Text visibleFrom="lg" size="sm">{t('nav.home')}</Text>
                                </NavLink>
                                <NavLink to={`${base}/explore`} className={classes.link} aria-label={t('nav.explore')}>
                                    <IconSearch height="24px" />
                                    <Space w="sm" />
                                    <Text visibleFrom="lg" size="sm">{t('nav.explore')}</Text>
                                </NavLink>
                                <NavLink to={`${base}/my`} className={classes.link} aria-label={t('nav.myLibrary')}>
                                    <IconBookShelve height="24px" />
                                    <Space w="sm" />
                                    <Text visibleFrom="lg" size="sm">{t('nav.myLibrary')}</Text>
                                </NavLink>
                            </>
                        ) : (
                            <Link to="/libraries" className={classes.link} aria-label={t('header.libraries')}>
                                <IconLibrary height="24px" />
                                <Space w="sm" />
                                <Text visibleFrom="lg" size="sm">{t('header.libraries')}</Text>
                            </Link>
                        )}
                        <Popover position="bottom-end" opened={moreOpened} onChange={(o) => !o && closeMore()} withinPortal>
                            <Popover.Target>
                                <UnstyledButton className={classes.link} onClick={toggleMore} aria-expanded={moreOpened} aria-label={t('nav.more')}>
                                    <IconSettings height="24px" />
                                    <Space w="sm" />
                                    <Text visibleFrom="lg" size="sm">{t('nav.more')}</Text>
                                </UnstyledButton>
                            </Popover.Target>
                            <Popover.Dropdown w={300}>
                                <MoreContent compact onNavigate={closeMore} />
                            </Popover.Dropdown>
                        </Popover>
                    </Group>

                    <Group wrap="nowrap">
                        {inLibrary && <SearchBox />}
                        <Group visibleFrom="sm" wrap="nowrap">
                            <LanguageSwitch />
                            <DarkModeToggle />
                            <Profile />
                        </Group>
                        {!inLibrary && (
                            <Group hiddenFrom="sm" wrap="nowrap">
                                <LanguageSwitch />
                                <DarkModeToggle />
                            </Group>
                        )}
                    </Group>
                </Group>
            </header>
        </Box>
    );
};

export const MoreDrawer = ({ opened, onClose }) => {
    const { t } = useTranslation();
    return (
        <Drawer opened={opened} onClose={onClose} position="bottom" size="auto" title={t('nav.more')} hiddenFrom="sm" zIndex={1000000}>
            <MoreContent onNavigate={onClose} />
        </Drawer>
    );
};

MoreDrawer.propTypes = {
    opened: PropTypes.bool,
    onClose: PropTypes.func,
};

export default SiteHeader;
