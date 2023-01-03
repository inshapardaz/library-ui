import '../styles/globals.css'
import 'semantic-ui-css/semantic.min.css'
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { appWithTranslation } from 'next-i18next'

import { MediaContextProvider } from "../components/layout/media"

const App = ({ Component, pageProps }) => (
  <MediaContextProvider>
    <Component {...pageProps} />
    <ToastContainer pauseOnHover={false} draggable={false} limit={4} hideProgressBar={true} position="bottom-right" theme="colored" />
  </MediaContextProvider>
)

export default appWithTranslation(App)