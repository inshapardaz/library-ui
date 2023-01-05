import { Html, Head, Main, NextScript } from 'next/document'
import i18nextConfig from '../next-i18next.config'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export const getStaticProps = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', [
      'common',
    ])),
  },
})

const dirFor = (locale) => {
  switch (locale) {
    case 'ur': return 'rtl';
    default: return 'ltr';
  }
}

export default function Document(props) {
  const currentLocale =
      props.__NEXT_DATA__.locale ??
      i18nextConfig.i18n.defaultLocale

  const dir = dirFor(currentLocale)

  return (
    <Html 
        lang={currentLocale} 
        dir={dir}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body dir={dir}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
