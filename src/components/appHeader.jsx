import { Link } from 'react-router-dom';

// Ui Library Imports
import {
  Group,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  Autocomplete,
} from '@mantine/core';

import { useDisclosure } from '@mantine/hooks';

// Local Imports
import classes from './appHeader.module.css';

import Logo from './logo';
import LanguageSwitch from './languageSwitch';
import DarkModeToggle from './darkModeToggle';
import Profile from './profile';
import LibrarySwitcher from './librarySwitcher';
import { IconSearch } from './icon';
import { useTranslation } from 'react-i18next';
//----------------------------------------------

const AppHeader = () => {
  const { t } = useTranslation();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Group hiddenFrom="sm">
            <Logo showName />
          </Group>
          <Group visibleFrom="sm">
            <LibrarySwitcher />
          </Group>
          <Group h="100%" gap={0} visibleFrom="sm">
            <Link to="/" className={classes.link}>
              {t('header.home')}
            </Link>
            <Link href="https://editor.nawishta.co.uk" className={classes.link}>
              {t('header.libraryEditor')}
            </Link>
            <Link href="https://dictionaries.nawishta.co.uk" className={classes.link}>
              {t('header.dictionaries')}
            </Link>
            <Link to="https://tools.nawishta.co.uk" className={classes.link}>
              {t('header.tools')}
            </Link>
          </Group>
          <Group visibleFrom="sm">
            <Autocomplete
              className={classes.search}
              placeholder="Search"
              leftSection={<IconSearch size={16} stroke={1.5} />}
              data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
              visibleFrom="xs"
            />
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

          <Link to="/" className={classes.link}>
            {t('header.home')}
          </Link>
          <Link href="https://editor.nawishta.co.uk" className={classes.link}>
            {t('header.libraryEditor')}
          </Link>
          <Link href="https://dictionaries.nawishta.co.uk" className={classes.link}>
            {t('header.dictionaries')}
          </Link>
          <Link to="https://tools.nawishta.co.uk" className={classes.link}>
            {t('header.tools')}
          </Link>

          <Divider my="sm" />

          <Group my="sm">
            <LibrarySwitcher />
          </Group>

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