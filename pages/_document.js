import { Html, Head, Main, NextScript } from 'next/document'

// 3rd party imports

// Local imports
import localeService from '@/services/localeService';

// --------------------------------------------------------------

export default function Document(props) {
  const currentLocale = props.__NEXT_DATA__.locale ?? 'en';

  const language = localeService.getLanguage(currentLocale)
  return (
    <Html 
        lang={language ? language.locale : currentLocale} 
        dir={language ? language.dir : 'ltr'}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body dir={language ? language.dir : 'ltr'}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
