import { useSelector } from 'react-redux';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

// UI libraries
import { DirectionProvider, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';

// Local imports
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/spotlight/styles.css';
import '@mantine/carousel/styles.css';

import Router from "./router";
import { selectedLanguage } from "@/store/slices/uiSlice";
// ------------------------------------------------------------------

function App() {
  const lang = useSelector(selectedLanguage);
  const { t } = useTranslation();

  return (
    <>
      <HelmetProvider>
        <Helmet htmlAttributes={{ lang: lang ? lang.locale : 'en' }}>
          <title>{t('app')}</title>
        </Helmet>
        <DirectionProvider >
          <MantineProvider>
            <Notifications limit={5} position="bottom-right" />
            <ModalsProvider>
              <Router />
            </ModalsProvider>
          </MantineProvider>;
        </DirectionProvider>
      </HelmetProvider>
    </>
  )
}

export default App
