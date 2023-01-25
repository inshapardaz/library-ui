import { Html, Head, Main, NextScript } from 'next/document'

// 3rd party imports

// Local imports
import localeService from '@/services/localeService';

// --------------------------------------------------------------

export default function Document() {
  const language = localeService.getLanguage()

  return (
    <Html 
        lang={language.locale} 
        dir={language.dir}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body dir={language.dir}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
