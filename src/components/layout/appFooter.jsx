import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Ui Library Imports
import { Container, Group, Text } from '@mantine/core';

// Local Imports
import Logo from '../logo';
import LanguageSwitch from './languageSwitch';
import DarkModeToggle from './darkModeToggle';
import { LibraryContext } from '@/contexts';

import classes from './appFooter.module.css';
//----------------------------------------------

const AppFooter = () => {
  const { t } = useTranslation();
  const { libraryId } = useContext(LibraryContext) ?? {};
  const base = libraryId ? `/libraries/${libraryId}` : '/libraries';

  return (
    <div className={classes.footer}>
      <Container size="xl">
        <div className={classes.grid}>
          <div>
            <Logo showName={true} />
            <Text className={classes.about} mt="sm">{t('footer.about')}</Text>
          </div>
          <div>
            <Text className={classes.colTitle}>{t('footer.discover')}</Text>
            <Text component={Link} to={`${base}/books`} className={classes.colLink}>{t('header.books')}</Text>
            <Text component={Link} to={`${base}/writings`} className={classes.colLink}>{t('header.writings')}</Text>
            <Text component={Link} to={`${base}/poetry`} className={classes.colLink}>{t('header.poetry')}</Text>
            <Text component={Link} to={`${base}/series`} className={classes.colLink}>{t('header.series')}</Text>
            <Text component={Link} to={`${base}/periodicals`} className={classes.colLink}>{t('header.periodicals')}</Text>
          </div>
          <div>
            <Text className={classes.colTitle}>{t('footer.community')}</Text>
            <Text component={Link} to={`${base}/authors`} className={classes.colLink}>{t('header.authors')}</Text>
            <Text component={Link} to={`${base}/bookshelves`} className={classes.colLink}>{t('header.bookShelves')}</Text>
            <Text component={Link} to="/libraries" className={classes.colLink}>{t('header.libraries')}</Text>
            <Text component={Link} to="https://editor.nawishta.co.uk" className={classes.colLink}>{t('header.libraryEditor')}</Text>
          </div>
          <div>
            <Text className={classes.colTitle}>{t('footer.resources')}</Text>
            <Text component={Link} to="https://dictionary.nawishta.co.uk" className={classes.colLink}>{t('header.dictionaries')}</Text>
            <Text component={Link} to="https://fonts.nawishta.co.uk" className={classes.colLink}>{t('header.fonts')}</Text>
            <Text component={Link} to="https://tools.nawishta.co.uk" className={classes.colLink}>{t('header.tools')}</Text>
          </div>
        </div>
        <div className={classes.inner}>
          <Text>{t('footer.copyrights')}</Text>
          <Group>
            <LanguageSwitch />
            <DarkModeToggle />
          </Group>
        </div>
      </Container>
    </div>
  );
}


export default AppFooter;