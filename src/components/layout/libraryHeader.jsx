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
    Space,
    Text,
} from '@mantine/core';

import { useDisclosure } from '@mantine/hooks';

// Local imports
import classes from './appHeader.module.css';

import { IconBooks, IconLibrary, IconChevronDown, IconAuthors, IconSeries, IconPeriodicals, IconWritings } from '@/components/icon';
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
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

    return (
        <Box>
            <header className={classes.header}>
                <Group justify="space-between" h="100%" wrap="nowrap">
                    <Group h="100%" gap={0}>
                        <LibrarySwitcher className={classes.link} library={library}>
                            <NavLink to={`/`} className={classes.link}>
                                <Logo />
                                <Space w="md" />
                                <Text visibleFrom="lg">
                                    {library.name}
                                </Text>
                                <Space w="lg" />
                                <IconChevronDown
                                    width={rem(16)}
                                    height={rem(16)}
                                />
                            </NavLink >
                        </LibrarySwitcher>
                    </Group>
                    <Group hiddenFrom="sm" >
                        <SearchBox />
                    </Group>

                    <Group h="100%" gap={0} visibleFrom="sm" wrap="nowrap">
                        <CategoriesMenu library={library} className={classes.link} target='books' allLabel={t('books.allBooks')} countFunc={i => i.bookCount} >
                            <NavLink to={`/libraries/${library.id}/books`} className={classes.link}>
                                <IconBooks height="24px" />
                                <Space w="md" />
                                <Text visibleFrom="lg">
                                    {t('header.books')}
                                </Text>
                                <IconChevronDown
                                    width={rem(16)}
                                    height={rem(16)}
                                />
                            </NavLink >
                        </CategoriesMenu>
                        <CategoriesMenu library={library} className={classes.link} target='writings' allLabel={t('writings.all')} countFunc={i => i.articleCount}>
                            <NavLink to={`/libraries/${library.id}/writings`} className={classes.link}>
                                <IconWritings height="24px" />
                                <Space w="md" />
                                <Text visibleFrom="lg">
                                    {t('header.writings')}
                                </Text>
                                <IconChevronDown
                                    width={rem(16)}
                                    height={rem(16)}
                                />
                            </NavLink >
                        </CategoriesMenu>
                        <NavLink to={`/libraries/${library.id}/authors`} className={classes.link}>
                            <IconAuthors height="24px" />
                            <Space w="md" />
                            <Text visibleFrom="lg">
                                {t('header.authors')}
                            </Text>
                        </NavLink >
                        <NavLink to={`/libraries/${library.id}/series`} className={classes.link}>
                            <IconSeries height="24px" />
                            <Space w="md" />
                            <Text visibleFrom="lg">
                                {t('header.series')}
                            </Text>
                        </NavLink >
                        <CategoriesMenu library={library} className={classes.link} target='periodicals' allLabel={t('periodicals.all')} countFunc={i => i.periodicalCount}>
                            <NavLink to={`/libraries/${library.id}/periodicals`} className={classes.link}>
                                <IconPeriodicals height="24px" />
                                <Space w="md" />
                                <Text visibleFrom="lg">
                                    {t('header.periodicals')}
                                </Text>
                                <IconChevronDown
                                    width={rem(16)}
                                    height={rem(16)}
                                />
                            </NavLink >
                        </CategoriesMenu>
                    </Group>
                    <Group visibleFrom="sm">
                        <SearchBox />
                    </Group>
                    <Group visibleFrom="sm" wrap="nowrap">
                        <LanguageSwitch />
                        <DarkModeToggle />
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
                title={
                    <Group><IconLibrary height="24px" />
                        <Space w="md" />
                        {library.name}
                    </Group>
                }
                hiddenFrom="sm"
                zIndex={1000000}
            >
                <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
                    <Divider my="sm" />
                    <NavLink to={`/libraries/${library.id}`} className={classes.link} onClick={closeDrawer}>
                        <IconLibrary height="24px" />
                        <Space w="md" />
                        {t('header.home')}
                    </NavLink >
                    <CategoriesMenu library={library} target="books" allLabel={t('books.allBooks')} onClick={closeDrawer}>
                        <NavLink className={classes.link}>
                            <IconBooks height="24px" />
                            <Space w="md" />
                            {t('header.books')}
                            <IconChevronDown
                                width={rem(16)}
                                height={rem(16)}
                            />
                        </NavLink>
                    </CategoriesMenu>
                    <CategoriesMenu library={library} target="writings" allLabel={t('writings.all')} onClick={closeDrawer}>
                        <NavLink className={classes.link}>
                            <IconWritings height="24px" />
                            <Space w="md" />
                            {t('header.writings')}
                            <IconChevronDown
                                width={rem(16)}
                                height={rem(16)}
                            />
                        </NavLink >
                    </CategoriesMenu>
                    <NavLink to={`/libraries/${library.id}/authors`} className={classes.link} onClick={closeDrawer}>
                        <IconAuthors height="24px" />
                        <Space w="md" />
                        {t('header.authors')}
                    </NavLink >
                    <NavLink to={`/libraries/${library.id}/series`} className={classes.link} onClick={closeDrawer}>
                        <IconSeries height="24px" />
                        <Space w="md" />
                        {t('header.series')}
                    </NavLink >
                    <CategoriesMenu library={library} target="periodicals" allLabel={t('periodicals.all')} onClick={closeDrawer}>
                        <NavLink className={classes.link}>
                            <IconPeriodicals height="24px" />
                            <Space w="md" />
                            {t('header.periodicals')}
                            <IconChevronDown
                                width={rem(16)}
                                height={rem(16)}
                            />
                        </NavLink >
                    </CategoriesMenu>

                    <Divider my="sm" />
                    <LibrarySwitcher className={classes.link}>
                        <Group mx="lg">
                            <IconLibrary height="24px" />
                            {t('header.libraries')}
                            <IconChevronDown
                                width={rem(16)}
                                height={rem(16)}
                            />
                        </Group>
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