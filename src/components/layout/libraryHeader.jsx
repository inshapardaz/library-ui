import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

// ui library imports
import {
    Group,
    Divider,
    Box,
    Burger,
    Drawer,
    ScrollArea,
    rem,
    useMantineTheme,
} from '@mantine/core';

import { useDisclosure } from '@mantine/hooks';

// Local imports
import classes from './appHeader.module.css';

import { IconBooks, IconChevronDown } from '@/components/icon';
import Logo from '@/components/logo';
import LanguageSwitch from './languageSwitch';
import DarkModeToggle from './darkModeToggle';
import LibrarySwitcher from './librarySwitcher';
import Profile from './profile';
import SearchBox from './searchBox';
import CategoriesMenu from './categoriesMenu';

//----------------------------------------------

const LibraryHeader = ({ library }) => {
    const { t } = useTranslation();
    const theme = useMantineTheme();
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

    return (
        <Box>
            <header className={classes.header}>
                <Group justify="space-between" h="100%">
                    <Group>
                        <Logo title={library.name} />
                    </Group>
                    <Group hiddenFrom="sm" >
                        <SearchBox />
                    </Group>

                    <Group h="100%" gap={0} visibleFrom="sm">
                        <NavLink to={`/`} className={classes.link}>
                            {t('header.home')}
                        </NavLink >
                        <CategoriesMenu library={library}>
                            <NavLink to={`/libraries/${library.id}/books`} className={classes.link}>
                                <IconBooks /> {t('header.books')}
                                <IconChevronDown
                                    width={rem(16)}
                                    height={rem(16)}
                                    style={{ color: theme.colors.blue[6] }}
                                />
                            </NavLink >
                        </CategoriesMenu>
                        <NavLink to={`/libraries/${library.id}/authors`} className={classes.link}>
                            {t('header.authors')}
                        </NavLink >
                        <NavLink to={`/libraries/${library.id}/series`} className={classes.link}>
                            {t('header.series')}
                        </NavLink >
                        <NavLink to={`/libraries/${library.id}/periodicals`} className={classes.link}>
                            {t('header.periodicals')}
                        </NavLink >
                    </Group>
                    <Group visibleFrom="sm">
                        <SearchBox />
                    </Group>
                    <Group visibleFrom="sm">
                        <LanguageSwitch />
                        <DarkModeToggle />
                        <LibrarySwitcher visibleFrom="sm">
                            <IconBooks />
                        </LibrarySwitcher>
                        <Profile />
                    </Group>

                    <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
                </Group>
            </header>

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                padding="md"
                title="Navigation"
                hiddenFrom="sm"
                zIndex={1000000}
            >
                <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
                    <Divider my="sm" />

                    <NavLink to={'/'} className={classes.link}>
                        {t('header.home')}
                    </NavLink >
                    <CategoriesMenu library={library}>
                        <NavLink to={`/ libraries / ${library.id} /books`} className={classes.link}>
                            <Box component="span" mr={5}>
                                <IconBooks /> {t('header.books')}
                            </Box>
                            <IconChevronDown
                                width={rem(16)}
                                height={rem(16)}
                                style={{ color: theme.colors.blue[6] }}
                            />
                        </NavLink >
                    </CategoriesMenu>
                    <NavLink to={`/libraries/${library.id}/authors`} className={classes.link}>
                        {t('header.authors')}
                    </NavLink >
                    <NavLink to={`/libraries/${library.id}/series`} className={classes.link}>
                        {t('header.series')}
                    </NavLink >
                    <NavLink to={`/libraries/${library.id}/periodicals`} className={classes.link}>
                        {t('header.periodicals')}
                    </NavLink >

                    <Divider my="sm" />
                    <LibrarySwitcher className={classes.link}>
                        <IconBooks />
                        {t('header.libraries')}
                    </LibrarySwitcher>

                    <Divider my="sm" />

                    <Group my="sm" >
                        <LanguageSwitch />
                        <DarkModeToggle />
                    </Group>

                    <Divider my="sm" />

                    <Group justify="center" grow pb="xl" px="md">
                        <Profile />
                    </Group>
                </ScrollArea>
            </Drawer>
        </Box >
    );
}


LibraryHeader.propTypes = {
    library: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
    })
};

export default LibraryHeader;