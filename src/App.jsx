import { useSelector } from 'react-redux';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

// UI libraries
import { DirectionProvider, MantineProvider } from '@mantine/core';

// Local imports
import '@mantine/core/styles.css';
import { selectedLanguage } from "./store/slices/uiSlice";
import './App.css'
import Router from "./router";

// ------------------------------------------------------------------

function App() {
  const lang = useSelector(selectedLanguage);
  const { t } = useTranslation();

  return (
    <>
        <HelmetProvider>
          <Helmet htmlAttributes={{ lang : lang ? lang.locale : 'en'  }}>
            <title>{t('app')}</title>
          </Helmet>
          <DirectionProvider >
            <MantineProvider>
                <Router />
            </MantineProvider>;
          </DirectionProvider>
        </HelmetProvider>
    </>
  )
}

export default App
