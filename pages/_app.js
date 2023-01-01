import '../styles/globals.css'
import 'semantic-ui-css/semantic.min.css'

import { appWithTranslation } from 'next-i18next'

import { MediaContextProvider } from "../components/layout/media"

const App = ({ Component, pageProps }) => (
  <MediaContextProvider>
    <Component {...pageProps} />
  </MediaContextProvider>
)

export default appWithTranslation(App)