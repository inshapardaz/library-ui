import '../styles/globals.css'
import 'semantic-ui-css/semantic.min.css'
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { appWithTranslation } from 'next-i18next'
import { SessionProvider } from 'next-auth/react';
import { useState } from 'react';
import RefreshTokenHandler from '../components/refreshTokenHandler';
import { MediaContextProvider } from "../components/layout/media"
import LayoutWithHeader from '../components/layout/layoutWithHeader'

const App = ({ Component, pageProps }) => {
  const [interval, setInterval] = useState(0);

  const Layout = Component.Layout || LayoutWithHeader
  return (
    <SessionProvider session={pageProps.session} refetchInterval={interval}>
      <MediaContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ToastContainer pauseOnHover={false} draggable={false} limit={4} hideProgressBar={true} position="bottom-right" theme="colored" />
      </MediaContextProvider>
      <RefreshTokenHandler setInterval={setInterval} />
    </SessionProvider>
  );
}

export default appWithTranslation(App)