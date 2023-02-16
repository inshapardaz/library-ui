import { useEffect, useState } from 'react';
import { NextIntlProvider } from 'next-intl';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/router';

// 3rd party libraries
import { App, ConfigProvider, theme } from 'antd';
import { IconContext } from "react-icons";

// Internal imports
import '@/styles/globals.css'
import RefreshTokenHandler from '@/components/refreshTokenHandler';
import LayoutWithHeader from '@/components/layout/layoutWithHeader'
import localeService from '@/services/localeService';

import { ThemeProvider, useThemeContext } from '@/helpers/theme.context';

// --------------------------------------------------------------

const getThemeAlgorithm = (theme, darkMode) => darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm

// --------------------------------------------------------------

const MyApp = ({ Component, pageProps }) => {
  const [interval, setInterval] = useState(0);
  const router = useRouter();  
  const language = localeService.getLanguage(router.locale)
  const Layout = Component.Layout || LayoutWithHeader
  const { darkMode } = useThemeContext()

  console.log(`Master says dark mode is ${darkMode}`)

  return (
    <SessionProvider session={pageProps.session} refetchInterval={interval}>
       <NextIntlProvider messages={pageProps.messages}>
          <ThemeProvider>
            <ConfigProvider 
                direction={language ? language.dir : 'ltr'} 
                locale={language ? language.antdLocale : 'en'} 
                componentSize="large"
                theme={{
                  algorithm: getThemeAlgorithm(theme, darkMode),
                }}>
              <IconContext.Provider value={{ size: '14' }}>
                <App>
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </App>
              </IconContext.Provider>
            </ConfigProvider>
          </ThemeProvider>
        </NextIntlProvider>
      <RefreshTokenHandler setInterval={setInterval} />
    </SessionProvider>
  );
}

export default MyApp;