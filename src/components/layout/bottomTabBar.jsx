import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

// Ui Library imports
import { UnstyledButton, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { spotlight } from '@mantine/spotlight';

// Local imports
import classes from './bottomTabBar.module.css';
import { LibraryContext } from '@/contexts';
import { MoreDrawer } from './siteHeader';
import { IconHome, IconSearch, IconBookShelve, IconSettings, IconBooks } from '@/components/icon';

//----------------------------------------------

// The five global destinations as a bottom tab bar on phones. Search opens the search palette
// that SiteHeader mounts; More opens a bottom sheet. Hidden on the immersive reader pages
// (they use the header-only layout) and outside a library.
const BottomTabBar = () => {
    const { t } = useTranslation();
    const { libraryId, library } = useContext(LibraryContext) ?? {};
    const [moreOpened, { open: openMore, close: closeMore }] = useDisclosure(false);

    if (!libraryId || !library) return null;
    const base = `/libraries/${libraryId}`;

    return (
        <>
            <nav className={classes.bar} aria-label={t('nav.main')}>
                <NavLink to={base} end className={classes.tab}>
                    <IconHome height="24px" />
                    <Text size="xs">{t('nav.home')}</Text>
                </NavLink>
                <NavLink to={`${base}/explore`} className={classes.tab}>
                    <IconBooks height="24px" />
                    <Text size="xs">{t('nav.explore')}</Text>
                </NavLink>
                <UnstyledButton className={classes.tab} onClick={spotlight.open}>
                    <IconSearch height="24px" />
                    <Text size="xs">{t('nav.search')}</Text>
                </UnstyledButton>
                <NavLink to={`${base}/my`} className={classes.tab}>
                    <IconBookShelve height="24px" />
                    <Text size="xs">{t('nav.myLibrary')}</Text>
                </NavLink>
                <UnstyledButton className={classes.tab} onClick={openMore} aria-expanded={moreOpened}>
                    <IconSettings height="24px" />
                    <Text size="xs">{t('nav.more')}</Text>
                </UnstyledButton>
            </nav>
            <MoreDrawer opened={moreOpened} onClose={closeMore} />
        </>
    );
};

export default BottomTabBar;
