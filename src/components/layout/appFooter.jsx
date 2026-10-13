// Ui Library Imports
import { useTranslation } from 'react-i18next';
import { Anchor, Container, Group } from '@mantine/core';

// Local Imports
import Logo from '../logo';
import LanguageSwitch from './languageSwitch';
import DarkModeToggle from './darkModeToggle';

import classes from './appFooter.module.css';
//----------------------------------------------

const AppFooter = () => {
  const { t } = useTranslation();
  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Logo showName={true} />
        <Group gap="md" visibleFrom="sm">
          <Anchor size="sm" href="https://dictionary.nawishta.co.uk">{t('header.dictionaries')}</Anchor>
          <Anchor size="sm" href="https://fonts.nawishta.co.uk">{t('header.fonts')}</Anchor>
          <Anchor size="sm" href="https://tools.nawishta.co.uk">{t('header.tools')}</Anchor>
        </Group>
        <Group>
          <LanguageSwitch />
          <DarkModeToggle />
        </Group>
      </Container>
    </div>
  );
}


export default AppFooter;