// Ui Library Imports
import { Container, Group, ActionIcon, rem } from '@mantine/core';

// Local Imports
import Logo from './logo';
import LanguageSwitch from './languageSwitch';
import DarkModeToggle from './darkModeToggle';

import classes from './appFooter.module.css';
import { IconBrandInstagram, IconBrandTwitter, IconBrandYoutube } from './icon';
//----------------------------------------------

const AppFooter = () => {
  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Logo showName />
        <Group>
          <LanguageSwitch />
          <DarkModeToggle />
        </Group>
        <Group gap={0} className={classes.links} justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandTwitter style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandYoutube style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandInstagram style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}


export default AppFooter;