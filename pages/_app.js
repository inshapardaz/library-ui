import { useState } from 'react';
import {appWithI18Next, useSyncLanguage} from "ni18n";
import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css'

// 3rd party libraries
import 'semantic-ui-css/semantic.min.css'
import { App, ConfigProvider } from 'antd';

// Internal imports
import {ni18nConfig} from "../ni18n.config";

import RefreshTokenHandler from '@/components/refreshTokenHandler';
import { MediaContextProvider } from "@/components/layout/media"
import LayoutWithHeader from '@/components/layout/layoutWithHeader'

import localeService from '@/services/localeService';
// --------------------------------------------------------------

const MyApp = ({ Component, pageProps }) => {
  const [interval, setInterval] = useState(0);

  const language = localeService.getLanguage();
  useSyncLanguage(language.locale)

  const Layout = Component.Layout || LayoutWithHeader
  return (
    <SessionProvider session={pageProps.session} refetchInterval={interval}>
      <MediaContextProvider>
        <ConfigProvider direction={language.dir} locale={language.locale} componentSize="large">
          <App>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </App>
        </ConfigProvider>
      </MediaContextProvider>
      <RefreshTokenHandler setInterval={setInterval} />
    </SessionProvider>
  );
}

export default appWithI18Next(MyApp, ni18nConfig)