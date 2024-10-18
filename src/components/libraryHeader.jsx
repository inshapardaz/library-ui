import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router-dom';

// ui library imports
import {
    HoverCard,
    Group,
    UnstyledButton,
    Text,
    SimpleGrid,
    ThemeIcon,
    Divider,
    Center,
    Box,
    Burger,
    Drawer,
    Collapse,
    ScrollArea,
    rem,
    useMantineTheme,
    Autocomplete,
    Title,
    Button,
} from '@mantine/core';

import { useDisclosure } from '@mantine/hooks';

// Local imports
import classes from './appHeader.module.css';

import Logo from './logo';
import LanguageSwitch from './languageSwitch';
import DarkModeToggle from './darkModeToggle';
import LibrarySwitcher from './librarySwitcher';
import { useGetCategoriesQuery } from '@/store/slices/categories.api';
import Profile from './profile';
import { IconBooks, IconChevronDown, IconRefreshAlert, IconSearch } from './icon';

//----------------------------------------------

const LibraryHeader = ({ library }) => {
    const { t } = useTranslation();
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const theme = useMantineTheme();
    const { data: categories, isFetching: isFetchingCategories, error: errorLoadingCategories } = useGetCategoriesQuery({ libraryId: library?.id }, { skip: !library });


    const categoriesList = categories && categories.data ? categories.data.map((item) => (
        <UnstyledButton className={classes.subLink} key={item.title} component={Link} to={`/libraries/${library.id}/books?category=${item.id}`}>
            <Group wrap="nowrap" align="flex-start">
                <ThemeIcon size={34} variant="default" radius="md">
                    <item.icon style={{ width: rem(22), height: rem(22) }} color={theme.colors.blue[6]} />
                </ThemeIcon>
                <div>
                    <Text size="sm" fw={500}>
                        {item.title}
                    </Text>
                    <Text size="xs" c="dimmed">
                        {item.description}
                    </Text>
                </div>
            </Group>
        </UnstyledButton>
    )) : [];

    return (
        <Box>
            <header className={classes.header}>
                <Group justify="space-between" h="100%">
                    <Group hiddenFrom="sm">
                        <Logo showName={false} />
                        <Title order={5}>{library.name}</Title>
                    </Group>
                    <Group visibleFrom="sm">
                        <LibrarySwitcher />
                    </Group>

                    <Group h="100%" gap={0} visibleFrom="sm">
                        <NavLink to={`/`} className={classes.link}>
                            {t('header.home')}
                        </NavLink >
                        <NavLink to={`/libraries/${library.id}/books`} className={classes.link}>
                            <IconBooks /> {t('header.books')}
                        </NavLink >
                        <NavLink to={`/libraries/${library.id}/authors`} className={classes.link}>
                            {t('header.authors')}
                        </NavLink >
                        <HoverCard width={600} position="bottom" radius="md" shadow="md" disabled={isFetchingCategories} withinPortal>
                            <HoverCard.Target>
                                <a href="#" className={classes.link}>
                                    <Center inline>
                                        <Box component="span" mr={5}>
                                            {t('header.categories')}
                                        </Box>
                                        <IconChevronDown
                                            size={16}
                                            style={{ color: theme.colors.blue[6] }}
                                        />
                                    </Center>
                                </a>
                            </HoverCard.Target>

                            <HoverCard.Dropdown style={{ overflow: 'hidden' }}>
                                {errorLoadingCategories ?
                                    <>
                                        <Text c="dimmed">{t('categories.errors.loading.subTitle')}</Text>
                                        <Button rightSection={<IconRefreshAlert />}>{t('action.retry')}</Button>
                                    </> :
                                    <>
                                        <Group justify="space-between" px="md">
                                            <Text fw={500}>{t('header.categories')}</Text>
                                            <Link to={`/libraries/${library.id}/categories`} fz="xs">
                                                {t('categories.all')}
                                            </Link>
                                        </Group>

                                        <Divider my="sm" />

                                        <SimpleGrid cols={2} spacing={0}>
                                            {categoriesList.length > 0 ? categoriesList : <Text c="dimmed">{t('categories.empty.title')}</Text>}
                                        </SimpleGrid>
                                    </>
                                }
                            </HoverCard.Dropdown>
                        </HoverCard>
                        <NavLink to={`/libraries/${library.id}/series`} className={classes.link}>
                            {t('header.series')}
                        </NavLink >
                        <NavLink to={`/libraries/${library.id}/periodicals`} className={classes.link}>
                            {t('header.periodicals')}
                        </NavLink >
                    </Group>
                    <Group visibleFrom="sm">
                        <Autocomplete
                            className={classes.search}
                            placeholder="Search"
                            leftSection={<IconSearch size={16} stroke={1.5} />}
                            data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
                            visibleFrom="xs"
                        />
                    </Group>
                    <Group visibleFrom="sm">
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
                title="Navigation"
                hiddenFrom="sm"
                zIndex={1000000}
            >
                <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
                    <Divider my="sm" />

                    <NavLink to={`/libraries/${library.id}`} className={classes.link}>
                        {t('header.home')}
                    </NavLink >
                    <NavLink to={`/libraries/${library.id}/books`} className={classes.link}>
                        {t('header.books')}
                    </NavLink >
                    <NavLink to={`/libraries/${library.id}/authors`} className={classes.link}>
                        {t('header.authors')}
                    </NavLink >
                    <UnstyledButton className={classes.link} onClick={toggleLinks}>
                        <Center inline>
                            <Box component="span" mr={5}>
                                {t('header.categories')}
                            </Box>
                            <IconChevronDown
                                width={rem(16)}
                                height={rem(16)}
                                style={{ color: theme.colors.blue[6] }}
                            />
                        </Center>
                    </UnstyledButton>
                    <Collapse in={linksOpened}>{categoriesList}</Collapse>
                    <NavLink to={`/libraries/${library.id}/series`} className={classes.link}>
                        {t('header.series')}
                    </NavLink >
                    <NavLink to={`/libraries/${library.id}/periodicals`} className={classes.link}>
                        {t('header.periodicals')}
                    </NavLink >

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
        </Box>
    );
}


LibraryHeader.propTypes = {
    library: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
    })
};

export default LibraryHeader;