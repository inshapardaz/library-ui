// Ui Library Imports
import { Container, Group, ActionIcon } from '@mantine/core';

// Local Imports
import Logo from '../logo';
import LanguageSwitch from './languageSwitch';
import DarkModeToggle from './darkModeToggle';

import classes from './appFooter.module.css';
import { IconBrandInstagram, IconBrandTwitter, IconBrandYoutube } from '@/components/icon';
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
            <IconBrandTwitter size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandYoutube size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandInstagram size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}


export default AppFooter;