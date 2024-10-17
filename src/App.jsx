import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

// UI libraries
import { DirectionProvider, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';

// Local imports
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import Router from "./router";
import { selectedLanguage } from "@/store/slices/uiSlice";
import { useGetLibraryQuery } from '@/store/slices/libraries.api';
import { LibraryContext } from '@/contexts';
// ------------------------------------------------------------------

function App() {
  const lang = useSelector(selectedLanguage);
  const { t } = useTranslation();

  const { libraryId } = useParams();
  const { data: library } = useGetLibraryQuery({ libraryId }, { skip: !libraryId });

  return (
    <>
      <HelmetProvider>
        <Helmet htmlAttributes={{ lang: lang ? lang.locale : 'en' }}>
          <title>{t('app')}</title>
        </Helmet>
        <DirectionProvider >
          <MantineProvider>
            <Notifications limit={5} position="top-center" />
            <ModalsProvider>
              <LibraryContext.Provider value={{ libraryId, library }}>
                <Router />
              </LibraryContext.Provider>
            </ModalsProvider>
          </MantineProvider>;
        </DirectionProvider>
      </HelmetProvider>
    </>
  )
}

export default App
