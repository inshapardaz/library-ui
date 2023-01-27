import { useState } from 'react';
import { appWithTranslation } from 'next-i18next'
import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css'

import { useRouter } from 'next/router';

// 3rd party libraries
import 'semantic-ui-css/semantic.min.css'
import { App, ConfigProvider } from 'antd';
import { IconContext } from "react-icons";

// Internal imports
import RefreshTokenHandler from '@/components/refreshTokenHandler';
import LayoutWithHeader from '@/components/layout/layoutWithHeader'
import localeService from '@/services/localeService';

// --------------------------------------------------------------

const MyApp = ({ Component, pageProps }) => {
  const [interval, setInterval] = useState(0);
  const router = useRouter();  

  const language = localeService.getLanguage(router.locale)

  const Layout = Component.Layout || LayoutWithHeader
  return (
    <SessionProvider session={pageProps.session} refetchInterval={interval}>
        <ConfigProvider 
            direction={language ? language.dir : 'ltr'} 
            locale={language ? language.locale : currentLocale} 
            componentSize="large">
          <IconContext.Provider value={{ size: '14' }}>
            <App>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </App>
          </IconContext.Provider>
        </ConfigProvider>
      <RefreshTokenHandler setInterval={setInterval} />
    </SessionProvider>
  );
}

export default appWithTranslation(MyApp)