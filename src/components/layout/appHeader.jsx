import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Ui Library Imports
import {
    Group,
    Divider,
    Box,
    Burger,
    Drawer,
    ScrollArea,
    rem,
    Space,
    Text,
} from '@mantine/core';

import { useDisclosure } from '@mantine/hooks';

// Local Imports
import classes from './appHeader.module.css';

import Logo from '../logo';
import LanguageSwitch from './languageSwitch';
import DarkModeToggle from './darkModeToggle';
import Profile from './profile';
import LibrarySwitcher from './librarySwitcher';
import { IconHome, IconLibrary, IconLibraryEditor, IconDictionary, IconFont, IconTools } from '@/components/icon';
//----------------------------------------------

const AppHeader = () => {
    const { t } = useTranslation();
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

    return (
        <Box>
            <header className={classes.header}>
                <Group justify="space-between" wrap="nowrap" className={classes.navPrimary}>
                    <NavLink to={`/`} className={classes.brand} style={{ display: 'flex', alignItems: 'center' }}>
                        <Logo />
                        <Space w="sm" />
                        {t('app')}
                    </NavLink >
                    <Group wrap="nowrap" visibleFrom="sm">
                        <LibrarySwitcher className={classes.pillBtn}>
                            <IconLibrary height="18px" />
                            <Text size="sm">{t('header.libraries')}</Text>
                        </LibrarySwitcher>
                    </Group>
                    <Group visibleFrom="sm" wrap="nowrap">
                        <LanguageSwitch />
                        <DarkModeToggle />
                        <Profile />
                    </Group>

                    <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" color="var(--paper-card)" />
                </Group>
                <Group gap={0} wrap="nowrap" className={classes.navSections}>
                    <Link to="/" className={classes.link}>
                        <span className={classes.monogram}><IconHome height="14px" /></span>
                        <Space w="xs" />
                        <Text size="sm">
                            {t('header.home')}
                        </Text>
                    </Link>
                    <Link to="https://dictionary.nawishta.co.uk" className={classes.link}>
                        <span className={classes.monogram}><IconDictionary height="14px" /></span>
                        <Space w="xs" />
                        <Text size="sm">
                            {t('header.dictionaries')}
                        </Text>
                    </Link>
                    <Link to="https://fonts.nawishta.co.uk" className={classes.link}>
                        <span className={classes.monogram}><IconFont height="14px" /></span>
                        <Space w="xs" />
                        <Text size="sm">
                            {t('header.fonts')}
                        </Text>
                    </Link>
                    <Link to="https://tools.nawishta.co.uk" className={classes.link}>
                        <span className={classes.monogram}><IconTools height="14px" /></span>
                        <Space w="xs" />
                        <Text size="sm">
                            {t('header.tools')}
                        </Text>
                    </Link>
                </Group>
            </header>

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                padding="md"
                title={<Group>
                    <Logo />
                    <Space w="md" />
                    {t('app')}
                </Group>}
                hiddenFrom="sm"
                zIndex={1000000}
            >
                <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
                    <Divider my="sm" />

                    <Link to="/" className={classes.link}>
                        <IconHome height="24px" />
                        <Space w="md" />
                        {t('header.home')}
                    </Link>
                    <LibrarySwitcher >
                        <Group className={classes.link}>
                            <IconLibrary height="24px" />
                            {t('header.libraries')}
                        </Group>
                    </LibrarySwitcher>
                    <Link to="https://editor.nawishta.co.uk" className={classes.link}>
                        <IconLibraryEditor height="24px" />
                        <Space w="md" />
                        {t('header.libraryEditor')}
                    </Link>
                    <Link to="https://dictionary.nawishta.co.uk" className={classes.link}>
                        <IconDictionary height="24px" />
                        <Space w="md" />
                        {t('header.dictionaries')}
                    </Link>
                    <Link to="https://fonts.nawishta.co.uk" className={classes.link}>
                        <IconFont height="24px" />
                        <Space w="md" />
                        {t('header.fonts')}
                    </Link>
                    <Link to="https://tools.nawishta.co.uk" className={classes.link}>
                        <IconTools height="24px" />
                        <Space w="md" />
                        {t('header.tools')}
                    </Link>

                    <Divider my="sm" />


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

export default AppHeader;
